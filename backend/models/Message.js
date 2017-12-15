const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
  },
  roomId: {
    type: Schema.ObjectId,
    ref: 'Room'
  },
  recipientId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  sentAt: Date
});


module.exports = mongoose.model('Message', MessageSchema);
