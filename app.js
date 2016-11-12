var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

require('./routes/routes')(app);
require('./routes/routes_api')(app);

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.listen(port, function(){
    console.log('Server started!');
});

