const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const listsSchema = new Schema({
	lists: {type: Object, required: true},

})

const lists = mongoose.model('lists', listsSchema)

module.exports = lists