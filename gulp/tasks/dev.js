var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var requirejs = require('gulp-requirejs');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var runSequence = require('run-sequence');


var config = require('../config.json');


gulp.task('clean', function() {
    return gulp.src(['build/*'])
        .pipe(vinylPaths(del));
});


gulp.task('sass', function() {
    return gulp.src(config.initial.sass)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build.sass));
});


gulp.task('copy:vendor', function() {
    return gulp.src(config.initial.vendor,  { base: './vendor' })
        .pipe(gulp.dest(config.build.vendor));
});


gulp.task('requirejs', function() {
    requirejs({
        baseUrl: './app',
        include: 'main',
        mainConfigFile: './app/main.js',
        findNestedDependencies: true,
        out: 'main.js',
        exclude: ['angular']
    })
        .pipe(gulp.dest(config.build.app))
});


gulp.task('dev', ['clean'], function(cb) {
    runSequence('sass', ['copy:vendor', 'requirejs'], cb);
});


gulp.task('watch', function() {
    gulp.watch(config.initial.sass, ['sass']);
    gulp.watch([config.initial.app + '/**/*.js', config.initial.modules + '/**/*.js'], ['requirejs']);
});

gulp.task('default', ['watch', 'dev']);