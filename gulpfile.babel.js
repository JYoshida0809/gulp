/*
  *** gulp-settings ***
*/

// paths
const root = './www/';
const paths = {
  url: 'http://gulp.dev/', // !!!環境に応じて変更!!!
  base: root,
  scss: root + '**/*.scss',
  css: root + '**/*.css',
  js : root + '**/*.js',
  es : root + '**/*.es.js',
  php : root + '**/*.php',
  html : root + '**/*.html',
  pug : root + '**/*.pug',
  img : root + '**/*.+(jpg|png|gif|svg)',
  all : root + '**/*'
}

// postcss_browsers
const browsers = [
  '> 1%',
  'last 2 version',
  'iOS >= 10',
  'Android >= 4.4'
];

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
import pug from 'gulp-pug';
import postcss from 'gulp-postcss';
import cssmin from 'gulp-cssmin';
//import sourcemaps from 'gulp-sourcemaps';


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
    // .pipe(sourcemaps.init())  // ソースマップ作成
    .pipe(sass({precision:10}).on('error',sass.logError))
    .pipe(postcss([
      require('autoprefixer')({browsers: browsers}),
      require('css-mqpacker')
    ]))
    // .pipe(cssmin()) // cssmin
    // .pipe(sourcemaps.write('.')) // ソースマップ作成
    .pipe(gulp.dest('dist'))
    .pipe(notify({title:'Compiled'}));
});

// js
gulp.task('js', () => {
  gulp.src(paths.es,{base: 'src'})
    .pipe(plumber())
    .pipe(babel())
    .pipe(rename( (path) =>
      path.basename = path.basename.replace('.es','')
    ))
    .pipe(gulp.dest('dist'))
});

// pug
gulp.task("pug", () => {
  gulp.src(paths.pug,{base: 'src'})
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('dist'))
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
      '!./www/**/*.pug',
      '!./www/**/*.es.js'
    ],{
      base: './www/'
    })
    .pipe(gulp.dest('html'));
});

// build
gulp.task('build', ['sass']);

// watch
gulp.task('watch', () => {
  // css
  watch(paths.scss, () => {
    gulp.start(['sass']);
  });
  // js
  watch(paths.es, () => {
    gulp.start(['js']);
  });
  // pug
  watch(paths.pug, () => {
    gulp.start(['pug']);
  });
});

// serve
gulp.task('serve', ['watch'], () => {
  browserSync({
    proxy: paths.url
  });

  // gulp-watch
  return watch([
    paths.php,
    paths.html,
    paths.pug,
    paths.css,
    paths.es,
    paths.js
  ]).on('change', browserSync.reload);
});


// default
gulp.task('default', ['serve','fractal']);
