DeepSeek Harness 插件开发，5 行代码入门

DeepSeek 8 月 13 日开源的 Agent 框架 dsh，3 天涨了 12.7 万 star，口号是「一切皆插件」：模型、工具、UI、连 agent 循环本身都是插件。

这组图把「怎么写插件」一次讲完：

- 最小插件：导出 name + apply，5 行就是一个合法插件
- 写个工具：defineTool 注册，参数 schema 自动校验、自动进系统提示词
- 跑起来：--patch 本地挂载，Web UI 里让模型直接调用
- 三种形态：工具 / 钩子 / UI 协议，产品功能全是扩展点上的监听器
- 发布：声明 dsh.bundle.patch，挂 dsh-plugin topic 就能被搜到

官方教程全中文，就在主仓库 docs/ 目录下。七章 Cordis 教程不需要 API Key，跟着敲，第一个插件今晚就能写完。

代码全部来自官方文档。仓库：github.com/deepseek-ai/deepseek-harness

#DeepSeek #DeepSeekHarness #AI编程 #开源 #Agent #程序员 #人工智能 #技术资讯
