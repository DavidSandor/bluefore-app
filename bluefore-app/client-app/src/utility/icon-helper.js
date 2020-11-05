export default {
    getIcon(id, isNight = false, isAnimated = false) {
        let icon = `${isAnimated ? 'animated' : 'static'}/`;
        switch(id) {
            // Thunderstorm 2xx
            case 200:
            case 201:
            case 202:
            case 210:
            case 211:
            case 212:
            case 221:
            case 230:
            case 231:
            case 232:
                icon += 'thunderstorm-200';
                break;
            // Drizzle 3xx
            case 300:
                icon += 'rainy-500';
                break;
            case 301:
                icon += 'rainy-501';
                break;
            case 302:
                icon += 'rainy-502';
                break;
            case 310:
                icon += 'rainy-500';
                break;
            case 311:
                icon += 'rainy-501';
                break;
            case 312:
                icon += 'rainy-502';
                break;
            case 313:
                icon += 'rainy-501';
                break;
            case 314:
            case 321:
                icon += 'rainy-502';
                break;
            // Rain 5xx
            case 500:
                icon += 'rainy-500';
                break;
            case 501:
                icon += 'rainy-501';
                break;
            case 502:
                icon += 'rainy-502';
                break;
            case 503:
            case 504:
                icon += 'rainy-502';
                break;
            case 511:
                icon += 'sleet-611';
                break;
            case 520:
                icon += 'rainy-500';
                break;
            case 521:
                icon += 'rainy-501';
                break;
            case 522:
            case 531:
                icon += 'rainy-502';
                break;
            // Snow 6xx
            case 600:
                icon += 'snowy-600';
                break;
            case 601:
                icon += 'snowy-601';
                break;
            case 602:
                icon += 'snowy-602';
                break;
            case 611:
            case 612:
            case 613:
                icon += 'sleet-611';
                break;
            case 615:
                icon += 'snowy-600';
                break;
            case 616:
                icon += 'snowy-601';
                break;
            case 620:
                icon += 'snowy-600';
                break;
            case 621:
                icon += 'snowy-601';
                break;
            case 622:
                icon += 'snowy-602';
                break;
            // Atmosphere 7xx
            case 701:
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
            case 761:
            case 762:
                icon += 'cloudy-804';
                break;
            case 771:
            case 781:
                icon += 'thunderstorm-200';
                break;
            // Clear 800
            case 800: 
                icon += `clear-800${isNight ? 'n' : 'd'}`;
                break;
            // Clouds 80x
            case 801:
                icon += `cloudy-801${isNight ? 'n' : 'd'}`;
                break;
            case 802:
                icon += `cloudy-802${isNight ? 'n' : 'd'}`;
                break;
            case 803:
                icon += `cloudy-803${isNight ? 'n' : 'd'}`;
                break;
            case 804:
                icon += 'cloudy-804';
                break;
            default:
                icon += 'cloudy-801d';
                break;
        }

        return `${icon}.svg`;
    }
}