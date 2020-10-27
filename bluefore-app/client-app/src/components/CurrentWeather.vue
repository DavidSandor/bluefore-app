<template>
    <div>
        <h2>Current Weather</h2>
        <template v-if="isWeatherLoaded">
            <p>{{currentWeather.location}}</p>
            <p>{{localDay}}</p>
            <p>{{localDate}}</p>
            <p>{{localTime}}</p>
            <p>{{currentWeather.description}}</p>
            <p>{{toDegreeFormat(currentWeather.temperature)}}</p>
            <i class="cw-icon" :class="`owi owi-${currentWeather.iconId}`"></i>
            <p>{{sunrise}}</p>
            <p>{{sunset}}</p>
            <p>{{toDegreeFormat(currentWeather.minTemperature)}}</p>
            <p>{{toDegreeFormat(currentWeather.maxTemperature)}}</p>
        </template>
        <template v-else>
            <p>No content found!</p>
        </template>
    </div>
</template>

<script>

import DATE_HELPER from '@/utility/date-helper';
import WEATHER_HELPER from '@/utility/weather-helper';

import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            isWeatherLoaded: false,
            localDay: '',
            localDate: '',
            localTime: '',
            timerInterval: '',
            sunrise: '',
            sunset: ''
        }
    },
    methods: {
        updateCurrentWeatherData() {
            if(this.timerInterval) {
                clearInterval(this.timerInterval);
            }

            if(this.currentWeather?.location) {
                this.sunrise = DATE_HELPER.convertToHourFormat(new Date(this.currentWeather.sunrise + this.currentWeather.timezone));
                this.sunset = DATE_HELPER.convertToHourFormat(new Date(this.currentWeather.sunset + this.currentWeather.timezone));

                const setLocalDateTime = () => {
                    const date = new Date(Date.now() + this.currentWeather.timezone);
                    this.localDay = DATE_HELPER.getWeekday(date.getUTCDay());
                    this.localDate = DATE_HELPER.convertToDateFormat(date);
                    this.localTime = DATE_HELPER.convertToHourFormat(date);
                }

                setLocalDateTime();

                this.timerInterval = setInterval(() => {
                    setLocalDateTime();
                }, 1000);

                this.isWeatherLoaded = true;
            } else {
                this.isWeatherLoaded = false;
            }
        },
        toDegreeFormat(value) {
            return WEATHER_HELPER.toDegreeFormat(value);
        }
    },
    watch: {
        currentWeather() {
            this.updateCurrentWeatherData();
        }
    },
    computed: {
    ...mapGetters([
        'currentWeather'
        ]),
    }
}
</script>

<style>
.cw-icon {
    font-size: 70px;
}
</style>