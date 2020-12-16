const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const objectLayer = require('./api/router/objects');

mongoose.connect('mongodb+srv://seluk-admin:seluk-admin@node-seluk.vquci.mongodb.net/node-seluk?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.use(bodyParser.json());

// Static Files Routing
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/videos', express.static(__dirname + '/public/videos'));

app.use("/objects", objectLayer);

app.use((req, res, next) => {
    const error = new Error('Invalid resource...');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error_type: 'generic',
        message: err.message
    })
});

module.exports = app;