# gulp

- babel + ES6
- browserSync
- sass
- fractal
- postcss


## tasks

- `gulp` : 起動
- `gulp sass` : SCSSコンパイル
- `gulp js` : ES6 → ES5にトランスコンパイル
- `gulp image` : 画像圧縮
- `gulp copy` : ルートと同階層に納品ファイル作成
- `fractal build` : コンポーネントライブラリの静的ページ作成


## memo

- 20170213 : ES2016を使用出来るように修正（JSのファイル名は「~.es.js」）、frontnote（style集）導入
- 20170313 : 新規ファイルを追加しても、エラーで止まらないように修正（gulp.watch → gulp-watch に変更）
- 20170316 : 画像圧縮タスクを追加
- 20170330 : jpg圧縮にGuetzliを使用
- 20170406 : copy（納品ファイル作成）タスクを追加
- 20170411 : pugタスクを追加
- 20170421 : png圧縮にpngquantを使用
- 20170515 : 画像圧縮のプラグインを変更
- 20170601 : postCSS（autoprefixer,css-mqpacker）、fractal（コンポーネントライブラリ）を導入
- 20170905 : pugタスクを削除、sourcemapsをデフォルトに、SassのoutputStyleをexpandedに
- 20170929 : es.js、scssの初回コンパイル時に、全てのファイルをコンパイルしない様に修正
- 20171023 : ~~圧縮した画像ファイルを、ルートと同階層の[img_dist]にはき出す様に変更~~
- 20171024 : 圧縮した画像ファイルをキャッシュし、複数回圧縮が実行されない様に変更
- 20171025 : 設定を変更しやすい様に、オプションの変数を追加

(1)` .babelrc`/`gulpfile.babel.js`/`.image-cache`/`fractal_src`を対象ディレクトリにコピー

(2) package.jsonを作成
`npm init -y`

(3) ルートと同階層に、ターミナルからプラグインをインストール
```

npm install -D gulp browser-sync babel-preset-es2015 babel-preset-es2016 babel-preset-es2017 gulp-if gulp-sass gulp-cssmin gulp-cached gulp-asset-cache gulp-notify gulp-plumber gulp-progeny gulp-babel babel-core gulp-rename gulp-replace gulp-watch gulp-image gulp-postcss gulp-sourcemaps gulp-autoprefixer css-mqpacker @frctl/fractal

```

(4) `gulpfile.babel.js`内のルートパス・設定を変更
