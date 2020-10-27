<template>
  <div>
    <input v-model.lazy="chosenLocation" type="text">

    <br>
    <input type="radio" id="hun" value="hu" v-model="chosenLanguage">
    <label for="hun">Hun</label>
    <br>
    <input type="radio" id="eng" value="en" v-model="chosenLanguage">
    <label for="eng">Eng</label>
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
      chosenLanguage: 'en'
    }
  },
  created() {
    GEOLOCATION.updateLocation();
  },
  watch: {
    chosenLocation() {
      REQUESTS.updateWeatherData({location: this.chosenLocation});
    },
    chosenLanguage() {
      this.setLanguage(this.chosenLanguage);
      REQUESTS.updateWeatherData({latitude: this.coordinates.lat, longitude: this.coordinates.lon});
    }
  },
  computed: {
  ...mapGetters([
        'coordinates',
        'currentWeather'
        ]),
  },
  methods: {
    ...mapMutations([
        'setLanguage'
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
