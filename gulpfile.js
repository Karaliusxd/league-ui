const { src, dest, watch, series, } = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();



// const sass = require('gulp-sass'); 
var sass = require('gulp-sass')(require('sass'));//sass-css


// Sass Task
function scssTask(){
  return src('src/styles/main.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('build/styles', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask(){
  return src('src/**/*.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('build/scripts', { sourcemaps: '.' }));
}


// Browsersync Tasks
function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['src/styles/**/*.scss', 'src/scripts/**/*.js',], series(scssTask, jsTask, browsersyncReload));
}

// Default Gulp task
exports.default = series(
  scssTask,
  jsTask,
  browsersyncServe,
  watchTask
);