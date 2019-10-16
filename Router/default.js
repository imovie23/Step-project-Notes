const routers = require('express').Router();
const Notes = require('../models/notes');
const Lists = require('../models/lists');


module.exports = function () {
    routers.get('/', function (req, res) {
        
        Promise.all([
            Notes.find({}),
            Lists.find({})
        ]).then(([notes, toDoLists]) => {
            res.render('index.pug', {
                title: 'Супер классный сайт, построенный на NodeJs',
                notes: notes,
                toDoLists:toDoLists
            });
        }).catch((err) => {
            console.log('Error: ', err);
        });

    });


    return routers;
};

