const routers = require('express').Router();
const Notes = require('../models/notes');
const mongoose = require('mongoose');


module.exports = function () {

    routers.get('/', function (req, res) {
        res.render('notes.pug');
    });

    routers.get('/:noteId', function (req, res) {

        const noteId = req.params.noteId;

        Notes
            .findById(mongoose.Types.ObjectId(noteId), function (err, note) {
                res.render('detailsNote.pug', {
                    title: 'Параметры клиента:',
                    note: note
                });
            });
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