<template>
    <div class="daily-weather-panel">
        <div class="daily-weather" v-for="forecast in forecastDaily" :key="forecast.dateTime">
            <div class="dw-day-date">
                <p class="dw-day">{{TRANSLATE(convertDay(forecast.dateTime + forecast.timezoneOffset), language)}}</p>
                <p class="dw-date">{{convertDate(forecast.dateTime + forecast.timezoneOffset)}} {{TRANSLATE(convertMonth(forecast.dateTime + forecast.timezoneOffset), language).substring(0, 3)}}</p>
            </div>
            <img v-if="forecast.weatherConditionId" class="dw-icon" :src="getIconUrl(forecast.weatherConditionId)" />
            <p class="dw-description">{{forecast.description}}</p>
            <div class="dw-temperature-bottom">
                <hr>
                <div class="dw-rain-wind">                    
                    <p v-if="forecast.rainVolume"><img src="../assets/icons/drops.svg" />{{forecast.rainVolume.toFixed(1)}} mm</p>
                    <p v-if="forecast.windSpeed"><img src="../assets/icons/wind.svg" />{{toWindSpeed(forecast.windSpeed)}}</p>
                </div>
                <div class="dw-temperature-meters">
                    <div class="inner-meter" :style="{height: `${getTemperatureMeterValue(forecast.temperature.max)}%`}">
                        <p>{{toDegreeFormat(forecast.temperature.max)}}</p>
                    </div>
                    <div class="inner-meter" :style="{height: `${getTemperatureMeterValue(forecast.temperature.min)}%`}">
                        <p>{{toDegreeFormat(forecast.temperature.min)}}</p>
                    </div>
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
            maxOfAllTemp: -100
        }
    },
    computed: {
    ...mapGetters([
        'forecastDaily',
        'currentWeather',
        'language'
        ]),
    },
    created() {
        this.setMinMaxTemp(this.forecastDaily);
    },
    methods: {
        convertDay(date) {
            return DATE_HELPER.getWeekday((new Date(date)).getUTCDay());
        },
        convertMonth(date) {
            return (DATE_HELPER.getMonth((new Date(date)).getUTCMonth()));
        },
        convertDate(date) {
            return new Date(date).getUTCDate();
        },
        toDegreeFormat(value) {
            return WEATHER_HELPER.toDegreeFormat(value);
        },
        toWindSpeed(value) {
            return WEATHER_HELPER.convertWindSpeed(value);
        },
        getTemperatureMeterValue(temp) {
            const percentage = Math.round(temp) / Math.round(this.maxOfAllTemp) * 100;
            return percentage < 25 ? 25 : percentage;
        },
        setMinMaxTemp(forecastHourly) {
            this.maxOfAllTemp = -100;

            for (const key in forecastHourly) {
                if (forecastHourly.hasOwnProperty(key)) {
                    const forecast = forecastHourly[key];

                    if(forecast.temperature.max > this.maxOfAllTemp) {
                        this.maxOfAllTemp = forecast.temperature.max;
                    }

                    if(forecast.temperature.min > this.maxOfAllTemp) {
                        this.maxOfAllTemp = forecast.temperature.min;
                    }
                }
            }
        },
        toIconUrl(id) {
            return ICON_HELPER.getIcon(id, false, false);
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
        forecastDaily(forecast) {
            this.setMinMaxTemp(forecast);
        }
    }
}
</script>

<style scoped lang="scss">
.daily-weather-panel {
    margin: $space-secondary 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;

    @media all and (max-width: $screen-lg-width) {
        flex-wrap: wrap;
        justify-content: center;
    }

    @media all and (max-width: $screen-sm-width) {
        flex-direction: column;
    }

    .daily-weather {
        width: 150px;
        height: 360px;
        box-shadow: $shadow-container;
        border-radius: $radius-primary;
        background-color: white;
        padding-top: $space-primary;
        position: relative;

        @media all and (max-width: $screen-lg-width) {
            margin-right: -8px;
            margin-bottom: $space-secondary;
        }

        @media all and (max-width: $screen-sm-width) {
            width: 100%;
            display: flex;
            padding: $space-secondary $space-primary;
            padding-top: $space-primary;
            height: 80px;
            justify-content: space-between;
        }

        p {
            margin: 0;
        }

        .dw-day-date {
            @media all and (max-width: $screen-sm-width) {
                position: absolute;
                top: 5px;
                left: $space-primary;

                p {
                    display: inline-block;
                    margin-right: 5px;
                    font-size: 14px;
                }
            }
        }

        .dw-day {
            font-size: 16px;
        }

        .dw-date {
            font-size: 14px;
            color: $font-color-light;
        }

        .dw-icon {
            height: 90px;
            width: 90px;
            margin: -6px 0;

            @media all and (max-width: $screen-sm-width) {
                height: 64px;
                width: 64px;
                margin: 0;
                margin-top: -5px;
                margin-left: -8px;
            }
        }

        .dw-description {
            font-size: 14px;
            color: $font-color-light;
            padding: 0 $space-secondary;

            @media all and (max-width: $screen-sm-width) {
                display: none;
            }
        }

        .dw-temperature-bottom {
            position: absolute;
            left: 10px;
            right: 10px;
            bottom: 10px;
            top: 180px;

            @media all and (max-width: $screen-sm-width) {
                position: static;
                display: flex;
                flex-grow: 1;
                padding-left: 5px;
            }

            hr {
                margin: 8px -10px;

                @media all and (max-width: $screen-sm-width) {
                    display: none;
                }
            }

            .dw-rain-wind {
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;

                @media all and (max-width: $screen-sm-width) {
                    padding-top: 10px;
                    margin-left: auto;
                }

                p {
                    font-size: 14px;
                    color: $font-color-light;
                    margin: 0;
                    padding: 0 4px;
                }

                img {
                    height: 16px;
                    display: block;
                    margin: 0 auto;
                }
            }

            .dw-temperature-meters {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 60px;

                @media all and (max-width: $screen-sm-width) {
                    position: static;
                    display: flex;
                    flex-direction: column;
                    margin-left: auto;
                }

                .inner-meter {
                    position: absolute;
                    bottom: 0;
                    width: 46%;
                    border-radius: $radius-secondary;
                    padding-top: 5px;

                    p {
                        font-weight: bold;
                    }

                    &:nth-of-type(1) {
                        left: 0;
                        background-color: rgba($color: $color-secondary, $alpha: 0.25);

                        p {
                            color: $color-secondary;
                        }
                    }

                    &:nth-of-type(2) {
                        right: 0;
                        background-color: rgba($color: $color-primary, $alpha: 0.25);

                        p {
                            color:$color-primary;
                        }
                    }

                    @media all and (max-width: $screen-sm-width) {
                        position: static;
                        text-align: right;
                        width: 100%;
                        background-color: transparent!important;
                        padding: 0;
                        height: 100%!important;

                        p {
                            margin-top: -6px;
                            font-size: 20px;
                        }
                    }
                }
       
            }
        }
    }
}
</style>