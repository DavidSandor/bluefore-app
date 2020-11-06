<template>
  <div>
    <div id="nav">
      <div id="nav-inner">
        <h1><span>blue</span>fore</h1>
        <img id="brand-icon" src="./assets/icons/sunny.svg" />
        <div id="location-search">
          <input v-model="chosenLocation" type="text" placeholder="search location" @keyup.enter="locationChangeHandler($event)">
          <button class="search" @click="locationChangeHandler($event)"><img src="./assets/icons/search.svg" /></button>
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

import $ from 'jquery';

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
  unmounted() {
    window.removeEventListener("resize", this.windowResizeHandler);
  },
  watch: {
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
    locationChangeHandler(event) {
      if(this.chosenLocation && this.chosenLocation.toLowerCase() !== this.location.toLowerCase()) {

        this.isUseCurrentLocation = false;
        REQUESTS.updateWeatherData({location: this.chosenLocation});
        
        $('html, body').animate({scrollTop: 0}, 500);
      }

      event.target.blur();
    },
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
  background-color: $color-body!important;
}

#app {
   font-family: $font-primary, $font-backup;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
}

#brand-icon {
  filter: invert(1);
  width: 45px;
  margin-left: 10px;
  margin-bottom: 10px;

  @media all and (max-width: $screen-sm-width) {
    width: 35px;
    margin-left: 6px;
  }
}

#responsive-menu-button {
  position: absolute;
  line-height: $nav-height;
  right: $space-primary;
  height: 30px;
  filter: invert(1);
  display: none;

  @media all and (max-width: $screen-sm-width) {
    display: block;
  }
}

#language-panel {
  position: absolute;
  right: 0;
  top: $nav-height;
  padding: $space-secondary;
  display: flex;
  flex-direction: column;
  z-index: 10;

  @media all and (max-width: $screen-sm-width) {
    background-color: $color-primary-dark;
    opacity: 0.9;
    padding: $space-primary;
    right: 0;
    bottom: 0;
    top: $nav-height - 10px;
    position: fixed;
  }

  img {
    width: 34px;
    box-shadow: $shadow-container;
    border-radius: $radius-full;
    cursor: pointer;
  }
}

#nav {
  height: $nav-height;
  background-color: $color-primary-dark;
  z-index: 10;

  @media all and (max-width: $screen-sm-width) {
    margin-bottom: 60px;
    position: sticky;
    top: 0;
  }

  #nav-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: inherit;
    max-width: $screen-lg-width;
    margin: 0 auto;
    color: white;
    padding: 0 $space-primary;

    h1 {
      text-align: left;
      font-size: 40px;
      line-height: inherit;
      margin: 0;

      @media all and (max-width: $screen-sm-width) {
        font-size: 30px;
      }

      span {
        color: $color-primary;
      }
    }

    #location-search {
      margin-left: auto;

      @media all and (max-width: $screen-sm-width) {
        position: absolute;
        left: $space-primary;
        right: $space-primary;
        padding: $space-secondary;
        top: 70px;
        display: flex;
        justify-content: space-between;
        background-color: white;
        box-shadow: $shadow-container;
        border-radius: $radius-full;
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
