const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const RoomSchema = new Schema({
  city: String,
  topic: String,
  creator: {
    type: String,
    default: 'Default'
  }
})

module.exports = mongoose.model('Room', RoomSchema);
