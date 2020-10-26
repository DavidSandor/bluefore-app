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

export default {
  name: 'Home',
  components: {
    currentWeather
  },
  data() {
    return {
      location: 'Budapest',
      language: 'en'
    }
  },
  created() {
    REQUESTS.updateCurrentWeather({location: this.location, language: this.language});
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
