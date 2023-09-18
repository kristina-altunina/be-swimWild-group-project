const axios = require("axios");
const { parse } = require("node-html-parser");
const { locations } = require("./sea-temp-locations");
const { distanceBetweenCoords } = require("../utils");

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
  const closest = { url: "", distance: Infinity, name: "" };
  for (const location of locations) {
    const proximity = distanceBetweenCoords(coords, location.coords);
    if (proximity < closest.distance) {
      closest.distance = proximity;
      closest.url = location.url;
      closest.name = location.name;
    }
  }
  return scrapeTemp(closest.url).then((celsius) => {
    closest.temp = celsius;
    return closest;
  });
}

module.exports = { findTempOfNearestBeach };
