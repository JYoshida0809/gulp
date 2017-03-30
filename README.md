# gulp

- babel + ES6
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
- imagemin
- imageminGuetzlis


## tasks

- `gulp` : 起動
- `gulp sass` : SCSSコンパイル
- `gulp js` : ES6からES5にトランスコンパイル
- `gulp note` : スタイルガイドを生成
- `gulp imagemin` : 画像圧縮


## memo
- 20170213 : ES2016を使用出来るように修正（JSのファイル名は「~.es.js」）、frontnote（style集）導入
- 20170313 : 新規ファイルを追加しても、エラーで止まらないように修正（gulp.watch → gulp-watch に変更）
- 20170316 : 画像圧縮のタスクを追加
- 20170330 : JPGの圧縮にGuetzliを使用

(1)` .babelrc`/`gulpfile.babel.js`を対象ディレクトリにコピー

(2) package.jsonを作成  
`npm init -y`

(3) プラグインをインストール
```
npm install -D gulp browser-sync babel-preset-es2015 babel-preset-es2016 gulp-sass gulp-cached gulp-notify gulp-plumber gulp-progeny gulp-babel gulp-rename gulp-replace gulp-frontnote gulp-watch gulp-imagemin imagemin-guetzli
```

(4) `gulpfile.babel.js`内のルートパスを変更
