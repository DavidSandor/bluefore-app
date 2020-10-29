<template>
  <div id="home-panel">

    <div id="date-time-panel">
      <p>{{localDay}}</p>
      <p>{{localDate}}</p>
      <p><span>local time</span>{{localTime}}</p>
      <p><span><img src="../assets/icons/wi-sunrise.svg" />sunrise</span>{{sunrise}}</p>
      <p><span><img src="../assets/icons/wi-sunset.svg" />sunset</span>{{sunset}}</p>
    </div>

    <!-- <input type="radio" id="hun" value="hu" v-model="chosenLanguage">
    <label for="hun">Hun</label>
    <br>
    <input type="radio" id="eng" value="en" v-model="chosenLanguage">
    <label for="eng">Eng</label>
    <br> -->

    <div id="current-hourly-panel">
      <current-weather></current-weather>
      <forecast-hourly></forecast-hourly>
    </div>

    <forecast-daily></forecast-daily>
  </div>
</template>

<script>
import currentWeather from '@/components/CurrentWeather.vue';
import forecastHourly from '@/components/ForecastHourly.vue';
import forecastDaily from '@/components/ForecastDaily.vue';
import REQUESTS from '@/connection/requests';
import DATE_HELPER from '@/utility/date-helper';

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
      chosenLanguage: 'en',
      localDay: '',
      localDate: '',
      localTime: '',
      timerInterval: '',
      sunrise: '',
      sunset: ''
    }
  },
  watch: {
    chosenLanguage(val) {
      this.setLanguage(val);
      REQUESTS.updateWeatherData({latitude: this.coordinates.lat, longitude: this.coordinates.lon});
    },
    currentWeather() {
      this.updateCurrentWeatherData();
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

            this.isWeatherLoaded = true;
        } else {
            this.isWeatherLoaded = false;
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
  }
}


</style>
