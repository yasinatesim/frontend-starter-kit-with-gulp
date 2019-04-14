/**
 * Dependencies
 * -----------------------------------------------------------------------------
 */

/**
 * If 'npm install' not working!
 * npm install babel-core babel-preset-env browser-sync del gulp@3.9.1 gulp-autoprefixer gulp-babel@7 gulp-clean-css gulp-group-css-media-queries gulp-if gulp-imagemin gulp-include gulp-newer gulp-plumber gulp-prettify gulp-pug gulp-rename gulp-sass gulp-uglify gulp-util run-sequence --save-dev
 * -----------------------------------------------------------------------------
 */

/* ========================= Gulp ========================= */
const gulp = require('gulp'),

	/* ========================= Pug ========================= */
	pug = require('gulp-pug'),
	prettify = require('gulp-prettify'),

	/* ========================= Sass ========================= */
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	gcmq = require('gulp-group-css-media-queries'),
	cssmin = require('gulp-clean-css'),

	/* ========================= Babel ========================= */
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify'),

	/* ========================= Image ========================= */
	imagemin = require('gulp-imagemin'),
	newer = require('gulp-newer'),

	/* ========================= File Name & Includes ========================= */
	rename = require('gulp-rename'),
	include = require('gulp-include'),

	/* ========================= Eror Reporting ========================= */
	gutil = require('gulp-util'),
	plumber = require('gulp-plumber'),

	/* ========================= Compaile & Server ========================= */
	del = require('del'),
	gulpif = require('gulp-if'),
	sequence = require('run-sequence'),
	bs = require("browser-sync"),

	/**
	 * Output Css & Js File Name and Set Paths
	 * -----------------------------------------------------------------------------
	 */
	isTheme = false, //For ThemeForest Themes
	demo = false, //Minified file include

	ThemeName = 'Mi Furniture',
	path = {
		base: './',
		developmentDir: 'src',
		productionDir: isTheme ? ThemeName.charAt(0).toUpperCase() + ThemeName.slice(1) + ' HTML' : 'dist',
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
			gutil.log(gutil.colors.red(`Error (${error.plugin}):${error.message}`));
			this.emit('end');
		}));
};

/**
 * Delete the productionDir directory
 * -----------------------------------------------------------------------------
 */

gulp.task('clean', () => {
	if (isTheme) {
		return del(`${path.base}${path.productionDir}`,
			{
				force: true
			}
		);
	} else {
		return del([`${path.base}${path.developmentDir}/images/prod`, `${path.base}${path.developmentDir}/images/sample`, `${path.base}${path.productionDir}`],
			{
				force: true
			}
		);
	}
});


/**
 * Build pug with Pug
 * -----------------------------------------------------------------------------
 */

gulp.task('pug', () => {
	//Select files
	return gulp.src(`${path.base}${path.developmentDir}/pug/*.pug`)
		//Compile Pug
		.pipe(pug(
			{
				pretty: !demo,
				data: {
					demo: demo,
					isTheme: isTheme
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
		.pipe(gulp.dest(`${path.base}${path.productionDir}`))
		//Browser sync stream
		.pipe(bs.stream());
});

/**
 * Build styles with SASS
 * -----------------------------------------------------------------------------
 */

gulp.task('sass', () => {
	//Select files
	return gulp.src(`${path.base}${path.developmentDir}/sass/*.scss`)
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
		//Concat media queries
		.pipe(gulpif(!isTheme, gcmq()))
		//Save unminified file
		.pipe(gulpif(!demo, gulp.dest(`${path.base}${path.productionDir}/assets/css`)))
		//Optimize and minify
		.pipe(cssmin())
		//Append suffix
		.pipe(rename(
			{
				suffix: '.min'
			}
		))
		//Save minified file
		.pipe(gulp.dest(`${path.base}${path.productionDir}/assets/css`))
		//Browser sync stream
		.pipe(bs.stream());
});

/**
 * Build vendors styles with SASS
 * -----------------------------------------------------------------------------
 */

gulp.task('sass:vendors', () => {
	//Select files
	return gulp.src(`${path.base}${path.developmentDir}/sass/vendors/*.scss`)
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
		//Concat media queries
		.pipe(gulpif(!isTheme, gcmq()))
		//Save unminified file
		.pipe(gulpif(!demo, gulp.dest(`${path.base}${path.productionDir}/assets/css/vendors`)))
		//Optimize and minify
		.pipe(cssmin())
		//Append suffix
		.pipe(rename(
			{
				suffix: '.min'
			}
		))
		//Save minified file
		.pipe(gulp.dest(`${path.base}${path.productionDir}/assets/css/vendors`))
		//Browser sync stream
		.pipe(bs.stream());
});


/**
 * Build themes styles with SASS
 * -----------------------------------------------------------------------------
 */

gulp.task('sass:themes', () => {
	//Select files
	return gulp.src(`${path.base}${path.developmentDir}/sass/themes/*.scss`)
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
		//Concat media queries
		.pipe(gulpif(!isTheme, gcmq()))
		//Save unminified file
		.pipe(gulpif(!demo, gulp.dest(`${path.base}${path.productionDir}/assets/css/colors`)))
		//Optimize and minify
		.pipe(cssmin())
		//Append suffix
		.pipe(rename(
			{
				suffix: '.min'
			}
		))
		//Save minified file
		.pipe(gulp.dest(`${path.base}${path.productionDir}/assets/css/colors`))
		//Browser sync stream
		.pipe(bs.stream());
});

/**
 * Build scripts with ES6/Babel
 * -----------------------------------------------------------------------------
 */

gulp.task('js', () => {
	//Select files
	return gulp.src(`${path.base}${path.developmentDir}/js/*.js`)
		//Concatenate includes
		.pipe(include())
		//Transpile
		.pipe(babel(
			{
				presets: [['env', {loose: true, modules: false}]] //'use-strict' deleted
			}
		))
		//Save unminified file
		.pipe(gulpif(!demo, gulp.dest(`${path.base}${path.productionDir}/assets/js`)))
		//Optimize and minify
		.pipe(uglify())
		//Append suffix
		.pipe(rename(
			{
				suffix: '.min'
			}
		))
		//Save minified file
		.pipe(gulp.dest(`${path.base}${path.productionDir}/assets/js`))
		//Browser sync stream
		.pipe(bs.stream());
});

/**
 * Build vendors scripts with ES6/Babel
 * -----------------------------------------------------------------------------
 */

gulp.task('js:vendors', () => {
	//Select files
	return gulp.src(`${path.base}${path.developmentDir}/js/vendors/*.js`)
		//Concatenate includes
		.pipe(include())
		//Transpile
		.pipe(babel(
			{
				presets: [['env', {loose: true, modules: false}]] //'use-strict' deleted
			}
		))
		//Save unminified file
		.pipe(gulpif(!demo, gulp.dest(`${path.base}${path.productionDir}/assets/js/vendors`)))
		//Optimize and minify
		.pipe(uglify())
		//Append suffix
		.pipe(rename(
			{
				suffix: '.min'
			}
		))
		//Save minified file
		.pipe(gulp.dest(`${path.base}${path.productionDir}/assets/js/vendors`))
		//Browser sync stream
		.pipe(bs.stream());
});

/**
 * Copy image files
 * -----------------------------------------------------------------------------
 */

gulp.task('images', () => {
	//Select files
	return gulp.src(demo ? `${path.base}${path.developmentDir}/images/sample/**/*` : `${path.base}${path.developmentDir}/images/prod/**/*`)
		.pipe(newer(`${path.productionDir}/assets/img`))
		//Image optimize and minify
		.pipe(imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.jpegtran({
				progressive: true
			}),
			imagemin.optipng({
				optimizationLevel: 5
			}),
			imagemin.svgo({
				plugins: [{
					removeViewBox: false
				},
					{
						cleanupIDs: false
					}
				]
			})
		]))
		//Save files
		.pipe(gulp.dest(demo ? `${path.base}${path.productionDir}/assets/img/sample` : `${path.base}${path.productionDir}/assets/img`))
		//Browser sync stream
		.pipe(bs.stream());
});

/**
 * Server
 * -----------------------------------------------------------------------------
 */

gulp.task('server', () => {

	//Create and initialize local server
	bs.init({
		server: {
			baseDir: path.productionDir
		},
		open: 'local',
		notify: false,
		ui: false,
	});

	//Watch for source changes and execute associated tasks
	gulp.watch(`${path.developmentDir}/pug/**/*.pug`, ['pug']);
	gulp.watch(`${path.developmentDir}/sass/vendors/**/*.scss`, ['sass:vendors']);
	gulp.watch(`${path.developmentDir}/sass/themes/**/*.scss`, ['sass:themes']);
	gulp.watch([`${path.developmentDir}/sass/**/*.scss`, `!${path.developmentDir}/sass/vendors/**/*.scss`,`!${path.developmentDir}/sass/themes/**/*.scss`], ['sass']);
	gulp.watch(`${path.developmentDir}/js/vendors/**/*.js`, ['js:vendors']);
	gulp.watch([`${path.developmentDir}/js/**/*.js`, `!${path.developmentDir}/js/vendors/**/*.js`], ['js']);
	gulp.watch(`${path.developmentDir}/images/**/*`, ['images']);
});

/**
 * Default Task
 * -----------------------------------------------------------------------------
 */
if (isTheme) {
	gulp.task('default', (callback) => sequence(['clean'], ['pug'], ['sass:vendors'], ['sass'], ['sass:themes'], ['js:vendors'], ['js'], ['images'], ['server'], callback));
} else {
	gulp.task('default', (callback) => sequence(['clean'], ['pug'], ['sass:vendors'], ['sass'], ['js:vendors'], ['js'], ['images'], ['server'], callback));
}
