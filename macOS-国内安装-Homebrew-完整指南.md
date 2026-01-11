# macOS 国内安装 Homebrew 完整指南

Homebrew 是 macOS 上最流行的包管理器，通过它可以方便地安装各种开发工具和软件。然而，由于网络原因，从官方源安装 Homebrew 往往非常缓慢甚至超时。本文将介绍如何使用国内镜像源快速安装 Homebrew。

---

## 一、为什么需要国内镜像

Homebrew 的官方服务器位于国外，国内用户访问时经常遇到以下问题：

- **下载速度慢**：官方源下载速度通常只有几十 KB/s
- **连接超时**：频繁出现网络超时错误
- **安装中断**：大文件下载过程中容易失败

使用国内镜像源（如清华大学镜像源）可以有效解决这些问题，下载速度通常可以达到几 MB/s。

---

## 二、安装前准备

### 1. 系统要求

- macOS Catalina (10.15) 或更高版本
- 至少 2GB 可用磁盘空间
- 管理员权限

### 2. 安装 Command Line Tools

在安装 Homebrew 之前，需要先安装 Xcode Command Line Tools：

```bash
# 检查是否已安装
xcode-select -p

# 如果没有输出，执行以下命令安装
xcode-select --install
```

> 💡 安装 Command Line Tools 时会弹出安装对话框，按照提示完成即可。

---

## 三、安装步骤（清华大学镜像源）

### 1. 设置环境变量

在终端中执行以下命令，设置 Homebrew 的安装源为清华大学镜像：

```bash
# 设置环境变量
export HOMEBREW_INSTALL_FROM_API=1

# 临时设置 Git 镜像
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/homebrew-core.git"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/brew.git"
```

### 2. 执行安装命令

```bash
# 使用官方安装脚本（会自动使用设置的镜像源）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> **注意**：由于网络原因，如果第一次安装失败，可以多尝试几次。

### 3. 验证安装

安装完成后，按照提示执行以下命令添加到 PATH：

```bash
# Apple Silicon Mac (M1/M2/M3)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Intel Mac
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/usr/local/bin/brew shellenv)"
```

验证安装是否成功：

```bash
brew --version
```

---

## 四、永久配置国内镜像

为了确保每次使用 Homebrew 时都走国内镜像，需要将环境变量添加到配置文件中。

### 1. 对于 zsh 用户（macOS 默认）

```bash
# 编辑 ~/.zshrc 文件
nano ~/.zshrc

# 添加以下内容
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/homebrew-core.git"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/brew.git"

# 保存后生效
source ~/.zshrc
```

### 2. 对于 bash 用户

```bash
# 编辑 ~/.bash_profile 文件
nano ~/.bash_profile

# 添加相同的环境变量

# 保存后生效
source ~/.bash_profile
```

---

## 五、常用命令速查表

| 命令 | 说明 |
|-----|------|
| `brew search 包名` | 搜索软件包 |
| `brew install 包名` | 安装软件包 |
| `brew uninstall 包名` | 卸载软件包 |
| `brew list` | 列出已安装的软件包 |
| `brew update` | 更新 Homebrew 和软件包 |
| `brew upgrade` | 升级所有软件包 |
| `brew cleanup` | 清理旧版本缓存 |
| `brew doctor` | 检查 Homebrew 健康状态 |

---

## 六、常见问题

### 1. 安装失败，提示 "Connection refused"

**解决方法**：
- 检查网络连接
- 尝试切换网络（如手机热点）
- 多次尝试安装命令

### 2. 提示 "Permission denied" 权限错误

**解决方法**：
```bash
# 确保 /usr/local 目录权限正确
sudo chown -R $(whoami) /usr/local

# 或者对于 Homebrew 目录
sudo chown -R $(whoami) $(brew --prefix)
```

### 3. Command Line Tools 安装失败

**解决方法**：
- 手动下载安装：访问 https://developer.apple.com/download/all/
- 搜索 "Command Line Tools" 并下载对应版本

### 4. brew command not found

**解决方法**：
- 确认已执行添加到 PATH 的命令
- 重启终端或执行 `source ~/.zshrc`

### 5. 镜像源失效或无法连接

**解决方法**：
- 检查环境变量配置是否正确
- 尝试使用其他镜像源（如中科大镜像源）
- 查看镜像源官方状态页面

---

## 七、卸载 Homebrew

如果需要卸载 Homebrew，可以使用官方提供的卸载脚本：

```bash
# 下载并执行卸载脚本
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

> **注意**：卸载前请确保已备份重要数据。

---

## 八、其他国内镜像源（备选）

### 中科大镜像源

```bash
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
```

### 阿里云镜像源

```bash
export HOMEBREW_API_DOMAIN="https://mirrors.aliyun.com/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.aliyun.com/homebrew-bottles"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.aliyun.com/homebrew-core.git"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.aliyun.com/brew.git"
```

---

## 相关链接

- [Homebrew 官方网站](https://brew.sh/)
- [Homebrew 官方仓库](https://github.com/Homebrew/brew)
- [清华大学 Homebrew 镜像源](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew-bottles/)
- [中科大 Homebrew 镜像源](https://mirrors.ustc.edu.cn/help/homebrew-bottles/)
