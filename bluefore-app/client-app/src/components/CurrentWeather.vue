<template>
    <div>
        <template v-if="isWeatherLoaded">
            <p>{{currentWeather.location}}</p>
            <p>{{localDay}}</p>
            <p>{{localDate}}</p>
            <p>{{localTime}}</p>
            <p>{{currentWeather.description}}</p>
            <p>{{currentWeather.temperature}}</p>
            <p>{{sunrise}}</p>
            <p>{{sunset}}</p>
            <p>{{currentWeather.minTemperature}}</p>
            <p>{{currentWeather.maxTemperature}}</p>
        </template>
        <template v-else>
            <p>No content found!</p>
        </template>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    props: [
        'location',
        'language'
    ],
    data() {
        return {
            isWeatherLoaded: false,
            currentWeather: '',
            localDay: '',
            localDate: '',
            localTime: '',
            timerInterval: '',
            sunrise: '',
            sunset: ''
        }
    },
    methods: {
        async updateCurrentWeather() {
            this.currentWeather = (await axios.get(`api/current-weather/${this.location}?lang=${this.language}`)).data;

            if(this.timerInterval) {
                clearInterval(this.timerInterval);
            }

            if(this.currentWeather?.location) {
                this.isWeatherLoaded = true;

                this.sunrise = this.convertToHourFormat(new Date(this.currentWeather.sunrise + this.currentWeather.timezone));
                this.sunset = this.convertToHourFormat(new Date(this.currentWeather.sunset + this.currentWeather.timezone));

                const setLocalDateTime = () => {
                    const date = new Date(Date.now() + this.currentWeather.timezone);
                    this.localDay = this.getWeekday(date.getUTCDay());
                    this.localDate = `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`;
                    this.localTime = this.convertToHourFormat(date);
                }

                setLocalDateTime();

                this.timerInterval = setInterval(() => {
                    setLocalDateTime();
                }, 1000);

            } else {
                this.isWeatherLoaded = false;
            }
        },
        getWeekday(index) {
            const days = [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ]

            return days[index-1];
        },
        convertToHourFormat(date) {
            return `${date.getUTCHours() > 10 ? date.getUTCHours() : '0' + date.getUTCHours()} : ${date.getUTCMinutes() > 10 ? date.getUTCMinutes() : '0' + date.getUTCMinutes()}`;
        }
    },
    created() {
        this.updateCurrentWeather();
    },
    watch: {
        location() {
            this.updateCurrentWeather();
        }
    }
}
</script>

<style>


</style>