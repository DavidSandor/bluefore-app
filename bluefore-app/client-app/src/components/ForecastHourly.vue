<template>
    <div>
        <h2>Hourly forecast</h2>
        <div class="hourly-container">
            <div class="forecast" v-for="forecast in forecastHourly" :key="forecast.dateTime">
                <p>{{convertToday(forecast.dateTime + forecast.timezoneOffset)}}</p>
                <p>{{convertHour(forecast.dateTime + forecast.timezoneOffset)}}</p>
                <p>{{forecast.description}}</p>
                <p>{{forecast.iconId}}</p>
                <p>{{forecast.temperature}}</p>
            </div>
        </div>
    </div>
</template>

<script>

import DATE_HELPER from '@/utility/date-helper';
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
</style>