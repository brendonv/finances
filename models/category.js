const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const categorySchema = new Schema({
	primary: String,
	secondary: String
});

categorySchema.index({ primary: 1, secondary: 1 });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;