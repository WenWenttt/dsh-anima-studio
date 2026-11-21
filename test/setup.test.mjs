// setup.js 单元测试：下载地址、目录推导、计划拼装、体积格式化。
import { modelUrls, resolveSetup, buildPlan, humanBytes, MODEL_CATALOG, probeCheckpoint } from '../setup.js';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

let failed = 0;
const check = (name, ok, extra) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || extra === undefined ? '' : ' -> ' + JSON.stringify(extra)}`);
  if (!ok) failed += 1;
};

const entry = MODEL_CATALOG['animagine-xl-4.0-opt'];
check('catalog has the model entry', Boolean(entry && entry.file === 'animagine-xl-4.0-opt.safetensors'), entry);

/* 下载地址：auto 先官方后镜像，hf/mirror 强制单源 */
const auto = modelUrls(entry, 'auto');
check('auto tries huggingface first', auto[0].startsWith('https://huggingface.co/'), auto[0]);
check('auto falls back to the mirror', auto.length === 2 && auto[1].startsWith('https://hf-mirror.com/'), auto[1]);
check('hf source is single', modelUrls(entry, 'hf').length === 1);
check('mirror source is single', modelUrls(entry, 'mirror')[0].startsWith('https://hf-mirror.com/'));
check('url points at the resolve endpoint with download flag',
  auto[0].includes('/resolve/main/animagine-xl-4.0-opt.safetensors?download=true'), auto[0]);

/* 目录推导 */
const base = resolveSetup({});
check('default setup root lives under DSH home', /anima-studio[\\/]setup$/.test(base.setupRoot), base.setupRoot);
check('default comfy root is under setup root', base.comfyRoot === join(base.setupRoot, 'ComfyUI'), base.comfyRoot);
check('checkpoints dir is models/checkpoints', base.checkpointsDir.endsWith(join('models', 'checkpoints')), base.checkpointsDir);

const custom = resolveSetup({ setupRoot: '/tmp/s', comfyRoot: '/opt/ComfyUI', checkpoint: 'foo.safetensors' });
check('explicit comfyRoot wins', custom.comfyRoot === '/opt/ComfyUI', custom.comfyRoot);
check('checkpoint name lands in the target path', custom.targetPath === join('/opt/ComfyUI', 'models', 'checkpoints', 'foo.safetensors'), custom.targetPath);
check('unknown checkpoint has no expected size', custom.expectedBytes === 0);

const mirrored = resolveSetup({ modelSource: 'mirror' });
check('modelSource reaches the url list', mirrored.urls[0].startsWith('https://hf-mirror.com/'), mirrored.urls[0]);

const pinned = resolveSetup({ modelUrl: 'https://example.com/m.safetensors' });
check('explicit modelUrl overrides the catalog', pinned.urls.length === 1 && pinned.urls[0] === 'https://example.com/m.safetensors');

/* 计划拼装 */
const plan = buildPlan({
  setup: { checkpointsDir: '/opt/ComfyUI/models/checkpoints', license: 'FAIPL-1.0-SD', licenseUrl: 'https://x' },
  comfy: { reachable: false },
  checkpoint: { present: false, bytes: 0 },
});
check('plan not ready when both are missing', plan.ready === false && plan.steps.length === 2, plan);
check('plan labels the missing pieces', plan.steps.every((s) => s.ok === false));
check('plan carries the license', plan.license.name === 'FAIPL-1.0-SD');

const ready = buildPlan({
  setup: { checkpointsDir: '/x', license: 'FAIPL-1.0-SD', licenseUrl: '' },
  comfy: { reachable: true, version: '0.4.0' },
  checkpoint: { present: true, bytes: 6.94 * 1024 ** 3 },
});
check('plan ready when both are ok', ready.ready === true, ready);
check('plan shows the version and size', ready.steps[0].detail.includes('0.4.0') && ready.steps[1].detail.includes('GB'), ready.steps);

/* 模型文件探测：小文件不算就位 */
const dir = mkdtempSync(join(tmpdir(), 'anima-setup-'));
const setupForDir = {
  targetPath: join(dir, 'm.safetensors'),
  expectedBytes: 2 * 1024 ** 3,
};
const missing = await probeCheckpoint(setupForDir);
check('missing file is reported as absent', missing.present === false, missing);

mkdirSync(dir, { recursive: true });
writeFileSync(setupForDir.targetPath, Buffer.alloc(1024));
const tiny = await probeCheckpoint(setupForDir);
check('a truncated file is not treated as ready', tiny.present === false && tiny.bytes === 1024, tiny);

/* 体积格式化 */
check('humanBytes GB', humanBytes(6.94 * 1024 ** 3) === '6.94 GB');
check('humanBytes MB', humanBytes(5 * 1024 ** 2) === '5.0 MB');
check('humanBytes KB', humanBytes(2048) === '2 KB');
check('humanBytes bytes', humanBytes(512) === '512 B');

console.log(failed === 0 ? '\nALL SETUP CHECKS PASSED' : `\n${failed} CHECK(S) FAILED`);
process.exit(failed === 0 ? 0 : 1);
