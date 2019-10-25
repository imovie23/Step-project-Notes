const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const listsSchema = new Schema({
	lists: {type: Object, required: true},

})

const Lists = mongoose.model('Lists', listsSchema)

module.exports = Lists