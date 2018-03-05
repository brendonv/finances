const ENV = process.env.NODE_ENV || "DEV";
const path = require('path');
const webpack = require('webpack');
const config = require('./config/environment')[ENV];

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        finances: ['babel-polyfill', path.join(__dirname, 'src/finances.js')],
        vendor: [
            'whatwg-fetch'
        ]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?-autoprefixer', 'sass-loader']
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('index.css'),
        new webpack.optimize.splitChunks({
            name: 'vendor'
        }),
        new webpack.DefinePlugin({
            PORT: JSON.stringify(process.env.PORT) || 5000, 
            URL: JSON.stringify(process.env.url) || JSON.stringify("http://localhost:" + (process.env.PORT || 5000)),
            PLAID_PUBLIC_KEY: JSON.stringify(config.plaid.public_key)
        }),
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist'
    }
};