/** Gulp
 * - browserSync
 * - sass
 * - babel + ES6
 * - images
 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import connect from 'gulp-connect-php';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import cache from 'gulp-cached';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import progeny from 'gulp-progeny';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import image from 'gulp-image';
import assetCache from 'gulp-asset-cache';
import fs from 'fs';

const settings = {
  ROOT: './www/',
  //PHP: '5.6.32',
  autoprefixer: {
    browsers : ["> 2%","last 2 version"]
  }
}

const paths = {
  styles: {
    src: settings.ROOT + '**/*.scss',
    dest: 'dist'
  },
  scripts: {
    src: settings.ROOT + '**/*.es.js',
    dest: 'dist'
  },
  docs: {
    src: settings.ROOT + '**/*.+(php|html)'
  },
  img: {
    src: settings.ROOT + '**/*.+(jpg|png|gif)',
    cache: './.image-cache',
    dest: 'dist_img'
  }
}


// styles
export function styles() {
  return gulp.src(paths.styles.src,{base: 'src',since: gulp.lastRun(styles)})
  .pipe(progeny())
  .pipe(sass({precision:10 , outputStyle:'expanded'}).on('error',sass.logError))
  .pipe(autoprefixer({browsers:autoprefixer.browsers,cascade: false}))
  .pipe(cleanCSS())
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(browserSync.reload({stream: true}));
}


// scripts
export function scripts() {
  return gulp.src(paths.scripts.src,{base: 'src',since: gulp.lastRun(scripts)})
    .pipe(babel())
    .pipe(rename( (path) =>
      path.basename = path.basename.replace('.es','')
    ))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.reload({stream: true}));
}


// docs
export function docs() {
  return gulp.src(paths.docs.src,{since: gulp.lastRun(docs)})
    .pipe(browserSync.reload({stream: true}));
}


// images
export function images() {
  writeFile('.image-cache','');

  return gulp.src(paths.img.src)
  .pipe(assetCache.filter(paths.img.cache))
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
  .pipe(gulp.dest(paths.img.dest))
  .pipe(assetCache.cache());
}

function writeFile(path,data) {
  fs.access(path, function(err) {
    if (err) {
      return fs.writeFile(path,data,(error) => {console.log('Create .image-cache')});
    }
  });
}


// serve
const serve = () => {
  connect.server({
    port: 3001,
    base: 'www',
    stdio: 'ignore',
    //bin: `/Applications/MAMP/bin/php/php${settings.PHP}/bin/php`,
    //ini: `/Applications/MAMP/bin/php/php${settings.PHP}/conf/php.ini`
  }, () => {
    browserSync.init({
      proxy: '127.0.0.1:3001',
      open: 'external',
      logSnippet: false,
      notify: false
    });
  });

  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.docs.src, docs);
}


// default
export default serve;
