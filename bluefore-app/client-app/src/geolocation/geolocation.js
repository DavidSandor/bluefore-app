import REQUESTS from '@/connection/requests';
import store from '@/store/index';

export default {
    async checkGeolocation() {
        if(navigator.geolocation) {
            await navigator.permissions.query({name:'geolocation'}).then(result => {
                if(result.state === 'granted') {
                    store.commit('setGeolocationEnabled', true);
                } else {
                    store.commit('setGeolocationEnabled', false);
                }
            });
        }
    },
    updateToGeolocation() {
        if(navigator.geolocation) {
            navigator.permissions.query({name:'geolocation'}).then(result => {   
                result.onchange = function() {
                    if(result.state === 'granted') {
                        store.commit('setGeolocationEnabled', true);
                    } else {
                        store.commit('setGeolocationEnabled', false);
                    }
                  }
            })

            navigator.geolocation.getCurrentPosition(position => {
                REQUESTS.updateWeatherData(
                    {
                        latitude: position.coords.latitude, 
                        longitude: position.coords.longitude
                    }
                );
            });
        }
    },
    updateLocation() { 
        if(store.getters.geolocationEnabled) {
            this.updateToGeolocation()
        } else {
            REQUESTS.updateWeatherData({location: 'Budapest'});
        }
    }
}