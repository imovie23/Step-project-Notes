'use strict';

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParse = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const morgan = require('morgan');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');


const app = express();
const router = express.Router();
const config = dotenv.config().parsed;
const conn = mongoose.createConnection(config.DB_URI);

const defaultRouter = require('./Router/default');
const notesRouter = require('./Router/notesRouter');
const notesImgRouter = require('./Router/notesImgRouter');
const listsRouter = require('./Router/listsRouter')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));

mongoose
  .connect(
    config.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false

    }
  ).then(() => {

    app.set('views engine', config.TEMPLATE_ENGINE);
    app.set('views', config.TEMPLATE_VIEW_PATH);

    app.use((req, res, next) => {
        // set headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    });

    app.use(express.static(config.PUBLIC_ROOT));
    app.use(bodyParse.urlencoded({extended: true}));
    app.use(bodyParse.json());
    // app.use(express.static(__dirname + '/public'));

    app.use('/', defaultRouter());
    app.use('/notes', notesRouter());
    app.use('/notes', notesImgRouter());

    app.use('/lists', listsRouter());


    if (!module.parent) {
        app.listen(3002);
        console.log('Express started on port 3001');
    }

});
