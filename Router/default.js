const routers = require('express').Router();
const Notes = require('../models/notes');


module.exports = function () {
    routers.get('/', function (req, res) {

        Notes.find({}, function (err, notes) {

            if (err) throw err;
            res.render('index.pug', {
                title: 'Супер классный сайт, построенный на NodeJs',
                notes: notes
            });

        });

    });



    return routers;
};

