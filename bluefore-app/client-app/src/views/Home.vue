<template>
    <div id="home-panel">

      <div id="location-search">
        <input v-model="chosenLocation"
                type="text" 
                :placeholder="TRANSLATE('search_location', language)" 
                @keyup.enter="locationChangeHandler($event)" 
                :class="{ error: responseError?.status === 404 }"
                @input="locationInputHandler($event, this)"
                @focus="locInputFocused = true"
                @blur="blurDelayHandler(false)">
        <div id="city-search" v-if="foundCities.length && locInputFocused">
          <p v-for="city in foundCities" :key="city.id" @click="foundCityClickHandler(city)">{{city.name}} <span>({{city.country}}{{city.state ? ` / ${city.state}` : ''}})</span></p>
        </div>
        <button class="search" @click="locationChangeHandler($event)">
          <img src="../assets/icons/search.svg" />
        </button>
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

      <div v-if="isWeatherExpired" id="weather-expired">
        <p>{{TRANSLATE('weather_expired', language)}}</p>
        <button @click="initPage()">{{TRANSLATE('refresh_page', language)}}</button>
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
import debounce from "lodash/debounce";

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
      responseErrorMessage: '',
      foundCities: [],
      locInputFocused: false,
      isWeatherExpired: false
    }
  },
  created() {
    this.initPage();
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
          case 429:
            this.responseErrorMessage = 'too_many_requests';
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
    initPage() {
      this.isWeatherExpired = false;

      const routeLocation = this.$route.params.location;
      const routeLocationId = this.$route.params.id;

      GEOLOCATION.checkGeolocation();

      if(routeLocationId && routeLocation) {
        this.requestUpdateByLocationId(routeLocationId);
      }
      else if(routeLocationId) {
        this.requestUpdateByLocation(routeLocationId);
      } else {
        GEOLOCATION.updateLocation();
      }
    },
    requestUpdateByLocation(location) {
      REQUESTS.updateWeatherData({location}).then(() => {
        if(!this.responseError) {
          this.chosenLocation = this.location;
          this.$router.push(`/${this.currentWeather.locationId}/${this.chosenLocation}`);
        } else {
          this.$router.push('/');
          this.setIsCurrentLocation(false);
        }

        setTimeout(() => {
          this.foundCities = [];
        }, 500);
      });
    },
    requestUpdateByLocationId(locationId) {
      REQUESTS.updateWeatherData({id: locationId}).then(() => {
        if(!this.responseError) {
          this.chosenLocation = this.location;
          this.$router.push(`/${locationId}/${this.chosenLocation}`);
        } else {
          this.$router.push('/');
          this.setIsCurrentLocation(false);
        }

        setTimeout(() => {
          this.foundCities = [];
        }, 500);
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

            let expireTime = 0;

            this.timerInterval = setInterval(() => {
                setLocalDateTime();

                expireTime++;

                // weather info expires after 30 minutes
                this.isWeatherExpired = expireTime > 1800;

            }, 1000);
        }
    },
    async locationChangeHandler(event) {
      if(this.chosenLocation && this.$route.params.location !== this.chosenLocation || this.responseError) {

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
      $('html, body').animate({scrollTop: 0}, 500);
    },
    followWeatherHandler() {
      GEOLOCATION.updateToGeolocation();
    },
    locationInputHandler: debounce(async (event, self) => {
        if(event.target.value.length > 2) {
          self.foundCities = await REQUESTS.getCitySearchList(event.target.value);
        } else {
          self.foundCities = [];
        }
      }, 500),
    foundCityClickHandler(city) {
      this.requestUpdateByLocationId(city.id);
      $('html, body').animate({scrollTop: 0}, 500);
    },
    blurDelayHandler(isFocused) {
      setTimeout(() => {
        this.locInputFocused = isFocused;
      }, 100);
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
  display: flex;

  @media all and (max-width: $screen-sm-width) {
    position: fixed;
    margin: 0;
    left: $space-primary;
    padding: $space-secondary;
    top: $nav-height - 10px;
    justify-content: space-between;
    background-color: white;
    box-shadow: $shadow-container;
    border-radius: $radius-full;
    z-index: 10;
  }

  input[type=text] {
    min-width: 0;
    border: none;
    padding-left: $space-secondary;
    border-radius: $radius-full;
    margin-right: -34px;

    &:focus {
      background-color: lighten($color-secondary, 45);
    }

    &.error {
      background-color: lighten(red, 40);
    }

    @media all and (max-width: $screen-sm-width) {
      flex-grow: 1;
      -webkit-appearance: none;
      -webkit-box-shadow: $shadow-container;
      box-shadow: $shadow-container;
    }
  }

  #city-search {
    font-size: 14px;
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    background-color: white;
    z-index: 11;
    padding: $space-secondary;
    border-radius: $radius-secondary;
    box-shadow: $shadow-container;
    
    @media all and (max-width: $screen-sm-width) {
      top: 80px;
      max-height: 50vh;
      overflow-y: auto;
    }

    p {
      margin: 0;
      cursor: pointer;
      border-radius: $radius-secondary;
      padding: 4px 10px;

      &:hover {
        background-color: lighten($color-primary, 35);
      }

      span {
        color: $font-color-light;
      }
    }
  }

  button {
    height: 34px;
    width: 34px;
    border: none;
    border-radius: $radius-full;
    position: relative;
  }

  button.search {
    background-color: $color-primary;

    img {
      position: absolute;
      height: 18px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: invert(1);
    }
  }

  button.my-location {
    background-color: $color-secondary;
    margin-left: $space-secondary;

    @media all and (max-width: $screen-sm-width) {
      margin-left: 10px;
    }

    img {
      position: absolute;
      height: 20px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &:disabled {
      opacity: 0.4;
    }
  }
}

@mixin warning-message($color) {
  margin: 0 auto;
  margin-bottom: $space-primary;
  text-align: center;
  background-color: lighten($color, 30);
  border-radius: $radius-primary;
  padding: 10px;

  @media all and (max-width: $screen-sm-width) {
    margin-bottom: 0;
    margin-top: $space-secondary;
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
    background-color: $color;
  }
}

#geolocation-disabled {
  @include warning-message($color-primary);
}

#weather-expired {
  @include warning-message($color-secondary);
}

#home-panel {
  max-width: $screen-lg-width;
  padding: $space-primary;
  padding-bottom: 0;
  margin: 0 auto;
  position: relative;

  @media all and (max-width: $screen-sm-width) {
    padding-top: 1px;
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
