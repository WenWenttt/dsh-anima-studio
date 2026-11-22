# 参与贡献

感谢你愿意改进这个插件。它是给 dsh（DeepSeek Harness）用的本地生图工作台，代码量不大，但有几个"反常识"的约束，先看一遍能省你不少来回。

## 先沟通，再动手

- **Bug / 想法**：先用 [问题反馈 / 功能建议](https://github.com/WenhuarenNB/dsh-anima-studio/issues/new/choose) 开 issue，说清楚现象、环境、复现步骤。
- **小修**（错字、样式、文档）：可以直接提 PR。
- **大改**（新生成模式、改数据结构、动 `client.js` 的 UI 框架层）：**先开 issue 对齐方案**，避免你写完了方向不对。

## 开发环境

```bash
git clone https://github.com/WenhuarenNB/dsh-anima-studio.git
cd dsh-anima-studio
node --version        # 需要 22.19+ 或 24+
npm run check         # node --check 全部源码
npm test              # 三套测试
```

**这个仓库没有 `npm install` 这一步**：`package.json` 里没有运行时依赖，`peerDependencies`（cordis / schemastery / dsh-tools）由 dsh 宿主提供。CI 也不装依赖，只跑 `node --check` 和测试脚本。

## 代码地图

| 文件 | 说明 |
| --- | --- |
| `index.js` | 服务端：ComfyUI 客户端、任务队列、HTTP 路由（`/state` `/generate` `/translate` `/setup` …）、4 个对话工具 |
| `client.js` | 前端整个工作台，**单文件、无构建**，由 dsh 的模块加载器执行 |
| `setup.js` | 环境准备：模型下载（断点续传/换镜像）、目录推导、就绪检查 |
| `tags.js` | 中文 → 标签：最长匹配 + 颜色×物件组合 + 虚词表 |
| `translate.js` | 模型路线：按生成模式收敛的系统提示、质量标签剥离、缓存 |
| `tagdata.js` | **生成出来的数据**，不要手改（见下） |
| `scripts/` | `build-tagdata.mjs`（重建词库）、`install-comfyui.ps1`（装 ComfyUI） |
| `test/` | `translate.test.mjs`、`setup.test.mjs`、`ui-smoke.test.mjs` |

## `client.js` 的三条硬约束

1. **不许用 JSX / TS**：文件是被 `window.__ModuleLoader__.load({ factory })` 直接执行的普通 JS，没有编译步骤，只能 `const h = React.createElement`。
2. **不许加运行时依赖**：`require()` 只允许 `react` / `react-dom`（dsh 提供）。引入第三方 UI 库会让插件在别人机器上加载失败。
3. **样式写在文件内的 `css` 模板字符串里**，类名统一 `as-` 前缀；颜色一律走 `--dsw-alias-*` 变量，这样明暗主题都能跟着变。

另外几个约定：

- 交互反馈统一用 `notify(...)`（右下角 toast），不要 `alert` / `confirm`（删除确认除外）
- 下拉、气泡、浮层请复用现成的 `Select` / `Hint` / `PickerMenu` / `placeLayer`，不要新造一套定位逻辑（`position: fixed` 在 dsh 的 transform 祖先里会漂移，`placeLayer` 已经处理了）
- 文案用中文，面向用户可见的错误信息要能指导操作（"先启动 ComfyUI"，而不是 "ECONNREFUSED"）

## 测试怎么补

- **纯逻辑**（词库、转换、下载计划）→ 加到 `test/translate.test.mjs` 或 `test/setup.test.mjs`，一个 `check(名称, 条件)` 一行
- **UI 改动** → `test/ui-smoke.test.mjs` 里有一段手写的迷你 React（约 60 行），它会真实执行组件函数、收集元素树；新控件请在那里补断言（例如"点了按钮后出现某个 `.as-pop`"）
- 三套测试都必须本地跑绿再提 PR，CI 会在 Node 22/24 各跑一遍

## 改词库（`tagdata.js`）

它是**生成产物**，格式与清洗规则都在 `scripts/build-tagdata.mjs`：

```bash
npm run build:tagdata          # 需要 tagdata.input.json（仓库里没有，属第三方数据）
```

如果要新增词条，请改生成脚本或输入数据，而不是直接编辑 `tagdata.js`——否则下次重建会被覆盖。
另外：**不要提交来源不明或版权受限的标签数据**，见 [NOTICE.md](NOTICE.md)。

## 提交信息与 PR

提交信息用 `类型: 中文描述`：

```
feat: 支持批量选择参考图
fix: 图生图切换后尺寸没有置灰
docs: 补充 setup 脚本参数
ci: 增加 setup 测试
chore: 升级版本到 1.9.2
```

PR 前自查：

- [ ] `npm run check` 与 `npm test` 通过
- [ ] 用户可见的改动，在 `CHANGELOG.md` 加一行
- [ ] 没有提交密钥、token、个人绝对路径（`C:\Users\...`、`D:\...`）
- [ ] UI 改动附一张截图
- [ ] 没有把 `.backup-*`、`node_modules` 之类带进提交

## 发布流程（维护者）

发版已经脚本化，完整说明见 [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md)。最短路径：

```powershell
npm test                                                   # 1. 测试
powershell -ExecutionPolicy Bypass -File .\scripts\release.ps1 -Bump patch   # 2. 升版本+CHANGELOG+提交+打标签+推送
# 3. GitHub → Releases → 创建发行版，粘贴 CHANGELOG 对应段落
```

`-Bump patch`（修 bug）/ `minor`（新功能）/ `major`（破坏性变更）；加 `-DryRun` 只看计划、`-NoPush` 只本地演练。

## 行为准则

就一句话：**就事论事，对人友善**。技术分歧用截图、日志、复现步骤说话；不针对个人，不刷屏，不发与项目无关的内容。
