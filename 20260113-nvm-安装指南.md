# nvm 安装指南

Node.js 版本管理工具，支持 macOS/Linux，Windows 用 [nvm-windows](https://github.com/coreybutler/nvm-windows)。

## 安装

**macOS / Linux:**
```bash
curl -o- https://cdn.jsdelivr.net/gh/nvm-sh/nvm@latest/install.sh | bash
```

**Windows:**
```powershell
# 方式一
winget install CoreyButler.NVMforWindows
# 方式二：从 https://github.com/coreybutler/nvm-windows/releases 下载 nvm-setup.exe
```

## Shell 配置

安装脚本会自动添加到 `~/.bashrc` 或 `~/.zshrc`，无需手动配置。

如未自动添加，手动添加：
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

执行 `source ~/.bashrc` 或重新打开终端生效。

## 常用命令

| 命令 | 说明 |
|-----|------|
| `nvm install 20` | 安装 Node 20 |
| `nvm install --lts` | 安装最新 LTS |
| `nvm use 20` | 切换版本 |
| `nvm alias default 20` | 设为默认 |
| `nvm list` | 列出已安装 |

## 快速上手

```bash
# 安装并使用
nvm install --lts
nvm use --lts

# 设置默认
nvm alias default 20

# 检查版本
node --version
```

## 项目版本锁定

```bash
echo "20" > .nvmrc
nvm use
```

## 代理配置

```bash
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890
nvm install 20
```

## 卸载

```bash
rm -rf ~/.nvm
# 删除 Shell 配置中的 NVM 相关配置
```
