var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
    app: 'scripts/app',
  },
  output: {
    path: path.resolve(__dirname, '../static/bb_chat/'),
    filename: '[name].js',
  },
  externals: {
    'jquery': 'jQuery',
    'backbone': 'Backbone',
    'lodash': '_',
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
  ],
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
    ],
  },
  resolve: {
    modulesDirectories: [__dirname, 'node_modules', 'bower_components'],
    extensions: ['.coffee', '.js']
  },
  devtool: 'source-map',
};
