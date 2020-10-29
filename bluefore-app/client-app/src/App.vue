<template>
  <div>
    <div id="nav">
      <div id="nav-inner">
        <h1><span>blue</span>Fore</h1>
        <i class="owi owi-02d"></i>
        <div id="location-search">
          <input v-model.lazy="chosenLocation" type="text" placeholder="Search location">
          <button class="search">SEARCH</button>
          <button class="my-location" :disabled="isUseCurrentLocation || !currentLocationEnabled" @click="isUseCurrentLocation = true">
            <img src="./assets/icons/location.svg" />
          </button>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>

import REQUESTS from '@/connection/requests';
import GEOLOCATION from '@/geolocation/geolocation';
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      chosenLocation: '',
      chosenLanguage: 'en',
      isUseCurrentLocation: true
    }
  },
  created() {
    GEOLOCATION.updateLocation();
  },
  watch: {
    chosenLocation(val) {
      if(val && val !== this.location) {
        this.isUseCurrentLocation = false;
        REQUESTS.updateWeatherData({location: this.chosenLocation});
      }
    },
    isUseCurrentLocation(val) {
      this.setUseCurrentLocation(val);
      if(val) {
        this.chosenLocation = '';
        GEOLOCATION.updateLocation();
      }
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
  }
}
</script>

<style lang="scss">

body {
  background-color: #F5FAFA!important;
}

#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
}

#nav {
  height: 80px;
  background-color: #17224D;

  #nav-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: inherit;
    max-width: 1020px;
    margin: 0 auto;
    color: white;

    h1 {
      text-align: left;
      font-size: 40px;
      line-height: inherit;
      margin: 0;

      span {
        color: #008FFE;
      }
    }

    i {
      padding: 0 10px;
      font-size: 50px;
      margin-left: 5px;
    }

    #location-search {
      margin-left: auto;

      input[type=text] {
        border: none;
        height: 34px;
        padding-left: 15px;
        border-radius: 100px 0 0 100px;
      }

      button.search {
        height: 34px;
        border: none;
        background-color: #008FFE;
        color: white;
        border-radius: 0 100px 100px 0;
        padding: 0 15px;
      }

      button.my-location {
        border-radius: 100px;
        height: 34px;
        width: 34px;
        border: none;
        background-color: #FF9200;
        margin-left: 15px;

        img {
          height: 22px;
          filter: invert(1);
        }

        &:disabled {
          opacity: 0.4;
        }
      }
    }
  }
}
</style>
