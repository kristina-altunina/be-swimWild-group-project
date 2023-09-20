const axios = require("axios");

const api = axios.create({
    baseURL: "https://api.openweathermap.org"
})

function getLiveWeather(lat,lon) {
    return api.get(
      `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6e4245535fab6476cc1984f7ac9fa98f&units=metric`
    ).then(({ data }) => {
        console.log(data);
        return data;
    })
}


module.exports = {getLiveWeather}