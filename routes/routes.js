var index = require('../controllers/Index');
var create = require('../controllers/Create');

module.exports = function(app){
    app.use('/create', function(req, res) {
        create.run(req, res);
    });

    app.use('/', function(req, res) {
        index.run(req, res);
    });
}