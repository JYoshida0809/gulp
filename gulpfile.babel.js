/*
  *** gulp-settings ***
*/

// paths
const root = './www/';
const paths = {
  url: 'http://gulp.dev/', // !!!要変更!!!
  base: root,
  scss: root + '**/*.scss',
  css: root + '**/*.css',
  js : root + '**/*.js',
  es : root + '**/*.es.js',
  php : root + '**/*.php',
  html : root + '**/*.html',
  img : root + '**/*.+(jpg|png|gif|svg)',
  all : root + '**/*'
}

// postcss_browsers
const browsers = ['> 2%','last 2 version'];

// import
import gulp from 'gulp';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import cache from 'gulp-cached';
import watch from 'gulp-watch';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import progeny from 'gulp-progeny';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import image from 'gulp-image';
import postcss from 'gulp-postcss';
import cssmin from 'gulp-cssmin';
import sourcemaps from 'gulp-sourcemaps';

// fractal
const fractal = require('./fractal.js');
const fractalLogger = fractal.cli.console;
const fractalServer = fractal.web.server({sync: true});
gulp.task('fractal', () => {
  fractalServer.on('error', err => fractalLogger.error(err.message));
  return fractalServer.start().then(() => {
    fractalLogger.success(`Fractal server is now running at ${fractalServer.url}`);
  });
});


// sass
gulp.task('sass', () => {
  gulp.src(paths.scss,{base: 'src'})
    .pipe(cache('sass'))
    .pipe(progeny())
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass({precision:10 , outputStyle:'expanded'}).on('error',sass.logError))
    // .pipe(postcss([
    //   require('autoprefixer')({browsers: browsers}),
    //   require('css-mqpacker')
    // ]))
    // .pipe(cssmin())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(notify({title:'Compiled'}));
});


// js
gulp.task('js', () => {
  gulp.src(paths.es,{base: 'src'})
    .pipe(cache('js'))
    .pipe(plumber())
    .pipe(babel())
    .pipe(rename( (path) =>
      path.basename = path.basename.replace('.es','')
    ))
    .pipe(gulp.dest('dist'))
    .pipe(notify({title:'Compiled'}));
});


// image
gulp.task('image', () => {
  gulp.src(paths.img,{base: 'src'})
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(image({
      pngquant: true,
      optipng: true,
      zopflipng: false,
      jpegRecompress: false,
      jpegoptim: false,
      mozjpeg: false,
      guetzli: true,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('dist'));
});


// copy
gulp.task('copy', () => {
  return gulp.src(
    [paths.all,
      '!./www/**/!*',
      '!./www/**/.*',
      '!./www/_*/**/*.*',
      '!./www/**/*.scss',
      '!./www/**/*.es.js'
    ],{
      base: './www/'
    })
    .pipe(gulp.dest('html'));
});

// watch
gulp.task('watch', () => {
  watch(paths.scss, () => {
    gulp.start(['sass']);
  });

  watch(paths.es, () => {
    gulp.start(['js']);
  });
});


// serve
gulp.task('serve', ['watch'], () => {
  browserSync({
    proxy: paths.url
  });

  return watch([
    paths.php,
    paths.html,
    paths.css,
    paths.es,
    paths.js
  ]).on('change', browserSync.reload);
});


// build
gulp.task('build', ['sass','js']);


// default
gulp.task('default', ['serve','fractal']);
