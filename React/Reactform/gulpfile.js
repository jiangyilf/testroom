var gulp = require('gulp');
var babel = require('gulp-babel');
var react = require('gulp-react');

var watcher = gulp.watch('src/js/main.js',['default']);

gulp.task('default', function() {
  	return gulp.src('src/js/main.js')
  			.pipe(react())
  			.pipe(babel())
  			.pipe(gulp.dest('dist'));
});

watcher.on('change',function(event){
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
