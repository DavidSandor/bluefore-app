const express = require('express');
var zlib = require('zlib');
var fs = require('fs');
const path = require('path');
const City = require('../models/city.model');

// Getting cities data from gzip file
let readStream = fs.createReadStream(path.join(__dirname, '../city.list.min.json.gz')).pipe(zlib.createUnzip());

let rawCitiesData = '';
let cities;

readStream.on('data', data => {
    rawCitiesData += data;
})

readStream.on('end', () => {
    cities = JSON.parse(rawCitiesData);
    readStream.close();
})

const router = express.Router();

router.get('/api/cities/:name', (req, res) => {
    // Route params
    const name = req.params.name;

    let firstIteration = cities.filter(city => city.name.toLowerCase().includes(name.toLowerCase()));
    let exactMatches = firstIteration.filter(city => city.name.toLowerCase() === name.toLowerCase());
    let startsWithMatches = firstIteration.filter(city => city.name.toLowerCase().startsWith(name.toLowerCase()) && !exactMatches.map(c => c.name.toLowerCase()).includes(city.name.toLowerCase()));
    let includeMatches = firstIteration.filter(city => !exactMatches.map(c => c.name.toLowerCase()).includes(city.name.toLowerCase()) && !startsWithMatches.map(c => c.name.toLowerCase()).includes(city.name.toLowerCase()))

    let foundCities = [
        ...exactMatches,
        ...startsWithMatches,
        ...includeMatches
    ]

    // send only first 10 relevant search results
    foundCities = foundCities.filter((c, index) => index < 10);

    res.json(foundCities.map(city => new City(city)));
});

module.exports = router;