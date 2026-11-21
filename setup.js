// 环境准备：检测 ComfyUI / 模型文件，并在插件里直接下载权重。
//
// 为什么不在仓库里带模型：
//   Animagine XL 4.0 Opt 的 fp16 safetensors 约 6.9 GB，GitHub 单文件 100 MB、
//   Release 单文件 2 GB 的硬限制都过不去；而且权重受 FAIPL-1.0-SD 约束，
//   再分发要附带许可证与署名。所以这里做「首次运行自动下载」：
//   用户点一下，插件把权重拉到 ComfyUI 的 models/checkpoints，之后照常出图。

import { createWriteStream } from 'node:fs';
import { mkdir, stat, rename, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';

const HF = 'https://huggingface.co';
const HF_MIRROR = 'https://hf-mirror.com';

/** 内置模型清单：文件名 / 大小（字节，用于进度与完整性校验）/ 下载地址。 */
export const MODEL_CATALOG = {
  'animagine-xl-4.0-opt': {
    label: 'Animagine XL 4.0 Opt（fp16，约 6.9 GB）',
    file: 'animagine-xl-4.0-opt.safetensors',
    bytes: 6_940_000_000,
    repo: 'cagliostrolab/animagine-xl-4.0',
    license: 'FAIPL-1.0-SD',
    licenseUrl: 'https://freedevproject.org/faipl-1.0-sd/',
  },
};

/** 组装下载地址：auto 先官方，失败再镜像；hf / mirror 强制其中一个。 */
export function modelUrls(entry, source = 'auto') {
  if (!entry || !entry.repo || !entry.file) return [];
  const path = `${entry.repo}/resolve/main/${entry.file}?download=true`;
  const hf = `${HF}/${path}`;
  const mirror = `${HF_MIRROR}/${path}`;
  if (source === 'hf') return [hf];
  if (source === 'mirror') return [mirror];
  return [hf, mirror];
}

export function homeSetupRoot(config) {
  const custom = config && typeof config.setupRoot === 'string' ? config.setupRoot.trim() : '';
  if (custom) return custom;
  const home = process.env.DSH_HOME || join(homedir(), '.dsh');
  return join(home, 'anima-studio', 'setup');
}

/**
 * 计算「模型该放哪、下哪个文件」。
 * comfyRoot 指向 ComfyUI 根目录；没配就退回 setupRoot/ComfyUI（一键脚本的默认位置）。
 */
export function resolveSetup(config = {}) {
  const setupRoot = homeSetupRoot(config);
  const comfyRoot = String(config.comfyRoot || '').trim() || join(setupRoot, 'ComfyUI');
  const modelFile = String(config.checkpoint || config.modelFile || 'animagine-xl-4.0-opt.safetensors').trim();
  const entry = MODEL_CATALOG['animagine-xl-4.0-opt'];
  const urls = config.modelUrl ? [String(config.modelUrl).trim()] : modelUrls(entry, config.modelSource || 'auto');
  return {
    setupRoot,
    comfyRoot,
    checkpointsDir: join(comfyRoot, 'models', 'checkpoints'),
    modelFile,
    targetPath: join(comfyRoot, 'models', 'checkpoints', modelFile),
    expectedBytes: modelFile === entry.file ? entry.bytes : 0,
    urls,
    license: entry.license,
    licenseUrl: entry.licenseUrl,
  };
}

/** 纯函数：把探测结果拼成一份计划，方便单测与前端渲染。 */
export function buildPlan({ setup, comfy, checkpoint }) {
  const steps = [];
  steps.push({
    id: 'comfyui',
    label: 'ComfyUI 服务',
    ok: Boolean(comfy && comfy.reachable),
    detail: comfy && comfy.reachable ? `在线 · ${comfy.version || '未知版本'}` : '离线（先启动 ComfyUI）',
  });
  steps.push({
    id: 'checkpoint',
    label: '模型文件',
    ok: Boolean(checkpoint && checkpoint.present),
    detail: checkpoint && checkpoint.present
      ? `已就位 · ${(checkpoint.bytes / 1024 ** 3).toFixed(2)} GB`
      : `缺失 · 应放在 ${setup.checkpointsDir}`,
  });
  return {
    ready: steps.every((step) => step.ok),
    steps,
    setup,
    license: { name: setup.license, url: setup.licenseUrl },
  };
}

/** 检查模型文件是否就位（存在且体积合理）。 */
export async function probeCheckpoint(setup) {
  try {
    const info = await stat(setup.targetPath);
    const min = setup.expectedBytes ? setup.expectedBytes * 0.9 : 1024 ** 3;
    const part = await stat(`${setup.targetPath}.part`).catch(() => null);
    return { present: info.size >= min, bytes: info.size, partialBytes: part ? part.size : 0 };
  } catch {
    const part = await stat(`${setup.targetPath}.part`).catch(() => null);
    return { present: false, bytes: 0, partialBytes: part ? part.size : 0 };
  }
}

/* ------------------------------------------------------------------ *
 * 下载器：断点续传（Range）+ 原子落盘（.part → rename）+ 进度/速度/ETA
 * ------------------------------------------------------------------ */

const state = {
  status: 'idle', // idle | running | done | error | cancelled
  received: 0,
  total: 0,
  file: '',
  url: '',
  startedAt: 0,
  updatedAt: 0,
  error: '',
};

let controller = null;

export function downloadState() {
  const { received, total, startedAt, updatedAt } = state;
  const elapsed = updatedAt > startedAt ? (updatedAt - startedAt) / 1000 : 0;
  const speed = elapsed > 0 ? received / elapsed : 0;
  const percent = total > 0 ? Math.min(100, (received / total) * 100) : 0;
  const eta = speed > 0 && total > received ? (total - received) / speed : 0;
  return { ...state, percent, speed, eta };
}

async function exists(path) {
  try {
    const info = await stat(path);
    return info.size;
  } catch {
    return 0;
  }
}

async function fetchTo(url, dest, expectedBytes, signal) {
  const partPath = `${dest}.part`;
  const already = await exists(partPath);
  const headers = already > 0 ? { range: `bytes=${already}-` } : {};
  const res = await fetch(url, { headers, signal, redirect: 'follow' });
  if (!res.ok && res.status !== 206) throw new Error(`下载失败：HTTP ${res.status}`);

  const resuming = res.status === 206 && already > 0;
  const total = expectedBytes || (Number(res.headers.get('content-length')) || 0) + (resuming ? already : 0);
  await mkdir(join(dest, '..'), { recursive: true });

  state.received = resuming ? already : 0;
  state.total = total;
  state.startedAt = state.startedAt || Date.now();
  state.updatedAt = Date.now();

  const out = createWriteStream(partPath, { flags: resuming ? 'a' : 'w' });
  const reader = res.body.getReader();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (signal.aborted) throw new Error('已取消');
      out.write(Buffer.from(value));
      state.received += value.byteLength;
      state.updatedAt = Date.now();
      if (state.received > 4 * 1024 ** 3 && !state.total) state.total = expectedBytes;
    }
  } finally {
    await new Promise((resolve, reject) => out.end((err) => (err ? reject(err) : resolve())));
  }
  return partPath;
}

/**
 * 启动下载：优先官方源，失败自动换镜像；已存在 .part 会续传。
 * 只会有一个下载在跑，重复调用返回当前状态。
 */
export function startDownload(setup, options = {}) {
  if (state.status === 'running') return downloadState();
  const urls = options.url ? [String(options.url)] : setup.urls;
  if (!urls.length) throw new Error('没有可用的下载地址');

  controller = new AbortController();
  Object.assign(state, {
    status: 'running',
    received: 0,
    total: setup.expectedBytes || 0,
    file: setup.modelFile,
    url: urls[0],
    startedAt: Date.now(),
    updatedAt: Date.now(),
    error: '',
  });

  (async () => {
    let lastError = '';
    for (const url of urls) {
      state.url = url;
      try {
        const partPath = await fetchTo(url, setup.targetPath, setup.expectedBytes, controller.signal);
        await rm(setup.targetPath, { force: true }).catch(() => {});
        await rename(partPath, setup.targetPath);
        state.status = 'done';
        state.received = state.total || state.received;
        state.updatedAt = Date.now();
        return;
      } catch (error) {
        lastError = error instanceof Error ? error.message : String(error);
        if (controller.signal.aborted) {
          state.status = 'cancelled';
          state.error = '已取消';
          state.updatedAt = Date.now();
          return;
        }
        // 换下一个源继续（.part 会保留，能续传）
      }
    }
    state.status = 'error';
    state.error = lastError || '下载失败';
    state.updatedAt = Date.now();
  })();

  return downloadState();
}

export function cancelDownload() {
  if (controller) controller.abort();
  return downloadState();
}

/** 给前端用的可读体积。 */
export function humanBytes(bytes) {
  const n = Number(bytes) || 0;
  if (n >= 1024 ** 3) return `${(n / 1024 ** 3).toFixed(2)} GB`;
  if (n >= 1024 ** 2) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  if (n >= 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${n} B`;
}
