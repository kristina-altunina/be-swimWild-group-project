const axios = require("axios");

const api = axios.create({
  baseURL: "https://weather.visualcrossing.com",
});

function getLiveWeather([lat, long], day) {
  return api
    .get(
      `/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=${lat},${long}&aggregateHours=24&unitGroup=uk&shortColumnNames=false&contentType=json&forecastDays=7&key=GZRJE95DHSXU693Z2GA6F42KN`
    )
    .then(({ data }) => {
      const output = {};
      output.units = data.columns;
      const valueKey = Object.keys(data.locations)[0];
      output.values = data.locations[valueKey].values[day];
      return output;
    })
    .catch((err) => {
      // console.log(err);
    });
}

// getLiveWeather([54.07894, -2.8668929], 0).then((data) => {
//   console.log(data);
// });

module.exports = { getLiveWeather };
