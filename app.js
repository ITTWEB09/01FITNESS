var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var config = require('./config');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.set('secret', config.secret);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser());

var expressJwt = require('express-jwt');  
var authenticate = expressJwt({
    secret : app.get('secret'),
    getToken: function(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if(req.query && req.query.token) {
            return req.query.token;
        }

        return req.cookies.myToken;
    }
});

require('./authentication')(app);
require('./routes/routes_api')(app, authenticate);
require('./routes/routes')(app, authenticate);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        console.log(req);
        res.redirect('/login?redirect=' + req.originalUrl);
    }
});

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.listen(app.get('port'), function(){
    console.log('Server started!');
});