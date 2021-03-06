import gulp from 'gulp';
import gulpIf from 'gulp-if';
import minifyCss from 'gulp-minify-css';
import minifyHtml from 'gulp-minify-html';
import path from 'path';
import webpack from 'webpack';
import SplitByPathPlugin from 'webpack-split-by-path';
import webpackStream from 'webpack-stream';
import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer-core';
import del from 'del';

const COMPOSE_FILE = process.env.COMPOSE_FILE || '';
const ENVIRONMENT = process.env.ENVIRONMENT
  || (COMPOSE_FILE.match(/production/) ? 'production' : 'development');
const DEBUG = ENVIRONMENT !== 'production';

const paths = {
  styles: 'src/*.css',
  html: 'src/index.html',
  fonts: 'vendor/font-awesome/fonts/*',
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build'),
  buildFonts: path.resolve(__dirname, 'build', 'fonts'),
  node_modules: path.resolve(__dirname, 'node_modules'),
};

const webpackConfig = {
  resolve: {
    root: paths.src,
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
    path: paths.build,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new SplitByPathPlugin([
      {
        path: paths.node_modules,
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
        include: paths.src,
      },
    ],
  },
  devtool: DEBUG && 'inline-source-map',
};

function defineWebpackTask(name, options) {
  gulp.task(name, () => {
    return gulp.src([])
      .pipe(webpackStream({
        ...webpackConfig,
        colors: true,
        ...options,
      }))
      .pipe(gulp.dest(paths.build));
  });
}

defineWebpackTask('build:scripts', { watch: false });
defineWebpackTask('watch:scripts', { watch: true });

gulp.task('build:styles', () => {
  return gulp.src(paths.styles)
    .pipe(gulpIf(DEBUG, sourcemaps.init()))
    .pipe(postcss([
      postcssImport(),
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ]))
    .pipe(gulpIf(!DEBUG, minifyCss()))
    .pipe(gulpIf(DEBUG, sourcemaps.write()))
    .pipe(gulp.dest(paths.build));
});

gulp.task('build:html', () => {
  return gulp.src(paths.html)
    .pipe(gulpIf(!DEBUG, minifyHtml()))
    .pipe(gulp.dest(paths.build));
});

gulp.task('build:fonts', () => {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.buildFonts));
});

function defineWatchTask(what) {
  gulp.task(`watch:${what}`, [`build:${what}`], () => {
    gulp.watch(paths[what], [`build:${what}`]);
  });
}

defineWatchTask('styles');
defineWatchTask('html');

gulp.task('build', ['build:scripts', 'build:styles', 'build:html', 'build:fonts']);
gulp.task('watch', ['watch:scripts', 'watch:styles', 'watch:html', 'build:fonts']);
gulp.task('default', ['build']);
