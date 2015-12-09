'use strict';

var _ = require('lodash');
var path = require('path');
var pkg = require('./package.json');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var deps = _.keys(pkg.devDependencies).concat(_.keys(pkg.dependencies));
var libs = _.filter(deps, function(dep) { return /^react(-|$)/.test(dep); })
    .concat([
        'lodash',
        'redux'
    ]);

module.exports = {
    entry: {
        main: [ path.join(__dirname, 'src/main.js') ],
        vendor: libs
    },
    output: {
        path: 'dist',
        filename: 'js/[name].min.js'
    },

    resolve: {
        extensions: [ '', '.js' ],

        modulesDirectories: [
            'node_modules',
            __dirname,
            path.join(__dirname, 'src')
        ]
    },

    cache: true,
    watch: true,
    inline: true,

    devServer: {
        keepAlive: true,
        port: 8881,
        contentBase: 'dist',
        publicPath: '/',
        hot: true
    },

    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            include: /src/,
            exclude: /node_modules/,
            query: {
                cacheDirectory: true
            }
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
        }]
    },

    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        })
    ],

    eslint: {
        fix: true
    },

    stylus: {
        use: [
            require('nib')()
        ]
    }
}

