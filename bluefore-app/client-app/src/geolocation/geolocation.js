import REQUESTS from '@/connection/requests';

export default {
    updateLocation() {
        navigator.permissions.query({name:'geolocation'}).then(result => {
            result.onchange = function() {
                if(result.state !== 'granted') {
                    REQUESTS.updateCurrentWeather({location: 'Budapest'});
                    console.log('Geolocation is disabled by user.');
                }
              }
        })

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                REQUESTS.updateCurrentWeather(
                    {
                        latitude: position.coords.latitude, 
                        longitude: position.coords.longitude
                    }
                );
                console.log('Geolocation is enabled by user.');
            });
            
        } else {
            REQUESTS.updateCurrentWeather({location: 'Budapest'});
            console.log('Geolocation is not supported by this browser.');
        }
    }
}