import REQUESTS from '@/connection/requests';
import store from '@/store/index';

export default {
    async checkGeolocation() {
        if(navigator.geolocation) {
            await navigator.permissions.query({name:'geolocation'}).then(result => {
                store.commit('setGeolocationStatus', result.state);
            });
        }
    },
    updateToGeolocation() {
        if(navigator.geolocation) {
            navigator.permissions.query({name:'geolocation'}).then(result => {   
                result.onchange = function() {
                    store.commit('setGeolocationStatus', result.state);
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
    async updateLocation() {
        await this.checkGeolocation();

        if(store.getters.geolocationStatus === 'granted') {
            this.updateToGeolocation()
        } else {
            REQUESTS.updateWeatherData({location: 'Budapest'});
        }
    }
}