# Changelog

版本号跟随 `package.json`。日期为本地时间。

## 1.9.1

`install-comfyui.ps1` 实测后加固：

- **不再依赖 git**：没装 git 时自动下载 zip 解压（`-SourceZip` 支持本地包/直链）
- 新增 `-DryRun`（只打印路径规划）、`-SkipVenv`（venv 装不上时直接装进 base python）、`-SkipDeps`
- venv 失败时给出可操作提示（ensurepip / TEMP 只读 / 安全软件），不再只抛一句"创建失败"
- 坏 zip 给出明确报错（"源码包无法解压…"）而不是 .NET 堆栈
- README 补参数表

## 1.9.0

「下载即用」：

- 新增 `setup.js`：环境就绪检查（ComfyUI 在线 / 模型文件到位）+ **模型下载器**
  - 断点续传（HTTP Range）、`.part` 原子落盘、进度/速度/ETA、可取消
  - 官方源失败自动切 `hf-mirror.com`；可用 `modelSource` / `modelUrl` 覆盖
- 新增路由：`GET /setup`（计划）、`GET /setup?action=progress`（进度）、`POST /setup`（`download` / `cancel`）
- 页面顶部新增「环境未就绪」横幅：展开后能看到 ComfyUI 与模型状态、一键下载（带进度条）、复制 ComfyUI 安装命令
- 新增 `scripts/install-comfyui.ps1`：git + python venv 一键装 ComfyUI（CUDA 轮子/PyPI 镜像可选），生成 `launch-comfy.ps1`
- 配置项新增 `comfyRoot` / `setupRoot` / `modelSource` / `modelUrl`
- 测试新增 `test/setup.test.mjs`（25 项）；CI 增加一步
- 权重不进仓库的原因写进 README：GitHub 单文件 100 MB / Release 2 GB，且 Animagine 采用 FAIPL-1.0-SD

## 1.8.0

开源整理：

- 补 `LICENSE`（MIT）、`NOTICE.md`（`tagdata.js` 的数据来源与授权说明）、`.gitignore`、本 changelog
- 新增 `scripts/build-tagdata.mjs`：`tagdata.js` 改为可重跑生成，换数据源不用改代码
- 测试搬进仓库：`test/translate.test.mjs`（32 项）、`test/ui-smoke.test.mjs`（迷你 React 渲染冒烟），路径全部改成相对路径
- 新增 GitHub Actions：Node 22 / 24 上跑语法检查 + 两套测试
- 去掉个人机器痕迹：`startScript` 默认值从 `D:\anima-studio\launch-dsh.ps1` 改为空（不填就不负责拉起 ComfyUI），错误提示不再指向私有路径
- 清掉死代码：`.as-sel` / `.as-pop-add` / `.as-radio` / `.as-btn.sm.pri` 等无引用样式、`STATUS_TEXT` 常量
- `package.json` 补 `repository` / `homepage` / `bugs` / `keywords` / `scripts`，去掉 `private`

## 1.7.0

- 移除「转换引擎」整块：不再有 `自动 / 词典 / 模型` 选择、模型面板、`/models` 路由、`tagEngine/tagProvider/tagModel` 字段
- 转换固定为「词典优先，切不干净才叫模型」，模型仍用配置里的 `llmProvider / llmModel`
- 「角色自动补外观」从面板搬到创作页，和场景模板 / 画师风格同一行
- `/translate` 请求精简为 `{ text, mode, appearance }`

## 1.6.0

- 场景模板（26 个）、画师风格（106 个）、负面预设（含词库 134 条负面）三块 UI
- 新增 `GET /api/anima-studio/library`（静态数据，进页面拉一次）
- `tagdata.js` 增加 `PRESETS` / `ARTISTS` / `NEGATIVES` 导出

## 1.5.0

- 接入 Prompt Forge v3.0 的标签库：3706 条中文映射、507 个角色、382 条别名
- 角色命中可自动补外观标签（发色/瞳色/服装…）
- 词库清洗：单字键、纯拉丁键、整句描述、`wearing X` 全部剔除；多义按「手写 > 分类标签 > 别名 > 角色名」裁决

## 1.4.0

- 转换引擎面板：可选 / 新增 provider+model 通道（1.7.0 移除）

## 1.3.2

- 转换提示词按生成模式收敛（图生图只补改动、蒙版重绘只描述白区、ControlNet 不补视角/姿势）
- 非文生图模式剥离模型自作主张的质量标签
- 转换失败时：文生图拦住，其余模式按原文继续

## 1.3.1

- 创作页跟随生成模式：模式胶囊、参考图/蒙版/控制图控件、尺寸置灰、按钮文案
- 提交前校验缺参考图 / 缺蒙版 / 缺模型

## 1.3.0

- 中文 → 标签新增模型路线（`translate.js`，走 DSH `ctx.llm`），词典做兜底
- 「中 → 标签」按钮与转换引擎开关

## 1.2.1

- 修复浮层定位：`position: fixed` 在 transform 祖先里的坐标漂移
- 「中 → 标签」空提示词、纯英文、无匹配时给出明确反馈

## 1.2.0

- 「?」提示改为自绘气泡（悬停/聚焦、箭头、贴边翻转、Esc 关闭）

## 1.1.0

- 下拉菜单全部自绘（圆角浮层、选中打勾、危险项标红、上下翻转）
- 提示统一改成右下角 toast（5 秒自动消失）
- 参数草稿自动保存，LoRA 叠层随草稿恢复
- LoRA 列表自动加载 + 缓存 + 刷新按钮

## 1.0.0

- 首版：图像 / 图库两个页面、尺寸与比例预设、采样参数、LoRA 叠加、创作预设、星标/归档/删除
- 四个对话工具：`anima_generate_image` / `anima_image_status` / `anima_image_gallery` / `anima_controlnets`
