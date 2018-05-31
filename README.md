# gulp

- browserSync
- babel + ES6
- sass
- images
- fractal


## tasks

- `gulp` : 起動
- `gulp sass` : SCSSコンパイル
- `gulp js` : ES6 → ES5にトランスコンパイル
- `gulp image` : 画像圧縮
- `gulp copy` : ルートと同階層に納品ファイル作成
- `gulp fractal:build` : コンポーネントライブラリの静的ページ作成


## memo

- 20171024 : 圧縮した画像ファイルをキャッシュし、複数回圧縮が実行されない様に変更
- 20180531 : gulp ver4.0.0対応、タスクの整理、plugin変更

(1)`.babelrc`/`gulpfile.babel.js`/`package.json`/`fractal_src`を対象ディレクトリにコピー

(2) プラグインをインストール（package.jsonから一括）
```
npm install
```

★更新を確認
```
npm update
```

(3) `gulpfile.babel.js`内のルートパス・設定を変更
