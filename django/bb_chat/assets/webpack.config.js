var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
    app: './scripts/app',
  },
  output: {
    path: path.resolve('../static/bb_chat/'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
  ],
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
    ],
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.coffee', '.js']
  },
};
