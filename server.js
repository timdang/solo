var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('process.env.MONGOLAB_URI');

// require('./config/middleware.js')(app, express);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.port);

module.exports = app;
