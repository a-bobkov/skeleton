var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var config = require('./gulp/config.json');

gulp.task('sass', function() {
    gulp.src('./app/scss/*.scss')
        .sourcemaps.init()
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/styles'));
});

gulp.task('copy:vendor', function() {
    gulp.src(config.vendor)
        .pipe(gulp.dest('./build/vendor'));
});

gulp.task('default', function() {
    // place code for your default task here
});