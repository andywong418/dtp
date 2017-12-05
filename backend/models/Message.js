const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User'
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
