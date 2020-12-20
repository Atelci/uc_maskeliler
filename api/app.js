const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const objectLayer = require('./router/objects');
const uploadLayer = require('./router/upload');
const userLayer = require('./router/user');

mongoose.connect('mongodb+srv://seluk-admin:seluk-admin@node-seluk.vquci.mongodb.net/node-seluk?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
});

// Static Files Routing
app.use('/images', express.static('/root/public/images'));
app.use('/videos', express.static('/root/public/videos'));

app.use("/objects", objectLayer);
app.use("/upload", uploadLayer);
app.use("/user", userLayer);


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