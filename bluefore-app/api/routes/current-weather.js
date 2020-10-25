const express = require('express');
const axios = require('axios');
const environment = require('../utility/environment');

const router = express.Router();

router.get('/api/current-weather/:lat/:lon', async (req, res, next) => {
    // Route params
    const latitude = req.params.lat;
    const longitude = req.params.lon;

    //Query params
    const language = req.query.lang;

    const currentWeather = (await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=${language}&appid=${environment.WEATHER_API_KEY}`)).data;
    res.json(currentWeather);
});

router.get('/api/current-weather/:loc', async (req, res, next) => {
    // Route params
    const location = req.params.loc;

    //Query params
    const language = req.query.lang;

    const currentWeather = (await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=${language}&appid=${environment.WEATHER_API_KEY}`)).data;
    res.json(currentWeather);
});

module.exports = router;