var api = require('../controllers/Api');

module.exports = function(app, authenticate){
    app.use('/api/workoutPlan/complete/:id', authenticate, function(req, res) {
        if(req.method == 'PUT') {
            api.complete(req, res, req.params.id);
        } else {
            res.sendStatus(405);
        }
    });

    app.use('/api/workoutPlan/:id', authenticate, function(req, res) {
        if(req.method == 'GET') {
            api.getById(req, res, req.params.id);
        } else {
            res.sendStatus(405);
        }
    });

    app.use('/api/workoutPlan', authenticate, function(req, res) {
        if(req.method == 'GET') {
            api.getList(req, res);
        } else if(req.method == 'POST') {
            api.create(req, res);
        } else {
            res.sendStatus(405);
        }
    });
    
    app.use('/api/saveUser', function(req, res) {
        if(req.method == 'POST') {
            api.saveUser(req, res);
        } else {
            res.sendStatus(405);
        }
    })
}