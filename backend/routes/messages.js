const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/fetchConversation', (req, res) => {
	console.log(req.query.roomId)
	let roomId = req.query.roomId;
	Message.find({ roomId })
		.limit(30)	// Get the last 50 messages
		.populate('author')
		.exec((error, messages) => {
			if (error) {
				console.log('Error fetching messages:', error);
			} else {
				res.json(messages);
			}
		})
})

// router.get('/fetchList', (req, res) => {
// 	let roomId = req.query.roomId;
// 	Message.findOne({ roomId })
// 		.exec((error, messages) => {
// 			if (error) {
// 				console.log('Error fetching messages:', error);
// 			} else {
// 				res.json(messages);
// 			}
// 		})
// })

module.exports = router;