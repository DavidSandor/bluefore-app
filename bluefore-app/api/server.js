const express = require('express');
const helmet = require('helmet');
const environment = require('./utility/environment');
const path = require('path');
const rateLimit = require("express-rate-limit");
const currentWeatherRoutes = require('./routes/current-weather');
const forecastWeatherRoutes = require('./routes/forecast-weather');
const citiesRoutes = require('./routes/cities');

const app = express();

app.use(helmet());

// rate limiter settings
// needs to be set if you are behind a proxy (e.g. Heroku)
app.set('trust proxy', 1);

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 60 // max 60 requests
});

// apply rate limiting to requests that begin with /api/
app.use("/api/", apiLimiter);

// api routes
app.use(currentWeatherRoutes);
app.use(forecastWeatherRoutes);
app.use(citiesRoutes);

// using static files
app.use(express.static(path.join(__dirname, './spa')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './spa/index.html'));
});

// server listen
app.listen(environment.PORT || 3080, () => {
    console.log(`Server listening on port::${environment.PORT || 3080}`);
});