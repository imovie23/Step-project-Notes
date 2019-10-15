const router = require('express').Router();
const Lists = require('../models/lists')

module.exports = function () {
	router.get('/', function (req, res) {
		res.render('lists.pug', {});
	});

	router.post('/', function (req, res) {
		const listsData = req.body;

		console.log(listsData);

		const lists = new Lists({
			lists: listsData,
		})

		lists.save(function () {
		    res.json(lists)
		})
	})

	return router;
}