var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

require('./routes/routes_api')(app);
require('./routes/routes')(app);

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.listen(app.get('port'), function(){
    console.log('Server started!');
});

