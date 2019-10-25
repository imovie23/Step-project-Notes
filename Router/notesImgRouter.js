const routers = require('express').Router();
const upload = require('../models/imgCreat');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Grid = require('gridfs-stream');
const Notes = require('../models/notes');



const config = dotenv.config().parsed;
const conn = mongoose.createConnection(config.DB_URI);

let gfs;
conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    console.log("Connection Successful");
});


module.exports = function () {

    routers.get('/image/:filename', (req, res) => {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {

            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: 'No file exists',
                })
            }
            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res)
            } else {
                res.status(404).json({
                    err: 'Not an image',
                })
            }
        })
    });

    routers.post("/", upload.single("myFile"), (req, res, err) => {
        res.status(201).send(req.body);
    });


    routers.delete('/image', function (req, res) {
        let newNotes = req.body;

        console.log(newNotes);

        if (newNotes.imageId === '') {
            console.log('No match');
        } else {
            gfs.files.findOne({_id: mongoose.Types.ObjectId(newNotes.imageId)}, (err, file) => {

                gfs.files.deleteOne(file, function (err) {


                    return true;
                });

            });

            gfs.db.collection('uploads.chunks').find({files_id: mongoose.Types.ObjectId(newNotes.imageId)}, (err, file) => {

                file.forEach(i => {
                    gfs.db.collection('uploads.chunks').deleteOne(i, function (err) {
                        return true;
                    });
                })



            });
        }
        res.status(201).send(req.body);
    });


    return routers;
};