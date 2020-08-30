const { src, dest } = require(`gulp`);
const { plumber, data, twig, htmlmin, w3cHtmlValidator } = require(`gulp-load-plugins`)();
const { DIST } = require(`../const`);
const { getJSON } = require(`../utils`);

const html = () => src(`source/twig/pages/**/*.twig`)
	.pipe(plumber())
	.pipe(data((file) => {
		const page = file.path.replace(/\\/g, `/`).replace(/^.*?twig\/pages\/(.*)\.twig$/, `$1`);
		const isDev = !process.env.NODE_ENV;

		return {
			isDev,
			page,
			pathToRoot: page.replace(/[^/]/g, ``).replace(/\//g, `../`),
			...getJSON(`../source/data`, { isDev, page })
		};
	}))
	.pipe(twig())
	.pipe(htmlmin({
		collapseBooleanAttributes: true,
		collapseWhitespace: true,
		decodeEntities: true,
		html5: true,
		includeAutoGeneratedTags: false,
		minifyCSS: true,
		minifyJS: true,
		processConditionalComments: true,
		quoteCharacter: `"`,
		removeComments: true,
		removeEmptyAttributes: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		trimCustomFragments: true,
		useShortDoctype: true
	}))
	.pipe(dest(DIST))
	.pipe(w3cHtmlValidator())
	.pipe(w3cHtmlValidator.reporter());

module.exports = html;
