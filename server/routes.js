var User = require('./users');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('landing.ejs');
  });

  // app.post('/signup', function(req, res) {
  //   var newUser = new User();
  //   newUser.local.username = req.body.name;
  //   newUser.local.credit = 2000000;
  //   newUser.save(function(err) {
  //     if (err)
  //       throw err;
  //   });
  //   res.redirect('/table');
  // });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/table',
    failureRedirect: '/'
  }));

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/'
    }));

};

//   app.get('/:username/', function(req, res){
//     var newUser = new User();
//     newUser.local.username = req.params.username;
//     newUser.local.credit = 2000000;
//     newUser.save(function(err){});
//     res.send("success!");
//   })
// };
// 	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
//
// 	app.get('/auth/facebook/callback',
// 	  passport.authenticate('facebook', { successRedirect: '/profile',
// 	                                      failureRedirect: '/' }));
//
// };
//
// function isLoggedIn(req, res, next) {
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
//
// 	res.redirect('/login');
// }
