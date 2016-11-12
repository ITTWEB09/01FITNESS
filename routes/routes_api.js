var api = require('../controllers/Api');

module.exports = function(app){
    app.use('/api/workoutPlan/complete/:id', function(req, res) {
        console.log(req.method);
        if(req.method == 'PUT'){
            api.complete(req, res, req.params.id);
        } else {
            res.sendStatus(405);
        }
    });

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
}