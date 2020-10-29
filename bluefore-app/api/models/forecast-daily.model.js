class ForecastDaily {

    dateTime;
    sunrise;
    sunset;
    temperature;
    iconId;
    description;
    timezoneOffset;
    rainVolume;
    windSpeed;

    constructor(forecastWeatherData, timezoneOffset) {
        this.dateTime = forecastWeatherData.dt * 1000;
        this.sunrise = forecastWeatherData.sunrise * 1000;
        this.sunset = forecastWeatherData.sunset * 1000;
        this.timezoneOffset = timezoneOffset * 1000;
        this.temperature = forecastWeatherData.temp;
        this.iconId = forecastWeatherData.weather[0].icon;
        this.description = forecastWeatherData.weather[0].description;
        this.rainVolume = forecastWeatherData.rain;
        this.windSpeed = forecastWeatherData.wind_speed;
    }
}

module.exports = ForecastDaily;