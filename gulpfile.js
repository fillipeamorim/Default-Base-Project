'use strict';

// Gulp File
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    less         = require('gulp-less'),
    imagemin     = require('gulp-imagemin'),
    cache        = require('gulp-cache'),
    uglify       = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    inlinesource = require('gulp-inline-source'),
    watch        = require('gulp-watch'),
    notify       = require('gulp-notify'),
    //others
    browserSync  = require('browser-sync'),
    runSequence  = require('run-sequence');

// Task to compile SCSS
gulp.task('sass', function () {
  return gulp.src('./src/scss/style.scss')
    .pipe(sass().on("error", notify.onError(function(error) { return "Failed to Compile SCSS: " + error.message; })))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(notify("SCSS Compiled"));
});

// Task to compile LESS
gulp.task('less', function () {
  return gulp.src('./src/less/style.less')
    .pipe(less().on('error', function() { this.emit('end'); })).on("error", notify.onError(function(error) { return "Failed to Compile LESS: " + error.message; }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(notify("LESS Compiled"));
});

// Task to move compiled CSS to `dist` folder
gulp.task('movecss', function () {
  return gulp.src('./src/style.css')
    .pipe(gulp.dest('./dist/'));
});

// Task to Minify JS
gulp.task('jsmin', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

// Minify Images
gulp.task('imagemin', function (){
  return gulp.src('./src/img/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({ interlaced: true })))
  .pipe(gulp.dest('./dist/img'));
});

// BrowserSync Task (Live reload)
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './src/'
    }
  })
});

// Gulp Inline Source Task
// Embed scripts, CSS or images inline (make sure to add an inline attribute to the linked files)
// Eg: <script src="default.js" inline></script>
// Will compile all inline within the html file (less http requests - woot!)
gulp.task('inlinesource', function () {
  return gulp.src('./src/**/*.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('./dist/'));
});

// Gulp Watch Task
gulp.task('watch', ['browserSync'], function () {
   //gulp.watch('./src/scss/**/*', ['sass']);
   gulp.watch('./src/less/**/*', ['less']);
   gulp.watch('./src/**/*.html').on('change', browserSync.reload);
});

// Gulp Default Task
gulp.task('default', ['watch']);

// Gulp Build Task
gulp.task('build', function() {
  runSequence('movecss', 'imagemin', 'jsmin', 'inlinesource');
});