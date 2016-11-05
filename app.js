var path = require('path');
var express = require('express');
var app = express();
var port = 8000;

var api = require('./controllers/Api');
var index = require('./controllers/Index');
var create = require('./controllers/Create');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/create', function(req, res, next) {
    create.run(req, res, next);
})

app.use('/api/workoutPlan', function(req, res, next) {
    api.run(req, res, next);
});

app.use('/', function(req, res, next) {
    index.run(req, res, next);
});

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.listen(port, function(){
    console.log('Server started!');
});

