<template>
    <div>
        <h2>Hourly forecast</h2>
        <div class="hourly-container">
            <div class="forecast" v-for="forecast in forecastHourly" :key="forecast.dateTime">
                <p>{{convertToday(forecast.dateTime + forecast.timezoneOffset)}}</p>
                <p>{{convertHour(forecast.dateTime + forecast.timezoneOffset)}}</p>
                <p>{{forecast.description}}</p>
                <i class="fh-icon" :class="`owi owi-${forecast.iconId}`"></i>
                <p>{{toDegreeFormat(forecast.temperature)}}</p>
            </div>
        </div>
    </div>
</template>

<script>

import DATE_HELPER from '@/utility/date-helper';
import WEATHER_HELPER from '@/utility/weather-helper';
import { mapGetters } from 'vuex';

export default {
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
        toDegreeFormat(value) {
            return WEATHER_HELPER.toDegreeFormat(value);
        }
    }
}
</script>

<style scoped>
.hourly-container {
    display: flex;
    flex-direction: row;
}

.forecast {
    border: 1px dashed green;
    margin: 5px;
}

.fh-icon {
    font-size: 40px;
}
</style>