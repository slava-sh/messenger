import gulp from 'gulp';
import path from 'path';
import webpack from 'webpack';
import SplitByPathPlugin from 'webpack-split-by-path';
import webpackStream from 'webpack-stream';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer-core';
import del from 'del';

const DEBUG = process.env.ENVIRONMENT === 'development';

const paths = {
  styles: 'src/*.css',
  build: path.resolve(__dirname, 'build'),
};

const webpackConfig = {
  context: __dirname,
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js', '.jsx'],
    alias: {
      app: 'scripts',
    },
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
      },
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
      },
    }),
  ].filter(Boolean),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel?stage=1',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: DEBUG && 'inline-source-map',
};

gulp.task('clean', cb => {
  del(paths.build, cb);
});

function scriptsTask(watch) {
  return () => gulp.src([])
    .pipe(webpackStream({
      ...webpackConfig,
      colors: true,
      watch: watch,
    }))
    .pipe(gulp.dest(paths.build));
}

gulp.task('build:scripts', scriptsTask(false));
gulp.task('watch:scripts', scriptsTask(true));

gulp.task('build:styles', () => {
  return gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build));
});

gulp.task('watch:styles', () => {
  gulp.watch(paths.styles, ['build:styles']);
});

gulp.task('build', ['build:scripts', 'build:styles']);
gulp.task('watch', ['watch:scripts', 'watch:styles']);
gulp.task('default', ['clean', 'build']);
