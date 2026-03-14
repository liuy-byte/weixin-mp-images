# 在 Claude Code 中使用 MiniMax-M2.1 模型进行 AI 编程（2025年1月，v2.1.9）

MiniMax M2.1 提供接近 Claude Opus 4.5 的性能，价格仅为 8%，用量提升 4 倍。

## 安装 Claude Code

```bash
# macOS/Linux
curl -fsSL https://claude.ai/install.sh | bash

# 或使用 npm
npm install -g @anthropic-ai/claude-code

# 验证安装
claude -v
```

## 配置 MiniMax

### 步骤 1：创建配置文件

**macOS & Linux**：`~/.claude/settings.json`  
**Windows**：`用户目录/.claude/settings.json`

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "填写你的API密钥",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1,
    "ANTHROPIC_MODEL": "MiniMax-M2.1",
    "ANTHROPIC_SMALL_FAST_MODEL": "MiniMax-M2.1",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "MiniMax-M2.1",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "MiniMax-M2.1",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "MiniMax-M2.1"
  },
  "includeCoAuthoredBy": false,
  "language": "Chinese",
  "permissions": {
    "defaultMode": "bypassPermissions"
  }
}
```

### 步骤 2：跳过引导

**macOS & Linux**：`~/.claude.json`  
**Windows**：`用户目录/.claude.json`

```json
{
  "hasCompletedOnboarding": true
}
```

## 使用方法

1. 将 `MINIMAX_API_KEY` 替换为你的 MiniMax API Key
2. 保存配置文件
3. 终端运行 `claude` 即可使用

**获取 API Key**：MiniMax 官网
https://minimaxi.com

## 配置 MCP（图片理解 & 网络搜索）

### 安装 uvx

```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 配置 MCP 服务器

编辑 `~/.claude.json` 文件，添加 MCP 配置：

```json
{
  "hasCompletedOnboarding": true,
  "mcpServers": {
    "MiniMax": {
      "command": "uvx",
      "args": [
        "minimax-coding-plan-mcp",
        "-y"
      ],
      "env": {
        "MINIMAX_API_KEY": "填写你的API密钥",
        "MINIMAX_API_HOST": "https://api.minimaxi.com"
      }
    }
  }
}
```

### MCP 功能

配置完成后，Claude Code 将支持：
- **web_search**：网络搜索功能
- **understand_image**：图片理解功能

---

**相关链接**：

📖 Claude Code 接入指南
https://platform.minimaxi.com/docs/coding-plan/claude-code

🎁 Coding Plan 优惠活动  
https://platform.minimaxi.com/subscribe/coding-plan?code=5ZCz1aOfTD&source=link

🔧 MCP 使用指南
https://platform.minimaxi.com/docs/coding-plan/mcp-guide

🌐 MiniMax 官网（获取 API Key）
https://minimaxi.com

![Coding Plan](https://raw.githubusercontent.com/liuy-byte/weixin-mp-images/main/images/IMG_8137.jpg)