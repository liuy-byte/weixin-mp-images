# 在 Claude Code 中使用 MiniMax-M2.1 模型进行 AI 编程

---

## 一、安装 Claude Code

使用 NPM 全局安装：

```bash
npm install -g @anthropic-ai/claude-code
```

---

## 二、使用 cc-switch 配置 MiniMax

**cc-switch** 是一个配置切换工具，可以一键切换不同的 AI 服务商，省去手动改配置的麻烦。

### 安装 cc-switch

**macOS**
```bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
```

**Windows / Linux**

- **Windows**: [CC-Switch-v3.8.3-Windows.msi](https://github.com/farion1231/cc-switch/releases/download/v3.8.3/CC-Switch-v3.8.3-Windows.msi) 或 [Portable.zip](https://github.com/farion1231/cc-switch/releases/download/v3.8.3/CC-Switch-v3.8.3-Windows-Portable.zip)
- **Linux**: [CC-Switch-v3.8.3-Linux.AppImage](https://github.com/farion1231/cc-switch/releases/download/v3.8.3/CC-Switch-v3.8.3-Linux.AppImage) 或 [.deb](https://github.com/farion1231/cc-switch/releases/download/v3.8.3/cc-switch_3.8.3_amd64.deb)

### 配置 MiniMax

**步骤 1**：启动 cc-switch，点击右上角 + 号

![步骤 1](https://raw.githubusercontent.com/liuy-byte/weixin-mp/main/images/ScreenShot_2026-01-03_111445_023.png)

**步骤 2**：选择 MiniMax，填入 API Key

![步骤 2](https://raw.githubusercontent.com/liuy-byte/weixin-mp/main/images/ScreenShot_2026-01-03_111920_590.png)

**步骤 3**：添加后点击启用切换

![步骤 3](https://raw.githubusercontent.com/liuy-byte/weixin-mp/main/images/ScreenShot_2026-01-03_112111_034.png)

> **提示**：切换后需要重启终端才能生效

配置完成后，在终端输入 `claude` 即可启动 Claude Code。

![Claude Code](https://raw.githubusercontent.com/liuy-byte/weixin-mp/main/images/ScreenShot_2026-01-03_120029_074.png)

---

更多信息：
![Coding Plan](https://raw.githubusercontent.com/liuy-byte/weixin-mp/main/images/wx_20260103113437_449_5.jpg) 
[cc-switch GitHub](https://github.com/farion1231/cc-switch) 
[MiniMax 开放平台](https://platform.minimax.chat)
