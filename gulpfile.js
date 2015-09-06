var gulp = require('gulp');
var del = require('del');

var plugins = require('gulp-load-plugins')();

// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');

var config = require('./config');

gulp.task('default', ['mytask1'], function() {
	console.log('My Default Task');
});

gulp.task('mytask1', ['mytask2'], function() {
	console.log('Task1 Output');
});

gulp.task('mytask2', function() {
	console.log('Task2 Output');
});

gulp.task('output1', function() {
	gulp.src('assets/vendor/bootstrap/**/*.js')
		.pipe(gulp.dest('output1'));
});

gulp.task('output3', function() {
	gulp.src(['assets/vendor/**/*.js',
		      'assets/vendor/**/*.css'], { base: 'assets/vendor/' })
		//.pipe(gulp.dest('output3'));
});

gulp.task('output2', ['clean'], function() {
	gulp.src('assets/vendor/bootstrap/**/*.js', { base: 'assets/vendor/' })
		.pipe(gulp.dest('output2'));
});

gulp.task('clean', function(cb) {
	del(['output2/**', '!output2'])
	.then(function (paths) {
		console.log('Deleted files/folders:\n', paths.join('\n'));
	})
	.then(cb);
});

gulp.task('watch', function() {
	gulp.watch(config.appPath + '/**', ['concat-app']);
});

gulp.task('concat-app', function() {
	
	gulp.src(config.appPath + '/**/*.module.js')
		.pipe(gulp.dest('src/app'))
		.pipe(plugins.concat('app.modules.js'))
		.pipe(gulp.dest('assets'))
		.pipe(plugins.uglify())
		.pipe(plugins.rename({extname: '.min.js'}))
		.pipe(gulp.dest('assets'));
		
	gulp.src([config.appPath + '/**/*.js', '!' + config.appPath + '/**/*.module.js'])
		.pipe(gulp.dest('src/app'))
		.pipe(plugins.concat('app.bundles.js'))
		.pipe(gulp.dest('assets'))
		.pipe(plugins.uglify( { mangle: false } ))
		.pipe(plugins.rename({extname: '.min.js'}))
		.pipe(gulp.dest('assets'));
		
});

