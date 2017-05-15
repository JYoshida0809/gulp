/*
  *** gulp-settings ***
*/

// paths
const root = './www/';
const paths = {
  url: 'http://gulp.dev/', // !!!要変更
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

// import
import gulp from 'gulp'; // 本体
import browserSync from 'browser-sync'; // ブラウザリロード
import sass from 'gulp-sass'; // scssコンパイル
import cache from 'gulp-cached'; // 変更ファイル抽出
import watch from 'gulp-watch'; //追加したファイルも監視対象に
import notify from 'gulp-notify'; // 通知
import plumber from 'gulp-plumber'; // エラーが起きても処理を続行
import progeny from 'gulp-progeny'; // ファイル依存関係を監視
import babel from 'gulp-babel'; // ES2016に変換
import rename from 'gulp-rename'; // リネーム
import replace from 'gulp-replace'; // 置換
import frontNote from 'gulp-frontnote'; // スタイル集作成
import image from 'gulp-image'; // 画像圧縮
import pug from 'gulp-pug'; // pug
//import sourcemaps from 'gulp-sourcemaps'; // ソースマップ作成

// sass
gulp.task('sass', () => {
  gulp.src(paths.scss,{base: 'src'})
    .pipe(cache('sass'))
    .pipe(progeny())
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    // .pipe(sourcemaps.init()) // ソースマップ作成
    .pipe(sass({precision:10}).on('error',sass.logError))
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

// frontNote
gulp.task('note', () => {
  gulp.src(paths.scss,{base: 'src'})
  .pipe(frontNote({
    out: './www/!styleguide'
  }))
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
gulp.task('default', ['serve']);
