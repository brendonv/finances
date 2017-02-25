const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema({
	name: String,
	access_token: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;