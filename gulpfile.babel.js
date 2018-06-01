/** Gulp
 * - browserSync
 * - sass
 * - babel + ES6
 * - images
 * - fractal
 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
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
  autoprefixer: {
    browsers : ["> 2%","last 2 version"]
  }
}

const paths = {
  url : 'http://gulp.test/',
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
    src: settings.ROOT + '**/*.+(jpg|png|gif|svg)',
    cache: './.image-cache',
    dest: 'dist_img'
  },
  fractal: {
    port: 4000,
    dest: 'dist_lib'
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


// fractal
const fractal = require('@frctl/fractal').create();
fractal.set('project.title', 'Component Library');
fractal.web.set('static.path', __dirname + '/www');
fractal.web.set('builder.dest', paths.fractal.dest);
fractal.web.set('server.port', paths.fractal.port);
fractal.docs.set('path', __dirname + '/fractal_src/docs');
fractal.components.set('path', __dirname + '/fractal_src/components');

function fserve() {
  const fractalServer = fractal.web.server({sync: true});
  return fractalServer.start();
}

export function fbuild() {
  const fractalLogger = fractal.cli.console;
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => fractalLogger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => fractalLogger.error(err.message));
  return builder.build().then(() => {
    fractalLogger.success('Fractal build completed!');
  });
}


// serve
const serve = () => {
  browserSync.init({
    proxy: paths.url,
    open: 'external'
  });
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.docs.src, docs);
}


// build（fserveは使用時に追加）
const build = gulp.series(serve,gulp.parallel(styles,scripts));
export default build;
