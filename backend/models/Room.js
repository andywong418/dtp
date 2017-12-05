const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const RoomSchema = new Schema({
  topic: String,
  location: String,
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  bannedUsers: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
})

module.exports = mongoose.model('Room', RoomSchema);
