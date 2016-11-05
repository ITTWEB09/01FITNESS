var model = require('../models/ContentModel');

module.exports = {
    run: function(req, res, next) {
        model.getData(function(workoutPlan) {
            res.send(workoutPlan);
        });
    }
}