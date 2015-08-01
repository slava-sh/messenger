path    = require 'path'
webpack = require 'webpack'

module.exports =
  context: __dirname
  entry:
    app: 'app/bootstrap'
    vendor: ['react', 'alt']
  output:
    path: path.resolve(__dirname, '../static/react_chat/')
    filename: '[name].js'
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    # new webpack.optimize.UglifyJsPlugin()
    # new webpack.optimize.OccurenceOrderPlugin()
    # new webpack.optimize.DedupePlugin()
  ]
  module:
    loaders: [
      { test: /\.jsx?$/,   loader: 'babel-loader?stage=0' }
      { test: /\.coffee$/, loader: 'coffee-loader' }
    ]
  resolve:
    root: __dirname
    alias:
      app: 'scripts'
    modulesDirectories: ['node_modules']
    extensions: ['', '.js', '.jsx', '.coffee']
  devtool: 'inline-source-map'
