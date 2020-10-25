class CurrentWeather {

    location;
    iconId;
    description;
    temperature;
    feelsLike;
    minTemperature;
    maxTemperature;
    pressure;
    humidity;
    isNight;

    constructor(currentWeatherData) {
        this.location = currentWeatherData.name;
        this.iconId = currentWeatherData.weather[0].id;
        this.description = currentWeatherData.weather[0].description;
        this.temperature = currentWeatherData.main.temp;
        this.feelsLike = currentWeatherData.main.feels_like;
        this.minTemperature = currentWeatherData.main.temp_min;
        this.maxTemperature = currentWeatherData.main.temp_max;
        this.pressure = currentWeatherData.main.pressure;
        this.humidity = currentWeatherData.main.humidity;
        // TODO: Correction needed for timezones
        this.isNight = currentWeatherData.dt > currentWeatherData.sys.sunset || currentWeatherData.dt < currentWeatherData.sys.sunrise
    }
}

module.exports = CurrentWeather;