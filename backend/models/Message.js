const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: String,
  content: {
    type: String,
  },
  roomId: String,
  recipientId: String,
  sentAt: Date
});


module.exports = mongoose.model('Message', MessageSchema);
