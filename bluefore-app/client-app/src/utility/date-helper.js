export default {
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
        return `${date.getUTCHours() > 9 ? date.getUTCHours() : '0' + date.getUTCHours()} : ${date.getUTCMinutes() > 9 ? date.getUTCMinutes() : '0' + date.getUTCMinutes()}`;
    },
    convertToDateFormat(date) {
        return `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`;
    }
}