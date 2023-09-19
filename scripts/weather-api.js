const axios = require("axios");

const api = axios.create({
  baseURL: "https://archive-api.open-meteo.com",
});

function getWeatherData(coords, date) {
  const endDate = new Date(date);
  const endDateString = endDate.toISOString().split("T")[0];
  const startDate = new Date(date);
  startDate.setDate(endDate.getDate() - 7);
  const startDateString = startDate.toISOString().split("T")[0];
  console.log(startDateString, endDateString);

  api
    .get(
      `/v1/archive?latitude=${coords[0]}&longitude=${coords[1]}&start_date=${startDateString}&end_date=${endDateString}&daily=rain_sum,temperature_2m_max,temperature_2m_min`
    )
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {});
}

getWeatherData([54.2744, -2.9516], "2010-09-02T11:00:00+0000");
