const axios = require("axios");

function formattedData(dataFetched) {
  const newData = { ...dataFetched };
  const waveData = {};

  waveData.date = newData.daily.time[0];
  waveData.wave_height_max =
    newData.daily.wave_height_max[0] + newData.daily_units.wave_height_max;
  waveData.wave_direction_dominant =
    newData.daily.wave_direction_dominant[0] +
    newData.daily_units.wave_direction_dominant;
  waveData.wave_period_max =
    newData.daily.wave_period_max[0] + newData.daily_units.wave_period_max;
  waveData.wind_wave_height_max =
    newData.daily.wind_wave_height_max[0] +
    newData.daily_units.wind_wave_height_max;
  waveData.wind_wave_direction_dominant =
    newData.daily.wind_wave_direction_dominant[0] +
    newData.daily_units.wind_wave_direction_dominant;
  waveData.wind_wave_period_max =
    newData.daily.wind_wave_period_max[0] +
    newData.daily_units.wind_wave_period_max;
  waveData.wind_wave_peak_period_max =
    newData.daily.wind_wave_peak_period_max[0] +
    newData.daily_units.wind_wave_peak_period_max;
  waveData.swell_wave_height_max =
    newData.daily.swell_wave_height_max[0] +
    newData.daily_units.swell_wave_height_max;
  waveData.swell_wave_direction_dominant =
    newData.daily.swell_wave_direction_dominant[0] +
    newData.daily_units.swell_wave_direction_dominant;
  waveData.swell_wave_period_max =
    newData.daily.swell_wave_period_max[0] +
    newData.daily_units.swell_wave_period_max;
  waveData.swell_wave_peak_period_max =
    newData.daily.swell_wave_peak_period_max[0] +
    newData.daily_units.swell_wave_peak_period_max;

  console.log(waveData);

  return waveData;
}

const api = axios.create({
  baseURL: "https://marine-api.open-meteo.com",
});

function getMarineData(lat, long, startDate, endDate) {
  const formattedStartDate = startDate.slice(0, 10);
  const formattedEndDate = endDate.slice(0, 10);
  console.log(formattedStartDate, formattedEndDate);
  return api
    .get(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${long}&hourly=wav[…]_max,swell_wave_peak_period_max&timezone=Europe%2FLondon`
    )
    .then(({ data }) => {
      console.log(data);
      return data;
    });
}

const now = new Date();
const end = new Date(now + 7).toISOString();
const start = now.toISOString();

getMarineData(52.1134, 1.1234, start, end);

module.exports = { getMarineData };
