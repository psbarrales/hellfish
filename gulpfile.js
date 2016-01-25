var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('build', function(){
	gulp.src([
		"./src/Hellfish.js",
		"./src/Core.js",
		"./src/Modules/*.js"
	])
		.pipe(concat('hellfish.js'))
		.pipe(gulp.dest('./dist/'))
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('./dist/'));
});