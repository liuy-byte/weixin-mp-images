# 使用 jenv 管理 JDK 版本

作为 Java 开发者，你是否遇到过这样的场景：

- 老项目要用 JDK 8，新项目要用 JDK 17
- 每次切换项目都要手动改 `JAVA_HOME`
- 不同终端窗口需要不同的 Java 版本

如果你厌倦了这种繁琐的手动操作，**jenv** 就是你需要的工具。

---

## 一、什么是 jenv

**jenv** 是一个轻量级的 Java 版本管理工具，类似于 Node.js 的 nvm 或 Ruby 的 rbenv。

### 核心功能

- **全局版本管理**：设置系统默认的 Java 版本
- **项目级版本管理**：在特定目录下自动切换到指定版本
- **Shell 级版本管理**：在当前终端会话中临时切换版本
- **自动设置 JAVA_HOME**：通过插件自动管理环境变量

**重要**：jenv 本身不负责安装 JDK，它只管理已安装的 JDK 版本。

---

## 二、安装 jenv

### macOS / Linux

**方式 1：使用 Homebrew（推荐）**

```bash
brew install jenv
```

**方式 2：使用 Git**

```bash
git clone https://github.com/jenv/jenv.git ~/.jenv
```

### Shell 配置

根据你使用的 Shell，将以下内容添加到配置文件：

**Bash（`~/.bash_profile` 或 `~/.bashrc`）**

```bash
export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"
```

**Zsh（`~/.zshrc`）**

```bash
export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"
```

配置完成后，重启终端或执行：

```bash
source ~/.zshrc  # 或 source ~/.bash_profile
```

### Windows

Windows 用户可以使用 [JEnv-for-Windows](https://github.com/FelixSelter/JEnv-for-Windows) 项目。

---

## 三、基本使用

### 1. 添加 JDK 版本

首先，你需要告诉 jenv 你已经安装了哪些 JDK。

**macOS 示例：**

```bash
# 查看已安装的 JDK 路径
/usr/libexec/java_home -V

# 添加 JDK 到 jenv
jenv add /Library/Java/JavaVirtualMachines/jdk-8.jdk/Contents/Home
jenv add /Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
```

**Linux 示例：**

```bash
jenv add /usr/lib/jvm/java-8-openjdk-amd64
jenv add /usr/lib/jvm/java-17-openjdk-amd64
```

### 2. 列出所有版本

```bash
jenv versions
```

输出示例：

```
* system (set by /Users/username/.jenv/version)
  1.8
  1.8.0.392
  17
  17.0.9
```

### 3. 切换 Java 版本

**全局切换（影响所有新终端）：**

```bash
jenv global 17
```

**项目级切换（仅在当前目录及子目录生效）：**

```bash
cd ~/my-project
jenv local 1.8
```

这会在当前目录创建 `.java-version` 文件，记录版本号。

**Shell 级切换（仅在当前终端会话生效）：**

```bash
jenv shell 17
```

### 4. 启用 export 插件（重要）

默认情况下，jenv 不会自动设置 `JAVA_HOME`，需要启用插件：

```bash
jenv enable-plugin export
```

启用后，jenv 会自动同步 `JAVA_HOME` 环境变量。

---

## 四、实际场景示例

假设你有两个项目：

- **项目 A**（老项目）：需要 JDK 8
- **项目 B**（新项目）：需要 JDK 17

### 配置步骤

1. **设置全局默认版本为 JDK 17**

```bash
jenv global 17
```

2. **为项目 A 设置本地版本**

```bash
cd ~/project-a
jenv local 1.8
```

3. **验证切换效果**

```bash
# 在项目 A 目录下
java -version  # 输出：java version "1.8.0_392"

# 切换到项目 B
cd ~/project-b
java -version  # 输出：java version "17.0.9"
```

### 自动切换原理

jenv 会在进入目录时读取 `.java-version` 文件，自动切换到指定版本。无需手动干预！

---

## 五、常用命令速查表

| 命令 | 说明 |
|------|------|
| `jenv versions` | 列出所有已管理的 JDK 版本 |
| `jenv add <path>` | 添加一个 JDK 到 jenv |
| `jenv remove <version>` | 移除指定版本 |
| `jenv global <version>` | 设置全局默认版本 |
| `jenv local <version>` | 设置当前目录版本 |
| `jenv shell <version>` | 设置当前 Shell 版本 |
| `jenv enable-plugin <plugin>` | 启用插件（如 export） |
| `jenv which java` | 显示当前使用的 java 可执行文件路径 |

---

## 六、注意事项

1. **jenv 不安装 JDK**
   你需要先通过 SDKMAN、Homebrew 或官网手动安装 JDK，然后再用 `jenv add` 添加。

2. **记得启用 export 插件**
   否则 `JAVA_HOME` 不会自动更新，可能导致某些工具（如 Maven、Gradle）使用错误的 Java 版本。

3. **项目级配置优先**
   jenv 的优先级顺序：`shell` > `local` > `global`

4. **Windows 支持有限**
   Windows 用户建议使用 WSL 或 JEnv-for-Windows 的替代工具。

---

## 七、总结

jenv 是一个简单高效的 Java 版本管理工具，核心优势：

- **自动切换**：进入项目目录自动使用对应 Java 版本
- **零配置冲突**：不同项目互不干扰
- **团队协作友好**：通过 `.java-version` 文件统一团队环境

如果你在多个 Java 项目间频繁切换，jenv 能让你彻底告别手动改环境变量的烦恼。

---

**相关资源**：
- [jenv 官网](https://www.jenv.be/)
- [GitHub - jenv/jenv](https://github.com/jenv/jenv)
- [Baeldung: Managing Multiple JDK](https://www.baeldung.com/jenv-multiple-jdk)
