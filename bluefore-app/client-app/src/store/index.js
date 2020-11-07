import { createStore } from 'vuex'

// Determine initial app language
const initLanguage = (() => {
  if(localStorage.getItem('language')) {
    return localStorage.getItem('language');
  } else {
    return navigator.language.includes('hu') ? 'hu' : 'en'; 
  }
})();

export default createStore({
  state: {
    location: '',
    coordinates: '',
    currentWeather: '',
    forecastHourly: '',
    forecastDaily: '',
    language: initLanguage,
    isCurrentLocation: true,
    isLoading: false,
    responseError: ''
  },
  getters: {
    location(state) {
      return state.location;
    },
    coordinates(state) {
      return state.coordinates;
    },
    currentWeather(state) {
      return state.currentWeather;
    },
    forecastHourly(state) {
      return state.forecastHourly;
    },
    forecastDaily(state) {
      return state.forecastDaily;
    },
    language(state) {
      return state.language;
    },
    isCurrentLocation(state) {
      return state.isCurrentLocation;
    },
    isLoading(state) {
      return state.isLoading;
    },
    responseError(state) {
      return state.responseError;
    }
  },
  mutations: {
    setCurrentWeather(state, currentWeather) {
      state.currentWeather = {...currentWeather};
      state.location = currentWeather.location;
      state.coordinates = {...currentWeather.coordinates};
    },
    setForecastHourly(state, forecastHourly) {
      state.forecastHourly = {...forecastHourly};
    },
    setForecastDaily(state, forecastDaily) {
      state.forecastDaily = {...forecastDaily};
    },
    setLanguage(state, language) {
      state.language = language;
    },
    setIsCurrentLocation(state, isCurrentLocation) {
      state.isCurrentLocation = isCurrentLocation;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setResponseError(state, responseError) {
      state.responseError = responseError;
    },
  },
  actions: {
  },
  modules: {
  }
})
