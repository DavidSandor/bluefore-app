const express = require('express');
const environment = require('./utility/environment');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client-app/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client-app/dist/index.html'));
});

app.listen(environment.PORT || 3080, () => {
    console.log(`Server listening on port::${environment.PORT || 3080}`);
});