const express = require('express');
const axios = require('axios');
const environment = require('../utility/environment');
const ForecastHourly = require('../models/forecast-hourly.model');
const ForecastDaily = require('../models/forecast-daily.model');

const router = express.Router();

router.get('/api/forecast-weather/:lat/:lon', (req, res) => {
    // Route params
    const latitude = req.params.lat;
    const longitude = req.params.lon;

    // Query params
    const language = req.query.lang;

    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude || ''}&lon=${longitude || ''}&exclude=minutely&units=metric&lang=${language || ''}&appid=${environment.WEATHER_API_KEY}`).then(forecastWeather => {

        const forecastHourly = forecastWeather.data.hourly.filter(
            // 3 hours interval
            (w, index) => index % 3 == 2
        ).filter(
            // 18 hours range
            (w, index) => index < 6
        ).map(weather => new ForecastHourly(weather, forecastWeather.data.timezone_offset));

        const forecastDaily = forecastWeather.data.daily.filter(
                // excluding today
                (w, index) => index > 0 && index < 7
            ).map(weather => new ForecastDaily(weather, forecastWeather.data.timezone_offset));

        res.json({forecastHourly, forecastDaily});
    }).catch(err => {
        res.status(err.response.status).send(err.response.data);
    })
});

module.exports = router;