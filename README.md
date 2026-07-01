# VerilogLearn V5.0

面向中文零基础学习者的 Verilog 交互式学习站点。V5.0 融合了 best_final（功能全）和 v4.1（打磨细）的优点。

## V5.0 融合清单

| 特性 | 来源 | 说明 |
|---|---|---|
| 🔍 全局搜索 | best_final | 搜索教程、练习题、Bug、波形、项目、速查表 |
| 📋 代码自动复制 | best_final | 所有 `<pre>` 块自动注入复制按钮 |
| 📱 PWA 安装提示 | best_final | beforeinstallprompt 横幅 + 可关闭 |
| ⌨️ 键盘快捷键 | best_final | Esc 关闭侧栏 / ← → 章节导航 |
| 🛡️ 增强静态检查 | best_final | module/endmodule 闭合 + begin/end + 逗号敏感列表 |
| 🔗 速查表URL同步 | best_final | 切换标签页 URL 同步，可分享链接 |
| 🎯 全量练习场 | best_final | 微练习 + 综合练习 + 项目实战 全部可对比 |
| 🌙 编辑器暗色主题 | v4.1 | CodeMirror 暗色 Compartment 完整适配 |
| 💾 展开状态持久化 | v4.1 | Bug/Waveform 展开状态 localStorage 保存 |
| 💾 练习场代码持久化 | v4.1 | Playground 代码刷新不丢失 |
| 🧩 统一 UI 状态 | v4.1 | UiContext 管理暗色+展开+代码，一份 JSON 存储 |

## 功能总览

- 20 章系统教程、15 道微练习、30 道综合练习、8 道 Bug Hunt、3 道波形阅读、5 个 UART 项目步骤
- 本地进度保存，支持完成/取消完成
- CodeMirror 6 代码练习场，提供静态检查和参考答案关键结构对比
- 全局搜索、暗色模式（编辑器同步）、代码块复制、PWA 离线缓存和添加到桌面
- HashRouter 路由，适配 GitHub Pages 子路径访问

## 本地开发

```bash
npm install
npm run dev
```

## 验证

```bash
npm run typecheck
npm run test
npm run build
npm run e2e
```

## 部署到 GitHub Pages

1. 把项目推送到 GitHub 仓库
2. 在仓库 Settings → Pages 中选择 GitHub Actions
3. 推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布 `dist`