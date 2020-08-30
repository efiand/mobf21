module.exports = {
	COPY_SOURCE: [
		`source/as-is/**/.*`,
		`source/as-is/**/*.*`
	],
	DIST: `public`,
	ESLINT_SOURCE: [
		`gulpfile.js/**/*.js`,
		`source/data/**/*.js`,
		`source/js/**/*.js`
	]
};
