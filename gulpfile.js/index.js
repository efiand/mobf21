'use strict';

const { series, parallel } = require(`gulp`);
const tasks = require(`require-dir`)(`tasks`);

const { twighint, stylelint, eslint, clean, copy, html, css, server } = tasks;

const test = parallel(twighint, stylelint, eslint);
const build = series(parallel(test, clean), parallel(copy, css));

exports.test = test;
exports.build = series(build, html);
exports.default = series(build, server);
