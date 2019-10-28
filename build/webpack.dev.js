const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = {
    mode: 'development',
    devtool: 'eval-source-map',
    plugin: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "public/index.html",
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: 'localhost',
        port: '3000',
        historyApiFallback: true,
        overlay: {
            errors: true  // 错误提示覆盖整个页面
        },
        inline: true,
        hot: true
    }
}

module.exports = merge(baseConfig, devConfig)