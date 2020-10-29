<template>
    <div class="daily-weather-panel">
        <div class="daily-weather" v-for="forecast in forecastDaily" :key="forecast.dateTime">
            <p class="dw-day">{{convertDay(forecast.dateTime + forecast.timezoneOffset)}}</p>
            <p class="dw-date">{{convertDate(forecast.dateTime + forecast.timezoneOffset)}} {{convertMonth(forecast.dateTime + forecast.timezoneOffset)}}</p>
            <i class="dw-icon" :class="`owi owi-${forecast.iconId}`"></i>
            <p class="dw-description">{{forecast.description}}</p>
            <div class="dw-temperature-bottom">
                <hr>
                <div class="dw-rain-wind">                    
                    <p v-if="forecast.rainVolume"><img src="../assets/icons/drops.svg" />{{forecast.rainVolume.toFixed(1)}} mm</p>
                    <p v-if="forecast.windSpeed"><img src="../assets/icons/wind.svg" />{{toWindSpeed(forecast.windSpeed)}} km/h</p>
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
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            maxOfAllTemp: -100
        }
    },
    computed: {
    ...mapGetters([
        'forecastDaily'
        ]),
    },
    methods: {
        convertDay(date) {
            return DATE_HELPER.getWeekday((new Date(date)).getUTCDay());
        },
        convertMonth(date) {
            return (DATE_HELPER.getMonth((new Date(date)).getUTCMonth())).substring(0, 3);
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
            const percentage = (temp / this.maxOfAllTemp * 100).toFixed(2);

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
    margin: 50px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;

    .daily-weather {
        width: 150px;
        height: 360px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border-radius: 30px;
        background-color: white;
        padding-top: 20px;
        position: relative;

        p {
            margin: 0;
        }

        .dw-day {
            font-size: 16px;
        }

        .dw-date {
            font-size: 14px;
            color:  #848484;
        }

        .dw-icon {
            font-size: 50px;
            margin: 15px 0;
            color:#7D7D7D;
        }

        .dw-description {
            font-size: 14px;
            color:  #848484;
            padding: 0 15px;
        }

        .dw-temperature-bottom {
            position: absolute;
            left: 10px;
            right: 10px;
            bottom: 10px;
            top: 170px;

            hr {
                margin: 8px -10px;
            }

            .dw-rain-wind {
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;

                p {
                    font-size: 14px;
                    color: #848484;
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

                .inner-meter {
                    position: absolute;
                    bottom: 0;
                    width: 46%;
                    border-radius: 25px;
                    padding-top: 5px;

                    p {
                        font-weight: bold;
                    }

                    &:nth-of-type(1) {
                        left: 0;
                        background-color: rgba($color: #FF9200, $alpha: 0.25);

                        p {
                            color: #FF9200;
                        }
                    }

                    &:nth-of-type(2) {
                        right: 0;
                        background-color: rgba($color: #0488F6, $alpha: 0.25);

                        p {
                            color: #0488F6;
                        }
                    }
                }
       
            }
        }
    }
}
</style>