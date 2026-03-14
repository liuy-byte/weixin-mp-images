# macOS/Linux 一键部署 OpenClaw 实战：MiniMax M2.5 国内接入完整记录

> 从零开始，15 分钟搭建本地 AI 助手。Ubuntu 真实部署过程 + MiniMax CN API Key 配置全记录。

---

## 前言

本文记录我在 Ubuntu 服务器上一键部署 OpenClaw 的完整过程，从安装到配置 MiniMax M2.5 国内模型，全程 15 分钟。

所有命令行输出都是真实记录，可以直接复制使用。

---

## 一、准备工作

### 系统要求

| 配置项 | 我的环境 | 兼容范围 |
|--------|---------|---------|
| 操作系统 | Ubuntu 20.04 | macOS 10.15+ / Linux 各发行版 |
| 网络环境 | 国内直连 | 可访问 openclaw.ai |

Node.js（v18+）和 Git 由安装脚本自动处理，无需手动安装。

### 获取 MiniMax API Key

1. 访问 https://platform.minimaxi.com/
2. 注册/登录账号
3. 进入 **API Keys** 页面
4. 点击"创建新密钥"
5. 复制并保存 API Key（格式：`sk-cp-...`）

---

## 二、一键部署全过程

### 执行安装命令

在终端执行：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

### 安装过程实录

以下是完整的安装输出（我添加了关键步骤注释）：

```bash
╭───────────────────────────────────────────────────────────────╮
│                                                               │
│  🦞 OpenClaw Installer                                        │
│  Turning "I'll reply later" into "my bot replied instantly".  │
│  modern installer mode                                        │
│                                                               │
╰───────────────────────────────────────────────────────────────╯

✓ gum bootstrapped (temp, verified, v0.17.0)
✓ Detected: linux  # 👉 自动检测操作系统

Install plan

OS                  linux
Install method      npm
Requested version   latest
INFO Existing OpenClaw installation detected, upgrading  # 👉 检测到旧版本，自动升级

[1/3] Preparing environment

✓ Node.js v22.22.0 found  # 👉 确认 Node.js 版本符合要求

[2/3] Installing OpenClaw

✓ Git already installed
INFO Installing OpenClaw v2026.2.15  # 👉 当前最新版本
✓ OpenClaw npm package installed
✓ OpenClaw installed

[3/3] Finalizing setup

INFO Running doctor to migrate settings  # 👉 自动迁移旧配置
✓ Doctor complete

🦞 OpenClaw installed successfully (2026.2.15)!
Molting complete. Please don't look at my soft shell phase.
```

### 关键步骤

**环境检测**：脚本自动检测并安装 Node.js（v18+）和 Git

**版本管理**：检测到旧版会自动升级并备份配置

**Doctor 诊断**：健康检查 + 配置迁移 + 环境检测

### 安装后诊断

安装完成后会自动运行 `openclaw doctor`，输出系统状态：

```bash
INFO Running openclaw doctor

🦞 OpenClaw 2026.2.15 (3fe22ea) — Turning "I'll reply later" into "my bot replied instantly".

┌  OpenClaw doctor
│
◇  Security ─────────────────────────────────╮
│                                            │
│  - No channel security warnings detected.  │
│  - Run: openclaw security audit --deep     │
│                                            │
├────────────────────────────────────────────╯
│
◇  Skills status ────────────╮
│                            │
│  Eligible: 4               │  # 👉 可用的功能模块
│  Missing requirements: 45  │
│  Blocked by allowlist: 0   │
│                            │
├────────────────────────────╯
│
◇  Plugins ──────╮
│                │
│  Loaded: 4     │  # 👉 已加载插件数量
│  Disabled: 32  │
│  Errors: 0     │
│                │
├────────────────╯
│
└  Doctor complete.
```

### Gateway 自动启动

诊断完成后，系统会自动重启 Gateway 服务：

```bash
INFO Gateway daemon detected; restarting
✓ Gateway restarted

🦞 OpenClaw 2026.2.15 (3fe22ea) — I read logs so you can keep pretending you don't have to.

Dashboard URL: http://127.0.0.1:18789/#token=ea710491e8584c3c41d73fb405201e68155af5ef6d50fe30
Copied to clipboard.
```

**远程访问提示**（如果在服务器上部署）:

```bash
No GUI detected. Open from your computer:
ssh -N -L 18789:127.0.0.1:18789 liuy@your-server-ip

Then open:
http://localhost:18789/
http://localhost:18789/#token=ea710491e8584c3c41d73fb405201e68155af5ef6d50fe30
```

> 💡 **提示**: 如果在远程服务器部署，可以通过 SSH 隧道访问 Web 界面

---

## 三、MiniMax M2.5 国内接入实战 🔥

### 初始化配置

运行配置向导：

```bash
openclaw onboard --install-daemon
```

### 配置流程实录

**第一步：安全声明确认**

```bash
◇  Security ──────────────────────────────────────────────────────────────────────────────╮
│                                                                                         │
│  Security warning — please read.                                                        │
│                                                                                         │
│  OpenClaw is a hobby project and still in beta. Expect sharp edges.                     │
│  This bot can read files and run actions if tools are enabled.                          │
│  A bad prompt can trick it into doing unsafe things.                                    │
│                                                                                         │
│  If you're not comfortable with basic security and access control, don't run OpenClaw.  │
│  Ask someone experienced to help before enabling tools or exposing it to the internet.  │
│                                                                                         │
├─────────────────────────────────────────────────────────────────────────────────────────╯
│
◇  I understand this is powerful and inherently risky. Continue?
│  Yes  # 👉 选择 Yes 继续
```

**第二步：选择配置模式**

```bash
◇  Onboarding mode
│  QuickStart  # 👉 快速配置模式，推荐新手
```

**第三步：检测现有配置**

```bash
◇  Existing config detected ─────────╮
│                                    │
│  workspace: ~/.openclaw/workspace  │
│  model: minimax-cn/MiniMax-M2.5    │  # 👉 我之前配置过
│  gateway.mode: local               │
│  gateway.port: 18789               │
│  gateway.bind: loopback            │
│                                    │
├────────────────────────────────────╯
│
◇  Config handling
│  Update values  # 👉 更新配置（首次安装会跳过此步）
```

**第四步：Gateway 设置确认**

```bash
◇  QuickStart ─────────────────────────────╮
│                                          │
│  Keeping your current gateway settings:  │
│  Gateway port: 18789                     │
│  Gateway bind: Loopback (127.0.0.1)      │  # 👉 只允许本机访问
│  Gateway auth: Token (default)           │
│  Tailscale exposure: Off                 │
│  Direct to chat channels.                │
│                                          │
├──────────────────────────────────────────╯
```

**第五步：选择模型提供商** 🔥

```bash
◇  Model/auth provider
│  MiniMax  # 👉 选择 MiniMax（国内推荐）
```

### MiniMax API Key 配置 ⭐

**选择认证方式**:

```bash
◇  MiniMax auth method
│  MiniMax M2.5 (CN)  # 👉 选择国内节点 + API Key 方式
```

**输入 API Key**:

```bash
◇  Enter MiniMax China API key
│  sk-cp-pHv7rkK8w0B3_NEw9475Fipfs-1JDAdvN11gK6h-YlXj8Fn_rkWoKcx8auVuIqPZPcodAjSs_paji2UrW_hlPnXw8IELvdedG85LmoJXLDA4R4JHSGKEIy8
```

粘贴 API Key 后按 Enter。

**确认默认模型**:

```bash
◇  Default model
│  Keep current (minimax-cn/MiniMax-M2.5)  # 👉 保持当前配置
```

### CN Endpoint 配置

选择 "MiniMax M2.5 (CN)" 会自动设置国内 endpoint。

如需手动修改 `~/.openclaw/openclaw.json`：

```json
{
  "models": {
    "providers": {
      "minimax": {
        "baseUrl": "https://api.minimaxi.com/anthropic"
      }
    }
  }
}
```

注意是 `api.minimaxi.com`（有个 i），不是 `api.minimax.io`

### 跳过可选配置

**Channel 配置**（第三方平台集成）:

```bash
◇  Channel status ────────────────────────────╮
│                                             │
│  Telegram: not configured                   │
│  WhatsApp: not configured                   │
│  Discord: not configured                    │
│  ... (更多平台)                             │
│                                             │
├─────────────────────────────────────────────╯
│
◇  Select channel (QuickStart)
│  Skip for now  # 👉 暂时跳过，稍后可配置
```

**Skills 配置**:

```bash
◇  Skills status ─────────────╮
│                             │
│  Eligible: 4                │
│  Missing requirements: 38   │
│  Unsupported on this OS: 7  │
│  Blocked by allowlist: 0    │
│                             │
├─────────────────────────────╯
│
◇  Configure skills now? (recommended)
│  No  # 👉 暂时跳过，基础功能先跑通
```

**Hooks 配置**:

```bash
◇  Hooks ──────────────────────────────────────────────────────────╮
│                                                                  │
│  Hooks let you automate actions when agent commands are issued.  │
│  Example: Save session context to memory when you issue /new.    │
│                                                                  │
├──────────────────────────────────────────────────────────────────╯
│
◇  Enable hooks?
│  Skip for now  # 👉 稍后配置
```

### Gateway 服务启动

```bash
◇  Gateway service already installed
│  Restart  # 👉 重启服务应用新配置
│
◐  Restarting Gateway service…
Restarted systemd service: openclaw-gateway.service
◇  Gateway service restarted.
```

### 配置完成

```bash
◇  Control UI ─────────────────────────────────────────────────────────────────────╮
│                                                                                  │
│  Web UI: http://127.0.0.1:18789/                                                 │
│  Web UI (with token):                                                            │
│  http://127.0.0.1:18789/#token=ea710491e8584c3c41d73fb405201e68155af5ef6d50fe30  │
│  Gateway WS: ws://127.0.0.1:18789                                                │
│  Gateway: reachable                                                              │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────╯
```

---

## 四、首次启动与验证

### 启动 TUI 交互界面

配置完成后，系统会提示：

```bash
◇  How do you want to hatch your bot?
│  Hatch in TUI (recommended)  # 👉 选择在 TUI 中启动
```

自动进入 TUI 界面：

```bash
openclaw tui - ws://127.0.0.1:18789 - agent main - session main

session agent:main:main
```

界面底部显示连接状态：

```text
connected | idle
agent main | session main (openclaw-tui) | minimax-cn/MiniMax-M2.5 | think low | tokens 0k/200k (0%)
```

### 基础对话测试

**测试 1：中文对话**

```text
你好
```

**AI 回复**:
```text
你好！👋

看起来这是个全新的开始 — 我刚上线，记忆还是空白的。

你是谁？我又该叫什么名字呢？一起聊聊看吧！
```

**测试 2：英文对话**

```text
Wake up, my friend!
```

**AI 回复**:
```text
Hey! 💫 I just came online — fresh workspace, clean slate. Looks like this is our first chat.

Who am I? Who are you? Let's figure that out together.

What should I call you — and what do you want to call me?
```

**测试 3：模型识别**

```text
你是什么模型
```

**AI 回复**:
```text
我是 MiniMax-M2.5 模型 🧠

运行在 MiniMax-CN 上。有什么我可以帮你的吗？
```

### 验证成功

状态栏显示：

```text
connected | idle
agent main | session main (openclaw-tui) | minimax-cn/MiniMax-M2.5 | think low | tokens 14k/200k (7%)
```

退出 TUI：按 `Ctrl+C` 或输入 `/exit`

---

## 五、国内优化

### npm 镜像配置

使用 npm 安装时配置国内镜像：

```bash
# 安装时指定镜像
npm install -g openclaw --registry=https://registry.npmmirror.com

# 或全局配置镜像
npm config set registry https://registry.npmmirror.com
```

### Gateway 后台运行

**systemd 管理**（Linux）:

```bash
# 查看服务状态
systemctl --user status openclaw-gateway

# 启动服务
systemctl --user start openclaw-gateway

# 停止服务
systemctl --user stop openclaw-gateway

# 开机自启
systemctl --user enable openclaw-gateway
```

**pm2 管理**（跨平台）:

```bash
# 安装 pm2
npm install -g pm2

# 启动 Gateway
pm2 start "openclaw gateway run" --name openclaw-gateway

# 查看状态
pm2 status

# 查看日志
pm2 logs openclaw-gateway

# 开机自启
pm2 startup
pm2 save
```

### 网络问题处理

**问题 1**: 安装脚本下载失败

**解决方案**:
```bash
# 改用 npm 安装
npm install -g openclaw --registry=https://registry.npmmirror.com
```

**问题 2**: Gateway 启动失败

**排查步骤**:
```bash
# 检查端口占用
lsof -i :18789

# 查看日志
openclaw gateway run --verbose

# 重新生成配置
openclaw onboard --install-daemon
```

---

## 六、可能遇到的问题

### 安装失败

**问题 1**: 网络错误
```bash
# 方案 1：使用 npm 安装
npm install -g openclaw --registry=https://registry.npmmirror.com

# 方案 2：使用代理
export http_proxy=http://your-proxy:port
export https_proxy=http://your-proxy:port
curl -fsSL https://openclaw.ai/install.sh | bash
```

**问题 2**: 权限不足

```bash
# 使用 sudo 权限安装
sudo npm install -g openclaw --registry=https://registry.npmmirror.com
```

### 配置错误

**问题 1**: API Key 无效

```bash
Error: Invalid API key
```

检查 API Key 格式，确认选择 "MiniMax M2.5 (CN)"，或重新运行：
```bash
openclaw onboard --install-daemon
```

**问题 2**: CN endpoint 错误

检查 `~/.openclaw/openclaw.json`：

```bash
cat ~/.openclaw/openclaw.json | grep baseUrl
```

确认是：
```json
"baseUrl": "https://api.minimaxi.com/anthropic"
```

Web 界面修改：访问 `http://127.0.0.1:18789` → Config → models，修改 baseUrl 后 Save + Update

### 运行错误

**问题 1**: 端口占用

**现象**:
```bash
Error: Port 18789 already in use
```

**解决方案**:
```bash
# 查找占用端口的进程
lsof -i :18789

# 杀掉进程（替换 PID）
kill -9 <PID>

# 或修改端口
openclaw config set gateway.port 18790
```

**问题 2**: TUI 无法连接
```bash
# 1. 检查 Gateway 是否运行
ps aux | grep openclaw

# 2. 手动启动 Gateway
openclaw gateway run

# 3. 检查防火墙
# Linux
sudo ufw status
sudo ufw allow 18789

# macOS
# 系统设置 → 安全性与隐私 → 防火墙
```

### 配置文件

```bash
# 配置文件
~/.openclaw/openclaw.json

# 工作空间
~/.openclaw/workspace

# 会话存储
~/.openclaw/agents/main/sessions/sessions.json
```

### 卸载

停止服务：
```bash
systemctl --user stop openclaw-gateway
# 或
pm2 stop openclaw-gateway && pm2 delete openclaw-gateway
```

卸载程序：
```bash
npm uninstall -g openclaw
```

删除数据（可选，会删除所有配置和对话历史）：
```bash
rm -rf ~/.openclaw
```

---

## 七、进阶使用

### Hooks 自动化

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "hooks": {
    "session-memory": {
      "enabled": true,
      "events": ["session:new"],
      "actions": ["memory:save"]
    }
  }
}
```

执行 `/new` 时自动保存会话上下文。

### Skills 启用

查看可用 Skills：
```bash
openclaw doctor
```

启用 Skill：
```bash
openclaw skill enable web-search
```

常用：`web-search`、`code-review`、`file-ops`、`terminal`

### 多 Agent

```bash
# 创建
openclaw agent create coding --model minimax-cn/MiniMax-M2.5

# 切换
openclaw tui --agent coding
```

不同 Agent 独立记忆，适合日常对话、代码开发、文档写作等不同场景。

---

## 八、结语

按照本文步骤，15 分钟就能搭建好 OpenClaw + MiniMax M2.5 本地 AI 助手。

数据本地处理，完全可控。

---

## 免费体验

关注本公众号，回复「MiniMax API Key」获取临时测试密钥。

有效期 1 天，有调用次数限制。长期使用请前往 [MiniMax 平台](https://platform.minimaxi.com/) 注册获取正式 API Key。

---

## 相关链接

微信内长按复制链接到浏览器打开。

**OpenClaw 官方**
```
官网：https://openclaw.ai/
文档：https://docs.openclaw.ai/
```

**MiniMax 平台**
```
配置指南：https://platform.minimaxi.com/document/OpenClaw
获取 API Key：https://platform.minimaxi.com/
```

**其他 AI 平台**
```
Claude API Key：https://console.claude.com/
OpenAI API Key：https://platform.openai.com/
```
