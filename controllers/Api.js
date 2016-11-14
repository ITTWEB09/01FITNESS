var model = require('../models/ContentModel');
var jwt = require('jsonwebtoken');

module.exports = {
    createToken: function(req, res, secret) {
        var userObj = req.body;
        model.lookUpUser(function(isFound, err){
            if(err) {
                res.status(500).send('Error: ' + err);
            } else {
                if(isFound) {
                    var token = jwt.sign(userObj.username, secret, {
                    });
                    res.status(200).send(token);
                } else {
                    res.sendStatus(404);
                }
            }
      }, userObj.username, userObj.password);  
    },
    getList: function(req, res) {
        model.getListOfPlans(function(workoutPlans, err) {
            if(!workoutPlans || err) {
                res.status(500).send('Error: ' + err);
                return;  
            } 

            var jsonString = JSON.stringify(workoutPlans);
            res.status(200).send(jsonString);
        });
    },
    getById: function(req, res, id) {
        model.getPlanById(function(workoutPlan, err) {
            if(!workoutPlan || err) {
                res.status(404).send('Error: ' + err);
                return;
            }

            var jsonString = JSON.stringify(workoutPlan);
            res.status(200).send(jsonString);
        }, id);
    },
    create: function(req, res) {
        model.createPlan(function(err) {
            if(err) {
                res.status(500).send('Error: ' + err);
                return;
            }

            res.sendStatus(200);
        }, req.body);
    },
    complete: function(req, res, id){
        model.complete(function(err){
            if(err){
                res.status(404).send('Error: ' + err);
                return;
            }

            res.sendStatus(200);
        }, id);
    }
}