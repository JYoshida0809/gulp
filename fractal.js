'use strict';

const fractal = module.exports = require('@frctl/fractal').create();

/* 設定 */
fractal.set('project.title', 'Component Library');
fractal.components.set('path', __dirname + '/fractal_src/components');
fractal.docs.set('path', __dirname + '/fractal_src/docs');
fractal.web.set('static.path', __dirname + '/www');
fractal.web.set('builder.dest', __dirname + '/!library');
