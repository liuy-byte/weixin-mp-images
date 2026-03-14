# Mac 安装 Navicat Premium v17.1.9 完整教程

> Mac 安装第三方应用，最头疼的就是"已损坏，无法打开"。两条命令搞定，亲测稳定可用。

---

## 一、安装

双击打开下载的 `.dmg` 安装包，将左侧 Navicat Premium.app 拖入右侧 Applications 文件夹。

![拖入安装](https://raw.githubusercontent.com/liuy-byte/weixin-mp-images/main/images/navicat-mac-install/drag-to-install.png)

---

## 二、解决"已损坏无法打开"

拖入后双击打开，大概率会弹出提示：**"已损坏，无法打开，你应该将它移到废纸篓"**。

别慌，按以下步骤操作。

### 1. 检查"任何来源"选项

打开 **设置 → 隐私与安全性 → 安全性**，看是否有"任何来源"选项。

![安全性设置](https://raw.githubusercontent.com/liuy-byte/weixin-mp-images/main/images/navicat-mac-install/security-settings.png)

### 2. 没有"任何来源"？终端执行两条命令

打开终端，依次执行：

```bash
# 开启"任何来源"选项（需输入开机密码）
sudo spctl --master-disable
```

```bash
# 移除应用的隔离属性（tab 键可自动补齐文件名）
xattr -cr /Applications/Navicat\ Premium.app
```

### 3. 还是打不开？

打开 **设置 → 隐私与安全性 → 安全性**，拉到底部，看是否有提示信息，点击 **"仍要打开"** 即可。

---

## 三、安装包获取

关注本公众号，回复「7882」获取 Navicat Premium for Mac v17.1.9 安装包。

---

v17.1.9 版本稳定，密码保存功能正常，推荐升级。
