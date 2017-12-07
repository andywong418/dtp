const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterestSchema = new Schema({
	name: String,
	subcategory: String,
	category: String
});

module.exports = mongoose.model('Interest', InterestSchema);