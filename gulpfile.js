const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const minifyJS = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const runSequence = require('run-sequence');
var gcmq = require('gulp-group-css-media-queries');
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('bootstrap', () => {
    return gulp.src('src/scss/bootstrap/bootstrap.scss')
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(gcmq())
        .pipe(cleanCSS({
            debug: true,
            format: 'beautify',
            compatibility: 'ie8',
            level: {
                1: {
                    specialComments: 'all',
                },
            },
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(concat('bootstrap.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});
gulp.task('css', () => {
    return gulp.src('src/scss/theme/**/*.scss')
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(gcmq())
        .pipe(cleanCSS({
            debug: true,
            format: 'beautify',
            compatibility: 'ie8',
            level: {
                1: {
                    specialComments: 'all',
                },
            },
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src('src/js/theme/**/*.js')
        //.pipe(concat('app.min.js'))
        //.pipe(minifyJS())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('html', () => {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('watch', () => {
    gulp.watch("src/scss/**/*.scss", ['css']);
    gulp.watch("src/js/theme/**/*.js", ['js']);
    gulp.watch("src/**/*.html", ['html']);
});

gulp.task('default', () => {
    runSequence(
        'html',
        'bootstrap',
        'css',
        'js',
        'browser-sync',
        'watch'
    );
});
