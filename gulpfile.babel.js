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
  img : root + '**/*.+(png|gif|svg)',
  jpg : root + '**/*.jpg'
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
import imagemin from 'gulp-imagemin'; // 画像圧縮
import imageminGuetzli from 'imagemin-guetzli'; // jpg圧縮
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

// frontNote
gulp.task('note', () => {
  gulp.src(paths.scss,{base: 'src'})
  .pipe(frontNote({
    out: './www/!styleguide'
  }))
});

// imagemin
gulp.task('imagemin', () => {
  //jpg
  gulp.src(paths.jpg,{base: 'src'})
    .pipe(imagemin([imageminGuetzli()]))
    .pipe(gulp.dest('dist'))
    .pipe(notify({title:'imagemin task complete.'}));

  //png,gif,svg
  gulp.src(paths.img,{base: 'src'})
    .pipe(imagemin())
    .pipe(gulp.dest('dist'))
    .pipe(notify({title:'imagemin task complete.'}));
});

// copy
gulp.task('copy', () => {
  return gulp.src(
    [paths.all,
      '!./www/**/!*', // !
      '!./www/**/.*', // .
      '!./www/_*/**/*.*', // _
      '!./www/**/*.scss', // .scss
      '!./www/**/*.es.js', // .es
      '!./www/*.+(jpg|png|gif|svg)'],
    {base: root}
  )
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
});

// serve
gulp.task('serve', ['watch'], () => {
  browserSync({
    proxy: paths.url
  });
  // gulp-watch
  return watch([paths.php,paths.html,paths.css,paths.es,paths.js]).on('change', browserSync.reload);
});

// default
gulp.task('default', ['serve']);
