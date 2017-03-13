# gulp + babel, SCSS, browser-sync

- gulp
- babel + ES2016
- browserSync
- sass
- cache
- watch
- notify
- plumber
- progeny
- rename
- replace
- frontNote

## tasks

- `gulp sass`
- `gulp js`
- `gulp note`
- `gulp build`
- `gulp watch`
- `gulp serve`


## flow
- 20170213 : ES2016を使用出来るように修正（JSのファイル名は「~.es.js」）、frontnote（style集）導入
- 20170313 : 新規ファイルを追加しても、エラーで止まらないように修正（gulp.watch → gulp-watch に変更）

(1) package.jsonを作成
npm init -y

(2) プラグインをインストール
npm install -D gulp browser-sync babel-preset-es2015 babel-preset-es2016 gulp-sass gulp-cached gulp-notify gulp-plumber gulp-progeny gulp-babel gulp-rename gulp-replace gulp-frontnote gulp-watch

(*)
・スタイル集はターミナルのコマンドで生成 → gulp note　（階層：/www/!styleguide/）
