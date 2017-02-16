const express = require('express');
const plaid = require('plaid');
const env = process.env.env || "DEV";
const config = require("./config")[env];

const bodyParser = require('body-parser');

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require("./webpack.config");

const PORT = process.env.PORT || 3000;

const app = express();

const plaidClient = new plaid.Client(config.PLAID_CLIENT_ID || process.env.PLAID_CLIENT_ID,
                                   config.PLAID_SECRET || process.env.PLAID_SECRET,
                                   plaid.environments.tartan);

//MIDDLEWARE

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

//ROUTES

app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});

app.post('/authenticate', (req, res) => {
  const public_token = req.body.public_token;

  console.log("Public token: ", public_token);

  // Exchange a public_token for a Plaid access_token
  plaidClient.exchangeToken(public_token, (err, exchangeTokenRes) => {
    if (err != null) {
      // Handle error!
    } else {
      // This is your Plaid access token - store somewhere persistent
      // The access_token can be used to make Plaid API calls to
      // retrieve accounts and transactions
      const access_token = exchangeTokenRes.access_token;

      console.log("Access token:", access_token);

      plaidClient.getAuthUser(access_token, (err, authRes) => {
        if (err != null) {
          // Handle error!
        } else {
          // An array of accounts for this user, containing account
          // names, balances, and account and routing numbers.
          var accounts = authRes.accounts;

          console.log("Authorized accounts:", accounts);

          // Return account data
          res.json({accounts});
        }
      });
    }
  });
});

//LISTEN

app.listen(PORT, () => {
  console.log("App listening on 3000");
});