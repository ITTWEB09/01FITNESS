var path = require('path');
var express = require('express');
var app = express();
var port = 8000;

var index = require('./controllers/Index');

app.use('/', function(req, res, next) {
    index.run(req, res, next);
});

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.listen(port, function(){
    console.log('Server started!');
});

