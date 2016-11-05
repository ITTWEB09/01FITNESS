var View = require('../views/Base');

module.exports = {
    run: function(req, res, next) {
        var content = {};
        content.myVar = 'PogChamp';

        var v = new View(res, 'index');
        v.render(content);
    }
};