# 在 Claude Code 中使用 MiniMax-M2.1 模型进行 AI 编程

用过 Claude Code 的开发者都知道，它是目前最强的 AI 编程工具之一——直接在终端运行，能读懂整个项目，自动写代码、改代码、提交 Git。

**但痛点也很明显**：Claude Pro 订阅 $20/月（约140元），每5小时只能用10-20次，稍微多写点代码就超限了。

好消息是，国产模型 **MiniMax M2.1** 来了。**8% 的价格，4 倍的用量，性能接近 Claude Opus 4.5**。

---

## 一、为什么选择 MiniMax M2.1

### 性能数据

MiniMax M2.1 是 2025年12月发布的新一代编程模型，在多项权威基准测试中表现亮眼：

- **Multi-SWE-Bench**：49.4%（超越 Claude 3.5 Sonnet）
- **多语言编程**：Rust、Java、Go、C++ 全面优化，SOTA 水平
- **VIBE-Web**：91.5分，接近 Claude Opus 4.5
- **响应速度**：TPS 100+，体感非常流畅

简单说：**便宜、快、够用**。

---

## 二、安装 Claude Code

根据你的操作系统选择对应的安装方式：

### macOS / Linux / WSL

**推荐使用官方安装脚本**（自动处理所有依赖）：
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**或使用 Homebrew**：
```bash
brew install --cask claude-code
```

### Windows

**PowerShell**：
```powershell
irm https://claude.ai/install.ps1 | iex
```

**CMD**：
```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

### 使用 NPM 安装（跨平台）

如果你已经安装了 Node.js 18+：
```bash
npm install -g @anthropic-ai/claude-code
```

### 首次登录

安装完成后，在终端输入：
```bash
claude
```

首次运行会提示你选择登录方式：

```
Select login method:

❯ 1. Claude account with subscription · Pro, Max, Team, or Enterprise

  2. Anthropic Console account · API usage billing
```

**重要**：如果要使用 MiniMax，请选择 **2. Anthropic Console account**（API 使用计费）方式，这样才能通过 cc-switch 切换到 MiniMax API。

---

## 三、使用 cc-switch 配置 MiniMax

**cc-switch** 是一个配置切换工具，一键切换不同的 AI 服务商。

### 安装 cc-switch

**macOS**
```bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
```

**Windows / Linux**
- [Windows 安装包](https://github.com/farion1231/cc-switch/releases/download/v3.8.3/CC-Switch-v3.8.3-Windows.msi)
- [Linux AppImage](https://github.com/farion1231/cc-switch/releases/download/v3.8.3/CC-Switch-v3.8.3-Linux.AppImage)

### 配置步骤

**步骤 1**：启动 cc-switch，点击右上角 + 号

![步骤 1](https://raw.githubusercontent.com/liuy-byte/weixin-mp/main/images/ScreenShot_2026-01-03_111445_023.png)

**步骤 2**：选择 MiniMax，填入 API Key

![步骤 2](https://raw.githubusercontent.com/liuy-byte/weixin-mp/main/images/ScreenShot_2026-01-03_111920_590.png)

**步骤 3**：点击启用切换（切换后重启终端生效）

![步骤 3](https://raw.githubusercontent.com/liuy-byte/weixin-mp/main/images/ScreenShot_2026-01-03_112111_034.png)

配置完成后，终端输入 `claude` 即可启动：

![Claude Code](https://raw.githubusercontent.com/liuy-byte/weixin-mp/main/images/ScreenShot_2026-01-03_120029_074.png)

---

**相关链接**：
- [MiniMax 开放平台](https://platform.minimax.chat)（获取 API Key）
- [cc-switch GitHub](https://github.com/farion1231/cc-switch)
- [Coding Plan 优惠活动](https://platform.minimaxi.com/docs/coding-plan/promotion)

![Coding Plan](https://raw.githubusercontent.com/liuy-byte/weixin-mp/main/images/wx_20260103113437_449_5.jpg)
