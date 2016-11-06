var View = require('../views/Base');

module.exports = {
    run: function(req, res) {
        var v = new View(res, 'create');
        v.render(null);
    }
};