const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const transactionSchema = new Schema({
	account: { type: Schema.Types.ObjectId, ref: 'Account', index: true },
	category: { type: Schema.Types.ObjectId, ref: 'Category', index: true },
	amount: { type: Number, index: true },
	date: Date,
	name: { type: String, index: true },
	pending: Boolean
});

transactionSchema.index({ category: 1, date: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;