<#
.SYNOPSIS
  一键准备 ComfyUI 运行环境（Windows / NVIDIA），并生成插件能用的启动脚本。

.DESCRIPTION
  做四件事：
    1. 检查 python（git 可选）
    2. 把 ComfyUI 放到 <Root>\ComfyUI —— 有 git 就浅克隆，没有就下 zip 解压
    3. 建 venv 并装 PyTorch + requirements（-SkipDeps 可跳过，适合已有环境）
    4. 生成 launch-comfy.ps1（监听 -Port），打印插件配置片段

  模型权重不在这里下载：插件页面「准备环境 → 下载模型」会断点续传地拉，
  也可以手动把 safetensors 放进 <Root>\ComfyUI\models\checkpoints。

.PARAMETER Root
  安装根目录，默认 %USERPROFILE%\.dsh\anima-studio\setup

.PARAMETER Port
  ComfyUI 监听端口，默认 8190（与插件默认 baseURL 一致）

.PARAMETER Python
  python.exe 路径；默认从 PATH 找

.PARAMETER CudaIndex
  PyTorch CUDA 轮子索引，默认 cu124；纯 CPU 传 cpu

.PARAMETER PipMirror
  pip 镜像，例如 https://pypi.tuna.tsinghua.edu.cn/simple

.PARAMETER SourceZip
  离线/内网时指定 ComfyUI 源码包：本地 zip 路径或 http(s) 直链

.PARAMETER SkipDeps
  只准备 ComfyUI 与启动脚本，不装 PyTorch/依赖（已有环境或只想验证流程）

.PARAMETER SkipVenv
  不用虚拟环境，直接用 -Python 指定的解释器（venv 装不上时的退路）

.PARAMETER DryRun
  只打印将要做的事，不落盘

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\scripts\install-comfyui.ps1 -Port 8190
.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\scripts\install-comfyui.ps1 -Root D:\ComfyUI-env -CudaIndex cu121 -PipMirror https://pypi.tuna.tsinghua.edu.cn/simple
#>
[CmdletBinding()]
param(
  [string]$Root = (Join-Path $HOME '.dsh\anima-studio\setup'),
  [int]$Port = 8190,
  [string]$Python = '',
  [string]$CudaIndex = 'cu124',
  [string]$PipMirror = '',
  [string]$SourceZip = '',
  [switch]$SkipDeps,
  [switch]$SkipVenv,
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
function Step($text) { Write-Host "`n== $text" -ForegroundColor Cyan }
function Ok($text) { Write-Host "   [OK] $text" -ForegroundColor Green }
function Info($text) { Write-Host "   [..] $text" -ForegroundColor DarkGray }
function Warn($text) { Write-Host "   [!]  $text" -ForegroundColor Yellow }
function Say($text) { if ($DryRun) { Write-Host "   [dry] $text" -ForegroundColor DarkYellow } }

$comfy = Join-Path $Root 'ComfyUI'
$venv = Join-Path $Root 'venv'
$py = Join-Path $venv 'Scripts\python.exe'
$launcher = Join-Path $Root 'launch-comfy.ps1'
$zipUrl = 'https://codeload.github.com/comfyanonymous/ComfyUI/zip/refs/heads/master'

Step '环境检查'
$git = (Get-Command git -ErrorAction SilentlyContinue).Source
if ($git) { Ok "git: $git" } else { Warn '没有 git，将用 zip 包（不需要额外安装）' }

if (-not $Python) {
  $found = Get-Command python -ErrorAction SilentlyContinue
  if (-not $found) {
    throw '找不到 python。装 Python 3.11/3.12（勾选 Add to PATH），或用 -Python 指定 python.exe 路径。'
  }
  $Python = $found.Source
}
if (-not (Test-Path $Python)) { throw "python 不存在: $Python" }
$pyVersion = & $Python -c "import sys;print('%d.%d' % sys.version_info[:2])"
Ok "python $pyVersion ($Python)"

Say "安装根目录: $Root"
Say "ComfyUI: $comfy"
Say "venv: $venv"
Say "启动脚本: $launcher"
if ($DryRun) {
  Write-Host "`nDryRun：以上是路径规划，未做任何改动。去掉 -DryRun 再执行。" -ForegroundColor Cyan
  return
}

Step '获取 ComfyUI'
if (Test-Path (Join-Path $comfy 'main.py')) {
  Ok "已存在，跳过: $comfy"
} else {
  New-Item -ItemType Directory -Force -Path $Root | Out-Null
  $source = if ($SourceZip) { $SourceZip } else { $zipUrl }
  if ($git -and -not $SourceZip) {
    git clone --depth 1 https://github.com/comfyanonymous/ComfyUI.git $comfy
    if ($LASTEXITCODE -ne 0) { throw 'git clone 失败（网络？可用 -SourceZip 指定离线包）' }
    Ok "已克隆: $comfy"
  } else {
    $tmpZip = Join-Path $Root 'comfyui.zip'
    $tmpDir = Join-Path $Root 'comfyui-unzip'
    Info "下载源码包: $source"
    if ($source -match '^https?://') {
      Invoke-WebRequest -Uri $source -OutFile $tmpZip -UseBasicParsing
    } else {
      Copy-Item -LiteralPath $source -Destination $tmpZip -Force
    }
    if (-not (Test-Path $tmpZip)) { throw "源码包不存在: $source" }
    Remove-Item $tmpDir -Recurse -Force -ErrorAction SilentlyContinue
    try {
      Expand-Archive -LiteralPath $tmpZip -DestinationPath $tmpDir -Force
    } catch {
      throw "源码包无法解压（不是有效 zip 或已损坏）：$source"
    }
    $inner = Get-ChildItem $tmpDir -Directory | Select-Object -First 1
    if (-not $inner) { throw '源码包结构不对（解压后没有目录）' }
    if (-not (Test-Path (Join-Path $inner.FullName 'main.py'))) { throw '源码包里没有 main.py' }
    Move-Item -LiteralPath $inner.FullName -Destination $comfy
    Remove-Item $tmpDir -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item $tmpZip -Force -ErrorAction SilentlyContinue
    Ok "已解压: $comfy"
  }
}

Step '创建 Python 虚拟环境'
if ($SkipVenv) {
  $py = $Python
  Warn "跳过 venv，直接用 $Python"
} elseif (Test-Path $py) {
  Ok "复用已有 venv"
} else {
  & $Python -m venv $venv
  if ($LASTEXITCODE -ne 0 -or -not (Test-Path $py)) {
    throw @'
创建 venv 失败。常见原因与对策：
  - python 缺 venv/ensurepip：先跑  python -m ensurepip --upgrade
  - TEMP/TMP 指向只读目录：把环境变量指到可写位置再试
  - 安全软件拦截写临时目录
也可以加 -SkipVenv，直接装进 -Python 指定的解释器。
'@
  }
  Ok "venv: $venv"
}

Step '写入启动脚本'
$launcherText = @"
# 由 install-comfyui.ps1 生成；插件配置里的 startScript 指向这个文件。
Set-Location '$comfy'
& '$py' main.py --listen 127.0.0.1 --port $Port
"@
Set-Content -Path $launcher -Value $launcherText -Encoding UTF8
Ok "启动脚本: $launcher"

$checkpoints = Join-Path $comfy 'models\checkpoints'
New-Item -ItemType Directory -Force -Path $checkpoints | Out-Null

if ($SkipDeps) {
  Step '跳过依赖安装（-SkipDeps）'
  Info '如果你已经有能跑的 ComfyUI 环境，这样只生成启动脚本就够了。'
} else {
  Step "升级 pip"
  $pipBase = @('-m', 'pip', 'install', '--upgrade', 'pip')
  if ($PipMirror) { $pipBase += @('-i', $PipMirror) }
  & $py @pipBase | Out-Host

  Step "安装 PyTorch（$CudaIndex）"
  if ($CudaIndex -eq 'cpu') {
    & $py -m pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
  } else {
    & $py -m pip install torch torchvision --index-url "https://download.pytorch.org/whl/$CudaIndex"
  }
  if ($LASTEXITCODE -ne 0) { throw "PyTorch 安装失败：换 -CudaIndex（cu121/cu124/cu126）或检查网络/镜像" }

  Step '安装 ComfyUI 依赖'
  $req = Join-Path $comfy 'requirements.txt'
  if (Test-Path $req) {
    $reqArgs = @('-m', 'pip', 'install', '-r', $req)
    if ($PipMirror) { $reqArgs += @('-i', $PipMirror) }
    & $py @reqArgs
    if ($LASTEXITCODE -ne 0) { throw 'requirements.txt 安装失败' }
  } else {
    Warn '没有 requirements.txt，跳过'
  }
}

Write-Host "`n完成。下一步：" -ForegroundColor Cyan
Write-Host "  1) 启动 ComfyUI： powershell -ExecutionPolicy Bypass -File `"$launcher`""
Write-Host "  2) 模型放到：    $checkpoints"
Write-Host '     （或回插件页面点「准备环境 → 下载模型到 ComfyUI」，支持断点续传）'
Write-Host '  3) 插件配置（profile 的 cordis.patch.yml → anima-studio.config）：'
Write-Host "       baseURL: http://127.0.0.1:$Port"
Write-Host "       comfyRoot: $comfy"
Write-Host "       startScript: $launcher"
Write-Host '     然后重启 dsh。'
