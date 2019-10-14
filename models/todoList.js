const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const todoListSchema = new Schema({
	todoList: {type: Object, required: true},

})

const todoList = mongoose.model('todoList', todoListSchema)

module.exports = todoList