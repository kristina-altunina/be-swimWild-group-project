const axios = require("axios");
const { removeSamplingPoint } = require("./utils");

const api = axios.create({
  baseURL: "https://environment.data.gov.uk",
});

function getEaAdviceAgainstBathing() {
  api
    .get(
      "/doc/bathing-water-quality/advice-against-bathing/situations.json?_pageSize=1000&_page=0&_view=situation-details"
    )
    .then(({ data }) => {
      const dangerCoords = data.result.items.map((item) => {
        if (item.samplingPoint) {
          const sample = item.samplingPoint;
          return {
            name: removeSamplingPoint(item.bathingWater.name._value),
            coords: [sample.lat, sample.long],
          };
        }
        const sample = item.stp_samplingPoint;
        return {
          name: removeSamplingPoint(sample.name._value),
          coords: [sample.lat, sample.long],
        };
      });
      console.log(dangerCoords);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { getEaAdviceAgainstBathing };

getEaAdviceAgainstBathing();
