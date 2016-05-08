var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');

var config = {
  devBaseUrl: 'http://localhost',
  port: 9010,
  paths: {
    html: './index.html',
    js: './src/*.js',
    bundle: 'bundle.js'
  }
};

gulp.task('connect', function() {
  connect.server({
    root: ['.'],
    port: config.port,
    base: config.devBaseUrl,
    fallback: 'index.html',
    livereload: true
  });
});

gulp.task('open', ['connect'], function() {
  return gulp.src('')
    .pipe(open({          
      uri: config.devBaseUrl + ':' + config.port + '/'
    }));
});

gulp.task('lint', function() {
  return gulp.src(config.paths.js)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('js', ['lint'], function() {
  return gulp.src(config.paths.js)
    .pipe(concat(config.paths.bundle))
    .pipe(gulp.dest('.'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src(config.paths.html)
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js']);
});

gulp.task('default', [ 'open', 'js', 'watch' ]);