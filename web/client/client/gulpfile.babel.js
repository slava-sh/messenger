import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import webpack from 'webpack';
import SplitByPathPlugin from 'webpack-split-by-path';
import webpackStream from 'webpack-stream';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer-core';
import del from 'del';

const DEBUG = process.env.ENVIRONMENT === 'development';
const BUILD_DIR = path.resolve(__dirname, 'build');

const webpackConfig = {
  context: __dirname,
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js', '.jsx'],
    alias: {
      app: 'scripts',
    }
  },
  externals: {
    primus: 'Primus',
  },
  entry: {
    app: 'app',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new SplitByPathPlugin([
      {
        path: path.resolve(__dirname, 'node_modules/'),
        name: 'vendor',
      }
    ]),
    new webpack.DefinePlugin({
      DEBUG: JSON.stringify(DEBUG),
      'process.env.NODE_ENV': JSON.stringify(process.env.ENVIRONMENT),
    }),
    !DEBUG && new webpack.optimize.DedupePlugin(),
    !DEBUG && new webpack.optimize.OccurenceOrderPlugin(),
    !DEBUG && new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      }
    })
  ].filter(Boolean),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?stage=1',
        exclude: /node_modules/,
      }
    ]
  },
  devtool: DEBUG && 'inline-source-map',
};

gulp.task('clean', cb => {
  del(BUILD_DIR, cb);
});

gulp.task('scripts', () => {
  return gulp.src('src/scripts/index.jsx')
    .pipe(webpackStream({
      ...webpackConfig,
      colors: true,
      watch: true,
    }))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('styles', () => {
  return gulp.src('src/*.css')
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
