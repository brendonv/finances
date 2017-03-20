const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const categorySchema = new Schema({
	plaid_id: { type: String, index: true },
	type: String,
	types: Array
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;