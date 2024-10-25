### 描述

将 markdown 文本，按照一定规则，转化成一个对象，这个对象包含头信息配置、目录配置、以及通过 [marked](https://github.com/markedjs/marked/tree/master) 转化后 HTML 的字符串。同时，会自动在 HTML 文本字符串中 h3 h4 中添加 id 值，id 取 h3 h4 的标题。

> 需注意：提取目录时，目前只支持 h3 h4

### 下载

```sh
npm install --save @wangyuegyq/parse-markdown
```

### 使用

```javascript
import parseMarkdown from "@wangyuegyq/parse-markdown";

const config = parseMarkdown("---\ntitle: parse-markdown\n---\n\n### 大标题\n\n#### 小标题\n\n小标题")

// 返回结果：
{
	headerConfig: {
		title: "parse-markdown"
	},
	markedContent: "<h3 id=\"大标题\">大标题</h3>\n<h4 id=\"小标题\">小标题</h4>\n<p>小标题</p>\n",
	originContent: "---\ntitle: parse-markdown\n---\n\n### 大标题\n\n#### 小标题\n\n小标题",
	catalogConfig: [
		{
			title: "大标题",
			children: [
 				{ title: "小标题" }
			]
		}
	]
}
```

### DEMO

可以进入这个地址 [https://www.wangyuegyq.top/mark](https://www.wangyuegyq.top/mark)，进行操作

### API

#### 1. headerConfig

头部配置信息

你可以再 markdown 头部信息，以 --- 开始，以 --- 结束，中间以 `key: value` 形式添加配置。

```
---
title: parse-markdown
---

```

#### 2. markedContent

通过 [marked](https://github.com/markedjs/marked/tree/master) 转化成 html 文本。

其内容不包含头信息，同时 h3 h4 标签上会添加 id 属性

#### 3. originContent

传入的 markdown 文本原始内容

#### 4. catalogConfig

内容目录配置

目前只支持 h3 h4，如果你需要支持锚点，只需要在渲染目录时，将目录配置中的 title，传给href。

例如：

```html
<!-- 目录标题 -->
<a href="#大标题">大标题</a>
```

