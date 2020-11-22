class ForecastDaily {

    dateTime;
    sunrise;
    sunset;
    temperature;
    iconId;
    weatherConditionId;
    description;
    timezoneOffset;
    rainVolume;
    windSpeed;
    snowVolume;

    constructor(forecastWeatherData, timezoneOffset) {
        this.dateTime = forecastWeatherData.dt * 1000;
        this.sunrise = forecastWeatherData.sunrise * 1000;
        this.sunset = forecastWeatherData.sunset * 1000;
        this.timezoneOffset = timezoneOffset * 1000;
        this.temperature = forecastWeatherData.temp;
        this.iconId = forecastWeatherData.weather[0].icon;
        this.weatherConditionId = forecastWeatherData.weather[0].id;
        this.description = forecastWeatherData.weather[0].description;
        this.rainVolume = forecastWeatherData.rain ? forecastWeatherData.rain : 0;
        this.snowVolume = forecastWeatherData.snow ? forecastWeatherData.snow : 0;
        this.windSpeed = forecastWeatherData.wind_speed;
    }
}

module.exports = ForecastDaily;