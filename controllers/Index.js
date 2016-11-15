var View = require('../views/Base');
var model = require('../models/ContentModel');

module.exports = {
    run: function(req, res) {
        var v = new View(res, 'index');
        v.render(content);
    }
};