/**
 * Dependencies
 * -----------------------------------------------------------------------------
 */

/**
 * If 'npm install' not working!
 * npm install babel-core babel-preset-env browser-sync gulp gulp-autoprefixer gulp-babel gulp-cssmin gulp-imagemin gulp-include gulp-plumber gulp-prettify gulp-pug gulp-rename gulp-sass gulp-uglify gulp-util gulp-watch --save-dev
 * -----------------------------------------------------------------------------
 */

/* ================= Gulp ==================== */
const gulp         = require('gulp'),
      gutil        = require('gulp-util'),

/* ================= Pug ==================== */
      pug          = require('gulp-pug'),
      prettify     = require('gulp-prettify'),

/* ================= Sass ==================== */
      sass         = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cssmin 	   = require('gulp-cssmin'),

/* ================= Babel ==================== */
      babel        = require('gulp-babel'),
      uglify       = require('gulp-uglify'),

/* ================= Image ==================== */
      imagemin     = require('gulp-imagemin'),

/* ================= File Name & Includes ==================== */
      rename       = require('gulp-rename'),
      include      = require('gulp-include'),

/* =================  Eror Reporting  ==================== */
      plumber      = require('gulp-plumber'),

/* ================= Compaile & Server ==================== */
      watch        = require('gulp-watch'),
      bs           = require('browser-sync'),

/**
 * Output Css & Js File Name and Set Paths
 * -----------------------------------------------------------------------------
 */

ThemeName = 'theme', // Output CSS and Javascript File Name
path      = {
	developmentDir: 'resources',
	productionDir: 	ThemeName.charAt(0).toUpperCase() + ThemeName.slice(1) + ' HTML'
};

/**
 * Catch stream errors
 * -----------------------------------------------------------------------------
 */

const gulpSrc = gulp.src;

gulp.src = function onError(...args) {
  return gulpSrc
    .apply(gulp, args)
    // Catch errors
    .pipe(plumber(function onError(error) {
      gutil.log(gutil.colors.bgRed("Error (" + error.plugin + "):" + error.message));
      this.emit('end');
    }));
};

/**
 * Build views with Pug
 * -----------------------------------------------------------------------------
 */

gulp.task('pug', function () {
  return gulp
  // Select files
  .src(path.developmentDir + '/pug/*.pug')
  // Compile Pug
  .pipe(pug(
    {
      pretty: true
    }
  ))
  // HTML Beautify
  .pipe(prettify({
      indent_size: 4,
      unformatted: ['pre', 'code'],
      preserve_newlines: true
  }))
  // Save files
  .pipe(gulp.dest(path.productionDir));
});

/**
 * Build styles with SASS
 * -----------------------------------------------------------------------------
 */

gulp.task('sass', function () {
  return gulp
  // Select files
  .src(path.developmentDir + '/sass/styles.scss')
  // Compile Sass
  .pipe(sass(
    {
      outputStyle: 'expanded'
    }
  ))
  // Add vendor prefixes
  .pipe(autoprefixer(
    {
      browsers: ['last 4 version'],
      cascade: false
    }
  ))
  // File Name
  .pipe(rename(ThemeName + '-styles.css'))
  // Save unminified file
  .pipe(gulp.dest(path.productionDir + '/assets/css'))
  // Optimize and minify
  .pipe(cssmin())
  // Append suffix
  .pipe(rename({
    suffix: '.min'
  }))
  // Save minified file
  .pipe(gulp.dest(path.productionDir + '/assets/css'));
});

/**
 * Build theme color options with SASS
 * -----------------------------------------------------------------------------
 */

gulp.task('themes', function () {
  return gulp
  // Select files
  .src(path.developmentDir + '/sass/themes/*.scss')
  // Compile Sass
  .pipe(sass(
    {
      outputStyle: 'expanded'
    }
  ))
  // Add vendor prefixes
  .pipe(autoprefixer(
    {
      browsers: ['last 4 version'],
      cascade: false
    }
  ))
  // Save unminified file
  .pipe(gulp.dest(path.productionDir + '/assets/css/colors'))
  // Optimize and minify
  .pipe(cssmin())
  // Append suffix
  .pipe(rename({
    suffix: '.min'
  }))
  // Save minified file
  .pipe(gulp.dest(path.productionDir + '/assets/css/colors'));
});

/**
 * Build scripts with ES6/Babel
 * -----------------------------------------------------------------------------
 */

gulp.task('js', function () {
  return gulp
  // Select files
  .src(path.developmentDir + '/babel/scripts.js')
  // Concatenate includes
  .pipe(include())
  // Transpile
  .pipe(babel(
      {
          presets: [['env', {loose: true, modules: false}]] // 'use-strict' deleted
      }
    ))
  // File Name
  .pipe(rename(ThemeName + '-scripts.js'))
  // Save unminified file
  .pipe(gulp.dest(path.productionDir + '/assets/js'))
  // Optimize and minify
  .pipe(uglify())
  // Append suffix
  .pipe(rename({
    suffix: '.min'
  }))
  // Save minified file
  .pipe(gulp.dest(path.productionDir + '/assets/js'));
});

/**
 * Copy image files
 * -----------------------------------------------------------------------------
 */

gulp.task('images', function () {
  return gulp
  // Select files
  .src(path.developmentDir + '/images/**/*')
  // ImageMin
  .pipe(imagemin())
  // Save files
  .pipe(gulp.dest(path.productionDir + '/assets/img'));
});

/**
 * Copy vendors files
 * -----------------------------------------------------------------------------
 */

gulp.task('vendors', function () {
  return gulp
  // Select files
  .src(path.developmentDir + '/vendors/**/*')
  // Save files
  .pipe(gulp.dest(path.productionDir + '/assets/vendors'));
});

/**
 * Copy font files
 * -----------------------------------------------------------------------------
 */

gulp.task('fonts', function () {
  return gulp
  // Select files
  .src(path.developmentDir + '/fonts/*')
  // Save files
  .pipe(gulp.dest(path.productionDir + '/assets/fonts'));
});

/**
 * Server
 * -----------------------------------------------------------------------------
 */

gulp.task('server', function () {

// Create and initialize local server
  bs.create();
  bs.init({
    notify: false,
    server: './' + path.productionDir,
    open: 'local',
    ui: false
  });

  // Watch for build changes and reload browser
  bs.watch(path.productionDir + '/**/*').on('change', bs.reload);

  // Watch for source changes and execute associated tasks
    watch('./'+ path.developmentDir + '/pug/**/*.pug', function () {
        gulp.start('pug');
    });

    watch(['./'+ path.developmentDir + '/sass/**/*.scss','!./'+ path.developmentDir + '/sass/themes/*.scss'], function () {
        gulp.start('sass');
    });

    watch('./'+ path.developmentDir + '/sass/themes/*.scss', function () {
        gulp.start('themes');
    });

    watch('./'+ path.developmentDir + '/babel/**/*.js', function () {
        gulp.start('js');
    });

    watch('./'+ path.developmentDir + '/images/**/*', function () {
        gulp.start('images');
    });

    watch('./'+ path.developmentDir + '/vendors/**/*', function () {
        gulp.start('vendors');
    });

    watch('./'+ path.developmentDir + '/fonts/*', function () {
        gulp.start('fonts');
    });

});

/**
 * Default Task
 * -----------------------------------------------------------------------------
 */

gulp.task('default', ['pug','sass','themes','js','images','vendors','fonts','server']);
