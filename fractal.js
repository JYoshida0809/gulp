'use strict';

/* 新しいFractalインスタンスを作成し、必要に応じて別の場所で使用するためにエクスポート */
const fractal = module.exports = require('@frctl/fractal').create();

/* プロジェクトのタイトルを設定 */
fractal.set('project.title', 'Component Library');

/* コンポーネントの場所 */
fractal.components.set('path', __dirname + '/fractal_src/components');

/* ドキュメントページの場所 */
fractal.docs.set('path', __dirname + '/fractal_src/docs');

/* 静的のディレクトリを指定 */
fractal.web.set('static.path', __dirname + '/www');
fractal.web.set('static.mount', '/');

/* ビルド先を設定 */
fractal.web.set('builder.dest', __dirname + '/!library');
