const JS_SRC    = './resources/js/src/';
const JS_DIST   = './resources/js/dist/';
const SCSS_SRC  = './resources/scss/';
const SCSS_DIST = './resources/css/';
const OUTPUT_PREFIX = 'plugin-callisto';

// import gulp
var gulp = require('gulp');
var gutil = require('gulp-util')
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var del = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('browserify');
var glob = require('glob');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var addSrc = require('gulp-add-src');
var ignore = require('gulp-ignore');
var minifyCSS = require('gulp-minify-css');

// import sass tools
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('watch:js', ['build:vendor'], function() {
    return gulp
        .watch( JS_SRC + '**/*.js', ['build:app']);
});

gulp.task('watch:sass', function() {
    return gulp
        .watch( SCSS_SRC + '**/*.scss', ['build:sass']);
});

gulp.task('build', ['build:bundle', 'build:sass-min']);

gulp.task('build:bundle', ['build:app', 'build:vendor'], function() {
    return gulp.src( [
            JS_DIST + OUTPUT_PREFIX + '-vendor.js',
            JS_SRC + 'app.config.js',
            JS_DIST + OUTPUT_PREFIX + '-app.js'
            ] )
        .pipe( sourcemaps.init({ loadMaps: true }) )
        .pipe( concat( OUTPUT_PREFIX + '.js' ) )
        .pipe( gulp.dest( JS_DIST ) )
        .pipe( rename( OUTPUT_PREFIX + '.min.js') )
        .pipe( uglify().on('error', gutil.log) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest( JS_DIST ) );
});

gulp.task('build:app', function() {

    var builder = browserify({
        entries: glob.sync("app/!(services)/**/*.js", {cwd: JS_SRC}),
        debug: true,
        basedir: JS_SRC,
        paths: [ 'app/' ]
    });

    return builder.bundle()
        .pipe( source( OUTPUT_PREFIX + '-app.js' ) )
        .pipe( buffer() )
        .pipe( sourcemaps.init({ loadMaps: true }) )
        .pipe( addSrc.append(JS_SRC + 'app/main.js') )
        .pipe( concat( OUTPUT_PREFIX + '-app.js') )
        .pipe( sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}) )
        .pipe( gulp.dest( JS_DIST ) );
})

gulp.task('build:vendor', function() {
    var libraries = require(JS_SRC + 'vendor.json');
    return gulp.src( libraries )
        .pipe( sourcemaps.init() )
        .pipe( concat( OUTPUT_PREFIX + '-vendor.js' ) )
        .pipe( sourcemaps.write('.', {sourceRoot: '../src/libraries'}) )
        .pipe( gulp.dest( JS_DIST ) );
});

gulp.task('build:sass-min', ['build:sass'], function() {
    return buildSass( OUTPUT_PREFIX+'.min.css', 'compressed' );
});

gulp.task('build:sass', function() {
    return buildSass( OUTPUT_PREFIX+'.css', 'expanded' );
});

function buildSass( outputFile, outputStyle )
{
    var config = {
        scssOptions : {
            errLogToConsole : true,
            outputStyle     : outputStyle
        },
        prefixOptions: {
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }
    };

    return gulp
        .src( SCSS_SRC + 'PluginCallisto.scss' )
        .pipe( sourcemaps.init() )
        .pipe( sass( config.scssOptions ).on( 'error', sass.logError ) )
        .pipe( rename( outputFile ) )
        .pipe( autoprefixer( config.prefixOptions ) )
        .pipe( minifyCSS() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( SCSS_DIST ) );
}
