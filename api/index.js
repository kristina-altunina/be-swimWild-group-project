const { getNearestEaAab } = require("./ea-aab-api");
const { collectEaInlandData } = require("./ea-inland-api");
const { getLiveWeather } = require("./live-weather-api");
const { getMarineData } = require("./marine-api");
const { findTempOfNearestBeach } = require("./sea-temps/sea-temp-scraper");
const { getTideData } = require("./tidal-api");

function getApiData(coords, type, day) {
  // values need caching - which api's effectively take all data each time?
  // tide one can be very slow and would be easy to cache
  if (type === "sea") {
    const promises = [
      findTempOfNearestBeach(coords),
      getNearestEaAab(coords),
      getMarineData(coords),
      getLiveWeather(coords),
      getTideData(coords),
    ];
    return Promise.allSettled(promises).then(
      ([temp, aab, wave, weather, tide]) => {
        return {
          tempCelsius: temp.status === "fulfilled" ? temp.value.temp : null,
          nearestAab: aab.status === "fulfilled" ? aab.value : null,
          waveData: wave.status === "fulfilled" ? wave.value : null,
          weather: weather.status === "fulfilled" ? weather.value : null,
          tides: tide.status === "fulfilled" ? tide.value : null,
        };
      }
    );
  } else {
    if (type === "pond" || type === "lake") type = "lakes";
    else type = "rivers";
    const promises = [
      collectEaInlandData(coords, 10000, type, new Date().toISOString()),
      getNearestEaAab(coords),
      getLiveWeather(coords),
    ];
    return Promise.allSettled(promises).then(([hydro, aab, weather]) => {
      return {
        hydrologyData: hydro.status === "fulfilled" ? hydro.value : null,
        nearestAab: aab.status === "fulfilled" ? aab.value : null,
        weather: weather.status === "fulfilled" ? weather.value : null,
      };
    });
  }
}

module.exports = { getApiData };

// getApiData([54.07894, -2.8668929], "sea").then((data) => {
//   console.log(data);
// });
