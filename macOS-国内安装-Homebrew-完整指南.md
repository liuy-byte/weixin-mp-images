# macOS 国内安装 Homebrew 完整指南

国内使用镜像源快速安装 Homebrew，解决官方源速度慢、超时等问题。

---

## 一、安装前准备

### 1. 检查是否已安装 Xcode Command Line Tools

```bash
xcode-select -p
```

如果输出路径（如 `/Library/Developer/CommandLineTools`），说明已安装，可跳过安装步骤。

### 2. 安装 Xcode Command Line Tools

如果未安装，执行：

```bash
xcode-select --install
```

---

## 二、安装步骤

### 方式一：一键安装（推荐）

```bash
/bin/bash -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

脚本会自动检测系统架构，安装过程中可选择镜像源（清华/中科大/阿里云）。

---

### 方式二：手动安装（清华镜像）

**1. 设置环境变量**

```bash
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
```

**2. 执行安装**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**3. 配置 PATH**

```bash
# Apple Silicon Mac（M1/M2/M3/M4）
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Intel Mac
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/usr/local/bin/brew shellenv)"
```

**验证安装：**

```bash
brew --version
```

---

## 三、永久配置镜像源

> 一键安装已自动配置，手动安装需执行以下步骤：

```bash
# 编辑配置文件
nano ~/.zshrc

# 添加以下内容
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"

# 保存后执行
source ~/.zshrc
brew update
```

---

## 四、常用命令

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

## 五、常见问题

**brew command not found**
```bash
source ~/.zshrc
```

**权限错误**
```bash
sudo chown -R $(whoami) $(brew --prefix)
```

**Command Line Tools 安装失败**
访问 Apple 开发者下载页面手动下载：
https://developer.apple.com/download/all/

---

## 相关链接

**Homebrew 官方**
- 官网：https://brew.sh/
- 官方仓库：https://github.com/Homebrew/brew

**一键安装脚本**
- HomebrewCN：https://gitee.com/cunkai/HomebrewCN

**国内镜像源**
- 清华镜像：https://mirrors.tuna.tsinghua.edu.cn/help/homebrew-bottles/
- 中科大镜像：https://mirrors.ustc.edu.cn/
- 阿里云镜像：https://developer.aliyun.com/mirror/homebrew/
