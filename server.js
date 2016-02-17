var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser'); // pull information from HTML POST
// var methodOverride = require('method-override'); // simulate DELETE and PUT
var passport = require('passport');
var cookieParser = require('cookie-parser');

var app = express();
var dbAddress = process.env.MONGOLAB_URI || 'mongodb://localhost/bb';

mongoose.connect(dbAddress);
require('./server/passport')(passport);

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(session({
  secret: 'dkjaldjaskjadakdjaslkdjakjdkla',
  saveUnitialized: true,
  resave: true
}));

// parse application/x-www-form-urlencoded

// app.use(bodyParser.json()); // parse application/json
// app.use(bodyParser.json({
//   type: 'application/vnd.api+json'
// })); // parse application/vnd.api+json as json
// app.use(methodOverride());

app.use(passport.initialize());
app.use(passport.session());

//the only working routing
// app.use('/table', express.static(__dirname + '/client'));

app.set('view engine', 'ejs');

require('./server/routes.js')(app, passport);

// app.get('/auth/google', passport.authenticate('google', {
//   scope: ['profile', 'email']
// }));
//
// app.get('/auth/google/callback', passport.authenticate('google', {
//   successRedirect: '/profile',
//   failureRedirect: '/'
// }));

var serverPort = process.env.PORT || 3000;
app.listen(serverPort);
console.log('The casino is running on port ', serverPort);
