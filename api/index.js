const { getNearestEaAab } = require("./ea-aab-api");
const { collectEaInlandData } = require("./ea-inland-api");
const { getLiveWeather } = require("./live-weather-api");
const { getMarineData } = require("./marine-api");
const { findTempOfNearestBeach } = require("./sea-temps/sea-temp-scraper");
const { getTideData } = require("./tidal-api");

function getApiData(coords, type, day = 0) {
  // values need caching - which api's effectively take all data each time?
  // tide one can be very slow and would be easy to cache
  if (type === "sea") {
    const promises = [
      findTempOfNearestBeach(coords),
      getNearestEaAab(coords),
      getMarineData(coords, day),
      getLiveWeather(coords, day),
      getTideData(coords, day),
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
    const now = new Date().getTime();
    const days = 1000 * 60 * 60 * 24;
    const promises = [
      collectEaInlandData(
        coords,
        10000,
        type,
        new Date(now + day * days).toISOString()
      ),
      getNearestEaAab(coords),
      getLiveWeather(coords, day),
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

function analyseApiData(data, waterTemp, airTemp) {
  // would be great to get the users swim history? Then can say based on your previous swims etc you will stay for this long.
}

module.exports = { getApiData, analyseApiData };

// getApiData([54.07894, -2.8668929], "sea").then((data) => {
//   console.log(data);
// });
