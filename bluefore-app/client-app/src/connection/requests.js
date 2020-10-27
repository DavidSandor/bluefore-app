import axios from 'axios';
import store from '@/store/index';

export default {
    async updateWeatherData(params) {

        let currentWeather = {};

        if(params.location) {
            currentWeather = (await axios.get(`api/current-weather/${params.location}?lang=${store.getters.language}`)).data;
        } else if(params.latitude && params.longitude) {
            currentWeather = (await axios.get(`api/current-weather/${params.latitude}/${params.longitude}?lang=${store.getters.language}`)).data;
        }

        store.commit('setCurrentWeather', currentWeather);

        // Updating forecast after current weather
        const forecastWeather = (await axios.get(`api/forecast-weather/${store.getters.coordinates.lat}/${store.getters.coordinates.lon}?lang=${store.getters.language}`)).data;

        store.commit('setForecastHourly', forecastWeather.forecastHourly);
        store.commit('setForecastDaily', forecastWeather.forecastDaily);
    }
}