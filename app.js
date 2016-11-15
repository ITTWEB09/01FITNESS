var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.set('secret', config.secret);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

var expressJwt = require('express-jwt');  
var authenticate = expressJwt({secret : app.get('secret')});

require('./authentication')(app);
require('./routes/routes_api')(app, authenticate);
require('./routes/routes')(app, authenticate);

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.listen(app.get('port'), function(){
    console.log('Server started!');
});

