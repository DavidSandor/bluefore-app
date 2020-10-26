import axios from 'axios';
import store from '@/store/index';

export default {
    async updateCurrentWeather(params) {

        let currentWeather = {};

        if(params.location) {
            currentWeather = (await axios.get(`api/current-weather/${params.location}?lang=${params.language}`)).data;
        } else if(params.latitude && params.longitude) {
            currentWeather = (await axios.get(`api/current-weather/${params.latitude}/${params.longitude}?lang=${params.language}`)).data;
        }

        store.commit('setCurrentWeather', currentWeather);
    }
}