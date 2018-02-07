require("babel-polyfill");

const JS_SRC = "./resources/js/src/";
const JS_DIST = "./resources/js/dist/";
const SCSS_SRC = "./resources/scss/";
const SCSS_DIST = "./resources/css/";
const OUTPUT_PREFIX = "ceres";

// import gulp
var gulp = require("gulp");
var gutil = require("gulp-util");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var browserify = require("browserify");
var babelify = require("babelify");
var glob = require("glob");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var minifyCSS = require("gulp-minify-css");
var eslint = require("gulp-eslint");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("default", ["build"]);

gulp.task("build", [
    "build:bundle",
    "build:sass-min"
]);

// Bundle everything
gulp.task("build:bundle", [
    "build:productive-app",
    "build:vendor",
    "build:productive-vendor",
], function()
{
    return gulp.src([
        JS_DIST + OUTPUT_PREFIX + "-vendor.productive.js",
        JS_SRC + "app.config.js",
        JS_DIST + OUTPUT_PREFIX + "-app.js"
    ])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat(OUTPUT_PREFIX + ".js"))
        .pipe(gulp.dest(JS_DIST))
        .pipe(rename(OUTPUT_PREFIX + ".min.js"))
        .pipe(uglify().on("error", gutil.log))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(JS_DIST));
});

// Build app
gulp.task("build:app", function()
{
    var builder = browserify({
        entries  : ["app/main.js"].concat( glob.sync("app/!(services)/**/*.js", {cwd: JS_SRC}) ),
        debug    : true,
        basedir  : JS_SRC,
        paths    : ["app/"],
        transform: babelify
    });

    return builder.bundle()
        .on("error", function(err)
        {
            console.log(err.toString());
            this.emit("end");
        })
        .pipe(source(OUTPUT_PREFIX + "-app.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(addSrc.append(JS_SRC + "app/main.js"))
        .pipe(concat(OUTPUT_PREFIX + "-app.js"))
        .pipe(sourcemaps.write(".", {
            includeContent: false,
            sourceRoot    : "../src"
        }))
        .pipe(gulp.dest(JS_DIST));
});

// Build app for productive ( with eslint)
gulp.task("build:productive-app", ["build:lint"], function()
{
    var builder = browserify({
        entries  : ["app/main.js"].concat( glob.sync("app/!(services)/**/*.js", {cwd: JS_SRC}) ),
        debug    : true,
        basedir  : JS_SRC,
        paths    : ["app/"],
        transform: babelify
    });

    return builder.bundle()
        .pipe(source(OUTPUT_PREFIX + "-app.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(addSrc.append(JS_SRC + "app/main.js"))
        .pipe(concat(OUTPUT_PREFIX + "-app.js"))
        .pipe(sourcemaps.write(".", {
            includeContent: false,
            sourceRoot    : "../src"
        }))
        .pipe(gulp.dest(JS_DIST));
});

// Build Vendor
gulp.task("build:productive-vendor", function()
{
    var libraries = require(JS_SRC + "vendor.productive.json");

    return gulp.src(libraries)
        .pipe(sourcemaps.init())
        .pipe(concat(OUTPUT_PREFIX + "-vendor.productive.js"))
        .pipe(sourcemaps.write(".", {sourceRoot: "../src/libraries"}))
        .pipe(gulp.dest(JS_DIST));
});

gulp.task("build:vendor", function()
{
    var libraries = require(JS_SRC + "vendor.json");

    return gulp.src(libraries)
        .pipe(sourcemaps.init())
        .pipe(concat(OUTPUT_PREFIX + "-vendor.js"))
        .pipe(sourcemaps.write(".", {sourceRoot: "../src/libraries"}))
        .pipe(gulp.dest(JS_DIST));
});

// ESLint
gulp.task("build:lint", function()
{
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src([
        "resources/js/src/**/*.js",
        "!node_modules/**"
    ])
        .pipe(eslint({
            configFile: "./.eslintrc.json",
            fix       : true
        }))
        .pipe(gulp.dest("resources/js/src/"))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format("table"))
        .pipe(eslint.failAfterError());
});

// SASS
gulp.task("build:sass-min", ["build:sass"], function()
{
    return buildSass(OUTPUT_PREFIX + ".min.css", "compressed");
});

gulp.task("build:sass", function()
{
    return buildSass(OUTPUT_PREFIX + ".css", "expanded");
});

function buildSass(outputFile, outputStyle)
{
    var config = {
        scssOptions  : {
            errLogToConsole: true,
            outputStyle    : outputStyle
        },
        prefixOptions: {
            browsers: [
                "last 2 versions",
                "> 5%",
                "Firefox ESR"
            ]
        }
    };

    return gulp
        .src(SCSS_SRC + "Ceres.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(config.scssOptions).on("error", sass.logError))
        .pipe(rename(outputFile))
        .pipe(autoprefixer(config.prefixOptions))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(SCSS_DIST));
}

// Watchers
gulp.task("watch:js", ["build:vendor"], function()
{
    return gulp.watch(JS_SRC + "**/*.js", ["build:app"]);
});

gulp.task("watch:sass", function()
{
    return gulp.watch(SCSS_SRC + "**/*.scss", ["build:sass"]);
});
