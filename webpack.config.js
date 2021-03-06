const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const index = new ExtractTextPlugin('index.css');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, 'public/build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /index.sass/,
        use: index.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [index],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/build',
  },
};
