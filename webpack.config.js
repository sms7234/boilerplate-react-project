const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('mini-css-extract-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'});
} else if (process.env.NODE_ENV === 'development'){
  require('dotenv').config({path: '.env.development'});
}

module.exports = (env) => {
  const isProduction = env ==='production';

  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'public/scripts'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: [
          {
            loader: ExtractTextPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'styles.css',
        path: path.resolve(__dirname, 'public/scripts')
      })
    ],
    devtool: isProduction ? 'source-map':'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      publicPath: '/scripts',
      historyApiFallback: true,
      watchOptions: {
        poll: true
      }
    }
  };
};
