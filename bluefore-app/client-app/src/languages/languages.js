const languages = {
    search_location: {
        en: 'search location',
        hu: 'keress lokációra'
    },
    local_time: {
        en: 'local time',
        hu: 'helyi idő'
    },
    sunrise: {
        en: 'sunrise',
        hu: 'napkelte'
    },
    sunset: {
        en: 'sunset',
        hu: 'napnyugta'
    },
    humidity: {
        en: 'humidity',
        hu: 'páratartalom'
    },
    wind: {
        en: 'wind',
        hu: 'szél'
    },
    N: {
        en: 'N',
        hu: 'É'
    },
    NE: {
        en: 'NE',
        hu: 'ÉK'
    },
    E: {
        en: 'E',
        hu: 'K'
    },
    SE: {
        en: 'SE',
        hu: 'DK'
    },
    S: {
        en: 'S',
        hu: 'D'
    },
    SW: {
        en: 'SW',
        hu: 'DNY'
    },
    W: {
        en: 'W',
        hu: 'NY'
    },
    NW: {
        en: 'NW',
        hu: 'ÉNY'
    },
    location_prompt: {
        en: 'Would you like to follow weather info at your location?',
        hu: 'Követnéd az időjárást a saját lokációdon is?'
    },
    location_disabled: {
        en: 'Please allow location access in your browser if you would like to follow weather info at your location!',
        hu: 'Kérlek engedélyezd a lokáció hozzáférést a böngésződben ha követnéd az időjárást a saját lokációdon is!'
    },
    weather_expired: {
        en: 'You are watching outdated weather info, please refresh the page!',
        hu: 'Nem a legfrissebb időjárás adatokat nézed, kérlek frissítsd az oldalt!'
    },
    refresh_page: {
        en: 'refresh',
        hu: 'frissítés'
    },
    follow: {
        en: 'follow',
        hu: 'követem'
    },
    location_not_found: {
        en: 'Sorry your requested location was not found!',
        hu: 'Sajnos nem található a keresésnek megfelelő lokáció!'
    },
    request_error: {
        en: 'Sorry something went wrong during requesting weather data! Do not forget to check your internet connection!',
        hu: 'Hiba történt az időjárás adatok lekérése közben! Kérlek ellenőrizd az internetkapcsolatod!'
    },
    too_many_requests: {
        en: 'Sorry you have reached the maximum number of requests in a minute (60 requests), please try again later!',
        hu: 'Sajnos túllépted a megengedett lekérések számát egy perc alatt (60 lekérés), kérlek próbálkozz kicsit később!'
    },
    page_creator: {
        en: 'Handcrafted with care by David Sandor.',
        hu: 'Az oldal alkotója Sándor Dávid.'
    },
    copyright: {
        en: 'All rights reserved.',
        hu: 'Minden jog fenntartva.'
    },
    today: {
        en: 'today',
        hu: 'ma'
    },
    tomorrow: {
        en: 'tomorrow',
        hu: 'holnap'
    },
    monday: {
        en: 'monday',
        hu: 'hétfő'
    },
    tuesday: {
        en: 'tuesday',
        hu: 'kedd'
    },
    wednesday: {
        en: 'wednesday',
        hu: 'szerda'
    },
    thursday: {
        en: 'thursday',
        hu: 'csütörtök'
    },
    friday: {
        en: 'friday',
        hu: 'péntek'
    },
    saturday: {
        en: 'saturday',
        hu: 'szombat'
    },
    sunday: {
        en: 'sunday',
        hu: 'vasárnap'
    },
    january: {
        en: 'january',
        hu: 'január'
    },
    february: {
        en: 'february',
        hu: 'február'
    },
    march: {
        en: 'march',
        hu: 'március'
    },
    april: {
        en: 'april',
        hu: 'április'
    },
    may: {
        en: 'may',
        hu: 'május'
    },
    june: {
        en: 'june',
        hu: 'június'
    },
    july: {
        en: 'july',
        hu: 'július'
    },
    august: {
        en: 'august',
        hu: 'augusztus'
    },
    september: {
        en: 'september',
        hu: 'szeptember'
    },
    october: {
        en: 'october',
        hu: 'október'
    },
    november: {
        en: 'november',
        hu: 'november'
    },
    december: {
        en: 'december',
        hu: 'december'
    },
}

export default (word, language) => {
    return languages[word][language];
}