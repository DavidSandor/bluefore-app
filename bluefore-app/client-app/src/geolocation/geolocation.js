import REQUESTS from '@/connection/requests';
import store from '@/store/index';

export default {
    updateLocation() {
        const onDisabledGeolocation = () => {
            REQUESTS.updateWeatherData({location: 'Budapest'});
            store.commit('setIsCurrentLocation', true);
        }

        navigator.permissions.query({name:'geolocation'}).then(result => {
            if(result.state !== 'granted') {
                onDisabledGeolocation();
            }

            result.onchange = function() {
                if(result.state !== 'granted') {
                    onDisabledGeolocation();
                } else {
                    store.commit('setIsCurrentLocation', false);
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