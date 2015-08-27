var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var path = require('path');
var SplitByPathPlugin = require('webpack-split-by-path');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer-core');

var DEBUG = process.env.ENVIRONMENT === 'development';
var BUILD_DIR = path.resolve(__dirname, 'build');

gulp.task('scripts', function(cb) {
  webpack({
    context: __dirname,
    resolve: {
      root: path.resolve(__dirname, 'src'),
      extensions: ['', '.js', '.jsx'],
      alias: {
        app: 'scripts'
      }
    },
    externals: {
      primus: 'Primus'
    },
    entry: {
      app: 'app'
    },
    output: {
      path: BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    plugins: [
      new SplitByPathPlugin([
        {
          path: path.resolve(__dirname, 'node_modules/'),
          name: 'vendor'
        }
      ]),
      new webpack.DefinePlugin({
        DEBUG: JSON.stringify(DEBUG),
        'process.env.NODE_ENV': JSON.stringify(process.env.ENVIRONMENT)
      }),
      !DEBUG && new webpack.optimize.DedupePlugin(),
      !DEBUG && new webpack.optimize.OccurenceOrderPlugin(),
      !DEBUG && new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ].filter(Boolean),
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel?stage=1',
          exclude: /node_modules/
        }
      ]
    },
    devtool: DEBUG && 'inline-source-map'
  }, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      // output options
    }));
    cb();
  });
});

gulp.task('styles', function () {
  return gulp.src('./src/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('default', ['scripts', 'styles']);
