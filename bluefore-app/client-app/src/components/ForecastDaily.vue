<template>
  <div>
    <h2>Daily forecast</h2>
    <div class="daily-container">
        <div class="forecast" v-for="forecast in forecastDaily" :key="forecast.dateTime">
            <p>{{convertDay(forecast.dateTime + forecast.timezoneOffset)}}</p>
            <p>{{forecast.description}}</p>
            <i class="fd-icon" :class="`owi owi-${forecast.iconId}`"></i>
            <p>{{toDegreeFormat(forecast.temperature.min)}}</p>
            <p>{{toDegreeFormat(forecast.temperature.max)}}</p>
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
        'forecastDaily'
        ]),
    },
    methods: {
        convertDay(date) {
            return DATE_HELPER.getWeekday((new Date(date)).getUTCDay());
        },
        toDegreeFormat(value) {
            return WEATHER_HELPER.toDegreeFormat(value);
        }
    }
}
</script>

<style scoped>
.daily-container {
    display: flex;
    flex-direction: row;
}

.forecast {
    border: 1px dashed green;
    margin: 5px;
}

.fd-icon {
    font-size: 40px;
}
</style>