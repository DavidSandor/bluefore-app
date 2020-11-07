<template>
  <div>
    <div id="nav">
      <div id="nav-inner">
        <h1><span>blue</span>fore</h1>
        <img id="brand-icon" src="./assets/icons/sunny.svg" />
        <transition name="fade">
          <scale-loader v-if="isLoading" :color="'#008FFE'"></scale-loader>
        </transition>
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
import { mapGetters, mapMutations } from 'vuex';
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';
import $ from 'jquery';

export default {
  components: {
    ScaleLoader
  },
  data() {
    return {
      isMenuShown: false
    }
  },
  created() {
    window.addEventListener("resize", this.windowResizeHandler);
    this.isMenuShown = window.innerWidth > 700;
  },
  unmounted() {
    window.removeEventListener("resize", this.windowResizeHandler);
  },
  watch: {
    language(val) {
      REQUESTS.updateWeatherData({latitude: this.coordinates.lat, longitude: this.coordinates.lon});
    }
  },
  computed: {
  ...mapGetters([
        'language',
        'coordinates',
        'isLoading'
        ]),
  },
  methods: {
    ...mapMutations([
        'setLanguage'
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
  margin-right: $space-secondary;

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
  padding: $space-primary;
  display: flex;
  flex-direction: column;
  z-index: 11;

  @media all and (max-width: $screen-sm-width) {
    background-color: $color-primary-dark;
    opacity: 0.9;
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
