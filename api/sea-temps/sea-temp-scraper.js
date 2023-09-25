const axios = require("axios");
const { parse } = require("node-html-parser");
const { locations } = require("./sea-temp-locations");
const { distanceBetweenCoords } = require("../../utils");

const web = axios.create({
  baseURL: "https://www.seatemperature.org/",
});

function scrapeTemp(url) {
  return web.get(url).then(({ data }) => {
    const root = parse(data);
    const temp = root.querySelector("#sea-temperature > span");
    const celsius = temp.innerHTML.split("&")[0];
    return celsius;
  });
}

function findTempOfNearestBeach(coords) {
  const closest = { url: "", proximity: Infinity, name: "", coords: [0, 0] };
  for (const location of locations) {
    const proximity = distanceBetweenCoords(coords, location.coords);
    if (proximity < closest.proximity) {
      closest.proximity = proximity;
      closest.url = location.url;
      closest.name = location.name;
      closest.coords = location.coords;
    }
  }
  return scrapeTemp(closest.url).then((celsius) => {
    closest.temp = celsius;
    return closest;
  });
}

// findTempOfNearestBeach([54.2744, -2.9516]).then((data) => {
//   console.log(data);
// });

module.exports = { findTempOfNearestBeach };
