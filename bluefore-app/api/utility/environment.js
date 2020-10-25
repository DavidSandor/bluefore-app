const dotenv = require('dotenv');

dotenv.config();

exports.PORT = process.env.PORT;
exports.WEATHER_API_URL = process.env.WEATHER_API_URL;
exports.WEATHER_API_KEY = process.env.WEATHER_API_KEY;