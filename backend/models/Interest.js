const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterestSchema = new Schema({
	description: String,
	subCategory: String,
	category: String
});

module.exports = mongoose.model('Interest', InterestSchema);
