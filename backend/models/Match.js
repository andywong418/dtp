const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MatchSchema = new Schema({
  personA: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  personB: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdAt: Date,
  status: String,
})

module.exports = mongoose.model('Match', MatchSchema);
