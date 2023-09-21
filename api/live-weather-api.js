const axios = require("axios");

const api = axios.create({
  baseURL: "https://weather.visualcrossing.com",
});

function getLiveWeather([lat, long]) {
  return api
    .get(
      `/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=${lat},${long}&aggregateHours=24&unitGroup=uk&shortColumnNames=false&contentType=json&forecastDays=7&key=GZRJE95DHSXU693Z2GA6F42KN`
    )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { getLiveWeather };
