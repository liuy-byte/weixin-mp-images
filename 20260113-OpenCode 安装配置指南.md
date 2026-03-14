# OpenCode 安装配置指南

[OpenCode](https://opencode.ai/) 开源 AI 编程助手。

---

## 一、安装

```bash
# 方式一（推荐）
curl -fsSL https://opencode.ai/install | bash

# 方式二
npm install -g opencode-ai --registry=https://registry.npmmirror.com
```

---

## 二、首次使用

```bash
cd /path/to/project
opencode
/init     # 初始化项目，生成 AGENTS.md
/connect  # 连接 LLM 提供商
```

**连接 LLM：**
1. 输入 `/connect`
2. 选择提供商（如 OpenCode Zen）
3. 在 https://opencode.ai/auth 获取 API Key 并粘贴

---

## 三、核心命令

| 命令 | 说明 |
|-----|------|
| `/init` | 初始化项目 |
| `/connect` | 连接 LLM 提供商 |
| `/undo` | 撤销更改 |
| `/redo` | 重做更改 |
| `/share` | 创建分享链接 |

---

## 四、交互技巧

- **Tab 键**：切换 Plan/Build 模式
- **@ 键**：引用项目文件
- **Ctrl+K**：打开搜索

---

## 五、常见问题

```bash
# 移除旧版本
npm uninstall -g opencode opencode-ai
```

---

## 相关链接

- [官网](https://opencode.ai/) | [文档](https://opencode.ai/docs)
