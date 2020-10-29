class ForecastHourly {

    dateTime;
    temperature;
    iconId;
    description;
    timezoneOffset;
    precipitationProbability;

    constructor(forecastWeatherData, timezoneOffset) {
        this.dateTime = forecastWeatherData.dt * 1000;
        this.timezoneOffset = timezoneOffset * 1000;
        this.temperature = forecastWeatherData.temp;
        this.iconId = forecastWeatherData.weather[0].icon;
        this.description = forecastWeatherData.weather[0].description;
        this.precipitationProbability = forecastWeatherData.pop;
    }
}

module.exports = ForecastHourly;