<template>
    <div id="home-panel">
      <template v-if="!isRequestError">
        <transition name="fade">
          <scale-loader v-if="isLoading" class="scale-loader" :color="'#008FFE'"></scale-loader>
        </transition>

        <div id="date-time-panel">
          <p class="mobile-hide">{{localDay}}</p>
          <p class="mobile-hide">{{localDate}}</p>
          <p><span><img id="clock-icon" src="../assets/icons/clock.svg" /><span class="mobile-hide">local time</span></span>{{localTime}}</p>
          <p><span><img src="../assets/icons/wi-sunrise.svg" /><span class="mobile-hide">sunrise</span></span>{{sunrise}}</p>
          <p><span><img src="../assets/icons/wi-sunset.svg" /><span class="mobile-hide">sunset</span></span>{{sunset}}</p>
        </div>

        <div id="current-hourly-panel">
          <current-weather class="cw"></current-weather>
          <forecast-hourly class="fh"></forecast-hourly>
        </div>

        <img id="calendar-icon" src="../assets/icons/calendar.svg" />

        <forecast-daily></forecast-daily>
      </template>
      <template v-else>
        <p class="response-error">Sorry, something went wrong during weather request!</p>
      </template>
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
        'currentWeather',
        'isLoading',
        'isRequestError'
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
.mobile-hide {
  @media all and (max-width: 1040px) {
    display: none;
  }
}

#home-panel {
  max-width: 1040px;
  padding: 20px;
  padding-bottom: 0;
  margin: 0 auto;
  position: relative;

  @media all and (max-width: 700px) {
    padding-top: 0;
  }

  .scale-loader {
    position: absolute;
    left: 20px;
    top: 15px;

    @media all and (max-width: 700px) {
      left: 200px;
      top: -120px;
      z-index: 20;
    }
  }

  #date-time-panel {
    display: flex;
    padding: 20px;
    padding-top: 0;
    justify-content: center;
    font-size: 14px;
    width: 100%;

      @media all and (max-width: 700px) {
        padding: 10px;
        padding-bottom: 12px;
        justify-content: flex-start;
      }

    p {
      margin: 0;
      margin-right: 25px;

      @media all and (max-width: 700px) {

        margin-right: 10px;

        &:last-of-type {
          margin: 0;
        }
      }

      span {
        color: #848484;
        margin-right: 5px;

        img {
          filter: invert(0.7);
          height: 22px;
        }

        #clock-icon {
          height: 13px;
          margin-right: 2px;
        }
      }
    }
  }

  #current-hourly-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;

    @media all and (max-width: 1040px) {
        flex-wrap: wrap;
        align-items: flex-start;
    }

    .cw {
      margin-right: 15px;

      @media all and (max-width: 1040px) {
        margin: 0 auto;
        margin-bottom: 20px;
      }
    }

    .fh {
      flex-grow: 1;

      @media all and (max-width: 1040px) {
        margin: 0 auto;
        flex-grow: 0;
      }
    }
  }

  #calendar-icon {
    display: block;
    margin: 0 auto;
    height: 30px;
    filter: invert(0.7);
  }
}

.response-error {
  text-align: center;
  padding: 50px 0 0 0;
  margin: 0;
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
