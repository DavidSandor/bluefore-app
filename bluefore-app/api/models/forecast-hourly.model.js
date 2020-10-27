class ForecastHourly {

    dateTime;
    temperature;
    iconId;
    description;

    constructor(forecastWeatherData) {
        this.dateTime = forecastWeatherData.dt;
        this.temperature = forecastWeatherData.temp;
        this.iconId = forecastWeatherData.weather[0].id;
        this.description = forecastWeatherData.weather[0].description;
    }
}

module.exports = ForecastHourly;