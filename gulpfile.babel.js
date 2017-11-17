/*
  *** gulp-settings ***
*/

// root
const root = './www/';

// paths
const paths = {
  url: 'http://gulp.dev/', // 要変更
  base: root,
  scss: root + '**/*.scss',
  css: root + '**/*.css',
  js : root + '**/*.js',
  es : root + '**/*.es.js',
  php : root + '**/*.php',
  html : root + '**/*.html',
  img : root + '**/*.+(jpg|png|gif|svg)',
  img_cache : './.image-cache',
  all : root + '**/*'
}

// option
const opt = {
  postcss : false,
  cssmin : false,
  default: ['serve','fractal'], // fractalを使わない場合は削除
  browsers : ["> 2%","last 2 version"] // autoprefixer用の設定
}


// import
import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import cache from 'gulp-cached';
import assetCache from 'gulp-asset-cache';
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
const fractal = require('@frctl/fractal').create();
fractal.set('project.title', 'Component Library');
fractal.web.set('static.path', __dirname + '/www');
fractal.web.set('builder.dest', '!library');
fractal.docs.set('path', __dirname + '/fractal_src/docs');
fractal.components.set('path', __dirname + '/fractal_src/components');

const fractalLogger = fractal.cli.console;
const fractalServer = fractal.web.server({sync: true});
gulp.task('fractal', () => {
  fractalServer.on('error', err => fractalLogger.error(err.message));
  return fractalServer.start().then(() => {
    fractalLogger.success(`Fractal server is now running at ${fractalServer.url}`);
  });
});
gulp.task('fractal:build', function(){
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => fractalLogger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => fractalLogger.error(err.message));
  return builder.build().then(() => {
    fractalLogger.success('Fractal build completed!');
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
    .pipe(gulpif(opt.postcss ,postcss([
      require('autoprefixer')({browsers: opt.browsers}),
      require('css-mqpacker')
    ])))
    .pipe(gulpif(opt.cssmin ,cssmin()))
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
    .pipe(assetCache.filter(paths.img_cache))
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
    .pipe(gulp.dest('dist'))
    .pipe(assetCache.cache());
});


// copy
gulp.task('copy', () => {
  return gulp.src(
    [paths.all,
      '!./www/**/!*',
      '!./www/**/.*',
      '!./www/**/_*',
      '!./www/**/_settings/*',
      '!./www/**/*.scss',
      '!./www/**/*.map',
      '!./www/**/*.es.js'
      '!./www/_*/**/*.*',
    ],{
      base: root
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

  // cache
  gulp.src(paths.scss,{base: 'src'}).pipe(cache('sass')).pipe(progeny());
  gulp.src(paths.es,{base: 'src'}).pipe(cache('js'));

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
gulp.task('default', opt.default);
