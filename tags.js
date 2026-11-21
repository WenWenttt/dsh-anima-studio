// 中文 → danbooru 标签 的词典式转换。
// 词库来自 tagdata.js（Prompt Forge v3.0 的标签库：32 类 / 3500+ 映射 / 507 角色），
// 本文件再叠加手写词条与「颜色+物件」组合规则，处理词库没逐条收录的说法。
// 不是机器翻译：按最长匹配切词，未收录的汉字会被丢弃并计数。
// 词典只负责「离线可用的强匹配」；自由描述（成句动作）交给 translate.js 的模型转换。

import { TAG_LINES, CHARACTERS, PRESETS } from './tagdata.js';

/** tagdata 里的行是「中文|english」，已按中文长度倒序。 */
const BIG_PAIRS = TAG_LINES.split('\n')
  .map((line) => {
    const i = line.indexOf('|');
    return i > 0 ? [line.slice(0, i).trim(), line.slice(i + 1).trim()] : null;
  })
  .filter((pair) => pair && pair[0] && pair[1]);

/** 角色标签 → 中文名 + 外观标签（可选，用于「角色自动补外观」）。 */
const CHAR_INDEX = new Map();
for (const c of CHARACTERS) {
  const appearance = String(c.auto || '')
    .split(';')
    .map((seg) => {
      const i = seg.indexOf('|');
      return (i > 0 ? seg.slice(i + 1) : seg).trim();
    })
    .filter(Boolean);
  CHAR_INDEX.set(String(c.tag).toLowerCase(), { tag: c.tag, names: c.names || [], appearance });
}

const CURATED_PAIRS = [
  // 人数 / 性别
  ['两个女孩', '2girls'], ['两个男孩', '2boys'], ['两个人', '2others'],
  ['一个女孩', '1girl'], ['一个男孩', '1boy'], ['单人', 'solo'], ['少女', '1girl'],
  ['女孩', '1girl'], ['男孩', '1boy'], ['女生', '1girl'], ['男生', '1boy'],
  ['女性', 'female'], ['男性', 'male'], ['萝莉', 'loli'], ['正太', 'shota'],
  ['御姐', 'mature female'], ['成女', 'adult female'],

  // 发色
  ['金发', 'blonde hair'], ['银发', 'silver hair'], ['白发', 'white hair'],
  ['黑发', 'black hair'], ['棕发', 'brown hair'], ['褐发', 'brown hair'],
  ['红发', 'red hair'], ['蓝发', 'blue hair'], ['粉发', 'pink hair'],
  ['紫发', 'purple hair'], ['绿发', 'green hair'], ['橙发', 'orange hair'],
  ['灰发', 'grey hair'], ['渐变发', 'gradient hair'], ['挑染', 'streaked hair'],

  // 发型
  ['双马尾', 'twintails'], ['单马尾', 'ponytail'], ['马尾', 'ponytail'],
  ['丸子头', 'hair bun'], ['双丸子头', 'double bun'], ['呆毛', 'ahoge'],
  ['长发', 'long hair'], ['短发', 'short hair'], ['中长发', 'medium hair'],
  ['卷发', 'curly hair'], ['直发', 'straight hair'], ['波浪卷', 'wavy hair'],
  ['齐刘海', 'blunt bangs'], ['刘海', 'bangs'], ['公主切', 'hime cut'],
  ['麻花辫', 'braid'], ['编发', 'braided hair'], ['盘发', 'updo'],
  ['散发', 'hair down'], ['齐肩发', 'shoulder-length hair'], ['空气刘海', 'see-through bangs'],

  // 瞳色
  ['绿瞳', 'green eyes'], ['蓝瞳', 'blue eyes'], ['红瞳', 'red eyes'],
  ['金瞳', 'yellow eyes'], ['黑瞳', 'black eyes'], ['紫瞳', 'purple eyes'],
  ['粉瞳', 'pink eyes'], ['异色瞳', 'heterochromia'], ['琥珀瞳', 'amber eyes'],
  ['闭眼', 'closed eyes'], ['睁眼', 'open eyes'], ['半睁眼', 'half-closed eyes'],

  // 表情
  ['微笑', 'smile'], ['大笑', 'grin'], ['害羞', 'blush'], ['脸红', 'blush'],
  ['生气', 'angry'], ['严肃', 'serious'], ['悲伤', 'sad'], ['哭泣', 'crying'],
  ['惊讶', 'surprised'], ['无语', 'expressionless'], ['冷酷', 'cold expression'],
  ['得意', 'smug'], ['温柔', 'gentle smile'], ['害羞地笑', 'shy smile'],
  ['张嘴', 'open mouth'], ['咬唇', 'biting lip'], ['看向观众', 'looking at viewer'],
  ['回眸', 'looking back'], ['侧脸', 'profile'], ['闭眼微笑', 'closed eyes, smile'],

  // 服装
  ['校服', 'school uniform'], ['水手服', 'sailor uniform'], ['西装', 'suit'],
  ['和服', 'kimono'], ['浴衣', 'yukata'], ['巫女服', 'miko outfit'],
  ['旗袍', 'china dress'], ['女仆装', 'maid outfit'], ['连衣裙', 'dress'],
  ['白色连衣裙', 'white dress'], ['黑色连衣裙', 'black dress'], ['长裙', 'long dress'],
  ['短裙', 'skirt'], ['百褶裙', 'pleated skirt'], ['牛仔裤', 'jeans'],
  ['泳装', 'swimsuit'], ['比基尼', 'bikini'], ['运动服', 'sportswear'],
  ['卫衣', 'hoodie'], ['毛衣', 'sweater'], ['衬衫', 'shirt'], ['白衬衫', 'white shirt'],
  ['外套', 'jacket'], ['大衣', 'coat'], ['斗篷', 'cape'], ['披风', 'cloak'],
  ['铠甲', 'armor'], ['银色铠甲', 'silver armor'], ['长靴', 'boots'],
  ['高跟鞋', 'high heels'], ['丝袜', 'pantyhose'], ['过膝袜', 'thighhighs'],
  ['手套', 'gloves'], ['围巾', 'scarf'], ['帽子', 'hat'], ['贝雷帽', 'beret'],
  ['头饰', 'hair ornament'], ['发带', 'hairband'], ['发夹', 'hairclip'],
  ['蝴蝶结', 'bow'], ['领带', 'necktie'], ['项链', 'necklace'], ['耳环', 'earrings'],
  ['眼镜', 'glasses'], ['面具', 'mask'], ['翅膀', 'wings'], ['兽耳', 'animal ears'],
  ['猫耳', 'cat ears'], ['尾巴', 'tail'],

  // 动作 / 姿势
  ['站立', 'standing'], ['坐着', 'sitting'], ['躺下', 'lying'], ['跪着', 'kneeling'],
  ['蹲着', 'squatting'], ['奔跑', 'running'], ['走路', 'walking'], ['跳跃', 'jumping'],
  ['飞翔', 'flying'], ['战斗', 'fighting'], ['举手', 'arm up'], ['伸手', 'outstretched arm'],
  ['抱胸', 'crossed arms'], ['双手背后', 'arms behind back'], ['手持', 'holding'],
  ['拿着剑', 'holding sword'], ['挥剑', 'sword'], ['撑着伞', 'umbrella'],
  ['撩头发', 'hand in own hair'], ['摸脸', 'hand on own face'], ['托腮', 'hand on own cheek'],
  ['比心', 'heart hands'], ['背对', 'from behind'], ['转身', 'turning around'],

  // 构图 / 镜头
  ['全身', 'full body'], ['半身', 'upper body'], ['特写', 'close-up'],
  ['脸部特写', 'portrait'], ['大头照', 'headshot'], ['远景', 'wide shot'],
  ['中景', 'medium shot'], ['俯视', 'from above'], ['仰视', 'from below'],
  ['正面', 'front view'], ['侧面', 'side view'], ['动态构图', 'dynamic angle'],
  ['全身像', 'full body'], ['广角', 'wide angle'], ['景深', 'depth of field'],
  ['虚化', 'blurry background'], ['背光', 'backlighting'], ['剪影', 'silhouette'],

  // 场景 / 背景
  ['教室', 'classroom'], ['学校', 'school'], ['走廊', 'hallway'], ['天台', 'rooftop'],
  ['街道', 'street'], ['城市', 'city'], ['夜景城市', 'city lights, night'],
  ['森林', 'forest'], ['树林', 'woods'], ['海边', 'beach'], ['大海', 'ocean'],
  ['沙滩', 'beach'], ['湖边', 'lake'], ['河边', 'river'], ['山', 'mountain'],
  ['草原', 'grassland'], ['花田', 'flower field'], ['向日葵', 'sunflower'],
  ['樱花', 'cherry blossoms'], ['樱花树', 'cherry tree'], ['枫叶', 'autumn leaves'],
  ['神社', 'shrine'], ['鸟居', 'torii'], ['城堡', 'castle'], ['庭院', 'courtyard'],
  ['宫殿', 'palace'], ['房间', 'room'], ['卧室', 'bedroom'], ['咖啡厅', 'cafe'],
  ['图书馆', 'library'], ['实验室', 'laboratory'], ['废墟', 'ruins'],
  ['天空', 'sky'], ['蓝天', 'blue sky'], ['云', 'clouds'], ['星空', 'starry sky'],
  ['月亮', 'moon'], ['夕阳', 'sunset'], ['黄昏', 'dusk'], ['黎明', 'dawn'],
  ['夜晚', 'night'], ['白天', 'day'], ['清晨', 'morning'],

  // 天气 / 氛围
  ['下雨', 'rain'], ['雨天', 'rainy'], ['雨中', 'rain'], ['下雪', 'snow'],
  ['雪中', 'snow'], ['风中', 'wind'], ['雾', 'fog'], ['风', 'wind'],
  ['伞', 'umbrella'], ['撑伞', 'holding umbrella'], ['打伞', 'holding umbrella'],
  ['花瓣飘落', 'falling petals'],
  ['光斑', 'bokeh'], ['逆光', 'backlight'], ['柔光', 'soft lighting'],
  ['暖光', 'warm lighting'], ['冷光', 'cold lighting'], ['霓虹', 'neon lights'],

  // 人物名（东方 Project 等常见角色，中文名 → danbooru 标签）
  ['露米娅', 'rumia'], ['莉格露', 'wriggle nightbug'], ['灵梦', 'reimu hakurei'],
  ['博丽灵梦', 'reimu hakurei'], ['魔理沙', 'marisa kirisame'], ['雾雨魔理沙', 'marisa kirisame'],
  ['琪露诺', 'cirno'], ['芙兰朵露', 'flandre scarlet'], ['蕾米莉亚', 'remilia scarlet'],
  ['帕秋莉', 'patchouli knowledge'], ['咲夜', 'sakuya izayoi'], ['十六夜咲夜', 'sakuya izayoi'],
  ['妖梦', 'youmu konpaku'], ['幽幽子', 'yuyuko saigyouji'], ['早苗', 'sanae kochiya'],
  ['东风谷早苗', 'sanae kochiya'], ['文文', 'aya shameimaru'], ['射命丸文', 'aya shameimaru'],
  ['紫妈', 'yukari yakumo'], ['八云紫', 'yukari yakumo'], ['小恶魔', 'koakuma'],
  ['红美铃', 'hong meiling'], ['美铃', 'hong meiling'], ['爱丽丝', 'alice margatroid'],
  ['东方', 'touhou'], ['东方project', 'touhou'], ['东方的', 'touhou'],

  // 构图补充
  ['没有背景', 'simple background'], ['无背景', 'simple background'],
  ['纯色背景', 'simple background'], ['白底', 'white background'],
  ['黑底', 'black background'], ['仰视视角', 'from below'], ['俯视视角', 'from above'],
  ['低角度', 'from below'], ['高角度', 'from above'], ['倾斜构图', 'dutch angle'],
  ['正面视角', 'front view'], ['背视角', 'from behind'], ['主观视角', 'pov'],
  ['一人称视角', 'pov'], ['透视', 'perspective'],

  // 光线补充
  ['柔和的光线', 'soft lighting'], ['光线', 'lighting'], ['阳光', 'sunlight'],
  ['月光', 'moonlight'], ['灯光', 'lighting'], ['阴影', 'shadow'],
  ['头发飘动', 'floating hair'], ['衣服飘动', 'floating clothes'],
  ['背影', 'from behind'], ['侧身', 'three-quarter view'], ['侧脸轮廓', 'profile'],
  ['全身照', 'full body'], ['半身照', 'upper body'], ['特写镜头', 'close-up'],

  // 风格 / 质量
  ['杰作', 'masterpiece'], ['最高画质', 'best quality'], ['高质量', 'high quality'],
  ['高分辨率', 'highres'], ['超精细', 'absurdres'], ['赛璐璐', 'cel shading'],
  ['厚涂', 'thick painting'], ['水彩', 'watercolor'], ['素描', 'sketch'],
  ['像素风', 'pixel art'], ['复古', 'retro'], ['电影感', 'cinematic'],
  ['恐怖', 'horror'], ['可爱', 'cute'], ['帅气', 'cool'], ['唯美', 'beautiful'],
  ['写实', 'realistic'], ['二次元', 'anime'], ['动漫风格', 'anime style'],
  ['插画', 'illustration'], ['线稿', 'lineart'], ['黑白', 'monochrome'],
  ['彩色', 'colorful'], ['高对比', 'high contrast'],
];

// 第二轮扩充：背景/身体/NSFW/动作/服装/场景/光线/风格。
// 目标是让常见自由描述在离线状态下也能被切出来，减少丢字。
const EXTRA_PAIRS = [
  // 背景 / 构图
  ['背景', 'background'], ['简单背景', 'simple background'], ['纯白背景', 'white background'],
  ['透明背景', 'transparent background'], ['渐变背景', 'gradient background'],
  ['户外', 'outdoors'], ['室外', 'outdoors'], ['室内', 'indoors'],
  ['上半身', 'upper body'], ['下半身', 'lower body'], ['膝盖以上', 'cowboy shot'],
  ['手部', 'hands'], ['脚部', 'feet'], ['从下面', 'from below'], ['从上面', 'from above'],
  ['背面视角', 'from behind'], ['俯视角度', 'high angle'], ['仰视角度', 'low angle'],
  ['倾斜视角', 'dutch angle'], ['广角镜头', 'wide angle'],

  // 身体 / NSFW（danbooru 常用写法，不做模糊化）
  ['裸体', 'nude'], ['全裸', 'completely nude'], ['半裸', 'topless'],
  ['胸部', 'breasts'], ['大胸', 'large breasts'], ['巨乳', 'huge breasts'], ['小胸', 'small breasts'],
  ['乳头', 'nipples'], ['乳晕', 'areolae'], ['乳沟', 'cleavage'], ['露胸', 'breasts'],
  ['小穴', 'pussy'], ['阴部', 'pussy'], ['生殖器', 'pussy'], ['露出小穴', 'pussy'],
  ['能看到小穴', 'pussy'], ['湿了', 'wet'], ['爱液', 'pussy juice'],
  ['臀部', 'ass'], ['翘臀', 'ass'], ['大腿', 'thighs'],
  ['双腿分开', 'spread legs'], ['张开双腿', 'spread legs'], ['分开腿', 'spread legs'],
  ['掀起裙子', 'skirt lift'], ['掀裙', 'skirt lift'], ['撩起裙子', 'skirt lift'],
  ['掀起衣服', 'clothes lift'], ['内裤', 'panties'], ['露出内裤', 'panties'],
  ['情趣内衣', 'lingerie'], ['胸罩', 'bra'], ['没穿胸罩', 'no bra'],
  ['自慰', 'masturbation'], ['抚摸自己', 'touching self'], ['手指', 'fingers'],
  ['性行为', 'sex'], ['口交', 'fellatio'], ['骑乘位', 'girl on top'],
  ['射精', 'cum'], ['高潮', 'orgasm'], ['潮吹', 'squirting'],
  ['裸足', 'bare feet'], ['赤脚', 'bare feet'], ['nsfw', 'nsfw'],

  // 动作 / 姿态补充
  ['拥抱', 'hug'], ['亲吻', 'kiss'], ['牵手', 'holding hands'],
  ['交叉双腿', 'crossed legs'], ['盘腿坐', 'indian style'], ['跪坐', 'wariza'],
  ['趴着', 'on stomach'], ['侧躺', 'lying on side'], ['仰躺', 'on back'],
  ['举起手臂', 'arms up'], ['双手举起', 'arms up'], ['双手抱头', 'hands on own head'],
  ['抬起手臂', 'arm up'], ['手放胸前', 'hand on own chest'],
  ['看镜头', 'looking at viewer'], ['闭着嘴', 'closed mouth'], ['吐舌', 'tongue out'],
  ['喘气', 'breathing'], ['张嘴喘气', 'open mouth, breathing'],

  // 服装补充
  ['白丝', 'white pantyhose'], ['黑丝', 'black pantyhose'], ['渔网袜', 'fishnet pantyhose'],
  ['短裤', 'shorts'], ['热裤', 'short shorts'], ['背心', 'tank top'], ['吊带', 'camisole'],
  ['吊带裙', 'camisole dress'], ['礼服', 'evening gown'], ['婚纱', 'wedding dress'],
  ['军装', 'military uniform'], ['警察制服', 'police uniform'], ['护士服', 'nurse uniform'],
  ['兔女郎', 'bunny girl'], ['猫娘', 'cat girl'], ['女仆头饰', 'maid headdress'],
  ['围裙', 'apron'], ['丝带', 'ribbon'], ['颈圈', 'choker'],
  ['短袜', 'ankle socks'], ['白袜', 'white socks'], ['长筒袜', 'thighhighs'],

  // 场景补充
  ['街道夜景', 'street, night'], ['城市夜景', 'city lights, night'], ['雨中街道', 'rain, street'],
  ['水面', 'water'], ['泳池', 'pool'], ['游泳池', 'pool'], ['温泉', 'onsen'],
  ['浴室', 'bathroom'], ['床', 'bed'], ['沙发', 'couch'], ['阳台', 'balcony'],
  ['车站', 'train station'], ['列车', 'train'], ['电车', 'train'], ['商店街', 'shopping district'],
  ['神社台阶', 'shrine, stairs'], ['樱花庭院', 'courtyard, cherry blossoms'],
  ['雪景', 'snow, winter'], ['秋景', 'autumn'], ['夏日', 'summer'], ['海边日落', 'beach, sunset'],

  // 光线 / 质感
  ['逆光剪影', 'backlighting, silhouette'], ['舞台灯', 'stage lights'],
  ['发光', 'glowing'], ['镜头光晕', 'lens flare'], ['过曝', 'overexposure'],
  ['暖色调', 'warm colors'], ['冷色调', 'cold colors'], ['夜色室内', 'indoors, night'],

  // 风格 / 质量补充
  ['精细细节', 'detailed'], ['精致', 'detailed'], ['柔和阴影', 'soft shading'],
  ['厚涂风格', 'thick painting'], ['动漫风', 'anime style'], ['日系', 'anime'],
  ['写实风', 'realistic'], ['油画', 'oil painting'], ['水彩风', 'watercolor'],
  ['线稿风', 'lineart'], ['单色画', 'monochrome'],

  // 人数 / 关系
  ['三个女孩', '3girls'], ['一男一女', '1girl, 1boy'], ['男女', '1girl, 1boy'],

  // 成句动作：中文习惯说「把裙子掀起来」，词典要收整段说法
  ['把裙子掀起来', 'skirt lift'], ['裙子掀起来', 'skirt lift'], ['掀起裙子', 'skirt lift'],
  ['撩起裙子', 'skirt lift'], ['提起裙子', 'skirt lift'], ['掀裙子', 'skirt lift'],
  ['把衣服掀起来', 'clothes lift'], ['掀起衣服', 'clothes lift'], ['撩起衣服', 'clothes lift'],
  ['掀起上衣', 'clothes lift'], ['拉开衣服', 'clothes lift'],
  ['坐在', 'sitting'], ['坐在椅子上', 'sitting'], ['站在', 'standing'], ['躺在', 'lying'],
  ['靠在', 'leaning'], ['趴在', 'on stomach'], ['回头看', 'looking back'],
  ['回头看镜头', 'looking back'], ['看着镜头', 'looking at viewer'],
  ['分开双腿', 'spread legs'], ['双腿张开', 'spread legs'], ['双腿大张', 'spread legs'],
  ['抬起一条腿', 'leg up'], ['单腿站立', 'standing on one leg'],
  ['举起双手', 'arms up'], ['双手上举', 'arms up'], ['举手', 'arm up'],
  ['抱住膝盖', 'knees to chest'], ['抱着', 'hug'], ['抱住', 'hug'],
  ['抚摸', 'touching'], ['摸着', 'touching'], ['握着', 'holding'],

  // 站/坐/躺的常见口语形态 + 窗景
  ['站着', 'standing'], ['躺着', 'lying'], ['趴着看', 'on stomach'], ['跪在', 'kneeling'],
  ['窗边', 'window'], ['窗户', 'window'], ['照进来', 'sunlight'], ['光线照进来', 'sunlight'],
  ['逆光站着', 'backlighting, standing'],
];

// 功能性虚词：切到就当标点处理，不算「未收录」。否则「的/了/在」会让自动模式误判丢字。
const STOPWORDS = [
  '的', '了', '着', '把', '被', '在', '和', '与', '又', '还', '也', '是', '有', '就', '都',
  '很', '地', '得', '并', '而', '里', '中', '上', '下', '然后', '接着', '并且', '起来',
  '出来', '进去', '过来', '一下', '一个', '一种', '这个', '那个', '这样', '那样', '那么',
  '能看到', '看得到', '可以看见', '显得', '感觉', '似乎', '好像', '非常', '十分', '特别',
  '穿着', '戴着', '身穿', '身着', '穿上', '换上', '是很', '有点', '稍微', '一些',
].sort((a, b) => b.length - a.length);

// 合并词表：先用手写词条（针对 danbooru 调过），再用大词库补齐；
// 同一中文先到先得，避免大词库里的口语写法盖掉「少女→1girl」这种更准的映射。
const SEEN_ZH = new Set();
const PAIRS = [];
for (const [zh, en] of [...CURATED_PAIRS, ...EXTRA_PAIRS, ...BIG_PAIRS]) {
  const key = String(zh || '').trim();
  const value = String(en || '').trim();
  if (!key || !value || SEEN_ZH.has(key)) continue;
  SEEN_ZH.add(key);
  PAIRS.push([key, value]);
}

const SORTED = PAIRS.slice().sort((a, b) => b[0].length - a[0].length);

// 颜色 + 物件 的组合规则，处理「红色眼睛」「黑色长裙」这类词典没逐条收录的说法。
const COLORS = [
  ['红色', 'red'], ['金色', 'gold'], ['银色', 'silver'], ['白色', 'white'],
  ['黑色', 'black'], ['蓝色', 'blue'], ['绿色', 'green'], ['紫色', 'purple'],
  ['粉色', 'pink'], ['棕色', 'brown'], ['褐色', 'brown'], ['橙色', 'orange'],
  ['灰色', 'grey'], ['红', 'red'], ['金', 'gold'], ['银', 'silver'],
  ['白', 'white'], ['黑', 'black'], ['蓝', 'blue'], ['绿', 'green'],
  ['紫', 'purple'], ['粉', 'pink'], ['棕', 'brown'], ['褐', 'brown'],
  ['橙', 'orange'], ['灰', 'grey'],
];

const OBJECTS = [
  ['长连衣裙', 'long dress'], ['连衣裙', 'dress'], ['长裙', 'long dress'],
  ['短裙', 'skirt'], ['裙子', 'skirt'], ['裙', 'skirt'],
  ['头发', 'hair'], ['长发', 'long hair'], ['短发', 'short hair'],
  ['眼睛', 'eyes'], ['眼眸', 'eyes'], ['瞳孔', 'eyes'], ['瞳', 'eyes'], ['眼', 'eyes'],
  ['衬衫', 'shirt'], ['外套', 'jacket'], ['铠甲', 'armor'],
  ['丝袜', 'pantyhose'], ['鞋子', 'shoes'], ['靴子', 'boots'],
  ['手套', 'gloves'], ['翅膀', 'wings'],
];

// 同一个颜色在不同物件上的英文习惯不同。
function colorFor(colorEn, objectEn) {
  if (objectEn === 'hair') return colorEn === 'gold' ? 'blonde' : colorEn;
  if (objectEn === 'eyes') return colorEn === 'gold' ? 'yellow' : colorEn;
  if (objectEn === 'gold') return 'gold';
  return colorEn === 'gold' ? 'golden' : colorEn;
}

function matchCompound(part, i) {
  for (const [cnColor, enColor] of COLORS) {
    if (!part.startsWith(cnColor, i)) continue;
    const rest = i + cnColor.length;
    for (const [cnObj, enObj] of OBJECTS) {
      if (!part.startsWith(cnObj, rest)) continue;
      return {
        cn: cnColor + cnObj,
        tokens: [`${colorFor(enColor, enObj)} ${enObj}`],
      };
    }
  }
  return null;
}

const HAS_CJK = /[\u4e00-\u9fff]/;

export function hasChinese(text) {
  return HAS_CJK.test(String(text || ''));
}

export function translateCN(text, options = {}) {
  const raw = String(text || '').trim();
  if (!raw) return { text: '', matched: 0, dropped: 0, leftover: '', changed: false, characters: [] };

  const parts = raw
    .split(/[,，、;；\n\r/|]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const out = [];
  let matched = 0;
  let dropped = 0;
  const leftover = [];

  for (const part of parts) {
    if (!HAS_CJK.test(part)) {
      out.push(part.replace(/\s+/g, ' '));
      continue;
    }
    const tokens = [];
    let i = 0;
    while (i < part.length) {
      const compound = matchCompound(part, i);
      if (compound) {
        tokens.push(...compound.tokens);
        matched += 1;
        i += compound.cn.length;
        continue;
      }
      let hit;
      for (const [cn, en] of SORTED) {
        if (part.startsWith(cn, i)) {
          hit = [cn, en];
          break;
        }
      }
      if (hit) {
        tokens.push(hit[1]);
        matched += 1;
        i += hit[0].length;
      } else {
        // 虚词不计入未收录，避免「的/了/在」把自动模式推向模型。
        const filler = STOPWORDS.find((word) => part.startsWith(word, i));
        if (filler) {
          i += filler.length;
          continue;
        }
        dropped += 1;
        leftover.push(part[i]);
        i += 1;
      }
    }
    out.push(...tokens);
  }

  const seen = new Set();
  const uniq = [];
  for (const token of out) {
    for (const single of token.split(',').map((s) => s.trim()).filter(Boolean)) {
      const key = single.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      uniq.push(single);
    }
  }

  // 角色名命中后可以顺带补上外观标签（发色/瞳色/服装…），由调用方决定开不开。
  const characters = [];
  if (options.appearance) {
    for (const token of uniq.slice()) {
      const hit = CHAR_INDEX.get(token.toLowerCase());
      if (!hit) continue;
      characters.push(hit.tag);
      for (const extra of hit.appearance) {
        const key = extra.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        uniq.push(extra);
      }
    }
  }

  const result = uniq.join(', ');
  return { text: result, matched, dropped, leftover: leftover.join(''), changed: result !== raw, characters };
}

export const DICTIONARY_SIZE = PAIRS.length;
export const CHARACTER_COUNT = CHARACTERS.length;
export const PRESET_COUNT = PRESETS.length;
export const DICTIONARY_CATEGORIES = 32;
