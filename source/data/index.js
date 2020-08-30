const { descr, host, projectsList, siteHeading, siteName } = require(`./raw`);
const pages = [
	{
		page: `index`,
		title: `Главная`
	},
	{
		page: `news`,
		title: `Новости`
	},
	{
		page: `fond`,
		title: `Наш фонд`
	},
	{
		page: `projects/index`,
		submenu: projectsList,
		title: `Наши проекты`
	},
	{
		page: `help`,
		title: `Как помочь`
	},
	{
		page: `become`,
		title: `Становись волонтером`
	},
	{
		page: `info`,
		title: `Полезно знать`
	},
	{
		hideInMenu: true,
		page: `404`,
		title: `Страница не найдена`
	}
];

module.exports = {
	get({ page }) {
		const pageFindCb = (item) => item.page === page;
		const isProjectPage = (/projects\//).test(page);
		const { title } = pages.find(pageFindCb) || projectsList.find(pageFindCb);

		return {
			descr,
			host,
			isProjectPage,
			pages: pages.filter((item) => !item.hideInMenu),
			projectsList,
			siteHeading,
			siteName,
			title,
			url: `${host}/${page}.html`
		};
	}
};
