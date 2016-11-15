var passport = require('passport');  
var Strategy = require('passport-local');
var model = require('./models/ContentModel');
var jwt = require('jsonwebtoken');

passport.use(new Strategy(  
    function(username, password, next) {
        model.lookUpUser(function(isFound, err){
          if(err) {
              res.status(500).send('Error: ' + err);
          } else {
              if(isFound) {
                next(null, {});
              } else {
                next(null, false);
              }
          }
        }, username, password)
    })
);

module.exports = passport;

module.exports = function(app){
    app.use(passport.initialize());  
    app.post('/auth', passport.authenticate('local', {
        session: false
      }), createToken, respond);

    function createToken(req, res, next) {
        req.token = jwt.sign(req.body.username, app.get('secret'), {});
        next();  
    }

    function respond(req, res) {
      res.status(200).send(req.token);
    }
}

