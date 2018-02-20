const mongoose = require('mongoose');
const env = process.env.env || "DEV";
const config = require("../../config/environment")[env];
const User = mongoose.model('User');
const Account = mongoose.model('Account');
const Transaction = mongoose.model('Transaction');
const Category = mongoose.model('Category');
const plaid = require('plaid');
const Promise = require('bluebird');
const moment = require('moment');

const DEFAULT_USER_ID = "5a7752108bfce81f28b4b4ab";

//Promisify plaid
const plaidClient = new plaid.Client(config.plaid.client_id, config.plaid.secret, config.plaid.public_key, plaid.environments["sandbox"]);
const $exchangePublicToken = Promise.promisify(plaidClient.exchangePublicToken, { context: plaidClient }); //multiArgs: true
const $getAuth = Promise.promisify(plaidClient.getAuth, { context: plaidClient });
// Promise.promisifyAll(plaid, {
//     filter: function(name) {
//         return name === "addConnectUser";
//     },
//     multiArgs: true
// });

exports.getAccessToken = (req, res) => {
    const publicToken = req.body.publicToken;
    let userObject;

    User.findById(DEFAULT_USER_ID).then(user => {
        userObject = user;
        if (!user) {
            return Promise.reject('No user found');
        }
        return $exchangePublicToken(publicToken);

    }).then(tokenResponse => {
        accessToken = tokenResponse.access_token;
        itemId = tokenResponse.item_id;
        userObject.access_token = accessToken;
        res.json({ userId: DEFAULT_USER_ID });
        return userObject.save();
    }).catch(error => {
        console.log("ERROR /accesstoken could not exchange public token", error);
        res.status(500).json({ error: error.message });
    });
    
};

exports.getAccounts = (req, res) => {
    $getAuth(req.user.access_token)
    .then(response => {
        console.log("GET ACCOUNTS RESPONSE", JSON.stringify(response,null,4));
        response.accounts.forEach(account => {
            Account.findById(account.account_id).then(acct => {
                if (!acct) {
                    const accountObject = new Account({
                        plaid_id: account.account_id,
                        user: req.user._id,
                        name: account.name,
                        official_name: account.official_name,
                        type: account.type,
                        subtype: account.subtype,
                        balance: account.ballance
                    });
                    return Account.save();
                } else {
                    mergeDiff(["name", "official_name", "type", "subtype", "balance"], account, acct);
                    return acct.save();
                }
            }).catch(err => {
                console.log("ERROR SAVING OR UPDATING ACCOUNT", err);
            });
        });
        res.status(200);
    }).catch(error => {
        console.log(`ERROR /user/${user.id}/accounts could not get accounts ${JSON.stringify(err,null,4)}`);
        res.status(500).json({ error: error.message });
    });
};

function mergeDiff (f, a, b) {
    for (const field of f) {
        if (a[f] !== b[f]) {
            console.log(`Updating account ${a.official_name} field ${field} :: ${a[f]} - ${b[f]}`);
            b[f] = a[f];
        }
    }
    return b;
}