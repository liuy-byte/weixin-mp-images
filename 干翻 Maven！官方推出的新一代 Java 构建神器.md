# Maven Daemon：让 Maven 构建提速 5-10 倍的守护进程方案

Maven 构建速度慢，主要是因为每次构建都需要重新启动 JVM。

Apache Maven Daemon (mvnd) 通过维护长期运行的守护进程池，避免了 JVM 重复启动，显著提升构建速度。

---

## 核心特性

| 特性 | 说明 |
|-----|------|
| 守护进程池 | 维护多个 JVM 守护进程，避免重复启动 |
| GraalVM 原生客户端 | 客户端启动快速、内存占用低 |
| 智能并行构建 | 默认使用 (CPU核心数-1) 个线程并行构建 |
| 类加载器缓存 | 跨构建缓存插件类和 JIT 编译代码 |
| Maven 完全兼容 | 支持所有 Maven 命令、插件和 pom.xml |

---

## 工作原理

mvnd 通过以下机制显著提升构建性能：

1. **守护进程池**：维持多个 JVM 进程长期运行，避免每次构建时的 JVM 冷启动开销
2. **JIT 优化复用**：守护进程中的 JIT 编译优化结果可跨构建复用，减少重复编译
3. **类加载器缓存**：Maven 插件的类和资源在多次构建间缓存，避免重复加载和解析
4. **智能并行**：默认使用 `(CPU核心数 - 1)` 个线程并行构建模块
5. **原生客户端**：GraalVM 编译的客户端启动快、内存占用低，快速与守护进程通信

---

## 安装

### 选择版本

mvnd 提供两个主要版本：

| 版本 | 内嵌 Maven | 状态 | JDK 要求 | 推荐场景 |
|------|-----------|------|---------|---------|
| **mvnd@1** | Maven 3.9.x | 稳定版 | Java 8+ | **生产环境推荐** |
| **mvnd** | Maven 4.0.x | 预览版 | Java 17+ | 测试新特性 |

### 安装方式

**方式一：SDKMAN（推荐，跨平台）**

```bash
# 安装默认版本（当前为 1.0.3 稳定版）
sdk install mvnd

# 查看所有可用版本
sdk list mvnd

# 自动管理 JAVA_HOME，开箱即用
```

**方式二：Homebrew（仅 macOS）**

```bash
# 稳定版 - mvnd 1.x（推荐）
brew install mvndaemon/homebrew-mvnd/mvnd@1

# 预览版 - mvnd 2.x（Maven 4）
brew install mvndaemon/homebrew-mvnd/mvnd
```

**方式三：手动安装（所有平台）**

```bash
# 1. 从 Apache 官方下载对应平台的 ZIP
# https://downloads.apache.org/maven/mvnd/

# 2. 解压并添加 bin 目录到 PATH
# Linux/macOS: export PATH=/path/to/mvnd/bin:$PATH
# Windows: 在系统环境变量中添加路径
```

> 💡 **注意**：Windows Chocolatey 暂不支持，项目组正在寻找贡献者添加支持

---

## 多 JDK 环境配置

如果系统安装了多个 JDK 版本，可以灵活切换：

```bash
# 临时指定 JDK
JAVA_HOME=/path/to/jdk17 mvnd clean package

# 使用 jenv 管理（推荐）
jenv local 17
mvnd clean package
```

---

## 使用方式

mvnd 支持所有 Maven 命令，只需将 `mvn` 替换为 `mvnd`：

```bash
mvnd clean verify
mvnd install
mvnd clean package -DskipTests
```

**常用命令**：

```bash
mvnd --version       # 查看版本
mvnd --status        # 查看守护进程状态
mvnd --stop          # 停止所有守护进程
mvnd --stop --idle   # 停止空闲守护进程（释放内存）
mvnd -T1             # 禁用并行构建（如有需要）
```

---

## 配置

**配置文件位置**（按优先级）：

1. `[项目根目录]/.mvn/mvnd.properties`
2. `~/.m2/mvnd.properties`

**常用配置**：

```properties
# 自定义 settings.xml
maven.settings=/path/to/settings.xml

# 指定 JDK 路径
java.home=/path/to/jdk
```

---

## 性能提升

mvnd 的性能提升效果取决于项目特点：

- **首次构建**：提升约 20-30%（主要受 I/O 限制）
- **增量构建**：提升 **5-10 倍**（充分利用守护进程缓存和 JIT 优化）
- **大型多模块项目**：提升效果最显著（并行构建优势）

> 💡 项目模块越多、构建越频繁，mvnd 的优势越明显

---

## 适用场景

✅ **推荐使用**：
- 大型多模块项目（10+ 模块）
- 需要频繁构建的开发场景
- CI/CD 流水线（可显著缩短构建时间）
- 微服务架构项目

❌ **不适合**：
- 单模块小项目（构建本身就快）
- 内存受限的开发环境
- 一次性构建任务

---

## 注意事项

- **内存占用**：守护进程会持续占用内存，建议定期使用 `mvnd --stop --idle` 清理空闲进程
- **小项目效果有限**：构建时间本身很短的小项目，使用 mvnd 提升不明显
- **IDE 集成**：某些 IDE 可能需要特殊配置才能使用 mvnd
- **首次构建预热**：首次构建时守护进程需要预热，提升效果不明显

---

## 相关链接

- [Apache Maven Daemon 官方](https://maven.apache.org/tools/mvnd.html)
- [GitHub 仓库](https://github.com/apache/maven-mvnd)
- [下载地址](https://downloads.apache.org/maven/mvnd/)
- [版本发布](https://github.com/apache/maven-mvnd/releases)
