<template>
  <div>
    <input v-model.lazy="location" type="text">
    <current-weather class="current-weather" :location="location" :language="language"></current-weather>
  </div>
</template>

<script>
// @ is an alias to /src
import currentWeather from '@/components/CurrentWeather.vue'

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
  }
}
</script>

<style scoped>
.current-weather {
    border: 1px solid gray;
}
</style>
