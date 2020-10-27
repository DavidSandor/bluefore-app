<template>
  <div>
    <input v-model.lazy="chosenLocation" type="text">

    <hr>

    <input type="radio" id="hun" value="hu" v-model="chosenLanguage">
    <label for="hun">Hun</label>
    <br>
    <input type="radio" id="eng" value="en" v-model="chosenLanguage">
    <label for="eng">Eng</label>
    <br>

    <hr>

    <input v-model="isUseCurrentLocation" type="checkbox" :disabled="!currentLocationEnabled"> Use current location

    <br>

    <current-weather class="current-weather"></current-weather>
    <forecast-hourly class="forecast-hourly"></forecast-hourly>
    <forecast-daily class="forecast-daily"></forecast-daily>
  </div>
</template>

<script>
import currentWeather from '@/components/CurrentWeather.vue';
import forecastHourly from '@/components/ForecastHourly.vue';
import forecastDaily from '@/components/ForecastDaily.vue';
import REQUESTS from '@/connection/requests';
import GEOLOCATION from '@/geolocation/geolocation';

import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Home',
  components: {
    currentWeather,
    forecastHourly,
    forecastDaily
  },
  data() {
    return {
      chosenLocation: '',
      chosenLanguage: 'en',
      isUseCurrentLocation: true
    }
  },
  created() {
    GEOLOCATION.updateLocation();
  },
  watch: {
    chosenLocation(val) {
      if(val && val !== this.location) {
        this.isUseCurrentLocation = false;
        REQUESTS.updateWeatherData({location: this.chosenLocation});
      }
    },
    chosenLanguage(val) {
      this.setLanguage(val);
      REQUESTS.updateWeatherData({latitude: this.coordinates.lat, longitude: this.coordinates.lon});
    },
    isUseCurrentLocation(val) {
      this.setUseCurrentLocation(val);
      if(val) {
        this.chosenLocation = '';
        GEOLOCATION.updateLocation();
      }
    }
  },
  computed: {
  ...mapGetters([
        'location',
        'coordinates',
        'currentWeather',
        'currentLocationEnabled'
        ]),
  },
  methods: {
    ...mapMutations([
        'setLanguage',
        'setUseCurrentLocation'
        ]),
  }
}
</script>

<style scoped>
.current-weather {
  border: 1px solid gray;
}

.forecast-hourly {
  border: 1px solid gray;
}

.forecast-daily {
  border: 1px solid gray;
}
</style>
