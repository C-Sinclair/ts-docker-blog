const path = require('path')
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
    module: {
        rules: [{
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
                        camelCase: true
                        // sourceMap: isDevelopment
                      }
                }, {
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
        htmlPlugin,
        extractTextPlugin
    ]
}