const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const minifyJS = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const runSequence = require('gulp4-run-sequence');
var gcmq = require('gulp-group-css-media-queries');
const purgecss = require('gulp-purgecss')

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('css', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(gcmq())
        .pipe(cleanCSS({
            debug: true,
            format: 'keep-breaks',
            //format: 'beautify',
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
        .pipe(purgecss({
            content: ['src/**/*.html']
        }))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src('src/js/theme/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('watch', () => {
    gulp.watch("src/scss/**/*.scss", gulp.series('css'));
    gulp.watch("src/js/**/*.js", gulp.series('js'));
    gulp.watch("src/**/*.html", gulp.series('html'));
});

gulp.task('default', gulp.parallel(
    'html',
    'css',
    'js',
    'browser-sync',
    'watch'
));
