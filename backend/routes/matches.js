const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

router.post('/updateMatchResponse', (req, res) => {
	let { personA, personB, response } = req.body;
	console.log("personA", personA, personB, response);
	Match.findOne({ personA: personB, personB: personA, expired: false }, (error, match) => {
		if (error) {
			console.log('Error finding match:', error);
		} else if (!match) {	//This person is swiping first
			Match.create({ personA, personB, response, createdAt: new Date() }, (error, match) => {
				if (error) {
					console.log('Error creating match:', error);
					res.send('Error creating match:', error);
				} else {
					console.log('Match created successfully!');
					res.send('Match created successfully!');
				}
			})
		} else {	// If other person has swiped on them
			if (match.response && response) {	// Both said yes
				Match.update({ matched: true }, (error, match) => {
					if (error) {
						console.log('Error updating match:', error);
						res.send('Error updating match:', error);
					} else {
						console.log('It\'s a match!');
						res.send('It\'s a match!');
					}
				})
			} else {
				Match.update({ matched: false }, (error, match) => {
					if (error) {
						console.log('Error updating match:', error);
						res.send('Error updating match:', error);
					} else {
						console.log('No match!');
						res.send('No match!');
					}
				})
			}
		}
	})
})

module.exports = router;
