path    = require 'path'
webpack = require 'webpack'

module.exports =
  context: __dirname
  entry:
    app: 'scripts/app'
  output:
    path: path.resolve(__dirname, '../static/react_chat/')
    filename: '[name].js'
  externals:
    'jquery': 'jQuery'
    'backbone': 'Backbone'
    'lodash': '_'
    'react': 'React'
  plugins: [
    # new webpack.optimize.UglifyJsPlugin()
    # new webpack.optimize.OccurenceOrderPlugin()
    # new webpack.optimize.DedupePlugin()
  ]
  module:
    loaders: [
      { js:   /\.js$/,     loader: 'babel-loader?stage=0' }
      { jsx:  /\.jsx$/,    loader: 'babel-loader?stage=0' }
      { test: /\.coffee$/, loader: 'coffee-loader' }
    ]
  resolve:
    root: __dirname
    modulesDirectories: ['node_modules', 'bower_components']
    extensions: ['', '.js', '.jsx', '.coffee']
  devtool: 'source-map'
