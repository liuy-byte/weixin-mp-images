# PUA｜专治 AI 编程摆烂，修复率实测提升 36%

> 调了两小时，Claude Code 回了一句："这个问题建议您手动处理。" 工具还在，日志还在，就是不想动了。

![PUA 项目封面](https://github.com/tanweai/pua/raw/main/assets/hero.jpeg)

GitHub 上有个叫 **PUA** 的插件，专门盯着 AI 不让它溜。

---

## 一、AI 编程的5种摆烂姿势

用久了会发现，AI 偷懒是有套路的：

| 模式 | 表现 |
|------|------|
| 暴力重试 | 同一命令跑几遍，失败就放弃 |
| 甩锅 | "建议您手动处理" |
| 工具闲置 | 明明能 WebSearch，就是不搜 |
| 磨洋工 | 反复微调，原地打转 |
| 被动等待 | 修了表面就停，不往深查 |

PUA 的思路很直接：失败次数越多，施压越重，直到干完为止。

---

## 二、压力升级系统

4个等级，失败越多越不让 AI 退出：

| 失败次数 | 等级 | 强制动作 |
|---------|------|---------|
| 第2次 | L1 温和失望 | 换一个本质不同的方案 |
| 第3次 | L2 灵魂拷问 | WebSearch + 读源码 |
| 第4次 | L3 361考核 | 完成7项检查清单 |
| 第5次+ | L4 毕业警告 | 拼命模式 |

L2 直接堵死"查不到"的借口——搜了吗？源码看了吗？

![压力升级系统](https://github.com/tanweai/pua/raw/main/assets/pua1.jpg)

触发方式两种：自动（连续失败2次、或 AI 准备说"我无法解决"时）和手动（输入 `/pua`）。

---

## 三、三条铁律

比压力系统更底层的约束：

- **穷尽一切** — 没用尽所有方案前，不许说无法解决
- **先做后问** — 有工具先用，提问必须带诊断结果
- **主动出击** — 端到端交付，不等人推

![三条铁律](https://github.com/tanweai/pua/raw/main/assets/pua2.jpg)

---

## 四、调试方法论

PUA 内置了一套5步调试流程，源自阿里三板斧，解决"有心无力"：

1. **闻味道** — 把所有尝试列出来，找共同的失败模式
2. **揪头发** — 逐字读报错 → WebSearch → 读源码 → 验证环境
3. **照镜子** — 这个方向重复过吗？最简单的可能排除了吗？
4. **执行** — 新方案必须本质不同，不是同一条路跑快一点
5. **复盘** — 解决了什么，顺手检查关联问题

![调试方法论](https://github.com/tanweai/pua/raw/main/assets/pua3.jpg)

---

## 五、Claude Code 安装

```bash
# 方式一：marketplace 安装
claude plugin marketplace add tanweai/pua
claude plugin install pua@pua-skills

# 方式二：手动
git clone https://github.com/tanweai/pua.git ~/.claude/plugins/pua
```

装完直接用，输入 `/pua` 手动触发，或等 AI 连续失败自动介入。

---

实测9个场景、18组对照：修复点数 +36%，验证次数 +65%，工具调用 +50%，隐藏问题发现率 +50%。

不是模型问题，是管理问题。

---

## 相关链接

微信内长按复制链接到浏览器打开。

**PUA 项目**
```
GitHub：https://github.com/tanweai/pua
在线体验：https://openpua.ai
```
