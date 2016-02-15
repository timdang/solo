var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');    // pull information from HTML POST
var methodOverride = require('method-override'); // simulate DELETE and PUT

var app = express();
var dbAddress = process.env.MONGOLAB_URI || 'mongodb://localhost/bb';

mongoose.connect(dbAddress);

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var serverPort = process.env.PORT || 3000;
app.listen(serverPort);
console.log('The casino is running on port ', serverPort);
