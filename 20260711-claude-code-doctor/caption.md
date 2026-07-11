Claude Code 变怪了？先别重装

配置越用越乱：settings 改花了、插件一堆、MCP 挂没挂都不知道。行为一变怪就卸载重装？重装只换程序本体，~/.claude 里的配置原样都在，白折腾。

官方藏了个体检命令 doctor，两种跑法👇

🔹 终端 claude doctor
只读诊断：版本、安装路径、自动更新被哪个环境变量禁了，几秒出报告

🔹 会话里 /doctor（别名 /checkup）
连查带修：没在用的扩展、重复 memory 文件、慢 hooks、写坏的 settings.json……修复要你确认才动手，改前还自动留备份

🔹 配置文件别搞混
~/.claude.json 不是配置文件，往里写 permissions 不生效；配置写 settings.json（用户 / 项目 / local 三层）

🔹 doctor 管不到的
改值 /config、看生效层 /status、裸跑排查 claude --safe-mode、老项目清退 claude project purge（我这一清就是 1GB 转录）

排查顺序：doctor 体检 → /doctor 修 → safe-mode 定位 → purge 清退✨

#ClaudeCode #AI编程 #程序员 #AI工具 #效率工具 #开发者
