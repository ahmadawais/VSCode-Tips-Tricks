/**
 * Gulp file.
 *
 * @version 1.0.0
 */

const config = require('./config.js');
const gulp = require('gulp'); // Gulp of-course

// CSS related plugins.
const sass = require('gulp-sass'); // Gulp plugin for Sass compilation.
const minifycss = require('gulp-uglifycss'); // Minifies CSS files.
const autoprefixer = require('gulp-autoprefixer'); // Autoprefixing magic.
const mmq = require('gulp-merge-media-queries'); // Combine matching media queries into one media query definition.

// Image related plugins.
const imagemin = require('gulp-imagemin'); // Minify PNG, JPEG, GIF and SVG images with imagemin.

// Utility related plugins.
const rename = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
const lineec = require('gulp-line-ending-corrector'); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings)
const filter = require('gulp-filter'); // Enables you to work on a subset of the original files by filtering them using globbing.
const sourcemaps = require('gulp-sourcemaps'); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css)
const notify = require('gulp-notify'); // Sends message notification to you
const browserSync = require('browser-sync').create(); // Reloads browser and injects CSS. Time-saving synchronized browser testing.
const cache = require('gulp-cache'); // Cache files in stream for later use
const plumber = require('gulp-plumber'); // Prevent pipe breaking caused by errors from gulp plugins
const pug = require('gulp-pug');
const extReplace = require('gulp-ext-replace');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const inlineCss = require('gulp-inline-css');
const beep = require('beepbeep');
const pluginError = require('plugin-error');
const log = require('fancy-log');

/**
 * Custom Error Handler.
 *
 * @param Mixed err
 */
const errorHandler = r => {
	notify.onError('\n\n❌  ===> ERROR: <%= error.message %>\n')(r);
	beep();

	// this.emit('end');
};

/**
 * Task: `browser-sync`.
 *
 * @param Mixed done Done.
 * @link http://www.browsersync.io/docs/options/
 */
const browsersync = done => {
	browserSync.init({
		proxy: config.projectURL,
		open: config.browserAutoOpen,
		injectChanges: config.injectChanges,
		watchEvents: ['change', 'add', 'unlink', 'addDir', 'unlinkDir']
	});
	done();
};

// Helper function to allow browser reload with Gulp 4
const reload = done => {
	browserSync.reload();
	done();
};

/**
 * Task: `styles`.
 */
gulp.task('styles', () => {
	return gulp
		.src(config.styleSRC)
		.pipe(plumber(errorHandler))
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				errLogToConsole: config.errLogToConsole,
				outputStyle: config.outputStyle,
				precision: config.precision
			})
		) // .on( 'error', sass.logError )
		.pipe(sourcemaps.write({ includeContent: !1 }))
		.pipe(sourcemaps.init({ loadMaps: !0 }))
		.pipe(autoprefixer(config.BROWSERS_LIST))
		.pipe(sourcemaps.write('./'))
		.pipe(lineec())
		.pipe(gulp.dest(config.styleDestination))
		.pipe(filter('**/*.css'))
		.pipe(mmq({ log: !0 }))
		.pipe(browserSync.stream())
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss({ maxLineLen: 10 }))
		.pipe(lineec())
		.pipe(gulp.dest(config.styleDestination))
		.pipe(filter('**/*.css'))
		.pipe(browserSync.stream())
		.pipe(notify({ message: '\n\n✅  ===> STYLES — completed!\n', onLast: true }));
});

/**
 * JavaScript via webpack.
 */
gulp.task('webpackJS', callback => {
	plumber(errorHandler);
	webpack(webpackConfig, (err, stats) => {
		// Show error.
		if (err) {
			throw new pluginError('webpack', err);
		}

		// Log stuff.
		log(
			'[webpack]',
			stats.toString({
				colors: true,
				progress: true
			})
		);

		// browserSync.reload();
		callback();
	});
	notify({ message: '\n\n✅  ===> webpackJS — completed!\n', onLast: true });
});

/**
 * Task: `images`.
 *
 * @link https://github.com/sindresorhus/gulp-imagemin
 */
gulp.task('images', () => {
	return gulp
		.src(config.imgSRC)
		.pipe(plumber(errorHandler))
		.pipe(
			cache(
				imagemin([
					imagemin.gifsicle({ interlaced: !0 }),
					imagemin.jpegtran({ progressive: !0 }),
					imagemin.optipng({ optimizationLevel: 3 }),
					imagemin.svgo({ plugins: [{ removeViewBox: !0 }, { cleanupIDs: !1 }] })
				])
			)
		)
		.pipe(gulp.dest(config.imgDST))
		.pipe(notify({ message: '\n\n✅  ===> IMAGES — completed!\n', onLast: true }));
});

/**
 * Task: `clear-images-cache`.
 *
 * Deletes the images cache. By running the next "images" task,
 * each image will be regenerated.
 */
gulp.task('clearCache', c => {
	return cache.clearAll(c);
});

/**
 * Pug Views.
 */
gulp.task('views', () => {
	return gulp
		.src(config.pugSRC)
		.pipe(plumber(errorHandler))
		.pipe(
			pug({
				pretty: true,
				locals: {
					// Data.
					data: {
						baseURL: '/wp-content/themes/cptheme'
					},

					// TODO: Course Data.
					vscodeproData: require(config.vscodeproDataFile)
				}
			})
		)
		.pipe(browserSync.stream())
		.pipe(extReplace('.php'))
		.pipe(gulp.dest(config.pugDST))
		.pipe(browserSync.stream())
		.pipe(notify({ message: '\n\n✅  ===> VIEWS — completed!\n', onLast: true }));
});

/**
 * Emails Handler.
 *
 * Handle all the emails workflow.
 */
gulp.task('emails', () => {
	return gulp
		.src(config.emailSRC)
		.pipe(plumber(errorHandler))
		.pipe(
			pug({
				pretty: true,
				locals: {
					// Data that will be available throughout pug.
					data: {
						baseURL: '/wp-content/themes/cptheme'
					}
				}
			})
		)
		.pipe(browserSync.stream())
		.pipe(
			inlineCss({
				extraCss: '',
				applyLinkTags: true,
				removeStyleTags: true,
				removeLinkTags: true,
				preserveMediaQueries: true
			})
		)
		.pipe(extReplace('.php'))
		.pipe(gulp.dest(config.emailDST))
		.pipe(browserSync.stream())
		.pipe(notify({ message: '\n\n✅  ===> EMAILS — completed!\n', onLast: true }));
});

/**
 * Important! Separate task for the reaction to `.pug` files.
 */
gulp.task('pug-watch', gulp.series('views'));
gulp.task('email-watch', gulp.series('emails'));

/**
 * Watch Tasks.
 *
 * Watches for file changes and runs specific tasks.
 */
gulp.task(
	'default',
	gulp.parallel('styles', 'views', 'emails', 'webpackJS', 'images', browsersync, () => {
		gulp.watch(config.watchPug, gulp.parallel('pug-watch')),
		gulp.watch(config.watchEmails, gulp.parallel('email-watch')),
		gulp.watch(config.watchPhp, reload),
		gulp.watch(config.watchSvg, reload),
		gulp.watch(config.watchStyles, gulp.parallel('styles')),
		gulp.watch(config.watchJs, gulp.series('webpackJS', reload)),
		gulp.watch(config.imgSRC, gulp.series('images', reload));
	})
);
