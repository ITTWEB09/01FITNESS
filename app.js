var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 8000;

var api = require('./controllers/Api');
var index = require('./controllers/Index');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/api/workoutPlan/:id', function(req, res) {
    if(req.method == 'GET') {
        api.getById(req, res, req.params.id);
    } else {
        res.sendStatus(405);
    }
});

app.use('/api/workoutPlan', function(req, res) {
    if(req.method == 'GET') {
        api.getList(req, res);
    } else if(req.method == 'POST') {
        api.create(req, res);
    } else {
        res.sendStatus(405);
    }
});

app.use('/', function(req, res) {
    index.run(req, res);
});

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.listen(port, function(){
    console.log('Server started!');
});

