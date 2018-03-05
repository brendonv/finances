const Koa = require('koa');
const https = require('https');
const http = require('http');
const fs = require('fs');
const Router = require('koa-router');
const mongoose = require('mongoose');
const env = process.env.env || "DEV";
const config = require("../config/environment")[env];
const plaid = require('plaid');

const bodyParser = require('koa-bodyparser');
const bunyan = require('bunyan');
const compress = require('koa-compress');
const serveStatic = require('koa-static');
const logger = require('koa-logger');

const PORT = process.env.PORT || 3000;

const app = new Koa();

//MIDDLEWARE

app.use(logger());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log("KOA ERROR MIDDLEWARE");
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

app.use(compress());

app.use(bodyParser({
    onerror: (error, ctx) => ctx.throw('body parse error')
    // TODO: set limits here
}));

app.on('error', (error, ctx) => {
    console.log("APP ON ERROR", error);
});

/*
 * Mongoose DB connection
 */

mongoose.connect(config.mongodb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (cb) => {
    console.log("successfully opened mongodb connection");
});

require('./models/account');
require('./models/category');
require('./models/transaction');
require('./models/user');

const Account = mongoose.model('Account');
const Category = mongoose.model('Category');
const Transaction = mongoose.model('Transaction');
const User = mongoose.model('User');

const categories = require('./routes/categories');
const transactions = require('./routes/transactions');
const users = require('./routes/users');

app.use(serveStatic(process.cwd() + "/public"));

app.use(async (ctx, next) => {
    const plaidClient = new plaid.Client(
        config.plaid.client_id,
        config.plaid.secret,
        config.plaid.public_key,
        plaid.environments["sandbox"]
    );
    ctx.plaidClient = plaidClient;
    await next();
});

//ROUTES
const router = new Router();

router.param('userId', async (id, ctx, next) => {
    const user = await User.findById(id);
    ctx.user = user;
    await next();
});

router.param('transactionId', async (id, ctx, next) => {
    const transation = await Transaction.findById(id);
    ctx.transaction = transaction;
    await next();
});

router.param('accountId', async (id, ctx, next) => {
    const account = await Account.findById(id);
    ctx.account = account;
    await next();
});

router.get('/hook', (req, res) => {
    console.log("HOOK -- GET", req.query);
});

router.post('/hook', (req, res) => {
    console.log("HOOK -- POST", req.body);
});

router.post('/users/accesstoken', users.getAccessToken);
router.get('/users/:userId/accounts', users.getAccounts);

router.get('/users/:userId/transactions/:accountId', transactions.getTransactionsForAccount);


app.use(router.routes());
app.use(router.allowedMethods());

//LISTEN
try {
    https.createServer({
        key: fs.readFileSync('finance_app.key'),
        cert: fs.readFileSync('finance_app.cert')
    }, app.callback()).listen(3000);
} catch (error) {
    console.log("HTTPS CREATE SERVER ERROR", error);
    app.listen(PORT, () => {
      console.log("App listening on 3000");
    });
}

http.createServer((req, res) => {
    res.writeHead(301, { Location: 'https://' + req.headers.host.replace(/(\:)([0-9]+)/, '$13000') + req.url });
    res.end();
}).listen(3001);
