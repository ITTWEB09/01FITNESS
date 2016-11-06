var View = require('../views/Base');
var model = require('../models/ContentModel');

module.exports = {
    run: function(req, res) {
        model.getData(function(workoutPlan) {
            var content = {};
            content.myVar = workoutPlan;

            var v = new View(res, 'index');
            v.render(content);
        });
    }
};