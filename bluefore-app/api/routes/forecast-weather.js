const express = require('express');
const axios = require('axios');
const environment = require('../utility/environment');
const ForecastHourly = require('../models/forecast-hourly.model');
const ForecastDaily = require('../models/forecast-daily.model');

const router = express.Router();

router.get('/api/forecast-weather/:lat/:lon', async (req, res, next) => {
    // Route params
    const latitude = req.params.lat;
    const longitude = req.params.lon;

    // Query params
    const language = req.query.lang;

    const forecastWeather = (
        await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude || ''}&lon=${longitude || ''}&exclude=minutely&units=metric&lang=${language || ''}&appid=${environment.WEATHER_API_KEY}`)
        ).data;

    const forecastHourly = forecastWeather.hourly.filter(
            // 3 hours interval
            (w, index) => index % 3 == 2
        ).filter(
            // 24 hours range
            (w, index) => index < 8
        ).map(weather => new ForecastHourly(weather, forecastWeather.timezone_offset));

    const forecastDaily = forecastWeather.daily.filter(
            // excluding today
            (w, index) => index > 0
        ).map(weather => new ForecastDaily(weather, forecastWeather.timezone_offset));

    res.json({forecastHourly, forecastDaily});
});

module.exports = router;