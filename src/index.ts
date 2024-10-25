import { marked } from "marked";
import { IConfig, IHeaderConfig } from "./interface";
import { getHeaderConfig, getTitles, headerConfigRegexp } from "./utils";

/**
 * 目的：将 markdown 文本，按照一定规则，转化成一个对象，这个对象包含头信息配置，目录配置、以及转化HTML的字符串。
 * 1. 提取头部配置信息
 * 2. 提取目录，目前只支持 h3 h4
 * 3. html 中 h3 h4 标签中添加 id，方面锚点
 * @param originContent 原始内容
 */
export default (originContent: string = ""): IConfig => {
  const headerConfig: IHeaderConfig = getHeaderConfig(originContent);

  // 删除头信息内容
  const otherContent = originContent.replace(headerConfigRegexp, "");
  let markedContent: string = marked(otherContent) as string;

  // 提取目录
  const catalogConfig = getTitles(markedContent);
  // 标题 h3 h4 上添加 id，方便埋点
  markedContent = markedContent.replace(
    /(<h[3-4]>)([\d\D]+?)(<\/h[3-4]>)/g,
    (str: string, $1: string, $2: string, $3: string) => {
      // 去除多余的标签
      $2 = $2.replace(/<\w+>/g, "").replace(/<\/\w+>/g, "");
			// h3 h4 标签上添加 id
      $1 = $1.replace(/^(<h[3-4])>$/, `$1 id="${$2}">`);

      return `${$1}${$2}${$3}`;
    }
  );

  return {
    originContent,
    headerConfig,
    markedContent,
    catalogConfig,
  };
};
