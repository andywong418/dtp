const express = require('express');
const router = express.Router();

const nouns = require('../data/nouns');
const adjectives = require('../data/adjectives');

const capitalize = (s) => {
	s = s.split('');
	s[0] = s[0].toUpperCase();
	return s.join('');
};

router.get('/generateUsername', (req, res) => {
	let adjective = adjectives[Math.floor(Math.random() * adjectives.length)],
		noun = nouns[Math.floor(Math.random() * nouns.length)],
		randomNumber = Math.floor(Math.random() * 100);
	res.send(capitalize(adjective) + capitalize(noun) + randomNumber);
});

module.exports = router;