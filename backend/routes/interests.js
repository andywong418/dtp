const express = require('express');
const router = express.Router();
const Interest = require('../models/Interest');

router.post('/add', (req, res) => {
	console.log(req.body);
	let { name, subcategory, category } = req.body;
	Interest.create({
		name,
		subcategory,
		category
	})
		.then(interest => {
			console.log('Interest saved succesfully');
			res.send('Interest saved succesfully');
		})
		.catch(error => {
			res.status(500).send('Failed to save Interest:', error);
		});
});

router.get('/get', (req, res) => {
	let { subcategory, category } = req.query;
	Interest.find({
		subcategory,
		category
	})
		.then(interests => {
			console.log('Interests:', interests);
			res.json(interests);
		})
		.catch(error => {
			console.log('Failed to get the Interests:', error);
			res.status(500).send('Failed to get the Interests: ' + error);
		})
});

module.exports = router;