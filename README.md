# Bluefore fullstack application

The application is hosted on heroku [here](https://bluefore-app.herokuapp.com/)
## Project description
This simple weather tracking application is developed with Vue.js + Node.js technologies.
The weather service api which is used: [OpenWeather](https://openweathermap.org/).

## Project prerequisites
1. In the /api folder create a .env file with the following environment variables:
 - WEATHER_API_KEY (register on OpenWeather and get your own api key)

2. In the /api folder include a gzip minimized json file named: "city.list.min.json.gz" with the city list from the world in order to offer search results for cities/locations. You should be able to download the mentioned file from [here](http://bulk.openweathermap.org/sample/).

## Project setup
```
npm run setup
```

## Development
```
npm run dev
```

## Deploy to production
Build the client application: (this will build client-app to /api/spa)
```
npm run client-build
```
Deploy the full /api folder to a host which is capable to handle node.js applications.
