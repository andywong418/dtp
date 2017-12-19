const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterestSchema = new Schema({
	name: String,
	subcategory: String,
	category: String,
	userId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Interest', InterestSchema);
