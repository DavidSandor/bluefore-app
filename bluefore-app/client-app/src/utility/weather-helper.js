export default {
    toDegreeFormat(value) {
        return `${Math.round(value)} °C`;
    },
    convertWindDeg(degree) {
        const degrees = {
            NE: {
                min: 6,
                max: 84
            },
            E: {
                min: 85,
                max: 95
            },
            SE: {
                min: 96,
                max: 174
            },
            S: {
                min: 175,
                max: 185
            },
            SW: {
                min: 186,
                max: 264
            },
            W: {
                min: 265,
                max: 275
            },
            NW: {
                min: 276,
                max: 354
            }
        }

        let windDirection = 'N';

        for (const dir in degrees) {
            if (degrees.hasOwnProperty(dir)) {
                const direction = degrees[dir];

                if(degree >= direction.min && degree <= direction.max) {
                    windDirection = dir;
                    break;
                }
            }
        }

        return windDirection;
    },
    convertWindSpeed(speed) {
        return Math.round(speed * 3.6);
    }
}