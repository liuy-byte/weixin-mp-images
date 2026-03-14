# Superpowers｜6.4万 Star，让 Claude Code 从"自由散漫"变成"守纪律的工程师"

> 用了好几个月 Claude Code，发现一个规律：模型越强，越容易"随心所欲"。每个新 Session 要重新交代背景，Bug 修着修着目标就漂了，提交前也不知道有没有漏掉测试。问题不在模型，在于缺少一套稳定的工程化工作流。

---

GitHub 上有个叫 **Superpowers** 的项目，已有 **6.4 万+ Star**，专门解决这个问题。

它不是提示词库，而是一套**工程化技能体系**——把人类几十年积累的软件工程经验（TDD、Code Review、系统化调试），内化成 Claude Code 的本能行为。

![Superpowers 项目概览](https://raw.githubusercontent.com/liuy-byte/weixin-mp/main/images/superpowers-overview.png)

---

## 一、Claude Code 的典型失控场景

长期使用会暴露几个固定问题：

- **上下文健忘**：每个新 Session 重新讲需求，消耗 30 分钟起步
- **流程反复**：同一个调试步骤反复描述，效率低下
- **目标漂移**：修 Bug 改着改着偏离了原始需求
- **质量盲区**：提交前是否遗漏测试，全靠人工记忆

根源只有一个：**缺少强制执行的工程化流程**。

---

## 二、Superpowers 是什么

核心定位是给 Claude Code **安装 App**。

每个 Skill 是一个独立的工作模块，覆盖软件开发全链路。安装后，Claude 不再被动等待指令，而是能通过斜杠命令主动引导你完成标准化流程。

核心理念：**Process over Prompt（流程优于提示）**

| 技能模块 | 功能描述 | 触发时机 |
|----------|----------|----------|
| 🧠 规划 & 头脑风暴 | 结构化提问完善想法，生成设计文档 | 编码前期 |
| ⚙️ 开发与重构 | 基于设计方案执行代码实现 | 设计评审后 |
| 🧪 测试驱动开发 | 强制 Red-Green-Refactor 循环 | 实现阶段 |
| 🐞 系统化调试 | 问题诊断与修复 | 故障处理 |
| 🤝 代码审查 | 按严重程度分类，生成审查意见 | 任务间隙 |
| 🚀 提交前验证 | 测试验证、分支清理、合并检查 | 开发完成 |

**重要**：你无需记住所有流程，Skill 会在合适时机自动触发。

---

## 三、7 个阶段完整工作流

![Superpowers 工作流程](https://raw.githubusercontent.com/liuy-byte/weixin-mp/main/images/superpowers-workflow.png)

**第一阶段：头脑风暴与设计** `/brainstorm`

Claude 通过结构化问题引导明确需求，探索多种方案，自动生成设计文档作为后续开发的参考基线。

**第二阶段：隔离开发环境** `/using-git-worktrees`

基于 Git worktrees 创建独立工作分支，避免污染主分支，验证测试套件基线状态，建立可回滚的环境。

**第三阶段：编写执行计划** `/write-plan`

将设计分解为原子级小任务。每个任务包含：精确的文件路径、完整的代码片段、具体的验证步骤，形成"任务检查清单"。

**第四阶段：子代理驱动执行** `/execute-plan`

为每个任务派遣独立子代理执行（避免单 Session 过长导致上下文漂移）。两阶段审查：先检查规范符合性，再检查代码质量。支持设置人工检查点，关键决策由人类确认。

**第五阶段：测试驱动开发** `/tdd-cycle`

强制走完 Red-Green-Refactor 循环：

- **Red**：先写预期失败的测试，确认其失败
- **Green**：写最小化代码使测试通过
- **Refactor**：清理结构，删除冗余实现

> **实战案例**：某后端接口重构项目，启用 TDD 循环后，Bug 回归率从 23% 降至 4%，代码审查时间从平均 2 小时缩短至 40 分钟。

**第六阶段：代码审查** `/request-review`

按严重程度分类问题（Critical / Major / Minor），严重问题自动阻碍进度，需修复后才能继续。

**第七阶段：完成与清理** `/complete-branch`

验证所有测试通过，提供操作选项（合并主分支 / 创建 PR / 保留 / 丢弃），自动清理 Git worktree 释放资源。

---

## 四、10 分钟安装上手

Superpowers 利用 Claude Code 内置插件系统，两条命令搞定：

```bash
# 第一步：注册插件市场
/plugin marketplace add obra/superpowers-marketplace

# 第二步：安装插件
/plugin install superpowers@superpowers-marketplace
```

安装后所有 Skill 自动集成到命令系统，无需额外配置。

---

## 五、适合哪些场景

| 场景 | 典型问题 | 解决方案 |
|------|----------|----------|
| 新项目启动 | 需求不清，方向易漂移 | `/brainstorm + /write-plan` 前置设计 |
| 团队协作 | 代码质量参差，审查成本高 | `/request-review` 自动卡点严重问题 |
| 快速迭代修复 | Bug 反复出现 | `/tdd-cycle` 强制走完测试循环 |
| 技术债处理 | 重构范围不清，容易超 scope | `/using-git-worktrees + /execute-plan` 隔离开发 |

---

Superpowers 最高明的地方：把 AI 变得更**守纪律**，而非更聪明。

✅ **可追溯性**：每个决策都有记录（设计文档、计划、审查意见）
✅ **可复现性**：工作流固定，不同 Session 间质量一致
✅ **可控性**：关键节点设置人工确认，AI 不会越权
✅ **可扩展性**：子代理并行执行，不受单 Session 限制

我们不缺能写代码的 AI，缺的是能遵守工程规范的 AI。投入 10 分钟装插件，省下的是每天数小时的"流程调教"时间。

---

## 相关链接

微信内长按复制链接到浏览器打开。

**Superpowers 项目**
```
GitHub：https://github.com/obra/superpowers
```
