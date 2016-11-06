var model = require('../models/ContentModel');

module.exports = {
    getList: function(req, res) {
        model.getListOfPlans(function(workoutPlans, err) {
            if(workoutPlans && !err) {
                res.status(200).send(workoutPlans);
            } else {
                res.status(500).send('Error: ' + err);
            }
        });
    },
    getById: function(req, res, id) {
        if(isNaN(id)) {
            res.status(400).send('Error: The id must be a number.');
        }

        model.getPlanById(function(workoutPlan, err) {
            if(!workoutPlan || err) {
                res.status(404).send('Error: ' + err);
            }

            res.status(200).send(workoutPlan);
        }, +id);
    },
    create: function(req, res) {
        model.createPlan(function(err) {
            if(!err) {
                res.status(200).send(workoutPlan);
            } else {
                res.status(500).send('Error: ' + err);
            }
        }, req.body);
    }
}