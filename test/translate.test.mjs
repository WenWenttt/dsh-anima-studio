// translate.js / tags.js 单元测试（node test/translate.test.mjs）
import {
  systemPromptFor,
  stripQuality,
  resolveTags,
  llmTags,
  pickMode,
  TRANSLATE_MODES,
  MODE_RULES,
  TAGS_SYSTEM_PROMPT,
} from '../translate.js';
import { DICTIONARY_SIZE, CHARACTER_COUNT } from '../tags.js';

let failed = 0;
const check = (name, ok, extra) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || extra === undefined ? '' : ' -> ' + JSON.stringify(extra)}`);
  if (!ok) failed += 1;
};

/* 1. 模式识别 */
check('pickMode accepts all four modes', TRANSLATE_MODES.every((m) => pickMode(m) === m));
check('pickMode falls back to txt2img', pickMode('nope') === 'txt2img' && pickMode(undefined) === 'txt2img');

/* 2. 提示词按模式收敛 */
const txt = systemPromptFor('txt2img');
const t2i = systemPromptFor('img2img');
const inpaint = systemPromptFor('inpaint');
const control = systemPromptFor('controlnet');
check('txt2img keeps the base prompt untouched', txt === TAGS_SYSTEM_PROMPT.trim());
check('img2img adds edit-only rules', t2i.includes('图生图') && t2i.includes('把 A 改成 B') && !t2i.includes('蒙版白区'));
check('inpaint adds mask-region rules', inpaint.includes('蒙版白区') && !inpaint.includes('图生图'));
check('controlnet adds no-pose rules', control.includes('控制图') && control.includes('姿势'));
check('each mode prompt differs from txt2img', new Set([txt, t2i, inpaint, control]).size === 4);
check('mode rules are appended, base is preserved', t2i.startsWith(TAGS_SYSTEM_PROMPT.trim().slice(0, 20)));
check('custom base prompt is kept and extended', systemPromptFor('inpaint', 'CUSTOM BASE').startsWith('CUSTOM BASE') &&
  systemPromptFor('inpaint', 'CUSTOM BASE').includes('蒙版白区'));
check('empty MODE_RULES for txt2img', MODE_RULES.txt2img === '');

/* 3. 质量标签清理 */
const tags = ['masterpiece', 'highres', 'red hat', 'absurdres'];
check('quality tags stripped for non-txt2img', stripQuality(tags, '把帽子改成红色').join() === 'red hat');
check('quality tags kept when user asked', stripQuality(tags, '杰作, 把帽子改成红色').length === 4);
check('non-quality tags untouched', stripQuality(['red hat', 'smile'], '').length === 2);

/* 4. 没有模型服务时的行为 */
const dictOnly = await resolveTags(undefined, {}, '金发, 校服, 教室', 'auto', 'img2img');
check('dict-only fallback still returns tags', Boolean(dictOnly.text) && dictOnly.engine === 'dict', dictOnly);
check('resolveTags echoes the mode', dictOnly.mode === 'img2img');

const needLlm = await resolveTags(undefined, {}, '把帽子改成红色', 'llm', 'img2img');
check('llm request without ctx::llm falls back to dictionary', needLlm.engine === 'dict' && Boolean(needLlm.llmError), needLlm);

/* 4b. 新词库（Prompt Forge）：规模、角色、歧义消解、外观补全 */
const basic = await resolveTags(undefined, {}, '金发, 校服, 教室', 'dict', 'txt2img');
check('curated phrases still convert', basic.text === 'blonde hair, school uniform, classroom', basic.text);
check('dictionary is much larger than the curated list', basic && DICTIONARY_SIZE > 3000, DICTIONARY_SIZE);
check('dictionary ships characters', CHARACTER_COUNT > 400, CHARACTER_COUNT);

const charHit = await resolveTags(undefined, {}, '阿米娅', 'dict', 'txt2img');
check('character name maps to its danbooru tag', charHit.text === 'amiya (arknights)', charHit.text);

const ambiguous = await resolveTags(undefined, {}, '极光', 'dict', 'txt2img');
check('tag wins over the same-named character', ambiguous.text === 'aurora', ambiguous.text);

const withLook = await resolveTags(undefined, {}, '阿米娅', 'dict', 'txt2img', { appearance: true });
check('appearance completion appends the character look', withLook.text.includes('amiya (arknights)') && withLook.text.includes('brown hair'), withLook.text);

const plainLook = await resolveTags(undefined, {}, '阿米娅', 'dict', 'txt2img');
check('appearance stays off unless asked', !plainLook.text.includes('brown hair'), plainLook.text);

const single = await resolveTags(undefined, {}, '龙', 'dict', 'txt2img');
check('single-character keys are not matched', !single.text.includes('dragon'), single.text);

/* 5. 引擎固定 auto：词典够干净就不叫模型，切不干净才走模型 */
function fakeCtx(reply) {
  const calls = [];
  const llm = {
    prepareCall: async (opts) => {
      calls.push({ kind: 'prepare', opts });
      return {
        config: {},
        stream: async function* (options) {
          calls.push({ kind: 'stream', options });
          yield { type: 'text-delta', text: reply };
          yield { type: 'finish', reason: { kind: 'stop' } };
        },
      };
    },
  };
  return { ctx: { get: (name) => (name === 'llm' ? llm : undefined) }, calls };
}

const clean = fakeCtx('should not be called');
const autoClean = await resolveTags(clean.ctx, {}, '金发, 校服', 'auto', 'txt2img');
check('auto stays on the dictionary when it is clean', autoClean.engine === 'dict' && clean.calls.length === 0, autoClean.engine);

const dirty = fakeCtx('masterpiece, red hat, smile');
const autoLlm = await resolveTags(dirty.ctx, {}, '把帽子改成红色', 'auto', 'img2img');
check('auto falls back to the model when characters are dropped', autoLlm.engine === 'llm' && dirty.calls.length > 0, autoLlm);
check('img2img system prompt is sent', String(dirty.calls[1].options.system).includes('图生图'));
check('quality tags stripped in img2img output', autoLlm.text === 'red hat, smile', autoLlm.text);
check('model route comes from config, not the request', dirty.calls[0].opts.provider === 'deepseek-account' && dirty.calls[0].opts.model === 'deepseek-flash', dirty.calls[0].opts);

const full = fakeCtx('1girl, blonde hair, masterpiece');
const txtOut = await llmTags(full.ctx, {}, '一个没收录的说法XY', 'txt2img');
check('txt2img keeps quality tags', txtOut.text.includes('masterpiece'), txtOut.text);
check('txt2img prompt has no img2img rules', !String(full.calls[1].options.system).includes('图生图'));

console.log(failed === 0 ? '\nALL TRANSLATE CHECKS PASSED' : `\n${failed} CHECK(S) FAILED`);
process.exit(failed === 0 ? 0 : 1);
