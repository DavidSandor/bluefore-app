class CurrentWeather {

    location;
    locationId;
    iconId;
    weatherConditionId;
    description;
    temperature;
    feelsLike;
    minTemperature;
    maxTemperature;
    pressure;
    humidity;
    wind;
    calcDateTime;
    sunrise;
    sunset;
    timezone;
    coordinates;

    constructor(currentWeatherData) {
        this.location = currentWeatherData.name;
        this.locationId = currentWeatherData.id;
        this.iconId = currentWeatherData.weather[0].icon;
        this.weatherConditionId = currentWeatherData.weather[0].id;
        this.description = currentWeatherData.weather[0].description;
        this.temperature = currentWeatherData.main.temp;
        this.feelsLike = currentWeatherData.main.feels_like;
        this.minTemperature = currentWeatherData.main.temp_min;
        this.maxTemperature = currentWeatherData.main.temp_max;
        this.pressure = currentWeatherData.main.pressure;
        this.humidity = currentWeatherData.main.humidity;
        this.wind = currentWeatherData.wind;
        this.coordinates = currentWeatherData.coord;
        // Converted to ms
        this.calcDateTime = currentWeatherData.dt * 1000;
        this.sunrise = currentWeatherData.sys.sunrise* 1000;
        this.sunset = currentWeatherData.sys.sunset * 1000;
        this.timezone = currentWeatherData.timezone * 1000;
    }
}

module.exports = CurrentWeather;