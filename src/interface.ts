export type IHeaderConfig = {
  [key: string]: string;
};

export type ICatalogConfig = {
  title: string;
  children?: ICatalogConfig[];
};

// 信息配置
export type IConfig = {
  /**
   * markdown文本原始内容
   */
  originContent: string;
  /**
   * 头信息
   */
  headerConfig: IHeaderConfig;
  /**
   * 刨除头信息配置后，通过 marked 转化为 html
   */
  markedContent: string;
  /**
   * 目录配置
   */
  catalogConfig: ICatalogConfig[];
};
