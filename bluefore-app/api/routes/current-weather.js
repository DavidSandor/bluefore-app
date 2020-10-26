const express = require('express');
const axios = require('axios');
const environment = require('../utility/environment');
const CurrentWeather = require('../models/current-weather.model');

const router = express.Router();

router.get('/api/current-weather/:lat/:lon', async (req, res, next) => {
    // Route params
    const latitude = req.params.lat;
    const longitude = req.params.lon;

    // Query params
    const language = req.query.lang;

    res.json(await getCurrentWeatherResponse({latitude, longitude, language}));
});

router.get('/api/current-weather/:loc', async (req, res, next) => {
    // Route params
    const location = req.params.loc;

    // Query params
    const language = req.query.lang;

    res.json(await getCurrentWeatherResponse({location, language}));
});

const getCurrentWeatherResponse = async (args) => {
    try {
        const currentWeather = (
            await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args.location || ''}&lat=${args.latitude || ''}&lon=${args.longitude || ''}&units=metric&lang=${args.language || ''}&appid=${environment.WEATHER_API_KEY}`)
            ).data;

        return Promise.resolve(new CurrentWeather(currentWeather));

    } catch (error) {
        return {msg: 'Request failed!'};
    }
}

module.exports = router;