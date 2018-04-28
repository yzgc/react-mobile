// 引入webpack
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var precss = require('precss')
var autoPreFixer = require('autoprefixer')
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
console.log(process.env.NODE_DEV)

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
        filename:'js/[name].[hash].js',
        publicPath: '/',
        chunkFilename: '[name].[chunkhash:5].chunk.js'//5位hash值
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
config.module.rules.push(
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    }
)
config.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    include: SRC_PATH,
    // 这里使用 loaders ，因为后面还需要添加 loader
    loaders: ['babel?cacheDirectory=' + CACHE_PATH]
})

// 编译 sass
config.module.rules.push({
    test: /\.(scss|css)$/,
    loaders: ['style', 'css', 'sass']
})

// css autoprefix
config.plugins.push(
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: function () {
                return [precss,autoPreFixer]
            }
        }
    })
)

// 自动引入静态资源到相应的页面
config.plugins.push(
    new HtmlWebpackPlugin(
        {
            filename: 'index.html',
            chunks: ['app','lib'],
            template: SRC_PATH + '/index.html',
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true
            }
        }
    )
)

// 依赖库单独打包
config.entry.vendor = [
    'react',
    'react-dom',
    'react-router',
    'redux',
    'react-redux',
    'redux-thunk'
]

config.plugins.push(
    new  webpack.optimize.SplitChunksPlugin('lib', 'js/lib.js')
)

// 压缩js , css 生产环境使用
if (__DEV__) {
    // js , css
    // config.plugins.push(
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     })
    // )
}

// 图片压缩
config.module.rules.push({
    test: /\.(?:jpg|gif|png|svg)$/,
    loaders: [
        'url?limit=8000&name=img/[hash].[ext]',
        'image-webpack'
    ]
})

module.exports = config;

