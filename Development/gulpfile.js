/**
* Dependencies
* -----------------------------------------------------------------------------
*/

/**
* If 'npm install' not working!
* npm install babel-core babel-preset-env del gulp gulp-autoprefixer gulp-babel gulp-cssmin gulp-if gulp-imagemin gulp-include gulp-plumber gulp-prettify gulp-pug gulp-rename gulp-sass gulp-uglify gulp-util live-server run-sequence --save-dev
* -----------------------------------------------------------------------------
*/

/* ========================= Gulp ========================= */
const   gulp            = require('gulp'),

/* ========================= Pug ========================= */
        pug             = require('gulp-pug'),
        prettify        = require('gulp-prettify'),

/* ========================= Sass ========================= */
        sass            = require('gulp-sass'),
        autoprefixer    = require('gulp-autoprefixer'),
        cssmin          = require('gulp-cssmin'),

/* ========================= Babel ========================= */
        babel           = require('gulp-babel'),
        uglify          = require('gulp-uglify'),

/* ========================= Image ========================= */
        imagemin        = require('gulp-imagemin'),

/* ========================= File Name & Includes ========================= */
        rename          = require('gulp-rename'),
        include         = require('gulp-include'),

/* ========================= Eror Reporting ========================= */
        gutil           = require('gulp-util'),
        plumber         = require('gulp-plumber'),

/* ========================= Compaile & Server ========================= */
        del             = require('del'),
        gulpif          = require('gulp-if'),
        sequence        = require('run-sequence'),
        liveServer      = require("live-server"),

/**
* Output Css & Js File Name and Set Paths
* -----------------------------------------------------------------------------
*/

        demo = true, //Minified file include
        ThemeName = 'theme',
        path = {
            base: '../',
            developmentDir: 'resources',
            productionDir: ThemeName.charAt(0).toUpperCase() + ThemeName.slice(1) + ' HTML'
        };

/**
* Catch stream errors
* -----------------------------------------------------------------------------
*/

function errorReporting() {
    //Catch errors
    return plumber(function onError(error) {
            gutil.log(gutil.colors.bgRed("Error (" + error.plugin + "):" + error.message));
            this.emit('end');
        }
    );
}

/**
 * Delete the productionDir directory
 * -----------------------------------------------------------------------------
 */

gulp.task('clean', function () {
    return del(path.base + path.productionDir,
        {
            force: true
        }
    );
});

/**
 * Build views with Pug
 * -----------------------------------------------------------------------------
 */

gulp.task('pug', function () {
    //Select files
    return gulp.src(path.developmentDir + '/pug/*.pug')
    //Error Reporting
    .pipe(errorReporting())
    //Compile Pug
    .pipe(pug(
        {
            pretty: !demo,
            data: {
                demo: demo
            }
        }
    ))
    //HTML Beautify
    .pipe(gulpif(!demo,
        prettify(
            {
                indent_size: 4,
                unformatted: ['pre', 'code'],
                preserve_newlines: true
            }
        )
    ))
    //Save files
    .pipe(gulp.dest(path.base + path.productionDir));
});

/**
 * Build styles with SASS
 * -----------------------------------------------------------------------------
 */

gulp.task('sass', function () {
    //Select files
    return gulp.src(path.developmentDir + '/sass/*.scss')
    //Error Reporting
    .pipe(errorReporting())
    //Compile Sass
    .pipe(sass(
        {
            outputStyle: 'expanded'
        }
    ))
    //Add vendor prefixes
    .pipe(autoprefixer(
        {
            browsers: ['last 4 version'],
            cascade: false
        }
    ))
    //Save unminified file
    .pipe(gulpif(!demo, gulp.dest(path.base + path.productionDir + '/assets/css')))
    //Optimize and minify
    .pipe(cssmin())
    //Append suffix
    .pipe(rename(
        {
            suffix: '.min'
        }
    ))
    //Save minified file
    .pipe(gulp.dest(path.base + path.productionDir + '/assets/css'));
});

/**
 * Build theme color options with SASS
 * -----------------------------------------------------------------------------
 */

gulp.task('themes', function () {
    //Select files
    return gulp.src(path.developmentDir + '/sass/themes/*.scss')
    //Error Reporting
    .pipe(errorReporting())
    //Compile Sass
    .pipe(sass(
        {
            outputStyle: 'expanded'
        }
    ))
    //Add vendor prefixes
    .pipe(autoprefixer(
        {
            browsers: ['last 4 version'],
            cascade: false
        }
    ))
    //Save unminified file
    .pipe(gulpif(!demo, gulp.dest(path.base + path.productionDir + '/assets/css/colors')))
    //Optimize and minify
    .pipe(cssmin())
    //Append suffix
    .pipe(rename(
        {
            suffix: '.min'
        }
    ))
    //Save minified file
    .pipe(gulp.dest(path.base + path.productionDir + '/assets/css/colors'));
});

/**
 * Build scripts with ES6/Babel
 * -----------------------------------------------------------------------------
 */

gulp.task('js', function () {
    //Select files
    return gulp.src(path.developmentDir + '/babel/*.js')
    //Error Reporting
    .pipe(errorReporting())
    //Concatenate includes
    .pipe(include())
    //Transpile
    .pipe(babel(
        {
            presets: [['env', {loose: true, modules: false}]] //'use-strict' deleted
        }
    ))
    //Save unminified file
    .pipe(gulpif(!demo, gulp.dest(path.base + path.productionDir + '/assets/js')))
    //Optimize and minify
    .pipe(uglify())
    //Append suffix
    .pipe(rename(
        {
            suffix: '.min'
        }
    ))
    //Save minified file
    .pipe(gulp.dest(path.base + path.productionDir + '/assets/js'));
});

/**
 * Copy image files
 * -----------------------------------------------------------------------------
 */

gulp.task('images', function () {
    //Select files
    return gulp.src(demo ? path.developmentDir + '/images/sample/**/*' : path.developmentDir + '/images/prod/**/*')
    //Error Reporting
    .pipe(errorReporting())
    //ImageMin
    .pipe(imagemin())
    //Save files
    .pipe(gulp.dest(demo ? path.base + path.productionDir + '/assets/img/sample' : path.base + path.productionDir + '/assets/img'))
});

/**
 * Copy vendors files
 * -----------------------------------------------------------------------------
 */

gulp.task('vendors', function () {
    //Select files
    return gulp.src(path.developmentDir + '/vendors/**/*')
    //Error Reporting
    .pipe(errorReporting())
    //Save files
    .pipe(gulp.dest(path.base + path.productionDir + '/assets/vendors'));
});

/**
 * Copy font files
 * -----------------------------------------------------------------------------
 */

gulp.task('fonts', function () {
    //Select files
    return gulp.src(path.developmentDir + '/fonts/*')
    //Error Reporting
    .pipe(errorReporting())
    //Save files
    .pipe(gulp.dest(path.base + path.productionDir + '/assets/fonts'));
});

/**
 * Server
 * -----------------------------------------------------------------------------
 */

gulp.task('server', function () {

    //Create and initialize local server
    liveServer.start(
        {
            port: 3000,
            host: "127.0.0.1",
            root: path.base + path.productionDir,
            file: "index.html"
        }
    );

    //Watch for source changes and execute associated tasks
    gulp.watch(path.developmentDir + '/pug/**/*.pug',['pug']);
    gulp.watch([path.developmentDir + '/sass/**/*.scss', '!' + path.developmentDir + '/sass/themes/*.scss'],['sass']);
    gulp.watch(path.developmentDir + '/sass/themes/*.scss',['themes']);    
    gulp.watch(path.developmentDir + '/babel/**/*.js',['js']);    
    gulp.watch(path.developmentDir + '/images/**/*',['images']);    
    gulp.watch(path.developmentDir + '/vendors/**/*',['vendors']);    
    gulp.watch(path.developmentDir + '/fonts/*',['fonts']);
});

/**
 * Default Task
 * -----------------------------------------------------------------------------
 */

gulp.task('default', function (callback) {
    return sequence(['clean'], ['pug'], ['sass'], ['themes'], ['js'], ['images'], ['vendors'], ['fonts'], ['server'], callback);
});
