const router = require('express').Router();
const Lists = require('../models/lists')
const mongoose = require('mongoose');

module.exports = function () {
	router.get('/', function (req, res) {
		console.log('---server GET');
		res.render('lists.pug', {});
	});

	router.get('/:listId', function (req, res) {

		const listId = req.params.listId;

		Lists
			.findById(mongoose.Types.ObjectId(listId), function (err, list) {
				console.log(list);
				res.render('detailsList.pug', {
					title: 'Параметры клиента:',
					list: list
				});
			});
	});

	router.post('/', function (req, res) {
		const listsData = req.body;

		console.log('---server POST', listsData);

		const lists = new Lists({
			lists: listsData,
		})

		lists.save(function () {
		    res.json(lists)
		})
	})

	router.put('/', function (req, res) {
		const listsData = req.body;

		console.log('---server PUT', listsData);

		Lists
			.findByIdAndUpdate(listsData.id, {
				lists: listsData,
			}, function (err, note) {
				// if (err) throw err;

			});
		res.status(201).send(req.body);

	})

	router.delete('/', function (req, res) {
		let newList = req.body;
		Lists
			.findByIdAndRemove(newList.id, function (err,) {
				if (err) throw err;
				console.log('User deleted!');
			});
		res.status(201).send(req.body);
	});



	return router;
}