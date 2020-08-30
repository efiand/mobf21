const { series, watch } = require(`gulp`);
const tasks = require(`require-dir`)(`.`);
const { twighint, stylelint, eslint, copy, html, css } = tasks;
const browserSync = require(`browser-sync`).create();
const { COPY_SOURCE, ESLINT_SOURCE } = require(`../const`);

const reload = (done) => {
	browserSync.reload();
	done();
};

const server = () => {
	browserSync.init({
		cors: true,
		notify: false,
		proxy: `http://localhost:5000`,
		ui: false
	});

	watch(`source/**/*.twig`, series(twighint, html, reload));
	watch(`source/less/**/*.less`, series(stylelint, css, reload));
	watch(ESLINT_SOURCE, series(eslint));
	watch(COPY_SOURCE, series(copy, reload));
};

module.exports = server;
