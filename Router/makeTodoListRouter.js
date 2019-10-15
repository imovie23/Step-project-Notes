const router = require('express').Router();
const TodoList = require('../models/todoList')

module.exports = function () {
	router.get('/', function (req, res) {
		res.render('makeTodoList.pug', {});
	});

	router.post('/', function (req, res) {
		const todoData = req.body;

		console.log(todoData);

		const todoList = new TodoList({
			todoList: todoData,
		})

		todoList.save(function () {
		    res.json(todoList)
		})
	})

	return router;
}