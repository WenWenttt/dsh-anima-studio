// 把「中文|english」行数据 + 角色/预设/画师/负面，生成插件用的 tagdata.js。
//
// 用法：node scripts/build-tagdata.mjs <input.json> [out.js]
// 输入 JSON 结构（可用任意来源整理，不必是 Prompt Forge）：
//   {
//     "tags":       [{ "zh": "金发", "en": "blonde hair", "cat": "hair" }, ...],
//     "aliases":    [{ "zh": "白毛", "en": "white hair" }, ...],
//     "characters": [{ "names": ["阿米娅"], "tag": "amiya (arknights)",
//                      "auto": [{ "zh": "棕发", "en": "brown hair" }], "game": "明日方舟" }, ...],
//     "presets":    [{ "name": "雨中天台", "desc": "湿发与积水反光", "tags": ["1girl", "rain"] }, ...],
//     "artists":    [{ "en": "wlop", "zh": "WLOP" }, ...],
//     "negatives":  [{ "en": "lowres", "zh": "低分辨率" }, ...]
//   }
//
// 清洗规则（改这里就会改变匹配质量，改前先跑 npm test）：
//   - 单字键丢弃：长句里极易误命中
//   - 纯拉丁「中文键」丢弃：没有转换价值
//   - 超过 5 个词的英文丢弃：那是整句描述，不是 danbooru 标签
//   - 「wearing X」丢弃：不是标准 tag
//   - 同一中文键先到先得：调用方按 tags → aliases → characters 的顺序喂进来

import { readFileSync, writeFileSync } from 'node:fs';

const input = process.argv[2];
const output = process.argv[3] || 'tagdata.js';
if (!input) {
  console.error('usage: node scripts/build-tagdata.mjs <input.json> [out.js]');
  process.exit(1);
}

const data = JSON.parse(readFileSync(input, 'utf8'));
const isLatin = (s) => /^[A-Za-z0-9 _()\-·.]+$/.test(s);
const seen = new Map();

const push = (zh, en) => {
  const z = String(zh || '').trim();
  const e = String(en || '').trim();
  if (!z || !e) return;
  if (z.length < 2) return;
  if (isLatin(z)) return;
  if (e.split(/\s+/).length > 5) return;
  if (/^wearing(\s|$)/i.test(e)) return;
  if (seen.has(z)) return;
  seen.set(z, e);
};

for (const t of data.tags || []) push(t.zh, t.en);
for (const a of data.aliases || []) push(a.zh, a.en);

const charRows = [];
for (const c of data.characters || []) {
  const names = [...new Set((c.names || []).filter(Boolean))];
  for (const name of names) push(name, c.tag);
  const auto = (c.auto || [])
    .filter((a) => a.en)
    .map((a) => (a.zh ? `${a.zh}|${a.en}` : a.en))
    .join(';');
  charRows.push({ names, tag: c.tag, game: c.game || '', auto });
}

const presetRows = (data.presets || []).map((p) => ({
  name: p.name,
  desc: p.desc || '',
  tags: (p.tags || []).map((t) => (typeof t === 'string' ? t : t.en)),
}));

const artistRows = (data.artists || []).map((a) => ({ en: a.en, zh: a.zh || a.en }));
const negativeRows = (data.negatives || []).map((n) => ({ en: n.en, zh: n.zh || n.en }));

const pairs = [...seen.entries()].sort((a, b) => b[0].length - a[0].length);
const lines = pairs.map(([zh, en]) => `${zh}|${en}`);

const header = `// 自动生成，请勿手改；改数据请跑 scripts/build-tagdata.mjs。
// 结构与授权见 README.md 的「词库」与 NOTICE.md。
//
// 统计：${pairs.length} 条中文映射 / ${charRows.length} 个角色 / ${presetRows.length} 个预设 / ${artistRows.length} 个画师 / ${negativeRows.length} 条负面
`;

const out = `${header}
export const TAG_LINES = \`
${lines.join('\n')}
\`;

export const CHARACTERS = ${JSON.stringify(charRows)};

export const PRESETS = ${JSON.stringify(presetRows)};

export const ARTISTS = ${JSON.stringify(artistRows)};

export const NEGATIVES = ${JSON.stringify(negativeRows)};
`;

writeFileSync(output, out, 'utf8');
console.log(
  `${output}: ${pairs.length} pairs / ${charRows.length} characters / ${presetRows.length} presets / ${artistRows.length} artists / ${negativeRows.length} negatives`,
);
