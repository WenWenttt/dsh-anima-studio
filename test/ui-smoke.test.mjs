// Headless smoke test for dsh-anima-studio/client.js
// Renders the studio page with a tiny React stand-in (hooks: state/ref/memo/callback,
// effects are skipped) so runtime errors show up before a dsh restart.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const SOURCE = new URL('../client.js', import.meta.url);

/* ----------------------------- tiny react ----------------------------- */
function makeReact() {
  const instances = new Map();
  const stack = [];
  let instance = null;

  const hooks = () => {
    const ctx = stack[stack.length - 1];
    if (!ctx) throw new Error('hook called outside a component');
    return ctx;
  };

  function useState(init) {
    const ctx = hooks();
    const i = ctx.i++;
    if (!(i in ctx.hooks)) ctx.hooks[i] = typeof init === 'function' ? init() : init;
    const set = (value) => {
      const next = typeof value === 'function' ? value(ctx.hooks[i]) : value;
      if (Object.is(next, ctx.hooks[i])) return;
      ctx.hooks[i] = next;
    };
    return [ctx.hooks[i], set];
  }
  function useRef(init) {
    const ctx = hooks();
    const i = ctx.i++;
    if (!(i in ctx.hooks)) ctx.hooks[i] = { current: init };
    return ctx.hooks[i];
  }
  function useMemo(fn) {
    hooks().i++;
    return fn();
  }
  function useCallback(fn) {
    hooks().i++;
    return fn;
  }
  function useEffect(fn) {
    const ctx = hooks();
    const i = ctx.i++;
    if (!ctx.effects) ctx.effects = [];
    ctx.effects[i] = fn;
  }
  function useLayoutEffect(fn) {
    useEffect(fn);
  }

  function createElement(type, props, ...children) {
    const out = { type, props: { ...(props || {}) } };
    if (children.length === 1) out.props.children = children[0];
    else if (children.length > 1) out.props.children = children;
    return out;
  }

  function callComponent(el, path) {
    let ctx = instances.get(path);
    if (!ctx) {
      ctx = { hooks: [], i: 0 };
      instances.set(path, ctx);
    }
    stack.push(ctx);
    ctx.i = 0;
    ctx.effects = [];
    try {
      return el.type(el.props || {});
    } finally {
      stack.pop();
      for (const fn of ctx.effects) if (typeof fn === 'function') pending.push(fn);
    }
  }

  const fakeNode = {
    style: {},
    getBoundingClientRect: () => ({ left: 200, top: 260, width: 260, height: 34, right: 460, bottom: 294 }),
    contains: () => false,
    scrollIntoView() {},
    appendChild() {},
  };

  function walk(node, host, collect, path) {
    if (node === null || node === undefined || node === false || node === true) return;
    if (Array.isArray(node)) {
      node.forEach((item, idx) => walk(item, host, collect, `${path}.${idx}`));
      return;
    }
    if (typeof node === 'string' || typeof node === 'number') {
      host.text += String(node);
      return;
    }
    if (typeof node !== 'object') return;
    const { type } = node;
    if (typeof type === 'function') {
      walk(callComponent(node, path), host, collect, `${path}>`);
      return;
    }
    if (typeof type === 'string') {
      const entry = { tag: type, props: node.props || {}, text: '', nodes: [] };
      if (entry.props.ref && typeof entry.props.ref === 'object') entry.props.ref.current = fakeNode;
      host.nodes.push(entry);
      if (collect) collect.push(entry);
      walk((node.props || {}).children, entry, collect, path);
      return;
    }
    walk((node.props || {}).children, host, collect, path);
  }

  let pending = [];

  function renderRoot(component, props) {
    if (!instance) instance = { hooks: [], i: 0 };
    const root = { text: '', nodes: [] };
    pending = [];
    stack.push(instance);
    instance.i = 0;
    instance.effects = [];
    const tree = component(props);
    stack.pop();
    for (const fn of instance.effects) if (typeof fn === 'function') pending.push(fn);
    const collect = [];
    walk(tree, root, collect, 'root');
    for (const fn of pending) {
      try {
        fn();
      } catch {
        /* listeners/cleanup are irrelevant here */
      }
    }
    return { root, collect };
  }

  return {
    React: { createElement, useState, useRef, useMemo, useCallback, useEffect, useLayoutEffect, Fragment: 'fragment' },
    renderRoot,
  };
}

/* ------------------------------ harness ------------------------------ */
const store = new Map();
const flatText = (entries) => entries.map((e) => `${e.text} ${flatText(e.nodes || [])}`).join(' ');
const hasText = (entries, needle) => flatText(entries).includes(needle);

const localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => void store.set(k, String(v)),
  removeItem: (k) => void store.delete(k),
};

/* LoRA cache must exist before mount so the picker is prefilled like a restart */
store.set('anima-studio-loras-v1', JSON.stringify(['styleA.safetensors', 'styleB.safetensors']));

let captured = null;
let hasJob = false;
const window = {
  __ModuleLoader__: { load: (mod) => void (captured = mod) },
  innerHeight: 1000,
  innerWidth: 1600,
  addEventListener() {},
  removeEventListener() {},
  confirm: () => true,
};
const document = {
  body: { appendChild() {} },
  createElement: () => ({ style: {}, appendChild() {} }),
  getElementById: () => null,
  addEventListener() {},
  removeEventListener() {},
};

const fake = makeReact();
const requireStub = (id) => {
  if (id === 'react') return fake.React;
  if (id === 'react-dom') return { createPortal: (node) => node };
  throw new Error(`unexpected require: ${id}`);
};

const requests = [];

const context = vm.createContext({
  window,
  document,
  localStorage,
  fetch: async (url, init) => {
    const target = String(url);
    let body;
    try {
      body = init && init.body ? JSON.parse(init.body) : undefined;
    } catch {
      body = undefined;
    }
    requests.push({ url: target, method: (init && init.method) || 'GET', body });

    let reply;
    if (target.includes('/setup')) {
      if (target.includes('action=progress')) {
        reply = { status: 'idle', received: 0, total: 0, percent: 0, speed: 0, eta: 0 };
      } else if ((init && init.method) === 'POST') {
        reply = {
          status: 'running',
          received: 1024 * 1024,
          total: 4 * 1024 * 1024,
          percent: 25,
          speed: 512 * 1024,
          eta: 6,
          file: 'animagine-xl-4.0-opt.safetensors',
        };
      } else {
        reply = {
          ready: false,
          steps: [
            { id: 'comfyui', label: 'ComfyUI 服务', ok: false, detail: '离线（先启动 ComfyUI）' },
            { id: 'checkpoint', label: '模型文件', ok: false, detail: '缺失 · 应放在 X:/ComfyUI/models/checkpoints' },
          ],
          setup: { checkpointsDir: 'X:/ComfyUI/models/checkpoints' },
          license: { name: 'FAIPL-1.0-SD', url: '' },
        };
      }
    } else if (target.includes('/library')) {
      reply = {
        presets: [
          { name: '雨中天台', desc: '湿发与积水反光', tags: ['1girl', 'rain', 'rooftop'] },
          { name: '樱花树下', desc: '春日花瓣', tags: ['cherry blossoms', 'spring'] },
        ],
        artists: [
          { en: 'wlop', zh: 'WLOP' },
          { en: 'makoto shinkai', zh: '新海诚' },
        ],
        negatives: [
          { en: 'lowres', zh: '低分辨率' },
          { en: 'bad hands', zh: '手部错误' },
        ],
      };
    } else if (target.includes('/translate')) {
      const text = String((body && body.text) || '');
      reply = text.includes('失败测试')
        ? { text: '', matched: 0, dropped: 0, engine: 'dict' }
        : { text: 'blonde hair, school uniform, classroom', matched: 3, dropped: 0, changed: true, engine: 'dict' };
    } else if (target.includes('/loras')) {
      reply = { loras: ['styleA.safetensors', 'styleB.safetensors'] };
    } else if (target.includes('/state')) {
      reply = { reachable: true, version: '0.3.60', llmReady: true, sizes: [], ratios: [], samplers: ['euler_ancestral'], schedulers: ['normal'] };
    } else if (target.includes('/job?')) {
      reply = { job: { id: 'abcdef0123456789', status: 'complete', prompt: 'x', width: 832, height: 1216, steps: 28, seed: 1, batch: 1 } };
    } else if (target.includes('/generate')) {
      reply = { job: { id: 'abcdef0123456789', status: 'queued' } };
    } else if (target.includes('/jobs')) {
      reply = hasJob
        ? {
            jobs: [
              {
                id: 'abcdef0123456789',
                status: 'complete',
                prompt: '测试图',
                width: 832,
                height: 1216,
                steps: 28,
                cfg: 5,
                sampler: 'euler_ancestral',
                scheduler: 'normal',
                seed: 1,
                batch: 1,
                favorite: false,
                archived: false,
                createdAt: 1,
              },
            ],
          }
        : { jobs: [] };
    } else {
      reply = {};
    }
    return { ok: true, status: 200, text: async () => JSON.stringify(reply) };
  },
  console,
  setTimeout,
  clearTimeout,
  queueMicrotask,
});

vm.runInContext(readFileSync(SOURCE, 'utf8'), context, { filename: 'client.js' });
if (!captured) throw new Error('module loader was never called');
console.log('loader id:', captured.id);

const mod = captured.factory(requireStub);
console.log('module keys:', Object.keys(mod));

let StudioPage = null;
mod.apply({
  slots: {
    register: (spec, component) => component,
    inject: (name, make) => {
      const component = make();
      if (name === 'main') StudioPage = component;
      return undefined;
    },
  },
});
if (typeof StudioPage !== 'function') throw new Error('StudioPage not registered');

/* render 1: image view */
const first = fake.renderRoot(StudioPage, {});
console.log('render #1 ok, nodes:', first.collect.length);
if (!hasText(first.collect, '图片创作')) throw new Error('header missing');

/* 中 → 标签: empty prompt must produce visible feedback (used to be a silent no-op) */
const tagBtn = first.collect.find((n) => n.tag === 'button' && n.text.includes('中文 → 标签'));
if (!tagBtn) throw new Error('translate button missing');
tagBtn.props.onClick();
const afterEmpty = fake.renderRoot(StudioPage, {});
const emptyToasts = afterEmpty.collect.filter((n) => (n.props.className || '').includes('as-toast'));
if (!hasText(emptyToasts, '先写一段画面描述')) throw new Error('empty prompt gave no feedback');
console.log('translate guard ok');

/* 中 → 标签: Chinese text converts and reports the result */
const ta = afterEmpty.collect.find((n) => n.tag === 'textarea');
ta.props.onChange({ target: { value: '金发, 校服, 教室' } });
const typed = fake.renderRoot(StudioPage, {});
const tagBtn2 = typed.collect.find((n) => n.tag === 'button' && n.text.includes('中文 → 标签'));
tagBtn2.props.onClick();
await new Promise((resolve) => setTimeout(resolve, 60));
const converted = fake.renderRoot(StudioPage, {});
const ta2 = converted.collect.find((n) => n.tag === 'textarea');
if (ta2.props.value !== 'blonde hair, school uniform, classroom') throw new Error('prompt was not replaced by tags');
if (!hasText(converted.collect, '已转换 3 个标签')) throw new Error('conversion toast missing');
const firstTranslate = requests.filter((r) => r.url.includes('/translate')).pop();
console.log('translate request mode:', firstTranslate && firstTranslate.body && firstTranslate.body.mode);
if (!firstTranslate || firstTranslate.body.mode !== 'txt2img') throw new Error('/translate did not receive the mode');
console.log('translate convert ok');

/* 环境准备：缺失时出现横幅，能展开、能启动下载并显示进度 */
await new Promise((resolve) => setTimeout(resolve, 40));
const withSetup = fake.renderRoot(StudioPage, {});
if (!hasText(withSetup.collect, '环境未就绪')) throw new Error('setup banner missing when environment is not ready');
const openSetup = withSetup.collect.find((n) => n.tag === 'button' && n.text.includes('准备环境'));
if (!openSetup) throw new Error('setup open button missing');
openSetup.props.onClick();
const setupView = fake.renderRoot(StudioPage, {});
for (const label of ['ComfyUI 服务', '模型文件', '下载模型到 ComfyUI']) {
  if (!hasText(setupView.collect, label)) throw new Error(`setup panel missing: ${label}`);
}
const dlBtn = setupView.collect.find((n) => n.tag === 'button' && n.text.includes('下载模型到 ComfyUI'));
dlBtn.props.onClick();
await new Promise((resolve) => setTimeout(resolve, 60));
const dlView = fake.renderRoot(StudioPage, {});
const setupPost = requests.filter((r) => r.url.includes('/setup') && r.method === 'POST').pop();
if (!setupPost || setupPost.body.action !== 'download') throw new Error('download action was not posted');
if (!hasText(dlView.collect, '25.0%')) throw new Error('download progress did not render');
console.log('setup banner + download progress ok');

/* click 高级设置 and render again */
const advancedBtn = first.collect.find(
  (n) => n.tag === 'button' && n.text.includes('高级设置') && typeof n.props.onClick === 'function',
);
if (!advancedBtn) throw new Error('advanced settings button not found');
advancedBtn.props.onClick();
const second = fake.renderRoot(StudioPage, {});
for (const label of ['创作预设', '资源库 · LoRA 风格', '文本控制与采样', '恢复默认参数', '生成模式与参考图']) {
  if (!hasText(second.collect, label)) throw new Error(`advanced view missing: ${label}`);
}
console.log('render #2 (advanced) ok, nodes:', second.collect.length);

/* custom dropdown: count triggers, open one, expect a menu */
const triggers = second.collect.filter((n) => n.tag === 'button' && (n.props.className || '').includes('as-dd-btn'));
console.log('custom select triggers:', triggers.length);
if (triggers.length < 6) throw new Error('selects were not replaced by the custom dropdown');
triggers[0].props.onClick();
fake.renderRoot(StudioPage, {}); // effects run here (menu position)
const third = fake.renderRoot(StudioPage, {});
const menus = third.collect.filter((n) => (n.props.className || '').includes('as-dd-menu'));
console.log('open menus after click:', menus.length, '· menu options:', third.collect.filter((n) => (n.props.className || '').includes('as-dd-opt')).length);
if (menus.length !== 1) throw new Error('dropdown did not open');

/* helper: open a dropdown by its trigger text and return the option entry */
function pickOption(view, triggerNeedle, optionNeedle) {
  let entries = view.collect;
  const findOpt = (list) =>
    list.find((n) => (n.props.className || '').includes('as-dd-opt') && flatText([n]).includes(optionNeedle));
  let opt = findOpt(entries);
  for (let i = 0; !opt && i < 3; i++) {
    const trig = entries.find(
      (n) => n.tag === 'button' && (n.props.className || '').includes('as-dd-btn') && flatText([n]).includes(triggerNeedle),
    );
    if (!trig) throw new Error(`trigger not found: ${triggerNeedle}`);
    trig.props.onClick(); // opens with the live closure of this render
    fake.renderRoot(StudioPage, {}); // effects place the menu
    entries = fake.renderRoot(StudioPage, {}).collect;
    opt = findOpt(entries);
  }
  if (!opt) throw new Error(`option not found: ${optionNeedle}`);
  return opt;
}

/* hint tooltip: hover a "?" and expect the styled tip instead of a native title */
const hintBtn = second.collect.find((n) => n.tag === 'button' && (n.props.className || '').includes('as-hint'));
if (!hintBtn) throw new Error('hint marker not found');
if (hintBtn.props.title) throw new Error('hint still relies on the native title tooltip');
hintBtn.props.onPointerEnter();
await new Promise((resolve) => setTimeout(resolve, 160));
fake.renderRoot(StudioPage, {}); // layout effect measures the layer
const tipped = fake.renderRoot(StudioPage, {});
const tips = tipped.collect.filter((n) => String(n.props.className || '').split(' ').includes('as-tip'));
console.log('tooltips after hover:', tips.length, '·', tips[0] ? flatText([tips[0]]).trim().slice(0, 28) : '(none)');
if (tips.length !== 1) throw new Error('hint tooltip did not open');
const tipStyle = tips[0].props.style || {};
if (tipStyle.left === undefined || tipStyle.visibility === 'hidden') throw new Error('tooltip was not positioned');
console.log('tooltip position:', tipStyle.left, tipStyle.top);
const arrow = tipped.collect.find((n) => (n.props.className || '').includes('as-tip-arrow'));
if (!arrow) throw new Error('tooltip arrow missing');
hintBtn.props.onPointerLeave();

/* preset save -> toast + localStorage */
const saveBtn = third.collect.find((n) => n.tag === 'button' && n.text.includes('保存预设'));
if (!saveBtn) throw new Error('save preset button missing');
saveBtn.props.onClick();
const fourth = fake.renderRoot(StudioPage, {});
const toasts = fourth.collect.filter((n) => (n.props.className || '').includes('as-toast'));
console.log('toasts after save:', toasts.map((t) => t.text));
if (!hasText(toasts, '已保存预设')) throw new Error('preset save toast missing');
if (!store.has('anima-studio-presets-v1')) throw new Error('presets were not persisted');

/* 更新已有预设：改参数后再保存，应该覆盖而不是新增 */
const readPresets = () => JSON.parse(store.get('anima-studio-presets-v1') || '[]');
const beforeUpdate = readPresets();
console.log('presets after first save:', beforeUpdate.map((p) => p.name).join(', '));
const negBox = fourth.collect.find((n) => n.tag === 'textarea');
negBox.props.onChange({ target: { value: 'updated negative' } });
const afterEdit = fake.renderRoot(StudioPage, {});
const updateBtn = afterEdit.collect.find((n) => n.tag === 'button' && n.text.includes('更新「'));
if (!updateBtn) throw new Error('save button should switch to 更新 after selecting a preset');
updateBtn.props.onClick();
const afterUpdate = fake.renderRoot(StudioPage, {});
const updated = readPresets();
if (updated.length !== beforeUpdate.length) {
  throw new Error(`updating a preset created a new one: ${beforeUpdate.length} -> ${updated.length}`);
}
if (updated[0].form.negative !== 'updated negative') throw new Error('preset was not overwritten with new params');
if (!hasText(afterUpdate.collect, '已更新预设')) throw new Error('update toast missing');
console.log('preset update ok:', updated[0].name);

/* 另存为新预设：在同一个组合框里改名再保存应该新增 */
const nameInput = afterUpdate.collect.find((n) => n.tag === 'input' && n.props.name === 'preset-name');
if (!nameInput) throw new Error('preset name field missing (should be the merged combo box)');
nameInput.props.onChange({ target: { value: '另存预设' } });
const renamed = fake.renderRoot(StudioPage, {});
const saveAsBtn = renamed.collect.find((n) => n.tag === 'button' && n.text.includes('保存为新预设'));
if (!saveAsBtn) throw new Error('save-as button label missing for a new name');
saveAsBtn.props.onClick();
const savedAs = readPresets();
if (savedAs.length !== updated.length + 1) throw new Error('save-as did not create a new preset');
console.log('save-as ok:', savedAs.map((p) => p.name).join(', '));

/* 预设列表里行内 × 删除，替代原来的「管理」下拉 */
const caret = renamed.collect.find((n) => n.tag === 'button' && (n.props.className || '').includes('as-preset-caret'));
if (!caret) throw new Error('preset list caret missing');
caret.props.onClick();
fake.renderRoot(StudioPage, {});
const presetMenu = fake.renderRoot(StudioPage, {});
const rows = presetMenu.collect.filter((n) => (n.props.className || '') === 'as-dd-opt');
console.log('preset menu rows:', rows.length);
if (rows.length < 2) throw new Error('preset list did not render rows');
const delBtn = presetMenu.collect.find(
  (n) =>
    n.tag === 'button' &&
    (n.props.className || '') === 'as-x' &&
    String(n.props['aria-label'] || '').includes('预设 1'),
);
if (!delBtn) throw new Error('inline delete button for the preset missing');
delBtn.props.onClick({ stopPropagation() {} });
const afterDeletePreset = fake.renderRoot(StudioPage, {});
if (readPresets().some((p) => p.name === '预设 1')) throw new Error('inline delete did not remove the preset');
if (!hasText(afterDeletePreset.collect, '已删除预设')) throw new Error('inline delete toast missing');
console.log('inline preset delete ok:', readPresets().map((p) => p.name).join(', '));

/* restore defaults -> toast */
const resetBtn = fourth.collect.find((n) => n.tag === 'button' && n.text.includes('恢复默认参数'));
if (!resetBtn) throw new Error('reset button missing');
resetBtn.props.onClick();
const fifth = fake.renderRoot(StudioPage, {});
const resetToasts = fifth.collect.filter((n) => (n.props.className || '').includes('as-toast'));
console.log('toasts after reset:', resetToasts.map((t) => t.text));
if (!hasText(resetToasts, '已恢复默认参数')) throw new Error('reset toast missing');

/* LoRA: cached list -> add button works, selection is part of the draft */
const sixth = fake.renderRoot(StudioPage, {});
const loraChip = sixth.collect.find((n) => (n.props.className || '').includes('as-chip') && n.text.includes('可用'));
console.log('lora chip:', loraChip ? loraChip.text : '(none)');
if (!loraChip || !loraChip.text.includes('2 个可用')) throw new Error('cached LoRA list was not prefilled');
const addLoraBtn = sixth.collect.find((n) => n.tag === 'button' && n.text.includes('添加 LoRA'));
if (!addLoraBtn) throw new Error('add lora button missing');
addLoraBtn.props.onClick();
const seventh = fake.renderRoot(StudioPage, {});
const loraRows = seventh.collect.filter((n) => (n.props.className || '') === 'as-lora');
console.log('lora rows after add:', loraRows.length);
if (!loraRows.length) throw new Error('LoRA row was not added');
const loraRowText = flatText(loraRows);
console.log('lora row text:', loraRowText.trim());
if (!loraRowText.includes('styleA.safetensors')) throw new Error('LoRA row did not pick the first available file');

/* LoRA 列标题（名称 / 权重 / 应用位置） */
const loraLabels = seventh.collect.find((n) => (n.props.className || '') === 'as-lora-labels');
if (!loraLabels) throw new Error('LoRA column labels missing');
const loraLabelText = flatText([loraLabels]);
if (!loraLabelText.includes('LoRA 名称') || !loraLabelText.includes('权重') || !loraLabelText.includes('应用位置')) {
  throw new Error('LoRA column labels incomplete: ' + loraLabelText);
}
console.log('lora labels:', loraLabelText.trim());

/* LoRA 下拉可搜索：输入关键字只剩匹配项，选中后回填 */
const loraTrigger = seventh.collect.find(
  (n) => n.tag === 'button' && (n.props.className || '').includes('as-dd-btn') && flatText([n]).includes('styleA'),
);
if (!loraTrigger) throw new Error('LoRA select trigger not found');
loraTrigger.props.onClick();
const loraOpen = fake.renderRoot(StudioPage, {});
const searchBox = loraOpen.collect.find((n) => n.tag === 'input' && (n.props.className || '').includes('as-dd-search-input'));
if (!searchBox) throw new Error('LoRA dropdown should render a search box');
/* 只统计以 style 开头的选项，避免把其它仍开着的菜单算进来 */
const loraOpts = (view) =>
  view.collect.filter(
    (n) => (n.props.className || '').includes('as-dd-opt') && flatText([n]).trim().startsWith('style'),
  );
searchBox.props.onChange({ target: { value: 'styleb' } });
const filteredView = fake.renderRoot(StudioPage, {});
const filteredOpts = loraOpts(filteredView);
console.log('lora search results:', filteredOpts.map((n) => flatText([n]).trim()).join(' | '));
if (filteredOpts.length !== 1) throw new Error(`search should narrow to 1 option, got ${filteredOpts.length}`);
if (!flatText(filteredOpts).includes('styleB')) throw new Error('search did not match the expected LoRA');
filteredOpts[0].props.onClick();
const afterPickLora = fake.renderRoot(StudioPage, {});
if (!flatText(afterPickLora.collect).includes('styleB')) throw new Error('picked LoRA was not applied');
/* 切回 styleA，保持后面"重启恢复"的期望值 */
const trigger2 = afterPickLora.collect.find(
  (n) => n.tag === 'button' && (n.props.className || '').includes('as-dd-btn') && flatText([n]).includes('styleB'),
);
trigger2.props.onClick();
const reopen = fake.renderRoot(StudioPage, {});
const searchBox2 = reopen.collect.find((n) => (n.props.className || '').includes('as-dd-search-input'));
searchBox2.props.onChange({ target: { value: 'stylea' } });
const filtered2 = fake.renderRoot(StudioPage, {});
loraOpts(filtered2)[0].props.onClick();

/* LoRA 行的提示气泡：不能再用原生 title，且悬停应浮出 .as-tip */
const loraTipWraps = seventh.collect.filter((n) => String(n.props.className || '').split(' ').includes('as-tip-wrap') || String(n.props.className || '').split(' ').includes('as-tip-wrap-block'));
console.log('lora tip wrappers:', loraTipWraps.length);
/* 只有「名称 / 权重 / 应用位置」带气泡；×、+ 添加 LoRA 属显而易见的操作，不再挂提示 */
if (loraTipWraps.length !== 3) throw new Error(`only 3 LoRA controls should carry tips, got ${loraTipWraps.length}`);
const loraNameTip = loraTipWraps.find((n) => flatText([n]).includes('styleA'));
if (!loraNameTip) throw new Error('LoRA name control is not wrapped by a themed tip');
if (loraTrigger.props.title) throw new Error('LoRA select still uses the native title tooltip');
loraNameTip.props.onPointerEnter();
await new Promise((resolve) => setTimeout(resolve, 200));
fake.renderRoot(StudioPage, {});
const loraTipView = fake.renderRoot(StudioPage, {});
const loraTips = loraTipView.collect.filter((n) => String(n.props.className || '').split(' ').includes('as-tip'));
console.log('themed tip text:', loraTips.map((n) => flatText([n]).trim().slice(0, 24)).join(' | '));
if (!loraTips.some((n) => flatText([n]).includes('LoRA 文件'))) throw new Error('themed tooltip for LoRA select did not open');
loraNameTip.props.onPointerLeave();
/* 下拉选项里不再画 ✓（只用高亮表示当前值） */
if (seventh.collect.some((n) => (n.props.className || '').includes('as-dd-tick'))) {
  throw new Error('selected option should be highlighted without a tick mark');
}

/* 高级页切换模式 -> 参考图控件出现 */
const modeView = fake.renderRoot(StudioPage, {});
pickOption(modeView, '文生图', '图生图').props.onClick();
const afterMode = fake.renderRoot(StudioPage, {});
if (!hasText(afterMode.collect, '参考图')) throw new Error('img2img reference controls did not appear');

/* 回到创作页：模式区、参考图、降噪、尺寸禁用、按钮文案都要跟着变 */
const backBtn = afterMode.collect.find((n) => n.tag === 'button' && n.text.includes('返回创作'));
if (!backBtn) throw new Error('back-to-create button missing');
backBtn.props.onClick();
const create2 = fake.renderRoot(StudioPage, {});
for (const label of ['生成模式', '参考图', '降噪强度']) {
  if (!hasText(create2.collect, label)) throw new Error(`create view missing after img2img: ${label}`);
}
const modePill = (view, label) =>
  view.collect.find((n) => n.tag === 'button' && (n.props.className || '').includes('as-pill') && flatText([n]).trim() === label);
const actionBtn = create2.collect.find((n) => n.tag === 'button' && (n.props.className || '').includes('as-btn block'));
console.log('create action button:', actionBtn ? actionBtn.text : '(none)');
if (!actionBtn || !actionBtn.text.includes('图生图')) throw new Error('generate button label did not follow the mode');
const disabledSelect = create2.collect.find(
  (n) => n.tag === 'button' && (n.props.className || '').includes('as-dd-btn') && n.props.disabled,
);
if (!disabledSelect) throw new Error('size select was not disabled for img2img');
if (!hasText(create2.collect, '参考图已经决定主体')) throw new Error('mode-aware translation hint missing');
console.log('create view follows img2img ok');

/* 缺参考图时点生成：给出明确提示，不排队 */
const ta3 = create2.collect.find((n) => n.tag === 'textarea');
ta3.props.onChange({ target: { value: '1girl, standing' } });
const prepared = fake.renderRoot(StudioPage, {});
const genBtn = prepared.collect.find((n) => n.tag === 'button' && (n.props.className || '').includes('as-btn block'));
genBtn.props.onClick();
const afterGen = fake.renderRoot(StudioPage, {});
if (!hasText(afterGen.collect, '先选一张参考图')) throw new Error('missing reference was not reported');
console.log('mode preflight ok');

/* 给出参考图后：转换失败也不阻断生成（图生图靠图不靠词） */
hasJob = true;
const refreshBtn = afterGen.collect.find((n) => n.tag === 'button' && n.text.trim() === '刷新');
if (!refreshBtn) throw new Error('refresh button missing');
refreshBtn.props.onClick();
await new Promise((resolve) => setTimeout(resolve, 60));
const withJobs = fake.renderRoot(StudioPage, {});
pickOption(withJobs, '选择一张已生成的图', 'abcdef').props.onClick();
const withRef = fake.renderRoot(StudioPage, {});
withRef.collect.find((n) => n.tag === 'textarea').props.onChange({ target: { value: '失败测试' } });
const failView = fake.renderRoot(StudioPage, {});
const failGenBtn = failView.collect.find((n) => n.tag === 'button' && (n.props.className || '').includes('as-btn block'));
failGenBtn.props.onClick();
await new Promise((resolve) => setTimeout(resolve, 80));
const afterFail = fake.renderRoot(StudioPage, {});
const failToasts = afterFail.collect.filter((n) => (n.props.className || '').includes('as-toast'));
if (!hasText(failToasts, '标签没转干净')) throw new Error('img2img did not warn on failed conversion');
const generateCalls = requests.filter((r) => r.url.includes('/generate'));
console.log('generate requests so far:', generateCalls.length);
if (!generateCalls.length) throw new Error('img2img generation was blocked by a failed conversion');
const img2imgTranslate = requests.filter((r) => r.url.includes('/translate')).pop();
if (!img2imgTranslate || img2imgTranslate.body.mode !== 'img2img') throw new Error('/translate did not receive img2img mode');
console.log('mode-aware translation request ok');

/* 等这一轮任务轮询结束（忙碌态会禁用生成按钮） */
await new Promise((resolve) => setTimeout(resolve, 1500));
const settled = fake.renderRoot(StudioPage, {});

/* 创作页的模式 pills：蒙版重绘 / ControlNet */
modePill(settled, '蒙版重绘').props.onClick();
const inpaintView = fake.renderRoot(StudioPage, {});
if (!hasText(inpaintView.collect, '蒙版图')) throw new Error('inpaint mask controls did not appear');
if (!hasText(inpaintView.collect, '蒙版外扩')) throw new Error('mask grow control missing');
if (!hasText(inpaintView.collect, '只描述白区要画什么')) throw new Error('inpaint translation hint missing');

modePill(inpaintView, 'ControlNet').props.onClick();
const controlView = fake.renderRoot(StudioPage, {});
if (!hasText(controlView.collect, 'ControlNet 模型')) throw new Error('controlnet model picker missing');
if (!hasText(controlView.collect, '控制强度')) throw new Error('control strength missing');
if (!hasText(controlView.collect, '不会再补视角/姿势标签')) throw new Error('controlnet translation hint missing');
console.log('create view follows inpaint / controlnet ok');

/* 引擎已固定为「词典优先 + 模型兜底」：界面上不该再有引擎/模型面板 */
if (hasText(controlView.collect, '转换引擎')) throw new Error('engine panel is still rendered');
if (controlView.collect.some((n) => (n.props.className || '') === 'as-pop')) throw new Error('model panel still open by default');

/* 角色自动补外观：创作页直接可见的开关 */
const appearBox = controlView.collect.find((n) => n.tag === 'input' && n.props.name === 'tag-appearance');
if (!appearBox) throw new Error('appearance checkbox missing on the create page');
appearBox.props.onChange({ target: { checked: true } });
const withAppearance = fake.renderRoot(StudioPage, {});
if (!withAppearance.collect.some((n) => n.tag === 'input' && n.props.name === 'tag-appearance' && n.props.checked === true)) {
  throw new Error('appearance checkbox did not turn on');
}
console.log('appearance toggle ok');

const ta5 = withAppearance.collect.find((n) => n.tag === 'textarea');
ta5.props.onChange({ target: { value: '金发, 校服' } });
const ready = fake.renderRoot(StudioPage, {});
ready.collect.find((n) => n.tag === 'button' && n.text.includes('中文 → 标签')).props.onClick();
await new Promise((resolve) => setTimeout(resolve, 60));
const lastTranslate = requests.filter((r) => r.url.includes('/translate')).pop();
console.log('translate body:', lastTranslate && JSON.stringify({ engine: lastTranslate.body.engine, mode: lastTranslate.body.mode, appearance: lastTranslate.body.appearance }));
if (!lastTranslate || lastTranslate.body.engine !== 'auto') throw new Error('translate did not use the fixed auto engine');
if (lastTranslate.body.appearance !== true) throw new Error('translate did not carry the appearance flag');
if ('provider' in lastTranslate.body || 'model' in lastTranslate.body) throw new Error('translate still sends a model route');
console.log('translate request ok');

/* 场景模板 / 画师风格：追加标签并去重 */
const afterModel = fake.renderRoot(StudioPage, {});
const pickChip = (view, label) =>
  view.collect.find((n) => n.tag === 'button' && (n.props.className || '').includes('as-chip btn') && flatText([n]).includes(label));
pickChip(afterModel, '场景模板').props.onClick();
fake.renderRoot(StudioPage, {});
await new Promise((resolve) => setTimeout(resolve, 30));
const tmplView = fake.renderRoot(StudioPage, {});
const tmplRow = tmplView.collect.find(
  (n) => (n.props.className || '') === 'as-pop-row' && flatText([n]).includes('雨中天台'),
);
if (!tmplRow) throw new Error('scene template list did not render');
tmplRow.props.onClick();
const afterTmpl = fake.renderRoot(StudioPage, {});
const promptAfterTmpl = afterTmpl.collect.find((n) => n.tag === 'textarea').props.value;
console.log('prompt after template:', promptAfterTmpl);
if (!promptAfterTmpl.includes('rooftop') || !promptAfterTmpl.includes('blonde hair')) {
  throw new Error('scene template did not append tags');
}
if (!hasText(afterTmpl.collect, '已套用「雨中天台」')) throw new Error('template toast missing');

const pickArt = pickChip(afterTmpl, '画师风格');
pickArt.props.onClick();
fake.renderRoot(StudioPage, {});
await new Promise((resolve) => setTimeout(resolve, 30));
const artView = fake.renderRoot(StudioPage, {});
const artRow = artView.collect.find((n) => (n.props.className || '') === 'as-pop-row' && flatText([n]).includes('wlop'));
if (!artRow) throw new Error('artist list did not render');
artRow.props.onClick();
const afterArt = fake.renderRoot(StudioPage, {});
const promptAfterArt = afterArt.collect.find((n) => n.tag === 'textarea').props.value;
if (!promptAfterArt.includes('wlop')) throw new Error('artist tag was not appended');
console.log('template + artist ok');

/* 负面预设：在高级设置里填入 */
const advBtn2 = afterArt.collect.find((n) => n.tag === 'button' && n.text.includes('高级设置'));
advBtn2.props.onClick();
const advView = fake.renderRoot(StudioPage, {});
pickOption(advView, '负面预设', '手部与解剖').props.onClick();
const afterNeg = fake.renderRoot(StudioPage, {});
const negatives = afterNeg.collect.filter((n) => n.tag === 'textarea').map((n) => String(n.props.value || ''));
if (!negatives.some((v) => v.includes('bad hands'))) throw new Error('negative preset was not applied');
console.log('negative preset ok');

const backToCreate = afterNeg.collect.find((n) => n.tag === 'button' && n.text.includes('返回创作'));
backToCreate.props.onClick();
fake.renderRoot(StudioPage, {});

/* 回到高级页继续后面的预设 / LoRA 测试 */
const advAgain = afterGen.collect.find((n) => n.tag === 'button' && n.text.includes('高级设置'));
advAgain.props.onClick();
fake.renderRoot(StudioPage, {});

/* 全局约定：任何宿主元素都不应再带原生 title（提示统一走 Tip / Hint 自绘气泡） */
const titled = afterUpdate.collect.filter(
  (n) => typeof n.tag === 'string' && n.props && Object.prototype.hasOwnProperty.call(n.props, 'title'),
);
if (titled.length) {
  console.log('nodes still using native title:', titled.map((n) => n.tag + '.' + String(n.props.className || '')).join(', '));
  throw new Error(`native title tooltips are not allowed (${titled.length} found)`);
}
/* 预设删除已在前面的「行内 ×」测试覆盖，这里直接进图库 */
const afterDelete = fake.renderRoot(StudioPage, {});

/* gallery tab renders */
const galleryTab = afterDelete.collect.find((n) => n.tag === 'button' && n.text.trim() === '图库');
if (!galleryTab) throw new Error('gallery tab missing');
galleryTab.props.onClick();
const galleryView = fake.renderRoot(StudioPage, {});
const galleryTitles = galleryView.collect.filter(
  (n) => typeof n.tag === 'string' && n.props && Object.prototype.hasOwnProperty.call(n.props, 'title'),
);
if (galleryTitles.length) {
  throw new Error(`gallery still uses native title (${galleryTitles.length})`);
}
if (!hasText(galleryView.collect, '全部作品') || !(hasText(galleryView.collect, '图库还是空的') || hasText(galleryView.collect, '测试图'))) {
  throw new Error('gallery view did not render');
}
console.log('gallery view ok');

/* draft autosave carries the LoRA stack */
await new Promise((resolve) => setTimeout(resolve, 700));
const draftRaw = store.get('anima-studio-draft-v1');
if (!draftRaw) throw new Error('draft was not written');
const draft = JSON.parse(draftRaw);
console.log('draft loras:', JSON.stringify(draft.loras));
if (!Array.isArray(draft.loras) || draft.loras[0]?.name !== 'styleA.safetensors') {
  throw new Error('draft did not keep the LoRA stack');
}

/* simulated dsh restart: a brand-new mount must restore the LoRA stack */
const fake2 = makeReact();
const mod2 = captured.factory((id) => {
  if (id === 'react') return fake2.React;
  if (id === 'react-dom') return { createPortal: (node) => node };
  throw new Error(`unexpected require: ${id}`);
});
let StudioPage2 = null;
mod2.apply({
  slots: {
    register: (spec, component) => component,
    inject: (name, make) => {
      const component = make();
      if (name === 'main') StudioPage2 = component;
    },
  },
});
const restart1 = fake2.renderRoot(StudioPage2, {});
const adv2 = restart1.collect.find((n) => n.tag === 'button' && n.text.includes('高级设置'));
adv2.props.onClick();
const restart2 = fake2.renderRoot(StudioPage2, {});
const restoredRows = restart2.collect.filter((n) => (n.props.className || '') === 'as-lora');
console.log('lora rows after restart:', restoredRows.length, '·', flatText(restoredRows).trim());
if (restoredRows.length !== 1 || !flatText(restoredRows).includes('styleA.safetensors')) {
  throw new Error('LoRA selection did not survive a restart');
}

console.log('ALL CHECKS PASSED');
process.exit(0);
