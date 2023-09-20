const { getNearestEaAab } = require("./ea-aab-api");
const { collectEaInlandData } = require("./ea-inland-api");
const { getLiveWeather } = require("./live-weather-api");
const { getMarineData } = require("./marine-api");
const { findTempOfNearestBeach } = require("./sea-temps/sea-temp-scraper");

function getApiData(coords, type) {
  if (type === "sea") {
    const promises = [
      findTempOfNearestBeach(coords),
      getNearestEaAab(coords),
      getMarineData(coords),
      getLiveWeather(coords),
    ];
    return Promise.allSettled(promises).then(([temp, aab, wave]) => {
      return {
        tempCelsius: temp.status === "fulfilled" ? temp.value.temp : null,
        nearestAab: aab.status === "fulfilled" ? aab.value : null,
        waveData: wave.status === "fulfilled" ? wave.value : null,
      };
    });
  } else {
    const promises = [collectEaInlandData(coords, radius)];
  }
}

getApiData([54.07894, -2.8668929], "sea").then((data) => {
  console.log(data);
});
