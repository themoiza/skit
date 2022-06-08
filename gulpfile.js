const gulp = require('gulp'),
	uglify = require('gulp-uglify-es').default,
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps');

const sass = require('gulp-sass')(require('sass'));

gulp.task('js', function(cb){

	return gulp.src([
		'src/js/*.js'
	])
	.pipe(concat('skit.js'))
	.pipe(gulp.dest('skit-dist'))
	.on('error', function(err) {
	})
});

gulp.task('css', function(){

	var sassFiles = 'src/scss/index.scss',
		cssDest = 'skit-dist';

	return gulp.src(sassFiles)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(rename('skit.css'))
		.pipe(gulp.dest(cssDest))
		.on('error', function(err) {

	})
});

gulp.task('jsBuild', function(cb){

	return gulp.src([
		'src/js/*.js'
	])
	.pipe(uglify())
		.pipe(concat('skit.min.js'))
		.pipe(gulp.dest('dist/js/'))
		.on('error', function(err) {
	})
});

gulp.task('cssBuild', function(){

	var sassFiles = 'src/scss/index.scss',
		cssDest = 'dist/css';

	return gulp.src(sassFiles)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(rename('skit.min.css'))
		.pipe(gulp.dest(cssDest))
		.on('error', function(err) {

	})
});

gulp.task('build', gulp.series(['cssBuild', 'jsBuild']));

gulp.task('dev', function(cb){

	gulp.series(['css', 'js']);

	gulp.watch(['src/scss/**/*.scss'], gulp.series('css'));

	gulp.watch('src/js/**/*.js', gulp.series('js'));
});
