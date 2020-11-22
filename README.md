# Bluefore fullstack application

## Project prerequisites
In the /api folder create a .env file with the following environment variables:
 - WEATHER_API_KEY (register on OpenWeatherMaps and get your own api key)

In the /api folder include a gzip minimized json file named: "city.list.min.json.gz" with the city list from the world if you would like to offer search results for cities/locations.

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