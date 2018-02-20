const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const accountSchema = new Schema({
	plaid_id: {type: String, required: true },
	number: { type: String, required: true },
	name: { type: String, required: true },
	official_name: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	balance: {
		available: Number,
		current: Number,
		limit: Number
	},
	type: String,
	subtype: String
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;