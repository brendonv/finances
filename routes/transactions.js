const Promise = require('bluebird');
const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');
const Account = mongoose.model('Account');

exports.get = (req, res) => {
	if (!req.transaction) return res.sendStatus(404);

	return res.json(req.transaction);
};

exports.getAll = (req, res) => {
	let account;
	if (req.account) {
		
		Transaction.find({ account: req.account }).lean().exec().then(data => {

		}).catch(error => {
			res.status(500).json({ message: error});
		});

	} else {

		if (!req.user) return res.status(400).json({message: "Include user id."});

		Account.find({ user: req.user._id }).then(data => {
			if (!data || !data.accounts && !data.accounts.length) {
				Promise.reject("Unable to locate accounts on user");
			}

			return Promise.map(data.accounts, account => {
				return Transaction.find({ account: account }).lean().exec();
			});
		}).catch(error => {
			res.status(500).json({ message: error});
		});
	}
};

exports.save = (req, res) => {
	Transaction.save({}).then(data => {
		return res.status(200).send("Successful save.");
	}).catch(error => {
		return res.status(500).json({message: error});
	});
};

exports.update = (req, res) => {

	if (!req.transaction) return res.status(400).json({message: "Unable to find transaction."});

	Transaction.save({}).then(data => {
		return res.status(200).send("Successful update.");
	}).catch(error => {
		return res.status(500).json({message: error});
	});
};
