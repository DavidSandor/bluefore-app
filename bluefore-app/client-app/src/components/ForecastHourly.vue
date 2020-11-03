<template>
    <div class="hourly-weather-panel">
        <div class="hourly-weather" v-for="forecast in forecastHourly" :key="forecast.dateTime">
            <p class="hw-day">{{convertToday(forecast.dateTime + forecast.timezoneOffset)}}</p>
            <p class="hw-hour">{{convertHour(forecast.dateTime + forecast.timezoneOffset)}}</p>
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
            const percentage = (Math.round(temp) / Math.round(this.maxTemp) * 100);

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
        margin: 0;
        padding: 10px;
        overflow-x: auto;
        width: 100%;
        justify-content: flex-start;
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
        flex: 0 0 auto;
    }

    p {
        margin-bottom: 10px;
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
    }

    .hw-precipitation {
        font-size: 14px;
        color: #848484;
        margin-top: 10px;

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

        .inner-meter {      
            border-radius: inherit;
            padding-top: 10px;
            background-color: rgba($color: #0488F6, $alpha: 0.25);
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;

            .hw-temperature {
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
}
</style>