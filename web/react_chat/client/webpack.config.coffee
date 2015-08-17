path              = require 'path'
webpack           = require 'webpack'
SplitByPathPlugin = require 'webpack-split-by-path'

module.exports =
  context: __dirname
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
    # new webpack.optimize.UglifyJsPlugin()
    # new webpack.optimize.OccurenceOrderPlugin()
    # new webpack.optimize.DedupePlugin()
  ]
  module:
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader?stage=1', exclude: /node_modules/ }
    ]
  resolve:
    root: path.resolve(__dirname, 'src')
    alias:
      app: 'scripts'
    modulesDirectories: ['node_modules']
    extensions: ['', '.js', '.jsx']
  devtool: 'inline-source-map'
