// Express app setup
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Express route handlers
app.get('/', (req, res) => {
    res.send('Hi');
});

app.listen(80, err => {
    console.log('Listening')
});
