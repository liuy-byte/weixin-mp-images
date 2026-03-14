# Anthropic 大封号！已有开发者中招，这 3 种用法立刻停

> 有人昨晚还在用 OpenCode 跑通宵任务，今早打开发现账号没了。Anthropic 这波封号，Pro、Max 付费用户一样不例外。

## 一、两步收网，封死第三方

时间线很清晰：

**1 月 9 日**，Anthropic 在服务端部署新的校验机制，所有伪造官方 Claude Code 身份的第三方请求，全部返回同一条错误——

> *"This credential is only authorized for use with Claude Code."*

第一批中招的：OpenCode（10 万+ Star）、OpenClaw、Cline、RooCode，以及通过 Cursor 使用 Claude 的 xAI 员工。没有任何提前通知，直接断连。

**2 月 19 日**，Anthropic 把这条规则正式写进服务条款：

> Free、Pro、Max 订阅的 OAuth Token，不得用于任何第三方工具或 Agent SDK，违者视为违规。

技术封堵在前，条款封杀在后。封号已经在发生——Reddit 上出现帖子《Anthropic 正在封禁他们的 $200/月重度用户》，有人 Max 订阅续费后第二天账号就没了。1 月 27 日，开发者 Philipp Spiess 的封号截图在 X 上迅速传播，引发大规模讨论。

---

## 二、你中招了吗？对照自查

以下 3 种用法均属违规，用了就有封号风险：

- ❌ 用 OpenCode、OpenClaw、Cline、RooCode 等工具，登录的是 Claude 个人账号
- ❌ 把 Pro/Max 订阅的 OAuth Token 或登录凭证，配置进任何第三方客户端
- ❌ 用技术手段（如伪造请求头）绕过官方检测调用 Claude

**付费不等于豁免。订阅费也不退。**

有几点需要说清楚：

- 封号无提前通知，触发后账号直接不可用
- Anthropic 承认存在**误封**情况（无意触发过滤器的用户），官方表示会对这类账号主动解封
- 目前执法重点是重度滥用者——大量 token 消耗、自动化 Agent 长时间跑任务，普通轻度使用者风险相对较低
- 网上流传的"封号后已向当局举报"截图是**伪造的**，BleepingComputer 已核实，Anthropic 官方确认不存在向执法部门举报的情况

---

## 三、为什么突然收紧？

**账算不过来了**

Claude Max 订阅 $200/月，本有速率限制，在官方 Claude Code 内尚属可控。但第三方工具绕过了这套限制，让自动化 Agent 可以不间断地跑——等量的 API 调用走按量计费，轻松超过 $1000/月。一个 $200 的"自助餐"，被当成无限量供应来用，Anthropic 必然亏损。

**强硬操作，适得其反**

更戏剧性的是 OpenClaw 的故事。创始人 Peter Steinberger 一个人在维也纳做独立项目，60 天内积累了 **14 万+ GitHub Star**、用户在平台上创建超 **150 万个 AI Agent**。Anthropic 的回应是发商标投诉函、要求改名、切断 OAuth 访问——一套组合拳下来，这个本来基于 Claude 构建的顶流项目**直接投奔了 OpenAI**。2026 年 2 月 15 日，Sam Altman 亲自官宣 Steinberger 加入 OpenAI。

封住了开发者，送走了生态。

---

## 四、现在怎么办？三条路，各取所需

以下方案均已核实，截至 2026 年 2 月有效。

**✅ 路线一：换成 API Key，继续用原来的工具**

前往 [Anthropic Console](https://console.anthropic.com/) 申请 API Key，按量计费。OpenCode、Cline、RooCode 等工具全部支持 API Key 接入，配置后用法不变，从订阅变按量付费。

适合：重度使用者，接受按量计费。

**✅ 路线二：订阅只用官方渠道**

Claude.ai 网页端、Claude Code 官方 CLI，是 Pro/Max 订阅账号**唯一合规**的使用渠道。不折腾，最省心。

适合：日常对话、轻量开发，不跑大规模 Agent 任务。

**✅ 路线三：工具不换，换底层模型**

OpenCode 在封堵后数小时内完成改造，现已支持 OpenAI、Google Gemini、Groq、AWS Bedrock、OpenRouter 等多家提供商。OpenAI 也官方声明支持 OpenCode 用户接入其订阅。

工具习惯不用变，把模型从 Claude 换成其他提供商，照常跑任务。

适合：不想付 API 费用、又想继续用第三方工具的用户。

---

AI 大厂的管控只会越来越紧。这次 Anthropic 动手，不会是最后一次。

**关注本公众号**，封号动态、合规工具更新、替代方案变化，第一时间同步给你。

---

💡 有被这波封号影响到的，欢迎评论区说说你的情况。
