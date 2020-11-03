<template>
  <div>
    <div id="nav">
      <div id="nav-inner">
        <h1><span>blue</span>Fore</h1>
        <i class="owi owi-02d"></i>
        <div id="location-search">
          <input v-model.lazy="chosenLocation" type="text" placeholder="Search location">
          <button class="search"><img src="./assets/icons/search.svg" /></button>
          <button class="my-location" :disabled="isUseCurrentLocation || !currentLocationEnabled" @click="isUseCurrentLocation = true">
            <img src="./assets/icons/location.svg" />
          </button>
        </div>
        <img id="responsive-menu-button" src="./assets/icons/menu.svg" @click="this.isMenuShown = !this.isMenuShown" />
      </div>
    </div>
    <div v-if="isMenuShown" id="language-panel">
      <img v-if="language !== 'hu'" @click="() => languageClickHandler('hu')" src="./assets/icons/hungary.svg" />
      <img v-if="language !== 'en'" @click="() => languageClickHandler('en')" src="./assets/icons/uk.svg" />
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
      isUseCurrentLocation: true,
      isMenuShown: false
    }
  },
  created() {
    GEOLOCATION.updateLocation();
    window.addEventListener("resize", this.windowResizeHandler);
    this.isMenuShown = window.innerWidth > 700;
  },
  destroyed() {
    window.removeEventListener("resize", this.windowResizeHandler);
  },
  watch: {
    chosenLocation(val) {
      if(val && val !== this.location) {
        this.isUseCurrentLocation = false;
        REQUESTS.updateWeatherData({location: this.chosenLocation});
      }
    },
    language(val) {
      REQUESTS.updateWeatherData({latitude: this.coordinates.lat, longitude: this.coordinates.lon});
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
        'language',
        'coordinates',
        'currentLocationEnabled'
        ]),
  },
  methods: {
    ...mapMutations([
        'setLanguage',
        'setUseCurrentLocation'
        ]),
    languageClickHandler(lang) {
      this.setLanguage(lang);
      this.isMenuShown = window.innerWidth > 700;
    },
    windowResizeHandler(e) {
      this.isMenuShown = e.target.innerWidth > 700;
    }
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

#responsive-menu-button {
  position: absolute;
  line-height: 80px;
  right: 20px;
  height: 30px;
  filter: invert(1);
  display: none;

  @media all and (max-width: 700px) {
    display: block;
  }
}

#language-panel {
  position: absolute;
  right: 0;
  top: 80px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  z-index: 10;

  @media all and (max-width: 700px) {
    background-color: #17224D;
    opacity: 0.9;
    bottom: 0;
    padding-left: 30px;
    padding-right: 30px;
  }

  img {
    width: 34px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 100px;
    cursor: pointer;
  }
}

#nav {
  height: 80px;
  background-color: #17224D;
  z-index: 10;

  @media all and (max-width: 700px) {
    margin-bottom: 60px;
  }

  #nav-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: inherit;
    max-width: 1040px;
    margin: 0 auto;
    color: white;
    padding: 0 20px;

    h1 {
      text-align: left;
      font-size: 40px;
      line-height: inherit;
      margin: 0;

      @media all and (max-width: 700px) {
        font-size: 30px;
      }

      span {
        color: #008FFE;
      }
    }

    i {
      padding: 0 10px;
      font-size: 50px;
      margin-left: 5px;

      @media all and (max-width: 700px) {
        font-size: 30px;
        margin-left: 0;
      }
    }

    #location-search {
      margin-left: auto;

      @media all and (max-width: 700px) {
        position: absolute;
        left: 20px;
        right: 20px;
        top: 100px;
        text-align: left;
      }

      input[type=text] {
        border: none;
        height: 34px;
        padding-left: 15px;
        border-radius: 100px 0 0 100px;

        @media all and (max-width: 700px) {
          width: 65%;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
      }

      button.search {
        height: 34px;
        border: none;
        background-color: #008FFE;
        color: white;
        border-radius: 0 100px 100px 0;
        padding: 0 10px;

        img {
          height: 22px;
          filter: invert(1);
          padding-bottom: 3px;
        }
      }

      button.my-location {
        border-radius: 100px;
        height: 34px;
        width: 34px;
        border: none;
        background-color: #FF9200;
        margin-left: 15px;

        @media all and (max-width: 700px) {
          margin-left: 10px;
        }

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
