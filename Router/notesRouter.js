const routers = require('express').Router();
const Notes = require('../models/notes');
const mongoose = require('mongoose');


module.exports = function () {

    // routers.get('/', function (req, res) {
    //     Notes.find({})
    //         .exec(function (err, notes) {
    //             res.render('notes', {
    //                 notes
    //             });
    //         })
    // });

    routers.get('/', function (req, res) {
        res.render('notes.pug')
    });

    routers.get('/:id', function (req, res) {
        res.render('notes.pug')
    });



    routers.post('/', function (req, res) {

        let newNotes = req.body;

        let notes = new Notes({
            title: newNotes.tittleNotes,
            description: newNotes.descriptionNotes,
            basket: false,
            created_at: new Date(),
            updated_at: new Date()
        });

        notes.save(function () {
            res.json(notes);
        });
    });

    return routers;
};