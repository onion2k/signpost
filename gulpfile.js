var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('copy', function(){
  return gulp.src(['web-src/**/*.html'])
    .pipe(gulp.dest('public'))
});

gulp.task('fonts', function(){
  return gulp.src(['web-src/fonts/**/*'])
    .pipe(gulp.dest('public/fonts'))
});

gulp.task('js', function(){
  return gulp.src(['web-src/js/bin/*.min.js'])
    .pipe(gulp.dest('public/js'))
});

gulp.task('css', function(){
  return gulp.src('web-src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
});

gulp.task('default', [ 'copy', 'fonts', 'css', 'js' ]);
