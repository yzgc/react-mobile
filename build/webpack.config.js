// 引入webpack
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 辅助函数
var utils = require('./utils')
var pickFiles = utils.pickFiles
var fullPath = utils.fullPath
var getIP = utils.getIP


// 项目根路径
var ROOT_PATH = fullPath('../')
// 项目源码路径
var SRC_PATH = ROOT_PATH + '/src'
// 生产存放路径
var DIST_PATH = ROOT_PATH + '/dist'
// 是否是开发环境
var __DEV__ = process.env.NODE_DEV == 'production'

// config
var alias = pickFiles({
    id: /(config\/[^\/]+).js$/,
    pattern: SRC_PATH + '/config/*.js'
});

var config = {
    context: SRC_PATH,
    entry: {
        app: ['../src/index.js']
    },
    output: {
        path:DIST_PATH,
        filename:'js/bundle.js'
    },
    module: {},
    resolve: {
        alias: alias
    },
    plugins: [
        new webpack.DefinePlugin(
            {
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
            }
        )
    ]
};

// 使用缓存
var CACHE_PATH = ROOT_PATH + '/cache';
// loaders
config.module.rules = [];
// 使用 babel 编译 jsx、es6
config.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    include: SRC_PATH,
    // 这里使用 loaders ，因为后面还需要添加 loader
    loaders: ['babel?cacheDirectory=' + CACHE_PATH]
});

// 编译 sass
config.module.rules.push({
    test: /\.(scss|css)$/,
    loaders: ['style', 'css', 'sass']
});

module.exports = config;

