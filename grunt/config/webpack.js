'use strict';

var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('webpack.config.js');

module.exports = function(grunt) {
    return {
        'webpack': {
            build: _.merge({}, webpackConfig, {
                plugins: [ new webpack.optimize.UglifyJsPlugin() ].concat(webpackConfig.plugins)
            })
        },
        'webpack-dev-server': {
            options: {
                webpack: _.merge({}, webpackConfig, {
                    entry: {
                        main: ['webpack-dev-server/client?http://localhost:8881', 'webpack/hot/only-dev-server'].concat(webpackConfig.entry.main)
                    },
                    plugins: [new webpack.HotModuleReplacementPlugin()].concat(webpackConfig.plugins)
                })
            },
            build: webpackConfig.devServer
        }
    }
};

