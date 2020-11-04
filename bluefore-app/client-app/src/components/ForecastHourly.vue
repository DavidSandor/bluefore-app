<template>
    <div class="hourly-weather-panel">
        <div class="hourly-weather" v-for="forecast in forecastHourly" :key="forecast.dateTime">
            <div class="hw-day-hour">
                <p class="hw-day">{{convertToday(forecast.dateTime + forecast.timezoneOffset)}}</p>
                <p class="hw-hour">{{convertHour(forecast.dateTime + forecast.timezoneOffset)}}</p>
            </div>
            <i class="hw-icon" :class="`owi owi-${forecast.iconId}`"></i>
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
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            maxTemp: -100
        }
    },
    computed: {
    ...mapGetters([
        'forecastHourly'
        ]),
    },
    methods: {
        convertHour(date) {
            return DATE_HELPER.convertToHourFormat(new Date(date));
        },
        convertToday(date) {
            return (new Date(date)).getUTCDate() > (new Date().getUTCDate()) ? 'Tomorrow' : 'Today';
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

    @media all and (max-width: 700px) {
        flex-direction: column;
        width: 100%;
    }
}

.hourly-weather {
    width: 84px;
    height: 400px;
    background-color: white;
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    padding-top: 20px;
    position: relative;

    @media all and (max-width: 1040px) {
        margin-right: -8px;
    }

    @media all and (max-width: 700px) {
        width: 100%;
        margin-bottom: 15px;
        display: flex;
        padding: 15px 20px;
        padding-top: 20px;
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
        @media all and (max-width: 700px) {
                position: absolute;
                top: 5px;
                left: 20px;
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
        color: #848484;
    }

    .hw-hour {
        font-size: 14px;
    }

    .hw-icon {
        font-size: 40px;
        color:#7D7D7D;

        @media all and (max-width: 700px) {
            font-size: 40px;
            margin: 0;
            margin-top: 10px;
        }
    }

    .hw-precipitation {
        font-size: 14px;
        color: #848484;
        margin-top: 10px;

        @media all and (max-width: 700px) {
            padding-top: 10px;
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
        border-radius: 25px;

        @media all and (max-width: 700px) {
            position: static;
        }

        .inner-meter {      
            border-radius: inherit;
            padding-top: 10px;
            background-color: rgba($color: #0488F6, $alpha: 0.25);
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;

            @media all and (max-width: 700px) {
                position: static;
                background-color: transparent;
            }

            .hw-temperature {
                font-size: 16px;
                font-weight: bold;

                @media all and (max-width: 700px) {
                    font-size: 20px;
                }
            }
        }
    }
}
</style>