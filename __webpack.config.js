const ENV = process.env.NODE_ENV || "DEV";
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config/environment')[ENV];

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'whatwg-fetch',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/finances.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //CUSTOM RUN_TIME ENV VARIABLES.
    new webpack.DefinePlugin({
      PORT: JSON.stringify(process.env.PORT) || 5000, 
      URL: JSON.stringify(process.env.url) || JSON.stringify("http://localhost:" + (process.env.PORT || 5000)),
      PLAID_PUBLIC_KEY: JSON.stringify(config.plaid.public_key)
    }),
    new ExtractTextPlugin('index.css', {
      allChunks: true
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: [/\.scss$/, /\.sass$/],
      loader: ExtractTextPlugin.extract('css!sass')
    }]
  }
}

// 'use strict';

// var path = require('path');
// var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//     devtool: 'eval-source-map',
//     entry: [
//         'webpack-dev-server/client?http://localhost:3000',
//         'webpack/hot/only-dev-server',
//         'react-hot-loader/patch',
//         path.join(__dirname, 'src/index.js')
//     ],
//     output: {
//         path: path.join(__dirname, '/dist/'),
//         filename: '[name].js',
//         publicPath: '/'
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//           template: 'public/index.html',
//           inject: 'body',
//           filename: 'index.html'
//         }),
//         new webpack.optimize.OccurenceOrderPlugin(),
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.NoErrorsPlugin(),
//         new webpack.DefinePlugin({
//           'process.env.NODE_ENV': JSON.stringify('development')
//         })
//     ],
//     eslint: {
//         configFile: '.eslintrc',
//         failOnWarning: false,
//         failOnError: false
//     },
//     module: {
//         preLoaders: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: 'eslint'
//             }
//         ],
//         loaders: [
//             {
//                 test: /\.js?$/,
//                 exclude: /node_modules/,
//                 loader: 'babel'
//             },
//             {
//                 test: /\.json?$/,
//                 loader: 'json'
//             },
//             {
//                 test: /\.scss$/,
//                 loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass'
//             },
//             { test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
//             { test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/, loader: 'file' }
//         ]
//     }
// };
