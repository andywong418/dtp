const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const RoomUserSchema = new Schema({
	roomID: String,
	userID: String,
	username: String,
	joined: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('RoomUsers', RoomUserSchema);
