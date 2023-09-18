const axios = require("axios");

function formattedData(dataFetched) {
  const newData = { ...dataFetched };
  const waveData = {};

  waveData.date = newData.daily.time[0];
  waveData.wave_height_max = newData.daily.wave_height_max[0] + newData.daily_units.wave_height_max;
  waveData.wave_direction_dominant = newData.daily.wave_direction_dominant[0] + newData.daily_units.wave_direction_dominant;
  waveData.wave_period_max = newData.daily.wave_period_max[0] + newData.daily_units.wave_period_max;
  waveData.wind_wave_height_max = newData.daily.wind_wave_height_max[0] + newData.daily_units.wind_wave_height_max;
  waveData.wind_wave_direction_dominant = newData.daily.wind_wave_direction_dominant[0] + newData.daily_units.wind_wave_direction_dominant;
  waveData.wind_wave_period_max = newData.daily.wind_wave_period_max[0] +newData.daily_units.wind_wave_period_max;
  waveData.wind_wave_peak_period_max = newData.daily.wind_wave_peak_period_max[0] + newData.daily_units.wind_wave_peak_period_max;
  waveData.swell_wave_height_max = newData.daily.swell_wave_height_max[0] + newData.daily_units.swell_wave_height_max;
  waveData.swell_wave_direction_dominant = newData.daily.swell_wave_direction_dominant[0] + newData.daily_units.swell_wave_direction_dominant;
  waveData.swell_wave_period_max = newData.daily.swell_wave_period_max[0] + newData.daily_units.swell_wave_period_max;
  waveData.swell_wave_peak_period_max =newData.daily.swell_wave_peak_period_max[0] + newData.daily_units.swell_wave_peak_period_max;

  console.log(waveData);
  
  return waveData;
}

const api = axios.create({
  baseURL: "https://marine-api.open-meteo.com",
});



function getMarineData(lat, lon) {
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10);

  return api
    .get(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}
      &daily=wave_height_max,wave_direction_dominant,wave_period_max,wind_wave_height_max,wind_wave_direction_dominant,
      wind_wave_period_max,wind_wave_peak_period_max,swell_wave_height_max,swell_wave_direction_dominant,swell_wave_period_max,
      swell_wave_peak_period_max&timezone=Europe%2FLondon&start_date=${formattedDate}&end_date=${formattedDate}`
    )
    .then(({ data }) => {
      return formattedData(data);
    });
}

module.exports = { getMarineData };
