const development = process.env.NODE_ENV !== 'production'
const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const webpackNotifierPlugin = new WebpackNotifierPlugin({
    alwaysNotify: true
})
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html"  
})
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractTextPlugin = new ExtractTextPlugin({ 
    filename: 'styles.bundle.css'
})

const STYLES_DIR = path.resolve('src', 'assets', 'styles')

module.exports = {
    devtool: 'eval',
    entry: [ 
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index.tsx' 
    ],
    output: {
        filename: 'bundle.js',
        publicPath: './dist',
        path: path.resolve('dist')
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loaders: [
                "ts-loader",
                "babel-loader"
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, 
        {
            test: /\.sass$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]',
                        camelCase: true,
                        importLoaders: 1
                      }
                }, 
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: [
                          require('autoprefixer')()
                        ]
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [
                            path.join(STYLES_DIR, "_variables.sass"),
                            path.join(STYLES_DIR, "_mixins.sass")
                        ]
                    }
                }]
            })
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        webpackNotifierPlugin,
        htmlPlugin,
        extractTextPlugin
    ]
}