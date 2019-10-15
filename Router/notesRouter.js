const routers = require('express').Router();
const Notes = require('../models/notes');
const mongoose = require('mongoose');
const formData = require('form-data');
const upload = require('../models/imgCreat');


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


    routers.post('/', upload.single("myFile"), function (req, res) {

        let newNotes = req.body;
        let imageId;
        if (req.file === undefined) {
            imageId ='';
        } else {
            imageId = req.file.id;
        }


        let notes = new Notes({
            title: newNotes.tittleNotes,
            description: newNotes.descriptionNotes,
            basket: false,
            imageName: newNotes.nameImg,
            imageId: imageId,
            created_at: new Date(),
            updated_at: new Date()
        });
        notes.save(function () {
            res.json(notes);
        });
    });

    routers.put('/', upload.single("myFile"), function (req, res) {
        let newNotes = req.body;
        let imageId;
        if (req.file === undefined) {
            imageId ='';
        } else {
            imageId = req.file.id;
        }

        let test = JSON.parse(newNotes.data);

        Notes
            .findByIdAndUpdate(newNotes.id, {
                title: newNotes.tittleNotes,
                description: newNotes.descriptionNotes,
                imageName: newNotes.nameImg.length !== 0 ? newNotes.nameImg : test.imageName,
                imageId: imageId.length !== 0 ? imageId : test.imageId,
                updated_at: new Date()
            }, function (err, note) {
                // if (err) throw err;

            });
        res.status(201).send(req.body);
    });

    routers.delete('/', function (req, res) {
        let newNotes = req.body;

        Notes
            .findByIdAndRemove(newNotes.id, function (err,) {
                if (err) throw err;
                console.log('User deleted!');
            });
        res.status(201).send(req.body);
    });


    return routers;
};