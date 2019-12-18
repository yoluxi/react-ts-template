const path = require("path");
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const argv = require('yargs-parser')(process.argv.slice(1))
const APP_ENV = argv.env || 'dev'
const envConfig = require('./env.json')
const oriEnv = envConfig[APP_ENV]

module.exports = {
  entry: {
    'app': path.join(__dirname, "../src/index.tsx")
  },
  output: {
    filename: "js/[name].[hash].js",
    path: path.join(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: path.join(__dirname, '../src'),
        use: [
            {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true
                }
            }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, '../src'),
        use: [{
            loader: APP_ENV !== 'dev' ? MiniCssExtractPlugin.loader : "style-loader"
        }, {
            loader: "css-loader"
        }, 
        {
            loader: 'postcss-loader'
        },
        {
            loader: "sass-loader",
            options: {
                sassOptions: {
                    includePaths: [path.join(__dirname, '../src/styles')]
                }
            }
        }]
      },
      {
        test: /\.less$/,
        include: path.join(__dirname, '../node_modules'),
        use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader'
            },
            {
                loader: 'postcss-loader'
            },
            {
                loader: 'less-loader',
                options: {
                    javascriptEnabled: true,
                    modifyVars: {
                        'primary-color': '#1DA57A'
                    }
                }
            }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: path.join('img/[name].[hash:7].[ext]')
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
        '@': path.resolve('./src'),
    }    
  },
  plugins: [
    new webpack.DefinePlugin(oriEnv),
  ]
};
