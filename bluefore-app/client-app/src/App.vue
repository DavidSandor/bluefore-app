<template>
  <div>
    <div id="nav">
      <div id="nav-inner">
        <h1><span>blue</span>fore</h1>
        <img id="brand-icon" src="./assets/icons/sunny.svg" />
        <div id="location-search">
          <input v-model.lazy="chosenLocation" type="text" placeholder="search location">
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
  unmounted() {
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

@import url(https://fonts.googleapis.com/css?family=Comfortaa);

body {
  background-color: #F5FAFA!important;
}

#app {
   font-family: "Comfortaa", Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
}

#brand-icon {
  filter: invert(1);
  width: 45px;
  margin-left: 10px;
  margin-bottom: 10px;

  @media all and (max-width: 700px) {
    width: 35px;
    margin-left: 6px;
  }
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
    padding: 30px;
    right: 0;
    bottom: 0;
    top: 70px;
    position: fixed;
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
    position: sticky;
    top: 0;
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

    #location-search {
      margin-left: auto;

      @media all and (max-width: 700px) {
        position: absolute;
        left: 20px;
        right: 20px;
        padding: 15px;
        top: 70px;
        display: flex;
        justify-content: space-between;
        background-color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border-radius: 30px;
      }

      input[type=text] {
        min-width: 0;
        border: none;
        height: 34px;
        padding-left: 15px;
        border-radius: 100px;

        @media all and (max-width: 700px) {
          flex-grow: 1;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
      }

      button.search {
        height: 34px;
        width: 34px;
        border: none;
        background-color: #008FFE;
        color: white;
        border-radius: 100px;
        margin-left: -34px;

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
        background-color: #FFA500;
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
