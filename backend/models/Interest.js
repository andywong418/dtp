const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterestSchema = new Schema({
	description: {
		type: String,
		default: 'Other'
	},
	subCategory: {
		type: String,
		default: 'Other'
	},
	category: String
});

module.exports = mongoose.model('Interest', InterestSchema);
