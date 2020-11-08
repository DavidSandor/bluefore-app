const express = require('express');
const axios = require('axios');
const environment = require('../utility/environment');
const CurrentWeather = require('../models/current-weather.model');

const router = express.Router();

router.get('/api/current-weather/:lat/:lon', (req, res) => {
    // Route params
    const latitude = req.params.lat;
    const longitude = req.params.lon;

    // Query params
    const language = req.query.lang;
    const units = req.query.units;

    sendCurrentWeatherResponse({latitude, longitude, language, units}, res);
});

router.get('/api/current-weather/:loc', (req, res) => {
    // Route params
    const location = req.params.loc;

    // Query params
    const language = req.query.lang;
    const units = req.query.units;

    sendCurrentWeatherResponse({location, language, units}, res);
});

const sendCurrentWeatherResponse = (args, res) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args.location || ''}&lat=${args.latitude || ''}&lon=${args.longitude || ''}&units=${args.units || 'metric'}&lang=${args.language || ''}&appid=${environment.WEATHER_API_KEY}`).then(currentWeather => {
        res.json(new CurrentWeather(currentWeather.data));
    }).catch(err => {
        res.status(err.response.status).send(err.response.data);
    });
}

module.exports = router;