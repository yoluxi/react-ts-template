const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const prodConfig = {
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
      inject: true,
      minify: {
        removeComments: true, // 去掉注释
        collapseWhitespace: true, // 去掉多余空白
        removeAttributeQuotes: true // 去掉一些属性的引号，例如id="moo" => id=moo
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
        //`runtime` must same as runtimeChunk name. default is `runtime`
        inline: /runtime\..*\.js$/
    }),
    new MiniCssExtractPlugin({ // 拆分css 
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
      ignoreOrder: false
    }),
    new CleanWebpackPlugin(), // 清除文件
  ],
  optimization: { // 性能配置
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
  }
};

module.exports = merge(baseConfig, prodConfig);
