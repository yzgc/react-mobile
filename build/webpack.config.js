// 引入webpack
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var precss = require('precss')
var autoPreFixer = require('autoprefixer')
var px2rem = require('postcss-px2rem')
// 辅助函数
var utils = require('./utils')
var pickFiles = utils.pickFiles
var fullPath = utils.fullPath
var getIP = utils.getIP


// 获取运行环境变量
process.env.NODE_ENV = (process.env.NODE_ENV || 'development').trim()
// 项目根路径
var ROOT_PATH = fullPath('../')
// 项目源码路径
var SRC_PATH = ROOT_PATH + '/src'
// 生产存放路径
var DIST_PATH = ROOT_PATH + '/dist'
// 是否是开发环境
var __DEV__ = process.env.NODE_ENV == 'production'
console.log(process.env.NODE_ENV)

// config
var alias = pickFiles({
    id: /(config\/[^\/]+).js$/,
    pattern: SRC_PATH + '/config/*.js'
});

var config = {
    context: SRC_PATH,
    mode: process.env.NODE_ENV,
    entry: {
        app: ['../src/index.js']
    },
    output: {
        path:DIST_PATH,
        filename:'js/[name].[hash].js',
        publicPath: '/',
        chunkFilename: '[name]-[id].[chunkhash:5].chunk.js'//5位hash值
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
    ],
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    }
};

// 使用缓存
var CACHE_PATH = ROOT_PATH + '/cache';
// loaders
config.module.rules = [];
// 配置bundle-loader
// config.module.rules.unshift(
//     {
//         test: /\.bundle\.js$/,
//         loader: 'bundle-loader',
//         exclude: /node_modules/,
//         options: {
//             lazy: true,
//             name: '[name]'
//         }
//     }
// )
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

// 编译css
config.module.rules.push(
    { test: /\.css$/, use: [MiniCssExtractPlugin.loader,'style-loader', 'css-loader'] }
)

// 编译sass并自动加入前缀，自动转化rem
config.module.rules.push(
    { test: /\.scss$/,use: [
        {loader: 'style-loader'},
        {loader: MiniCssExtractPlugin.loader}, // 一定要放在style-loader后面
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                modules: false,
                localIdentName: '[local]_[hash:base64:5]'
            }
        },
        {loader: 'postcss-loader',options: {
            sourceMap: true,
            config: {
                path: 'postcssrc.js'  // 这个得在项目根目录创建此文件
            }
        }},
        {loader: 'sass-loader', options: {sourceMap: true}} // 要放在最后
     ]}
)

// 自动引入静态资源到相应的页面
config.plugins.push(
    new HtmlWebpackPlugin(
        {
            filename: 'index.html',
            chunks: ['app','vendor'],
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
    new  webpack.optimize.SplitChunksPlugin('vendor', 'js/vendor.js')
)

// 压缩js , css 生产环境使用
if (__DEV__) {
    // js , css
    config.plugins.push(
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            exclude: /\/node_modules/
        })
    )
}

// 图片压缩以及模块化引入
config.module.rules.push(
    {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
            'file-loader',
            {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    },
                    // optipng.enabled: false will disable optipng
                    optipng: {
                        enabled: false,
                    },
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                    // the webp option will enable WEBP
                    webp: {
                        quality: 75
                    }
                }
            },
            // {
            //     loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            // }
        ],
    }
)

// 抽取css
config.plugins.push(
    new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "[id].css"
    })
)

// 使用ProvidePlugin加载的模块在使用时将不再需要import和require进行引入
config.plugins.push(
    new webpack.ProvidePlugin({
        "React": "react",
    })
)

module.exports = config;

