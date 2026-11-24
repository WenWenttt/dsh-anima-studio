import { defineTool } from '@deepseek-ai/dsh-tools';
import z from '@deepseek-ai/schemastery';
import { mkdir, readdir, readFile, writeFile, rm, rename } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { hasChinese, DICTIONARY_SIZE, CHARACTER_COUNT, PRESET_COUNT } from './tags.js';
import { PRESETS as TAG_PRESETS, ARTISTS as TAG_ARTISTS, NEGATIVES as TAG_NEGATIVES } from './tagdata.js';
import { resolveTags, pickEngine, pickMode, llmReady, TAGS_SYSTEM_PROMPT } from './translate.js';
import { resolveSetup, buildPlan, probeCheckpoint, startDownload, downloadState, cancelDownload } from './setup.js';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { randomUUID } from 'node:crypto';

export const name = 'dsh-anima-studio';
export const inject = ['webServer', 'tools', 'attachments'];

export const Config = z.object({
  baseURL: z.string().default('http://127.0.0.1:8190'),
  checkpoint: z.string().default('animagine-xl-4.0-opt.safetensors'),
  timeoutMs: z.number().default(900000),
  root: z.string().default(''),
  // 留空 = 不负责拉起 ComfyUI，只轮询；填了就用该脚本拉起（例如自己的 launch-comfy.ps1）。
  startScript: z.string().default(''),
  autoStart: z.boolean().default(true),
  // 环境准备：定位 ComfyUI 的 models/checkpoints，以及模型下载来源。
  comfyRoot: z.string().default(''),
  setupRoot: z.string().default(''),
  modelUrl: z.string().default(''),
  modelSource: z.string().default('auto'),
  defaultLoras: z.string().default(''),
  // 中文 → 标签的模型路线：默认走本机已登录的 deepseek 账号通道。
  llmProvider: z.string().default('deepseek-account'),
  llmModel: z.string().default('deepseek-flash'),
  llmTimeoutMs: z.number().default(30000),
  llmMaxTokens: z.number().default(320),
  llmSystemPrompt: z.string().default(TAGS_SYSTEM_PROMPT),
});

const API = '/api/anima-studio';

const SIZES = [
  { label: '竖 832×1216', width: 832, height: 1216 },
  { label: '竖 896×1152', width: 896, height: 1152 },
  { label: '竖 768×1344', width: 768, height: 1344 },
  { label: '方 1024×1024', width: 1024, height: 1024 },
  { label: '横 1216×832', width: 1216, height: 832 },
  { label: '横 1152×896', width: 1152, height: 896 },
  { label: '横 1344×768', width: 1344, height: 768 },
];

const RATIOS = [
  { key: '1:1', width: 1024, height: 1024 },
  { key: '16:9', width: 1344, height: 768 },
  { key: '9:16', width: 768, height: 1344 },
  { key: '3:2', width: 1216, height: 832 },
  { key: '2:3', width: 832, height: 1216 },
];

const SAMPLERS = [
  'euler_ancestral',
  'euler',
  'dpmpp_2m',
  'dpmpp_2m_sde',
  'dpmpp_3m_sde',
  'dpmpp_sde',
  'uni_pc',
  'ddim',
  'heun',
];

const SCHEDULERS = ['normal', 'karras', 'exponential', 'sgm_uniform', 'simple', 'beta'];

const DEFAULT_NEGATIVE =
  'lowres, bad anatomy, bad hands, text, error, missing finger, extra digits, fewer digits, ' +
  'cropped, worst quality, low quality, low score, bad score, average score, signature, ' +
  'watermark, username, blurry';

const ACTIVE = new Set(['queued', 'running']);
const cancelled = new Set();

const CLIENT_ID = 'dsh-anima-studio';
const MODES = ['txt2img', 'img2img', 'inpaint', 'controlnet'];

// ComfyUI real-time progress: promptId -> { value, max }
const progressMap = new Map();
let progressSocket = null;
let progressConnecting = false;

function rootDir(config) {
  if (config.root && config.root.trim()) return config.root.trim();
  const home = process.env.DSH_HOME || join(homedir(), '.dsh');
  return join(home, 'anima-studio');
}

function jobsDir(config) {
  return join(rootDir(config), 'jobs');
}

function validId(id) {
  return typeof id === 'string' && /^[a-z0-9]{8,32}$/.test(id);
}

async function atomicJSON(path, value) {
  const tmp = `${path}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(value, null, 2), 'utf8');
  try {
    await rename(tmp, path);
  } catch {
    await rm(path, { force: true }).catch(() => {});
    await rename(tmp, path);
  }
}

async function readJob(dir, id) {
  try {
    return JSON.parse(await readFile(join(dir, id, 'job.json'), 'utf8'));
  } catch {
    return undefined;
  }
}

async function writeJob(dir, job) {
  await mkdir(join(dir, job.id), { recursive: true });
  await atomicJSON(join(dir, job.id, 'job.json'), job);
}

async function listJobs(dir, limit = 60) {
  let names = [];
  try {
    names = await readdir(dir);
  } catch {
    return [];
  }
  const items = [];
  for (const id of names) {
    if (!validId(id)) continue;
    const job = await readJob(dir, id);
    if (job) items.push(job);
  }
  items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  return items.slice(0, limit);
}

function imagePath(dir, id, index) {
  return join(dir, id, `${String(index).padStart(3, '0')}.png`);
}

/* ------------------------------------------------------------------ *
 * ComfyUI client
 * ------------------------------------------------------------------ */

function comfyFetch(config, path, init = {}, timeoutMs = 20000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(`${config.baseURL.replace(/\/+$/, '')}${path}`, {
    ...init,
    signal: controller.signal,
  }).finally(() => clearTimeout(timer));
}

async function comfyJSON(config, path, init, timeoutMs) {
  const res = await comfyFetch(config, path, init, timeoutMs);
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text.slice(0, 500) };
  }
  if (!res.ok) {
    const nodeError = body?.error?.message || body?.node_errors;
    throw new Error(`ComfyUI ${res.status}: ${nodeError ? JSON.stringify(nodeError).slice(0, 600) : text.slice(0, 400)}`);
  }
  return body;
}

async function comfyReachable(config) {
  try {
    const stats = await comfyJSON(config, '/system_stats', undefined, 3000);
    return {
      reachable: true,
      version: stats?.system?.comfyui_version ?? null,
      device: stats?.devices?.[0]?.name ?? null,
      vramFreeBytes: stats?.devices?.[0]?.vram_free ?? null,
    };
  } catch (error) {
    return { reachable: false, error: error instanceof Error ? error.message : String(error) };
  }
}

let healthCache = { at: 0, value: null };
async function cachedHealth(config) {
  const now = Date.now();
  if (healthCache.value && now - healthCache.at < 5000) return healthCache.value;
  const value = await comfyReachable(config);
  healthCache = { at: now, value };
  return value;
}

let comfyStartPromise = null;
async function ensureComfyStarted(config) {
  if (config.autoStart === false) return (await comfyReachable(config)).reachable;
  if ((await comfyReachable(config)).reachable) return true;
  if (comfyStartPromise) return comfyStartPromise;
  comfyStartPromise = (async () => {
    const script = String(config.startScript || '').trim();
    if (script) {
      try {
        spawn('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', script], {
          stdio: 'ignore',
          windowsHide: true,
        });
      } catch {
        /* spawn failed; the poll below will time out */
      }
    }
    const deadline = Date.now() + 120000;
    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if ((await comfyReachable(config)).reachable) return true;
    }
    return false;
  })();
  try {
    return await comfyStartPromise;
  } finally {
    comfyStartPromise = null;
  }
}

async function comfyLoras(config) {
  try {
    const info = await comfyJSON(config, '/object_info/LoraLoaderModelOnly', undefined, 8000);
    const names = info?.LoraLoaderModelOnly?.input?.required?.lora_name?.[0];
    return Array.isArray(names) ? names : [];
  } catch {
    return [];
  }
}

async function comfyInterrupt(config) {
  await comfyJSON(
    config,
    '/interrupt',
    { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({}) },
    10000,
  );
}

function comfyWSURL(config) {
  return `${config.baseURL.replace(/\/+$/, '')}/ws?clientId=${CLIENT_ID}`
    .replace(/^http:/, 'ws:')
    .replace(/^https:/, 'wss:');
}

function ensureProgressSocket(config) {
  if (typeof WebSocket === 'undefined') return;
  if (progressConnecting) return;
  if (progressSocket && (progressSocket.readyState === 0 || progressSocket.readyState === 1)) return;
  progressConnecting = true;
  try {
    const socket = new WebSocket(comfyWSURL(config));
    progressSocket = socket;
    socket.addEventListener('open', () => {
      progressConnecting = false;
    });
    socket.addEventListener('message', (ev) => {
      try {
        const msg = JSON.parse(typeof ev.data === 'string' ? ev.data : String(ev.data));
        if (msg?.type === 'progress' && msg.data?.prompt_id) {
          progressMap.set(msg.data.prompt_id, {
            value: Number(msg.data.value) || 0,
            max: Number(msg.data.max) || 1,
          });
        }
      } catch {
        /* ignore non-JSON frames */
      }
    });
    socket.addEventListener('close', () => {
      progressConnecting = false;
      if (progressSocket === socket) progressSocket = null;
    });
    socket.addEventListener('error', () => {
      progressConnecting = false;
      if (progressSocket === socket) progressSocket = null;
      try { socket.close(); } catch { /* noop */ }
    });
  } catch {
    progressConnecting = false;
    progressSocket = null;
  }
}

function decodeImageData(input) {
  const s = String(input || '');
  const m = s.match(/^data:[a-zA-Z0-9.+-]+\/[a-zA-Z0-9.+-]+;base64,(.*)$/s);
  return Buffer.from(m ? m[1] : s, 'base64');
}

async function comfyUploadImage(config, buf, prefix) {
  const filename = `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.png`;
  const form = new FormData();
  form.append('image', new Blob([buf], { type: 'image/png' }), filename);
  const res = await comfyFetch(config, '/upload/image', { method: 'POST', body: form }, 60000);
  const text = await res.text();
  let body = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text.slice(0, 300) };
  }
  if (!res.ok || typeof body.name !== 'string' || !body.name) {
    throw new Error(`ComfyUI 图片上传失败 (${res.status})`);
  }
  const subfolder = typeof body.subfolder === 'string' ? body.subfolder : '';
  return subfolder ? `${subfolder}/${body.name}` : body.name;
}

async function comfyControlnets(config) {
  try {
    const info = await comfyJSON(config, '/object_info/ControlNetLoader', undefined, 8000);
    const names = info?.ControlNetLoader?.input?.required?.control_net_name?.[0];
    return Array.isArray(names) ? names : [];
  } catch {
    return [];
  }
}

function buildRef(input, prefix) {
  const jobId = input[`${prefix}_job_id`];
  if (typeof jobId === 'string' && jobId.trim()) {
    return { source: 'job', jobId: jobId.trim(), index: clampInt(input[`${prefix}_index`], 0, 3, 0) };
  }
  const data = input[`${prefix}_data`];
  if (typeof data === 'string' && data.trim()) {
    return { source: 'upload', data: data.trim() };
  }
  return undefined;
}

async function persistUploadedRefs(dir, job) {
  for (const [key, filename] of [['ref', 'ref.png'], ['mask', 'mask.png'], ['control', 'control.png']]) {
    if (job[key]?.source === 'upload') {
      const buf = decodeImageData(job[key].data);
      if (buf.length) {
        await writeFile(join(dir, job.id, filename), buf);
        job[key] = { source: 'file', file: filename };
      } else {
        job[key] = undefined;
      }
    }
  }
}

async function resolveRefBytes(dir, job, key) {
  const ref = job[key];
  if (!ref) return undefined;
  if (ref.source === 'job') {
    if (!validId(ref.jobId)) throw new Error('参考图任务 ID 无效');
    return readFile(imagePath(dir, ref.jobId, ref.index ?? 0));
  }
  if (ref.source === 'file') {
    return readFile(join(dir, job.id, ref.file));
  }
  return undefined;
}

async function requireRef(dir, job, key) {
  const bytes = await resolveRefBytes(dir, job, key);
  if (!bytes || !bytes.length) {
    throw new Error(key === 'ref' ? '缺少参考图' : key === 'mask' ? '缺少蒙版图' : '缺少 ControlNet 输入图');
  }
  return bytes;
}

/* ------------------------------------------------------------------ *
 * Graph construction
 * ------------------------------------------------------------------ */

function buildGraph(config, params) {
  const graph = {
    1: { class_type: 'CheckpointLoaderSimple', inputs: { ckpt_name: config.checkpoint } },
  };

  let model = ['1', 0];
  let clip = ['1', 1];
  let node = 10;
  for (const lora of params.loras || []) {
    const id = String(node++);
    if (lora.mode === 'both') {
      graph[id] = {
        class_type: 'LoraLoader',
        inputs: {
          model,
          clip,
          lora_name: lora.name,
          strength_model: lora.weight,
          strength_clip: typeof lora.clipWeight === 'number' ? lora.clipWeight : lora.weight,
        },
      };
      model = [id, 0];
      clip = [id, 1];
    } else {
      graph[id] = {
        class_type: 'LoraLoaderModelOnly',
        inputs: { model, lora_name: lora.name, strength_model: lora.weight },
      };
      model = [id, 0];
    }
  }

  graph[2] = { class_type: 'CLIPTextEncode', inputs: { text: params.prompt, clip } };
  graph[3] = { class_type: 'CLIPTextEncode', inputs: { text: params.negative || DEFAULT_NEGATIVE, clip } };

  let positive = ['2', 0];
  let negative = ['3', 0];

  if (params.mode === 'controlnet') {
    graph[30] = { class_type: 'ControlNetLoader', inputs: { control_net_name: params.controlNet } };
    graph[31] = { class_type: 'LoadImage', inputs: { image: params.controlImage } };
    graph[32] = {
      class_type: 'ControlNetApplyAdvanced',
      inputs: {
        positive,
        negative,
        control_net: ['30', 0],
        image: ['31', 0],
        strength: params.controlStrength,
        start_percent: 0,
        end_percent: 1,
      },
    };
    positive = ['32', 0];
    negative = ['32', 1];
  }

  let latent;
  if (params.mode === 'img2img') {
    graph[20] = { class_type: 'LoadImage', inputs: { image: params.refImage } };
    graph[21] = { class_type: 'VAEEncode', inputs: { pixels: ['20', 0], vae: ['1', 2] } };
    latent = ['21', 0];
  } else if (params.mode === 'inpaint') {
    graph[20] = { class_type: 'LoadImage', inputs: { image: params.refImage } };
    graph[22] = { class_type: 'LoadImage', inputs: { image: params.maskImage } };
    graph[23] = {
      class_type: 'VAEEncodeForInpaint',
      inputs: { pixels: ['20', 0], vae: ['1', 2], mask: ['22', 1], grow_mask_by: params.growMaskBy },
    };
    latent = ['23', 0];
  } else {
    graph[4] = {
      class_type: 'EmptyLatentImage',
      inputs: { width: params.width, height: params.height, batch_size: params.batch },
    };
    latent = ['4', 0];
  }

  graph[5] = {
    class_type: 'KSampler',
    inputs: {
      seed: params.seed,
      steps: params.steps,
      cfg: params.cfg,
      sampler_name: params.sampler,
      scheduler: params.scheduler,
      denoise: params.denoise,
      model,
      positive,
      negative,
      latent_image: latent,
    },
  };
  graph[6] = { class_type: 'VAEDecode', inputs: { samples: ['5', 0], vae: ['1', 2] } };
  graph[7] = {
    class_type: 'SaveImage',
    inputs: { images: ['6', 0], filename_prefix: `anima-${params.jobId}` },
  };
  return graph;
}

/* ------------------------------------------------------------------ *
 * Job runner
 * ------------------------------------------------------------------ */

let chain = Promise.resolve();
function enqueue(task) {
  const run = chain.then(task, task);
  chain = run.catch(() => {});
  return run;
}

// "文件名:权重[:both]" 用逗号或分号分隔；用于每次生成自动带上的 LoRA。
function parseDefaultLoras(spec) {
  if (!spec || typeof spec !== 'string') return [];
  return spec
    .split(/[;,\n]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const bits = part.split(':').map((s) => s.trim()).filter(Boolean);
      const name = bits[0];
      if (!name) return undefined;
      const weight = bits[1] !== undefined && Number.isFinite(Number(bits[1])) ? clampNum(bits[1], 0, 2, 1) : 1;
      const mode = bits[2] === 'both' ? 'both' : 'model';
      return { name, weight, mode };
    })
    .filter(Boolean)
    .slice(0, 8);
}

function mergeLoras(defaults, given) {
  const merged = defaults.slice();
  for (const item of given) {
    if (merged.some((d) => d.name === item.name)) continue;
    merged.push(item);
  }
  return merged.slice(0, 8);
}

function normalise(config, input, id) {
  const mode = MODES.includes(input.mode) ? input.mode : 'txt2img';
  const latentFromImage = mode === 'img2img' || mode === 'inpaint';
  const width = clampInt(input.width, 256, 2048, 832);
  const height = clampInt(input.height, 256, 2048, 1216);
  return {
    prompt: String(input.prompt || '').trim(),
    negative: typeof input.negative === 'string' && input.negative.trim() ? input.negative.trim() : DEFAULT_NEGATIVE,
    mode,
    denoise: latentFromImage ? clampNum(input.denoise, 0.01, 1, 0.6) : 1,
    controlNet: mode === 'controlnet' ? String(input.controlnet || '').trim() : '',
    controlStrength: clampNum(input.control_strength, 0, 2, 1),
    growMaskBy: mode === 'inpaint' ? clampNum(input.grow_mask_by, 0, 256, 0) : 0,
    ref: buildRef(input, 'ref'),
    mask: buildRef(input, 'mask'),
    control: buildRef(input, 'control'),
    width,
    height,
    steps: clampInt(input.steps, 1, 60, 28),
    cfg: clampNum(input.cfg, 1, 20, 5),
    sampler: SAMPLERS.includes(input.sampler) ? input.sampler : 'euler_ancestral',
    scheduler: SCHEDULERS.includes(input.scheduler) ? input.scheduler : 'normal',
    seed: Number.isInteger(input.seed) && input.seed >= 0 ? input.seed : Math.floor(Math.random() * 2 ** 31),
    batch: latentFromImage ? 1 : clampInt(input.batch, 1, 4, 1),
    loras: mergeLoras(
      input._noDefaultLoras ? [] : parseDefaultLoras(config.defaultLoras),
      Array.isArray(input.loras)
        ? input.loras
            .filter((l) => l && typeof l.name === 'string' && l.name.trim())
            .slice(0, 8)
            .map((l) => ({
              name: l.name.trim(),
              weight: clampNum(l.weight, 0, 2, 1),
              mode: l.mode === 'both' ? 'both' : 'model',
              clipWeight: typeof l.clipWeight === 'number' ? clampNum(l.clipWeight, 0, 2, l.weight) : undefined,
            }))
        : [],
    ),
    jobId: id,
  };
}

function clampInt(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function clampNum(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

async function submitAndWait(ctx, config, dir, job) {
  if (cancelled.has(job.id)) {
    job.status = 'cancelled';
    job.error = '任务已被取消';
    job.finishedAt = Date.now();
    await writeJob(dir, job);
    return job;
  }
  const started = Date.now();
  job.status = 'running';
  job.startedAt = started;
  await writeJob(dir, job);

  const refImage =
    job.mode === 'img2img' || job.mode === 'inpaint'
      ? await comfyUploadImage(config, await requireRef(dir, job, 'ref'), 'anima-ref')
      : undefined;
  const maskImage =
    job.mode === 'inpaint'
      ? await comfyUploadImage(config, await requireRef(dir, job, 'mask'), 'anima-mask')
      : undefined;
  const controlImage =
    job.mode === 'controlnet'
      ? await comfyUploadImage(config, await requireRef(dir, job, 'control'), 'anima-ctrl')
      : undefined;

  const graph = buildGraph(config, { ...job, refImage, maskImage, controlImage });
  const submitted = await comfyJSON(
    config,
    '/prompt',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prompt: graph, client_id: CLIENT_ID }),
    },
    30000,
  );
  const promptId = submitted?.prompt_id;
  if (!promptId) throw new Error('ComfyUI 未返回 task id');
  job.promptId = promptId;
  await writeJob(dir, job);
  ensureProgressSocket(config);

  const deadline = started + (config.timeoutMs || 900000);
  while (Date.now() < deadline) {
    if (cancelled.has(job.id)) {
      job.status = 'cancelled';
      job.error = '任务已被取消';
      job.finishedAt = Date.now();
      await writeJob(dir, job);
      return job;
    }
    await new Promise((r) => setTimeout(r, 1200));
    const history = await comfyJSON(config, `/history/${promptId}`, undefined, 15000);
    const entry = history?.[promptId];
    if (!entry) continue;
    if (entry.status?.status_str === 'error') {
      const messages = entry.status?.messages ?? [];
      if (messages.some((m) => m?.[0] === 'execution_interrupted')) {
        job.status = 'cancelled';
        job.error = '任务已被取消';
        job.finishedAt = Date.now();
        await writeJob(dir, job);
        return job;
      }
      const detail = messages.find((m) => m?.[0] === 'execution_error');
      throw new Error(detail ? JSON.stringify(detail[1]).slice(0, 600) : 'ComfyUI 执行失败');
    }
    if (!entry.status?.completed) continue;

    const images = entry.outputs?.['7']?.images ?? [];
    if (!images.length) throw new Error('ComfyUI 完成但未返回图片');
    const saved = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const url = new URL(`${config.baseURL.replace(/\/+$/, '')}/view`);
      url.searchParams.set('filename', img.filename);
      url.searchParams.set('subfolder', img.subfolder || '');
      url.searchParams.set('type', img.type || 'output');
      const res = await comfyFetch(config, url.pathname + url.search, undefined, 60000);
      if (!res.ok) throw new Error(`取图失败 ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const file = imagePath(dir, job.id, i);
      await writeFile(file, buf);
      saved.push({ index: i, bytes: buf.length });
    }
    job.images = saved;
    job.status = 'complete';
    job.finishedAt = Date.now();
    job.elapsedMs = job.finishedAt - started;
    await writeJob(dir, job);
    return job;
  }
  throw new Error('生成超时；任务仍在 ComfyUI 队列中，可用任务 ID 稍后查询');
}

async function startJob(ctx, config, input) {
  const dir = jobsDir(config);
  await mkdir(dir, { recursive: true });
  const id = randomUUID().replace(/-/g, '').slice(0, 16);
  const job = {
    id,
    ...normalise(config, input, id),
    status: 'queued',
    createdAt: Date.now(),
    favorite: false,
    checkpoint: config.checkpoint,
  };
  await mkdir(join(dir, id), { recursive: true });
  await persistUploadedRefs(dir, job);
  await writeJob(dir, job);

  enqueue(async () => {
    try {
      await submitAndWait(ctx, config, dir, job);
    } catch (error) {
      if (job.status !== 'cancelled') {
        job.status = 'failed';
        job.error = error instanceof Error ? error.message : String(error);
        job.finishedAt = Date.now();
        await writeJob(dir, job).catch(() => {});
      }
    } finally {
      cancelled.delete(job.id);
      if (job.promptId) progressMap.delete(job.promptId);
    }
  });
  return job;
}

async function attachmentsFor(ctx, dir, job) {
  if (job.status !== 'complete' || !job.images?.length) return [];
  const count = Math.min(job.images.length, job.batch ?? 1);
  const out = [];
  for (let i = 0; i < count; i++) {
    const data = await readFile(imagePath(dir, job.id, i));
    out.push(
      await ctx.attachments.saveImage({
        data,
        mediaType: 'image/png',
        name: `anima-${job.id.slice(0, 8)}${count > 1 ? `-${i + 1}` : ''}.png`,
      }),
    );
  }
  return out;
}

async function awaitJob(dir, id, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const job = await readJob(dir, id);
    if (!job) return undefined;
    if (!ACTIVE.has(job.status)) return job;
    await new Promise((r) => setTimeout(r, 800));
  }
  return readJob(dir, id);
}

/* ------------------------------------------------------------------ *
 * Tool definitions
 * ------------------------------------------------------------------ */

const POSITIVE_HINT =
  'danbooru-style comma tags, not a sentence: subject tags, then character/series, then scene tags, ' +
  'and end with "masterpiece, high score, great score, absurdres".';

function jobView(job) {
  return {
    id: job.id,
    status: job.status,
    prompt: job.prompt,
    negative: job.negative ?? null,
    mode: job.mode ?? 'txt2img',
    denoise: job.denoise ?? 1,
    controlNet: job.controlNet ?? null,
    controlStrength: job.controlStrength ?? 1,
    width: job.width,
    height: job.height,
    steps: job.steps,
    cfg: job.cfg,
    sampler: job.sampler,
    scheduler: job.scheduler,
    seed: job.seed,
    batch: job.batch,
    loras: job.loras,
    progress: job.promptId ? progressMap.get(job.promptId) ?? null : null,
    favorite: Boolean(job.favorite),
    archived: Boolean(job.archived),
    createdAt: job.createdAt ?? null,
    finishedAt: job.finishedAt ?? null,
    elapsedMs: job.elapsedMs ?? null,
    error: job.error ?? null,
  };
}

function registerTools(ctx, config) {
  ctx.tools.register(
    defineTool({
      name: 'anima_generate_image',
      description:
        'Generate anime images on this machine with the local Animagine XL 4.0 model through ComfyUI. ' +
        `Prompts are ${POSITIVE_HINT} ` +
        'ComfyUI is auto-started if it is not running; the first call may wait about a minute while it loads.',
      timeoutMs: 900000,
      parameters: {
        prompt: { type: 'string', required: true, description: `Positive prompt. ${POSITIVE_HINT}` },
        negative: {
          type: 'string',
          description: "Optional negative prompt. Omit to use the model author's recommended negative tags.",
        },
        width: { type: 'integer', description: 'Width in pixels, 256-2048. Default 832.' },
        height: { type: 'integer', description: 'Height in pixels, 256-2048. Default 1216.' },
        steps: { type: 'integer', description: 'Sampling steps, 1-60. Default 28.' },
        cfg: { type: 'number', description: 'CFG scale, 1-20. Default 5.' },
        sampler: {
          type: 'string',
          description: `Sampler name, one of ${SAMPLERS.join(', ')}. Default euler_ancestral.`,
        },
        scheduler: {
          type: 'string',
          description: `Scheduler name, one of ${SCHEDULERS.join(', ')}. Default normal.`,
        },
        seed: { type: 'integer', description: 'Fixed seed. Omit for a random one.' },
        batch: { type: 'integer', description: 'Images per call, 1-4. Default 1 (ignored for img2img/inpaint).' },
        mode: { type: 'string', description: 'Generation mode: txt2img (default), img2img, inpaint, or controlnet.' },
        denoise: { type: 'number', description: 'Denoise strength 0.01-1 for img2img/inpaint. Default 0.6.' },
        ref_job_id: { type: 'string', description: 'Reuse a previous generation as the reference image (img2img/inpaint), by task id.' },
        ref_index: { type: 'integer', description: 'Which image of ref_job_id to use. Default 0.' },
        ref_data: { type: 'string', description: 'Base64 PNG reference image (img2img/inpaint). Alternative to ref_job_id.' },
        mask_job_id: { type: 'string', description: 'Previous generation to use as the inpaint mask, by task id.' },
        mask_index: { type: 'integer', description: 'Which image of mask_job_id to use as mask. Default 0.' },
        mask_data: { type: 'string', description: 'Base64 PNG mask image for inpaint.' },
        control_job_id: { type: 'string', description: 'Previous generation to use as the ControlNet input image, by task id.' },
        control_index: { type: 'integer', description: 'Which image of control_job_id to use. Default 0.' },
        control_data: { type: 'string', description: 'Base64 PNG ControlNet input image.' },
        controlnet: { type: 'string', description: 'ControlNet model name from ComfyUI. Required for controlnet mode.' },
        control_strength: { type: 'number', description: 'ControlNet strength 0-2. Default 1.' },
        grow_mask_by: { type: 'number', description: 'Inpaint mask grow amount in pixels. Default 0.' },
        lora_names: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Optional LoRA file names as ComfyUI knows them, at most 8, applied in order. Pair with lora_weights by position.',
        },
        lora_weights: {
          type: 'array',
          items: { type: 'number' },
          description: 'Optional weight per lora_names entry, 0-2. Missing entries default to 1.',
        },
        lora_modes: {
          type: 'array',
          items: { type: 'string' },
          description: "Optional per-lora apply mode, 'model' (default) or 'both' (model+clip), paired with lora_names by position.",
        },
        use_default_loras: {
          type: 'boolean',
          description:
            'Default true: every call also carries the LoRA stack configured as the studio default (e.g. the Animagine stabilizer). Set false to run with exactly the loras you list.',
        },
      },
      output: {
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            id: { type: 'string', required: true },
            status: { type: 'string', required: true },
            attachments: { type: 'array', items: { type: 'object', additionalProperties: true } },
            elapsedMs: { type: 'integer' },
            error: { type: 'string' },
          },
        },
        presentationMeta: (_args, value) => ({ kind: 'anima-studio', id: value.id, attachments: value.attachments }),
        render: (_args, value) => [
          {
            type: 'text',
            text:
              value.status === 'complete'
                ? `Animagine 任务 ${value.id} 完成，用时 ${Math.round((value.elapsedMs ?? 0) / 1000)} 秒。图片已附在对话中。`
                : `Animagine 任务 ${value.id} 状态 ${value.status}。${value.error ?? ''}`,
          },
          ...(value.attachments || []).map((attachment) => ({ type: 'image', attachment })),
        ],
      },
      async execute(args) {
        const toolMode = MODES.includes(args.mode) ? args.mode : 'txt2img';
        if (toolMode === 'txt2img' && (!args.prompt || !String(args.prompt).trim())) {
          throw new Error('文生图需要 prompt（画面描述不能为空）');
        }
        const dir = jobsDir(config);
        const started = await ensureComfyStarted(config);
        if (!started) {
          throw new Error(
            `连不上本地 ComfyUI（${config.baseURL}）。先启动 ComfyUI，或在插件配置里给 startScript 指定一个启动脚本。`,
          );
        }
        const job = await startJob(ctx, config, {
          ...args,
          _noDefaultLoras: args.use_default_loras === false,
          loras: Array.isArray(args.lora_names)
            ? args.lora_names.slice(0, 8).map((n, i) => ({
                name: n,
                weight: Array.isArray(args.lora_weights) ? args.lora_weights[i] : 1,
                mode: Array.isArray(args.lora_modes) && args.lora_modes[i] === 'both' ? 'both' : 'model',
              }))
            : [],
        });
        const done = await awaitJob(dir, job.id, config.timeoutMs || 900000);
        const attachments = done ? await attachmentsFor(ctx, dir, done) : [];
        const out = { id: job.id, status: done?.status ?? 'running' };
        if (attachments.length) out.attachments = attachments;
        if (done && Number.isFinite(done.elapsedMs)) out.elapsedMs = Math.round(done.elapsedMs);
        if (done?.error) out.error = done.error;
        return out;
      },
    }),
  );

  ctx.tools.register(
    defineTool({
      name: 'anima_image_status',
      description:
        'Read one Animagine task by its id: status, parameters, elapsed time, and the image attachment when it finished. ' +
        'Use it to recover a task after a timeout instead of submitting it again.',
      parameters: {
        id: { type: 'string', required: true, description: 'Task id returned by anima_generate_image.' },
      },
      output: {
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            result: { type: 'string', required: true },
            attachments: { type: 'array', items: { type: 'object', additionalProperties: true } },
          },
        },
        render: (_args, value) => [
          { type: 'text', text: value.result },
          ...(value.attachments || []).map((attachment) => ({ type: 'image', attachment })),
        ],
      },
      async execute({ id }) {
        if (!validId(id)) throw new Error('任务 ID 无效');
        const dir = jobsDir(config);
        const job = await readJob(dir, id);
        if (!job) throw new Error(`任务 ${id} 不存在，请核对原始 ID`);
        const attachments = await attachmentsFor(ctx, dir, job);
        return {
          result:
            `任务 ${job.id}\n状态：${job.status}\n提示词：${job.prompt}\n` +
            `尺寸：${job.width}×${job.height}　步数：${job.steps}　CFG：${job.cfg}　种子：${job.seed}\n` +
            `采样器：${job.sampler}/${job.scheduler}　LoRA：${job.loras?.length ? job.loras.map((l) => `${l.name}@${l.weight}`).join(', ') : '无'}\n` +
            (job.error ? `错误：${job.error}\n` : '') +
            (attachments.length ? '图片已附在对话中。' : ''),
          attachments,
        };
      },
    }),
  );

  ctx.tools.register(
    defineTool({
      name: 'anima_image_gallery',
      description:
        'List recent Animagine generations, newest first. Use it to find a previous result or the parameters used for one.',
      parameters: {
        limit: { type: 'integer', description: 'How many to return, 1-50. Default 12.' },
        query: { type: 'string', description: 'Optional substring matched against the prompt.' },
      },
      output: {
        schema: { type: 'object', additionalProperties: false, properties: { result: { type: 'string', required: true } } },
        render: (_args, value) => [{ type: 'text', text: value.result }],
      },
      async execute({ limit, query }) {
        const dir = jobsDir(config);
        const n = clampInt(limit, 1, 50, 12);
        let items = await listJobs(dir, 200);
        if (query) {
          const q = String(query).toLowerCase();
          items = items.filter((j) => String(j.prompt || '').toLowerCase().includes(q));
        }
        items = items.slice(0, n);
        if (!items.length) return { result: '还没有生成记录。' };
        return {
          result: items
            .map(
              (j) =>
                `${j.id}  ${j.status.padEnd(8)} ${j.width}×${j.height} ${j.steps}步 seed=${j.seed}\n    ${String(j.prompt).slice(0, 90)}`,
            )
            .join('\n'),
        };
      },
    }),
  );

  ctx.tools.register(
    defineTool({
      name: 'anima_controlnets',
      description:
        'List ControlNet model names available in ComfyUI, for use with anima_generate_image controlnet mode.',
      parameters: {},
      output: {
        schema: { type: 'object', additionalProperties: false, properties: { result: { type: 'string', required: true } } },
        render: (_args, value) => [{ type: 'text', text: value.result }],
      },
      async execute() {
        const names = await comfyControlnets(config);
        return {
          result: names.length
            ? `可用 ControlNet 模型：\n${names.map((n) => `- ${n}`).join('\n')}`
            : 'ComfyUI 未返回 ControlNet 模型（请确认 models/controlnet 目录里有模型）。',
        };
      },
    }),
  );
}

/* ------------------------------------------------------------------ *
 * HTTP API for the studio page
 * ------------------------------------------------------------------ */

async function readBody(req, limit = 131072) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw new Error('请求体过大');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

/**
 * 浏览器信任栅栏：dsh 的 connection 服务提供 requestRejection(req)，
 * Host/Origin 被伪造（DNS 重绑定）或未认证的请求会返回一个 HTTP 状态码。
 * 服务缺失时只在加载时警告一次（老宿主），不阻塞插件启动。
 */
function admissionGuard(ctx) {
  let check;
  ctx.inject(['connection'], (connectionCtx) => {
    const fn = (request) => connectionCtx.connection.requestRejection(request);
    check = fn;
    return () => {
      if (check === fn) check = undefined;
    };
  });
  return () => check;
}

/** 把栅栏套在路由上：拒绝就吐 401/403/503，放行才进入真正的 handler。 */
function withWebAdmission(route, getAdmission) {
  return {
    ...route,
    handler: (req, res) => {
      let rejection;
      try {
        rejection = getAdmission()?.(req);
      } catch {
        rejection = 503;
      }
      if (rejection === undefined) return route.handler(req, res);
      res.writeHead(rejection, { 'content-type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: rejection === 401 ? 'unauthorized' : 'forbidden' }));
    },
  };
}

function registerRoutes(ctx, config) {
  const routes = ['state', 'generate', 'jobs', 'job', 'image', 'cancel', 'action', 'loras', 'controlnets', 'translate', 'library', 'setup'];
  const getAdmission = admissionGuard(ctx);
  for (const route of routes) {
    ctx.effect(
      () =>
        ctx.webServer.register(withWebAdmission({
          kind: 'exact',
          path: `${API}/${route}`,
          handler: async (req, res) => {
            const url = new URL(req.url || '/', 'http://127.0.0.1');
            const json = (status, value) => {
              res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' });
              res.end(JSON.stringify(value));
            };
            try {
              const dir = jobsDir(config);

              if (route === 'state' && req.method === 'GET') {
                const health = await cachedHealth(config);
                return json(200, {
                  ...health,
                  baseURL: config.baseURL,
                  checkpoint: config.checkpoint,
                  sizes: SIZES,
                  ratios: RATIOS,
                  modes: MODES,
                  samplers: SAMPLERS,
                  schedulers: SCHEDULERS,
                  defaultNegative: DEFAULT_NEGATIVE,
                  dictionarySize: DICTIONARY_SIZE,
                  characterCount: CHARACTER_COUNT,
                  presetCount: PRESET_COUNT,
                  llmReady: llmReady(ctx),
                  llmModel: config.llmModel,
                  defaultLoras: parseDefaultLoras(config.defaultLoras),
                  defaults: { width: 832, height: 1216, steps: 28, cfg: 5, sampler: 'euler_ancestral', scheduler: 'normal', batch: 1 },
                });
              }

              if (route === 'loras' && req.method === 'GET') {
                return json(200, { loras: await comfyLoras(config) });
              }

              if (route === 'controlnets' && req.method === 'GET') {
                return json(200, { controlnets: await comfyControlnets(config) });
              }

              if (route === 'setup') {
                const setup = resolveSetup(config);
                if (req.method === 'GET') {
                  if (url.searchParams.get('action') === 'progress') return json(200, downloadState());
                  const health = await cachedHealth(config);
                  const checkpoint = await probeCheckpoint(setup);
                  return json(200, buildPlan({ setup, comfy: health, checkpoint }));
                }
                if (req.method === 'POST') {
                  const body = JSON.parse((await readBody(req)) || '{}');
                  if (body.action === 'cancel') return json(200, cancelDownload());
                  if (body.action === 'download') {
                    return json(200, startDownload(setup, { url: body.url }));
                  }
                  return json(400, { error: '不支持的操作' });
                }
                return json(405, { error: '不支持的请求' });
              }

              if (route === 'library' && req.method === 'GET') {
                // 场景模板 / 画师风格 / 负面标签：静态数据，前端拉一次就够。
                return json(200, { presets: TAG_PRESETS, artists: TAG_ARTISTS, negatives: TAG_NEGATIVES });
              }

              if (route === 'translate' && req.method === 'POST') {
                const body = JSON.parse((await readBody(req)) || '{}');
                const text = String(body.text || '');
                const engine = pickEngine(body.engine);
                // 模式决定转换提示词的收敛程度：图生图/蒙版重绘/ControlNet 不该复述整幅画面。
                const mode = pickMode(body.mode);
                const out = await resolveTags(ctx, config, text, engine, mode, {
                  appearance: body.appearance === true,
                });
                if (out.engine === undefined) out.engine = engine;
                return json(200, {
                  ...out,
                  requestedEngine: engine,
                  hasChinese: hasChinese(text),
                  dictionarySize: DICTIONARY_SIZE,
                });
              }

              if (route === 'generate' && req.method === 'POST') {
                const input = JSON.parse((await readBody(req, 52428800)) || '{}');
                const mode = MODES.includes(input.mode) ? input.mode : 'txt2img';
                if (mode === 'txt2img' && (!input.prompt || !String(input.prompt).trim())) {
                  return json(400, { error: '文生图需要提示词（画面描述不能为空）' });
                }
                const started = await ensureComfyStarted(config);
                if (!started) {
                  return json(503, {
                    error: `连不上本地 ComfyUI（${config.baseURL}），请先启动 ComfyUI，或给 startScript 指定启动脚本`,
                  });
                }
                const job = await startJob(ctx, config, input);
                return json(200, { job: jobView(job) });
              }

              if (route === 'jobs' && req.method === 'GET') {
                const limit = clampInt(url.searchParams.get('limit'), 1, 200, 60);
                const items = await listJobs(dir, limit);
                return json(200, { jobs: items.map(jobView), active: items.filter((j) => ACTIVE.has(j.status)).length });
              }

              if (route === 'job' && req.method === 'GET') {
                const id = url.searchParams.get('id') || '';
                if (!validId(id)) return json(400, { error: '任务 ID 无效' });
                const job = await readJob(dir, id);
                if (!job) return json(404, { error: '任务不存在' });
                return json(200, { job: jobView(job), images: (job.images || []).map((i) => i.index) });
              }

              if (route === 'image' && req.method === 'GET') {
                const id = url.searchParams.get('id') || '';
                const index = clampInt(url.searchParams.get('n'), 0, 3, 0);
                if (!validId(id)) return json(400, { error: '任务 ID 无效' });
                const etag = `"anima-${id}-${index}"`;
                if (req.headers['if-none-match'] === etag) {
                  res.writeHead(304, { 'cache-control': 'private, max-age=86400', etag });
                  res.end();
                  return undefined;
                }
                const data = await readFile(imagePath(dir, id, index));
                res.writeHead(200, {
                  'content-type': 'image/png',
                  'cache-control': 'private, max-age=86400',
                  etag,
                  ...(url.searchParams.has('download')
                    ? { 'content-disposition': `attachment; filename="anima-${id.slice(0, 8)}.png"` }
                    : {}),
                });
                res.end(data);
                return undefined;
              }

              if (route === 'action' && req.method === 'POST') {
                const body = JSON.parse((await readBody(req)) || '{}');
                const id = String(body.id || '');
                if (!validId(id)) return json(400, { error: '任务 ID 无效' });
                if (body.action === 'delete') {
                  await rm(join(dir, id), { recursive: true, force: true });
                  return json(200, { deleted: id });
                }
                const job = await readJob(dir, id);
                if (!job) return json(404, { error: '任务不存在' });
                if (body.action === 'favorite') job.favorite = !job.favorite;
                else if (body.action === 'archive') job.archived = !job.archived;
                else return json(400, { error: '不支持的操作' });
                await writeJob(dir, job);
                return json(200, { job: jobView(job) });
              }

              if (route === 'cancel' && req.method === 'POST') {
                const body = JSON.parse((await readBody(req)) || '{}');
                const id = String(body.id || '');
                if (!validId(id)) return json(400, { error: '任务 ID 无效' });
                const job = await readJob(dir, id);
                if (!job) return json(404, { error: '任务不存在' });
                if (!ACTIVE.has(job.status)) return json(200, { job: jobView(job) });
                cancelled.add(id);
                if (job.status === 'running') await comfyInterrupt(config).catch(() => {});
                job.status = 'cancelled';
                job.error = '任务已被取消';
                job.finishedAt = Date.now();
                await writeJob(dir, job);
                return json(200, { job: jobView(job) });
              }

              return json(405, { error: '不支持的请求' });
            } catch (error) {
              if (!res.headersSent) json(500, { error: error instanceof Error ? error.message : String(error) });
              return undefined;
            }
          },
        }, getAdmission)),
      `${name}: ${route}`,
    );
  }
}

/* ------------------------------------------------------------------ *
 * Plugin entry
 * ------------------------------------------------------------------ */

export function apply(ctx, config) {
  const resolved = {
    baseURL: config?.baseURL || 'http://127.0.0.1:8190',
    checkpoint: config?.checkpoint || 'animagine-xl-4.0-opt.safetensors',
    timeoutMs: Number(config?.timeoutMs) > 0 ? Number(config.timeoutMs) : 900000,
    root: config?.root || '',
    startScript: config?.startScript || '',
    autoStart: config?.autoStart !== false,
    comfyRoot: typeof config?.comfyRoot === 'string' ? config.comfyRoot : '',
    setupRoot: typeof config?.setupRoot === 'string' ? config.setupRoot : '',
    modelUrl: typeof config?.modelUrl === 'string' ? config.modelUrl : '',
    modelSource: config?.modelSource || 'auto',
    defaultLoras: typeof config?.defaultLoras === 'string' ? config.defaultLoras : '',
    llmProvider: config?.llmProvider || 'deepseek-account',
    llmModel: config?.llmModel || 'deepseek-flash',
    llmTimeoutMs: Number(config?.llmTimeoutMs) > 0 ? Number(config.llmTimeoutMs) : 30000,
    llmMaxTokens: Number(config?.llmMaxTokens) > 0 ? Number(config.llmMaxTokens) : 320,
    llmSystemPrompt: typeof config?.llmSystemPrompt === 'string' && config.llmSystemPrompt.trim()
      ? config.llmSystemPrompt
      : TAGS_SYSTEM_PROMPT,
  };
  registerTools(ctx, resolved);
  registerRoutes(ctx, resolved);
}
