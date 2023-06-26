const gulp = require('gulp')
const postcss = require('gulp-postcss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const path = require('path')
const sass = require('gulp-sass')(require('sass'))
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()
const concat = require('gulp-concat')
const terser = require('gulp-terser')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')

// Definitions
const src = './src/';
const build = '../wp-content/themes/aiims/';

let sources = {
    theme: `${src}theme-files/**/*`,
    images: `${src}assets/images/**/*`,
    styles: `${src}assets/styles/**/*.scss`,
    scripts: `${src}assets/scripts/**/*.js`,
    fonts: `${src}assets/fonts/**/*`,
    data_files: `${src}assets/files/**/*`,
    vendor_scripts: [].concat.apply([], [
        // './node_modules/lazyload/lazyload.min.js',
        // './node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/slick-carousel/slick/slick.min.js',
    ]),
}

let destinations = {
    images: `${build}images/`,
    styles: `${build}styles/`,
    scripts: `${build}scripts/`,
    fonts: `${build}/styles/fonts/`,
    data_files: `${build}files/`,
}

function theme() {
    return gulp.src(sources.theme)
        .pipe(gulp.dest(build))
}

function images() {
    return gulp.src(sources.images)
        .pipe(imagemin())
        .pipe(gulp.dest(destinations.images));
}

function styles() {
    const processors = [
        tailwindcss,
        autoprefixer,
        cssnano
    ];

    return gulp.src(sources.styles)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', function (err) {
            console.error(err.message);
            browserSync.notify('<pre style="text-align: left">' + err.message + '</pre>', 10000);
            this.emit('end');
        }))
        .pipe(postcss(processors))
        .pipe(gulp.dest(destinations.styles))
}

function fonts() {
    return gulp.src(sources.fonts)
        .pipe(gulp.dest(destinations.fonts))
}

function data_files() {
    return gulp.src(sources.data_files)
        .pipe(gulp.dest(destinations.data_files))
}

function vendor_scripts() {
    return gulp.src(sources.vendor_scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.min.js'))
        .pipe(sourcemaps.write())
        .pipe(terser())
        .pipe(gulp.dest(destinations.scripts))
}

function custom_scripts() {
    return gulp.src(sources.scripts)
        .pipe(concat('scripts.min.js'))
        .pipe(terser())
        .pipe(gulp.dest(destinations.scripts))
}

function clean() {
    return del(build + '**/*', {
        force: true
    })
}

function watch() {
    browserSync.init({
        proxy: encodeURI(`localhost/${path.resolve(__dirname, '../').split(path.sep).pop()}/`),
        injectChanges: true,
    });

    gulp.watch(sources.images, images).on('change', browserSync.reload);
    gulp.watch(sources.theme, theme).on('change', browserSync.reload);
    gulp.watch(sources.scripts, custom_scripts).on('change', browserSync.reload);
    gulp.watch(sources.scripts, vendor_scripts).on('change', browserSync.reload);
    gulp.watch(sources.data_files, data_files).on('change', browserSync.reload);
    gulp.watch(sources.styles, styles);
}

exports.watch = gulp.series(
    clean,
    gulp.parallel(
        theme,
        images,
        fonts,
        data_files,
        custom_scripts,
        vendor_scripts,
        styles
    ),
    watch
)