# Claude Code 安装配置指南

[Claude Code](https://claude.com/claude-code/) 是 Anthropic 推出的 AI 编程助手，支持代码编写、调试、重构等开发任务。

> **前置条件**：Node.js 18+，参考 [fnm 安装指南](/fnm-安装指南.md)

### 安装

```bash
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
claude --version  # 验证安装
```

---

## 二、首次登录

首次启动需要认证：

```bash
claude auth login
# 或直接运行 claude 按提示操作
```

如果使用代理或 API 代理：
```bash
export ANTHROPIC_BASE_URL="https://api.minimaxi.com/anthropic"
export ANTHROPIC_AUTH_TOKEN="<API_KEY>"
claude
```

---

## 三、代理配置（可选）

仅当网络无法直连时需要配置。

### 类 Unix 系统（macOS/Linux）

在 `~/.zshrc` 或 `~/.bashrc` 中添加：

```bash
proxy_on() {
    export https_proxy=http://127.0.0.1:7897
    export http_proxy=http://127.0.0.1:7897
    export all_proxy=socks5://127.0.0.1:7897
}

cc() {
    proxy_on
    # bypassPermissions 跳过每次执行前的确认提示
    claude --ide --permission-mode bypassPermissions "$@"
}
```

### Windows（PowerShell）

**配置文件位置：**
```powershell
echo $PROFILE
# 常见路径：
# PowerShell Core: ~/.config/powershell/Microsoft.PowerShell_profile.ps1
# Windows PowerShell: ~/Documents/WindowsPowerShell/Microsoft.PowerShell_profile.ps1
```

**在 $PROFILE 中添加：**
```powershell
function proxy_on {
    $env:HTTPS_PROXY="http://127.0.0.1:7897"
    $env:HTTP_PROXY="http://127.0.0.1:7897"
    $env:ALL_PROXY="socks5://127.0.0.1:7897"
}

function cc {
    proxy_on
    # bypassPermissions 跳过每次执行前的确认提示
    claude --ide --permission-mode bypassPermissions @args
}
```

**使用：** `. $PROFILE && cc "任务描述"`


---

## 四、MCP 服务器配置

```bash
# 安装 MCP 服务器
claude mcp add context7 -- npx -y @upstash/context7-mcp@latest
claude mcp add deepwiki -- npx -y mcp-deepwiki@latest
claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest

# 管理命令
claude mcp list           # 列出已安装
claude mcp remove <name>  # 移除服务器
```

---

## 五、常用命令

| 命令 | 说明 |
|-----|------|
| `claude` | 启动交互会话 |
| `claude "任务"` | 直接执行任务 |
| `cc "任务"` | 代理模式启动 |
| `claude mcp list` | 列出 MCP 服务器 |
| `claude --version` | 查看版本 |
| `npm update -g @anthropic-ai/claude-code` | 更新版本 |
| `npm uninstall -g @anthropic-ai/claude-code` | 卸载 |

---

## 六、常见问题

**npm 安装失败（ECONNRESET）**
```bash
# 配置国内镜像
npm config set registry https://registry.npmmirror.com
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

**command not found**
```bash
export PATH="/usr/local/bin:$PATH"
```

**MCP 启动失败**
```bash
claude mcp remove <name>
claude mcp add <name> -- npx -y @package@latest
```

**代理端口**：Clash 默认 7890，Vless/Trojan 等不同代理软件端口可能不同

---

## 相关链接

- [Claude Code 官网](https://claude.com/claude-code/)
- [官方文档](https://docs.claude.com/)
