# fnm 安装指南

fnm（Fast Node Manager）是一个快速简单的 Node.js 版本管理器，使用 Rust 编写，跨平台支持。

## 安装方式

### macOS

```bash
brew install fnm
```

### Linux

```bash
curl -fsSL https://fnm.vercel.app/install | bash
```

### Windows

```powershell
winget install Schniz.fnm
```

## Shell 配置

安装完成后，需要在 Shell 配置文件中添加初始化命令。

### macOS（Zsh）

在 `~/.zshrc` 中添加：
```bash
eval "$(fnm env --use-on-cd --shell zsh)"
```

### Linux（Bash）

在 `~/.bashrc` 中添加：
```bash
eval "$(fnm env --use-on-cd --shell bash)"
```

### Windows（PowerShell）

在 PowerShell 配置文件中添加：
```powershell
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

> 💡 `--use-on-cd` 参数可在切换目录时自动读取 `.node-version` 或 `.nvmrc` 文件并切换 Node 版本。

## 常用命令

| 命令 | 说明 |
|------|------|
| `fnm install <version>` | 安装指定版本 |
| `fnm install --lts` | 安装最新 LTS 版本 |
| `fnm use <version>` | 切换到指定版本 |
| `fnm default <version>` | 设置默认版本 |
| `fnm list` | 列出已安装版本 |
| `fnm list-remote` | 列出可安装的远程版本 |
| `fnm current` | 查看当前使用版本 |
| `fnm uninstall <version>` | 卸载指定版本 |
| `fnm env` | 输出环境配置 |
| `fnm completions --shell <SHELL>` | 生成命令补全脚本 |

## 使用示例

```bash
# 安装 LTS 版本并使用
fnm install --lts
fnm use lts-latest

# 安装指定版本
fnm install 20
fnm use 20

# 设置默认版本
fnm default lts-latest

# 查看当前版本
fnm current

# 列出已安装版本
fnm list
```

## 项目版本锁定

fnm 支持 `.node-version` 和 `.nvmrc` 文件自动切换版本。

```bash
# 在项目根目录创建版本文件
node --version > .node-version
# 或
echo "20" > .nvmrc
```

配置 `--use-on-cd` 后，进入项目目录会自动切换到指定版本。

## 升级 fnm

```bash
# curl 安装方式升级
curl -fsSL https://fnm.vercel.app/install | bash -s -- --skip-shell

# Homebrew 升级
brew upgrade fnm
```

## 参考链接

- [fnm GitHub 仓库](https://github.com/Schniz/fnm)
- [命令文档](https://github.com/Schniz/fnm/blob/master/docs/commands.md)
