var View = require('../views/Base');
var model = require('../models/ContentModel');

module.exports = {
    run: function(req, res) {
        var content = {};
        content.myVar = 'PogChamp';

        var v = new View(res, 'index');
        v.render(content);
    }
};