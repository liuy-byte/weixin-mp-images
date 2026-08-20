很多人用 Claude Code，从头到尾只用过默认人格。其实它内置 5 种输出风格，本质是换系统提示词，切一下干活路数完全不一样：

① Default 默认：话不多活不少，日常写代码、修 bug 就用它
② Proactive 主动：别问先干，拿不准的自己拍板，适合赶进度、当甩手掌柜
③ Explanatory 讲解：边干边唠，讲清为啥这么改，接手祖传代码、code review 好用
④ Learning 学习：师傅带徒弟，故意留 TODO(human) 让你亲手写关键几行
⑤ Concise 简洁：开口就是结果，不铺垫不碎碎念，活一点不少干

Concise 是 v2.1.237 刚上线的，官方文档页都还没来得及更新。切换走 /config → Output style，切完 /clear 才生效。
