const axios = require("axios");
const fs = require("fs");

const params = "waveHeight,waterTemperature,waveHeight";

const headers = {
  Authorization:
    "2017a342-5615-11ee-a654-0242ac130002-2017a3ba-5615-11ee-a654-0242ac130002",
};

const date = new Date();

const formattedDate = date.toISOString().slice(0, 10);

function getMarineWeather(lat, lng, end) {
  const config = {
    params: {
      lat,
      lng,
      params,
      end,
    },
    headers,
  };

  axios
    .get("https://api.stormglass.io/v2/weather/point", config)
    .then((response) => {
      const data = response.data;

      fs.writeFile("data.json", JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log("Data saved to data.json");
      });
    })
    .catch((error) => {
      // console.log(error);
    });
}

getMarineWeather(51.53564, 0.08924, formattedDate);
