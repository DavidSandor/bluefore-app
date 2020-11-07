<template>
    <div class="hourly-weather-panel">
        <div class="hourly-weather" v-for="forecast in forecastHourly" :key="forecast.dateTime">
            <div class="hw-day-hour">
                <p class="hw-day">{{TRANSLATE(convertToday(forecast.dateTime + forecast.timezoneOffset), language)}}</p>
                <p class="hw-hour">{{convertHour(forecast.dateTime + forecast.timezoneOffset)}}</p>
            </div>
            <img v-if="forecast.weatherConditionId" class="hw-icon" :src="getIconUrl(forecast.weatherConditionId)" />
            <p v-if="forecast.precipitationProbability" class="hw-precipitation"><img src="../assets/icons/drops.svg" />{{(forecast.precipitationProbability * 100).toFixed(0)}}%</p>
            <div class="hw-temperature-meter">
                <div class="inner-meter" :style="{height: `${getTemperatureMeterValue(forecast.temperature)}%`}">
                    <p class="hw-temperature">{{toDegreeFormat(forecast.temperature)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import DATE_HELPER from '@/utility/date-helper';
import WEATHER_HELPER from '@/utility/weather-helper';
import ICON_HELPER from '@/utility/icon-helper';
import LANGUAGE_HELPER from '@/languages/languages';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            maxTemp: -100
        }
    },
    computed: {
    ...mapGetters([
        'forecastHourly',
        'currentWeather',
        'language'
        ]),
    },
    created() {
        this.setMinMaxTemp(this.forecastHourly);
    },
    methods: {
        convertHour(date) {
            return DATE_HELPER.convertToHourFormat(new Date(date));
        },
        convertToday(date) {
            return (new Date(date)).getUTCDate() > (new Date().getUTCDate()) ? 'tomorrow' : 'today';
        },
        toDegreeFormat(deg) {
            return WEATHER_HELPER.toDegreeFormat(deg);
        },
        getTemperatureMeterValue(temp) {
            const percentage = Math.round(temp) / Math.round(this.maxTemp) * 100;
            return percentage < 20 ? 20 : percentage;
        },
        setMinMaxTemp(forecastHourly) {
            this.maxTemp = -100;

            for (const key in forecastHourly) {
                if (forecastHourly.hasOwnProperty(key)) {
                    const forecast = forecastHourly[key];
                    if(forecast.temperature > this.maxTemp) {
                        this.maxTemp = forecast.temperature;
                    }
                }
            }
        },
        toIconUrl(id) {
            const isNight = DATE_HELPER.convertToIsNight(new Date(this.currentWeather.sunrise), new Date(this.currentWeather.sunset), new Date());
            return ICON_HELPER.getIcon(id, isNight, false);
        },
        getIconUrl(id) {
            return require(`../assets/icons/${this.toIconUrl(id)}`);
        },
        TRANSLATE(word, language) {
            if(word && language) {
                return LANGUAGE_HELPER(word, language);
            }
        }
    },
    watch: {
        forecastHourly(forecast) {
            this.setMinMaxTemp(forecast);
        }
    }
}
</script>

<style scoped lang="scss">
.hourly-weather-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media all and (max-width: $screen-sm-width) {
        flex-direction: column;
        width: 100%;
    }
}

.hourly-weather {
    width: 84px;
    height: 400px;
    background-color: white;
    border-radius: $radius-primary;
    box-shadow: $shadow-container;
    text-align: center;
    padding-top: $space-primary;
    position: relative;

    @media all and (max-width: $screen-lg-width) {
        margin-right: -8px;
    }

    @media all and (max-width: $screen-sm-width) {
        width: 100%;
        margin-bottom: $space-secondary;
        display: flex;
        padding: $space-secondary $space-primary;
        padding-top: $space-primary;
        height: 80px;
        justify-content: space-between;

        &:last-of-type {
            margin-bottom: 0;
        }
    }

    p {
        margin-bottom: 10px;
    }

    .hw-day-hour {
        @media all and (max-width: $screen-sm-width) {
            position: absolute;
            top: 5px;
            left: $space-primary;
            display: flex;
            flex-direction: row-reverse;

            p {
                margin: 0;
                margin-right: 5px;
            }
        }
    }

    .hw-day {
        font-size: 14px;
        color: $font-color-light;
    }

    .hw-hour {
        font-size: 14px;
        margin: 0;
    }

    .hw-icon {      
        @media all and (max-width: $screen-sm-width) {
            width: 64px;
            height: 64px;
            margin: 0;
            margin-top: -5px;
            margin-left: -8px;
        }
    }

    .hw-precipitation {
        font-size: 14px;
        color: $font-color-light;

        @media all and (max-width: $screen-sm-width) {
            padding-top: 16px;
        }

        img {
            height: 16px;
            margin-right: 3px;
            margin-bottom: 5px;
        }
    }

    .hw-temperature-meter {
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 10px;
        top: 170px;
        border-radius: $radius-secondary;

        @media all and (max-width: $screen-sm-width) {
            position: static;
        }

        .inner-meter {      
            border-radius: inherit;
            padding-top: 10px;
            background-color: rgba($color: $color-primary, $alpha: 0.25);
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;

            @media all and (max-width: $screen-sm-width) {
                position: static;
                background-color: transparent;
                height: 100%!important;
            }

            .hw-temperature {
                font-size: 16px;
                font-weight: bold;

                @media all and (max-width: $screen-sm-width) {
                    font-size: 20px;
                }
            }
        }
    }
}
</style>