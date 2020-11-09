import axios from 'axios';
import store from '@/store/index';

export default {
    async updateWeatherData(params) {

        store.commit('setIsLoading', true);

        try {
            let currentWeather = {};
            let forecastWeather = {}

            if(params.location) {
                currentWeather = (await axios.get(`api/current-weather/${params.location}?lang=${store.getters.language}&units=${store.getters.units}`)).data;
                store.commit('setIsCurrentLocation', false);
            } else if(params.latitude !== undefined && params.longitude !== undefined) {
                currentWeather = (await axios.get(`api/current-weather/${params.latitude}/${params.longitude}?lang=${store.getters.language}&units=${store.getters.units}`)).data;
                store.commit('setIsCurrentLocation', true);
            }

            store.commit('setCurrentWeather', currentWeather);

            // Updating forecast after current weather
            forecastWeather = (await axios.get(`api/forecast-weather/${currentWeather.coordinates.lat}/${currentWeather.coordinates.lon}?lang=${store.getters.language}&units=${store.getters.units}`)).data;

            store.commit('setForecastHourly', forecastWeather.forecastHourly);
            store.commit('setForecastDaily', forecastWeather.forecastDaily);

            store.commit('setResponseError', null);
        } catch (error) {
            store.commit('setResponseError', error.response);
        } finally {
            store.commit('setIsLoading', false);
        }
    }
}