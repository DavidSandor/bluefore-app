import REQUESTS from '@/connection/requests';
import store from '@/store/index';

export default {
    updateLocation() {
        const onDisabledGeolocation = () => {
            REQUESTS.updateWeatherData({location: 'Budapest'});
            store.commit('setGeolocationEnabled', false);
        }

        navigator.permissions.query({name:'geolocation'}).then(result => {
            if(result.state !== 'granted') {
                onDisabledGeolocation();
            } else {
                store.commit('setGeolocationEnabled', true);
            }

            result.onchange = function() {
                if(result.state !== 'granted') {
                    onDisabledGeolocation();
                } else {
                    store.commit('setGeolocationEnabled', true);
                }
              }
        })

        if (navigator.geolocation) {
            store.commit('setGeolocationEnabled', true);
            navigator.geolocation.getCurrentPosition(position => {
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