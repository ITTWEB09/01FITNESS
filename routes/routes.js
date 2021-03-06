var index = require('../controllers/Index');
var create = require('../controllers/Create');
var login = require('../controllers/Login');
var signup = require('../controllers/Signup');

module.exports = function(app, authenticate){
    app.use('/login', function(req, res) {
        login.run(req, res);
    });

    app.use('/signup', function(req, res) {
        signup.run(req, res);
    })

    app.use('/create', authenticate, function(req, res) {
        create.run(req, res);
    });

    app.use('/', authenticate, function(req, res) {
        index.run(req, res);
    });
}