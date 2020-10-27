export default {
    getWeekday(index) {
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ]

        return days[index];
    },
    convertToHourFormat(date) {
        return `${date.getUTCHours() > 9 ? date.getUTCHours() : '0' + date.getUTCHours()} : ${date.getUTCMinutes() > 9 ? date.getUTCMinutes() : '0' + date.getUTCMinutes()}`;
    },
    convertToDateFormat(date) {
        return `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`;
    }
}