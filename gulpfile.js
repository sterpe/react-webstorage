var gulp = require('gulp')
, browserify = require('browserify')
, vinylSourceStream = require('vinyl-source-stream')
, rimraf = require('rimraf')
, mkdirp = require('mkdirp')
;

gulp.task('rm:build', [], function (cb) {
	rimraf('./build', cb);
});

gulp.task('mkdir:build', ['rm:build'], function (cb) {
	mkdirp('./build', cb);
});

gulp.task('clean', ['rm:build', 'mkdir:build']);

gulp.task('browserify', ['clean'], function () {
	return browserify('./index.js')
		.bundle()
		.pipe(vinylSourceStream('bundle.js'))
		.pipe(gulp.dest('./build'));
});

gulp.task('bundle', ['browserify']);

gulp.task('default', ['clean', 'bundle']);

gulp.task('watch', [], function (cb) {
	gulp.watch([
		'./*.js',
		'./lib/**/*.js',
		'!./gulpfile.js'
	], ['default']).on('change', function (e) {
		console.log('File ' + e.path + ' was ' + e.type + '.');
	});
	cb();
});
