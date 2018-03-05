const mongoose = require('mongoose');
const env = process.env.env || "DEV";
const config = require("../../config/environment")[env];
const User = mongoose.model('User');
const Account = mongoose.model('Account');
const Transaction = mongoose.model('Transaction');
const Category = mongoose.model('Category');
const moment = require('moment');

const DEFAULT_USER_ID = "5a7752108bfce81f28b4b4ab";

exports.getAccessToken = async ctx => {
    console.log(ctx);
    const publicToken = ctx.request.body.publicToken;

    const user = await User.findById(DEFAULT_USER_ID);
    if (!user) {
        throw new Error('User not found.');
    }

    const tokenResponse = await ctx.plaidClient.exchangePublicToken(publicToken);
    user.access_token = tokenResponse.access_token;
    user.save();

    ctx.body = { userId: DEFAULT_USER_ID };

    // }).catch(error => {
    //     console.log("ERROR /accesstoken could not exchange public token", error);
    //     res.status(500).json({ error: error.message });
    // });
    
};

exports.getAccounts = (req, res) => {
    
    $getAuth(req.user.access_token)
    .then(response => {
        return Promise.all(
            response.accounts.map(account => 
                Account.findOne({ plaidId: account.account_id })
                .then(acct => {
                    if (!acct) {
                        const accountObject = new Account({
                            plaidId: account.account_id,
                            user: req.user._id,
                            name: account.name,
                            officialName: account.official_name,
                            type: account.type,
                            subtype: account.subtype,
                            balance: account.ballance
                        });
                        return accountObject.save();
                    } else {
                        // mergeDiff(["name", "officialName", "type", "subtype", "balance"], account, acct);
                        return acct.save();
                    }
                }).catch(err => {
                    console.log("ERROR SAVING OR UPDATING ACCOUNT", err);
                })
            )
        );
    }).then(accounts => {
        res.json({ accounts });
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