<template>
    <div id="current-weather-panel">
        <div id="current-weather-main">
            <p class="cw-location">{{currentWeather.location}}</p>
            <i class="cw-icon" :class="`owi owi-${currentWeather.iconId}`"></i>
            <p class="cw-temperature">{{toDegreeFormat(currentWeather.temperature)}}</p>
            <p class="cw-description">{{currentWeather.description}}</p>
        </div>

        <div id="current-weather-details">
            <p><span>max</span>{{toDegreeFormat(currentWeather.maxTemperature)}}</p>
            <p><span>humidity</span>{{currentWeather.humidity}}%</p>
            <p><span>min</span>{{toDegreeFormat(currentWeather.minTemperature)}}</p>
            <p><span>wind</span>{{toWindDirection(currentWeather.wind?.deg)}} {{toWindSpeed(currentWeather.wind?.speed)}} km/h</p>
        </div>
    </div>
</template>

<script>

import WEATHER_HELPER from '@/utility/weather-helper';

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
        }
    },
    computed: {
    ...mapGetters([
        'currentWeather'
        ]),
    }
}
</script>

<style scoped lang="scss">
#current-weather-panel {
    height: 400px;
    background-color: white;
    width: 420px;
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 30px;

    @media all and (max-width: 700px) {
        width: 100%;
    }

    #current-weather-main {
        height: 260px;
        background-image: linear-gradient(45deg, #421163, #0090FF);
        border-radius: inherit;
        padding: 30px;
        color: white;
        position: relative;
        margin: -30px;
        margin-bottom: 20px;

        p {
            margin: 0;
        }

        .cw-location {
            font-size: 28px;
            max-width: 65%;

            @media all and (max-width: 700px) {
                font-size: 22px;
            }
        }

        .cw-icon {
            font-size: 100px;
            position: absolute;
            right: 30px;
            top: 30px;

            @media all and (max-width: 700px) {
                font-size: 80px;
                top: 52px;
            }
        }

        .cw-temperature {
            font-size: 50px;
            position: absolute;
            bottom: 50px;
            left: 50px;

            @media all and (max-width: 700px) {
                font-size: 45px;
                bottom: 70px;
            }
        }

        .cw-description {
            position: absolute;
            right: 30px;
            bottom: 30px;
            font-size: 20px;

            @media all and (max-width: 700px) {
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
                color: #848484;
                margin-bottom: -5px;
            }

            &:nth-of-type(2n) {
                text-align: right;
            }

            &:nth-of-type(1) {
                color: #FF9200;
            }

            &:nth-of-type(3) {
                color:#008FFE;
            }
        }
    }
}
</style>