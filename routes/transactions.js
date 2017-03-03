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
		
		Transaction.find({ account: req.account }).lean().exec()
		.then(data => {
			res.json({ transactions: data });
		})
		.catch(error => {
			res.status(500).json({ message: error});
		});

	} else {

		if (!req.user) return res.status(400).json({message: "Include user id."});

		Account.find({ user: req.user._id })
		.then(data => {
			if (data.length === 0) {
				return Promise.reject("No accounts found.");
			}

			return Promise.reduce(data, (transactions, account) => {
				return Transaction.find({ account: account._id }).lean().exec()
						.then(data => {
							transactions[account.name] = data
							transactions.total += data.length;
							return transactions;
						});
			}, { total: 0 });
		})
		.then(data => {
			console.log("TRANSACTIONS FIND: ", data);
			return res.json({ transactions: data });
		})
		.catch(error => {
			console.log("ERROR: transactions.getAll", error);
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
