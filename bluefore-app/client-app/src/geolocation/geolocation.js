import REQUESTS from '@/connection/requests';

export default {
    updateLocation() {
        const onDisabledGeolocation = () => {
            REQUESTS.updateWeatherData({location: 'Budapest'});
        }

        navigator.permissions.query({name:'geolocation'}).then(result => {
            if(result.state !== 'granted') {
                onDisabledGeolocation();
            }

            result.onchange = function() {
                if(result.state !== 'granted') {
                    onDisabledGeolocation();
                }
              }
        })

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                REQUESTS.updateWeatherData(
                    {
                        latitude: position.coords.latitude, 
                        longitude: position.coords.longitude
                    }
                );
            });

        } else {
            onDisabledGeolocation();
            console.log('Geolocation is not supported by this browser.');
        }
    }
}