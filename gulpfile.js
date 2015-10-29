var gulp = require('gulp');

var typescript = require('gulp-typescript');
var typescriptAngular = require('gulp-typescript-angular');

gulp.task('scripts', function () {
  return gulp.src('components/**/*.ts')
    .pipe(typescript())
    .pipe(typescriptAngular({
      decoratorModuleName:'sample'
    }))
    .pipe(gulp.dest('./dist'));
});
