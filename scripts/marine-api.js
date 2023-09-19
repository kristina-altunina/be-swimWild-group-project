const axios = require("axios");

function formattedData(dataFetched) {
  const newData = { ...dataFetched };
  const waveData = {};

  const dates = newData.daily.time.map((date) => date);
  const wave_height_max = newData.daily.wave_height_max.map((wave) => {
    return wave + newData.daily_units.wave_height_max;
  });
  const wave_direction_dominant = newData.daily.wave_direction_dominant.map(
    (wave) => {
      return wave + newData.daily_units.wave_direction_dominant;
    }
  );

  const wave_period_max = newData.daily.wave_period_max.map((wave) => {
    return wave + newData.daily_units.wave_period_max;
  });

  const wind_wave_height_max = newData.daily.wind_wave_height_max.map(
    (wave) => {
      return wave + newData.daily_units.wind_wave_height_max;
    }
  );

  const wind_wave_direction_dominant =
    newData.daily.wind_wave_direction_dominant.map((wave) => {
      return wave + newData.daily_units.wind_wave_direction_dominant;
    });

  const wind_wave_period_max = newData.daily.wind_wave_period_max.map(
    (wave) => {
      return wave + newData.daily_units.wind_wave_period_max;
    }
  );

  const wind_wave_peak_period_max = newData.daily.wind_wave_peak_period_max.map(
    (wave) => {
      return wave + newData.daily_units.wind_wave_peak_period_max;
    }
  );

  const swell_wave_height_max = newData.daily.swell_wave_height_max.map(
    (wave) => {
      return wave + newData.daily_units.swell_wave_height_max;
    }
  );

  const swell_wave_direction_dominant =
    newData.daily.swell_wave_direction_dominant.map((wave) => {
      return wave + newData.daily_units.swell_wave_direction_dominant;
    });

  const swell_wave_period_max = newData.daily.swell_wave_period_max.map(
    (wave) => {
      return wave + newData.daily_units.swell_wave_period_max;
    }
  );

  const swell_wave_peak_period_max =
    newData.daily.swell_wave_peak_period_max.map((wave) => {
      return wave + newData.daily_units.swell_wave_peak_period_max;
    });

  waveData.dates = dates;
  waveData.wave_height_max = wave_height_max;
  waveData.wave_direction_dominant = wave_direction_dominant;
  waveData.wave_period_max = wave_period_max;
  waveData.wind_wave_height_max = wind_wave_height_max;
  waveData.wind_wave_direction_dominant = wind_wave_direction_dominant;
  waveData.wind_wave_period_max = wind_wave_period_max;
  waveData.wind_wave_peak_period_max = wind_wave_peak_period_max;
  waveData.swell_wave_height_max = swell_wave_height_max;
  waveData.swell_wave_direction_dominant = swell_wave_direction_dominant;
  waveData.swell_wave_period_max = swell_wave_period_max;
  waveData.swell_wave_peak_period_max = swell_wave_peak_period_max;
  console.log(waveData)
    return waveData;
}

const api = axios.create({
  baseURL: "https://marine-api.open-meteo.com",
});

function getMarineData(lat, lon) {

  return api
    .get(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&daily=wave_height_max,wave_direction_dominant,wave_period_max,wind_wave_height_max,wind_wave_direction_dominant,wind_wave_period_max,wind_wave_peak_period_max,swell_wave_height_max,swell_wave_direction_dominant,swell_wave_period_max,swell_wave_peak_period_max&timezone=Europe%2FLondon`
    )
    .then(({ data }) => {
      return formattedData(data);
    });
}


getMarineData(52.1134, 1.1234);

module.exports = { getMarineData };
