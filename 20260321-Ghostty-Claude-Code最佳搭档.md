# Ghostty + Claude Code｜我现在最顺手的 AI 编程终端搭子

> Claude Code 很强。
> 但终端一乱，AI 编程的节奏就断了。

Ghostty 这类新终端的价值，不只是好看。

它真正适合 AI 编程的一点是：**分屏够快，聚焦够狠，配置改完立刻生效**。  
跑 Claude Code 时，不用来回切窗口，也不用对着一整屏长输出硬滚。

---

| 场景 | 普通终端 | Ghostty + Claude Code |
|------|------|------|
| 看 Claude 长输出 | 一屏刷到底，定位费劲 | `Cmd + Shift + Enter` 直接放大当前 pane |
| 同时盯多个任务 | 来回切 tab，容易乱 | `Cmd + D` 直接分屏并排看 |
| 调整配置 | 改完重开，打断工作流 | `Cmd + Shift + ,` 热重载配置 |
| 跑辅助命令 | Claude、监控、信息面板抢位置 | 一个窗口拆成多个 pane |

---

## 一、AI 编程最怕终端拖后腿

Claude Code 最大的特点，不是“会写代码”，而是会持续输出、持续思考、持续执行命令。  
这时候终端如果不好用，AI 再强也白搭。

Ghostty 对这类工作流很友好，核心就是 3 点：

✅ `Cmd + D` 分屏很顺手，适合一边跑 Claude Code，一边看日志或系统状态  
✅ `Cmd + Shift + Enter` 可以把当前 pane 放大，Claude 长输出终于不用硬滚  
✅ `Cmd + Shift + ,` 热重载配置，改主题、改快捷键不用重开终端

它不是功能最多的终端，但足够适合 AI 编程。

---

## 二、5分钟装好可用环境

先安装 Ghostty：

```bash
brew install --cask ghostty
```

装完后直接打开。  
如果你不想从零开始配，可以先打开配置文件：

```bash
open ~/.config/ghostty/config
```

如果本地还没有这个文件，就先执行：

```bash
mkdir -p ~/.config/ghostty && touch ~/.config/ghostty/config
open ~/.config/ghostty/config
```

打开后，去 GitHub 搜 `BruceLanLan/bruceblue-ghostty-config`，打开里面的 `config` 文件，把内容整段复制到你本机的 `~/.config/ghostty/config` 里并保存，再按 `Cmd + Shift + ,` 热重载。

我建议先配这几样：

✅ 深色主题，长时间盯 Claude 输出更舒服  
✅ `Cmd + D` 分屏快捷键  
✅ `Cmd + Shift + Enter` 聚焦放大当前 pane  
✅ 更清晰的字体和行高，减少长输出阅读负担

先把“顺手工作”搞定，比折腾花哨配置更重要。

---

## 三、先记住这 3 个动作

下面这几个快捷键，基于上面这份配置文件。你如果没导入这份 `config`，按键可能不一样。

| 快捷键 | 作用 | 什么时候最好用 |
|------|------|------|
| `Cmd + D` | 左右分屏 | Claude Code 和辅助命令并排跑 |
| `Cmd + Shift + Enter` | 放大当前 pane | Claude 连续输出长内容时 |
| `Cmd + Shift + ,` | 重载配置 | 刚改完主题和快捷键时 |
| `Cmd + W` | 关闭当前 pane | 收掉临时窗口，保持桌面干净 |
| `Cmd + Q` | 完全退出 Ghostty | 配完 Starship 后重启最方便 |

别一上来背一堆快捷键。  
先把分屏、放大、重载这 3 个动作练熟，收益最大。

---

## 四、我现在最顺手的 Claude Code 分屏工作流

我最常用的是 3 个 pane：

- 左边主 pane：跑 `claude`
- 右上角：跑 `fastfetch` 看机器和环境信息
- 右下角：跑 `btop` 看 CPU、内存和系统负载

如果你刚开始用，先跑 `claude` 也够了。`fastfetch` 和 `btop` 只是辅助，不装也不影响主线。

Claude Code 在执行命令、安装依赖、跑测试时，你不用猜机器是不是卡住了。  
右侧状态一眼就能看见。

> **实战案例**：我用 Claude Code 改项目配置时，左侧持续输出修改过程，右侧同时盯 `btop` 和环境信息。依赖一变慢，就能马上判断到底是网络问题还是机器负载问题。

如果 Claude 一次吐很多内容，直接按 `Cmd + Shift + Enter` 放大当前 pane。  
看完再缩回去，整个过程几乎不会打断思路。

---

## 五、顺手把状态栏也收拾干净

Ghostty 管窗口体验，Starship 管状态栏体验。

安装 Starship：

```bash
brew install starship
starship preset catppuccin-powerline -o ~/.config/starship.toml
```

然后在 `~/.zshrc` 末尾加一行：

```bash
eval "$(starship init zsh)"
```

最后 `Cmd + Q` 退出 Ghostty，重新打开。

这样目录、Git 分支、语言环境都会更清楚。  
你让 Claude Code 在不同项目里来回工作时，状态栏能帮你少踩很多低级坑。

---

## 六、结语

如果你已经在高频使用 Claude Code，终端就不该只是“能用就行”。

Ghostty 最大的价值，不是炫技，而是把分屏、聚焦、热重载这些高频动作做得足够顺手。  
一旦顺手，AI 编程的节奏就会完全不一样。

---

## 相关链接

微信内长按复制链接到浏览器打开。

**工具官网**
```
Ghostty：https://ghostty.org/
Starship：https://starship.rs/
```
