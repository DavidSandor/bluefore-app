import REQUESTS from '@/connection/requests';
import store from '@/store/index';

// navigator.permissions is not supported by ios / facebook browser

export default {
    async checkGeolocation() {
        if(navigator.geolocation) {
            if(navigator.permissions) {
                await navigator.permissions.query({name:'geolocation'}).then(result => {
                    store.commit('setGeolocationStatus', result.state);
                });
            }
        }
    },
    updateToGeolocation() {
        if(navigator.geolocation) {
            if(navigator.permissions) {
                navigator.permissions.query({name:'geolocation'}).then(result => {   
                    result.onchange = function() {
                        store.commit('setGeolocationStatus', result.state);
                      }
                })
            }

            const onSuccess = position => {
                store.commit('setGeolocationStatus', 'granted');
                REQUESTS.updateWeatherData(
                    {
                        latitude: position.coords.latitude, 
                        longitude: position.coords.longitude
                    }
                );
            }

            const onFail = error => {
                if(error.code === 1) {
                    store.commit('setGeolocationStatus', 'denied');
                } else {
                    store.commit('setGeolocationStatus', 'prompt');
                }

                REQUESTS.updateWeatherData({location: 'Budapest'});
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onFail, { timeout: 5000 });
        } else {
            REQUESTS.updateWeatherData({location: 'Budapest'});
        }
    },
    async updateLocation() {
        await this.checkGeolocation();

        if(store.getters.geolocationStatus === 'granted') {
            this.updateToGeolocation();
        } else {
            REQUESTS.updateWeatherData({location: 'Budapest'});
        }
    }
}