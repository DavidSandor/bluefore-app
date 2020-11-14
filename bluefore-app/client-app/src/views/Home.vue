<template>
    <div id="home-panel">

      <div id="location-search">
        <input v-model="chosenLocation" type="text" :placeholder="TRANSLATE('search_location', language)" @keyup.enter="locationChangeHandler($event)" :class="{ error: responseError?.status === 404} ">
        <button class="search" @click="locationChangeHandler($event)"><img src="../assets/icons/search.svg" /></button>
        <button class="my-location" v-if="(geolocationStatus === 'granted' && !isCurrentLocation)" @click="currentLocationHandler()">
          <img src="../assets/icons/location.svg" />
        </button>
      </div>

      <div v-if="geolocationStatus !== 'granted'" id="geolocation-disabled">
        <template v-if="geolocationStatus === 'prompt'">
          <p>{{TRANSLATE('location_prompt', language)}}</p>
          <button @click="followWeatherHandler">{{TRANSLATE('follow', language)}}</button>
        </template>
        <template v-else>
          <p>{{TRANSLATE('location_disabled', language)}}</p>
        </template>
      </div>

      <template v-if="!responseError">
        <div id="date-time-panel">
          <p class="mobile-hide">{{TRANSLATE(localDay, language)}}</p>
          <p class="mobile-hide">{{localDate}}</p>
          <p><span><img id="clock-icon" src="../assets/icons/clock.svg" /><span class="mobile-hide">{{TRANSLATE('local_time', language)}}</span></span>{{localTime}}</p>
          <p><span><img src="../assets/icons/wi-sunrise.svg" /><span class="mobile-hide">{{TRANSLATE('sunrise', language)}}</span></span>{{sunrise}}</p>
          <p><span><img src="../assets/icons/wi-sunset.svg" /><span class="mobile-hide">{{TRANSLATE('sunset', language)}}</span></span>{{sunset}}</p>
        </div>

        <div id="current-hourly-panel">
          <current-weather class="cw"></current-weather>
          <forecast-hourly class="fh"></forecast-hourly>
        </div>

        <img id="calendar-icon" src="../assets/icons/calendar.svg" />

        <forecast-daily></forecast-daily>
      </template>
      <template v-else>
        <p class="response-error">{{TRANSLATE(responseErrorMessage, language)}}</p>
      </template>
    </div>
</template>

<script>
import currentWeather from '@/components/CurrentWeather.vue';
import forecastHourly from '@/components/ForecastHourly.vue';
import forecastDaily from '@/components/ForecastDaily.vue';
import DATE_HELPER from '@/utility/date-helper';
import LANGUAGE_HELPER from '@/languages/languages';
import REQUESTS from '@/connection/requests';
import GEOLOCATION from '@/geolocation/geolocation';
import { mapGetters, mapMutations } from 'vuex';
import $ from 'jquery';

export default {
  name: 'Home',
  components: {
    currentWeather,
    forecastHourly,
    forecastDaily
  },
  data() {
    return {
      localDay: '',
      localDate: '',
      localTime: '',
      timerInterval: '',
      sunrise: '',
      sunset: '',
      chosenLocation: '',
      responseErrorMessage: ''
    }
  },
  created() {
    const routeLocation = this.$route.params.location;
    GEOLOCATION.checkGeolocation();

    if(routeLocation && routeLocation.toLowerCase() !== this.location.toLowerCase()) {
      this.requestUpdateByLocation(routeLocation);
    } else {
      GEOLOCATION.updateLocation();
    }
  },
  watch: {
    currentWeather() {
      this.updateCurrentWeatherData();
    },
    isCurrentLocation(val) {
      if(val) {
        this.$router.push('/');
        this.chosenLocation = '';
      }
    },
    // language change
    language() {
      if(!this.responseError) {
        if(this.isCurrentLocation) {
          GEOLOCATION.updateLocation();
        } else {
          this.requestUpdateByLocation(this.location);
        }
      }
    },
    // units change
    units() {
      if(!this.responseError) {
        if(this.isCurrentLocation) {
          GEOLOCATION.updateLocation();
        } else {
          this.requestUpdateByLocation(this.location);
        }
      }
    },
    responseError(error) {
      if(error) {
        switch(error.status) {
          case 404:
            this.responseErrorMessage = 'location_not_found';
            break;
          default:
            this.responseErrorMessage = 'request_error';
            break;
        }
      }
    }
  },
  computed: {
  ...mapGetters([
        'location',
        'currentWeather',
        'responseError',
        'isCurrentLocation',
        'geolocationStatus',
        'language',
        'units'
        ]),
  },
  methods: {
    ...mapMutations([
        'setIsCurrentLocation'
        ]),
    requestUpdateByLocation(location) {
        REQUESTS.updateWeatherData({location}).then(() => {
          if(!this.responseError) {
            this.chosenLocation = this.location;
            this.$router.push(`/${this.chosenLocation}`);
          } else {
            this.$router.push('/');
            this.setIsCurrentLocation(false);
          }
        });
    },
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
                this.localDate = `${date.getUTCDate()}. ${this.TRANSLATE(DATE_HELPER.getMonth(date.getUTCMonth()), this.language)} ${date.getUTCFullYear()}`;
                this.localTime = DATE_HELPER.convertToHourFormat(date);
            }

            setLocalDateTime();

            this.timerInterval = setInterval(() => {
                setLocalDateTime();
            }, 1000);
        }
    },
    async locationChangeHandler(event) {
      if(this.chosenLocation && this.chosenLocation.toLowerCase() !== this.location.toLowerCase() || this.responseError) {

        await this.requestUpdateByLocation(this.chosenLocation);

        if(this.responseError) {
          event?.target.focus();
        }

        $('html, body').animate({scrollTop: 0}, 500);
      }

      event?.target.blur();
    },
    currentLocationHandler() {
      GEOLOCATION.updateLocation();
    },
    followWeatherHandler() {
      GEOLOCATION.updateToGeolocation();
    },
    TRANSLATE(word, language) {
      if(word && language) {
        return LANGUAGE_HELPER(word, language);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.mobile-hide {
  @media all and (max-width: $screen-lg-width) {
    display: none;
  }
}

#location-search {
  position: absolute;
  right: $space-primary;
  top: -57px;

  @media all and (max-width: $screen-sm-width) {
    position: fixed;
    margin: 0;
    left: $space-primary;
    padding: $space-secondary;
    top: $nav-height - 10px;
    display: flex;
    justify-content: space-between;
    background-color: white;
    box-shadow: $shadow-container;
    border-radius: $radius-full;
    z-index: 10;
  }

  input[type=text] {
    min-width: 0;
    border: none;
    height: 34px;
    padding-left: $space-secondary;
    border-radius: $radius-full;

    &:focus {
      background-color: lighten($color-secondary, 45);
    }

    &.error {
      background-color: lighten(red, 40);
    }

    @media all and (max-width: $screen-sm-width) {
      flex-grow: 1;
      box-shadow: $shadow-container;
    }
  }

  button {
    height: 34px;
    width: 34px;
    border: none;
    border-radius: $radius-full;
  }

  button.search {
    background-color: $color-primary;
    color: white;
    margin-left: -34px;

    img {
      height: 22px;
      filter: invert(1);
      padding-bottom: 3px;
    }
  }

  button.my-location {
    background-color: $color-secondary;
    margin-left: $space-secondary;

    @media all and (max-width: $screen-sm-width) {
      margin-left: 10px;
    }

    img {
      width: 100%;
    }

    &:disabled {
      opacity: 0.4;
    }
  }
}

#geolocation-disabled {
  margin: 0 auto;
  margin-bottom: $space-primary;
  text-align: center;
  background-color: lighten($color-primary, 30);
  border-radius: $radius-primary;
  padding: 10px;

  @media all and (max-width: $screen-sm-width) {
    margin-bottom: 0;
    margin-top: 70px;
  }

  p {
    margin: 0;
    font-size: 12px;
    margin-right: 10px;
    display: inline-block;

    @media all and (max-width: $screen-sm-width) {
      display: block;
      margin-right: 0;
    }
  }

  button {
    font-size: 12px;
    padding: 2px 10px;
    border: none;
    border-radius: $radius-full;
    box-shadow: $shadow-container;
    color: white;
    background-color: $color-primary;
  }
}

#home-panel {
  max-width: $screen-lg-width;
  padding: $space-primary;
  padding-bottom: 0;
  margin: 0 auto;
  position: relative;

  @media all and (max-width: $screen-sm-width) {
    padding-top: 0;
  }

  #date-time-panel {
    display: flex;
    padding: $space-primary;
    padding-top: 0;
    justify-content: center;
    font-size: 14px;
    width: 100%;

      @media all and (max-width: $screen-sm-width) {
        padding-top: 10px;
        padding-bottom: 12px;
      }

    p {
      margin: 0;
      margin-right: 25px;

      @media all and (max-width: $screen-sm-width) {

        margin-right: 10px;

        &:last-of-type {
          margin: 0;
        }
      }

      span {
        color: $font-color-light;
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
    margin-bottom: $space-secondary;

    @media all and (max-width: $screen-lg-width) {
        flex-wrap: wrap;
        align-items: flex-start;
    }

    .cw {
      margin-right: $space-secondary;

      @media all and (max-width: $screen-lg-width) {
        margin: 0 auto;
        margin-bottom: $space-primary;
      }
    }

    .fh {
      flex-grow: 1;

      @media all and (max-width: $screen-lg-width) {
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
</style>
