<template>
  <div>
    <input v-model.lazy="location" type="text">
    <current-weather class="current-weather"></current-weather>
  </div>
</template>

<script>
// @ is an alias to /src
import currentWeather from '@/components/CurrentWeather.vue'
import REQUESTS from '@/connection/requests';
import GEOLOCATION from '@/geolocation/geolocation';

export default {
  name: 'Home',
  components: {
    currentWeather
  },
  data() {
    return {
      location: '',
      language: ''
    }
  },
  created() {
    GEOLOCATION.updateLocation();
  },
  watch: {
    location() {
      REQUESTS.updateCurrentWeather({location: this.location, language: this.language});
    }
  }
}
</script>

<style scoped>
.current-weather {
    border: 1px solid gray;
}
</style>
