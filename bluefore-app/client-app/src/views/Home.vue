<template>
  <div>
    <input v-model.lazy="location" type="text">
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
      location: ''
    }
  },
  created() {
    GEOLOCATION.updateLocation();
  },
  watch: {
    location() {
      REQUESTS.updateCurrentWeather({location: this.location});
    }
  },
  computed: {
  ...mapGetters([
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
