'use strict';

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParse = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const morgan = require('morgan');

const app = express();
const router = express.Router();
const config = dotenv.config().parsed;

const defaultRouter = require('./Router/default');
const notesRouter = require('./Router/notesRouter');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));

mongoose
    .connect(
        config.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
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
    app.use(bodyParse.urlencoded({ extended: true }));
    app.use(bodyParse.json());

    app.use('/', defaultRouter());
    app.use('/notes-create', notesRouter());



    if (!module.parent) {
        app.listen(3001);
        console.log('Express started on port 3001');
    }

});


