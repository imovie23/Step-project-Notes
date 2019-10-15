const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const notesSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    imageName: String,
    imageId: String,
    basket: Boolean,
    created_at: Date,
    updated_at: Date
});

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;