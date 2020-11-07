<template>
    <div id="current-weather-panel">
        <div id="current-weather-main">
            <p class="cw-location">{{currentWeather.location}}</p>
            <img v-if="currentWeather.weatherConditionId" class="cw-icon" :src="iconUrl" />
            <p class="cw-temperature">{{toDegreeFormat(currentWeather.temperature)}}</p>
            <p class="cw-description">{{currentWeather.description}}</p>
        </div>

        <div id="current-weather-details">
            <p><span>max</span>{{toDegreeFormat(currentWeather.maxTemperature)}}</p>
            <p><span>{{TRANSLATE('humidity', language)}}</span>{{currentWeather.humidity}}%</p>
            <p><span>min</span>{{toDegreeFormat(currentWeather.minTemperature)}}</p>
            <p><span>{{TRANSLATE('wind', language)}}</span>{{TRANSLATE(toWindDirection(currentWeather.wind?.deg), language)}} {{toWindSpeed(currentWeather.wind?.speed)}} km/h</p>
        </div>
    </div>
</template>

<script>

import WEATHER_HELPER from '@/utility/weather-helper';
import ICON_HELPER from '@/utility/icon-helper';
import DATE_HELPER from '@/utility/date-helper';
import LANGUAGE_HELPER from '@/languages/languages';

import { mapGetters } from 'vuex';

export default {
    methods: {
        toDegreeFormat(value) {
            return WEATHER_HELPER.toDegreeFormat(value);
        },
        toWindDirection(value) {
            return WEATHER_HELPER.convertWindDeg(value);
        },
        toWindSpeed(value) {
            return WEATHER_HELPER.convertWindSpeed(value);
        },
        toIconUrl(id, isNight, isAnimated) {
            return ICON_HELPER.getIcon(id, isNight, isAnimated);
        },
        toIsNight(sunrise, sunset) {
            return DATE_HELPER.convertToIsNight(new Date(sunrise), new Date(sunset), new Date());
        },
        TRANSLATE(word, language) {
            if(word && language) {
                return LANGUAGE_HELPER(word, language);
            }
        }
    },
    computed: {
    ...mapGetters([
        'currentWeather',
        'language'
        ]),
        iconUrl() {
            const isNight = this.toIsNight(this.currentWeather.sunrise, this.currentWeather.sunset);
            return require(`../assets/icons/${this.toIconUrl(this.currentWeather.weatherConditionId, isNight, true)}`);
        }
    }
}
</script>

<style scoped lang="scss">

$current-weather-space: 30px;

#current-weather-panel {
    height: 400px;
    background-color: white;
    width: 420px;
    border-radius: $radius-primary;
    box-shadow: $shadow-container;
    padding: $current-weather-space;

    @media all and (max-width: $screen-sm-width) {
        width: 100%;
    }

    #current-weather-main {
        height: 260px;
        background-image: linear-gradient(45deg, #29005e, $color-primary);
        border-radius: inherit;
        padding: $current-weather-space;
        color: white;
        position: relative;
        margin: $current-weather-space * -1;
        margin-bottom: $space-primary;

        p {
            margin: 0;
        }

        .cw-location {
            font-size: 28px;
            max-width: 65%;

            @media all and (max-width: $screen-sm-width) {
                font-size: 22px;
            }
        }

        .cw-icon {
            width: 130px;
            position: absolute;
            right: 10px;
            top: 10px;

            @media all and (max-width: $screen-sm-width) {
                top: 40px;
            }
        }

        .cw-temperature {
            font-size: 50px;
            position: absolute;
            bottom: 50px;
            left: 50px;

            @media all and (max-width: $screen-sm-width) {
                font-size: 45px;
                bottom: 70px;
            }
        }

        .cw-description {
            position: absolute;
            right: $current-weather-space;
            bottom: $current-weather-space;
            font-size: 20px;

            @media all and (max-width: $screen-sm-width) {
                font-size: 18px;
            }
        }
    }

    #current-weather-details {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        p {
            margin: 0;
            width: 50%;
            font-size: 18px;

            span {
                display: block;
                color: $font-color-light;
                margin-bottom: -5px;
            }

            &:nth-of-type(2n) {
                text-align: right;
            }

            &:nth-of-type(1) {
                color: $color-secondary;
            }

            &:nth-of-type(3) {
                color: $color-primary;
            }
        }
    }
}
</style>