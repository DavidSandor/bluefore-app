class City {

    id;
    name;
    state;
    country;
    latitude;
    longitude;

    constructor(cityData) {
        this.id = cityData.id;
        this.name = cityData.name;
        this.state = cityData.state;
        this.country = cityData.country;
        this.latitude = cityData.coord.lat;
        this.longitude = cityData.coord.lon;
    }
}

module.exports = City;