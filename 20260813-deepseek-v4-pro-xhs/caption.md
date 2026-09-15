DeepSeek V4 Pro 正式版，就这么悄悄上线了

DeepSeek 官方 API 价格页已经更新：deepseek-v4-pro 背后的模型版本，变成了 DeepSeek-V4-Pro-0813。

如果你已经在用 deepseek-v4-pro，代码不用动。model 名保持不变，现在调用的就是 0813，原来的接入方式可以继续用。

规格还是这些：

- 1M 上下文
- 最大输出 384K
- 推理强度支持 low、high、max
- thinking 默认开启，默认档位是 high
- Responses API 已支持，可以接 Codex

这次更值得看的，其实是 Agent 能力。

正式版评测表里，0813 已经单独列了一栏。和 V4 Pro Preview 相比，几项成绩涨得很明显：

- Terminal Bench 2.1：72.1 → 87.9
- NL2Repo：38.5 → 61.5
- Cybergym：52.7 → 83.3
- DeepSWE：12.8 → 62.7
- Toolathlon-Verified：55.9 → 74.1

这几项看的不只是“会不会写代码”，还包括操作终端、理解代码仓库、处理安全任务和连续调用工具。尤其是 DeepSWE，从 12.8 到 62.7，变化确实不小。

这里也顺手说清楚：0813 是版本号，Max 是推理档位，不是一回事。这次表里的成绩直接写在 DeepSeek-V4-Pro-0813 一栏，和之前模型卡里的 V4 Pro Max 跑分也不是同一组测试，不能混着比较。

简单说，0813 就是当前 V4 Pro 正式版的版本号。已经接入 deepseek-v4-pro 的项目不用换 model 名；更值得重新测试的，是它在 coding 和 Agent 任务里的表现。

榜单终归是榜单。我更想看看它放进真实项目后，能不能少卡几次、少返工几轮，把长任务稳定跑完。

资料来源：DeepSeek 官方 Models & Pricing、Thinking Mode、Responses API，以及 DeepSeek V4 Pro 正式版 Agent 评测表

#DeepSeek #DeepSeekV4 #大模型 #AI #Codex #程序员 #人工智能 #技术资讯
