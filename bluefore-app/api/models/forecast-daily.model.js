class ForecastDaily {

    dateTime;
    sunrise;
    sunset;
    temperature;
    iconId;
    description;

    constructor(forecastWeatherData) {
        this.dateTime = forecastWeatherData.dt * 1000;
        this.sunrise = forecastWeatherData.sunrise * 1000;
        this.sunset = forecastWeatherData.sunset * 1000;
        this.temperature = forecastWeatherData.temp;
        this.iconId = forecastWeatherData.weather[0].id;
        this.description = forecastWeatherData.weather[0].description;
    }
}

module.exports = ForecastDaily;