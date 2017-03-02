const express = require('express');
const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.Promise = require("bluebird");
const env = process.env.env || "DEV";
const config = require("./config")[env];
const morgan = require("morgan");

const bodyParser = require('body-parser');

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require("./webpack.config");

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

mongoose.connect(config.mongoDB);
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

app.post('/checkauth', users.get);

app.post('/signup', users.create);

app.get('/categories', categories.getAll);
app.post('/categories', categories.save);
app.put('/categories', categories.update);
// app.delete('/categories', categories.update);
app.get('/categories/:categoryId', categories.get);


app.get('/user/:userId', users.get);
app.put('/user/:userId', users.update);
app.post('/user/:userId/link', users.link);
app.get('/user/:userId/transactions', transactions.getAll);
app.get('/user/:userId/transactions/:accountId', transactions.getAll);
app.post('/user/:userId/transactions', transactions.save);
app.get('/user/:userId/transactions/:transactionId', transactions.get);
app.put('/user/:userId/transactions/:transactionId', transactions.update);
// app.delete('/:userId/transactions/:transactionId', transactions.update);

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
        key: fs.readFileSync('finance_key.pem'),
        cert: fs.readFileSync('finance_cert.pem')
    }, app).listen(3000);
} catch (error) {
    app.listen(PORT, () => {
      console.log("App listening on 3000");
    });
}