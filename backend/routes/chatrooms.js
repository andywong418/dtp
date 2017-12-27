const express = require('express');
const router = express.Router();

const nouns = require('../data/nouns');
const adjectives = require('../data/adjectives');
const colors = [
	'blue',
	'red',
	'yellow',
	'green',
	'orange',
	'purple',
	'brown',
	'cyan',
	'gray'
];

const RoomUsers = require('../models/RoomUsers');
const Room = require('../models/Room');

router.post('/roomExists', (req, res) => {
	let { city, topic } = req.body;
	console.log('Looking for a room!', city, topic);
	Room.findOne({
		city,
		topic
	}, (error, room) => {
		if (error) {
			console.log('Error looking for room', error);
			res.json('Error looking for room')
		} else if (room) {
			console.log('Room Found!');
			res.json({
				id: room._id,
				created: false
			})
		} else {
			console.log('Gonna create a room!');
			Room.create({
				city,
				topic
			}, (error, room) => {
				if (error) {
					console.log('Error creating room:', error);
				} else {
					console.log(`Room ${city} | ${topic} created successfully!`);
					res.json({
						id: room._id,
						created: true
					});
				}
			})
		}
	})
});

const capitalize = (s) => {
	s = s.split('');
	s[0] = s[0].toUpperCase();
	return s.join('');
};

router.post('/roomUsername', (req, res) => {
	let { roomID, userID } = req.body;
	console.log('Looking for username:', roomID, userID);
	RoomUsers.findOne({
		roomID,
		userID
	}, (error, user) => {
		if (error) {
			console.log('Error looking for user in room:', error);
		} else if (user) {
			console.log('Found user', user.username);
			res.json({
				username: user.username
			})
		} else {
			console.log('No user', null);
			res.json({
				username: null
			});
		}
	})
});

router.get('/generateUsername', (req, res) => {
	let adjective = adjectives[Math.floor(Math.random() * adjectives.length)],
		noun = nouns[Math.floor(Math.random() * nouns.length)],
		randomNumber = Math.floor(Math.random() * 9 + 1),
		color = colors[Math.floor(Math.random() * colors.length)]
	res.send({
		username: capitalize(adjective) + capitalize(noun),
		color
	});
});

router.post('/saveUsername', (req, res) => {
	let { roomID, userID, username } = req.body;
	RoomUsers.create({
		roomID,
		userID,
		username
	}, (error, success) => {
		if (error) {
			console.log('Error saving username:', error);
			res.json({
				success: false
			})
		} else if (!success) {
			res.json({
				success: false
			})
		} else {
			res.json({
				success: true
			})
		}
	})
});

module.exports = router;