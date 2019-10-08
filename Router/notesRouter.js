const routers = require('express').Router();
const Notes = require('../models/notes');


module.exports = function () {

    routers.get('/', function (req, res) {
        Notes.find({})
            .exec(function (err, notes) {
                res.json(notes)
            })
    });

    routers.post('/', function (err, req, res) {

        // let newNotes = req.body;

        let notes = new Notes({
            title: 'ntest',
            description: 'terstsre',
            basket: false,
            created_at: new Date(),
            updated_at: new Date()
        });


        notes.save(function () {

           req.json(notes);
        });

    });

    return routers;
};