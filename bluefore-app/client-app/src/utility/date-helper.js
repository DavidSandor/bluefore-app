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
        return `${date.getUTCHours() > 10 ? date.getUTCHours() : '0' + date.getUTCHours()} : ${date.getUTCMinutes() > 10 ? date.getUTCMinutes() : '0' + date.getUTCMinutes()}`;
    }
}