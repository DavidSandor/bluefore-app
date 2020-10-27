class ForecastDaily {

    dateTime;
    sunrise;
    sunset;
    temperature;
    iconId;
    description;

    constructor(forecastWeatherData) {
        this.dateTime = forecastWeatherData.dt;
        this.sunrise = forecastWeatherData.sunrise;
        this.sunset = forecastWeatherData.sunset;
        this.temperature = forecastWeatherData.temp;
        this.dateTime = forecastWeatherData.dt;
        this.iconId = forecastWeatherData.weather[0].id;
        this.description = forecastWeatherData.weather[0].description;
    }
}

module.exports = ForecastDaily;