const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const accountSchema = new Schema({
	number: { type: String, required: true },
	name: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	balance: {
		available: Number,
		current: Number
	},
	type: String,
	subtype: String,
	institution: String
});

accountSchema.index({ property_type: 1, region: 1 });
accountSchema.index({ number: 1, name: 1 });

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;