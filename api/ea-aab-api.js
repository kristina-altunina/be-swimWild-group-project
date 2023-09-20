const axios = require("axios");
const { removeSamplingPoint } = require("./utils");
const { distanceBetweenCoords } = require("../utils");

const api = axios.create({
  baseURL: "https://environment.data.gov.uk",
});

function getNearestEaAab(coords) {
  return api
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
      dangerCoords.sort((a, b) => {
        const distanceA = distanceBetweenCoords(coords, a.coords);
        const distanceB = distanceBetweenCoords(coords, b.coords);
        return distanceA - distanceB;
      });
      return {
        name: dangerCoords[0].name,
        distance: distanceBetweenCoords(coords, dangerCoords[0].coords),
      };
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { getNearestEaAab };

//getNearestEaAab([54.2744, -2.9516]).then((data) => console.log(data));
