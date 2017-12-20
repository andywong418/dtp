const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MatchSchema = new Schema({
    personA: String,
    personB: String,
    createdAt: Date,
    response: {
        type: Boolean,
        default: null
    },
    matched: {
        type: Boolean,
        default: null
    },
    expired: {
      type: Boolean,
      default: false
    }
})

module.exports = mongoose.model('Match', MatchSchema);
