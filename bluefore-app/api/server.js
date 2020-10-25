const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
dotenv.config();

app.use(express.static(path.join(__dirname, '../client-app/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client-app/dist/index.html'));
});

app.listen(process.env.PORT || 3080, () => {
    console.log(`Server listening on port::${process.env.PORT || 3080}`);
});