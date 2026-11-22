window.__ModuleLoader__.load({
  id: 'dsh-anima-studio',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } = React;

    const API = '/api/anima-studio';
    const PRESET_KEY = 'anima-studio-presets-v1';
    const DRAFT_KEY = 'anima-studio-draft-v1';
    const LORA_CACHE_KEY = 'anima-studio-loras-v1';
    const TOAST_MS = 5000;
    const LORA_CACHE_MAX = 400;

    const RATIOS = [
      { key: '1:1', width: 1024, height: 1024 },
      { key: '16:9', width: 1344, height: 768 },
      { key: '9:16', width: 768, height: 1344 },
      { key: '3:2', width: 1216, height: 832 },
      { key: '2:3', width: 832, height: 1216 },
    ];

    const MODE_OPTIONS = [
      ['txt2img', '文生图'],
      ['img2img', '图生图'],
      ['inpaint', '蒙版重绘'],
      ['controlnet', 'ControlNet'],
    ];

    const MODE_LABEL = Object.fromEntries(MODE_OPTIONS);

    const MODE_HINT = {
      txt2img: '文生图：只按提示词和尺寸出图',
      img2img: '图生图：拿一张图当底，按降噪强度重画',
      inpaint: '蒙版重绘：参考图上涂白的地方重画，其余保留',
      controlnet: 'ControlNet：用一张图约束构图，再按提示词重画',
    };

    const MODE_ACTION = {
      txt2img: '生成图片',
      img2img: '图生图',
      inpaint: '蒙版重绘',
      controlnet: 'ControlNet 生成',
    };

    /** 负面提示词预设：base/hands/text 是手写常用组合，all 用词库里的 134 条负面标签。 */
    const NEGATIVE_BUNDLES = [
      { value: '__clear__', label: '清空（用模型推荐）' },
      { value: 'base', label: '通用画质 + 解剖' },
      { value: 'hands', label: '手部与解剖' },
      { value: 'text', label: '文字 / 水印' },
      { value: 'all', label: '词库全部负面' },
    ];

    const NEGATIVE_TEXT = {
      base:
        'lowres, bad anatomy, bad hands, text, error, missing finger, extra digits, fewer digits, cropped, ' +
        'worst quality, low quality, low score, bad score, average score, signature, watermark, username, blurry',
      hands:
        'bad hands, extra fingers, fewer fingers, missing fingers, fused fingers, mutated hands, extra limbs, ' +
        'extra arms, extra legs, bad proportions, poorly drawn hands, poorly drawn face, malformed limbs',
      text:
        'text, watermark, signature, username, logo, english text, chinese text, speech bubble, ' +
        'artist name, twitter username',
    };

    /** 中文转换在各模式下的差异：画面已由参考图/控制图决定时，只补要改的部分。 */
    const TAGS_MODE_HINT = {
      img2img: '图生图：转换只补你要改的部分，参考图已经决定主体，不会再补人数/背景，也不会塞质量标签。',
      inpaint: '蒙版重绘：转换只描述白区要画什么，不复述整张图。',
      controlnet: 'ControlNet：构图由控制图决定，转换不会再补视角/姿势标签。',
    };

    const EMPTY_FORM = {
      prompt: '',
      negative: '',
      width: 832,
      height: 1216,
      steps: 28,
      cfg: 5,
      sampler: 'euler_ancestral',
      scheduler: 'normal',
      seed: 0,
      lockSeed: false,
      batch: 1,
      loras: [],
      mode: 'txt2img',
      denoise: 0.6,
      refSource: 'gallery',
      refJobId: '',
      refData: '',
      maskData: '',
      controlSource: 'gallery',
      controlJobId: '',
      controlData: '',
      controlNet: '',
      controlStrength: 1,
      growMaskBy: 0,
      tagAppearance: false,
    };

    const FORM_KEYS = Object.keys(EMPTY_FORM);
    const LARGE_KEYS = ['refData', 'controlData', 'maskData'];

    function clampWeight(value) {
      const n = Number(value);
      if (!Number.isFinite(n)) return 1;
      return Math.min(2, Math.max(0, n));
    }

    /** Form snapshot that survives localStorage: drops base64 payloads, fixes types. */
    function cleanForm(source) {
      if (!source || typeof source !== 'object') return {};
      const out = {};
      for (const key of FORM_KEYS) {
        if (LARGE_KEYS.includes(key) || !(key in source)) continue;
        const value = source[key];
        if (key === 'loras') {
          out.loras = Array.isArray(value)
            ? value
                .filter((l) => l && typeof l.name === 'string' && l.name.trim())
                .slice(0, 8)
                .map((l) => ({ name: l.name.trim(), weight: clampWeight(l.weight), mode: l.mode === 'both' ? 'both' : 'model' }))
            : [];
          continue;
        }
        const kind = typeof EMPTY_FORM[key];
        if (kind === 'number') {
          const n = Number(value);
          if (Number.isFinite(n)) out[key] = n;
        } else if (kind === 'boolean') {
          out[key] = Boolean(value);
        } else if (kind === 'string') {
          if (typeof value === 'string') out[key] = value;
        }
      }
      return out;
    }

    function readStored(key) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    }

    function writeStored(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    }

    function loadDraftForm() {
      const saved = readStored(DRAFT_KEY);
      const base = { ...EMPTY_FORM, seed: Math.floor(Math.random() * 2 ** 31) };
      if (!saved || typeof saved !== 'object') return base;
      return { ...base, ...cleanForm(saved) };
    }

    function humanBytesOf(bytes) {
      const n = Number(bytes) || 0;
      if (n >= 1024 ** 3) return `${(n / 1024 ** 3).toFixed(2)} GB`;
      if (n >= 1024 ** 2) return `${(n / 1024 ** 2).toFixed(1)} MB`;
      if (n >= 1024) return `${(n / 1024).toFixed(0)} KB`;
      return `${n} B`;
    }

    function loadLoraCache() {      const saved = readStored(LORA_CACHE_KEY);
      if (!Array.isArray(saved)) return [];
      return saved.filter((n) => typeof n === 'string' && n.trim()).slice(0, LORA_CACHE_MAX);
    }

    async function api(path, init) {
      const res = await fetch(API + path, init);
      const text = await res.text();
      let body = {};
      try {
        body = text ? JSON.parse(text) : {};
      } catch {
        body = { error: text.slice(0, 200) };
      }
      if (!res.ok) throw new Error(body.error || `请求失败 ${res.status}`);
      return body;
    }

    const css = `
.as-root { height:100%; display:flex; flex-direction:column; min-height:0; color: var(--dsw-alias-text-primary, light-dark(#1b1b1f,#e9e9ec)); background: var(--dsw-alias-bg-primary, light-dark(#ffffff,#16161a)); font-size:13px; }
.as-head { display:flex; align-items:center; gap:10px; padding:10px 16px; flex:0 0 auto; }
.as-title { font-weight:600; font-size:14px; }
.as-chip { font-size:11px; padding:2px 9px; border-radius:999px; border:1px solid var(--dsw-alias-border, light-dark(#e0e0e6,#33333a)); color: var(--dsw-alias-text-secondary, light-dark(#5c5c66,#a0a0aa)); white-space:nowrap; }
.as-chip.ok { color:#1a9e5b; border-color:#1a9e5b55; background:#1a9e5b12; }
.as-chip.bad { color:#d04545; border-color:#d0454555; background:#d0454512; }
.as-spacer { flex:1 1 auto; }
.as-tabbar { display:flex; gap:6px; padding:0 16px; border-bottom:1px solid var(--dsw-alias-border, light-dark(#e6e6ea,#2c2c33)); flex:0 0 auto; }
.as-tab { border:none; background:transparent; font:inherit; font-size:13px; padding:8px 4px; margin-bottom:-1px; cursor:pointer; color: var(--dsw-alias-text-secondary, light-dark(#6a6a74,#9a9aa6)); border-bottom:2px solid transparent; }
.as-tab.on { color: var(--dsw-alias-text-primary, inherit); border-bottom-color: var(--dsw-alias-accent, #4a7dff); font-weight:600; }
.as-main { flex:1 1 auto; min-height:0; display:flex; }

/* create view */
.as-create { flex:1 1 auto; display:flex; min-height:0; }
.as-preview { flex:1 1 auto; min-width:0; display:flex; flex-direction:column; padding:14px 16px; }
.as-preview-head { display:flex; align-items:center; font-size:12px; color: var(--dsw-alias-text-secondary, light-dark(#6a6a74,#9a9aa6)); padding-bottom:10px; }
.as-preview-body { flex:1 1 auto; min-height:0; display:flex; align-items:center; justify-content:center; border:1px solid var(--dsw-alias-border, light-dark(#e6e6ea,#2c2c33)); border-radius:12px; background: var(--dsw-alias-bg-secondary, light-dark(#fafafc,#131317)); overflow:auto; padding:16px; }
.as-preview-body img { max-width:100%; max-height:100%; display:block; border-radius:8px; cursor:zoom-in; }
.as-empty { text-align:center; color: var(--dsw-alias-text-secondary, light-dark(#8a8a94,#7c7c88)); font-size:12px; line-height:2; }
.as-panel { width:420px; flex:0 0 auto; border-left:1px solid var(--dsw-alias-border, light-dark(#e6e6ea,#2c2c33)); display:flex; flex-direction:column; min-height:0; }
.as-panel-scroll { flex:1 1 auto; overflow-y:auto; padding:14px 16px; display:flex; flex-direction:column; gap:14px; }
.as-panel-foot { flex:0 0 auto; padding:12px 16px; border-top:1px solid var(--dsw-alias-border, light-dark(#e6e6ea,#2c2c33)); }
.as-label { font-size:12px; color: var(--dsw-alias-text-secondary, light-dark(#6a6a74,#9a9aa6)); margin-bottom:6px; display:flex; align-items:center; gap:6px; }
.as-label b { color: var(--dsw-alias-text-primary, inherit); font-weight:600; }
.as-ta { width:100%; box-sizing:border-box; resize:vertical; border-radius:10px; padding:10px 12px; font:inherit; line-height:1.6; color:inherit; background: var(--dsw-alias-bg-secondary, light-dark(#f7f7f9,#1e1e24)); border:1px solid var(--dsw-alias-border, light-dark(#dedee6,#33333a)); outline:none; }
.as-ta:focus { border-color: var(--dsw-alias-accent, #4a7dff); }
.as-chips { display:flex; flex-wrap:wrap; gap:8px; }
.as-pill { font-size:12px; padding:6px 14px; border-radius:9px; cursor:pointer; color: var(--dsw-alias-text-secondary, light-dark(#5c5c66,#a8a8b4)); background: transparent; border:1px solid var(--dsw-alias-border, light-dark(#dedee6,#33333a)); font:inherit; }
.as-pill:hover { border-color: var(--dsw-alias-accent, #4a7dff); }
.as-pill.on { color: var(--dsw-alias-accent, #4a7dff); border-color: var(--dsw-alias-accent, #4a7dff); background: color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 10%, transparent); font-weight:600; }
.as-input { box-sizing:border-box; width:100%; border-radius:9px; padding:8px 10px; font:inherit; color:inherit; background: var(--dsw-alias-bg-secondary, light-dark(#f7f7f9,#1e1e24)); border:1px solid var(--dsw-alias-border, light-dark(#dedee6,#33333a)); outline:none; }
.as-input:focus { border-color: var(--dsw-alias-accent, #4a7dff); }
.as-row { display:flex; align-items:center; gap:8px; }
.as-row > .as-grow { flex:1 1 auto; min-width:0; }
.as-btn { border-radius:9px; padding:9px 16px; font:inherit; font-weight:600; cursor:pointer; color:#fff; background: var(--dsw-alias-accent, #4a7dff); border:none; }
.as-btn:disabled { opacity:.45; cursor:not-allowed; }
.as-btn.block { width:100%; padding:11px 16px; font-size:14px; }
.as-btn.ghost { color: var(--dsw-alias-text-primary, inherit); background: transparent; border:1px solid var(--dsw-alias-border, light-dark(#dedee6,#33333a)); font-weight:400; }
.as-btn.sm { padding:4px 10px; font-size:12px; border-radius:7px; }
.as-btn.danger { color:#d04545; border-color:#d0454555; }
.as-section-title { font-size:14px; font-weight:600; margin:0 0 2px; }
.as-card2 { border:1px solid var(--dsw-alias-border, light-dark(#e6e6ea,#2c2c33)); border-radius:12px; padding:16px; background: var(--dsw-alias-bg-primary, light-dark(#ffffff,#16161a)); }
.as-card2 + .as-card2 { margin-top:12px; }
.as-hint { display:inline-flex; align-items:center; justify-content:center; width:15px; height:15px; margin:0; padding:0; box-sizing:border-box; -webkit-appearance:none; appearance:none; border-radius:50%; font-size:10px; font-weight:600; line-height:1; border:1px solid var(--dsw-alias-border, light-dark(#cfcfd8,#44444e)); color: var(--dsw-alias-text-secondary, light-dark(#8a8a94,#7c7c88)); background:transparent; cursor:help; font-family:inherit; transition: color .16s ease, border-color .16s ease, background .16s ease, box-shadow .16s ease; }
.as-hint:hover, .as-hint.on { color: var(--dsw-alias-accent, #4a7dff); border-color: color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 60%, transparent); background: color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 12%, transparent); }
.as-hint:focus-visible { outline:none; box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 20%, transparent); }
.as-tip { position:fixed; z-index:10070; box-sizing:border-box; max-width:286px; padding:8px 11px; border-radius:10px; text-align:left; font-size:12px; font-weight:400; line-height:1.62; letter-spacing:0; white-space:normal; color: var(--dsw-alias-text-primary, light-dark(#1b1b1f,#e9e9ec)); background: var(--dsw-alias-bg-primary, light-dark(#ffffff,#1b1b21)); border:1px solid var(--dsw-alias-border, light-dark(#e2e2e8,#34343c)); box-shadow: 0 18px 40px -16px #0000004d, 0 2px 8px -4px #00000024; animation: as-tip-in .13s ease-out; pointer-events:none; }
.as-tip b { font-weight:600; }
.as-tip-arrow { position:absolute; width:8px; height:8px; background-color: inherit; border:1px solid var(--dsw-alias-border, light-dark(#e2e2e8,#34343c)); transform: rotate(45deg); }
.as-tip-arrow.below { bottom:-5px; border-top:none; border-left:none; }
.as-tip-arrow.above { top:-5px; border-bottom:none; border-right:none; }
@keyframes as-tip-in { from { opacity:0; } to { opacity:1; } }
.as-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap:12px; }
.as-gcard { border:1px solid var(--dsw-alias-border, light-dark(#e6e6ea,#2c2c33)); border-radius:12px; overflow:hidden; background: var(--dsw-alias-bg-secondary, light-dark(#fafafc,#1a1a20)); display:flex; flex-direction:column; }
.as-gcard img { width:100%; display:block; cursor:zoom-in; background:#00000010; }
.as-gmeta { padding:8px 10px; font-size:11px; color: var(--dsw-alias-text-secondary, light-dark(#6a6a74,#9a9aa6)); line-height:1.5; }
.as-clamp { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.as-gactions { display:flex; gap:6px; margin-top:6px; align-items:center; }
.as-star { cursor:pointer; border:none; background:transparent; font-size:15px; line-height:1; padding:0 2px; color:#e0a020; }
.as-toolbar { display:flex; gap:10px; align-items:center; padding:14px 16px 10px; }
.as-search { flex:1 1 auto; max-width:320px; }
.as-progress { height:3px; border-radius:2px; overflow:hidden; background: var(--dsw-alias-bg-secondary, light-dark(#eeeef2,#26262c)); margin-top:10px; }
.as-progress > i { display:block; height:100%; width:35%; background: var(--dsw-alias-accent, #4a7dff); animation: as-slide 1.1s ease-in-out infinite; }
@keyframes as-slide { 0%{transform:translateX(-100%)} 100%{transform:translateX(320%)} }
.as-lora { display:grid; grid-template-columns: 1fr 78px 84px 24px; gap:8px; align-items:center; margin-bottom:8px; }
.as-lora-labels { display:grid; grid-template-columns: 1fr 78px 84px 24px; gap:8px; align-items:center; font-size:11px; line-height:1.4; color: var(--dsw-alias-text-secondary, light-dark(#8a8a94,#7c7c88)); padding:0 2px 4px; }
.as-x { cursor:pointer; border:none; background:transparent; color: var(--dsw-alias-text-secondary, inherit); font-size:15px; line-height:1; padding:2px; }
.as-err { color:#d04545; font-size:12px; white-space:pre-wrap; }
.as-adv-page { flex:1 1 auto; display:flex; flex-direction:column; min-height:0; }
.as-adv-top { display:flex; align-items:center; gap:14px; padding:12px 20px; border-bottom:1px solid var(--dsw-alias-border, light-dark(#e6e6ea,#2c2c33)); }
.as-adv-title { flex:1 1 auto; text-align:center; font-weight:600; font-size:14px; }
.as-adv-body { flex:1 1 auto; overflow-y:auto; padding:20px; }
.as-adv-inner { max-width:980px; margin:0 auto; }
.as-adv-foot { flex:0 0 auto; display:flex; align-items:center; gap:12px; padding:12px 20px; border-top:1px solid var(--dsw-alias-border, light-dark(#e6e6ea,#2c2c33)); }
.as-lightbox { position:fixed; inset:0; background:#000000d0; display:flex; align-items:center; justify-content:center; z-index:9999; cursor:zoom-out; }
.as-lightbox img { max-width:92vw; max-height:92vh; border-radius:8px; }
.as-warn { font-size:12px; color: var(--dsw-alias-text-secondary, light-dark(#8a8a94,#7c7c88)); background: var(--dsw-alias-bg-secondary, light-dark(#f4f4f7,#1e1e24)); border-radius:9px; padding:10px 12px; }

/* ---- custom select ------------------------------------------------- */
.as-dd { position:relative; display:inline-flex; flex:0 1 auto; width:100%; min-width:0; }
.as-dd-btn { display:flex; align-items:center; gap:8px; width:100%; box-sizing:border-box; min-height:34px; padding:7px 10px 7px 12px; font:inherit; font-size:13px; line-height:1.4; text-align:left; color:inherit; cursor:pointer; border-radius:10px; border:1px solid var(--dsw-alias-border, light-dark(#dedee6,#33333a)); background: var(--dsw-alias-bg-secondary, light-dark(#f7f7f9,#1e1e24)); transition: border-color .16s ease, box-shadow .16s ease, background .16s ease; }
.as-dd-btn:hover:not(:disabled) { border-color: color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 50%, var(--dsw-alias-border, #dedee6)); }
.as-dd-btn:focus-visible { outline:none; border-color: var(--dsw-alias-accent, #4a7dff); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 18%, transparent); }
.as-dd-btn.open { border-color: var(--dsw-alias-accent, #4a7dff); background: var(--dsw-alias-bg-primary, light-dark(#ffffff,#16161a)); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 16%, transparent); }
.as-dd-btn:disabled { opacity:.5; cursor:not-allowed; }
.as-dd-val { flex:1 1 auto; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.as-dd-val.ph { color: var(--dsw-alias-text-secondary, light-dark(#8a8a94,#7c7c88)); }
.as-dd-car { flex:0 0 auto; width:14px; height:14px; opacity:.6; transition: transform .18s ease, opacity .16s ease; }
.as-dd-btn.open .as-dd-car, .as-dd-btn:hover .as-dd-car { opacity:.95; }
.as-dd-btn.open .as-dd-car { transform: rotate(180deg); }
.as-dd-menu { position:fixed; z-index:10050; box-sizing:border-box; min-width:120px; max-height:304px; overflow-y:auto; overscroll-behavior:contain; padding:6px; border-radius:12px; border:1px solid var(--dsw-alias-border, light-dark(#e2e2e8,#34343c)); background: var(--dsw-alias-bg-primary, light-dark(#ffffff,#1b1b21)); box-shadow: 0 22px 48px -16px #0000004d, 0 4px 12px -6px #0000002e; animation: as-dd-in .13s ease-out; }
.as-dd-menu::-webkit-scrollbar { width:8px; }
.as-dd-menu::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--dsw-alias-text-secondary, #8a8a94) 35%, transparent); border-radius:99px; }
@keyframes as-dd-in { from { opacity:0; transform: translateY(-4px) scale(.985); } to { opacity:1; transform:none; } }
.as-dd-opt { display:flex; align-items:center; gap:8px; padding:7px 10px; border-radius:8px; font-size:13px; line-height:1.45; cursor:pointer; user-select:none; color:inherit; }
.as-dd-opt + .as-dd-opt { margin-top:1px; }
.as-dd-opt:hover, .as-dd-opt.active { background: color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 11%, transparent); }
.as-dd-opt.on { color: var(--dsw-alias-accent, #4a7dff); font-weight:600; background: color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 8%, transparent); }
.as-dd-opt.danger { color:#d04545; }
.as-dd-opt.danger:hover, .as-dd-opt.danger.active { background:#d0454514; }
.as-dd-opt.off { opacity:.45; cursor:default; }
.as-dd-opt .as-dd-tick { margin-left:auto; font-size:11px; line-height:1; }
.as-dd-opt .as-dd-hint { font-size:11px; color: var(--dsw-alias-text-secondary, light-dark(#8a8a94,#7c7c88)); white-space:nowrap; }

/* ---- toasts -------------------------------------------------------- */
.as-toasts { position:fixed; z-index:10060; right:20px; bottom:20px; display:flex; flex-direction:column; gap:8px; align-items:flex-end; pointer-events:none; }
.as-toast { pointer-events:auto; display:flex; align-items:center; gap:8px; max-width:min(380px, 80vw); padding:9px 14px; border-radius:11px; font-size:12.5px; line-height:1.5; color: var(--dsw-alias-text-primary, light-dark(#1b1b1f,#e9e9ec)); background: var(--dsw-alias-bg-primary, light-dark(#ffffff,#1b1b21)); border:1px solid var(--dsw-alias-border, light-dark(#e2e2e8,#34343c)); box-shadow: 0 18px 40px -16px #0000004d, 0 2px 8px -4px #00000024; cursor:pointer; animation: as-toast-in .2s cubic-bezier(.2,.8,.3,1); }
.as-toast.ok { border-color:#1a9e5b55; }
.as-toast.ok .as-toast-ico { color:#1a9e5b; }
.as-toast.err { border-color:#d0454555; }
.as-toast.err .as-toast-ico { color:#d04545; }
.as-toast-ico { flex:0 0 auto; width:15px; height:15px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; border:1px solid currentColor; }
.as-toast.leaving { animation: as-toast-out .24s ease-in forwards; }
@keyframes as-toast-in { from { opacity:0; transform: translateY(8px) scale(.97); } to { opacity:1; transform:none; } }
@keyframes as-toast-out { to { opacity:0; transform: translateY(6px) scale(.97); } }

/* ---- small helpers ------------------------------------------------- */
.as-preset-row { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
.as-lora-head { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.as-lora-empty { font-size:12px; color: var(--dsw-alias-text-secondary, light-dark(#8a8a94,#7c7c88)); padding:2px 0 10px; }

/* ---- mode / reference sub block ------------------------------------ */
.as-sub { margin-top:12px; padding:10px 12px; border-radius:10px; border:1px dashed var(--dsw-alias-border, light-dark(#dedee6,#33333a)); background: var(--dsw-alias-bg-secondary, light-dark(#f7f7f9,#1c1c22)); }
.as-file { display:flex; align-items:center; gap:8px; min-width:0; flex:1 1 auto; }
.as-file-btn { display:inline-flex; align-items:center; gap:6px; flex:0 0 auto; padding:6px 12px; border-radius:8px; border:1px solid var(--dsw-alias-border, light-dark(#dedee6,#33333a)); background: var(--dsw-alias-bg-primary, light-dark(#ffffff,#16161a)); font-size:12px; cursor:pointer; }
.as-file-btn:hover { border-color: var(--dsw-alias-accent, #4a7dff); color: var(--dsw-alias-accent, #4a7dff); }
.as-file-btn input { display:none; }
.as-file-name { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:12px; color: var(--dsw-alias-text-secondary, light-dark(#8a8a94,#7c7c88)); }
.as-thumb { flex:0 0 auto; width:56px; height:56px; border-radius:8px; object-fit:cover; border:1px solid var(--dsw-alias-border, light-dark(#e2e2e8,#34343c)); background:#00000010; }

/* ---- engine / model popover ---------------------------------------- */
.as-chip.btn { display:inline-flex; align-items:center; gap:4px; font:inherit; cursor:pointer; background:transparent; }
.as-chip.btn:hover, .as-chip.btn.on { color: var(--dsw-alias-accent, #4a7dff); border-color: color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 55%, transparent); background: color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 10%, transparent); }
.as-chip.btn .as-dd-car { width:11px; height:11px; opacity:.7; }
.as-chip.btn.on .as-dd-car { transform: rotate(180deg); }
.as-pop { position:fixed; z-index:10065; box-sizing:border-box; display:flex; flex-direction:column; max-height:min(70vh, 560px); border-radius:12px; border:1px solid var(--dsw-alias-border, light-dark(#e2e2e8,#34343c)); background: var(--dsw-alias-bg-primary, light-dark(#ffffff,#1b1b21)); box-shadow: 0 22px 48px -16px #0000004d, 0 4px 12px -6px #0000002e; animation: as-dd-in .13s ease-out; overflow:hidden; }
.as-pop-head { display:flex; align-items:center; gap:8px; padding:10px 12px; border-bottom:1px solid var(--dsw-alias-border, light-dark(#ececf1,#2a2a31)); }
.as-pop-title { flex:1 1 auto; font-size:13px; font-weight:600; }
.as-pop-body { flex:1 1 auto; min-height:0; overflow-y:auto; padding:12px; display:flex; flex-direction:column; gap:14px; }
.as-pop-sec { display:flex; flex-direction:column; gap:8px; }
.as-pop-sec .as-label { margin-bottom:0; }
.as-pop-note { font-size:11px; line-height:1.6; color: var(--dsw-alias-text-secondary, light-dark(#8a8a94,#7c7c88)); }
.as-pop-row { display:flex; align-items:center; gap:8px; padding:7px 9px; border-radius:9px; border:1px solid transparent; cursor:pointer; }
.as-pop-row:hover { background: color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 8%, transparent); }
.as-pop-row.on { border-color: color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 45%, transparent); background: color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 10%, transparent); }
.as-pop-row-main { flex:1 1 auto; min-width:0; }
.as-pop-row-title { font-size:12.5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.as-pop-row-sub { font-size:11px; color: var(--dsw-alias-text-secondary, light-dark(#8a8a94,#7c7c88)); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

/* ---- 预设组合框 ---- */
.as-preset-field { position:relative; display:flex; flex:1 1 200px; min-width:170px; }
.as-preset-field .as-input { padding-right:32px; }
.as-preset-caret { position:absolute; right:5px; top:50%; transform:translateY(-50%); display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; padding:0; border:none; border-radius:6px; background:transparent; color:inherit; opacity:.55; cursor:pointer; }
.as-preset-caret:hover { opacity:1; background: color-mix(in srgb, var(--dsw-alias-accent, #4a7dff) 12%, transparent); }
.as-preset-field .as-dd-menu .as-x:hover { color:#d04545; }

/* ---- 环境准备 ---- */
.as-setup { margin:8px 16px 0; border:1px solid #d9a44155; border-radius:11px; background: #d9a44110; }
.as-setup-head { display:flex; align-items:center; gap:8px; padding:8px 12px; font-size:12.5px; }
.as-setup-dot { width:7px; height:7px; border-radius:50%; background:#d9a441; flex:0 0 auto; }
.as-setup-title { font-weight:600; }
.as-setup-sub { color: var(--dsw-alias-text-secondary, light-dark(#8a8a94,#7c7c88)); }
.as-setup-body { padding:0 12px 12px; display:flex; flex-direction:column; gap:8px; }
.as-setup-row { display:flex; align-items:flex-start; gap:8px; font-size:12px; }
.as-setup-flag { flex:0 0 auto; width:14px; text-align:center; font-weight:700; }
.as-setup-flag.ok { color:#1a9e5b; }
.as-setup-flag.bad { color:#d04545; }
.as-setup-row-main { flex:1 1 auto; min-width:0; }
.as-setup-row-sub { font-size:11px; color: var(--dsw-alias-text-secondary, light-dark(#8a8a94,#7c7c88)); word-break:break-all; }
.as-setup-progress { display:flex; flex-direction:column; gap:4px; }
.as-bar { height:6px; border-radius:99px; overflow:hidden; background: var(--dsw-alias-bg-secondary, light-dark(#eeeef2,#26262c)); }
.as-bar > i { display:block; height:100%; border-radius:99px; background: var(--dsw-alias-accent, #4a7dff); transition: width .3s ease; }
.as-setup-note { font-size:11px; line-height:1.6; color: var(--dsw-alias-text-secondary, light-dark(#8a8a94,#7c7c88)); }
`;

    /* ------------------------------------------------------------------ */

    function StudioIcon({ size = 16 }) {
      return h(
        'svg',
        { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' },
        h('rect', { x: 3, y: 4.5, width: 18, height: 15, rx: 2.6, stroke: 'currentColor', strokeWidth: 1.7 }),
        h('circle', { cx: 8, cy: 9.5, r: 1.5, fill: 'currentColor' }),
        h('path', {
          d: 'M3.8 17.4l4.6-4.6a1.7 1.7 0 0 1 2.4 0l3.1 3.1',
          stroke: 'currentColor',
          strokeWidth: 1.7,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
        h('path', {
          d: 'M14.4 16.9l1.4-1.4a1.7 1.7 0 0 1 2.4 0l2 2',
          stroke: 'currentColor',
          strokeWidth: 1.7,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
        h('path', { d: 'M19 2.6v3M17.5 4.1h3', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }),
      );
    }

    let createPortal = null;
    try {
      const reactDom = require('react-dom');
      if (reactDom && typeof reactDom.createPortal === 'function') createPortal = reactDom.createPortal.bind(reactDom);
    } catch {
      createPortal = null;
    }

    /**
       * Place a `position: fixed` layer over an anchor.
       *
       * A fixed layer is only viewport-relative while no ancestor establishes a
       * containing block (transform / filter / will-change / contain). DSH panels do
       * use transforms, which silently shifts `fixed` coordinates by the ancestor's
       * origin — that is why the tooltip used to land somewhere else.
       *
       * The layer is measured while still pinned to (0,0), so its own rect *is* that
       * origin; subtracting it makes the result correct with or without a transformed
       * ancestor. `current` is the offset already applied, used for re-measuring.
       */
    function placeLayer(node, anchorEl, opts = {}, current) {
      const pad = opts.pad == null ? 8 : opts.pad;
      const gap = opts.gap == null ? 8 : opts.gap;
      const vw = window.innerWidth || 1280;
      const vh = window.innerHeight || 720;
      const r = node.getBoundingClientRect();
      // Layout size (CSS px) vs visual size: the ratio is the containing block scale,
      // which is not 1 while an ancestor animates with a transform.
      const sx = node.offsetWidth > 0 && r.width > 0 ? r.width / node.offsetWidth : 1;
      const sy = node.offsetHeight > 0 && r.height > 0 ? r.height / node.offsetHeight : 1;
      const curLeft = current && typeof current.left === 'number' ? current.left : 0;
      const curTop = current && typeof current.top === 'number' ? current.top : 0;
      const ox = r.left - curLeft * sx;
      const oy = r.top - curTop * sy;
      const w = node.offsetWidth || r.width || opts.minWidth || 160;
      const h = node.offsetHeight || r.height || 60;
      const a = anchorEl.getBoundingClientRect();
      const roomAbove = a.top - gap - h;
      const roomBelow = vh - a.bottom - gap - h;
      let above;
      if (opts.preferAbove === true) above = true;
      else if (opts.preferAbove === false) above = false;
      else above = roomAbove >= 0;
      if (above && roomAbove < pad && roomBelow > roomAbove) above = false;
      if (!above && roomBelow < pad && roomAbove > roomBelow) above = true;
      let left;
      if (opts.align === 'right') left = a.right - w;
      else if (opts.align === 'left') left = a.left;
      else left = a.left + a.width / 2 - w / 2;
      left = Math.max(pad, Math.min(left, Math.max(pad, vw - w - pad)));
      const top = Math.max(pad, Math.min(above ? a.top - gap - h : a.bottom + gap, Math.max(pad, vh - h - pad)));
      const arrow = Math.round(Math.max(12, Math.min(w - 12, a.left + a.width / 2 - left)));
      return { left: Math.round((left - ox) / sx), top: Math.round((top - oy) / sy), above, arrow, width: Math.round(w) };
    }

    /**
     * "?" marker with a self-drawn tooltip: the native `title` bubble cannot be
     * themed, so the text is rendered in a floating panel next to the marker.
     */
    function Hint({ text }) {
      const [open, setOpen] = useState(false);
      const [geo, setGeo] = useState(null);
      const geoRef = useRef(null);
      const btnRef = useRef(null);
      const tipRef = useRef(null);
      const showTimer = useRef(null);
      const hideTimer = useRef(null);

      const apply = useCallback((next) => {
        geoRef.current = next;
        setGeo(next);
      }, []);

      const relayout = useCallback(() => {
        const node = tipRef.current;
        const anchor = btnRef.current;
        if (node && anchor) apply(placeLayer(node, anchor, { gap: 9 }, geoRef.current));
      }, [apply]);

      const close = useCallback(() => {
        if (showTimer.current) clearTimeout(showTimer.current);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => {
          setOpen(false);
          geoRef.current = null;
          setGeo(null);
        }, 80);
      }, []);

      const show = useCallback(() => {
        if (showTimer.current) clearTimeout(showTimer.current);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        showTimer.current = setTimeout(() => setOpen(true), 110);
      }, []);

      useEffect(
        () => () => {
          if (showTimer.current) clearTimeout(showTimer.current);
          if (hideTimer.current) clearTimeout(hideTimer.current);
        },
        [],
      );

      useLayoutEffect(() => {
        if (!open || geo) return;
        relayout();
      }, [open, geo, relayout]);

      useEffect(() => {
        if (!open) return undefined;
        const onKey = (ev) => {
          if (ev.key === 'Escape') {
            setOpen(false);
            geoRef.current = null;
            setGeo(null);
          }
        };
        document.addEventListener('keydown', onKey, true);
        window.addEventListener('scroll', relayout, true);
        window.addEventListener('resize', relayout);
        return () => {
          document.removeEventListener('keydown', onKey, true);
          window.removeEventListener('scroll', relayout, true);
          window.removeEventListener('resize', relayout);
        };
      }, [open, relayout]);

      const tip = open
        ? h(
            'div',
            {
              ref: tipRef,
              className: 'as-tip',
              role: 'tooltip',
              style: geo
                ? { left: geo.left, top: geo.top }
                : { left: 0, top: 0, visibility: 'hidden' },
            },
            text,
            h('span', {
              className: 'as-tip-arrow ' + (geo && geo.above ? 'below' : 'above'),
              style: { left: (geo ? geo.arrow : 14) - 4 },
            }),
          )
        : null;

      return h(
        'span',
        { style: { display: 'inline-flex' } },
        h(
          'button',
          {
            ref: btnRef,
            type: 'button',
            className: 'as-hint' + (open ? ' on' : ''),
            'aria-label': text,
            onPointerEnter: show,
            onPointerLeave: close,
            onFocus: show,
            onBlur: close,
            onClick: (ev) => {
              ev.preventDefault();
              if (open) {
                setOpen(false);
                geoRef.current = null;
                setGeo(null);
              } else {
                setOpen(true);
              }
            },
          },
          '?',
        ),
        tip ? (createPortal ? createPortal(tip, document.body) : tip) : null,
      );
    }

    function Pill({ on, onClick, children }) {
      return h('button', { type: 'button', className: 'as-pill' + (on ? ' on' : ''), onClick }, children);
    }

    function Chevron() {
      return h(
        'svg',
        { className: 'as-dd-car', viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': 'true' },
        h('path', {
          d: 'M4 6.5L8 10.5L12 6.5',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      );
    }

    /**
     * Styled replacement for <select>. The native popup cannot be themed, so the
     * trigger is a button and the options render in a floating panel.
     */
    function Select({ value, options, onChange, placeholder = '请选择', disabled, title, style, menuMinWidth, className }) {
      const list = useMemo(
        () => (options || []).map((o) => (typeof o === 'string' ? { value: o, label: o } : o)).filter(Boolean),
        [options],
      );
      const current = list.find((o) => o.value === value);
      const orphan = value !== undefined && value !== null && value !== '' && !current ? String(value) : '';
      const all = orphan ? [{ value, label: orphan, orphan: true }].concat(list) : list;

      const [open, setOpen] = useState(false);
      const [active, setActive] = useState(-1);
      const [geo, setGeo] = useState(null);
      const geoRef = useRef(null);
      const wrapRef = useRef(null);
      const btnRef = useRef(null);
      const menuRef = useRef(null);
      const box = useRef({ minWidth: 160, maxHeight: 304, preferAbove: false });

      const apply = useCallback((next) => {
        geoRef.current = next;
        setGeo(next);
      }, []);

      const relayout = useCallback(() => {
        const node = menuRef.current;
        const anchor = btnRef.current;
        if (node && anchor) {
          apply(placeLayer(node, anchor, { gap: 6, align: 'left', preferAbove: box.current.preferAbove }, geoRef.current));
        }
      }, [apply]);

      const measureAnchor = useCallback(() => {
        const el = btnRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 720;
        const below = vh - r.bottom - 16;
        const above = r.top - 16;
        box.current = {
          minWidth: Math.max(120, Math.round(r.width), menuMinWidth || 0),
          maxHeight: Math.round(Math.min(304, Math.max(140, Math.max(below, above)))),
          preferAbove: below < 200 && above > below,
        };
      }, [menuMinWidth]);

      const close = useCallback(() => {
        setOpen(false);
        setActive(-1);
        geoRef.current = null;
        setGeo(null);
      }, []);

      const openMenu = useCallback(() => {
        measureAnchor();
        setOpen(true);
      }, [measureAnchor]);

      useLayoutEffect(() => {
        if (!open || geo) return;
        relayout();
      }, [open, geo, relayout]);

      useEffect(() => {
        if (!open) return undefined;
        const onDown = (ev) => {
          const target = ev.target;
          if (wrapRef.current && wrapRef.current.contains(target)) return;
          if (menuRef.current && menuRef.current.contains(target)) return;
          close();
        };
        const onKey = (ev) => {
          if (ev.key === 'Escape') close();
        };
        document.addEventListener('pointerdown', onDown, true);
        document.addEventListener('keydown', onKey, true);
        window.addEventListener('resize', relayout);
        window.addEventListener('scroll', relayout, true);
        return () => {
          document.removeEventListener('pointerdown', onDown, true);
          document.removeEventListener('keydown', onKey, true);
          window.removeEventListener('resize', relayout);
          window.removeEventListener('scroll', relayout, true);
        };
      }, [open, relayout, close]);

      useEffect(() => {
        if (!open || active < 0 || !menuRef.current) return;
        const node = menuRef.current.children[active];
        if (node && typeof node.scrollIntoView === 'function') node.scrollIntoView({ block: 'nearest' });
      }, [open, active]);

      const pick = (opt) => {
        if (!opt || opt.disabled) return;
        onChange(opt.value);
        close();
      };

      const trigger = h(
        'button',
        {
          ref: btnRef,
          type: 'button',
          className: 'as-dd-btn' + (open ? ' open' : ''),
          disabled,
          title,
          'aria-haspopup': 'listbox',
          'aria-expanded': open,
          onClick: () => (open ? close() : openMenu()),
          onKeyDown: (ev) => {
            if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
              ev.preventDefault();
              if (!open) {
                openMenu();
                setActive(0);
                return;
              }
              const delta = ev.key === 'ArrowDown' ? 1 : -1;
              setActive((i) => (i < 0 ? 0 : (i + delta + all.length) % all.length));
            } else if (ev.key === 'Enter' && open && active >= 0) {
              ev.preventDefault();
              pick(all[active]);
            } else if ((ev.key === ' ' || ev.key === 'Enter') && !open) {
              ev.preventDefault();
              openMenu();
            }
          },
        },
        h('span', { className: 'as-dd-val' + (current ? '' : ' ph') }, current ? current.label : orphan || placeholder),
        h(Chevron),
      );

      const menu = open
        ? h(
            'div',
            {
              ref: menuRef,
              className: 'as-dd-menu',
              role: 'listbox',
              style: {
                minWidth: box.current.minWidth,
                maxHeight: box.current.maxHeight,
                left: geo ? geo.left : 0,
                top: geo ? geo.top : 0,
                visibility: geo ? undefined : 'hidden',
              },
            },
            all.map((o, i) =>
              h(
                'div',
                {
                  key: String(o.value),
                  role: 'option',
                  'aria-selected': o.value === value,
                  className:
                    'as-dd-opt' +
                    (o.orphan ? ' off' : '') +
                    (o.disabled ? ' off' : '') +
                    (o.value === value ? ' on' : '') +
                    (o.danger ? ' danger' : '') +
                    (i === active ? ' active' : ''),
                  onPointerEnter: () => setActive(i),
                  onClick: () => pick(o),
                },
                h('span', { className: 'as-dd-val' }, o.label),
                o.hint ? h('span', { className: 'as-dd-hint' }, o.hint) : null,
              ),
            ),
          )
        : null;

      const floating = menu ? (createPortal ? createPortal(menu, document.body) : menu) : null;

      return h(
        'div',
        { ref: wrapRef, className: 'as-dd' + (className ? ' ' + className : ''), style },
        trigger,
        floating,
      );
    }

    /**
     * 通用标签选择浮层：场景模板、画师风格都用它。
     * items: [{ key, label, hint }]，点一行回调 onPick(item) 后自动关闭。
     */
    function PickerMenu({ label, title, items, onPick, emptyText, width = 352 }) {
      const [open, setOpen] = useState(false);
      const [geo, setGeo] = useState(null);
      const [q, setQ] = useState('');
      const btnRef = useRef(null);
      const popRef = useRef(null);
      const geoRef = useRef(null);

      const relayout = useCallback(() => {
        const node = popRef.current;
        const anchor = btnRef.current;
        if (!node || !anchor) return;
        const next = placeLayer(node, anchor, { gap: 6, align: 'left', preferAbove: false }, geoRef.current);
        geoRef.current = next;
        setGeo(next);
      }, []);

      const close = useCallback(() => {
        setOpen(false);
        setGeo(null);
        geoRef.current = null;
        setQ('');
      }, []);

      useLayoutEffect(() => {
        if (!open || geo) return;
        relayout();
      }, [open, geo, relayout]);

      useEffect(() => {
        if (!open) return undefined;
        const onDown = (ev) => {
          const target = ev.target;
          if (popRef.current && popRef.current.contains(target)) return;
          if (btnRef.current && btnRef.current.contains(target)) return;
          if (target && target.closest && (target.closest('.as-dd-menu') || target.closest('.as-tip'))) return;
          close();
        };
        const onKey = (ev) => {
          if (ev.key === 'Escape') close();
        };
        document.addEventListener('pointerdown', onDown, true);
        document.addEventListener('keydown', onKey, true);
        window.addEventListener('resize', relayout);
        window.addEventListener('scroll', relayout, true);
        return () => {
          document.removeEventListener('pointerdown', onDown, true);
          document.removeEventListener('keydown', onKey, true);
          window.removeEventListener('resize', relayout);
          window.removeEventListener('scroll', relayout, true);
        };
      }, [open, close, relayout]);

      const list = items || [];
      const needle = q.trim().toLowerCase();
      const filtered = needle
        ? list.filter((it) => `${it.label} ${it.hint || ''}`.toLowerCase().includes(needle))
        : list;

      const pop = open
        ? h(
            'div',
            {
              ref: popRef,
              className: 'as-pop',
              style: { width, left: geo ? geo.left : 0, top: geo ? geo.top : 0, visibility: geo ? undefined : 'hidden' },
            },
            h(
              'div',
              { className: 'as-pop-head' },
              h('span', { className: 'as-pop-title' }, title || label),
              h('span', { className: 'as-chip' }, `${list.length} 项`),
              h('button', { type: 'button', className: 'as-x', title: '关闭', onClick: close }, '×'),
            ),
            h(
              'div',
              { className: 'as-pop-body' },
              list.length > 8
                ? h('input', {
                    className: 'as-input',
                    placeholder: '搜索…',
                    value: q,
                    onChange: (e) => setQ(e.target.value),
                  })
                : null,
              filtered.length
                ? h(
                    'div',
                    { className: 'as-pop-sec' },
                    filtered.map((it) =>
                      h(
                        'div',
                        {
                          key: it.key,
                          className: 'as-pop-row',
                          onClick: () => {
                            onPick(it);
                            close();
                          },
                        },
                        h(
                          'div',
                          { className: 'as-pop-row-main' },
                          h('div', { className: 'as-pop-row-title' }, it.label),
                          it.hint ? h('div', { className: 'as-pop-row-sub' }, it.hint) : null,
                        ),
                      ),
                    ),
                  )
                : h('div', { className: 'as-pop-note' }, emptyText || '没有匹配的条目'),
            ),
          )
        : null;

      return h(
        'span',
        { style: { display: 'inline-flex' } },
        h(
          'button',
          {
            ref: btnRef,
            type: 'button',
            className: 'as-chip btn' + (open ? ' on' : ''),
            'aria-expanded': open,
            onClick: () => (open ? close() : setOpen(true)),
          },
          label,
          h(Chevron),
        ),
        pop ? (createPortal ? createPortal(pop, document.body) : pop) : null,
      );
    }

    /**
     * 预设组合框：一个输入框 + 下拉。输入框同时承担「显示当前预设 / 直接改名」，
     * 下拉列表每行右侧的 × 直接删除预设（取代原来的「管理」下拉）。
     */
    function PresetField({ value, presets, placeholder, onInput, onPick, onDelete }) {
      const [open, setOpen] = useState(false);
      const [geo, setGeo] = useState(null);
      const [anchorW, setAnchorW] = useState(0);
      const wrapRef = useRef(null);
      const inputRef = useRef(null);
      const menuRef = useRef(null);
      const geoRef = useRef(null);

      const relayout = useCallback(() => {
        const node = menuRef.current;
        const anchor = inputRef.current;
        if (!node || !anchor) return;
        const next = placeLayer(node, anchor, { gap: 6, align: 'left', preferAbove: false }, geoRef.current);
        geoRef.current = next;
        setGeo(next);
      }, []);

      const close = useCallback(() => {
        setOpen(false);
        setGeo(null);
        geoRef.current = null;
      }, []);

      // 打开前先量输入框宽度，菜单按同一宽度渲染，保证左右边缘对齐
      const openMenu = useCallback(() => {
        const w = inputRef.current ? inputRef.current.offsetWidth : 0;
        setAnchorW(w);
        setOpen(true);
      }, []);

      useLayoutEffect(() => {
        if (!open || geo) return;
        relayout();
      }, [open, geo, relayout]);

      useEffect(() => {
        if (!open) return undefined;
        const onDown = (ev) => {
          const target = ev.target;
          if (wrapRef.current && wrapRef.current.contains(target)) return;
          if (menuRef.current && menuRef.current.contains(target)) return;
          close();
        };
        const onKey = (ev) => {
          if (ev.key === 'Escape') close();
        };
        document.addEventListener('pointerdown', onDown, true);
        document.addEventListener('keydown', onKey, true);
        window.addEventListener('resize', relayout);
        window.addEventListener('scroll', relayout, true);
        return () => {
          document.removeEventListener('pointerdown', onDown, true);
          document.removeEventListener('keydown', onKey, true);
          window.removeEventListener('resize', relayout);
          window.removeEventListener('scroll', relayout, true);
        };
      }, [open, close, relayout]);

      const menu = open
        ? h(
            'div',
            {
              ref: menuRef,
              className: 'as-dd-menu',
              role: 'listbox',
              style: {
                width: anchorW || 200,
                minWidth: anchorW || 200,
                maxWidth: anchorW || 200,
                left: geo ? geo.left : 0,
                top: geo ? geo.top : 0,
                visibility: geo ? undefined : 'hidden',
              },
            },
            presets.length
              ? presets.map((p) =>
                  h(
                    'div',
                    {
                      key: p.name,
                      className: 'as-dd-opt' + (p.name === value.trim() ? ' on' : ''),
                      role: 'option',
                      'aria-selected': p.name === value.trim(),
                      onClick: () => {
                        onPick(p.name);
                        close();
                      },
                    },
                    h('span', { className: 'as-dd-val' }, p.name),
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'as-x',
                        title: `删除「${p.name}」`,
                        'aria-label': `删除预设 ${p.name}`,
                        onClick: (ev) => {
                          ev.stopPropagation();
                          onDelete(p.name);
                        },
                      },
                      '×',
                    ),
                  ),
                )
              : h('div', { className: 'as-dd-empty' }, '还没有预设，输入名字后点保存即可新建'),
          )
        : null;

      return h(
        'div',
        { ref: wrapRef, className: 'as-preset-field' },
        h('input', {
          ref: inputRef,
          className: 'as-input',
          name: 'preset-name',
          value,
          placeholder,
          spellCheck: false,
          onFocus: openMenu,
          onClick: openMenu,
          onChange: (e) => onInput(e.target.value),
          onKeyDown: (e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              openMenu();
            }
          },
        }),
        h(
          'button',
          {
            type: 'button',
            className: 'as-preset-caret',
            'aria-label': '展开预设列表',
            title: '展开预设列表',
            onClick: () => (open ? close() : openMenu()),
          },
          h(Chevron),
        ),
        menu ? (createPortal ? createPortal(menu, document.body) : menu) : null,
      );
    }

    function useToasts() {      const [items, setItems] = useState([]);
      const seq = useRef(0);
      const timers = useRef([]);
      useEffect(
        () => () => {
          for (const t of timers.current) clearTimeout(t);
          timers.current = [];
        },
        [],
      );

      const dismiss = useCallback((id) => {
        setItems((list) => list.filter((it) => it.id !== id));
      }, []);

      const notify = useCallback((text, kind = 'ok') => {
        const id = ++seq.current;
        setItems((list) => list.concat([{ id, text: String(text), kind, leaving: false }]).slice(-4));
        const hide = setTimeout(() => {
          setItems((list) => list.map((it) => (it.id === id ? { ...it, leaving: true } : it)));
          const drop = setTimeout(() => {
            setItems((list) => list.filter((it) => it.id !== id));
          }, 260);
          timers.current.push(drop);
        }, TOAST_MS);
        timers.current.push(hide);
      }, []);

      return { items, notify, dismiss };
    }

    function ToastStack({ items, dismiss }) {
      if (!items || !items.length) return null;
      return h(
        'div',
        { className: 'as-toasts' },
        items.map((it) =>
          h(
            'div',
            {
              key: it.id,
              className: 'as-toast ' + (it.kind === 'err' ? 'err' : 'ok') + (it.leaving ? ' leaving' : ''),
              role: 'status',
              onClick: () => dismiss(it.id),
            },
            h('span', { className: 'as-toast-ico' }, it.kind === 'err' ? '!' : '✓'),
            h('span', null, it.text),
          ),
        ),
      );
    }

    function StudioPage() {
      const [view, setView] = useState('image');
      const [state, setState] = useState(null);
      const [stateError, setStateError] = useState('');
      const [jobs, setJobs] = useState([]);
      // Cached on purpose: the dropdown is filled from the last known list even
      // when ComfyUI is still booting, then refreshed in the background.
      const [loras, setLoras] = useState(loadLoraCache);
      const [loraBusy, setLoraBusy] = useState(false);
      const [controlnets, setControlnets] = useState([]);
      const [form, setForm] = useState(loadDraftForm);
      const [draftAt, setDraftAt] = useState(0);
      const { items: toasts, notify, dismiss } = useToasts();
      const [busy, setBusy] = useState(false);
      const [current, setCurrent] = useState(null);
      const [elapsed, setElapsed] = useState(0);
      const [error, setError] = useState('');
      const [note, setNote] = useState('');
      const [translating, setTranslating] = useState(false);
      const [lightbox, setLightbox] = useState(null);
      const [filter, setFilter] = useState('all');
      const [query, setQuery] = useState('');
      const [presets, setPresets] = useState(() => {
        const parsed = readStored(PRESET_KEY);
        return Array.isArray(parsed) ? parsed.filter((p) => p && typeof p.name === 'string' && p.form) : [];
      });
      const [presetName, setPresetName] = useState('');
      const [selectedPreset, setSelectedPreset] = useState('');
      const [library, setLibrary] = useState(null);

      /* ---- 环境准备（ComfyUI / 模型） ---- */
      const [setupPlan, setSetupPlan] = useState(null);
      const [setupDl, setSetupDl] = useState(null);
      const [setupOpen, setSetupOpen] = useState(false);
      const [setupBusy, setSetupBusy] = useState(false);

      const patch = (p) => setForm((f) => ({ ...f, ...p }));
      const defaultsApplied = useRef(false);

      const readFileAsDataURL = (file) =>
        new Promise((resolve, reject) => {
          const fr = new FileReader();
          fr.onload = () => resolve(fr.result);
          fr.onerror = () => reject(new Error('读取文件失败'));
          fr.readAsDataURL(file);
        });

      const buildPayload = (f) => ({
        prompt: f.prompt,
        negative: f.negative,
        width: f.width,
        height: f.height,
        steps: f.steps,
        cfg: f.cfg,
        sampler: f.sampler,
        scheduler: f.scheduler,
        seed: f.seed,
        batch: f.batch,
        loras: f.loras,
        mode: f.mode,
        denoise: f.denoise,
        ref_job_id: (f.mode === 'img2img' || f.mode === 'inpaint') && f.refSource === 'gallery' ? f.refJobId : '',
        ref_data: (f.mode === 'img2img' || f.mode === 'inpaint') && f.refSource === 'upload' ? f.refData : '',
        mask_data: f.mode === 'inpaint' ? f.maskData : '',
        control_job_id: f.mode === 'controlnet' && f.controlSource === 'gallery' ? f.controlJobId : '',
        control_data: f.mode === 'controlnet' && f.controlSource === 'upload' ? f.controlData : '',
        controlnet: f.controlNet,
        control_strength: f.controlStrength,
        grow_mask_by: f.growMaskBy,
      });

      // 场景模板 / 画师 / 负面标签是一次性静态数据，进页面拉一次即可。
      useEffect(() => {
        let stopped = false;
        api('/library')
          .then((r) => {
            if (!stopped) setLibrary(r && Array.isArray(r.presets) ? r : null);
          })
          .catch(() => {
            if (!stopped) setLibrary(null);
          });
        return () => {
          stopped = true;
        };
      }, []);

      /* ---------------------- 环境准备（ComfyUI / 模型） ---------------------- */

      const refreshSetup = useCallback(async () => {
        try {
          setSetupPlan(await api('/setup'));
        } catch {
          setSetupPlan(null);
        }
      }, []);

      useEffect(() => {
        refreshSetup();
      }, [refreshSetup]);

      useEffect(() => {
        if (state?.reachable) refreshSetup();
      }, [state?.reachable, refreshSetup]);

      const pollSetup = useCallback(async () => {
        try {
          const s = await api('/setup?action=progress');
          setSetupDl(s);
          if (s.status === 'done') {
            notify('模型下载完成，可以开始生图了');
            refreshSetup();
          } else if (s.status === 'error') {
            notify(`下载失败：${s.error || '未知原因'}`, 'err');
          }
        } catch {
          /* 轮询失败不打扰用户 */
        }
      }, [notify, refreshSetup]);

      useEffect(() => {
        if (!setupDl || setupDl.status !== 'running') return undefined;
        const timer = setInterval(pollSetup, 1200);
        return () => clearInterval(timer);
      }, [setupDl && setupDl.status, pollSetup]);

      const startModelDownload = async () => {
        setSetupBusy(true);
        try {
          setSetupDl(await api('/setup', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ action: 'download' }),
          }));
          notify('开始下载模型，完成后会自动刷新状态');
        } catch (e) {
          notify(`启动下载失败：${e instanceof Error ? e.message : String(e)}`, 'err');
        } finally {
          setSetupBusy(false);
        }
      };

      const cancelModelDownload = async () => {
        try {
          setSetupDl(await api('/setup', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ action: 'cancel' }),
          }));
          notify('已取消下载');
        } catch {
          /* 忽略 */
        }
      };

      const copySetupCommand = () => {
        const cmd = 'powershell -ExecutionPolicy Bypass -File .\\scripts\\install-comfyui.ps1 -Port 8190';
        const done = () => notify('命令已复制，在插件目录里执行即可');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(cmd).then(done).catch(() => notify(cmd));
        } else {
          notify(cmd);
        }
      };

      const renderSetup = () => {
        if (!setupPlan || setupPlan.ready) return null;
        const missing = setupPlan.steps.filter((step) => !step.ok);
        const dl = setupDl;
        const running = dl && dl.status === 'running';
        const pct = dl ? Math.max(0, Math.min(100, dl.percent || 0)) : 0;
        return h(
          'div',
          { className: 'as-setup' },
          h(
            'div',
            { className: 'as-setup-head' },
            h('span', { className: 'as-setup-dot' }),
            h('span', { className: 'as-setup-title' }, '环境未就绪'),
            h('span', { className: 'as-setup-sub' }, missing.map((step) => step.label).join(' · ')),
            h('span', { className: 'as-spacer' }),
            h(
              'button',
              { type: 'button', className: 'as-btn ghost sm', onClick: () => setSetupOpen((v) => !v) },
              setupOpen ? '收起' : '准备环境',
            ),
          ),
          setupOpen
            ? h(
                'div',
                { className: 'as-setup-body' },
                setupPlan.steps.map((step) =>
                  h(
                    'div',
                    { key: step.id, className: 'as-setup-row' },
                    h('span', { className: 'as-setup-flag' + (step.ok ? ' ok' : ' bad') }, step.ok ? '✓' : '!'),
                    h('div', { className: 'as-setup-row-main' },
                      h('div', null, step.label),
                      h('div', { className: 'as-setup-row-sub' }, step.detail),
                    ),
                  ),
                ),
                running || (dl && dl.status !== 'idle' && dl.status !== 'done')
                  ? h(
                      'div',
                      { className: 'as-setup-progress' },
                      h('div', { className: 'as-bar' }, h('i', { style: { width: `${pct}%` } })),
                      h(
                        'div',
                        { className: 'as-setup-row-sub' },
                        `${pct.toFixed(1)}% · ${humanBytesOf(dl.received)} / ${humanBytesOf(dl.total)} · ${humanBytesOf(dl.speed)}/s` +
                          (dl.eta > 0 ? ` · 剩余 ${Math.ceil(dl.eta / 60)} 分钟` : ''),
                      ),
                    )
                  : null,
                h(
                  'div',
                  { className: 'as-row', style: { gap: 8, flexWrap: 'wrap', marginTop: 4 } },
                  running
                    ? h('button', { type: 'button', className: 'as-btn ghost sm', onClick: cancelModelDownload }, '取消下载')
                    : h(
                        'button',
                        {
                          type: 'button',
                          className: 'as-btn sm',
                          disabled: setupBusy,
                          onClick: startModelDownload,
                        },
                        setupBusy ? '准备中…' : '下载模型到 ComfyUI',
                      ),
                  h('button', { type: 'button', className: 'as-btn ghost sm', onClick: copySetupCommand },
                    '复制 ComfyUI 安装命令'),
                  h('button', { type: 'button', className: 'as-btn ghost sm', onClick: () => { refreshSetup(); refreshState(); } },
                    '重新检测'),
                ),
                h(
                  'div',
                  { className: 'as-setup-note' },
                  `模型会下载到 ${setupPlan.setup.checkpointsDir}；约 6.9 GB，支持断点续传，官方源失败会自动换镜像。` +
                    ` 权重许可：${setupPlan.license.name}（下载即表示同意）。`,
                ),
              )
            : null,
        );
      };

      /** 往提示词尾部追加标签（去重、逗号分隔），用于场景模板和画师风格。 */
      const appendTags = (text, message) => {
        const incoming = String(text || '')
          .split(/[,，]/)
          .map((s) => s.trim())
          .filter(Boolean);
        if (!incoming.length) {
          notify('没有可追加的标签', 'err');
          return;
        }
        const parts = String(form.prompt || '')
          .split(/[,，]/)
          .map((s) => s.trim())
          .filter(Boolean);
        const seen = new Set(parts.map((p) => p.toLowerCase()));
        let added = 0;
        for (const tag of incoming) {
          const key = tag.toLowerCase();
          if (seen.has(key)) continue;
          seen.add(key);
          parts.push(tag);
          added += 1;
        }
        if (!added) {
          notify('这些标签已经在提示词里了');
          return;
        }
        patch({ prompt: parts.join(', ') });
        notify(message || `已追加 ${added} 个标签`);
      };

      const loadLoras = useCallback(async (announce) => {        setLoraBusy(true);
        try {
          const r = await api('/loras');
          const names = Array.isArray(r.loras) ? r.loras.filter((n) => typeof n === 'string' && n.trim()) : [];
          if (names.length) {
            setLoras(names);
            writeStored(LORA_CACHE_KEY, names.slice(0, LORA_CACHE_MAX));
          }
          if (announce) {
            notify(names.length ? `LoRA 列表已刷新，共 ${names.length} 个` : 'ComfyUI 里还没读到 LoRA 文件');
          }
          return names;
        } catch (e) {
          if (announce) notify('读取 LoRA 列表失败：' + (e instanceof Error ? e.message : String(e)), 'err');
          return [];
        } finally {
          setLoraBusy(false);
        }
      }, [notify]);

      const loadControlnets = useCallback(async () => {
        try {
          const r = await api('/controlnets');
          setControlnets(Array.isArray(r.controlnets) ? r.controlnets : []);
        } catch {
          /* keep previous */
        }
      }, []);

      const refreshState = useCallback(async () => {
        try {
          const s = await api('/state');
          setState(s);
          setStateError('');
          if (!defaultsApplied.current && Array.isArray(s.defaultLoras) && s.defaultLoras.length) {
            defaultsApplied.current = true;
            setForm((f) => (f.loras && f.loras.length ? f : { ...f, loras: s.defaultLoras }));
          }
          if (s.reachable) loadControlnets();
        } catch (e) {
          setStateError(e instanceof Error ? e.message : String(e));
        }
      }, [loadControlnets]);

      const refreshJobs = useCallback(async () => {
        try {
          const r = await api('/jobs?limit=120');
          setJobs(r.jobs || []);
        } catch {
          /* keep previous */
        }
      }, []);

      useEffect(() => {
        refreshState();
        refreshJobs();
        const t = setInterval(refreshState, 20000);
        return () => clearInterval(t);
      }, [refreshState, refreshJobs]);

      // LoRA list: keep retrying while ComfyUI is cold-starting, so the picker is
      // populated without any manual action after a dsh restart.
      useEffect(() => {
        let stopped = false;
        let timer = null;
        let tries = 0;
        const attempt = async () => {
          if (stopped) return;
          const names = await loadLoras(false);
          tries += 1;
          if (!stopped && !names.length && tries < 30) timer = setTimeout(attempt, 5000);
        };
        attempt();
        return () => {
          stopped = true;
          if (timer) clearTimeout(timer);
        };
      }, [loadLoras]);

      useEffect(() => {
        if (state?.reachable) loadLoras(false);
      }, [state?.reachable, loadLoras]);

      // Draft autosave: parameters and the LoRA stack survive a restart.
      useEffect(() => {
        const timer = setTimeout(() => {
          if (writeStored(DRAFT_KEY, cleanForm(form))) setDraftAt(Date.now());
        }, 400);
        return () => clearTimeout(timer);
      }, [form]);

      useEffect(() => {
        if (!busy || !current) return undefined;
        const started = Date.now();
        const timer = setInterval(() => setElapsed(Math.round((Date.now() - started) / 1000)), 1000);
        let cancelled = false;
        const poll = async () => {
          try {
            const r = await api('/job?id=' + encodeURIComponent(current.id));
            if (cancelled) return;
            setCurrent(r.job);
            if (r.job.status !== 'queued' && r.job.status !== 'running') {
              setBusy(false);
              if (r.job.status === 'failed') setError(r.job.error || '生成失败');
              else if (r.job.status === 'cancelled') setNote('已取消本次生成');
              refreshJobs();
              return;
            }
            setTimeout(poll, 1500);
          } catch (e) {
            if (!cancelled) {
              setBusy(false);
              setError(e instanceof Error ? e.message : String(e));
            }
          }
        };
        setTimeout(poll, 1200);
        return () => {
          cancelled = true;
          clearInterval(timer);
        };
      }, [busy, current && current.id, refreshJobs]);

      /**
       * 中文描述 → danbooru 英文标签。
       * 引擎可选：auto（词典够干净就用词典，切不干净交给模型）/ dict（只用词典）/ llm（只用模型）。
       * 返回转换后的文本；拿不到可用的结果时返回空串，并且一定给出可见反馈。
       */
      const toTags = async (input) => {
        const source = (typeof input === 'string' ? input : form.prompt).trim();
        if (!source) {
          notify('先写一段画面描述，再点「中文 → 标签」', 'err');
          setNote('');
          return '';
        }
        if (!/[\u4e00-\u9fff]/.test(source)) {
          notify('这段已经是英文标签了，不需要转换');
          setNote('');
          return source;
        }
        setTranslating(true);
        try {
          const r = await api('/translate', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              text: source,
              engine: 'auto',
              mode: form.mode,
              appearance: Boolean(form.tagAppearance),
            }),
          });
          if (!r.text) {
            notify('这段没转出标签，换个说法或直接写英文标签', 'err');
            setNote('没有识别到可转换的标签，试试「金发, 校服, 教室」这类词，或者直接写英文标签');
            return '';
          }
          patch({ prompt: r.text });
          const via = r.engine === 'llm' ? `模型 ${r.model || ''}`.trim() : '内置词典';
          const extra = r.engine === 'llm'
            ? `，${r.matched} 个标签${r.cached ? '（缓存）' : ''}`
            : `，${r.matched} 个词组${r.dropped ? `，忽略 ${r.dropped} 个未收录字` : ''}`;
          const fallback = r.llmError ? `（模型转换失败，已退回词典：${r.llmError}）` : '';
          setNote(`已用${via}转成标签${extra}：${r.text}${fallback}`);
          notify(`已转换 ${r.matched} 个标签${r.engine === 'llm' ? '（模型）' : ''}${r.dropped ? `，忽略 ${r.dropped} 个字` : ''}`);
          return r.text;
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          setNote(message);
          notify(`转换失败：${message}`, 'err');
          return '';
        } finally {
          setTranslating(false);
        }
      };

      const generate = async () => {
        if (!form.prompt.trim()) {
          setError('先写画面描述');
          notify('先写画面描述，再生成', 'err');
          return;
        }
        const missing = missingInput();
        if (missing) {
          setError(missing);
          notify(missing, 'err');
          return;
        }
        setError('');
        setBusy(true);
        setElapsed(0);
        let prompt = form.prompt;
        if (/[\u4e00-\u9fff]/.test(prompt)) {
          const converted = await toTags(prompt);
          if (converted) {
            prompt = converted;
          } else if (form.mode === 'txt2img') {
            // 文生图完全靠提示词，转不出来就别浪费一次排队。
            setBusy(false);
            setError('中文没转成标签：换个说法，或直接写英文标签');
            return;
          } else {
            // 图生图/蒙版重绘/ControlNet 里画面主要由参考图决定，退回原文继续，别把用户卡住。
            notify('标签没转干净，这次按原文提交（参考图仍会生效）', 'err');
          }
        }
        try {
          const r = await api('/generate', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(buildPayload({ ...form, prompt })),
          });
          setCurrent(r.job);
          if (!form.lockSeed) patch({ seed: Math.floor(Math.random() * 2 ** 31) });
        } catch (e) {
          setBusy(false);
          setError(e instanceof Error ? e.message : String(e));
        }
      };

      const cancel = async () => {
        if (!current) return;
        try {
          await api('/cancel', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id: current.id }),
          });
          setBusy(false);
          setNote('已取消本次生成');
          refreshJobs();
        } catch (e) {
          setError(e instanceof Error ? e.message : String(e));
        }
      };

      const act = async (id, action) => {
        try {
          if (action === 'delete') {
            if (!window.confirm('彻底删除这张图？文件会从磁盘移除，无法恢复。')) return;
            await api('/action', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ id, action: 'delete' }),
            });
            if (current && current.id === id) setCurrent(null);
          } else {
            await api('/action', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ id, action }),
            });
          }
          refreshJobs();
        } catch (e) {
          setError(e instanceof Error ? e.message : String(e));
        }
      };

      const reuse = (job) => {
        patch({
          prompt: job.prompt || '',
          negative: job.negative && job.negative !== state?.defaultNegative ? job.negative : '',
          width: job.width,
          height: job.height,
          steps: job.steps,
          cfg: job.cfg,
          sampler: job.sampler,
          scheduler: job.scheduler,
          seed: job.seed,
          lockSeed: true,
          batch: job.batch || 1,
          loras: (job.loras || []).map((l) => ({ name: l.name, weight: l.weight, mode: l.mode === 'both' ? 'both' : 'model' })),
          mode: 'txt2img',
          denoise: 0.6,
          refSource: 'gallery',
          refJobId: '',
          refData: '',
          maskData: '',
          controlSource: 'gallery',
          controlJobId: '',
          controlData: '',
        });
        setSelectedPreset('');
        setView('image');
      };

      const persistPresets = (list) => {
        if (writeStored(PRESET_KEY, list)) return true;
        notify('保存失败：浏览器存储空间可能已满，可先清空部分预设后重试。', 'err');
        return false;
      };

      /**
       * 保存预设的语义：
       *   名称框有内容 → 以它为名（同名即覆盖，否则新建）
       *   名称框为空、但下拉里选中了某个预设 → 覆盖那个预设（改了 LoRA 也能存回去）
       *   都没有 → 自动起名「预设 N」
       */
      const savePreset = () => {
        const typed = presetName.trim();
        const target = typed || selectedPreset || `预设 ${presets.length + 1}`;
        const existed = presets.some((p) => p.name === target);
        const next = presets
          .filter((p) => p.name !== target)
          .concat([{ name: target, form: cleanForm(form), savedAt: Date.now() }]);
        setPresets(next);
        if (persistPresets(next)) {
          setPresetName(target);
          setSelectedPreset(target);
          notify(existed ? `已更新预设「${target}」` : `已保存预设「${target}」`);
        }
      };

      /** 保存按钮的文案跟着语义走，避免"点了才发现存成了新预设"。 */
      const presetSaveLabel = (() => {
        const typed = presetName.trim();
        if (typed && presets.some((p) => p.name === typed)) return `更新「${typed}」`;
        if (typed) return '保存为新预设';
        if (selectedPreset) return `更新「${selectedPreset}」`;
        return '保存预设';
      })();

      const applyPreset = (name) => {
        const found = presets.find((p) => p.name === name);
        if (!found || !found.form) return;
        patch({ ...EMPTY_FORM, ...cleanForm(found.form) });
        setPresetName(name);
      };

      const deletePreset = (name) => {
        const next = presets.filter((p) => p.name !== name);
        setPresets(next);
        if (selectedPreset === name) setSelectedPreset('');
        if (presetName.trim() === name) setPresetName('');
        if (persistPresets(next)) notify(`已删除预设「${name}」`);
      };

      const clearPresets = () => {
        if (!presets.length) return;
        setPresets([]);
        setSelectedPreset('');
        try { localStorage.removeItem(PRESET_KEY); } catch {}
        notify('已清空全部预设');
      };

      const resetDefaults = () => {
        patch({
          ...EMPTY_FORM,
          seed: Math.floor(Math.random() * 2 ** 31),
          loras: Array.isArray(state?.defaultLoras) ? state.defaultLoras : [],
        });
        setSelectedPreset('');
        notify(Array.isArray(state?.defaultLoras) && state.defaultLoras.length ? '已恢复默认参数，保留默认 LoRA' : '已恢复默认参数，LoRA 与参考图已清除');
      };

      const addLora = () => {
        if (form.loras.length >= 8) {
          notify('最多只能叠加 8 个 LoRA', 'err');
          return;
        }
        if (!loras.length) {
          notify('还没读到 LoRA 文件：等 ComfyUI 启动后点「刷新列表」', 'err');
          return;
        }
        const used = new Set(form.loras.map((l) => l.name));
        const name = loras.find((n) => !used.has(n)) || loras[0];
        patch({ loras: form.loras.concat([{ name, weight: 1, mode: 'model' }]) });
      };

      const reachable = state?.reachable;
      const visible = useMemo(() => {
        let list = jobs.filter((j) => j.status === 'complete');
        if (filter === 'favorite') list = list.filter((j) => j.favorite);
        else if (filter === 'archived') list = list.filter((j) => j.archived);
        else list = list.filter((j) => !j.archived);
        if (query.trim()) {
          const q = query.trim().toLowerCase();
          list = list.filter((j) => String(j.prompt || '').toLowerCase().includes(q));
        }
        return list;
      }, [jobs, filter, query]);

      const resultJob = current && (current.status === 'complete' || current.status === 'failed') ? current : null;

      const progressPct =
        current && current.progress && current.progress.max > 0
          ? Math.min(100, Math.round((current.progress.value / current.progress.max) * 100))
          : null;

      /* --------------------------- mode controls ------------------------ */

      const modeLabel = (form && MODE_LABEL[form.mode]) || '文生图';
      const latentFromImage = form.mode === 'img2img' || form.mode === 'inpaint';
      const galleryJobs = jobs.filter((j) => j.status === 'complete');

      const previewOf = (src) => (src ? h('img', { className: 'as-thumb', src, alt: '参考图预览' }) : null);

      const refPreview =
        form.refSource === 'gallery' && form.refJobId
          ? `${API}/image?id=${form.refJobId}&n=0`
          : form.refData || '';

      const controlPreview =
        form.controlSource === 'gallery' && form.controlJobId
          ? `${API}/image?id=${form.controlJobId}&n=0`
          : form.controlData || '';

      const fileField = (data, onPick, onClear, emptyText) =>
        h(
          'div',
          { className: 'as-file' },
          h(
            'label',
            { className: 'as-file-btn' },
            h('input', {
              type: 'file',
              accept: 'image/png,image/jpeg,image/webp',
              onChange: (e) => {
                const f = e.target.files && e.target.files[0];
                if (!f) return;
                readFileAsDataURL(f)
                  .then((d) => onPick(d))
                  .catch((err) => {
                    setError(err.message);
                    notify(`读取图片失败：${err.message}`, 'err');
                  });
              },
            }),
            data ? '重新选择' : '选择文件',
          ),
          h('span', { className: 'as-file-name' }, data ? '已选择图片' : emptyText || '未选择图片'),
          data
            ? h('button', { type: 'button', className: 'as-x', title: '清除', onClick: onClear }, '×')
            : null,
        );

      const denoiseRow = () =>
        h(
          'div',
          { style: { marginTop: 10, display: 'flex', gap: 10, alignItems: 'center' } },
          form.mode === 'img2img' || form.mode === 'inpaint' ? previewOf(refPreview) : null,
          h(
            'div',
            { className: 'as-grow' },
            h('div', { className: 'as-label' }, '降噪强度 ', h(Hint, { text: '0.1 接近原图，1 完全重绘。默认 0.6。' })),
            h('input', {
              className: 'as-input',
              type: 'range',
              min: 0.05,
              max: 1,
              step: 0.05,
              value: form.denoise,
              onChange: (e) => patch({ denoise: Number(e.target.value) }),
            }),
            h('div', { style: { fontSize: 11, marginTop: 2, color: 'var(--dsw-alias-text-secondary, inherit)' } }, `当前 ${form.denoise}`),
          ),
        );

      const refControls = () =>
        h(
          'div',
          { className: 'as-sub' },
          h('div', { className: 'as-label' }, '参考图 ', h(Hint, { text: '图生图/蒙版重绘的底图：从图库挑一张，或上传本地图片。上传的图只用于本次生成，不会写进预设。' })),
          h(
            'div',
            { className: 'as-row' },
            h(Select, {
              value: form.refSource,
              style: { flex: '0 1 112px', width: 'auto' },
              options: [{ value: 'gallery', label: '从图库选' }, { value: 'upload', label: '上传图片' }],
              onChange: (v) => patch({ refSource: v }),
            }),
            form.refSource === 'gallery'
              ? h(Select, {
                  value: form.refJobId,
                  placeholder: galleryJobs.length ? '选择一张已生成的图…' : '图库里还没有完成的图',
                  style: { flex: '1 1 0', width: 'auto' },
                  options: galleryJobs.map((j) => ({
                    value: j.id,
                    label: `${String(j.prompt).slice(0, 36)} (${j.id.slice(0, 6)})`,
                  })),
                  onChange: (v) => patch({ refJobId: v }),
                })
              : fileField(form.refData, (d) => patch({ refData: d }), () => patch({ refData: '' }), '未选择图片'),
          ),
          denoiseRow(),
        );

      const maskControls = () =>
        h(
          'div',
          { className: 'as-sub' },
          h('div', { className: 'as-label' }, '蒙版图 ', h(Hint, { text: '和参考图同尺寸的黑白图：白色区域会被重绘，黑色区域保留。' })),
          h(
            'div',
            { className: 'as-row' },
            fileField(form.maskData, (d) => patch({ maskData: d }), () => patch({ maskData: '' }), '未选择蒙版'),
            previewOf(form.maskData),
          ),
          h('div', { style: { height: 10 } }),
          h('div', { className: 'as-label' }, '蒙版外扩（像素）'),
          h('input', {
            className: 'as-input',
            type: 'number',
            min: 0,
            max: 256,
            step: 1,
            value: form.growMaskBy,
            onChange: (e) => patch({ growMaskBy: Number(e.target.value) || 0 }),
          }),
        );

      const controlControls = () =>
        h(
          'div',
          { className: 'as-sub' },
          h('div', { className: 'as-label' }, 'ControlNet 模型'),
          h(Select, {
            value: form.controlNet,
            placeholder: controlnets.length ? '选择模型…' : '未发现 ControlNet 模型',
            options: controlnets.map((n) => ({ value: n, label: n })),
            onChange: (v) => patch({ controlNet: v }),
          }),
          h('div', { style: { height: 10 } }),
          h('div', { className: 'as-label' }, '控制图 ', h(Hint, { text: '用来约束构图的图（线稿、姿态、深度等），配合所选的 ControlNet 模型使用。' })),
          h(
            'div',
            { className: 'as-row' },
            h(Select, {
              value: form.controlSource,
              style: { flex: '0 1 112px', width: 'auto' },
              options: [{ value: 'gallery', label: '从图库选' }, { value: 'upload', label: '上传图片' }],
              onChange: (v) => patch({ controlSource: v }),
            }),
            form.controlSource === 'gallery'
              ? h(Select, {
                  value: form.controlJobId,
                  placeholder: galleryJobs.length ? '选择一张已生成的图…' : '图库里还没有完成的图',
                  style: { flex: '1 1 0', width: 'auto' },
                  options: galleryJobs.map((j) => ({
                    value: j.id,
                    label: `${String(j.prompt).slice(0, 36)} (${j.id.slice(0, 6)})`,
                  })),
                  onChange: (v) => patch({ controlJobId: v }),
                })
              : fileField(form.controlData, (d) => patch({ controlData: d }), () => patch({ controlData: '' }), '未选择控制图'),
          ),
          h(
            'div',
            { style: { marginTop: 10, display: 'flex', gap: 10, alignItems: 'center' } },
            previewOf(controlPreview),
            h(
              'div',
              { className: 'as-grow' },
              h('div', { className: 'as-label' }, '控制强度 ', h(Hint, { text: '0 关闭，1 默认，2 加强。' })),
              h('input', {
                className: 'as-input',
                type: 'range',
                min: 0,
                max: 2,
                step: 0.05,
                value: form.controlStrength,
                onChange: (e) => patch({ controlStrength: Number(e.target.value) }),
              }),
              h('div', { style: { fontSize: 11, marginTop: 2, color: 'var(--dsw-alias-text-secondary, inherit)' } }, `当前 ${form.controlStrength}`),
            ),
          ),
        );

      const modeBody = () =>
        h(
          'div',
          null,
          h(
            'div',
            { className: 'as-chips', style: { marginTop: 8 } },
            MODE_OPTIONS.map(([value, label]) =>
              h(Pill, { key: value, on: form.mode === value, onClick: () => patch({ mode: value }) }, label),
            ),
          ),
          h(
            'div',
            { style: { fontSize: 11, marginTop: 8, color: 'var(--dsw-alias-text-secondary, inherit)' } },
            MODE_HINT[form.mode] || '',
          ),
          latentFromImage ? refControls() : null,
          form.mode === 'inpaint' ? maskControls() : null,
          form.mode === 'controlnet' ? controlControls() : null,
        );

      /** Pre-flight so a missing reference/mask/model never reaches the queue. */
      const missingInput = () => {
        const hasRef = form.refSource === 'gallery' ? Boolean(form.refJobId) : Boolean(form.refData);
        const hasControl = form.controlSource === 'gallery' ? Boolean(form.controlJobId) : Boolean(form.controlData);
        if (latentFromImage && !hasRef) return '先选一张参考图';
        if (form.mode === 'inpaint' && !form.maskData) return '再上传一张蒙版图（白色区域会被重绘）';
        if (form.mode === 'controlnet' && !form.controlNet) return '先选一个 ControlNet 模型';
        if (form.mode === 'controlnet' && !hasControl) return '再选一张控制图';
        return '';
      };

      /* ----------------------------- views ----------------------------- */

      const renderImage = () =>
        h(
          'div',
          { className: 'as-create' },
          h(
            'div',
            { className: 'as-preview' },
            h(
              'div',
              { className: 'as-preview-head' },
              h('span', null, '结果预览'),
              h('span', { className: 'as-spacer' }),
              h('span', null, busy ? `生成中 ${elapsed}s` : resultJob ? `${resultJob.width}×${resultJob.height} · ${resultJob.steps} 步 · seed ${resultJob.seed}` : '生成结果会显示在这里'),
            ),
            h(
              'div',
              { className: 'as-preview-body' },
              busy
                ? h(
                    'div',
                    { className: 'as-empty' },
                    h('div', null, '正在生成…'),
                    h('div', null, `${elapsed} 秒${progressPct != null ? ` · ${progressPct}%` : ''}`),
                    h('div', { className: 'as-progress', style: { width: 220, margin: '10px auto 0' } },
                      progressPct != null ? h('i', { style: { width: `${progressPct}%`, animation: 'none' } }) : h('i'),
                    ),
                  )
                : resultJob && resultJob.status === 'complete'
                  ? h(
                      'div',
                      { style: { display: 'grid', gap: 10, gridTemplateColumns: resultJob.batch > 1 ? '1fr 1fr' : '1fr', width: '100%', height: '100%', alignItems: 'center', justifyItems: 'center' } },
                      Array.from({ length: resultJob.batch || 1 }).map((_, i) =>
                        h('img', {
                          key: i,
                          src: `${API}/image?id=${resultJob.id}&n=${i}&v=${resultJob.finishedAt || 0}`,
                          alt: `结果 ${i + 1}`,
                          style: { maxHeight: resultJob.batch > 1 ? '46%' : '100%' },
                          onClick: () => setLightbox(`${API}/image?id=${resultJob.id}&n=${i}&v=${resultJob.finishedAt || 0}`),
                        }),
                      ),
                    )
                  : resultJob && resultJob.status === 'failed'
                    ? h('div', { className: 'as-empty' }, '生成失败', h('div', { className: 'as-err' }, resultJob.error || ''))
                    : h('div', { className: 'as-empty' },
                        form.mode === 'txt2img' ? '先描述画面，再生成' : `${modeLabel}：${MODE_HINT[form.mode] || ''}`,
                        h('div', null, form.mode === 'txt2img' ? '完成后可在这里调整参数、继续创作' : '选好参考图后点下面的按钮'),
                      ),
            ),
          ),
          h(
            'aside',
            { className: 'as-panel' },
            h(
              'div',
              { className: 'as-panel-scroll' },
              h(
                'div',
                null,
                h(
                  'div',
                  { className: 'as-label', style: { justifyContent: 'space-between' } },
                  h('span', null, '画面描述'),
                  h(
                    'div',
                    { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                    h(Hint, {
                      text:
                        '中文先过离线词库（3700+ 映射、507 角色）；词库切不干净的句子才会交给 DSH 模型。英文标签原样保留，已经全是英文时不会调用模型。',
                    }),
                    h(
                      'button',
                      { type: 'button', className: 'as-btn ghost sm', disabled: translating, onClick: () => toTags() },
                      translating ? '转换中…' : '中文 → 标签',
                    ),
                  ),
                ),
                state && state.llmReady === false
                  ? h('div', { className: 'as-chip bad', style: { marginTop: 6 } }, '本机模型服务未挂载，只能用离线词典')
                  : null,
                form.mode === 'txt2img'
                  ? null
                  : h(
                      'div',
                      { className: 'as-warn', style: { marginTop: 6 } },
                      TAGS_MODE_HINT[form.mode] || '',
                    ),
                h('textarea', {
                  className: 'as-ta',
                  rows: 6,
                  value: form.prompt,
                  placeholder: '中文也行：金发, 蓝瞳, 校服, 樱花, 半身, 微笑。或直接写英文标签：1girl, blonde hair, blue eyes, school uniform, cherry blossoms, looking at viewer, masterpiece, high score, great score, absurdres',
                  onChange: (e) => { patch({ prompt: e.target.value }); if (note) setNote(''); },
                }),
                note ? h('div', { className: 'as-warn', style: { marginTop: 8 } }, note) : null,
                h(
                  'div',
                  { className: 'as-row', style: { marginTop: 8, gap: 8, flexWrap: 'wrap' } },
                  h(PickerMenu, {
                    label: '场景模板',
                    title: '场景模板（追加标签）',
                    items: (library?.presets || []).map((p) => ({ key: p.name, label: p.name, hint: p.desc })),
                    emptyText: '模板数据还没加载出来，稍后再点',
                    onPick: (item) => {
                      const found = (library?.presets || []).find((p) => p.name === item.key);
                      if (found) appendTags(found.tags.join(', '), `已套用「${found.name}」`);
                    },
                  }),
                  h(PickerMenu, {
                    label: '画师风格',
                    title: '画师 / 风格（追加标签）',
                    items: (library?.artists || []).map((a) => ({ key: a.en, label: a.en, hint: a.zh })),
                    emptyText: '画师数据还没加载出来，稍后再点',
                    onPick: (item) => appendTags(item.key, `已追加画师 ${item.key}`),
                  }),
                  h(
                    'label',
                    {
                      className: 'as-row',
                      style: { gap: 6, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' },
                      title: '词库里 507 个角色：勾上后命中的角色会自动补发色/瞳色/服装等外观标签',
                    },
                    h('input', {
                      type: 'checkbox',
                      name: 'tag-appearance',
                      checked: Boolean(form.tagAppearance),
                      onChange: (e) => patch({ tagAppearance: e.target.checked }),
                    }),
                    '角色自动补外观',
                    h(Hint, {
                      text: '词库里有 507 个角色（含作品名）。勾上后，命中的角色会自动追加它的发色/瞳色/服装等外观标签；不勾只输出角色标签本身。',
                    }),
                  ),
                  library ? null : h('span', { className: 'as-chip' }, '标签库加载中…'),
                ),
              ),
              h(
                'div',
                null,
                h('div', { className: 'as-label' }, '画面比例'),
                h(
                  'div',
                  { className: 'as-chips' },
                  (state?.ratios || RATIOS).map((r) =>
                    h(
                      Pill,
                      {
                        key: r.key,
                        on: form.width === r.width && form.height === r.height,
                        onClick: () => patch({ width: r.width, height: r.height }),
                      },
                      r.key,
                    ),
                  ),
                ),
              ),
              h(
                'div',
                null,
                h(
                  'div',
                  { className: 'as-label', style: { justifyContent: 'space-between' } },
                  h('span', null, '生成模式'),
                  h('span', { style: { fontSize: 11, color: 'var(--dsw-alias-text-secondary, inherit)' } }, modeLabel),
                ),
                modeBody(),
              ),
              h(
                'div',
                null,
                h(
                  'div',
                  { className: 'as-label', style: { justifyContent: 'space-between' } },
                  h('span', null, '生成参数'),
                  h(
                    'button',
                    { type: 'button', className: 'as-btn ghost sm', onClick: () => setView('advanced') },
                    '高级设置',
                  ),
                ),
                h('div', { style: { height: 8 } }),
                h('div', { className: 'as-label' }, '尺寸'),
                h(Select, {
                  value: `${form.width}x${form.height}`,
                  disabled: latentFromImage,
                  title: latentFromImage ? '图生图/蒙版重绘的输出尺寸跟随参考图' : '',
                  options: (state?.sizes || [{ label: '竖 832×1216', width: 832, height: 1216 }]).map((s) => ({
                    value: `${s.width}x${s.height}`,
                    label: `${s.width} × ${s.height}`,
                    hint: s.label,
                  })),
                  onChange: (v) => {
                    const [w, hh] = String(v).split('x').map(Number);
                    patch({ width: w, height: hh });
                  },
                }),
                latentFromImage
                  ? h('div', { style: { fontSize: 11, marginTop: 6, color: 'var(--dsw-alias-text-secondary, inherit)' } }, '输出尺寸跟随参考图，这里不生效')
                  : null,
                h('div', { style: { height: 10 } }),
                h('div', { className: 'as-label' }, '种子'),
                h(
                  'div',
                  { className: 'as-row' },
                  h('div', { className: 'as-grow' },
                    h('input', {
                      className: 'as-input',
                      type: 'number',
                      value: form.seed,
                      min: 0,
                      onChange: (e) => patch({ seed: Number(e.target.value) || 0 }),
                    }),
                  ),
                  h('button', { type: 'button', className: 'as-btn ghost sm', onClick: () => patch({ seed: Math.floor(Math.random() * 2 ** 31) }) }, '随机'),
                  h(
                    'label',
                    { className: 'as-row', style: { fontSize: 11, gap: 5, whiteSpace: 'nowrap', color: 'var(--dsw-alias-text-secondary, inherit)' } },
                    h('input', { type: 'checkbox', checked: form.lockSeed, onChange: (e) => patch({ lockSeed: e.target.checked }) }),
                    '锁定',
                  ),
                ),
              ),
              h('div', { className: 'as-warn' }, form.mode === 'txt2img'
                ? '中文会按所选引擎转成标签再出图：默认「自动」= 词典兜底 + 模型补全，英文标签仍然最精确。结尾建议带上 masterpiece, high score, great score, absurdres。'
                : `${MODE_HINT[form.mode] || ''}。中文会按所选引擎转成英文标签，但只补你要改的部分；画面已由参考图/控制图决定，masterpiece 这类质量标签在这里不是必须的。`),
              error ? h('div', { className: 'as-err' }, error) : null,
            ),
            h(
              'div',
              { className: 'as-panel-foot' },
              busy
                ? h(
                    'div',
                    { className: 'as-row' },
                    h('button', { type: 'button', className: 'as-btn block', disabled: true }, `生成中… ${elapsed}s`),
                    h('button', { type: 'button', className: 'as-btn ghost', onClick: cancel }, '取消'),
                  )
                : h(
                    'button',
                    { type: 'button', className: 'as-btn block', disabled: !form.prompt.trim(), onClick: generate },
                    MODE_ACTION[form.mode] || '生成图片',
                  ),
            ),
          ),
        );

      const renderAdvanced = () =>
        h(
          'div',
          { className: 'as-adv-page' },
          h(
            'div',
            { className: 'as-adv-top' },
            h('button', { type: 'button', className: 'as-btn ghost sm', onClick: () => setView('image') }, '← 返回创作'),
            h('span', { className: 'as-adv-title' }, '高级设置'),
            h('span', { style: { fontSize: 11, color: 'var(--dsw-alias-text-secondary, inherit)' } },
              draftAt ? `草稿已自动保存 · ${new Date(draftAt).toLocaleTimeString('zh-CN', { hour12: false })}` : '自动保存到草稿',
            ),
          ),
          h(
            'div',
            { className: 'as-adv-body' },
            h(
              'div',
              { className: 'as-adv-inner' },
              h(
                'div',
                { className: 'as-card2' },
                h('div', { className: 'as-section-title' }, '生成模式与参考图'),
                h('div', { style: { height: 12 } }),
                h('div', { className: 'as-label' }, '模式'),
                h(Select, {
                  value: form.mode,
                  options: [['txt2img', '文生图'], ['img2img', '图生图'], ['inpaint', '蒙版重绘'], ['controlnet', 'ControlNet']].map(
                    ([v, label]) => ({ value: v, label }),
                  ),
                  onChange: (v) => patch({ mode: v }),
                }),
                h(
                  'div',
                  { style: { fontSize: 11, marginTop: 8, color: 'var(--dsw-alias-text-secondary, inherit)' } },
                  MODE_HINT[form.mode] || '',
                ),
                latentFromImage ? refControls() : null,
                form.mode === 'inpaint' ? maskControls() : null,
                form.mode === 'controlnet' ? controlControls() : null,
              ),
              h(
                'div',
                { className: 'as-card2' },
                h('div', { className: 'as-section-title' }, '创作预设 ', h(Hint, { text: '预设保存在本机浏览器，仅包含参数，不含图片。' })),
                h('div', { style: { height: 10 } }),
                h(
                  'div',
                  { className: 'as-preset-row' },
                  h(PresetField, {
                    value: presetName,
                    presets,
                    placeholder: '自定义参数 / 输入预设名称',
                    onInput: (v) => setPresetName(v),
                    onPick: (name) => {
                      setSelectedPreset(name);
                      applyPreset(name);
                    },
                    onDelete: (name) => deletePreset(name),
                  }),
                  h('button', { type: 'button', className: 'as-btn sm', onClick: savePreset }, presetSaveLabel),
                  presets.length
                    ? h(
                        'button',
                        { type: 'button', className: 'as-btn ghost sm', onClick: clearPresets },
                        '清空',
                      )
                    : null,
                  h(
                    'div',
                    { style: { flexBasis: '100%', fontSize: 11, marginTop: 6, color: 'var(--dsw-alias-text-secondary, inherit)' } },
                    selectedPreset
                      ? `当前预设「${selectedPreset}」：改完参数点「${presetSaveLabel}」会覆盖；想另存就把名字改成别的；列表里每行右侧 × 可删除。`
                      : '输入名字点保存即新建；下拉列表里点一行即套用，右侧 × 删除该预设。',
                  ),
                ),
              ),
              h(
                'div',
                { className: 'as-card2' },
                h(
                  'div',
                  { className: 'as-lora-head' },
                  h('div', { className: 'as-section-title' }, '资源库 · LoRA 风格 ', h(Hint, { text: '列出 ComfyUI models/loras 下的文件；SDXL 兼容的 LoRA 才有效。选中的 LoRA 会随草稿一起保存，重启后自动恢复。' })),
                  h('span', { className: 'as-spacer' }),
                  h('span', { className: 'as-chip' }, loras.length ? `${loras.length} 个可用` : '列表为空'),
                  h('button', {
                    type: 'button',
                    className: 'as-btn ghost sm',
                    disabled: loraBusy,
                    onClick: () => loadLoras(true),
                  }, loraBusy ? '刷新中…' : '刷新列表'),
                ),
                h('div', { style: { height: 10 } }),
                form.loras.length
                  ? h(
                      'div',
                      { className: 'as-lora-labels' },
                      h('span', null, 'LoRA 名称'),
                      h('span', null, '权重'),
                      h('span', null, '应用位置'),
                      h('span', null, ''),
                    )
                  : null,
                form.loras.length
                  ? null
                  : h('div', { className: 'as-lora-empty' }, '还没有叠加 LoRA。'),
                form.loras.map((l, i) =>
                  h(
                    'div',
                    { className: 'as-lora', key: i },
                    h(Select, {
                      value: l.name,
                      placeholder: '选择 LoRA',
                      options: loras.map((n) => ({ value: n, label: n })),
                      onChange: (v) => {
                        const next = form.loras.slice();
                        next[i] = { ...next[i], name: v };
                        patch({ loras: next });
                      },
                    }),
                    h('input', {
                      className: 'as-input',
                      type: 'number',
                      step: 0.05,
                      min: 0,
                      max: 2,
                      title: 'LoRA 权重 0–2',
                      value: l.weight,
                      onChange: (e) => {
                        const next = form.loras.slice();
                        next[i] = { ...next[i], weight: Number(e.target.value) };
                        patch({ loras: next });
                      },
                    }),
                    h(Select, {
                      value: l.mode || 'model',
                      title: 'LoRA 作用范围：只作用于 UNet，或同时作用于 UNet + 文本编码器（CLIP）',
                      options: [{ value: 'model', label: '仅模型' }, { value: 'both', label: '模型+CLIP' }],
                      onChange: (v) => {
                        const next = form.loras.slice();
                        next[i] = { ...next[i], mode: v };
                        patch({ loras: next });
                      },
                    }),
                    h('button', { type: 'button', className: 'as-x', title: '移除', onClick: () => patch({ loras: form.loras.filter((_, k) => k !== i) }) }, '×'),
                  ),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'as-btn ghost sm',
                    disabled: form.loras.length >= 8,
                    title: loras.length ? '添加一个 LoRA' : 'ComfyUI 的 models/loras 里还没有文件',
                    onClick: addLora,
                  },
                  form.loras.length >= 8 ? '已达上限 8 个' : '+ 添加 LoRA',
                ),
              ),
              h(
                'div',
                { className: 'as-card2' },
                h('div', { className: 'as-section-title' }, '文本控制与采样'),
                h('div', { style: { height: 12 } }),
                h('div', { className: 'as-label' }, '负向提示词 ', h(Hint, { text: '留空时使用模型作者推荐的负面标签。' })),
                h(Select, {
                  value: '',
                  placeholder: '负面预设（点一下替换下面的内容）',
                  options: NEGATIVE_BUNDLES.map((b) => ({ value: b.value, label: b.label })),
                  onChange: (v) => {
                    if (!v) return;
                    if (v === '__clear__') {
                      patch({ negative: '' });
                      notify('已清空负向提示词，将使用模型推荐值');
                      return;
                    }
                    if (v === 'all') {
                      const all = (library?.negatives || []).map((n) => n.en);
                      if (!all.length) {
                        notify('负面标签库还没加载出来，稍后再试', 'err');
                        return;
                      }
                      patch({ negative: all.join(', ') });
                      notify(`已填入词库全部 ${all.length} 条负面标签`);
                      return;
                    }
                    patch({ negative: NEGATIVE_TEXT[v] || '' });
                    notify(`已填入负面预设：${(NEGATIVE_BUNDLES.find((b) => b.value === v) || {}).label || v}`);
                  },
                }),
                h('div', { style: { height: 8 } }),
                h('textarea', {
                  className: 'as-ta',
                  rows: 4,
                  value: form.negative,
                  placeholder: '描述希望避免的内容，留空则使用默认负面标签',
                  onChange: (e) => patch({ negative: e.target.value }),
                }),
                h('div', { style: { height: 12 } }),
                h(
                  'div',
                  { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
                  h(
                    'div',
                    null,
                    h('div', { className: 'as-label' }, 'CFG 引导强度 ', h(Hint, { text: 'Animagine 推荐 4–7，默认 5。' })),
                    h('input', {
                      className: 'as-input',
                      type: 'number',
                      min: 1,
                      max: 20,
                      step: 0.5,
                      value: form.cfg,
                      onChange: (e) => patch({ cfg: Number(e.target.value) || 5 }),
                    }),
                  ),
                  h(
                    'div',
                    null,
                    h('div', { className: 'as-label' }, '调度器'),
                    h(Select, {
                      value: form.scheduler,
                      options: (state?.schedulers || ['normal']).map((s) => ({ value: s, label: s })),
                      onChange: (v) => patch({ scheduler: v }),
                    }),
                  ),
                ),
              ),
              h(
                'div',
                { className: 'as-card2' },
                h('details', { open: true },
                  h('summary', { style: { cursor: 'pointer', fontSize: 14, fontWeight: 600 } }, '采样与尺寸'),
                  h('div', { style: { height: 14 } }),
                  h(
                    'div',
                    { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
                    h('div', null,
                      h('div', { className: 'as-label' }, '步数 ', h(Hint, { text: 'Animagine 推荐 25–28 步。' })),
                      h('input', {
                        className: 'as-input', type: 'number', min: 1, max: 60, value: form.steps,
                        onChange: (e) => patch({ steps: Number(e.target.value) || 28 }),
                      }),
                    ),
                    h('div', null,
                      h('div', { className: 'as-label' }, '采样器'),
                      h(Select, {
                        value: form.sampler,
                        options: (state?.samplers || ['euler_ancestral']).map((s) => ({ value: s, label: s })),
                        onChange: (v) => patch({ sampler: v }),
                      }),
                    ),
                    h('div', null,
                      h('div', { className: 'as-label' }, '批量'),
                      h(Select, {
                        value: form.batch,
                        options: [1, 2, 3, 4].map((n) => ({ value: n, label: `${n} 张` })),
                        onChange: (v) => patch({ batch: Number(v) }),
                      }),
                    ),
                    h('div', null,
                      h('div', { className: 'as-label' }, '尺寸'),
                      h(Select, {
                        value: `${form.width}x${form.height}`,
                        options: (state?.sizes || []).map((s) => ({
                          value: `${s.width}x${s.height}`,
                          label: `${s.width} × ${s.height}`,
                          hint: s.label,
                        })),
                        onChange: (v) => {
                          const [w, hh] = String(v).split('x').map(Number);
                          patch({ width: w, height: hh });
                        },
                      }),
                    ),
                  ),
                ),
              ),
            ),
          ),
          h(
            'div',
            { className: 'as-adv-foot' },
            h('button', { type: 'button', className: 'as-btn ghost', onClick: resetDefaults }, '恢复默认参数'),
            h('span', { className: 'as-spacer' }),
            h('button', { type: 'button', className: 'as-btn', onClick: () => setView('image') }, '完成设置'),
          ),
        );

      const renderGallery = () =>
        h(
          'div',
          { style: { flex: '1 1 auto', display: 'flex', flexDirection: 'column', minHeight: 0 } },
          h(
            'div',
            { className: 'as-toolbar' },
            h('input', {
              className: 'as-input as-search',
              placeholder: '搜索画面…',
              value: query,
              onChange: (e) => setQuery(e.target.value),
            }),
            h('span', { className: 'as-spacer' }),
            h(Select, {
              value: filter,
              style: { width: 132, flex: '0 0 132px' },
              options: [
                { value: 'all', label: '全部作品' },
                { value: 'favorite', label: '星标' },
                { value: 'archived', label: '已归档' },
              ],
              onChange: (v) => setFilter(v),
            }),
            h('span', { className: 'as-chip' }, `${visible.length} 张`),
          ),
          h(
            'div',
            { style: { flex: '1 1 auto', overflowY: 'auto', padding: '4px 16px 20px' } },
            visible.length
              ? h(
                  'div',
                  { className: 'as-grid' },
                  visible.map((job) =>
                    h(
                      'div',
                      { className: 'as-gcard', key: job.id },
                      h('img', {
                        src: `${API}/image?id=${job.id}&n=0`,
                        alt: job.prompt,
                        loading: 'lazy',
                        onClick: () => setLightbox(`${API}/image?id=${job.id}&n=0`),
                      }),
                      h(
                        'div',
                        { className: 'as-gmeta' },
                        h('div', { className: 'as-clamp' }, job.prompt),
                        h('div', { className: 'as-gactions' },
                          h('button', {
                            type: 'button',
                            className: 'as-star',
                            title: job.favorite ? '取消星标' : '设为星标',
                            onClick: () => act(job.id, 'favorite'),
                          }, job.favorite ? '★' : '☆'),
                          h('span', null, `${job.width}×${job.height} · ${job.steps}步`),
                          h('span', { className: 'as-spacer' }),
                          h('button', { type: 'button', className: 'as-btn ghost sm', onClick: () => reuse(job) }, '复用'),
                          h('button', { type: 'button', className: 'as-btn ghost sm', onClick: () => act(job.id, 'archive') },
                            job.archived ? '取消归档' : '归档'),
                          h('button', { type: 'button', className: 'as-btn ghost sm danger', onClick: () => act(job.id, 'delete') }, '删除'),
                        ),
                        job.archived ? h('div', { style: { marginTop: 4, fontSize: 10 } }, '已归档') : null,
                      ),
                    ),
                  ),
                )
              : h(
                  'div',
                  { className: 'as-empty', style: { paddingTop: 80 } },
                  h('div', null, filter === 'favorite' ? '还没有星标作品' : filter === 'archived' ? '归档是空的' : '图库还是空的'),
                  h('div', null, '生成图片后会自动出现在这里'),
                  h('div', { style: { marginTop: 14 } },
                    h('button', { type: 'button', className: 'as-btn ghost', onClick: () => setView('image') }, '+ 创作第一张'),
                  ),
                ),
          ),
        );

      return h(
        'div',
        { className: 'as-root' },
        h('style', null, css),
        h(
          'header',
          { className: 'as-head' },
          h('span', { className: 'as-title' }, '图片创作 · Animagine XL 4.0'),
          h('span', { className: 'as-chip ' + (reachable ? 'ok' : 'bad') }, reachable ? `ComfyUI ${state?.version ?? ''}` : 'ComfyUI 离线'),
          state?.device ? h('span', { className: 'as-chip' }, state.device.replace('NVIDIA GeForce ', '')) : null,
          h('span', { className: 'as-spacer' }),
          h('button', { type: 'button', className: 'as-btn ghost sm', onClick: () => { refreshState(); refreshJobs(); } }, '刷新'),
        ),
        h(
          'nav',
          { className: 'as-tabbar' },
          h('button', { type: 'button', className: 'as-tab' + (view !== 'gallery' ? ' on' : ''), onClick: () => setView('image') }, '图像'),
          h('button', { type: 'button', className: 'as-tab' + (view === 'gallery' ? ' on' : ''), onClick: () => { setView('gallery'); refreshJobs(); } }, '图库'),
        ),
        stateError ? h('div', { className: 'as-err', style: { padding: '8px 16px 0' } }, stateError) : null,
        renderSetup(),
        h('div', { className: 'as-main' }, view === 'gallery' ? renderGallery() : view === 'advanced' ? renderAdvanced() : renderImage()),
        lightbox ? h('div', { className: 'as-lightbox', onClick: () => setLightbox(null) }, h('img', { src: lightbox, alt: '预览' })) : null,
        h(ToastStack, { items: toasts, dismiss }),
      );
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        const register = ctx.slots.register.bind(ctx.slots);
        const mount = (name, make) => ctx.slots.inject(name, make);
        mount('main', () => register({ name: 'main', key: 'anima-studio', inject: () => ({}) }, StudioPage));
        mount('sidebar.panellist', () =>
          register({ name: 'sidebar.panellist', id: 'anima-studio', order: 11, label: '图片创作' }, StudioIcon),
        );
      },
    };
  },
});
