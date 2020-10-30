<template>
    <div id="home-panel">

      <transition name="fade">
        <scale-loader v-if="isLoading" class="scale-loader" :color="'#008FFE'"></scale-loader>
      </transition>

      <div id="date-time-panel">
        <p>{{localDay}}</p>
        <p>{{localDate}}</p>
        <p><span>local time</span>{{localTime}}</p>
        <p><span><img src="../assets/icons/wi-sunrise.svg" />sunrise</span>{{sunrise}}</p>
        <p><span><img src="../assets/icons/wi-sunset.svg" />sunset</span>{{sunset}}</p>
      </div>

      <div id="current-hourly-panel">
        <current-weather class="cw"></current-weather>
        <forecast-hourly class="fh"></forecast-hourly>
      </div>

      <forecast-daily></forecast-daily>
    </div>
</template>

<script>
import currentWeather from '@/components/CurrentWeather.vue';
import forecastHourly from '@/components/ForecastHourly.vue';
import forecastDaily from '@/components/ForecastDaily.vue';
import DATE_HELPER from '@/utility/date-helper';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Home',
  components: {
    currentWeather,
    forecastHourly,
    forecastDaily,
    ScaleLoader
  },
  data() {
    return {
      localDay: '',
      localDate: '',
      localTime: '',
      timerInterval: '',
      sunrise: '',
      sunset: ''
    }
  },
  watch: {
    currentWeather() {
      this.updateCurrentWeatherData();
    }
  },
  computed: {
  ...mapGetters([
        'coordinates',
        'currentWeather',
        'isLoading'
        ]),
  },
  methods: {
    updateCurrentWeatherData() {
        if(this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        if(this.currentWeather?.location) {
            this.sunrise = DATE_HELPER.convertToHourFormat(new Date(this.currentWeather.sunrise + this.currentWeather.timezone));
            this.sunset = DATE_HELPER.convertToHourFormat(new Date(this.currentWeather.sunset + this.currentWeather.timezone));

            const setLocalDateTime = () => {
                const date = new Date(Date.now() + this.currentWeather.timezone);
                this.localDay = DATE_HELPER.getWeekday(date.getUTCDay());
                this.localDate = DATE_HELPER.convertToDateFormat(date);
                this.localTime = DATE_HELPER.convertToHourFormat(date);
            }

            setLocalDateTime();

            this.timerInterval = setInterval(() => {
                setLocalDateTime();
            }, 1000);
        }
    },
  }
}
</script>

<style scoped lang="scss">
#home-panel {
  max-width: 1020px;
  margin: 0 auto;
  position: relative;

  .scale-loader {
    position: absolute;
    left: 0;
    top: 15px;
  }

  #date-time-panel {
    display: flex;
    padding: 25px;
    justify-content: center;
    font-size: 14px;

    p {
      margin: 0;
      margin-right: 25px;

      span {
        color: #848484;
        margin-right: 5px;

        img {
          filter: invert(0.7);
          height: 22px;
        }
      }
    }
  }

  #current-hourly-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    .cw {
      margin-right: 15px;
    }

    .fh {
      flex-grow: 1;
    }
  }
}

// Scale loader transitions

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
    opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
