<#
.SYNOPSIS
  一条命令发版：检查 → 升版本 → 写 CHANGELOG 占位 → 提交 → 打标签 → 推送。

.DESCRIPTION
  只做机械动作，不替你写代码。用完记得去网页补 Release 说明：
  https://github.com/WenWenttt/dsh-anima-studio/releases/new

.PARAMETER Bump
  patch（修 bug）/ minor（新功能）/ major（破坏性变更）

.PARAMETER Message
  提交信息。默认 "chore: 升级到 x.y.z"

.PARAMETER NoPush
  只在本地提交与打标签，不推远端（演练用）

.PARAMETER DryRun
  只打印将要做什么，不改任何文件

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\scripts\release.ps1 -Bump patch
.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\scripts\release.ps1 -Bump minor -DryRun
#>
[CmdletBinding()]
param(
  [Parameter(Mandatory)][ValidateSet('patch', 'minor', 'major')][string]$Bump,
  [string]$Message = '',
  [switch]$NoPush,
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
function Step($t) { Write-Host "`n== $t" -ForegroundColor Cyan }
function Ok($t) { Write-Host "   [OK] $t" -ForegroundColor Green }
function Info($t) { Write-Host "   [..] $t" -ForegroundColor DarkGray }
function Die($t) { Write-Host "   [X]  $t" -ForegroundColor Red; exit 1 }

$repo = Split-Path -Parent $PSScriptRoot
$git = (Get-Command git -ErrorAction SilentlyContinue).Source
if (-not $git) { Die '找不到 git，先装 Git for Windows' }

Step '检查仓库状态'
if (-not (Test-Path (Join-Path $repo '.git'))) { Die "$repo 不是 git 仓库" }
$dirty = & $git -C $repo status --porcelain
if ($dirty) {
  Write-Host $dirty
  Die '工作区有未提交的改动，先 commit 或 stash'
}
$branch = (& $git -C $repo branch --show-current).Trim()
if ($branch -ne 'main') { Die "当前分支是 $branch，不是 main" }
Ok "分支 main，工作区干净"

Step '跑测试'
$node = (Get-Command node -ErrorAction SilentlyContinue).Source
if (-not $node) {
  Write-Host '   [!] 找不到 node，跳过测试（CI 仍会跑）' -ForegroundColor Yellow
} else {
  foreach ($f in @('client.js', 'index.js', 'tags.js', 'translate.js', 'setup.js', 'tagdata.js')) {
    & $node --check (Join-Path $repo $f)
    if ($LASTEXITCODE -ne 0) { Die "语法检查失败: $f" }
  }
  Ok 'node --check 通过'
  foreach ($t in @('test/translate.test.mjs', 'test/setup.test.mjs', 'test/ui-smoke.test.mjs')) {
    Info "运行 $t"
    & $node (Join-Path $repo $t) | Out-Null
    if ($LASTEXITCODE -ne 0) { Die "测试失败: $t" }
  }
  Ok '三套测试通过'
}

Step '计算新版本'
$pkgPath = Join-Path $repo 'package.json'
$pkg = Get-Content $pkgPath -Raw -Encoding UTF8 | ConvertFrom-Json
$old = $pkg.version
$parts = $old.Split('.')
$major = [int]$parts[0]; $minor = [int]$parts[1]; $patch = [int]$parts[2]
switch ($Bump) {
  'major' { $major++; $minor = 0; $patch = 0 }
  'minor' { $minor++; $patch = 0 }
  'patch' { $patch++ }
}
$new = "$major.$minor.$patch"
$tag = "v$new"
if (-not $Message) { $Message = "chore: 升级到 $new" }
Info "版本 $old -> $new   tag: $tag"

$existing = & $git -C $repo tag --list $tag
if ($existing) { Die "标签 $tag 已存在" }

if ($DryRun) {
  Write-Host "`nDryRun：以下动作未执行：" -ForegroundColor Cyan
  Write-Host "  1. package.json version: $old -> $new"
  Write-Host "  2. CHANGELOG.md 顶部插入 '## $new'"
  Write-Host "  3. git add + commit '$Message'"
  Write-Host "  4. git tag $tag"
  if (-not $NoPush) { Write-Host '  5. git push && git push --tags' }
  return
}

Step "写入版本号 $new"
$raw = Get-Content $pkgPath -Raw -Encoding UTF8
$raw = [regex]::Replace($raw, '"version":\s*"[^"]+"', "`"version`": `"$new`"", 1)
[System.IO.File]::WriteAllText($pkgPath, $raw, (New-Object System.Text.UTF8Encoding($false)))
Ok 'package.json 已更新'

Step '写 CHANGELOG'
$changePath = Join-Path $repo 'CHANGELOG.md'
$change = Get-Content $changePath -Raw -Encoding UTF8
$entry = "## $new`n`n- TODO: 一句话说明本次改动`n`n"
if ($change -match '(?m)^## ') {
  $change = [regex]::Replace($change, '(?m)^(## )', ($entry + '$1'), 1)
} else {
  $change = $change + "`n" + $entry
}
[System.IO.File]::WriteAllText($changePath, $change, (New-Object System.Text.UTF8Encoding($false)))
Ok 'CHANGELOG.md 已插入新条目（记得填 TODO）'

Step '提交并打标签'
& $git -C $repo add package.json CHANGELOG.md
& $git -C $repo commit -m $Message | Out-Null
if ($LASTEXITCODE -ne 0) { Die '提交失败' }
& $git -C $repo tag $tag
Ok "已提交并打标签 $tag"

if ($NoPush) {
  Write-Host "`n未推送（-NoPush）。确认无误后执行：" -ForegroundColor Yellow
  Write-Host "  git push && git push --tags"
} else {
  Step '推送到 GitHub'
  & $git -C $repo push | Out-Null
  & $git -C $repo push --tags | Out-Null
  Ok '已推送代码与标签'
}

Write-Host "`n下一步：去网页写 Release 说明" -ForegroundColor Cyan
Write-Host "  https://github.com/WenWenttt/dsh-anima-studio/releases/new?tag=$tag"
Write-Host "  把 CHANGELOG 里「## $new」那一段粘过去即可。`n"
