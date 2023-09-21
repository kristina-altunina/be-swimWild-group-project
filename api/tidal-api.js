const axios = require("axios");
const { approxHoursFromNow } = require("../utils");

const api = axios.create({
  baseURL: `http://environment.data.gov.uk/flood-monitoring/id`,
});

function findTideStation([lat, long], radius) {
  return api
    .get(`/stations?type=TideGauge&lat=${lat}&long=${long}&dist=${radius}`)
    .then(({ data }) => {
      return data.items[0]["@id"];
    });
}

function processTideData(items) {
  // eventually we need a sinusodial regression formula
  // this functino takes too long - cache?
  for (let i = 0; i < items.length; i++) {
    const r1 = items[i].value;
    const r2 = items[i + 1].value;
    const r3 = items[i + 2].value;
    const r4 = items[i + 3].value;
    if (r1 - r2 * r2 - r3 < 0) {
      // double check with reading 4
      if ((r2 > 0 && r4 > r2) || (r2 < 0 && r4 < r2)) continue;
      const changeTime = new Date(items[i + 1].dateTime).getTime();
      const period = 372.5 * 60 * 1000; // 6 hours 12.5 mins
      let nextHigh = r2 < 0 ? changeTime + period : changeTime + period * 2;
      let nextLow = r2 < 0 ? changeTime + period * 2 : changeTime + period;
      // check readings are not old
      if (nextHigh < new Date().getTime()) nextHigh += period * 2;
      if (nextLow < new Date().getTime()) nextLow += period * 2;
      return {
        hoursUntilHighTide: approxHoursFromNow(nextHigh),
        hoursUntilLowTide: approxHoursFromNow(nextLow),
      };
    }
  }
}

function getTideData([lat, long], radius = 50) {
  return findTideStation([lat, long], radius)
    .then((data) => {
      return data + "/readings?today";
    })
    .then((url) => {
      console.log(url);
      return axios.get(url);
    })
    .then(({ data: { items } }) => {
      return processTideData(items);
    });
}

// getTideData([53.5, -3.32], 100).then((data) => {
//   console.log(data);
// });

module.exports = { getTideData };
// hide tide every 12 hours and 25 mins
