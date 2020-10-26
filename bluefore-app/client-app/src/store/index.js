import { createStore } from 'vuex'

export default createStore({
  state: {
    location: '',
    coordinates: '',
    currentWeather: ''
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
    }
  },
  mutations: {
    setCurrentWeather(state, currentWeather) {
      state.currentWeather = {...currentWeather};
      state.location = currentWeather.location;
      state.coordinates = {...currentWeather.coordinates};
    }
  },
  actions: {
  },
  modules: {
  }
})
