import { createStore } from 'vuex'

export default createStore({
  state: {
    location: '',
    coordinates: '',
    currentWeather: '',
    forecastHourly: '',
    forecastDaily: '',
    language: 'en',
    useCurrentLocation: true,
    currentLocationEnabled: true,
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
    useCurrentLocation(state) {
      return state.useCurrentLocation;
    },
    currentLocationEnabled(state) {
      return state.currentLocationEnabled;
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
    setUseCurrentLocation(state, useCurrentLocation) {
      state.useCurrentLocation = useCurrentLocation;
    },
    setCurrentLocationEnabled(state, currentLocationEnabled) {
      state.currentLocationEnabled = currentLocationEnabled;
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
