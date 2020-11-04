export default {
    getWeekday(index) {
        const days = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
        ]

        return days[index];
    },
    getMonth(index) {
        const months = [
            'january',
            'february',
            'march',
            'april',
            'may',
            'june',
            'july',
            'august',
            'september',
            'october',
            'november',
            'december'
        ]

        return months[index];
    },
    convertToHourFormat(date) {
        return `${date.getUTCHours() > 9 ? date.getUTCHours() : '0' + date.getUTCHours()} : ${date.getUTCMinutes() > 9 ? date.getUTCMinutes() : '0' + date.getUTCMinutes()}`;
    },
    convertToDateFormat(date) {
        return `${date.getUTCDate()}. ${this.getMonth(date.getUTCMonth())} ${date.getUTCFullYear()}`;
    }
}