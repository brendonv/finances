const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.Promise = require("bluebird");
const env = process.env.env || "DEV";
const config = require("../config/environment")[env];
const morgan = require("morgan");

const bodyParser = require('body-parser');

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require("../webpack.config");

const PORT = process.env.PORT || 3000;

const app = express();

//MIDDLEWARE

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));
// app.use(express.static('dist'));
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(morgan('tiny'));

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

//ROUTES

app.get('/', (req, res) => {
    return res.sendFile(__dirname + "/public/index.html");
});

app.get('/hook', (req, res) => {
    console.log("HOOK -- GET", req.query);
});

app.post('/hook', (req, res) => {
    console.log("HOOK -- POST", req.body);
});

app.post('/accesstoken', users.getAccessToken);

app.get('/categories', categories.getAll);
app.post('/categories', categories.save);
app.put('/categories', categories.update);
// app.delete('/categories', categories.update);
app.get('/categories/:categoryId', categories.get);

app.get('/user/:userId/accounts', users.getAccounts);

app.param('categoryId', (req, res, next, id) => {
    Category.findById(id).then(data => {
        req.category = data;
        next();
    }).catch(error => {
        next(error);
    });
});

app.param('userId', (req, res, next, id) => {
    User.findById(id).then(data => {
        req.user = data;
        next();
    }).catch(error => {
        next(error);
    });
});

app.param('transactionId', (req, res, next, id) => {
    Transaction.findById(id).then(data => {
        req.transaction = data;
        next();
    }).catch(error => {
        next(error);
    });
});

app.param('accountId', (req, res, next, id) => {
    Account.findById(id).then(data => {
        req.account = data;
        next();
    }).catch(error => {
        next(error);
    });
});

//LISTEN
try {
    https.createServer({
        key: fs.readFileSync('finance_app.key'),
        cert: fs.readFileSync('finance_app.cert')
    }, app).listen(3000);
} catch (error) {
    console.log("ERROR", error);
    app.listen(PORT, () => {
      console.log("App listening on 3000");
    });
}

http.createServer((req, res) => {
    res.writeHead(301, { Location: 'https://' + req.headers.host.replace(/(\:)([0-9]+)/, '$13000') + req.url });
    res.end();
}).listen(3001);
