const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: path.join(__dirname, '../src'),
        use: [
            {
                loader: 'babel-loader'
            }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, '../src'),
        use: [{
            loader: "style-loader"
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
        '@': path.resolve('../src'),
        '@img': path.resolve('../src/images')
    }    
  },
  devServer: {
    host: "localhost",
    port: 3000,
    historyApiFallback: true, // ??
    overlay: {
      errors: true
    },
    inline: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
      inject: true
    })
  ]
};
