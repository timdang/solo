var express = require('express');
var mongoose = require('mongoose');

var app = express();
var dbAddress = process.env.MONGOLAB_URI || 'mongodb://localhost:52147/bb';

mongoose.connect(process.dbAddress);

// require('./config/middleware.js')(app, express);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.port);

module.exports = app;
