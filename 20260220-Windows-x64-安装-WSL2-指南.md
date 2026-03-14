# Windows｜x64 纯命令行安装 WSL2，国内网络也能跑通

> 想在 Windows 跑 Linux 工具，却卡在内核包下载超时？这里是 x64 专属的纯命令行安装路径，含国内备用下载方案，照着做不绕弯。

## 前置条件

| 条件 | 说明 |
|------|------|
| 系统版本 | Windows 10 1903+（内部版本 18362+）或 Windows 11，x64 架构 |
| 管理员权限 | 所有命令需在**管理员身份**的 PowerShell 中执行 |

打开方式：`Win+X` → 选择「Windows PowerShell (管理员)」

---

## 一、启用系统功能

```powershell
# 启用 WSL 子系统
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# 启用虚拟机平台
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

两条命令执行完成后，**必须重启电脑**，重启后再执行后续步骤。

---

## 二、安装 WSL2 内核更新包

### 主路径（网络正常时）

```powershell
wsl --update
```

国内网络连接微软服务器不稳定，若出现超时或失败，使用备用路径。

### 备用路径（国内推荐）

手动下载内核包，本地静默安装：

```powershell
# 下载 x64 内核更新包
$url = "https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi"
$output = "$env:TEMP\wsl_update_x64.msi"

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $url -OutFile $output -UseBasicParsing

# 静默安装，无需手动点击
Start-Process msiexec.exe -ArgumentList "/i `"$output`" /qn /norestart" -Wait

# 清理临时文件
Remove-Item $output -Force
```

若上述链接仍无法访问，也可在浏览器中手动下载后执行：

```powershell
# 将 .msi 文件放到 C:\Temp\ 后执行
Start-Process msiexec.exe -ArgumentList "/i C:\Temp\wsl_update_x64.msi /qn /norestart" -Wait
```

---

## 三、设置默认版本并安装 Ubuntu

```powershell
# 设置 WSL2 为默认版本
wsl --set-default-version 2

# 安装 Ubuntu（默认最新 LTS）
wsl --install -d Ubuntu
```

安装完成后，系统会提示设置 Linux 用户名和密码（与 Windows 账号无关，自行设定即可）。

验证安装结果：

```powershell
# VERSION 列显示 2 即为成功
wsl -l -v
```

---

## 四、基础配置

进入 Ubuntu 终端后执行：

### apt 换国内源

```bash
# 备份原始源
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

# 替换为阿里云镜像（Ubuntu 22.04 Jammy）
sudo bash -c 'cat > /etc/apt/sources.list << EOF
deb https://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
EOF'

# 更新软件包索引
sudo apt update
```

> 💡 若系统版本不是 22.04，将 `jammy` 替换为对应代号：20.04 对应 `focal`，24.04 对应 `noble`。查看版本：`lsb_release -c`

### 设置时区

```bash
sudo timedatectl set-timezone Asia/Shanghai
```

验证：`date` 命令输出应为北京时间。

---

## 常见问题

**❌ 内核包下载超时**：使用第二步的备用路径，手动下载 `.msi` 本地安装。

**❌ 错误代码 0x80070422**：LxssManager 服务未启动。

```powershell
# 管理员 PowerShell 中执行
Start-Service LxssManager
Set-Service -Name LxssManager -StartupType Automatic
```

**❌ 提示「WSL 2 需要更新其内核组件」**：内核包未安装成功，重新执行第二步。

**❌ 执行 `wsl --install` 报网络错误**：WSL2 功能依赖网络下载发行版。若网络受限，可通过微软商店离线安装 Ubuntu，或先完成前三步再单独处理发行版安装。

---

## 相关链接

微信内长按复制链接到浏览器打开。

**微软官方文档**
```
WSL 安装指南：https://learn.microsoft.com/zh-cn/windows/wsl/install
WSL2 内核手动下载：https://learn.microsoft.com/zh-cn/windows/wsl/install-manual
```

**国内镜像源**
```
阿里云 Ubuntu 镜像：https://mirrors.aliyun.com/ubuntu/
中科大 Ubuntu 镜像：https://mirrors.ustc.edu.cn/ubuntu/
```
