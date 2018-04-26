// 引入webpack以及相关依赖
var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')
var utils = require('./utils')

var PORT = 3000;
var HOST = utils.getIP() || 'localhost';
var args = process.argv;
var hot = args.indexOf('--hot') > -1;
var deploy = args.indexOf('--deploy') > -1;

// 本地环境静态资源路径
var localPublicPath = 'http://' + HOST + ':' + PORT + '/';
config.output.publicPath = localPublicPath;
config.entry.app.unshift('webpack-dev-server/client?' + localPublicPath);

new webpackDevServer(webpack(config), {
    hot: hot,
    inline: true,
    compress: true,
    stats: {
        chunks: false,
        children: false,
        colors: true
    },
    historyApiFallback: true,
}).listen(PORT, HOST, function() {
    console.log('webpack-dev-server start! ' + localPublicPath);
});

