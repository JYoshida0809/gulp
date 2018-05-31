# gulp

- browserSync
- babel + ES6
- sass(autoprefixer,min)
- images
- fractal


## tasks

- `gulp` : 起動
- `gulp styles` : SCSS → CSS
- `gulp scripts` : ES6 → ES5
- `gulp images` : 画像圧縮
- `gulp fbuild` : コンポーネントライブラリを静的書き出し


## memo

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
