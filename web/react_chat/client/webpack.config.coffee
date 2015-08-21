path              = require 'path'
webpack           = require 'webpack'
SplitByPathPlugin = require 'webpack-split-by-path'

DEBUG = process.env.ENVIRONMENT is 'development'

module.exports =
  context: __dirname
  resolve:
    root: path.resolve(__dirname, 'src')
    extensions: ['', '.js', '.jsx']
    alias:
      app: 'scripts'
  entry:
    app: 'app'
  output:
    path: path.resolve(__dirname, 'build')
    filename: '[name].js'
    chunkFilename: '[name].js'
  plugins: [
    new SplitByPathPlugin [
      { path: path.resolve(__dirname, 'node_modules/'), name: 'vendor' }
    ]
    new webpack.DefinePlugin
      DEBUG: JSON.stringify(DEBUG)
      'process.env.NODE_ENV': JSON.stringify(process.env.ENVIRONMENT)
    not DEBUG and new webpack.optimize.DedupePlugin()
    not DEBUG and new webpack.optimize.OccurenceOrderPlugin()
    not DEBUG and new webpack.optimize.UglifyJsPlugin
      compress:
        warnings: false
  ].filter(Boolean)
  module:
    loaders: [
      { test: /\.jsx?$/, loader: 'babel?stage=1', exclude: /node_modules/ }
    ]
  devtool: DEBUG and 'inline-source-map'
