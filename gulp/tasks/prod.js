var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var runSequence = require('run-sequence');

var config = require('../config.json');

gulp.task('css:compress', function() {
    return gulp.src(config.build.sass + '/**/*.css')
        .pipe(csso())
        .pipe(gulp.dest(config.build.sass))
});

gulp.task('js:compress', function() {
    return gulp.src('build/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

gulp.task('prod', ['dev'], function(cb) {
    runSequence('css:compress', ['js:compress'], cb);
});