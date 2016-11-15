var index = require('../controllers/Index');
var create = require('../controllers/Create');

module.exports = function(app, authenticate){
    app.use('/create', authenticate, function(req, res) {
        create.run(req, res);
    });

    app.use('/', authenticate, function(req, res) {
        index.run(req, res);
    });
}