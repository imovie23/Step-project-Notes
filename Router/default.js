const routers = require('express').Router();

module.exports = function () {
    routers.get('/', function (req, res) {
        res.send('Home Page')
    });

    return routers;
};

