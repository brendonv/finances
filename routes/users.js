const mongoose = require('mongoose');
const env = process.env.env || "DEV";
const config = require("../config")[env];
const User = mongoose.model('User');
const Account = mongoose.model('Account');
const Transaction = mongoose.model('Transaction');
const Category = require('Category');
const plaid = require('plaid');
const Promise = require('bluebird');
const moment = require('moment');

//Promisify plaid
const plaidClient = new plaid.Client("test_id", "test_secret", plaid.environments.tartan);
const addConnectUserAsync = Promise.promisify(plaidClient.addConnectUser, { context: plaidClient, multiArgs: true });
const stepConnectUserAsync = Promise.promisify(plaidClient.stepConnectUser, { context: plaidClient, multiArgs: true });
// Promise.promisifyAll(plaid, {
//     filter: function(name) {
//         return name === "addConnectUser";
//     },
//     multiArgs: true
// });

exports.get = (req, res) => {
    let user;
    const name = req.body.username;

    if (!name) {
        res.statusMessage = "No username provided";
        return res.status(400).end();
    }

    User.findOne({ name: name }).lean()
    .then(userObject => {
        if (!userObject) {
            return Promise.reject("No user found");
        }
        user = userObject;
        if (!userObject.access_token) {
            return Promise.resolve();
        }
        return Account.find({ user: userObject._id }).lean()
    })
    .then(accounts => {
        res.json({ user: user, accounts: accounts });
    })
    .catch(error => {
        console.log("ERROR: /checkauth users.get", error);
        res.statusMessage = error;
        res.status(500).end();
    })
};

exports.create = (req, res) => {
    let u = new User();
    u.name = req.body && req.body.name || "brendon";
    u.save().then(data => {
        res.json({user: data});
    }).catch(error => {
        res.status(500).json({ message: error.errmsg || "Unable to signup at this time." });
    });
};

exports.link = (req, res) => {
    const username = "plaid_test";
    const password = "plaid_good";
    // const username = req.body.username;
    // const password = req.body.password;
    let user = req.user;

    let accounts = [];

    if (!username || !password) {
        return res.status(400).json({ message: "Missing username or password." });
    }

    if (user.access_token) {
        return res.json({message: "Already linked account"});
    }

    const plaidClient = new plaid.Client("test_id", "test_secrett", plaid.environments.tartan);

    addConnectUserAsync("bofa", { username, password })
    .then(responseArray => {
        //mfaResponse, response
        const mfaResponse = responseArray[0];
        const response = responseArray[1];

        if (mfaResponse) {
            return stepConnectUserAsync(mfaResponse.access_token, 'tomato', {})
                    .then(responseArray => {
                        //mfaResponse, response
                        const mfaResponse = responseArray[0];
                        const response = responseArray[1];

                        if (mfaResponse) {
                            console.log("Unhandled mfaResponse");
                            return Promise.reject({ message: "Unhandled mfaResponse" });
                        }

                        return Promise.resolve(response);
                    });
        }

        return Promise.resolve(response);
    })
    .then(response => {

        user.access_token = response.access_token;

        console.log("### RESPONSE ACCOUNTS: ", response.accounts);

        return Promise.all([
            // user.save(),
            Promise.map(response.accounts, data => {
                const { name, number } = data.meta;

                return Account.findOne({ name: name, number: number }).then(existingAccount => {
                    
                    if (existingAccount) {
                        return Promise.resolve(existingAccount);
                    }

                    let account = new Account();
                    account.plaid_id = data._id;
                    account.user = user._id;
                    account.name = name;
                    account.number = number;
                    account.balance = {
                        available: data.balance.available || 0,
                        current: data.balance.current || 0
                    };
                    account.type = data.type;
                    account.subtype = data.subtype;
                    account.institution = data.institution_type;

                    return account.save().then(doc => {
                        accounts.push(doc);
                    });
                })
            }),
            Promise.map(response.transactions, data => {
                console.log("TRANSACTION: ", data);
                const {
                    _account
                    date,
                    name,
                    amount,
                    meta,
                    type,
                    category,
                    category_id
                } = data;

                let plaid_account = accounts.find(acct => acct.plaid_id === _account);
                if (!plaid_account_id) {
                    console.log("WARNING: no Plaid account id found for transaction: ", data);
                }

                let transaction = new Transaction();
                transaction.data = moment(date).format();
                transaction.name = name;
                transaction.amount = amount;
                transaction.account = plaid_account._id;

                return Category.findOne({ plaid_id: category_id })
                        .then(cat => {
                            if (!cat) {
                                let newCategory = new Category();
                                newCategory.plaid_id = category_id;
                                newCategory.types = category;
                                return newCategory.save().then(doc => {
                                    transaction.category = doc._id;
                                    return transaction.save();
                                })
                            }
                            transaction.category = cat._id;
                            return transaction.save();
                        });
            });
        ]);
    })
    .then(results => {
        // res.json({ user: results[0], accounts: results[1] });
        res.json({ message: "success" });
    })
    .catch(error => {
        console.log("ERROR: ", error.message);
        res.status(500).json({ message: "Error: unable to update user and save accounts."})
    });
};

exports.updatePlaidAccount = (req, res) => {
    console.log("UPDATE: ", req.body);
    const date = req.body.date;

    let user = req.user;

    // const plaidClient = new plaid.Client(config.PLAID_CLIENT_ID || process.env.PLAID_CLIENT_ID,
    //                                config.PLAID_SECRET || process.env.PLAID_SECRET,
    //                                plaid.environments.tartan);

    plaidClient.getAuthUser(user.access_token, {}, (error, response) => {
        if (error) {
            console.log("plaid erroror", error.message);
            return res.status(500).json({ message: error.message })
        }

        console.log("GETAUTHUSER", response)
        res.status(200).end();
    })
};

exports.update = (req, res) => {

};
