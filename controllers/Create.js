var View = require('../views/Base');

module.exports = {
    run: function(req, res, next) {
        var content = {};
        content.myVar = 'PugChamp!';

        var v = new View(res, 'create');
        v.render(content);
    }
};