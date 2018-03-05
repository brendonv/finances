const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const accountSchema = new Schema({
	plaidId: {type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	name: { type: String, required: true },
	officialName: { type: String, required: true },
	type: String,
	subtype: String,
	balance: {
		available: Number,
		current: Number,
		limit: Number
	}
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;