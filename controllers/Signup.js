var View = require('../views/Base');

module.exports = {
    run: function(req, res) {
        var v = new View(res, 'signup');
        v.render(null);
    }
};