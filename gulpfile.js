var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('build', function () {
  var bundler = browserify({
    entries: 'index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));

  // watchify(bundler).on("update", function() {
  //   gulp.task('default', ['build']);
  // });
});
 
gulp.task('default', ['build']);
