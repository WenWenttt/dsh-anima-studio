# 维护手册

这份文档写给未来的你（以及任何接手的人）。目标：**半年不碰代码，回来也能在 10 分钟内发一个版本**。

## 一、维护的三件事

| 事情 | 频率 | 花多久 |
| --- | --- | --- |
| 跟进上游变化（dsh / ComfyUI / 浏览器） | 上游发版时 | 15 分钟验证 |
| 处理 issue / PR | 每周扫一次 | 视情况 |
| 发版（改代码后） | 每次合并后 | 3 分钟，见第五节 |

其余时间不用管——本插件**没有运行时依赖**，不存在"依赖过期"的焦虑。

## 二、每周 5 分钟

- 看 [Issues](https://github.com/WenhuarenNB/dsh-anima-studio/issues)：有无新问题、是否需要复现
- 看 [Actions](https://github.com/WenhuarenNB/dsh-anima-studio/actions)：是否还是绿的（红了通常是 GitHub 环境变化，见第七节）
- 看 dsh 是否发了新版（`dsh` 更新后务必本地跑一遍插件，见第三节）

## 三、兼容性：升级 dsh 之后必须验证的 5 处

这个插件贴着 dsh 的私有约定写，**dsh 升级是最可能把它弄坏的原因**。每次 dsh 升级后，按顺序过一遍：

| # | 依赖点 | 位置 | 坏了的表现 |
| --- | --- | --- | --- |
| 1 | `window.__ModuleLoader__.load({ id, factory })` | `client.js` 第 1 行 | 侧边栏点「图片创作」空白、控制台报 `__ModuleLoader__ is not defined` |
| 2 | `require('react')` / `require('react-dom')`（`createPortal`） | `client.js` 顶部 | 面板/下拉不出现，或报 `unexpected require` |
| 3 | `ctx.slots.register` / `ctx.slots.inject`（`main`、`sidebar.panellist`） | `client.js` 末尾 `apply()` | 页面挂不上，或侧边栏没有入口 |
| 4 | `ctx.webServer.register({ kind:'exact', path, handler })` | `index.js` `registerRoutes()` | 所有接口 404 |
| 5 | `ctx.llm.prepareCall / stream`（中文转换的模型兜底） | `translate.js` `dispatch()` | 转换退回词典（功能降级但不出错），日志里有 "本机没有可用的模型服务" |

验证方法：重启 dsh → 打开「图片创作」→ 依次点「中 → 标签」「生成图片」（ComfyUI 开着时）。五步都通过就说明兼容。

**ComfyUI 侧**（相对稳定，但注意）：

- `/prompt`、`/history`、`/view`、`/object_info` 四个接口的形态
- 自定义节点名（`LoraLoader`、`ControlNetApplyAdvanced` 等）——用户装了不同节点包时可能同名不同参
- 端口/地址变化：用户改了端口就改 `baseURL`，插件本身不写死

## 四、问题处理 SOP

1. **先看模板信息**：Issue 表单强制填了 dsh 版本、ComfyUI 版本、显卡、模式、环节、日志——缺一半的，先回一句「补一下 X」再动手
2. **复现**：用他给的模式 + 提示词走一遍；不能复现就按「环境差异」处理（多数是 ComfyUI 自定义节点、显存、模型文件问题）
3. **定位到层**：
   - 页面问题 → 浏览器控制台
   - 接口问题 → dsh 终端日志（`/api/anima-studio/*` 的报错会打印）
   - 生成问题 → ComfyUI 自己的控制台
4. **修 + 回补测试**：能写成断言的都写进 `test/`（例如「新控件渲染出来」「转换结果包含某标签」），以后不会再退化
5. **打标签**：`bug` / `enhancement` / `question` / `wontfix`（模板已自动打前两个）
6. 修完合进 `main`，走发版流程

## 五、发版流程（已脚本化）

```powershell
# 1. 先确认工作区干净、测试全绿
npm test

# 2. 一条命令完成：跑检查 → 升版本 → 写 CHANGELOG 占位 → 提交 → 打标签 → 推送
powershell -ExecutionPolicy Bypass -File .\scripts\release.ps1 -Bump patch
#    -Bump patch|minor|major   ← 修 bug 用 patch，加功能用 minor，改数据结构用 major
#    -NoPush                    ← 只在本地演练，不推远端
#    -DryRun                    ← 只打印将要做什么

# 3. 去网页写 Release 说明（把 CHANGELOG 里那一段粘过去）
#    https://github.com/WenhuarenNB/dsh-anima-studio/releases/new
```

版本号规则（语义化）：

| 场景 | 例子 | Bump |
| --- | --- | --- |
| 修 bug、改文案、调样式 | 1.9.1 → 1.9.2 | `patch` |
| 新功能（新模式、新面板、新工具） | 1.9.2 → 1.10.0 | `minor` |
| 破坏性变更（改词库格式、改接口字段、改配置键） | → 2.0.0 | `major` |

## 六、数据与授权（别忘这一块）

- `tagdata.js` 是**生成产物**：改词库要改 `scripts/build-tagdata.mjs` 或输入 JSON，再重跑，别手改
- 授权记录在 `NOTICE.md`，截图在 `docs/permission-2026-11-22.png`
- 如果作者日后要求改署名 / 限范围 / 撤回：**先改 NOTICE 再动手**，必要时直接删 `tagdata.js`（代码不依赖它的结构，插件会退化成空词库）
- 想换数据源（例如用 danbooru 官方 dump 重建）：只改 `build-tagdata.mjs` 的输入格式，`tags.js` 不用动

## 七、CI 红了怎么办

三套测试都不联网、不装依赖，所以红了一般是环境变化：

| 现象 | 处理 |
| --- | --- |
| `npm run check` 失败 | 真语法错误，本地跑同样命令即可复现 |
| 某个测试在 Node 24 失败、22 通过 | 用到了新版才有的 API；把 matrix 里失败的版本下限提上去，或改写法 |
| Actions 起不来 / 排队很久 | GitHub 侧问题，等；偶尔需要重新运行（Re-run jobs） |
| `ubuntu-latest` 升级导致行为变化 | 与插件无关，重跑即可；长期看把 `runs-on` 固定到 `ubuntu-24.04` |

## 八、备份与回滚

- **代码**：每个版本一个 tag，回滚就是 `git checkout v1.9.1`
- **本机安装**：插件目录里的 `.backup-*` 是我改代码时留的快照，可删（已在 `.gitignore`）
- **profile 配置**：改 `cordis.patch.yml` 前先复制一份 `.bak`（上次加 `comfyRoot` 就是这么做的）
- **用户的生成图**：在 `~/.dsh/anima-studio/jobs/`，**不要**放进仓库

## 九、安全底线（每次提交前瞄一眼）

- 不提交密钥：`~/.dsh/.credentials.yaml`、任何 `Bearer`、API key
- 不提交个人绝对路径：`C:\Users\...`、`D:\...`（配置示例用占位符）
- Actions 权限保持最小（`permissions: contents: read` 已设）
- 第三方 PR 先看改了哪些文件，尤其是 `client.js`（它可以调 `require`，等于任意代码执行）

## 十、如果你哪天不想维护了

三种体面退出方式，按顺序推荐：

1. **README 顶部加维护状态**：`> 本项目目前只做兼容性修复，不接新功能。` 
2. **归档**（Settings → 最下方 Archive this repository）：只读，issue 仍可看，别人还能 fork
3. **找接手**：在 README 写清模块划分与第五节发版流程（本文件就是为此写的），或者直接接受社区 PR

**不要**直接删仓库：已经有 Release 和安装说明散落在外面，删了会让使用者踩空。
