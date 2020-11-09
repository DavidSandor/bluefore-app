<template>
  <div>
    <div id="page-content-wrapper">
      <div id="nav">
        <div id="nav-inner">
          <h1 @click="brandClickHandler">
            <span>blue</span>fore
            <img id="brand-icon" src="./assets/icons/sunny.svg" />
          </h1>
          <transition name="fade">
            <scale-loader v-if="isLoading" :color="'#008FFE'"></scale-loader>
          </transition>
          <img id="responsive-menu-button" src="./assets/icons/menu.svg" @click="this.isMenuShown = !this.isMenuShown" />
        </div>
      </div>
      <div v-if="isMenuShown" id="menu-panel">
        <img v-if="language !== 'hu'" @click="() => languageClickHandler('hu')" src="./assets/icons/hungary.svg" />
        <img v-if="language !== 'en'" @click="() => languageClickHandler('en')" src="./assets/icons/uk.svg" />
        <div id="unit-type" @click="unitsClickHandler">{{units === 'metric' ? '°F' : '°C'}}</div>
      </div>
      <router-view/>
    </div>
    <footer id="footer">
      <p>{{TRANSLATE('Handcrafted with care by David Sandor.', language)}} &copy; {{TRANSLATE('All rights reserved.', language)}}</p>
    </footer>
  </div>
</template>

<script>

import REQUESTS from '@/connection/requests';
import LANGUAGE_HELPER from '@/languages/languages';
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
  computed: {
  ...mapGetters([
        'language',
        'coordinates',
        'isLoading',
        'units'
        ]),
  },
  methods: {
    ...mapMutations([
        'setLanguage',
        'setIsCurrentLocation',
        'setUnits'
        ]),
    brandClickHandler() {
      this.$router.push('/');
      this.setIsCurrentLocation(true);
      $('html, body').animate({scrollTop: 0}, 500);
    },
    languageClickHandler(lang) {
      this.setLanguage(lang);
      this.isMenuShown = window.innerWidth > 700;
    },
    unitsClickHandler() {
      this.setUnits(this.units === 'metric' ? 'imperial' : 'metric');
      this.isMenuShown = window.innerWidth > 700;
    },
    windowResizeHandler(e) {
      this.isMenuShown = e.target.innerWidth > 700;
    },
    TRANSLATE(word, language) {
        if(word && language) {
            return LANGUAGE_HELPER(word, language);
        }
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
   position: relative;
   min-height: 100vh;
}

#page-content-wrapper {
  padding-bottom: $footer-height;

    @media all and (max-width: $screen-lg-width) {
      padding-bottom: $footer-height * 2;
    }
}

#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: lighten($color-primary, 42);

  p {
    margin: 0;
    line-height: $footer-height;
    font-size: 12px;
    text-align: right;
    padding: 0 $space-primary;

    @media all and (max-width: $screen-lg-width) {
      text-align: center;
    }
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

#menu-panel {
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

  #unit-type {
    background-color: white;
    border-radius: $radius-full;
    width: 34px;
    height: 34px;
    box-shadow: $shadow-container;
    line-height: 34px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
    color: $color-primary;
    padding-top: 2px;
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
      margin-right: $space-secondary;
      cursor: pointer;

      @media all and (max-width: $screen-sm-width) {
        font-size: 30px;
      }

      span {
        color: $color-primary;
      }

      #brand-icon {
        filter: invert(1);
        width: 45px;
        margin-bottom: 10px;

        @media all and (max-width: $screen-sm-width) {
          width: 35px;
        }
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
