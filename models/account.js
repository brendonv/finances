const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const accountSchema = new Schema({
	//Override _id with plaid _id
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	name: String,
	balance: {
		available: Number,
		current: Number
	},
	type: String,
	subtype: String,
	institution: String
});

accountSchema.index({ property_type: 1, region: 1 });

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;