import { createStore } from 'vuex'

// Determine initial app language
const initLanguage = (() => {
  if(localStorage.getItem('language')) {
    return localStorage.getItem('language');
  } else {
    return navigator.language.includes('hu') ? 'hu' : 'en'; 
  }
})();

// Determine initial data units
const initUnits = (() => {
  if(localStorage.getItem('units')) {
    return localStorage.getItem('units');
  } else {
    return 'metric';
  }
})();

// Determine initial geolocation enabled
const initGeoStatus = (() => {
  if(sessionStorage.getItem('geoStatus')) {
    return sessionStorage.getItem('geoStatus');
  } else {
    return 'prompt';
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
    isCurrentLocation: false,
    isLoading: false,
    responseError: '',
    units: initUnits,
    geolocationStatus: initGeoStatus
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
    },
    units(state) {
      return state.units;
    },
    geolocationStatus(state) {
      return state.geolocationStatus;
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
      localStorage.setItem('language', language);
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
    setUnits(state, units) {
      state.units = units;
      localStorage.setItem('units', units);
    },
    setGeolocationStatus(state, geolocationStatus) {
      state.geolocationStatus = geolocationStatus;
      sessionStorage.setItem('geoStatus', geolocationStatus);
    }
  },
  actions: {
  },
  modules: {
  }
})
