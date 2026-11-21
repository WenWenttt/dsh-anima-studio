// 中文画面描述 → danbooru 标签：走 DSH 自己的模型服务（ctx.llm）。
// 词典（tags.js）负责离线强匹配；这里负责「句子、角色名、口语化动作」这类词典切不出来的情况。
// 不依赖任何第三方翻译站：用的是本机已经登录的 deepseek 账号通道。

import { translateCN, hasChinese } from './tags.js';

const CACHE_MAX = 128;
const cache = new Map();

/** 三种引擎：dict 只用词典（离线、可控）；llm 只用模型；auto 先词典，切不干净再让模型兜底。 */
export const TAG_ENGINES = ['auto', 'dict', 'llm'];

export function pickEngine(value) {
  const key = String(value || '').trim().toLowerCase();
  return TAG_ENGINES.includes(key) ? key : 'auto';
}

/** 生成模式：转换提示词要按模式收敛，不能一套提示词套所有玩法。 */
export const TRANSLATE_MODES = ['txt2img', 'img2img', 'inpaint', 'controlnet'];

export function pickMode(value) {
  const key = String(value || '').trim().toLowerCase();
  return TRANSLATE_MODES.includes(key) ? key : 'txt2img';
}

/** 模型转换的固定系统提示：只产出标签串，不做解释。 */
export const TAGS_SYSTEM_PROMPT = [
  '你是 danbooru 标签转换器，服务于 Animagine XL 4.0（SDXL + 英文 CLIP 文本编码器）。',
  '把用户给的中文画面描述转换成英文 danbooru 标签串。',
  '',
  '规则：',
  '1. 只输出标签本身：小写英文，用「, 」分隔，不要句子、不要解释、不要编号、不要引号、不要 markdown。',
  '2. 每个标签必须是 danbooru 常见写法，例如 1girl, solo, from below, simple background, skirt lift, spread legs, looking at viewer。',
  '3. 原文里已经写好的英文标签原样保留，位置可以整理但不翻译不改写。',
  '4. 描述里出现的元素都要落到标签上：人数/角色名/发色发型/瞳色/表情/服装/动作/镜头视角/背景/光线。',
  '5. 成句描述要拆成多个标签，不要整句翻译；动词短语用 danbooru 的动作标签（掀起裙子 → skirt lift，能看到 → 通常省略）。',
  '6. 角色名转成 danbooru 角色标签（露米娅 → rumia），作品名转成对应版权标签；不确定就不要编造。',
  '7. 成人内容直接输出对应标签（小穴 → pussy，露出小穴 → spread pussy，裸体 → nude，nsfw → nsfw），不要省略、不要换成模糊说法。',
  '8. 不要添加原文没有的元素；描述留白就让它留白。',
].join('\n');

/**
 * 每个模式下「转换」该做到什么程度：
 * 图生图/蒙版重绘/ControlNet 里画面已经由参考图或控制图决定，
 * 再把整幅场景复述成标签只会跟图片打架，所以按模式收窄。
 */
export const MODE_RULES = {
  txt2img: '',
  img2img: [
    '',
    '当前是「图生图」：参考图已经决定了主体、构图和背景。',
    '9. 只输出用户明确要求改动或强调的标签；不要把参考图里已经存在的东西再列一遍（人数、发色、瞳色、背景、镜头视角尤其别补）。',
    '10. 遇到「把 A 改成 B」这类编辑指令，输出改动后的目标标签（把帽子改成红色 → red hat），不要输出 A。',
    '11. 不要添加质量类标签（masterpiece / best quality / highres / absurdres 等）。',
  ].join('\n'),
  inpaint: [
    '',
    '当前是「蒙版重绘」：只有蒙版白区会被重画，其余像素原样保留。',
    '9. 只输出「白区里要画什么」的标签，不要描述整张图，不要复述蒙版外的内容。',
    '10. 不要补人数、构图、镜头、背景类标签，除非原文明确要求改它们。',
    '11. 不要添加质量类标签。',
  ].join('\n'),
  controlnet: [
    '',
    '当前是「ControlNet」：构图、姿态、轮廓由控制图决定。',
    '9. 不要输出镜头视角、姿势、构图类标签（from below / looking at viewer / spread legs 等），除非原文点名要改。',
    '10. 只输出内容、服装、颜色、风格类标签。',
    '11. 不要添加质量类标签。',
  ].join('\n'),
};

/** 按模式拼系统提示：用户自定义的 base 优先，模式规则总在后面追加。 */
export function systemPromptFor(mode, base) {
  const root = String(base || TAGS_SYSTEM_PROMPT).trim();
  const extra = MODE_RULES[pickMode(mode)] || '';
  return extra ? `${root}\n${extra}` : root;
}

/** 模型爱自作主张加的质量标签：非文生图模式下，除非用户自己要，否则丢掉。 */
const QUALITY_TAGS = new Set([
  'masterpiece',
  'best quality',
  'high quality',
  'highres',
  'absurdres',
  'high score',
  'great score',
  'very aesthetic',
  'newest',
  'ultra detailed',
  'extremely detailed',
]);

const QUALITY_HINTS = ['杰作', '画质', '质量', '高清', '高分辨率', '超精细', '高分', '精致'];

export function stripQuality(tags, sourceText) {
  const asked = QUALITY_HINTS.some((word) => String(sourceText || '').includes(word));
  if (asked) return tags;
  return tags.filter((tag) => !QUALITY_TAGS.has(tag));
}

function llmOf(ctx) {
  if (!ctx || typeof ctx.get !== 'function') return undefined;
  try {
    const llm = ctx.get('llm');
    return llm && typeof llm.prepareCall === 'function' ? llm : undefined;
  } catch {
    return undefined;
  }
}

/** 本机是否挂上了可用的模型服务。 */
export function llmReady(ctx) {
  return llmOf(ctx) !== undefined;
}

function clampInt(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

/** 把模型输出清理成干净标签串：去掉列表符号/引号/中文残留，去重。 */
export function normalizeTags(raw) {
  const text = String(raw || '')
    .replace(/```[a-z]*/gi, ' ')
    .replace(/[\r\n]+/g, ',');
  const seen = new Set();
  const out = [];
  for (const token of text.split(/[,，、;；]+/)) {
    const item = token
      .replace(/^[-*•·–—>]+\s*/, '')
      .replace(/^\d+[.)、]\s*/, '')
      .replace(/^[\s"'`「」『』()（）\[\]]+/g, '')
      .replace(/[\s"'`「」『』()（）\[\]]+$/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    if (!item) continue;
    if (/[\u4e00-\u9fff]/.test(item)) continue;
    if (item.length > 48) continue;
    if (!/[a-z]/.test(item)) continue;
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
  }
  return out;
}

async function dispatch(ctx, config, text, signal, mode) {
  const llm = llmOf(ctx);
  if (!llm) throw new Error('本机没有可用的模型服务（ctx.llm 未挂载）');
  const provider = String(config.llmProvider || 'deepseek-account');
  const model = String(config.llmModel || 'deepseek-flash');
  const maxTokens = clampInt(config.llmMaxTokens, 32, 4096, 320);

  // 先关掉思考；模型不支持 off 时退回默认档。
  let prepared;
  try {
    prepared = await llm.prepareCall({ provider, model, reasoningEffort: 'off', maxTokens }, signal);
  } catch {
    prepared = await llm.prepareCall({ provider, model, maxTokens }, signal);
  }

  const messages = [{ role: 'user', content: [{ type: 'text', text: String(text) }] }];
  const options = { ...prepared.config, system: systemPromptFor(mode, config.llmSystemPrompt), messages, signal };

  let out = '';
  let reason;
  for await (const chunk of prepared.stream(options)) {
    if (chunk && chunk.type === 'text-delta') out += chunk.text;
    else if (chunk && chunk.type === 'finish') reason = chunk.reason;
  }
  if (reason && reason.kind === 'error') throw new Error(`模型调用失败：${reason.failure?.message || 'unknown'}`);
  if (reason && reason.kind === 'aborted') throw new Error('模型调用被取消');
  if (!out.trim()) throw new Error('模型没有返回内容');
  return { raw: out, provider, model };
}

/**
 * 中文描述 → danbooru 标签（模型路线）。
 * @param {object} ctx - DSH 插件上下文。
 * @param {object} config - 插件配置（llmProvider / llmModel / llmTimeoutMs / llmMaxTokens / llmSystemPrompt）。
 * @param {string} text - 用户输入的画面描述。
 * @param {string} mode - 生成模式；决定提示词收敛到什么程度。
 * @returns {Promise<{text: string, tags: string[], provider: string, model: string, cached?: boolean}>}
 */
export async function llmTags(ctx, config, text, mode) {
  const source = String(text || '').trim();
  if (!source) return { text: '', tags: [], provider: '', model: '' };
  const resolvedMode = pickMode(mode);
  const cacheKey = `${resolvedMode}\n${source}`;

  const hit = cache.get(cacheKey);
  if (hit) return { ...hit, cached: true };

  const timeoutMs = clampInt(config.llmTimeoutMs, 1000, 120000, 30000);
  const signal = AbortSignal.timeout(timeoutMs);
  let result;
  try {
    result = await dispatch(ctx, config, source, signal, resolvedMode);
  } catch (error) {
    if (signal.aborted) throw new Error(`模型转换超时（${timeoutMs}ms）`);
    throw error;
  }

  let tags = normalizeTags(result.raw);
  // 参考图/控制图已经给了画面信息，模型自作主张补的质量标签只会跟图打架。
  if (resolvedMode !== 'txt2img') tags = stripQuality(tags, source);
  if (!tags.length) throw new Error('模型返回的内容不是标签');
  const value = { text: tags.join(', '), tags, provider: result.provider, model: result.model };

  if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value);
  cache.set(cacheKey, value);
  return value;
}

/**
 * 统一入口：输入中文描述，输出 danbooru 标签。
 * auto 只有在词典「有丢字或没出结果」时才叫模型，省 token 也不拖慢常见短语；
 * 模型失败时退回词典结果并带上 llmError，不让用户空手而归。
 */
export async function resolveTags(ctx, config, text, engine, mode, options) {
  const resolvedMode = pickMode(mode);
  const engineMode = pickEngine(engine);
  const dict = translateCN(text, { appearance: Boolean(options && options.appearance) });
  const usable = Boolean(dict.text) && dict.dropped === 0;

  if (engineMode === 'dict' || !hasChinese(text) || (engineMode === 'auto' && usable)) {
    return { ...dict, engine: 'dict', mode: resolvedMode, llmAvailable: llmReady(ctx) };
  }

  try {
    const out = await llmTags(ctx, config, text, resolvedMode);
    return {
      text: out.text,
      matched: out.tags.length,
      dropped: 0,
      leftover: '',
      changed: out.text !== String(text || '').trim(),
      engine: 'llm',
      mode: resolvedMode,
      model: out.model,
      provider: out.provider,
      cached: Boolean(out.cached),
      dictText: dict.text,
      llmAvailable: true,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (dict.text) {
      return { ...dict, engine: 'dict', mode: resolvedMode, llmError: message, llmAvailable: llmReady(ctx) };
    }
    throw new Error(`模型转换失败：${message}`);
  }
}
