const gulp = require('gulp');
const eslint = require('gulp-eslint');

const conf = {
  paths: {
    js: ['./src/*.js', '!./src/*test*.js', '!./src/registerServiceWorker.js']
  }
};

gulp.task('lint', () => {
  return gulp.src(conf.paths.js)
		.pipe(eslint({configFile: 'eslint.config.json'}))
		.pipe(eslint.format());
});

gulp.task('default', ['lint']);
