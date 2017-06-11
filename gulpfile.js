var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function() {
    gulp.src('src/static/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/static/css'));
});


gulp.task('sass:watch', function() {
    gulp.watch('src/static/scss/**/*.scss', ['sass']);
});
