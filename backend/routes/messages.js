const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/fetchConversation', (req, res) => {
	let roomId = req.query.roomId;
	Message.find({ roomId })
		.limit(30)	// Get the last 50 messages
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