const routers = require('express').Router();

module.exports = function () {
    routers.get('/', function (req, res) {
        res.render('index.pug')
    });

    return routers;
};

