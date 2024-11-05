import { IHeaderConfig, ICatalogConfig } from "./interface";

// 头信息配置正则表达式
export const headerConfigRegexp = /^\-{3}([\d\D]+?)\-{3}/;

/**
 * 头信息配置项
 * @param originContent string markdown文本原始内容
 * @returns IHeaderConfig 头信息配置项
 */
export const getHeaderConfig = (originContent: string = ""): IHeaderConfig => {
	const config: IHeaderConfig = {};
	const res = headerConfigRegexp.exec(originContent) || [];
	// 匹配的第一个子表达式
	const str = res[1];

	if (!str) return {};

	const strsList: string[] = str
		.replace(/^\n/, "")
		.replace(/\n$/, "")
		.split("\n");

	strsList.forEach((str: string = "") => {
		const arr: string[] = str.split(/:\s/);
		config[arr[0]] = arr.splice(1).join('').trim();
	});

	return config;
};

/**
 * 目录提取，只支持h3 h4
 * @param markedContent HTML 文本字符串，排除头信息外内容，并通过 marked 将其转化成 html
 */
export const getTitles = (markedContent: string) => {
	const res = markedContent.match(/<h[3-4]>([\d\D]+?)<\/h[3-4]>/g) || [];
	const config: ICatalogConfig[] = [];
	res.forEach((str: string) => {
		// 1. 去除开始标签及结束标签，包含其内容
		// 2. 针对目录中的&lt; 转化为<
		const title = str.replace(/<\w+>/g, "").replace(/<\/\w+>/g, "").replace(/&lt;/g, '<');

		if (/^<h3>/.test(str)) {
			config.push({
				title,
				children: [],
			});
		}

		if (/^<h4>/.test(str)) {
			(config[config.length - 1]?.children || []).push({
				title,
			});
		}
	});
	return config;
};
