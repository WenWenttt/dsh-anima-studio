// 由 Prompt Forge v3.0 的标签库生成；数据只在本地使用。
// 结构：
//   TAG_LINES  每行「中文|english」，按中文长度倒序，便于最长匹配
//   CHARACTERS 角色：names 中文名/带作品名，tag danbooru 角色标签，auto 外观标签
//   PRESETS    场景模板：tags 为英文标签数组
//   ARTISTS    画师风格：en 标签 / zh 中文名
//   NEGATIVES  负面标签库
//
// 统计：3475 条中文映射 / 507 个角色 / 26 个预设 / 106 个画师 / 134 条负面

export const TAG_LINES = `
Saber（Fate/stay night）|saber (fate)
井之上泷奈（Lycoris Recoil）|inoue takina
樱岛麻衣（青春猪头少年不会梦到兔女郎学姐）|sakurajima mai
锦木千束（Lycoris Recoil）|nishikigi chisato
爱蜜莉雅（Re:从零开始的异世界生活）|emilia (re:zero)
艾姬多娜（Re:从零开始的异世界生活）|echidna (re:zero)
薇尔莉特·伊芙加登（紫罗兰永恒花园）|violet evergarden
雷姆（Re:从零开始的异世界生活）|rem (re:zero)
四宫辉夜（辉夜大小姐想让我告白）|shinomiya kaguya
藤原千花（辉夜大小姐想让我告白）|fujiwara chika
早坂爱（辉夜大小姐想让我告白）|hayasaka ai
喜多川海梦（更衣人偶坠入爱河）|kitagawa marin
惠惠（为美好的世界献上祝福！）|megumin
骄傲的垃圾桶（崩坏：星穹铁道）|lordly trashcan (honkai: star rail)
黑塔（人偶）（崩坏：星穹铁道）|herta (puppet) (honkai: star rail)
姬子（少女）（崩坏：星穹铁道）|himeko (young) (honkai: star rail)
阿尔敏·阿诺德（进击的巨人）|armin arlert
五条新菜（更衣人偶坠入爱河）|gojou wakana
布洛妮娅（崩坏：星穹铁道）|bronya (honkai: star rail)
丽日御茶子（我的英雄学院）|uraraka ochaco
渡我被身子（我的英雄学院）|toga himiko
三笠·阿克曼（进击的巨人）|mikasa ackerman
艾伦·耶格尔（进击的巨人）|eren yeager
真理医生（崩坏：星穹铁道）|dr. ratio (honkai: star rail)
阿格莱雅（崩坏：星穹铁道）|aglaea (honkai: star rail)
螺丝咕姆（崩坏：星穹铁道）|screwllum (honkai: star rail)
钟表小子（崩坏：星穹铁道）|clockie (honkai: star rail)
卡卡瓦夏（崩坏：星穹铁道）|kakavasha (honkai: star rail)
芮克先生（崩坏：星穹铁道）|mr. reca (honkai: star rail)
制服领口微微解开一颗扣子|uniform collar slightly unbuttoned
三月七（崩坏：星穹铁道）|march 7th (honkai: star rail)
瓦尔特（崩坏：星穹铁道）|welt (honkai: star rail)
卡芙卡（崩坏：星穹铁道）|kafka (honkai: star rail)
克拉拉（崩坏：星穹铁道）|clara (honkai: star rail)
杰帕德（崩坏：星穹铁道）|gepard (honkai: star rail)
黑天鹅（崩坏：星穹铁道）|black swan (honkai: star rail)
知更鸟（崩坏：星穹铁道）|robin (honkai: star rail)
修塔尔克（葬送的芙莉莲）|stark (sousou no frieren)
绿谷出久（我的英雄学院）|midoriya izuku
爆豪胜己（我的英雄学院）|bakugou katsuki
蒙奇·D·路飞（海贼王）|monkey d. luffy
罗罗诺亚·索隆（海贼王）|roronoa zoro
约尔·福杰（间谍过家家）|yor briar
大黑塔（崩坏：星穹铁道）|the herta (honkai: star rail)
星期日（崩坏：星穹铁道）|sunday (honkai: star rail)
阮·梅（崩坏：星穹铁道）|ruan mei (honkai: star rail)
波提欧（崩坏：星穹铁道）|boothill (honkai: star rail)
忘归人（崩坏：星穹铁道）|fugue (honkai: star rail)
艾丝妲（崩坏：星穹铁道）|asta (honkai: star rail)
桂乃芬（崩坏：星穹铁道）|guinaifen (honkai: star rail)
加拉赫（崩坏：星穹铁道）|gallagher (honkai: star rail)
娜塔莎（崩坏：星穹铁道）|natasha (honkai: star rail)
史瓦罗（崩坏：星穹铁道）|svarog (honkai: star rail)
纳努克（崩坏：星穹铁道）|nanook (honkai: star rail)
呜呜伯（崩坏：星穹铁道）|wubbaboo (honkai: star rail)
斯科特（崩坏：星穹铁道）|skott (honkai: star rail)
莱古斯（崩坏：星穹铁道）|lygus (honkai: star rail)
阿奎拉（崩坏：星穹铁道）|aquila (honkai: star rail)
开拓者（崩坏：星穹铁道）|trailblazer (honkai: star rail)
赛飞儿（崩坏：星穹铁道）|cipher (honkai: star rail)
长夜月（崩坏：星穹铁道）|evernight (honkai: star rail)
海瑟音（崩坏：星穹铁道）|hysilens (honkai: star rail)
那刻夏（崩坏：星穹铁道）|anaxa (honkai: star rail)
手指轻轻碰着自己的嘴唇|fingers gently touching own lips
面无表情掩藏着内心情绪|expressionless face hiding inner feelings
咬紧牙关露出坚定的神色|determined look with clenched jaw
丹恒（崩坏：星穹铁道）|dan heng (honkai: star rail)
姬子（崩坏：星穹铁道）|himeko (honkai: star rail)
银狼（崩坏：星穹铁道）|silver wolf (honkai: star rail)
希儿（崩坏：星穹铁道）|seele (honkai: star rail)
佩拉（崩坏：星穹铁道）|pela (honkai: star rail)
虎克（崩坏：星穹铁道）|hook (honkai: star rail)
白露（崩坏：星穹铁道）|bailu (honkai: star rail)
景元（崩坏：星穹铁道）|jing yuan
停云（崩坏：星穹铁道）|tingyun (honkai: star rail)
罗刹（崩坏：星穹铁道）|luocha (honkai: star rail)
符玄（崩坏：星穹铁道）|fu xuan (honkai: star rail)
镜流（崩坏：星穹铁道）|jingliu (honkai: star rail)
托帕（崩坏：星穹铁道）|topaz (honkai: star rail)
藿藿（崩坏：星穹铁道）|huohuo (honkai: star rail)
花火（崩坏：星穹铁道）|sparkle (honkai: star rail)
黄泉（崩坏：星穹铁道）|acheron (honkai: star rail)
流萤（崩坏：星穹铁道）|firefly (honkai: star rail)
砂金（崩坏：星穹铁道）|aventurine (honkai: star rail)
芙莉莲（葬送的芙莉莲）|frieren
辛美尔（葬送的芙莉莲）|himmel (sousou no frieren)
阿乌拉（葬送的芙莉莲）|aura (sousou no frieren)
赛莉艾（葬送的芙莉莲）|serie (sousou no frieren)
尤贝尔（葬送的芙莉莲）|ubel (sousou no frieren)
钉崎野蔷薇（咒术回战）|kugisaki nobara
灶门炭治郎（鬼灭之刃）|kamado tanjirou
灶门祢豆子（鬼灭之刃）|kamado nezuko
嘴平伊之助（鬼灭之刃）|hashibira inosuke
炼狱杏寿郎（鬼灭之刃）|rengoku kyoujurou
轰焦冻（我的英雄学院）|todoroki shoto
伊地知虹夏（孤独摇滚）|ijichi nijika
星野露比（我推的孩子）|hoshino ruby
猫猫（药屋少女的呢喃）|maomao (kusuriya no hitorigoto)
黑塔（崩坏：星穹铁道）|herta (honkai: star rail)
飞霄（崩坏：星穹铁道）|feixiao (honkai: star rail)
迷迷（崩坏：星穹铁道）|mem (honkai: star rail)
云璃（崩坏：星穹铁道）|yunli (honkai: star rail)
缇宝（崩坏：星穹铁道）|tribbie (honkai: star rail)
萨姆（崩坏：星穹铁道）|sam (honkai: star rail)
瑶光（崩坏：星穹铁道）|yao guang (honkai: star rail)
灵砂（崩坏：星穹铁道）|lingsha (honkai: star rail)
翡翠（崩坏：星穹铁道）|jade (honkai: star rail)
青雀（崩坏：星穹铁道）|qingque (honkai: star rail)
椒丘（崩坏：星穹铁道）|jiaoqiu (honkai: star rail)
乱破（崩坏：星穹铁道）|rappa (honkai: star rail)
账账（崩坏：星穹铁道）|numby (honkai: star rail)
彦卿（崩坏：星穹铁道）|yanqing (honkai: star rail)
缇安（崩坏：星穹铁道）|trianne (honkai: star rail)
缇宁（崩坏：星穹铁道）|trinnon (honkai: star rail)
素裳（崩坏：星穹铁道）|sushang (honkai: star rail)
银枝（崩坏：星穹铁道）|argenti (honkai: star rail)
貊泽（崩坏：星穹铁道）|moze (honkai: star rail)
应星（崩坏：星穹铁道）|yingxing (honkai: star rail)
驭空（崩坏：星穹铁道）|yukong (honkai: star rail)
寒鸦（崩坏：星穹铁道）|hanya (honkai: star rail)
米沙（崩坏：星穹铁道）|misha (honkai: star rail)
雪衣（崩坏：星穹铁道）|xueyi (honkai: star rail)
丹枫（崩坏：星穹铁道）|dan feng (honkai: star rail)
尾巴（崩坏：星穹铁道）|tail (honkai: star rail)
白厄（崩坏：星穹铁道）|phainon (honkai: star rail)
昔涟（崩坏：星穹铁道）|cyrene (honkai: star rail)
万敌（崩坏：星穹铁道）|mydei (honkai: star rail)
卢卡（崩坏：星穹铁道）|luka (honkai: star rail)
阿兰（崩坏：星穹铁道）|arlan (honkai: star rail)
白珩（崩坏：星穹铁道）|baiheng (honkai: star rail)
药师（崩坏：星穹铁道）|yaoshi (honkai: star rail)
阿哈（崩坏：星穹铁道）|aha (honkai: star rail)
谛听（崩坏：星穹铁道）|diting (honkai: star rail)
呼雷（崩坏：星穹铁道）|hoolay (honkai: star rail)
佩佩（崩坏：星穹铁道）|peppy (honkai: star rail)
风堇（崩坏：星穹铁道）|hyacine (honkai: star rail)
遐蝶（崩坏：星穹铁道）|castorice (honkai: star rail)
帕姆（崩坏：星穹铁道）|pom-pom (honkai: star rail)
格雷格·鲁特科夫斯基|greg rutkowski
目光追随着移动的东西|eyes following something moving past
丝带和系带松松地飘动|ribbons and straps fluttering loosely
披风在身后夸张地展开|cape flaring out dramatically behind
德克萨斯（明日方舟）|texas (arknights)
拉普兰德（明日方舟）|lappland (arknights)
史尔特尔（明日方舟）|surtr (arknights)
艾雅法拉（明日方舟）|ifrit (arknights)
普罗旺斯（明日方舟）|provence (arknights)
莫斯提马（明日方舟）|mostima (arknights)
刃（崩坏：星穹铁道）|blade (honkai: star rail)
上官婉儿（王者荣耀）|shangguan (honor of kings)
马可波罗（王者荣耀）|marco_polo (honor of kings)
不知火舞（王者荣耀）|shiranui_mai (honor of kings)
娜可露露（王者荣耀）|nakoruru (honor of kings)
百里玄策（王者荣耀）|xuance (honor of kings)
百里守约（王者荣耀）|shouyue (honor of kings)
菲伦（葬送的芙莉莲）|fern (sousou no frieren)
艾泽（葬送的芙莉莲）|eisen (sousou no frieren)
兰泽（葬送的芙莉莲）|land (sousou no frieren)
虎杖悠仁（咒术回战）|itadori yuji
伏黑甚尔（咒术回战）|fushiguro toji
两面宿傩（咒术回战）|ryoumen sukuna (jujutsu kaisen)
我妻善逸（鬼灭之刃）|agatsuma zenitsu
利威尔（进击的巨人）|levi (shingeki no kyojin)
妮可·罗宾（海贼王）|nico robin
后藤一里（孤独摇滚）|gotoh hitori
喜多郁代（孤独摇滚）|kita ikuyo
星野爱（我推的孩子）|hoshino ai
阿尼亚（间谍过家家）|anya (spy x family)
漩涡鸣人（火影忍者）|uzumaki naruto
安洁莉娜（明日方舟）|angelina (arknights)
霍尔海雅（明日方舟）|ho'olheyak (arknights)
缪尔赛思（明日方舟）|muelsyse (arknights)
特蕾西娅（明日方舟）|theresa (arknights)
推进之王（明日方舟）|siege (arknights)
菲亚梅塔（明日方舟）|fiammetta (arknights)
歌蕾蒂娅（明日方舟）|gladiia (arknights)
普瑞赛斯（明日方舟）|priestess (arknights)
薇薇安娜（明日方舟）|viviana (arknights)
维什戴尔（明日方舟）|wis'adel (arknights)
留云借风真君（原神）|cloud retainer (genshin impact)
星（崩坏：星穹铁道）|stelle (honkai: star rail)
穹（崩坏：星穹铁道）|caelus (honkai: star rail)
卢克·赫尔森（鸣潮）|luuk herssen (wuthering waves)
伊利亚·库夫希诺夫|ilya kuvshinov
脸红得厉害别过头去|blushing furiously while looking away
呆呆地望着前方发呆|staring blankly into space
眼里含泪强忍着不哭|teary eyes holding back tears
被阳光晃得眯起眼睛|squinting against bright sunlight
阿米娅（明日方舟）|amiya (arknights)
凯尔希（明日方舟）|kal'tsit (arknights)
能天使（明日方舟）|exusiai (arknights)
斯卡蒂（明日方舟）|skadi (arknights)
幽灵鲨（明日方舟）|specter (arknights)
迷迭香（明日方舟）|rosmontis (arknights)
麦哲伦（明日方舟）|magallan (arknights)
白面鸮（明日方舟）|ptilopsis (arknights)
珊瑚宫心海（原神）|sangonomiya kokomi
佳代子（蔚蓝档案）|kayoko (blue archive)
日富美（蔚蓝档案）|hifumi (blue archive)
爱丽丝（蔚蓝档案）|aris (blue archive)
明日奈（蔚蓝档案）|asuna (blue archive)
孙尚香（王者荣耀）|lady_sun (honor of kings)
诸葛亮（王者荣耀）|kongming (honor of kings)
花木兰（王者荣耀）|mulan (honor of kings)
武则天（王者荣耀）|wu_zetian (honor of kings)
杨玉环（王者荣耀）|yuhuan (honor of kings)
兰陵王（王者荣耀）|lanling_wang (honor of kings)
狄仁杰（王者荣耀）|di_renjie (honor of kings)
米莱狄（王者荣耀）|milady (honor of kings)
雅典娜（王者荣耀）|athena (honor of kings)
司马懿（王者荣耀）|sima_yi (honor of kings)
安琪拉（王者荣耀）|angela (honor of kings)
夏洛特（王者荣耀）|charlotte (honor of kings)
朵莉亚（王者荣耀）|dolia (honor of kings)
五条悟（咒术回战）|gojo satoru
伏黑惠（咒术回战）|fushiguro megumi
蝴蝶忍（鬼灭之刃）|kochou shinobu
猗窝座（鬼灭之刃）|akaza (kimetsu no yaiba)
山田凉（孤独摇滚）|yamada ryo
玛露希尔（迷宫饭）|marcille donato
奇尔查克（迷宫饭）|chilchuck tims
洁世一（蓝色监狱）|isagi yoichi
蜂乐回（蓝色监狱）|bachira meguru
苏苏洛（明日方舟）|sussurro (arknights)
艾丽妮（明日方舟）|irene (arknights)
塞雷娅（明日方舟）|saria (arknights)
羽毛笔（明日方舟）|la pluma (arknights)
刻俄柏（明日方舟）|ceobe (arknights)
诗怀雅（明日方舟）|swire (arknights)
杰西卡（明日方舟）|jessica (arknights)
塔露拉（明日方舟）|talulah (arknights)
桃金娘（明日方舟）|myrtle (arknights)
食铁兽（明日方舟）|feater (arknights)
龙舌兰（明日方舟）|tequila (arknights)
华法琳（明日方舟）|warfarin (arknights)
芙兰卡（明日方舟）|franka (arknights)
嘉维尔（明日方舟）|gavial (arknights)
弑君者（明日方舟）|crownslayer (arknights)
克洛丝（明日方舟）|kroos (arknights)
逻各斯（明日方舟）|logos (arknights)
送葬人（明日方舟）|executor (arknights)
帕拉斯（明日方舟）|pallas (arknights)
伊内丝（明日方舟）|ines (arknights)
多萝西（明日方舟）|dorothy (arknights)
玛恩纳（明日方舟）|mlynar (arknights)
戴因斯雷布（原神）|dainsleif (genshin impact)
克里斯托弗（鸣潮）|cristoforo (wuthering waves)
芙洛拉夫人（鸣潮）|lady flora (wuthering waves)
埃拉托（明日方舟）|erato (arknights)
2000年代风格|2000s style
弗兰克·法拉捷特|frank frazetta
克雷格·麦克拉肯|craig mccracken
Octane渲染|octane render
挑着一边眉毛坏笑|smirking with one eyebrow raised
睡眼惺忪半睁着眼|sleepy expression with half-lidded eyes
坐在台阶上系鞋带|sitting on stairs tying shoelaces
银灰（明日方舟）|silverash (arknights)
泥岩（明日方舟）|mudrock (arknights)
铃兰（明日方舟）|suzuran (arknights)
白金（明日方舟）|platinum (arknights)
蓝毒（明日方舟）|blue poison (arknights)
夜莺（明日方舟）|nightingale (arknights)
闪灵（明日方舟）|shining (arknights)
天火（明日方舟）|skyfire (arknights)
早露（明日方舟）|rosa (arknights)
森蚺（明日方舟）|eunectes (arknights)
傀影（明日方舟）|phantom (arknights)
雷电将军（原神）|raiden shogun
神里绫华（原神）|kamisato ayaka (genshin impact)
八重神子（原神）|yae miko
枫原万叶（原神）|kaedehara kazuha
那维莱特（原神）|neuvillette (genshin impact)
白子（蔚蓝档案）|shiroko (blue archive)
星野（蔚蓝档案）|hoshino (blue archive)
芹香（蔚蓝档案）|serika (blue archive)
野宫（蔚蓝档案）|nonomi (blue archive)
绫音（蔚蓝档案）|ayane (blue archive)
优香（蔚蓝档案）|yuuka (blue archive)
诺亚（蔚蓝档案）|noa (blue archive)
阿露（蔚蓝档案）|aru (blue archive)
睦月（蔚蓝档案）|mutsuki (blue archive)
春香（蔚蓝档案）|haruna (blue archive)
日奈（蔚蓝档案）|hina (blue archive)
伊织（蔚蓝档案）|iori (blue archive)
千夏（蔚蓝档案）|chinatsu (blue archive)
亚子（蔚蓝档案）|ako (blue archive)
小春（蔚蓝档案）|koharu (blue archive)
花子（蔚蓝档案）|hanako (blue archive)
未花（蔚蓝档案）|mika (blue archive)
圣亚（蔚蓝档案）|seia (blue archive)
鹤城（蔚蓝档案）|tsurugi (blue archive)
莲见（蔚蓝档案）|hasumi (blue archive)
真白（蔚蓝档案）|mashiro (blue archive)
桃井（蔚蓝档案）|momoi (blue archive)
柚子（蔚蓝档案）|yuzu (blue archive)
香琳（蔚蓝档案）|karin (blue archive)
若藻（蔚蓝档案）|wakamo (blue archive)
貂蝉（王者荣耀）|diaochan (honor of kings)
小乔（王者荣耀）|xiao_qiao (honor of kings)
大乔（王者荣耀）|da_qiao (honor of kings)
李白（王者荣耀）|li_bai (honor of kings)
妲己（王者荣耀）|daji (honor of kings)
甄姬（王者荣耀）|lady_zhen (honor of kings)
虞姬（王者荣耀）|consort_yu (honor of kings)
嬴政（王者荣耀）|ying_zheng (honor of kings)
白起（王者荣耀）|bai_qi (honor of kings)
周瑜（王者荣耀）|zhou_yu (honor of kings)
马超（王者荣耀）|ma_chao (honor of kings)
孙策（王者荣耀）|sun_ce (honor of kings)
嫦娥（王者荣耀）|chang'e (honor of kings)
女娲（王者荣耀）|nuwa (honor of kings)
李信（王者荣耀）|li_xin (honor of kings)
亚连（王者荣耀）|allain (honor of kings)
弈星（王者荣耀）|yixing (honor of kings)
赵云（王者荣耀）|zilong (honor of kings)
堕姬（鬼灭之刃）|daki (kimetsu no yaiba)
玛奇玛（电锯人）|makima (chainsaw man)
早川秋（电锯人）|hayakawa aki
莱欧斯（迷宫饭）|laios touden
埼玉（一拳超人）|saitama (one-punch man)
龙卷（一拳超人）|tatsumaki
黑崎一护（死神）|kurosaki ichigo
澄闪（明日方舟）|goldenglow (arknights)
星熊（明日方舟）|hoshiguma (arknights)
塑心（明日方舟）|virtuosa (arknights)
重岳（明日方舟）|chongyue (arknights)
苇草（明日方舟）|reed (arknights)
初雪（明日方舟）|pramanix (arknights)
提丰（明日方舟）|typhon (arknights)
赫默（明日方舟）|silence (arknights)
水月（明日方舟）|mizuki (arknights)
临光（明日方舟）|nearl (arknights)
霜星（明日方舟）|frostnova (arknights)
斥罪（明日方舟）|penance (arknights)
鞭刃（明日方舟）|whislash (arknights)
嵯峨（明日方舟）|saga (arknights)
风笛（明日方舟）|bagpipe (arknights)
瑕光（明日方舟）|blemishine (arknights)
极光（明日方舟）|aurora (arknights)
霜叶（明日方舟）|frostleaf (arknights)
棘刺（明日方舟）|thorns (arknights)
雷蛇（明日方舟）|liskarm (arknights)
凛冬（明日方舟）|zima (arknights)
星极（明日方舟）|astesia (arknights)
巫恋（明日方舟）|shamare (arknights)
古米（明日方舟）|gummy (arknights)
号角（明日方舟）|horn (arknights)
黑键（明日方舟）|ebenholz (arknights)
琴柳（明日方舟）|saileach (arknights)
可颂（明日方舟）|croissant (arknights)
达达利亚（原神）|tartaglia (genshin impact)
阿蕾奇诺（原神）|arlecchino (genshin impact)
茜特菈莉（原神）|citlali (genshin impact)
艾尔海森（原神）|alhaitham (genshin impact)
克洛琳德（原神）|clorinde (genshin impact)
莱欧斯利（原神）|wriothesley (genshin impact)
罗莎莉亚（原神）|rosaria (genshin impact)
艾梅莉埃（原神）|emilie (genshin impact)
潘塔罗涅（原神）|pantalone (genshin impact)
芙卡洛斯（原神）|focalors (genshin impact)
卡提希娅（鸣潮）|cartethyia (wuthering waves)
坎特蕾拉（鸣潮）|cantarella (wuthering waves)
奥古斯塔（鸣潮）|augusta (wuthering waves)
玛格丽特（鸣潮）|margherita (wuthering waves)
四月（明日方舟）|april (arknights)
2024年风格|year_2024
2025年风格|year_2025
克伦兹·库沙特|krenz cushart
鲍里斯·瓦列霍|boris vallejo
何塞·冈萨雷斯|josan gonzalez
杰里米·利普金|jeremy lipking
诺曼·洛克威尔|norman rockwell
迈克·米格诺拉|mike mignola
鼓起脸颊撅着嘴|pouting with puffed out cheeks
牵着手一起跳舞|dancing together with hands linked
红色长发公主切|hime cut
陈（明日方舟）|ch'en (arknights)
W（明日方舟）|w (arknights)
砾（明日方舟）|gravel (arknights)
令（明日方舟）|ling (arknights)
夕（明日方舟）|dusk (arknights)
芭芭拉（原神）|barbara (genshin impact)
迪卢克（原神）|diluc (genshin impact)
菲谢尔（原神）|fischl (genshin impact)
诺艾尔（原神）|noelle (genshin impact)
纳西妲（原神）|nahida (genshin impact)
迪希雅（原神）|dehya (genshin impact)
芙宁娜（原神）|furina (genshin impact)
娜维娅（原神）|navia (genshin impact)
漂泊者（鸣潮）|rover (wuthering waves)
卡卡罗（鸣潮）|calcharo (wuthering waves)
莫特斐（鸣潮）|mortefi (wuthering waves)
相里要（鸣潮）|xiangli yao (wuthering waves)
守岸人（鸣潮）|shorekeeper (wuthering waves)
维里奈（鸣潮）|verina (wuthering waves)
梓（蔚蓝档案）|azusa (blue archive)
渚（蔚蓝档案）|nagisa (blue archive)
绿（蔚蓝档案）|midori (blue archive)
时（蔚蓝档案）|toki (blue archive)
澜（王者荣耀）|lam (honor of kings)
镜（王者荣耀）|jing (honor of kings)
瑶（王者荣耀）|yao (honor of kings)
阿尔敏·阿诺德|armin arlert
电次（电锯人）|denji (chainsaw man)
帕瓦（电锯人）|power (chainsaw man)
蒙奇·D·路飞|monkey d. luffy
罗罗诺亚·索隆|roronoa zoro
娜美（海贼王）|nami (one piece)
先西（迷宫饭）|senshi (dungeon meshi)
法琳（迷宫饭）|falin touden
黍（明日方舟）|shu (arknights)
年（明日方舟）|nian (arknights)
山（明日方舟）|mountain (arknights)
煌（明日方舟）|blaze (arknights)
宴（明日方舟）|utage (arknights)
黑（明日方舟）|schwarz (arknights)
吽（明日方舟）|hung (arknights)
红（明日方舟）|projekt red (arknights)
空（明日方舟）|sora (arknights)
提纳里（原神）|tighnari (genshin impact)
坎蒂丝（原神）|candace (genshin impact)
莱依拉（原神）|layla (genshin impact)
珐露珊（原神）|faruzan (genshin impact)
绮良良（原神）|kirara (genshin impact)
琳妮特（原神）|lynette (genshin impact)
菲米尼（原神）|freminet (genshin impact)
希格雯（原神）|sigewinne (genshin impact)
玛薇卡（原神）|mavuika (genshin impact)
希诺宁（原神）|xilonen (genshin impact)
基尼奇（原神）|kinich (genshin impact)
玛拉妮（原神）|mualani (genshin impact)
卡齐娜（原神）|kachina (genshin impact)
欧洛伦（原神）|ororon (genshin impact)
瓦蕾莎（原神）|varesa (genshin impact)
爱可菲（原神）|escoffier (genshin impact)
丝柯克（原神）|skirk (genshin impact)
艾丽丝（原神）|alice (genshin impact)
迪奥娜（原神）|diona (genshin impact)
班尼特（原神）|bennett (genshin impact)
夏洛蒂（原神）|charlotte (genshin impact)
阿贝多（原神）|albedo (genshin impact)
夏沃蕾（原神）|chevreuse (genshin impact)
恰斯卡（原神）|chasca (genshin impact)
伊安珊（原神）|iansan (genshin impact)
法尔伽（原神）|varka (genshin impact)
珂莱塔（鸣潮）|carlotta (wuthering waves)
弗洛洛（鸣潮）|phrolova (wuthering waves)
布兰特（鸣潮）|brant (wuthering waves)
洛可可（鸣潮）|roccia (wuthering waves)
哥舒临（鸣潮）|geshu lin (wuthering waves)
无冠者（鸣潮）|crownless (wuthering waves)
无梦者（鸣潮）|dreamless (wuthering waves)
赫卡忒（鸣潮）|hecate (wuthering waves)
利维坦（鸣潮）|leviathan (wuthering waves)
迷迭香（鸣潮）|rosemary (wuthering waves)
80年代风格|1980s style
90年代风格|1990s style
视觉小说风格|visual novel style
吉卜力工作室|studio ghibli
阿良々木圭一|keiichi arawi
安德斯·佐恩|anders zorn
杰米·休莱特|jamie hewlett
丽贝卡·舒格|rebecca sugar
四分之三侧面|three-quarter view
黄金比例构图|golden ratio
第一人称视角|pov
85毫米镜头|85mm lens
50毫米镜头|50mm lens
35毫米镜头|35mm lens
24毫米镜头|24mm lens
屏幕空间反射|screen space reflections
模拟照片质感|analog photo
虚幻引擎画质|unreal engine
盘腿坐在地上|sitting cross-legged on the floor
抱着膝盖坐着|hugging own knees while sitting
公共场所性爱|public sex
阴茎上的精液|cum on penis
派蒙（原神）|paimon (genshin impact)
安柏（原神）|amber (genshin impact)
丽莎（原神）|lisa (genshin impact)
凯亚（原神）|kaeya (genshin impact)
温迪（原神）|venti (genshin impact)
可莉（原神）|klee (genshin impact)
莫娜（原神）|mona (genshin impact)
刻晴（原神）|keqing (genshin impact)
七七（原神）|qiqi (genshin impact)
凝光（原神）|ningguang (genshin impact)
甘雨（原神）|ganyu (genshin impact)
胡桃（原神）|hu tao (genshin impact)
宵宫（原神）|yoimiya (genshin impact)
妮露（原神）|nilou (genshin impact)
申鹤（原神）|shenhe (genshin impact)
优菈（原神）|eula (genshin impact)
秧秧（鸣潮）|yangyang (wuthering waves)
炽霞（鸣潮）|chixia (wuthering waves)
白芷（鸣潮）|baizhi (wuthering waves)
吟霖（鸣潮）|yinlin (wuthering waves)
忌炎（鸣潮）|jiyan (wuthering waves)
鉴心（鸣潮）|jianxin (wuthering waves)
散华（鸣潮）|sanhua (wuthering waves)
丹瑾（鸣潮）|danjin (wuthering waves)
桃祈（鸣潮）|taoqi (wuthering waves)
凌阳（鸣潮）|lingyang (wuthering waves)
安可（鸣潮）|encore (wuthering waves)
今汐（鸣潮）|jinhsi (wuthering waves)
长离（鸣潮）|changli (wuthering waves)
折枝（鸣潮）|zhezhi (wuthering waves)
三笠·阿克曼|mikasa ackerman
艾伦·耶格尔|eren yeager
散兵（原神）|scaramouche (genshin impact)
钟离（原神）|zhongli (genshin impact)
夜兰（原神）|yelan (genshin impact)
卡维（原神）|kaveh (genshin impact)
赛诺（原神）|cyno (genshin impact)
柯莱（原神）|collei (genshin impact)
林尼（原神）|lyney (genshin impact)
队长（原神）|capitano (genshin impact)
少女（原神）|columbina (genshin impact)
木偶（原神）|sandrone (genshin impact)
女士（原神）|signora (genshin impact)
博士（原神）|dottore (genshin impact)
千织（原神）|chiori (genshin impact)
闲云（原神）|xianyun (genshin impact)
云堇（原神）|yun jin (genshin impact)
烟绯（原神）|yanfei (genshin impact)
辛焱（原神）|xinyan (genshin impact)
砂糖（原神）|sucrose (genshin impact)
雷泽（原神）|razor (genshin impact)
行秋（原神）|xingqiu (genshin impact)
重云（原神）|chongyun (genshin impact)
北斗（原神）|beidou (genshin impact)
香菱（原神）|xiangling (genshin impact)
瑶瑶（原神）|yaoyao (genshin impact)
托马（原神）|thoma (genshin impact)
五郎（原神）|gorou (genshin impact)
早柚（原神）|sayu (genshin impact)
白术（原神）|baizhu (genshin impact)
嘉明（原神）|gaming (genshin impact)
多莉（原神）|dori (genshin impact)
米卡（原神）|mika (genshin impact)
归终（原神）|guizhong (genshin impact)
留云借风真君|cloud retainer (genshin impact)
骄傲的垃圾桶|lordly trashcan (honkai: star rail)
黑塔（人偶）|herta (puppet) (honkai: star rail)
姬子（少女）|himeko (young) (honkai: star rail)
菲比（鸣潮）|phoebe (wuthering waves)
赞妮（鸣潮）|zani (wuthering waves)
尤诺（鸣潮）|iuno (wuthering waves)
露帕（鸣潮）|lupa (wuthering waves)
阿布（鸣潮）|abby (wuthering waves)
伤痕（鸣潮）|scar (wuthering waves)
卢克·赫尔森|luuk herssen (wuthering waves)
渊武（鸣潮）|yuanwu (wuthering waves)
釉瑚（鸣潮）|youhu (wuthering waves)
灯灯（鸣潮）|lumi (wuthering waves)
卜灵（鸣潮）|buling (wuthering waves)
秋水（鸣潮）|aalto (wuthering waves)
米娅（鸣潮）|mya (wuthering waves)
千咲（鸣潮）|chisa (wuthering waves)
赛璐璐阴影|cel shading
低饱和色彩|muted colors
超现实风格|surreal
同人志风格|doujinshi
轻小说插画|light novel style
新艺术运动|art nouveau
网点纸效果|screentone
詹姆斯·简|james jean
尾田荣一郎|eiichiro oda
高桥留美子|rumiko takahashi
三浦建太郎|kentaro miura
浅野一二〇|inio asano
荒木飞吕彦|hirohiko araki
三咲久玲人|kurehito misaki
石森章太郎|shotaro ishinomori
藤子不二雄|fujiko fujio
蒂姆·伯顿|tim burton
七分身构图|cowboy shot
长镜头构图|long shot
视平线高度|eye level
电影式构图|cinematic framing
三分法构图|rule of thirds
非对称构图|asymmetrical composition
对角线构图|diagonal composition
多视角并列|multiple views
角色设定图|character sheet
参考设定图|reference sheet
消失点构图|vanishing point
引导线构图|leading lines
画中画构图|frame within a frame
电影感渲染|cinematic rendering
高动态范围|hdr
次表面散射|subsurface scattering
环境光遮蔽|ambient occlusion
胶片摄影感|film photography
拍立得质感|polaroid
手机摄影感|smartphone photo
照片级真实|photorealistic
长焦压缩感|lens compression
高帧率抓拍|high fps capture
电影感光效|cinematic lighting
暖色调光线|warm lighting
冷色调光线|cool lighting
情绪化光线|moody lighting
戏剧性光线|dramatic lighting
向观众伸手|reaching towards viewer
倒吸一口气|gasping
对观众微笑|smiling at viewer
天使般微笑|angelic smile
凌乱丸子头|messy bun
不对称发型|asymmetrical hair
下巴长度发|chin-length hair
脸部创可贴|bandaid on face
发光的眼睛|glowing eyes
Polo衫|polo shirt
吊带连衣裙|sundress
挂脖连衣裙|halter dress
服务员制服|waitress uniform
飞行员夹克|bomber jacket
牛角扣大衣|duffle coat
娃娃裙睡衣|babydoll
社团活动室|club room
科学实验室|science lab
笔记本电脑|laptop
双筒望远镜|binoculars
双眼不对称|asymmetric eyes
赛璐璐上色|cel shading
前后不一致|inconsistent
左右不对称|asymmetrical
白色连衣裙|white dress
黑色连衣裙|black dress
红色连衣裙|red dress
蓝色连衣裙|blue dress
绿色连衣裙|green dress
紫色连衣裙|purple dress
粉色连衣裙|pink dress
黑色连裤袜|black pantyhose
青绿色眼睛|aqua eyes
上半身赤裸|topless
下半身赤裸|bottomless
主动抽插口|irrumatio
被按住手腕|wrists held
全尼尔森位|full nelson position
微型比基尼|micro bikini
细绳比基尼|string bikini
银白色长发|silver hair
银白色头发|silver hair
荧（原神）|lumine (genshin impact)
空（原神）|aether (genshin impact)
琴（原神）|jean (genshin impact)
珊瑚宫心海|sangonomiya kokomi
钉崎野蔷薇|kugisaki nobara
灶门炭治郎|kamado tanjirou
灶门祢豆子|kamado nezuko
嘴平伊之助|hashibira inosuke
炼狱杏寿郎|rengoku kyoujurou
丽日御茶子|uraraka ochaco
渡我被身子|toga himiko
妮可·罗宾|nico robin
伊地知虹夏|ijichi nijika
约尔·福杰|yor briar
井之上泷奈|inoue takina
喜多川海梦|kitagawa marin
魈（原神）|xiao (genshin impact)
戴因斯雷布|dainsleif (genshin impact)
真（原神）|makoto (genshin impact)
椿（鸣潮）|camellya (wuthering waves)
克里斯托弗|cristoforo (wuthering waves)
角（鸣潮）|jue (wuthering waves)
芙洛拉夫人|lady flora (wuthering waves)
评分九分|score_9
评分八分|score_8_up
评分七分|score_7_up
最佳质量|best quality
高分辨率|highres
极具美感|very aesthetic
最新版本|newest
成人内容|nsfw
露骨内容|explicit
动画上色|anime coloring
平涂上色|flat color
水彩风格|watercolor
油画风格|oil painting
草稿素描|sketch
4K画质|4k
8K画质|8k
细节丰富|detailed
精细细节|intricate details
官方插图|official art
游戏CG|game cg
宣传海报|promotional art
概念艺术|concept art
数字绘画|digital painting
传统媒介|traditional media
柔和色彩|pastel colors
鲜艳色彩|vivid colors
高对比度|high contrast
低对比度|low contrast
高饱和度|saturated
低饱和度|desaturated
复古画风|retro artstyle
矢量艺术|vector art
扁平设计|flat design
极简主义|minimalist
写实风格|realism
卡通风格|cartoon
漫画风格|comic style
日漫风格|manga style
韩漫风格|webtoon
装饰艺术|art deco
表现主义|expressionism
波普艺术|pop art
涂鸦风格|graffiti
拼贴风格|collage
低多边形|low poly
CG绘图|cg art
绘画质感|painterly
干净线稿|clean lineart
京都动画|kyoto animation
和田あこ|wada arco
三轮士郎|shirow miwa
天野喜孝|yoshitaka amano
吉田明彦|akihiko yoshida
大友克洋|katsuhiro otomo
新川洋司|yoji shinkawa
久保带人|tite kubo
岸本齐史|masashi kishimoto
村田雄介|yusuke murata
松本大洋|taiyo matsumoto
浦泽直树|naoki urasawa
谷口次郎|jiro taniguchi
野村哲也|tetsuya nomura
押山清高|kiyotaka oshiyama
阿部吉俊|yoshitoshi abe
小岛文美|kojima ayami
山下俊也|shunya yamashita
藤ちょこ|fuzichoco
时雨羽衣|shigure ui
漆原智志|urushihara satoshi
内藤泰弘|yasuhiro nightow
安彦良和|yoshikazu yasuhiko
松本零士|leiji matsumoto
手冢治虫|osamu tezuka
井上雄彦|takehiko inoue
藤岛康介|kousuke fujishima
奈良美智|yoshitomo nara
葛饰北斋|hokusai
克里姆特|gustav klimt
卡拉瓦乔|caravaggio
肖像构图|portrait
极端特写|extreme close-up
场景全景|establishing shot
正面视角|from front
侧面视角|from side
背面视角|from behind
俯视视角|from above
仰视视角|from below
倾斜构图|dutch angle
平视视角|straight-on
鸟瞰视角|bird's-eye view
虫眼视角|worm's-eye view
空中视角|aerial view
风景构图|scenery
横向构图|landscape
纵向构图|portrait orientation
方形构图|square format
全景画幅|panoramic
中心构图|centered composition
对称构图|symmetrical composition
留白构图|negative space
层次纵深|depth layers
剪影构图|silhouette
框景构图|framing
头部出框|head out of frame
脚部出框|feet out of frame
局部裁切|cropped
紧凑构图|close framing
宽松构图|wide framing
单人构图|solo
双人构图|duo
群像构图|group
拼贴排版|collage layout
漫画分格|comic panel
分屏构图|split screen
过肩视角|over-the-shoulder
面向观者|facing viewer
注视观者|looking at viewer
视线偏移|looking away
等距视角|isometric view
强制透视|forced perspective
主体居中|subject in center
主体偏移|off-center subject
完整场景|full scene
远景人物|distant figure
虚化光斑|bokeh
动态模糊|motion blur
胶片颗粒|film grain
光线追踪|ray tracing
鱼眼镜头|fisheye lens
广角镜头|wide angle lens
长焦镜头|telephoto lens
微距镜头|macro lens
锐利对焦|sharp focus
色调映射|tonemapping
全局光照|global illumination
变形镜头|anamorphic lens
镜头畸变|lens distortion
移轴效果|tilt-shift
高速快门|high shutter speed
低速快门|low shutter speed
单反画质|dslr
CG渲染|cgi render
三维渲染|3d render
色调分层|posterized
调色处理|color grading
多重曝光|double exposure
神圣光柱|god rays
柔和光线|soft lighting
黄金时刻|golden hour
蓝调时刻|blue hour
霓虹灯光|neon lights
斑驳阳光|dappled sunlight
明暗对照|chiaroscuro
泛光效果|bloom
镜头光晕|lens flare
影棚灯光|studio lighting
分割布光|split lighting
伦勃朗光|rembrandt lighting
环形布光|loop lighting
三点布光|three point lighting
实景光源|practical light
黎明光线|dawn light
黄昏光线|dusk light
暮色光线|twilight
落日余晖|sunset glow
阴天光线|overcast lighting
雾气光线|foggy light
薄雾氛围|misty atmosphere
朦胧光雾|haze
浮尘光点|dust motes
生物荧光|bioluminescence
发光效果|glowing
明亮通透|luminous
虹彩光泽|iridescent
高调布光|high key lighting
低调布光|low key lighting
空灵光效|ethereal lighting
梦幻光线|dreamy lighting
强烈阴影|harsh shadows
柔和阴影|soft shadows
焦散光斑|caustics
透光发光|subsurface glow
边缘发光|glowing edges
剪影打光|silhouette lighting
城市灯火|city lights
霓虹辉光|neon glow
彩色光斑|color splash
一个女孩|1girl
一个男孩|1boy
两个女孩|2girls
两个男孩|2boys
三个女孩|3girls
男性主体|male focus
女性主体|female focus
成熟女性|mature female
成熟男性|mature male
苍白皮肤|pale skin
深色皮肤|dark skin
单人主体|solo focus
兄弟姐妹|siblings
职业女性|office lady
娇小身材|petite
曲线身材|curvy
肌肉发达|muscular
丰腴大腿|thick thighs
紧致身材|toned
运动体型|athletic build
体态丰盈|buxom
沙漏身材|hourglass figure
梨形身材|pear-shaped body
结实手臂|strong arms
纤细手臂|slender arms
修长手指|long fingers
纤细腰身|slim waist
娇小体型|petite figure
四肢着地|all fours
双腿并拢|legs together
双手背后|arms behind back
手放腿上|hands on own thighs
垂头坐着|slumped
拿着杯子|holding cup
战斗姿态|fighting stance
持剑战斗|sword fighting
单膝跪地|on one knee
举手示意|hand up
手放胸口|hand on own chest
手托脸颊|hand on own cheek
手托下巴|hand on own chin
手插口袋|hand in pocket
双手插兜|hands in pockets
单手叉腰|hand on own hip
手放膝上|hand on knee
双手合十|hands together
手枕脑后|arm behind head
双手抱头|hands behind head
演奏乐器|playing instrument
伸展手臂|outstretched arm
背后拥抱|hugging from behind
跳华尔兹|dancing waltz
整理头发|adjusting hair
伸展双臂|stretching arms
瑜伽姿势|yoga pose
仰卧起坐|sit-up
张开双臂|spread arms
扶额叹气|facepalm
胜利姿势|victory pose
手势比心|heart hands
嘘声手势|shushing
看向观众|looking at viewer
移开视线|looking away
害羞窘迫|embarrassed
精疲力竭|exhausted
面无表情|expressionless
温柔微笑|gentle smile
强颜欢笑|forced smile
紧张微笑|nervous smile
鼻尖泛红|nose blush
满脸通红|heavy blush
若有所思|thoughtful
心不在焉|absent-minded
居高临下|condescending
微微一笑|slight smile
温柔表情|gentle expression
冷漠表情|cold expression
严厉表情|stern expression
不知所措|overwhelmed
含泪微笑|crying smile
做白日梦|daydreaming
双丸子头|double bun
精灵短发|pixie cut
金色头发|golden hair
薰衣草发|lavender hair
发梢染色|colored tips
草莓金发|strawberry blonde hair
低双马尾|low twintails
高双马尾|high twintails
短双马尾|short twintails
单侧扎发|one side up
法式盘发|french twist
头顶发髻|topknot
遮单眼发|hair over one eye
卷波波头|curly bob
波浪波波|wavy bob
及腰长发|waist-length hair
及地长发|floor-length hair
锐利眼神|sharp eyes
淡色嘴唇|pale lips
兽耳绒毛|animal ear fluff
多条尾巴|multiple tails
第三只眼|third eye
圆框眼镜|round eyewear
半框眼镜|semi-rimless eyewear
无框眼镜|rimless eyewear
单片眼镜|monocle
面部伤疤|scar on face
眼下泪痣|mole under eye
空洞眼神|empty eyes
锐利凝视|sharp gaze
苍白面容|pale face
脸颊雀斑|cheek freckles
面部彩绘|face paint
面部纹身|facial tattoo
正装衬衫|dress shirt
纽扣衬衫|button-down shirt
印花T恤|graphic t-shirt
乐队T恤|band t-shirt
有领衬衫|collared shirt
吊带背心|camisole
露脐上衣|crop top
挂脖上衣|halter top
连帽卫衣|hoodie
高领毛衣|turtleneck
西装外套|blazer
运动套装|track suit
学校泳装|school swimsuit
连体泳衣|one-piece swimsuit
竞泳泳装|competition swimsuit
紧身连衣|leotard
空姐制服|flight attendant uniform
商务西装|business suit
长衫旗袍|cheongsam
牛仔夹克|denim jacket
连帽夹克|hooded jacket
长款外套|long coat
冬装大衣|winter coat
斗篷雨披|poncho
连帽斗篷|hooded cloak
派克大衣|parka
毛皮大衣|fur coat
羽毛披肩|feather boa
新娘头纱|bridal veil
工装短裤|cargo shorts
束腰外衣|tunic
连体短裤|romper
背带裙裤|overalls skirt
玛丽珍鞋|mary janes
女式衬裙|chemise
交叉绑带|cross-laced clothes
露肩镂空|shoulder cutout
和服腰带|obi
头戴耳机|headphones
入耳耳机|earphones
露指手套|fingerless gloves
女仆头饰|maid headdress
列车车厢|train interior
城堡大厅|castle hall
飞船内部|spaceship interior
学校走廊|school hallway
学生会室|student council room
城市街道|city street
人行横道|crosswalk
摩天大楼|skyscraper
建筑工地|construction site
温泉浴场|onsen
公共澡堂|public bath
赛博城市|cyberpunk city
未来都市|futuristic city
月球表面|moon surface
次元裂缝|dimensional gap
抽象背景|abstract background
简单背景|simple background
白色背景|white background
黑色背景|black background
模糊背景|blurry background
自然风景|scenery
精细背景|detailed background
渐变背景|gradient background
格子背景|checkered background
透明背景|transparent background
双色背景|two-tone background
散景光斑|bokeh
远景构图|wide shot
倾斜视角|dutch angle
智能手机|smartphone
毛绒玩具|plush toy
珍珠奶茶|bubble tea
风车玩具|pinwheel
游戏手柄|controller
低分辨率|lowres
解剖错误|bad anatomy
最差质量|worst quality
画面模糊|blurry
多余手指|extra fingers
压缩痕迹|jpeg artifacts
手部错误|bad hands
脸部崩坏|poorly drawn face
画面裁切|cropped
主体出画|out of frame
重复元素|duplicate
细节不足|less detailed
比例失调|bad proportions
多余肢体|extra limbs
手指粘连|fused fingers
过长脖子|long neck
多余手臂|extra arms
缺失手臂|missing arms
肢体畸形|malformed limbs
身体扭曲|twisted body
面容损毁|disfigured
脸部错误|bad face
面部变形|deformed face
手部崩坏|poorly drawn hands
多余耳朵|extra ears
缺失耳朵|missing ears
脚部错误|bad feet
多余脚趾|extra toes
缺失脚趾|missing toes
脚趾粘连|fused toes
牙齿错误|bad teeth
多余眼睛|extra eyes
缺失眼睛|missing eyes
单色画面|monochrome
灰阶画面|grayscale
深褐色调|sepia
过度饱和|oversaturated
色彩黯淡|undersaturated
刺眼光照|harsh lighting
画面过曝|overexposed
画面欠曝|underexposed
扫描痕迹|scan artifacts
压缩伪影|compression artifacts
涂抹痕迹|smudged
粗糙草图|rough sketch
单调平涂|flat color
对比不足|low contrast
颜色褪淡|washed out
构图不佳|bad composition
画面杂乱|cluttered
透视错误|bad perspective
肢体漂浮|floating limbs
肢体断裂|disconnected limbs
多格分镜|multiple panels
对话气泡|speech bubble
画面边框|border
白色边框|white border
上下黑边|letterboxed
打码遮挡|censored
暗示内容|suggestive
倒影错误|bad reflection
阴影错误|bad shadow
生硬阴影|harsh shadow
异常发光|glowing
过强光晕|bloom
画面扭曲|distorted
画面故障|glitch
雪花噪点|static
画工粗糙|poorly drawn
业余水平|amateur
赶工痕迹|rushed
错误结构|wrong anatomy
多余头部|extra heads
缺失头部|missing head
漂浮头颅|floating head
赞助标识|patreon
作者署名|artist name
日期标注|dated
界面元素|ui
说明文字|caption
锯齿边缘|aliasing
锐化痕迹|sharpening artifacts
身体异变|body horror
异形结构|alien anatomy
缺失肢体|missing limbs
肢体融合|fused limbs
手指过多|too many fingers
手部变形|deformed hands
眼睛错误|bad eyes
丑陋面容|ugly face
金色礼服|gold dress
中式服装|chinese clothes
和风服装|japanese clothes
黑色夹克|black jacket
白色夹克|white jacket
黑色大衣|black coat
白色大衣|white coat
黑色西装|black suit
黑色衣服|black clothes
白色衣服|white clothes
红色衣服|red clothes
黑色手套|black gloves
白色手套|white gloves
红色围巾|red scarf
红色斗篷|red cape
黑色斗篷|black cape
白色长袍|white robe
大腿绑带|thigh strap
蓝色领带|blue necktie
蓬松尾巴|fluffy tail
人偶关节|doll joints
机械部件|mechanical parts
围棋棋盘|go board
狙击步枪|sniper rifle
未穿胸罩|no bra
未穿内裤|no panties
正在脱衣|undressing
裸露乳房|bare breasts
露出乳房|exposed breasts
露出臀部|exposed ass
露出私处|exposed pussy
露出阴茎|exposed penis
挺立乳头|erect nipples
凸起乳头|puffy nipples
凹陷乳头|inverted nipples
女性私处|pussy
未割包皮|uncut
张开双腿|spread legs
掰开私处|spread pussy
掰开臀部|spread ass
挺翘乳房|perky breasts
下垂乳房|saggy breasts
阴道性交|vaginal
手指插入|fingering
互相自慰|mutual masturbation
隔衣磨蹭|dry humping
阴茎摩擦|frotting
反向骑乘|reverse cowgirl
趴伏后入|prone bone
屈曲压制|mating press
全尼尔森|full nelson
坐在腿上|sitting on lap
上下起伏|bouncing
双重插入|double penetration
三重插入|triple penetration
前后夹击|spitroast
两男一女|mmf threesome
两女一男|ffm threesome
群交派对|orgy
群体颜射|bukkake
粗暴性爱|rough sex
温柔性爱|gentle sex
野战速战|quickie
穿衣性爱|clothed sex
脱对方衣|undressing partner
乳头刺激|nipple play
事后余韵|afterglow
身上精液|cum on body
脸上精液|cum on face
胸上精液|cum on breasts
精液滴落|cum dripping
精液拉丝|cum string
大量精液|excessive cum
面部射精|facial
女性射精|female ejaculation
用过的套|used condom
事后痕迹|after sex fluids
蒙眼状态|blindfolded
四马攒蹄|hogtie
困境束缚|predicament bondage
宠物扮演|pet play
假具插入|pegging
身体写字|body writing
公开裸体|public nudity
情人旅馆|love hotel
淋浴玻璃|shower glass
领口走光|downblouse
内裤走光|pantyshot
裸体摆拍|posing nude
艺术裸体|art nude
传教士位|missionary position
第一视角|pov
极近特写|extreme close-up
裆部特写|crotch focus
臀部特写|ass focus
胸部特写|breast focus
腿部特写|legs focus
足部特写|feet focus
面部特写|face focus
张开的臀|gaping ass
呈献姿态|presenting
邀请姿态|inviting
诱惑姿势|seductive pose
手在背后|hands behind back
双膝跪地|on knees
急促呼吸|panting
拨开内裤|panties aside
内裤挂腿|panties around one leg
内裤拉下|panties pulled down
单乳露出|one breast out
双乳露出|breasts out
破损衣物|torn clothes
拉开拉链|unzipped
敞开衬衫|open shirt
解开纽扣|unbuttoned
过大衣物|oversized clothes
透明衬衫|see-through shirt
平角内裤|boyshorts
运动内衣|sports bra
裸体围裙|naked apron
只有浴巾|only towel
职场女性|office lady
多女群像|variety of girls
伴侣交换|partner swap
双人夹击|double team
群体拥抱|group hug
后宫群交|harem sex
触手侵犯|tentacle sex
史莱姆娘|slime girl
精神控制|mind control
触手束缚|bound by tentacles
触手入口|tentacle in mouth
衣下触手|tentacle under clothes
异种繁衍|monster breeding
私处特写|pussy focus
张开的肛|gaping anus
乳头特写|nipples focus
乳晕特写|areola focus
大腿内侧|inner thigh
凌乱头发|messy hair
单眼遮发|hair over one eye
腹部特写|abs focus
肚脐特写|navel focus
大腿特写|thigh focus
腹部隆起|belly bulge
奶水四溅|milk splash
第一人称|first person
第三人称|third person
背景虚化|blurry background
镜面自拍|mirror selfie
手机拍摄|phone photo
偷拍视角|hidden cam
监控视角|cctv
一个女人|1woman
一个男人|1man
一位少女|1girl
两个人物|2girls
一个角色|1girl
渐变发色|gradient hair
看向观者|looking at viewer
官方画风|official art
纯白背景|white background
详细背景|detailed background
白色长发|white hair
银色长发|silver hair
金色长发|blonde hair
黑色长发|black hair
棕色长发|brown hair
粉色长发|pink hair
蓝色长发|blue hair
红色长发|red hair
绿色长发|green hair
紫色长发|purple hair
白色短发|white hair
银色短发|silver hair
金色短发|blonde hair
黑色短发|black hair
双马尾辫|twintails
蓝色裙子|blue skirt
红色裙子|red dress
白色衬衫|white shirt
黄色开衫|yellow cardigan
狐狸耳朵|fox ears
德克萨斯|texas (arknights)
拉普兰德|lappland (arknights)
史尔特尔|surtr (arknights)
艾雅法拉|ifrit (arknights)
普罗旺斯|provence (arknights)
莫斯提马|mostima (arknights)
雷电将军|raiden shogun
神里绫华|kamisato ayaka (genshin impact)
八重神子|yae miko
枫原万叶|kaedehara kazuha
那维莱特|neuvillette (genshin impact)
布洛妮娅|bronya (honkai: star rail)
上官婉儿|shangguan (honor of kings)
马可波罗|marco_polo (honor of kings)
不知火舞|shiranui_mai (honor of kings)
娜可露露|nakoruru (honor of kings)
百里玄策|xuance (honor of kings)
百里守约|shouyue (honor of kings)
修塔尔克|stark (sousou no frieren)
虎杖悠仁|itadori yuji
伏黑甚尔|fushiguro toji
两面宿傩|ryoumen sukuna (jujutsu kaisen)
我妻善逸|agatsuma zenitsu
绿谷出久|midoriya izuku
爆豪胜己|bakugou katsuki
后藤一里|gotoh hitori
喜多郁代|kita ikuyo
四宫辉夜|shinomiya kaguya
藤原千花|fujiwara chika
星野露比|hoshino ruby
爱蜜莉雅|emilia (re:zero)
艾姬多娜|echidna (re:zero)
玛露希尔|marcille donato
奇尔查克|chilchuck tims
锦木千束|nishikigi chisato
樱岛麻衣|sakurajima mai
薇尔莉特|violet evergarden
五条新菜|gojou wakana
漩涡鸣人|uzumaki naruto
黑崎一护|kurosaki ichigo
安洁莉娜|angelina (arknights)
霍尔海雅|ho'olheyak (arknights)
缪尔赛思|muelsyse (arknights)
特蕾西娅|theresa (arknights)
推进之王|siege (arknights)
菲亚梅塔|fiammetta (arknights)
歌蕾蒂娅|gladiia (arknights)
普瑞赛斯|priestess (arknights)
薇薇安娜|viviana (arknights)
维什戴尔|wis'adel (arknights)
达达利亚|tartaglia (genshin impact)
阿蕾奇诺|arlecchino (genshin impact)
茜特菈莉|citlali (genshin impact)
艾尔海森|alhaitham (genshin impact)
克洛琳德|clorinde (genshin impact)
莱欧斯利|wriothesley (genshin impact)
罗莎莉亚|rosaria (genshin impact)
艾梅莉埃|emilie (genshin impact)
潘塔罗涅|pantalone (genshin impact)
芙卡洛斯|focalors (genshin impact)
真理医生|dr. ratio (honkai: star rail)
阿格莱雅|aglaea (honkai: star rail)
螺丝咕姆|screwllum (honkai: star rail)
钟表小子|clockie (honkai: star rail)
卡卡瓦夏|kakavasha (honkai: star rail)
芮克先生|mr. reca (honkai: star rail)
卡提希娅|cartethyia (wuthering waves)
坎特蕾拉|cantarella (wuthering waves)
奥古斯塔|augusta (wuthering waves)
玛格丽特|margherita (wuthering waves)
超高清|absurdres
安全级|safe
敏感级|sensitive
单色画|monochrome
灰度画|greyscale
像素画|pixel art
水墨画|ink painting
水粉画|gouache
半写实|semi-realistic
风格化|stylized
浮世绘|ukiyo-e
印象派|impressionism
粗描边|thick outlines
无描边|no outline
新海诚|makoto shinkai
宫崎骏|hayao miyazaki
细田守|mamoru hosoda
金政基|kim jung gi
墨比斯|moebius
鸟山明|akira toriyama
小畑健|takeshi obata
吉成曜|yoh yoshinari
杉森建|ken sugimori
真岛浩|hiro mashima
永井豪|go nagai
北条司|tsukasa hojo
林田球|q hayashida
东清彦|kiyohiko azuma
永井博|hiroshi nagai
村上隆|takashi murakami
萨金特|john singer sargent
伦勃朗|rembrandt
上半身|upper body
下半身|lower body
大远景|very wide shot
高角度|high angle
低角度|low angle
正俯视|top-down view
浅景深|shallow depth of field
深景深|deep depth of field
长曝光|long exposure
超精细|hyperdetailed
轮廓光|rim light
体积光|volumetric lighting
自然光|natural lighting
环境光|ambient light
定向光|directional light
蝴蝶光|butterfly lighting
日出光|sunrise light
聚光灯|spotlight
泛光灯|floodlight
闪光灯|strobe light
反射光|reflected light
正面光|frontal lighting
闪电光|lightning
烟花光|firework lights
窗边光|window light
台灯光|lamp light
彩虹光|rainbow light
青少年|teen
成年人|adult
老年人|elderly
怪物娘|monster girl
恶魔娘|demon girl
吸血鬼|vampire
赛博格|cyborg
机甲娘|mecha girl
双胞胎|twins
女学生|schoolgirl
科学家|scientist
音乐家|musician
运动员|athlete
兽人耳|kemonomimi
中等胸|medium breasts
长躯干|long torso
短躯干|short torso
大骨架|large frame
小骨架|small frame
身高差|height difference
手叉腰|hand on hip
伸懒腰|stretching
打哈欠|yawning
吃东西|eating
回头看|looking back
坐椅子|sitting on chair
坐地上|sitting on floor
鸭子坐|wariza
盘腿坐|indian style
抱着书|holding book
拿手机|holding phone
抱玩偶|holding doll
后空翻|backflip
侧手翻|cartwheel
玩头发|playing with hair
扶眼镜|adjusting glasses
俯卧撑|push-up
秀肌肉|flexing
咧嘴笑|grin
半睁眼|half-closed eyes
流口水|drooling
无奈笑|wry smile
邪恶笑|evil grin
水汪汪|watery eyes
咯咯笑|giggling
羞涩笑|embarrassed smile
单眼闭|one eye closed
瞪大眼|wide-eyed
超长发|very long hair
中长发|medium hair
极长发|absurdly long hair
波波头|bob cut
双马尾|twintails
侧马尾|side ponytail
高马尾|high ponytail
低马尾|low ponytail
法式辫|french braid
侧编发|side braid
圆发髻|hair bun
姬发式|hime cut
齐刘海|blunt bangs
眼间发|hair between eyes
波浪发|wavy hair
凌乱发|messy hair
风吹发|hair blown by wind
刺猬头|spiked hair
钻头卷|drill hair
双钻卷|twin drills
小卷发|ringlets
莫西干|mohawk
内卷发|hair intakes
白金发|platinum blonde hair
深棕发|dark brown hair
浅棕发|light brown hair
深红发|crimson hair
赤褐发|auburn hair
艳粉发|hot pink hair
浅蓝发|light blue hair
藏蓝发|navy blue hair
青绿发|teal hair
薄荷发|mint green hair
多色发|multicolored hair
双色发|two-tone hair
渐变发|gradient hair
挑染发|streaked hair
分色发|split-color hair
彩虹发|rainbow hair
粉彩发|pastel hair
灰金发|ash blonde hair
乌黑发|jet black hair
花白发|salt and pepper hair
渐层发|ombre hair
半扎发|half updo
低盘发|chignon
长鬓发|long sidelocks
短鬓发|short sidelocks
披肩发|hair over shoulder
编发髻|braided bun
皇冠辫|crown braid
鱼骨辫|fishtail braid
荷兰辫|dutch braid
玉米辫|cornrows
爆炸头|afro
层次发|layered hair
羽毛剪|feathered hair
齐肩发|shoulder-length hair
异色瞳|heterochromia
半眯眼|jitome
长睫毛|long eyelashes
小虎牙|fang
精灵耳|elf ears
恶魔角|demon horns
天使翼|angel wings
恶魔翼|demon wings
蝴蝶翼|butterfly wings
机械翼|mechanical wings
恶魔尾|demon tail
护目镜|goggles
嘴角痣|mole under mouth
美人痣|beauty mark
心形瞳|heart-shaped pupils
符号瞳|symbol-shaped pupils
大眼睛|wide eyes
细长眼|narrow eyes
尖指甲|sharp fingernails
白衬衫|white shirt
黑衬衫|black shirt
针织衫|knit sweater
雪纺衫|blouse
泡泡袖|puffy sleeves
褶边袖|frilled sleeves
分离袖|detached sleeves
半身裙|skirt
百褶裙|pleated skirt
迷你裙|miniskirt
铅笔裙|pencil skirt
牛仔裙|denim skirt
格子裙|plaid skirt
层叠裙|tiered skirt
连衣裙|dress
晚礼服|evening gown
小礼服|cocktail dress
吊带裙|slip dress
毛衣裙|sweater dress
背带裙|pinafore
围裙裙|apron dress
水手领|sailor collar
水手服|serafuku
体操服|gym uniform
比基尼|bikini
潜水服|wetsuit
连体衣|bodysuit
连身裤|jumpsuit
背带裤|overalls
女仆装|maid outfit
护士服|nurse uniform
巫女服|miko
厨师服|chef uniform
白大褂|lab coat
职业装|office lady
和服袴|hakama
忍者装|ninja outfit
魔女装|witch outfit
圣诞装|santa outfit
迷彩服|camo outfit
皮夹克|leather jacket
长外套|overcoat
长披肩|stole
牛仔裤|jeans
牛仔布|denim
打底裤|leggings
灯笼裤|bloomers
过膝靴|thigh boots
及膝靴|knee boots
运动鞋|sneakers
高跟鞋|high heels
乐福鞋|loafers
过膝袜|thighhighs
连裤袜|pantyhose
及膝袜|kneehighs
吊袜带|garter belt
吊袜夹|garter straps
荷叶边|ruffles
蝴蝶结|bow
锁子甲|chainmail
运动装|sportswear
麻花辫|braid
发内卷|hair intakes
眼前发|hair between eyes
贝雷帽|beret
鸭舌帽|cap
女巫帽|witch hat
遮阳帽|sun hat
手提包|bag
单肩包|shoulder bag
零钱包|coin purse
钥匙扣|keychain
武士刀|katana
护士帽|nurse cap
创可贴|bandaid
图书馆|library
咖啡馆|cafe
地下室|basement
办公室|office
实验室|laboratory
窗帘窗|curtained window
天花板|ceiling
木地板|wooden floor
榻榻米|tatami
体育馆|gymnasium
游泳池|swimming pool
泳池边|poolside
更衣室|locker room
医务室|infirmary
音乐室|music room
美术室|art room
商店街|shopping district
火车站|train station
工业区|industrial area
游乐园|amusement park
摩天轮|ferris wheel
水族馆|aquarium
博物馆|museum
电影院|cinema
面包店|bakery
葡萄园|vineyard
大都市|metropolis
霓虹灯|neon lights
浮空岛|floating island
魔法阵|magic circle
地下城|dungeon
水晶洞|crystal cave
珊瑚礁|coral reef
外太空|outer space
素色墙|plain wall
梅雨季|rainy season
毛毛雨|drizzle
暴风雨|storm
耶稣光|god rays
雨夹雪|sleet
暴风雪|blizzard
萤火虫|fireflies
流星雨|meteor shower
龙卷风|tornado
沙尘暴|sandstorm
电风扇|electric fan
咖啡杯|coffee mug
一摞书|book stack
麦克风|microphone
热气球|hot air balloon
野餐篮|picnic basket
冰淇淋|ice cream
笔记本|notebook
调色板|palette
显示器|monitor
收音机|radio
化妆刷|makeup brush
日记本|diary
地球仪|globe
望远镜|telescope
放大镜|magnifying glass
手电筒|flashlight
打火机|lighter
洒水壶|watering can
工具箱|toolbox
螺丝刀|screwdriver
缝衣针|needle
缝纫机|sewing machine
电饭煲|rice cooker
平底锅|frying pan
巧克力|chocolate
鲷鱼烧|taiyaki
玻璃瓶|bottle
信用卡|credit card
纸飞机|paper airplane
网球拍|tennis racket
棒球棒|baseball bat
自行车|bicycle
滑板车|scooter
圣诞树|christmas tree
仙女棒|sparkler
泰迪熊|teddy bear
扑克牌|playing cards
水晶球|crystal ball
低质量|low quality
缺手指|missing fingers
畸形手|mutated hands
用户名|username
多余腿|extra legs
缺失腿|missing legs
斗鸡眼|cross-eyed
像素化|pixelated
未完成|unfinished
多视角|multiple views
马赛克|mosaic censoring
遮挡条|bar censor
两个头|two heads
时间戳|timestamp
文本框|text box
摩尔纹|moire
短披肩|capelet
假兽耳|fake animal ears
胡须纹|whisker marks
机器人|robot
小丑服|jester
大乳晕|large areola
未勃起|flaccid
张开的|gaping
深乳沟|deep cleavage
骆驼趾|cameltoe
磨豆腐|tribadism
剪刀式|scissoring
传教士|missionary
三人行|threesome
背后式|sex from behind
打屁股|spanking
抓头发|hair pulling
看镜头|looking at viewer
压上去|mounting
透明衣|transparent clothes
安全套|condom
口红印|lipstick mark
分腿杆|spreader bar
牵引绳|leash
狗项圈|dog collar
贞操带|chastity belt
渔网袜|fishnets
长手套|long gloves
假阳具|dildo
振动棒|vibrator
按摩棒|wand
性玩具|sex toy
飞机杯|onahole
女支配|femdom
男支配|maledom
拉马尾|ponytail pull
露出癖|exhibitionism
在床上|on bed
试衣间|changing room
在桌上|on desk
贴玻璃|against glass
湿地面|wet floor
摄像头|webcam
温泉池|hot spring
女上位|cowgirl position
后入位|doggystyle position
压腿位|mating press position
站立位|standing position
抬腿位|leg lift position
M字腿|m legs
被抱起|lifted
阿黑颜|ahegao
半闭眼|half-closed eyes
翻白眼|rolled eyes
事后脸|afterglow face
睁大眼|wide eyes
掀胸罩|bra lift
拉胸罩|bra pull
拉衣服|clothes pull
湿衬衫|wet shirt
紧身衣|leotard
女内裤|panties
丁字裤|thong
G弦裤|g-string
无胸罩|braless
无内裤|no underwear
兔女郎|bunny girl
啦啦队|cheerleader
有屌女|dickgirl
六九式|sixty-nine
哥布林|goblin
史莱姆|slime
女巨人|giantess
体型差|size difference
触手发|tentacle hair
孕晚期|late pregnancy
乳汁状|milky
子宫纹|womb tattoo
挤奶器|milking machine
大特写|extreme close up
荷兰角|dutch angle
拍立得|polaroid
热成像|thermal
一群人|crowd
波浪卷|wavy hair
丸子头|hair bun
高腰裙|high-waist skirt
长筒袜|thighhighs
张开嘴|open mouth
咖啡店|cafe
高质量|best quality
赛璐璐|cel shading
电影光|cinematic lighting
银白色|silver
银灰色|silver
黑长直|black hair
猫耳朵|cat ears
兔耳朵|rabbit ears
小朋友|child
小女孩|loli
阿米娅|amiya (arknights)
凯尔希|kal'tsit (arknights)
能天使|exusiai (arknights)
斯卡蒂|skadi (arknights)
幽灵鲨|specter (arknights)
迷迭香|rosmontis (arknights)
麦哲伦|magallan (arknights)
白面鸮|ptilopsis (arknights)
芭芭拉|barbara (genshin impact)
迪卢克|diluc (genshin impact)
菲谢尔|fischl (genshin impact)
诺艾尔|noelle (genshin impact)
纳西妲|nahida (genshin impact)
迪希雅|dehya (genshin impact)
芙宁娜|furina (genshin impact)
娜维娅|navia (genshin impact)
三月七|march 7th (honkai: star rail)
瓦尔特|welt (honkai: star rail)
卡芙卡|kafka (honkai: star rail)
克拉拉|clara (honkai: star rail)
杰帕德|gepard (honkai: star rail)
黑天鹅|black swan (honkai: star rail)
知更鸟|robin (honkai: star rail)
漂泊者|rover (wuthering waves)
卡卡罗|calcharo (wuthering waves)
莫特斐|mortefi (wuthering waves)
相里要|xiangli yao (wuthering waves)
守岸人|shorekeeper (wuthering waves)
维里奈|verina (wuthering waves)
佳代子|kayoko (blue archive)
日富美|hifumi (blue archive)
爱丽丝|aris (blue archive)
明日奈|asuna (blue archive)
孙尚香|lady_sun (honor of kings)
诸葛亮|kongming (honor of kings)
花木兰|mulan (honor of kings)
武则天|wu_zetian (honor of kings)
杨玉环|yuhuan (honor of kings)
兰陵王|lanling_wang (honor of kings)
狄仁杰|di_renjie (honor of kings)
米莱狄|milady (honor of kings)
雅典娜|athena (honor of kings)
司马懿|sima_yi (honor of kings)
安琪拉|angela (honor of kings)
夏洛特|charlotte (honor of kings)
朵莉亚|dolia (honor of kings)
芙莉莲|frieren
辛美尔|himmel (sousou no frieren)
阿乌拉|aura (sousou no frieren)
赛莉艾|serie (sousou no frieren)
尤贝尔|ubel (sousou no frieren)
五条悟|gojo satoru
伏黑惠|fushiguro megumi
蝴蝶忍|kochou shinobu
猗窝座|akaza (kimetsu no yaiba)
轰焦冻|todoroki shoto
利威尔|levi (shingeki no kyojin)
玛奇玛|makima (chainsaw man)
早川秋|hayakawa aki
山田凉|yamada ryo
早坂爱|hayasaka ai
星野爱|hoshino ai
阿尼亚|anya (spy x family)
莱欧斯|laios touden
洁世一|isagi yoichi
蜂乐回|bachira meguru
苏苏洛|sussurro (arknights)
艾丽妮|irene (arknights)
塞雷娅|saria (arknights)
羽毛笔|la pluma (arknights)
刻俄柏|ceobe (arknights)
诗怀雅|swire (arknights)
杰西卡|jessica (arknights)
塔露拉|talulah (arknights)
桃金娘|myrtle (arknights)
食铁兽|feater (arknights)
龙舌兰|tequila (arknights)
华法琳|warfarin (arknights)
芙兰卡|franka (arknights)
嘉维尔|gavial (arknights)
弑君者|crownslayer (arknights)
克洛丝|kroos (arknights)
逻各斯|logos (arknights)
送葬人|executor (arknights)
帕拉斯|pallas (arknights)
伊内丝|ines (arknights)
多萝西|dorothy (arknights)
玛恩纳|mlynar (arknights)
提纳里|tighnari (genshin impact)
坎蒂丝|candace (genshin impact)
莱依拉|layla (genshin impact)
珐露珊|faruzan (genshin impact)
绮良良|kirara (genshin impact)
琳妮特|lynette (genshin impact)
菲米尼|freminet (genshin impact)
希格雯|sigewinne (genshin impact)
玛薇卡|mavuika (genshin impact)
希诺宁|xilonen (genshin impact)
基尼奇|kinich (genshin impact)
玛拉妮|mualani (genshin impact)
卡齐娜|kachina (genshin impact)
欧洛伦|ororon (genshin impact)
瓦蕾莎|varesa (genshin impact)
爱可菲|escoffier (genshin impact)
丝柯克|skirk (genshin impact)
艾丽丝|alice (genshin impact)
迪奥娜|diona (genshin impact)
班尼特|bennett (genshin impact)
夏洛蒂|charlotte (genshin impact)
阿贝多|albedo (genshin impact)
夏沃蕾|chevreuse (genshin impact)
恰斯卡|chasca (genshin impact)
伊安珊|iansan (genshin impact)
法尔伽|varka (genshin impact)
大黑塔|the herta (honkai: star rail)
星期日|sunday (honkai: star rail)
阮·梅|ruan mei (honkai: star rail)
波提欧|boothill (honkai: star rail)
忘归人|fugue (honkai: star rail)
艾丝妲|asta (honkai: star rail)
桂乃芬|guinaifen (honkai: star rail)
加拉赫|gallagher (honkai: star rail)
娜塔莎|natasha (honkai: star rail)
史瓦罗|svarog (honkai: star rail)
纳努克|nanook (honkai: star rail)
呜呜伯|wubbaboo (honkai: star rail)
斯科特|skott (honkai: star rail)
莱古斯|lygus (honkai: star rail)
阿奎拉|aquila (honkai: star rail)
开拓者|trailblazer (honkai: star rail)
赛飞儿|cipher (honkai: star rail)
长夜月|evernight (honkai: star rail)
海瑟音|hysilens (honkai: star rail)
那刻夏|anaxa (honkai: star rail)
珂莱塔|carlotta (wuthering waves)
弗洛洛|phrolova (wuthering waves)
布兰特|brant (wuthering waves)
洛可可|roccia (wuthering waves)
哥舒临|geshu lin (wuthering waves)
无冠者|crownless (wuthering waves)
无梦者|dreamless (wuthering waves)
赫卡忒|hecate (wuthering waves)
利维坦|leviathan (wuthering waves)
埃拉托|erato (arknights)
杰作|masterpiece
线稿|lineart
Q版|chibi
插画|illustration
监督|kantoku
慕夏|alphonse mucha
今敏|satoshi kon
顾卫|guweiz
莫奈|claude monet
梵高|vincent van gogh
席勒|egon schiele
全身|full body
特写|close-up
中景|medium shot
远景|wide shot
前景|foreground
背景|background
景深|depth of field
色差|chromatic aberration
柔焦|soft focus
失焦|out of focus
暗角|vignetting
逆光|backlighting
硬光|hard light
主光|key light
补光|fill light
烛光|candlelight
月光|moonlight
日光|sunlight
光束|light rays
磷光|phosphorescent
火光|firelight
投影|cast shadows
底光|underlighting
顶光|top lighting
侧光|side lighting
极光|aurora
多女|multiple girls
多男|multiple boys
单人|solo
中性|androgynous
儿童|child
猫娘|catgirl
狐娘|fox girl
精灵|elf
天使|angel
眼镜|glasses
雀斑|freckles
晒黑|tan
高挑|tall
娇小|short
情侣|couple
修女|nun
女仆|maid
骑士|knight
公主|princess
魔女|witch
偶像|idol
护士|nurse
士兵|soldier
海盗|pirate
忍者|ninja
武士|samurai
侦探|detective
厨师|chef
画家|artist
学生|student
教师|teacher
兽耳|animal ears
纤细|slender
微胖|chubby
宽胯|wide hips
细腰|narrow waist
巨乳|huge breasts
大胸|large breasts
小胸|small breasts
平胸|flat chest
腹肌|abs
锁骨|collarbone
露肩|bare shoulders
肚脐|navel
长腿|long legs
短腿|short legs
宽肩|broad shoulders
窄肩|narrow shoulders
瘦削|thin
骨感|skinny
丰满|plump
丰韵|voluptuous
小手|small hands
大手|large hands
颈部|neck
腰部|waist
臀部|hips
大腿|thighs
小腿|calves
脚踝|ankles
光腿|bare legs
露臂|bare arms
露腰|bare midriff
腹部|midriff
小腹|belly
背部|back
肩膀|shoulders
双足|feet
赤足|bare feet
站立|standing
坐着|sitting
跪着|kneeling
躺着|lying
仰卧|on back
俯卧|on stomach
蹲着|squatting
翘腿|crossed legs
举手|arms up
前倾|leaning forward
后仰|leaning back
瘫倒|collapsed
抱膝|hugging knees
喝水|drinking
睡着|sleeping
奔跑|running
行走|walking
跳跃|jumping
跳舞|dancing
施法|casting spell
指着|pointing
挥手|waving
比耶|peace sign
自拍|selfie
转身|turning around
正座|seiza
伏蹲|crouching
弯腰|bending over
俯身|bending forward
抬臂|arm raised
抱臂|arms crossed
垂手|arms at sides
敬礼|salute
鼓掌|clapping
阅读|reading
书写|writing
打字|typing
持剑|holding sword
持杖|holding staff
撑伞|holding umbrella
拿花|holding flower
提包|carrying bag
跑开|running away
走开|walking away
爬行|crawling
攀爬|climbing
游泳|swimming
漂浮|floating
飞行|flying
坠落|falling
旋转|spinning
踢腿|kick
出拳|punch
格挡|blocking
投掷|throwing
伸手|reaching out
牵手|holding hands
拥抱|hugging
亲吻|kiss
膝枕|lap pillow
侧睡|sleeping on side
靠墙|leaning on wall
骑乘|riding
骑马|riding horse
驾驶|driving
滑雪|skiing
滑板|skateboarding
冲浪|surfing
蹦跳|skipping
踮脚|tiptoeing
捂嘴|covering mouth
捂脸|covering face
抬头|looking up
低头|looking down
侧目|looking to the side
歪头|head tilt
点头|nodding
开心|happy
微笑|smile
大笑|laughing
哭泣|crying
泪水|tears
悲伤|sad
生气|angry
撅嘴|pout
脸红|blush
羞涩|shy
惊讶|surprised
震惊|shocked
害怕|scared
困倦|sleepy
疲惫|tired
无聊|bored
严肃|serious
得意|smug
坏笑|smirk
病娇|yandere
张嘴|open mouth
闭嘴|closed mouth
闭眼|closed eyes
眨眼|wink
吐舌|tongue out
流汗|sweating
紧张|nervous
困惑|confused
疑惑|puzzled
好奇|curious
兴奋|excited
坚定|determined
自信|confident
自豪|proud
放松|relieved
平静|calm
浅笑|soft smile
苦笑|bitter smile
凄笑|sad smile
狂笑|maniacal laugh
含泪|teary eyes
肿眼|puffy eyes
微红|light blush
慌张|flustered
惊慌|panicking
惊恐|terrified
厌恶|disgusted
烦躁|annoyed
恼火|irritated
沮丧|frustrated
失望|disappointed
孤独|lonely
忧郁|melancholic
出神|dreamy
恍惚|dazed
冷面|deadpan
坚毅|stoic
傲慢|arrogant
俏皮|playful
调皮|mischievous
轻笑|chuckling
窃笑|snickering
叹气|sighing
尖叫|screaming
大喊|shouting
低语|whispering
唱歌|singing
哼歌|humming
汗滴|sweatdrop
冷汗|nervous sweat
发抖|shivering
颤抖|trembling
挑眉|raised eyebrows
皱眉|furrowed brow
担忧|worried
焦虑|anxious
期待|hopeful
感激|grateful
惊喜|surprised smile
思考|thinking
长发|long hair
短发|short hair
双辫|twin braids
马尾|ponytail
单辫|braid
发髻|bun
刘海|bangs
鬓发|sidelocks
呆毛|ahoge
卷发|curly hair
直发|straight hair
湿发|wet hair
飘发|floating hair
铲青|undercut
寸头|buzz cut
板寸|crew cut
发片|hair flaps
发带|hair ribbon
发箍|hairband
发饰|hair ornament
发夹|hair clip
发簪|hairpin
发花|hair flower
发结|hair bow
发圈|hair scrunchie
头带|headband
头巾|bandana
金发|blonde hair
白发|white hair
银发|silver hair
灰发|grey hair
黑发|black hair
棕发|brown hair
红发|red hair
橙发|orange hair
粉发|pink hair
紫发|purple hair
蓝发|blue hair
绿发|green hair
染发|dyed hair
盘发|updo
散发|hair spread out
披发|hair down
细辫|micro braids
脏辫|dreadlocks
绿瞳|green eyes
蓝瞳|blue eyes
红瞳|red eyes
金瞳|golden eyes
黄瞳|yellow eyes
紫瞳|purple eyes
粉瞳|pink eyes
棕瞳|brown eyes
黑瞳|black eyes
灰瞳|grey eyes
银瞳|silver eyes
橙瞳|orange eyes
吊眼|tsurime
垂眼|tareme
睫毛|eyelashes
妆容|makeup
口红|lipstick
小嘴|small mouth
尖牙|sharp teeth
狐耳|fox ears
猫耳|cat ears
兔耳|rabbit ears
犄角|horns
光环|halo
翅膀|wings
尾巴|tail
尖耳|pointy ears
圆耳|round ears
熊耳|bear ears
狼耳|wolf ears
狗耳|dog ears
鼠耳|mouse ears
马耳|horse ears
龙角|dragon horns
独角|single horn
弯角|curved horns
大角|large horns
小角|small horns
触角|antennae
羽毛|feathers
黑翼|black wings
白翼|white wings
龙翼|dragon wings
狐尾|fox tail
猫尾|cat tail
狼尾|wolf tail
龙尾|dragon tail
多角|multiple horns
眼罩|eyepatch
墨镜|sunglasses
面具|mask
口罩|mouth mask
伤疤|scar
眉毛|eyebrows
浓眉|thick eyebrows
细眉|thin eyebrows
额头|forehead
竖瞳|slit pupils
眉钉|eyebrow piercing
耳钉|ear piercing
耳环|earrings
眯眼|squinting
牙齿|teeth
利爪|claws
战纹|war paint
纹身|tattoo
T恤|t-shirt
背心|tank top
抹胸|tube top
卫衣|sweatshirt
毛衣|sweater
开衫|cardigan
马甲|vest
裸肩|bare shoulders
无袖|sleeveless
长袖|long sleeves
短袖|short sleeves
长裙|long skirt
婚纱|wedding dress
校服|school uniform
球衣|jersey
泳装|swimsuit
围裙|apron
军装|military uniform
警服|police uniform
和服|kimono
浴衣|yukata
汉服|hanfu
旗袍|qipao
甚平|jinbei
羽织|haori
夹克|jacket
大衣|coat
风衣|trench coat
雨衣|raincoat
披风|cape
斗篷|cloak
披肩|shawl
长裤|pants
短裤|shorts
泳裤|swim shorts
西裤|trousers
靴子|boots
短靴|ankle boots
跑鞋|running shoes
凉鞋|sandals
单鞋|pumps
拖鞋|slippers
木屐|geta
草履|zori
赤脚|barefoot
足袋|tabi
鞋套|spats
护腿|leg warmers
护臂|arm warmers
长袜|stockings
袜子|socks
短袜|ankle socks
内衣|lingerie
文胸|bra
内裤|underwear
睡衣|pajamas
睡裙|nightgown
浴袍|bathrobe
褶边|frilled
蕾丝|lace
丝带|ribbon
领结|bowtie
领带|necktie
高腰|high-waist
束腰|corset
盔甲|armor
板甲|plate armor
露背|backless
透视|see-through
拉链|zipper
毛边|fur trim
兜帽|hood
口袋|pockets
饰带|sash
纱笼|sarong
罩袍|tabard
裹布|cloth wrap
发环|hair rings
头花|hair flower
花簪|kanzashi
发绳|hair tie
发珠|hair beads
帽子|hat
草帽|straw hat
礼帽|fedora
军帽|military hat
帽檐|visor
耳罩|ear muffs
项链|necklace
颈链|choker
围巾|scarf
手套|gloves
手链|bracelet
戒指|ring
臂环|armlet
脚链|anklet
腰带|belt
背带|suspenders
背包|backpack
手袋|handbag
腰包|pouch
钱夹|wallet
面纱|veil
雨伞|umbrella
扇子|fan
折扇|folding fan
长剑|sword
匕首|dagger
法杖|staff
长弓|longbow
箭袋|quiver
手枪|pistol
步枪|rifle
长枪|spear
盾牌|shield
魔杖|wand
权杖|scepter
鞭子|whip
锁链|chain
手表|watch
方巾|bandana
头冠|tiara
王冠|crown
胸针|brooch
吊坠|pendant
徽章|badge
臂章|armband
头饰|headdress
绷带|bandage
护膝|knee pads
护肘|elbow pads
卧室|bedroom
教室|classroom
厨房|kitchen
浴室|bathroom
客厅|living room
餐厅|dining room
走廊|hallway
阁楼|attic
病房|hospital room
车内|car interior
电梯|elevator
楼梯|staircase
阳台|balcony
屋顶|rooftop
窗边|window
砖墙|brick wall
神社|shrine
校门|school gate
操场|sports field
食堂|cafeteria
宿舍|dormitory
公园|park
森林|forest
海滩|beach
高山|mountain
沙漠|desert
废墟|ruins
竹林|bamboo forest
田野|field
花田|flower field
花园|garden
温室|greenhouse
庭院|courtyard
寺庙|temple
教堂|church
墓地|graveyard
集市|market
祭典|festival
机场|airport
港口|harbor
桥梁|bridge
小巷|alley
工厂|factory
书店|bookstore
餐馆|restaurant
旅馆|inn
温泉|hot spring
雪山|snowy mountain
火山|volcano
悬崖|cliff
岛屿|island
乡村|countryside
稻田|rice field
风车|windmill
灯塔|lighthouse
城堡|castle
宫殿|palace
高塔|tower
要塞|fortress
村庄|village
小镇|town
洞穴|cave
营地|camp
水下|underwater
深海|deep sea
天空|sky
云朵|clouds
星空|starry sky
夜空|night sky
星云|nebula
行星|planet
银河|galaxy
海洋|ocean
河流|river
湖泊|lake
瀑布|waterfall
室内|indoors
室外|outdoors
无人|no humans
全景|panorama
夏天|summer
冬天|winter
春天|spring
秋天|autumn
下雨|rain
大雨|heavy rain
小雨|light rain
雨滴|rain droplets
白雪|snow
下雪|snowing
降雪|snowfall
雪花|snowflakes
浓雾|fog
薄雾|mist
多云|cloudy
阴天|overcast
晴空|clear sky
晴天|sunny
雷雨|thunderstorm
闪电|lightning
雷声|thunder
刮风|wind
强风|strong wind
微风|breeze
樱花|cherry blossoms
红叶|autumn leaves
落叶|falling leaves
花瓣|petals
夜晚|night
白天|day
黎明|dawn
黄昏|dusk
日落|sunset
日出|sunrise
午夜|midnight
正午|noon
暮色|twilight
星夜|starry night
满月|full moon
弯月|crescent moon
月亮|moon
阳光|sunlight
彩虹|rainbow
冰雹|hail
热浪|heat haze
潮湿|humidity
水洼|puddle
影子|shadow
日食|eclipse
台风|typhoon
露水|dew
空调|air conditioner
杯子|cup
茶杯|teacup
书本|book
相机|camera
吉他|guitar
蜡烛|candle
灯笼|lantern
气球|balloon
西瓜|watermelon
冰棒|popsicle
水瓶|water bottle
坐垫|cushion
毯子|blanket
枕头|pillow
花朵|flower
玫瑰|rose
信件|letter
信封|envelope
钢笔|pen
铅笔|pencil
画笔|paintbrush
粉笔|chalk
黑板|blackboard
键盘|keyboard
鼠标|computer mouse
电视|television
时钟|clock
沙漏|hourglass
镜子|mirror
发刷|hairbrush
香水|perfume
毛巾|towel
香皂|soap
浴缸|bathtub
淋浴|shower
篮子|basket
纸箱|box
礼盒|gift box
礼物|present
地图|map
火柴|matchsticks
烛台|candle holder
花瓶|vase
盆栽|potted plant
扫帚|broom
拖把|mop
水桶|bucket
梯子|ladder
锤子|hammer
剪刀|scissors
线团|thread
茶壶|teapot
水壶|kettle
汤锅|pot
筷子|chopsticks
叉子|fork
勺子|spoon
小刀|knife
盘子|plate
饭碗|bowl
面包|bread
蛋糕|cake
饼干|cookie
糖果|candy
苹果|apple
橙子|orange
草莓|strawberry
香蕉|banana
樱桃|cherry
葡萄|grape
柠檬|lemon
桃子|peach
便当|bento
饭团|onigiri
寿司|sushi
拉面|ramen
团子|dango
果汁|juice
汽水|soda
酒杯|wine glass
罐子|jar
钥匙|key
挂锁|padlock
硬币|coin
钞票|money
车票|ticket
报纸|newspaper
杂志|magazine
海报|poster
照片|photograph
相册|album
折纸|origami
纸鹤|paper crane
风筝|kite
皮球|ball
篮球|basketball
足球|soccer ball
跳绳|skipping rope
钓竿|fishing rod
帐篷|tent
营火|campfire
睡袋|sleeping bag
贝壳|seashell
海星|starfish
南瓜|pumpkin
烟花|fireworks
人偶|doll
积木|toy blocks
拼图|puzzle
棋盘|chess board
骰子|dice
桌游|board game
奖杯|trophy
奖牌|medal
卷轴|scroll
药水|potion
宝箱|treasure chest
水印|watermark
文字|text
签名|signature
标志|logo
丑陋|ugly
错误|error
噪点|noise
颗粒|grain
草稿|sketch
凌乱|messy
画框|frame
裸露|nude
网址|web address
字幕|subtitles
印章|stamp
色带|color banding
重影|double image
制服|uniform
领巾|cravat
长袍|robe
珠宝|jewelry
鹿角|deer antlers
人鱼|mermaid
蛇尾|snake tail
獠牙|fangs
胡须|beard
光头|bald
金属|metal
头盔|helmet
火焰|fire
竹筒|bamboo
刀刃|blade
斧头|axe
全裸|completely nude
裸体|nude
赤身|naked
半脱|partially undressed
裸腿|bare legs
裸背|bare back
裸臀|bare ass
乳头|nipples
乳晕|areola
外阴|vulva
阴唇|labia
阴蒂|clitoris
阴毛|pubic hair
剃毛|shaved pussy
阴茎|penis
睾丸|testicles
包皮|foreskin
勃起|erect
下乳|underboob
侧乳|sideboob
乳沟|cleavage
中胸|medium breasts
乳房|breasts
胸部|chest
腰腹|midriff
巨臀|huge ass
屁股|butt
胯部|groin
裆部|crotch
性交|sex
肛交|anal
口交|oral
吮吸|fellatio
口活|blowjob
深喉|deepthroat
舔阴|cunnilingus
舔肛|anilingus
自慰|masturbation
手交|handjob
足交|footjob
腿交|thighjob
乳交|paizuri
磨蹭|grinding
对接|docking
后入|doggystyle
贴墙|against wall
侧卧|spooning
倒立|piledriver
抱举|suspended congress
抬腿|leg lift
张腿|spread legs pose
跪姿|kneeling
蹲姿|squatting
抽送|thrusting
插入|penetration
群交|group sex
四人|foursome
轮番|gangbang
后宫|harem
吸乳|breast sucking
抓乳|breast grab
抓臀|ass grab
掐脖|choking
吻痕|hickey
前戏|foreplay
事后|after sex
事毕|post-coital
接吻|kissing
舌吻|french kiss
亲热|make out
对视|eye contact during sex
按住|pinning down
精液|cum
内射|cum in pussy
中出|creampie
溢出|cum overflow
前液|precum
潮吹|squirt
爱液|pussy juice
蜜液|love juice
湿透|dripping wet
湿润|wet
浸湿|soaked
满溢|overflowing
唾液|saliva
口水|spit
汗水|sweat
大汗|sweaty
泛光|glistening
润滑|lubricated
乳液|lotion
涂油|oiled
湿衣|wet clothes
黏腻|sticky
污渍|stained
体液|bodily fluids
乳汁|milk
泌乳|lactation
母乳|breast milk
喷射|squirting
涌出|gushing
滴落|dripping
湿穴|wet pussy
汁液|juices
无套|no condom
抽出|pulling out
唇印|kiss mark
手印|handprint
红痕|red marks
束缚|bondage
绳缚|shibari
绳索|rope
绳绑|rope bondage
被绑|tied up
绑臂|bound arms
绑腿|bound legs
手铐|handcuffs
镣铐|shackles
链条|chains
项圈|collar
口塞|gag
口球|ball gag
蒙眼|blindfold
头套|hood
腕铐|cuffs
悬吊|suspension bondage
乳夹|nipple clamps
夹子|clamps
重物|weights
贞操|chastity
乳胶|latex
橡胶|rubber
皮革|leather
塑胶|pvc
束带|harness
高跟|heels
长靴|boots
尾塞|tail plug
肛塞|butt plug
马鞭|riding crop
拍板|paddle
散鞭|flogger
滴蜡|candle wax
热蜡|hot wax
冰块|ice
挠痒|tickling
恋足|foot worship
脚底|soles
腋下|armpit
腋毛|armpit hair
恋臀|ass worship
恋乳|breast worship
恋体|body worship
羞辱|humiliation
贬低|degradation
抚摸|petting
主奴|master and slave
支配|dominance
服从|submission
拳交|fisting
扩张|stretching
吸烟|smoking
穿孔|piercing
记号|marking
烙印|brand
笼子|cage
户外|outdoors
露阴|flashing
泳池|pool
池边|poolside
沐浴|bathing
桑拿|sauna
书桌|desk
天台|rooftop
窗户|window
窗帘|curtain
霓虹|neon
晨光|morning light
昏暗|dim light
蒸汽|steam
雾气|mist
裙底|upskirt
走光|wardrobe malfunction
露胸|flashing breasts
露臀|mooning
裸奔|streaking
偷窥|peeping
窥视|voyeur
偷拍|hidden camera
直播|camgirl
写真|photo shoot
闺房|boudoir
爱巢|love nest
列车|train
后座|backseat
反骑|reverse cowgirl
侧入|spooning position
举腿|legs up
屈膝|knees up
弓背|arched back
仰躺|lying on back
侧躺|lying on side
跨坐|straddling
抱持|carried
悬空|suspension
倒挂|upside down
从后|from behind
从前|from front
俯视|from above
仰视|from below
半身|half body
叉腰|hands on hips
回头|looking back
蹲伏|crouching
瘫开|sprawled
蜷缩|curled up
高潮|orgasm
顶点|climax
呻吟|moaning
流涎|drooling mouth
喘息|heavy breathing
潮红|deep blush
眼泪|tears
腿软|shaking legs
膝软|weak knees
力竭|exhausted
失神|dazed
淫靡|lewd
媚笑|seductive smile
咬唇|biting lip
舔唇|licking lips
舌头|tongue
媚眼|seductive look
看你|looking at viewer
害羞|shy
羞耻|embarrassed
羞怯|ashamed
恳求|pleading
顺从|submissive look
冷笑|smirk
吸气|gasping
叫喊|screaming
狂喜|ecstasy
陶醉|blissful
半睡|half asleep
汗珠|sweat drops
欲望|lust
渴望|desire
渴求|wanting
脱掉|clothes off
掀衣|shirt lift
掀裙|skirt lift
撕裂|ripped clothes
滑落|falling off
下滑|slipping
松垮|loose clothes
透明|transparent
薄纱|sheer
网纱|mesh
丝绸|silk
缎面|satin
浴巾|towel
床单|sheet
盖被|covered by blanket
百合|yuri
女女|girl on girl
两女|two girls
耽美|yaoi
男男|boy on boy
两男|two boys
扶她|futanari
双性|hermaphrodite
群像|group
多对|multiple couples
人群|crowd
旁观|watching
绿帽|cuckold
共享|sharing
叠加|stacked
交缠|interlocked
缠绕|tangled
堆叠|pile
群叠|orgy pile
互舔|mutual oral
六九|69
触手|tentacles
怪物|monster
兽人|orc
恶魔|demon
产卵|oviposition
异形|alien
昆虫|insect
蠕虫|worm
植物|plant
藤蔓|vines
根须|roots
魔法|magic
催眠|hypnosis
堕落|corruption
变身|transformation
附身|possession
膨胀|inflation
巨人|giant
微小|tiny
巨大|macro
极小|micro
繁殖|breeding
受孕|impregnation
龟头|glans
血管|veins
肛门|anus
肛部|anal focus
后庭|asshole
松弛|loose
紧致|tightened
肚子|stomach
腿缝|thigh gap
脚趾|toes
足弓|arches
手指|fingers
指甲|nails
手腕|wrists
脖子|neck
脊柱|spine
肩胛|shoulder blades
头发|hair
辫子|braid
怀孕|pregnant
孕期|pregnancy
孕肚|pregnant belly
大肚|big belly
挤奶|milking
哺乳|nursing
涨乳|swollen breasts
胀满|engorged
易孕|fertile
隆起|visible bulge
深插|deep penetration
宫颈|cervix
子宫|uterus
排卵|ovulation
月经|menstruation
处女|virgin
破处|defloration
初次|first time
纯真|innocent
淫荡|slutty
淫态|lewd expression
无耻|shameless
侧拍|from side
过肩|over shoulder
微距|macro
广角|wide angle
鱼眼|fisheye
斜角|tilted angle
低角|low angle
高角|high angle
鸟瞰|bird eye
虫视|worm eye
局部|detail shot
裁切|cropped
出画|out of frame
散景|bokeh
业余|amateur
抓拍|candid
夜视|night vision
红外|infrared
红色|red
橙色|orange
黄色|yellow
绿色|green
青色|cyan
蓝色|blue
紫色|purple
粉色|pink
黑色|black
白色|white
灰色|grey
棕色|brown
金色|gold
银色|silver
米色|beige
深色|dark
浅色|light
亮色|bright
彩色|colorful
女孩|girl
少女|girl
男孩|boy
男人|man
女人|woman
女性|female
男性|male
老人|elderly
结实|muscular
宽臀|wide hips
白皙|pale skin
肤色|skin
乱发|messy hair
挑染|streaked hair
眼睛|eyes
大眼|big eyes
裙子|skirt
短裙|miniskirt
衬衫|shirt
西装|suit
外套|jacket
丝袜|pantyhose
缎带|ribbon
手机|smartphone
电脑|laptop
躺下|lying
托腮|chin on hand
睡觉|sleeping
看书|reading
流泪|tears
睁眼|open eyes
房间|room
街道|street
城市|city
清晨|morning
下午|afternoon
花海|flower field
桌子|desk
椅子|chair
地板|floor
电扇|electric fan
高清|highres
细节|detailed
动漫|anime
水彩|watercolor
油画|oil painting
素描|sketch
单色|monochrome
像素|pixel art
柔光|soft lighting
暖光|warm lighting
冷光|cool lighting
阴影|shadow
光斑|bokeh
可爱|cute
美丽|beautiful
帅气|handsome
性感|sexy
优雅|elegant
温暖|warm
梦幻|dreamy
动态|dynamic
正面|from front
侧面|from side
背面|from behind
拿着|holding
站在|standing
坐在|sitting
躺在|lying
看向|looking at
背影|from behind
银白|silver
灰白|white
雨中|rain
床边|bedside
门口|doorway
白毛|white hair
金毛|blonde hair
御姐|mature female
大叔|old man
夏日|summer
盛夏|summer
银灰|silverash (arknights)
泥岩|mudrock (arknights)
铃兰|suzuran (arknights)
白金|platinum (arknights)
蓝毒|blue poison (arknights)
夜莺|nightingale (arknights)
闪灵|shining (arknights)
天火|skyfire (arknights)
早露|rosa (arknights)
森蚺|eunectes (arknights)
傀影|phantom (arknights)
派蒙|paimon (genshin impact)
安柏|amber (genshin impact)
丽莎|lisa (genshin impact)
凯亚|kaeya (genshin impact)
温迪|venti (genshin impact)
可莉|klee (genshin impact)
莫娜|mona (genshin impact)
刻晴|keqing (genshin impact)
七七|qiqi (genshin impact)
凝光|ningguang (genshin impact)
甘雨|ganyu (genshin impact)
胡桃|hu tao (genshin impact)
宵宫|yoimiya (genshin impact)
妮露|nilou (genshin impact)
申鹤|shenhe (genshin impact)
优菈|eula (genshin impact)
丹恒|dan heng (honkai: star rail)
姬子|himeko (honkai: star rail)
银狼|silver wolf (honkai: star rail)
希儿|seele (honkai: star rail)
佩拉|pela (honkai: star rail)
虎克|hook (honkai: star rail)
白露|bailu (honkai: star rail)
景元|jing yuan
停云|tingyun (honkai: star rail)
罗刹|luocha (honkai: star rail)
符玄|fu xuan (honkai: star rail)
镜流|jingliu (honkai: star rail)
托帕|topaz (honkai: star rail)
藿藿|huohuo (honkai: star rail)
花火|sparkle (honkai: star rail)
黄泉|acheron (honkai: star rail)
流萤|firefly (honkai: star rail)
砂金|aventurine (honkai: star rail)
秧秧|yangyang (wuthering waves)
炽霞|chixia (wuthering waves)
白芷|baizhi (wuthering waves)
吟霖|yinlin (wuthering waves)
忌炎|jiyan (wuthering waves)
鉴心|jianxin (wuthering waves)
散华|sanhua (wuthering waves)
丹瑾|danjin (wuthering waves)
桃祈|taoqi (wuthering waves)
凌阳|lingyang (wuthering waves)
安可|encore (wuthering waves)
今汐|jinhsi (wuthering waves)
长离|changli (wuthering waves)
折枝|zhezhi (wuthering waves)
白子|shiroko (blue archive)
星野|hoshino (blue archive)
芹香|serika (blue archive)
野宫|nonomi (blue archive)
绫音|ayane (blue archive)
优香|yuuka (blue archive)
诺亚|noa (blue archive)
阿露|aru (blue archive)
睦月|mutsuki (blue archive)
春香|haruna (blue archive)
日奈|hina (blue archive)
伊织|iori (blue archive)
千夏|chinatsu (blue archive)
亚子|ako (blue archive)
小春|koharu (blue archive)
花子|hanako (blue archive)
未花|mika (blue archive)
圣亚|seia (blue archive)
鹤城|tsurugi (blue archive)
莲见|hasumi (blue archive)
真白|mashiro (blue archive)
桃井|momoi (blue archive)
柚子|yuzu (blue archive)
香琳|karin (blue archive)
若藻|wakamo (blue archive)
貂蝉|diaochan (honor of kings)
小乔|xiao_qiao (honor of kings)
大乔|da_qiao (honor of kings)
李白|li_bai (honor of kings)
妲己|daji (honor of kings)
甄姬|lady_zhen (honor of kings)
虞姬|consort_yu (honor of kings)
嬴政|ying_zheng (honor of kings)
白起|bai_qi (honor of kings)
周瑜|zhou_yu (honor of kings)
马超|ma_chao (honor of kings)
孙策|sun_ce (honor of kings)
嫦娥|chang'e (honor of kings)
女娲|nuwa (honor of kings)
李信|li_xin (honor of kings)
亚连|allain (honor of kings)
弈星|yixing (honor of kings)
赵云|zilong (honor of kings)
菲伦|fern (sousou no frieren)
艾泽|eisen (sousou no frieren)
兰泽|land (sousou no frieren)
堕姬|daki (kimetsu no yaiba)
电次|denji (chainsaw man)
帕瓦|power (chainsaw man)
娜美|nami (one piece)
雷姆|rem (re:zero)
先西|senshi (dungeon meshi)
法琳|falin touden
猫猫|maomao (kusuriya no hitorigoto)
埼玉|saitama (one-punch man)
龙卷|tatsumaki
惠惠|megumin
澄闪|goldenglow (arknights)
星熊|hoshiguma (arknights)
塑心|virtuosa (arknights)
重岳|chongyue (arknights)
苇草|reed (arknights)
初雪|pramanix (arknights)
提丰|typhon (arknights)
赫默|silence (arknights)
水月|mizuki (arknights)
临光|nearl (arknights)
霜星|frostnova (arknights)
斥罪|penance (arknights)
鞭刃|whislash (arknights)
嵯峨|saga (arknights)
风笛|bagpipe (arknights)
瑕光|blemishine (arknights)
霜叶|frostleaf (arknights)
棘刺|thorns (arknights)
雷蛇|liskarm (arknights)
凛冬|zima (arknights)
星极|astesia (arknights)
巫恋|shamare (arknights)
古米|gummy (arknights)
号角|horn (arknights)
黑键|ebenholz (arknights)
琴柳|saileach (arknights)
可颂|croissant (arknights)
散兵|scaramouche (genshin impact)
钟离|zhongli (genshin impact)
夜兰|yelan (genshin impact)
卡维|kaveh (genshin impact)
赛诺|cyno (genshin impact)
柯莱|collei (genshin impact)
林尼|lyney (genshin impact)
队长|capitano (genshin impact)
木偶|sandrone (genshin impact)
女士|signora (genshin impact)
博士|dottore (genshin impact)
千织|chiori (genshin impact)
闲云|xianyun (genshin impact)
云堇|yun jin (genshin impact)
烟绯|yanfei (genshin impact)
辛焱|xinyan (genshin impact)
砂糖|sucrose (genshin impact)
雷泽|razor (genshin impact)
行秋|xingqiu (genshin impact)
重云|chongyun (genshin impact)
北斗|beidou (genshin impact)
香菱|xiangling (genshin impact)
瑶瑶|yaoyao (genshin impact)
托马|thoma (genshin impact)
五郎|gorou (genshin impact)
早柚|sayu (genshin impact)
白术|baizhu (genshin impact)
嘉明|gaming (genshin impact)
多莉|dori (genshin impact)
米卡|mika (genshin impact)
归终|guizhong (genshin impact)
黑塔|herta (honkai: star rail)
飞霄|feixiao (honkai: star rail)
迷迷|mem (honkai: star rail)
云璃|yunli (honkai: star rail)
缇宝|tribbie (honkai: star rail)
萨姆|sam (honkai: star rail)
瑶光|yao guang (honkai: star rail)
灵砂|lingsha (honkai: star rail)
翡翠|jade (honkai: star rail)
青雀|qingque (honkai: star rail)
椒丘|jiaoqiu (honkai: star rail)
乱破|rappa (honkai: star rail)
账账|numby (honkai: star rail)
彦卿|yanqing (honkai: star rail)
缇安|trianne (honkai: star rail)
缇宁|trinnon (honkai: star rail)
素裳|sushang (honkai: star rail)
银枝|argenti (honkai: star rail)
貊泽|moze (honkai: star rail)
应星|yingxing (honkai: star rail)
驭空|yukong (honkai: star rail)
寒鸦|hanya (honkai: star rail)
米沙|misha (honkai: star rail)
雪衣|xueyi (honkai: star rail)
丹枫|dan feng (honkai: star rail)
白厄|phainon (honkai: star rail)
昔涟|cyrene (honkai: star rail)
万敌|mydei (honkai: star rail)
卢卡|luka (honkai: star rail)
阿兰|arlan (honkai: star rail)
白珩|baiheng (honkai: star rail)
药师|yaoshi (honkai: star rail)
阿哈|aha (honkai: star rail)
谛听|diting (honkai: star rail)
呼雷|hoolay (honkai: star rail)
佩佩|peppy (honkai: star rail)
风堇|hyacine (honkai: star rail)
遐蝶|castorice (honkai: star rail)
菲比|phoebe (wuthering waves)
赞妮|zani (wuthering waves)
尤诺|iuno (wuthering waves)
露帕|lupa (wuthering waves)
阿布|abby (wuthering waves)
伤痕|scar (wuthering waves)
渊武|yuanwu (wuthering waves)
釉瑚|youhu (wuthering waves)
灯灯|lumi (wuthering waves)
卜灵|buling (wuthering waves)
秋水|aalto (wuthering waves)
米娅|mya (wuthering waves)
千咲|chisa (wuthering waves)
帕姆|pom-pom (honkai: star rail)
四月|april (arknights)
`;

export const CHARACTERS = [{"names":["阿米娅","阿米娅（明日方舟）"],"tag":"amiya (arknights)","game":"明日方舟","auto":"棕发|brown hair;马尾|ponytail;蓝瞳|blue eyes;兔耳|rabbit ears;戒指|ring;兜帽|hood;黑色连裤袜|black pantyhose;小胸|small breasts"},{"names":["凯尔希","凯尔希（明日方舟）"],"tag":"kal'tsit (arknights)","game":"明日方舟","auto":"白发|white hair;绿瞳|green eyes;兽耳|animal ears;裸肩|bare shoulders;手表|watch;短靴|ankle boots;高跟鞋|high heels;戒指|ring;女仆装|maid outfit;鬓发|sidelocks"},{"names":["陈","陈（明日方舟）"],"tag":"ch'en (arknights)","game":"明日方舟","auto":"蓝发|blue hair;双马尾|twintails;发髻|hair bun;红瞳|red eyes;尾巴|tail;制服|uniform;过膝靴|thigh boots;巨乳|huge breasts;中式服装|chinese clothes"},{"names":["能天使","能天使（明日方舟）"],"tag":"exusiai (arknights)","game":"明日方舟","auto":"红发|red hair;染发|dyed hair;短发|short hair;马尾|ponytail;橙瞳|orange eyes;光环|halo;翅膀|wings;遮单眼发|hair over one eye;黑色连裤袜|black pantyhose;运动鞋|sneakers"},{"names":["德克萨斯","德克萨斯（明日方舟）"],"tag":"texas (arknights)","game":"明日方舟","auto":"藏蓝发|navy blue hair;蓝瞳|blue eyes;刘海|bangs;手套|gloves;黑色连裤袜|black pantyhose;制服|uniform;运动鞋|sneakers"},{"names":["拉普兰德","拉普兰德（明日方舟）"],"tag":"lappland (arknights)","game":"明日方舟","auto":"银发|silver hair;银瞳|silver eyes;兽耳|animal ears;尾巴|tail;伤疤|scar;大胸|large breasts;短靴|ankle boots;抹胸|tube top;发夹|hair clip"},{"names":["银灰","银灰（明日方舟）"],"tag":"silverash (arknights)","game":"明日方舟","auto":"白发|white hair;长发|long hair;灰瞳|grey eyes;兽耳|animal ears;尾巴|tail;披风|cape;发饰|hair ornament;短靴|ankle boots;领带|necktie;靴子|boots"},{"names":["斯卡蒂","斯卡蒂（明日方舟）"],"tag":"skadi (arknights)","game":"明日方舟","auto":"银发|silver hair;白发|white hair;长发|long hair;呆毛|ahoge;红瞳|red eyes;大胸|large breasts;披风|cape;短靴|ankle boots;大腿|thighs"},{"names":["幽灵鲨","幽灵鲨（明日方舟）"],"tag":"specter (arknights)","game":"明日方舟","auto":"灰发|grey hair;白发|white hair;红瞳|red eyes;修女|nun;过膝靴|thigh boots;披风|cape;过膝袜|thighhighs"},{"names":["迷迭香","迷迭香（明日方舟）"],"tag":"rosmontis (arknights)","game":"明日方舟","auto":"白发|white hair;绿瞳|green eyes;猫耳|cat ears;猫尾|cat tail;小胸|small breasts;猫娘|catgirl;手套|gloves;短靴|ankle boots;无袖|sleeveless;连衣裙|dress"},{"names":["泥岩","泥岩（明日方舟）"],"tag":"mudrock (arknights)","game":"明日方舟","auto":"白发|white hair;红瞳|red eyes;大胸|large breasts;盔甲|armor"},{"names":["W","W（明日方舟）"],"tag":"w (arknights)","game":"明日方舟","auto":"白发|white hair;红瞳|red eyes;尾巴|tail;巨乳|huge breasts;黑色连裤袜|black pantyhose;绷带|bandage"},{"names":["史尔特尔","史尔特尔（明日方舟）"],"tag":"surtr (arknights)","game":"明日方舟","auto":"红发|red hair;紫瞳|purple eyes;长剑|sword;过膝袜|thighhighs;巨乳|huge breasts;裸肩|bare shoulders;连衣裙|dress"},{"names":["艾雅法拉","艾雅法拉（明日方舟）"],"tag":"ifrit (arknights)","game":"明日方舟","auto":"棕发|brown hair;卷发|curly hair;粉瞳|pink eyes;科学家|scientist;过膝袜|thighhighs;短靴|ankle boots;法杖|staff;小胸|small breasts"},{"names":["铃兰","铃兰（明日方舟）"],"tag":"suzuran (arknights)","game":"明日方舟","auto":"绿瞳|green eyes;兽耳|animal ears;尾巴|tail;小胸|small breasts;过膝袜|thighhighs;发箍|hairband;和服|kimono"},{"names":["麦哲伦","麦哲伦（明日方舟）"],"tag":"magallan (arknights)","game":"明日方舟","auto":"棕发|brown hair;大胸|large breasts"},{"names":["白金","白金（明日方舟）"],"tag":"platinum (arknights)","game":"明日方舟","auto":"银发|silver hair;马尾|ponytail;棕瞳|brown eyes;兽耳|animal ears;尾巴|tail;长弓|longbow;过膝袜|thighhighs;手套|gloves;小胸|small breasts"},{"names":["蓝毒","蓝毒（明日方舟）"],"tag":"blue poison (arknights)","game":"明日方舟","auto":"粉发|pink hair;双马尾|twintails;麻花辫|braid;蓝瞳|blue eyes;天使|angel;兜帽|hood;小胸|small breasts;过膝袜|thighhighs"},{"names":["夜莺","夜莺（明日方舟）"],"tag":"nightingale (arknights)","game":"明日方舟","auto":"金发|blonde hair;卷发|curly hair;绿瞳|green eyes;靴子|boots;齐刘海|blunt bangs;小胸|small breasts"},{"names":["闪灵","闪灵（明日方舟）"],"tag":"shining (arknights)","game":"明日方舟","auto":"白发|white hair;超长发|very long hair;高马尾|high ponytail;棕瞳|brown eyes;巨乳|huge breasts;项链|necklace;靴子|boots;兜帽|hood;披风|cape;长剑|sword"},{"names":["普罗旺斯","普罗旺斯（明日方舟）"],"tag":"provence (arknights)","game":"明日方舟","auto":"紫发|purple hair;麻花辫|braid;尾巴|tail;兽耳|animal ears;大胸|large breasts"},{"names":["白面鸮","白面鸮（明日方舟）"],"tag":"ptilopsis (arknights)","game":"明日方舟","auto":"白发|white hair;兽耳|animal ears;机械部件|mechanical parts;短靴|ankle boots;过膝靴|thigh boots"},{"names":["砾","砾（明日方舟）"],"tag":"gravel (arknights)","game":"明日方舟","auto":"粉发|pink hair;棕瞳|brown eyes;过膝袜|thighhighs;靴子|boots;连体衣|bodysuit"},{"names":["天火","天火（明日方舟）"],"tag":"skyfire (arknights)","game":"明日方舟","auto":"棕发|brown hair;橙瞳|orange eyes;猫耳|cat ears;黑色连裤袜|black pantyhose"},{"names":["莫斯提马","莫斯提马（明日方舟）"],"tag":"mostima (arknights)","game":"明日方舟","auto":"蓝发|blue hair;长发|long hair;尾巴|tail;翅膀|wings;光环|halo;天使|angel;吊眼|tsurime;法杖|staff;手套|gloves;晚礼服|evening gown"},{"names":["早露","早露（明日方舟）"],"tag":"rosa (arknights)","game":"明日方舟","auto":"白发|white hair;卷发|curly hair;红瞳|red eyes;异色瞳|heterochromia;学生|student;黑色连裤袜|black pantyhose;巨乳|huge breasts;制服|uniform"},{"names":["森蚺","森蚺（明日方舟）"],"tag":"eunectes (arknights)","game":"明日方舟","auto":"黑发|black hair;短发|short hair;蓝瞳|blue eyes;尖耳|pointy ears;尾巴|tail;盾牌|shield;巨乳|huge breasts;凉鞋|sandals"},{"names":["傀影","傀影（明日方舟）"],"tag":"phantom (arknights)","game":"明日方舟","auto":"灰金发|ash blonde hair;猫耳|cat ears;口罩|mask;手套|gloves;礼帽|fedora;披风|cape"},{"names":["令","令（明日方舟）"],"tag":"ling (arknights)","game":"明日方舟","auto":"蓝发|blue hair;长发|long hair;麻花辫|braid;蓝瞳|blue eyes;尾巴|tail;尖耳|pointy ears;巨乳|huge breasts;短靴|ankle boots"},{"names":["夕","夕（明日方舟）"],"tag":"dusk (arknights)","game":"明日方舟","auto":"黑发|black hair;长发|long hair;红瞳|red eyes;尖耳|pointy ears;画家|artist;纹身|tattoo;短靴|ankle boots;大胸|large breasts;高跟鞋|high heels;旗袍|qipao"},{"names":["荧","荧（原神）"],"tag":"lumine (genshin impact)","game":"原神","auto":"金发|blonde hair;短发|short hair;双胞胎|twins;头花|hair flower;围巾|scarf;过膝靴|thigh boots"},{"names":["空","空（原神）"],"tag":"aether (genshin impact)","game":"原神","auto":"金发|blonde hair;长发|long hair;麻花辫|braid;呆毛|ahoge;橙瞳|orange eyes;双胞胎|twins;披风|cape;靴子|boots;手套|gloves"},{"names":["派蒙","派蒙（原神）"],"tag":"paimon (genshin impact)","game":"原神","auto":"白发|white hair;短发|short hair;蓝瞳|blue eyes;光环|halo;发饰|hair ornament;头饰|headdress;靴子|boots"},{"names":["琴","琴（原神）"],"tag":"jean (genshin impact)","game":"原神","auto":"金发|blonde hair;高马尾|high ponytail;蓝瞳|blue eyes;骑士|knight;吊眼|tsurime;刘海|bangs;巨乳|huge breasts;露背|backless;披风|cape;靴子|boots"},{"names":["安柏","安柏（原神）"],"tag":"amber (genshin impact)","game":"原神","auto":"棕发|brown hair;兔耳|rabbit ears;刘海|bangs;骑士|knight;护目镜|goggles;长弓|longbow;过膝袜|thighhighs;过膝靴|thigh boots;手套|gloves"},{"names":["丽莎","丽莎（原神）"],"tag":"lisa (genshin impact)","game":"原神","auto":"棕发|brown hair;卷发|curly hair;绿瞳|green eyes;巨乳|huge breasts;头花|hair flower;过膝袜|thighhighs;手套|gloves;帽子|hat;女巫帽|witch hat"},{"names":["凯亚","凯亚（原神）"],"tag":"kaeya (genshin impact)","game":"原神","auto":"蓝发|blue hair;马尾|ponytail;蓝瞳|blue eyes;眼罩|eyepatch;披风|cape;靴子|boots;骑士|knight"},{"names":["芭芭拉","芭芭拉（原神）"],"tag":"barbara (genshin impact)","game":"原神","auto":"金发|blonde hair;发髻|hair bun;蓝瞳|blue eyes;偶像|idol;裸肩|bare shoulders;领结|bowtie;分离袖|detached sleeves;连衣裙|dress;连裤袜|pantyhose;短靴|ankle boots"},{"names":["迪卢克","迪卢克（原神）"],"tag":"diluc (genshin impact)","game":"原神","auto":"红发|red hair;马尾|ponytail;红瞳|red eyes;刘海|bangs"},{"names":["温迪","温迪（原神）"],"tag":"venti (genshin impact)","game":"原神","auto":"黑发|black hair;多色发|multicolored hair;麻花辫|braid;绿瞳|green eyes;尖耳|pointy ears;连裤袜|pantyhose;头花|hair flower;披风|cape;长弓|longbow;短裤|shorts"},{"names":["可莉","可莉（原神）"],"tag":"klee (genshin impact)","game":"原神","auto":"金发|blonde hair;双马尾|twintails;呆毛|ahoge;红瞳|red eyes;尖耳|pointy ears;学生|student;背包|backpack;及膝袜|kneehighs;靴子|boots;骑士|knight"},{"names":["莫娜","莫娜（原神）"],"tag":"mona (genshin impact)","game":"原神","auto":"紫发|purple hair;双马尾|twintails;灰瞳|grey eyes;帽子|hat;黑色连裤袜|black pantyhose;吊眼|tsurime;披风|cape;高跟鞋|high heels;分离袖|detached sleeves"},{"names":["刻晴","刻晴（原神）"],"tag":"keqing (genshin impact)","game":"原神","auto":"紫发|purple hair;双马尾|twintails;粉瞳|pink eyes;分离袖|detached sleeves;手套|gloves;黑色连裤袜|black pantyhose;大胸|large breasts;裸肩|bare shoulders;高跟鞋|high heels"},{"names":["七七","七七（原神）"],"tag":"qiqi (genshin impact)","game":"原神","auto":"紫发|purple hair;麻花辫|braid;粉瞳|pink eyes;小胸|small breasts;垂眼|tareme;绷带|bandage;过膝袜|thighhighs;短裤|shorts"},{"names":["菲谢尔","菲谢尔（原神）"],"tag":"fischl (genshin impact)","game":"原神","auto":"金发|blonde hair;双马尾|twintails;绿瞳|green eyes;小胸|small breasts;长弓|longbow;裸肩|bare shoulders;眼罩|eyepatch;领结|bowtie;臂环|armlet;手套|gloves"},{"names":["诺艾尔","诺艾尔（原神）"],"tag":"noelle (genshin impact)","game":"原神","auto":"银发|silver hair;短发|short hair;绿瞳|green eyes;女仆|maid;骑士|knight;黑色连裤袜|black pantyhose;盔甲|armor;头花|hair flower;过膝靴|thigh boots"},{"names":["凝光","凝光（原神）"],"tag":"ningguang (genshin impact)","game":"原神","auto":"白发|white hair;红瞳|red eyes;刘海|bangs;盘发|updo;旗袍|qipao;手套|gloves;高跟鞋|high heels;吊眼|tsurime;巨乳|huge breasts"},{"names":["甘雨","甘雨（原神）"],"tag":"ganyu (genshin impact)","game":"原神","auto":"蓝发|blue hair;卷发|curly hair;呆毛|ahoge;粉瞳|pink eyes;黑色连裤袜|black pantyhose;裸肩|bare shoulders;长弓|longbow;手套|gloves;分离袖|detached sleeves"},{"names":["胡桃","胡桃（原神）"],"tag":"hu tao (genshin impact)","game":"原神","auto":"棕发|brown hair;双马尾|twintails;红瞳|red eyes;头花|hair flower;头饰|headdress;长枪|spear;戒指|ring;汉服|hanfu;小胸|small breasts"},{"names":["雷电将军","雷电将军（原神）"],"tag":"raiden shogun","game":"原神","auto":"紫发|purple hair;麻花辫|braid;紫瞳|purple eyes;光环|halo;鬓发|sidelocks;巨乳|huge breasts;和服|kimono;过膝袜|thighhighs;木屐|geta;头花|hair flower"},{"names":["神里绫华","神里绫华（原神）"],"tag":"kamisato ayaka (genshin impact)","game":"原神","auto":"银发|silver hair;高马尾|high ponytail;蓝瞳|blue eyes;齐刘海|blunt bangs;姬发式|hime cut;和服|kimono;蝴蝶结|bow;折扇|folding fan;项链|necklace;盔甲|armor"},{"names":["宵宫","宵宫（原神）"],"tag":"yoimiya (genshin impact)","game":"原神","auto":"金发|blonde hair;高马尾|high ponytail;长弓|longbow;和服|kimono;天使|angel;绷带|bandage;裸肩|bare shoulders;短袜|ankle socks;吊眼|tsurime;蝴蝶结|bow"},{"names":["八重神子","八重神子（原神）"],"tag":"yae miko","game":"原神","auto":"粉发|pink hair;长发|long hair;紫瞳|purple eyes;狐娘|fox girl;巨乳|huge breasts;巫女服|miko;和服|kimono;刘海|bangs;分离袖|detached sleeves;吊眼|tsurime"},{"names":["珊瑚宫心海","珊瑚宫心海（原神）"],"tag":"sangonomiya kokomi","game":"原神","auto":"粉发|pink hair;高马尾|high ponytail;蓝瞳|blue eyes;齐刘海|blunt bangs;裸肩|bare shoulders;手套|gloves;木屐|geta;蝴蝶结|bow"},{"names":["枫原万叶","枫原万叶（原神）"],"tag":"kaedehara kazuha","game":"原神","auto":"白发|white hair;马尾|ponytail;呆毛|ahoge;红瞳|red eyes;盔甲|armor;武士|samurai"},{"names":["纳西妲","纳西妲（原神）"],"tag":"nahida (genshin impact)","game":"原神","auto":"绿发|green hair;长发|long hair;绿瞳|green eyes;尖耳|pointy ears;小胸|small breasts;披风|cape"},{"names":["妮露","妮露（原神）"],"tag":"nilou (genshin impact)","game":"原神","auto":"红发|red hair;双马尾|twintails;蓝瞳|blue eyes;齐刘海|blunt bangs;凉鞋|sandals;发饰|hair ornament"},{"names":["迪希雅","迪希雅（原神）"],"tag":"dehya (genshin impact)","game":"原神","auto":"黑发|black hair;蓝瞳|blue eyes;刘海|bangs;竖瞳|slit pupils;耳环|earrings;腰带|belt;短裤|shorts;过膝靴|thigh boots"},{"names":["芙宁娜","芙宁娜（原神）"],"tag":"furina (genshin impact)","game":"原神","auto":"白发|white hair;卷发|curly hair;呆毛|ahoge;蓝瞳|blue eyes;异色瞳|heterochromia;小胸|small breasts;礼帽|fedora;手套|gloves;短裤|shorts;短袜|ankle socks"},{"names":["那维莱特","那维莱特（原神）"],"tag":"neuvillette (genshin impact)","game":"原神","auto":"银发|silver hair;长发|long hair;银瞳|silver eyes;尖耳|pointy ears;蝴蝶结|bow;手套|gloves;过膝靴|thigh boots;鬓发|sidelocks;竖瞳|slit pupils"},{"names":["娜维娅","娜维娅（原神）"],"tag":"navia (genshin impact)","game":"原神","auto":"金发|blonde hair;卷发|curly hair;蓝瞳|blue eyes;尖耳|pointy ears;巨乳|huge breasts;墨镜|sunglasses;分离袖|detached sleeves;遮阳帽|sun hat;过膝靴|thigh boots;项链|necklace"},{"names":["申鹤","申鹤（原神）"],"tag":"shenhe (genshin impact)","game":"原神","auto":"白发|white hair;麻花辫|braid;银瞳|silver eyes;发饰|hair ornament;巨乳|huge breasts;遮单眼发|hair over one eye;长枪|spear"},{"names":["优菈","优菈（原神）"],"tag":"eula (genshin impact)","game":"原神","auto":"蓝发|blue hair;短发|short hair;骑士|knight;巨乳|huge breasts;发箍|hairband;领带|necktie;露背|backless;披风|cape;短裤|shorts;过膝袜|thighhighs"},{"names":["三月七","三月七（崩坏：星穹铁道）"],"tag":"march 7th (honkai: star rail)","game":"崩坏：星穹铁道","auto":"粉发|pink hair;粉瞳|pink eyes;相机|camera;长弓|longbow;手套|gloves;短靴|ankle boots;发夹|hair clip;汉服|hanfu;过膝袜|thighhighs;高跟鞋|high heels"},{"names":["丹恒","丹恒（崩坏：星穹铁道）"],"tag":"dan heng (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑发|black hair;露指手套|fingerless gloves;手套|gloves;短靴|ankle boots;臂环|armlet;长枪|spear"},{"names":["姬子","姬子（崩坏：星穹铁道）"],"tag":"himeko (honkai: star rail)","game":"崩坏：星穹铁道","auto":"红发|red hair;长发|long hair;科学家|scientist;手套|gloves;巨乳|huge breasts;长腿|long legs;高跟鞋|high heels"},{"names":["瓦尔特","瓦尔特（崩坏：星穹铁道）"],"tag":"welt (honkai: star rail)","game":"崩坏：星穹铁道","auto":"棕发|brown hair;棕瞳|brown eyes;眼镜|glasses;风衣|trench coat;围巾|scarf"},{"names":["卡芙卡","卡芙卡（崩坏：星穹铁道）"],"tag":"kafka (honkai: star rail)","game":"崩坏：星穹铁道","auto":"紫发|purple hair;粉瞳|pink eyes;巨乳|huge breasts;墨镜|sunglasses;手套|gloves;连裤袜|pantyhose;靴子|boots;披肩|shawl"},{"names":["银狼","银狼（崩坏：星穹铁道）"],"tag":"silver wolf (honkai: star rail)","game":"崩坏：星穹铁道","auto":"银发|silver hair;银瞳|silver eyes;刘海|bangs;小胸|small breasts;护目镜|goggles"},{"names":["布洛妮娅","布洛妮娅（崩坏：星穹铁道）"],"tag":"bronya (honkai: star rail)","game":"崩坏：星穹铁道","auto":"银发|silver hair;银瞳|silver eyes;步枪|rifle;手套|gloves;过膝靴|thigh boots;刘海|bangs;黑色连裤袜|black pantyhose;分离袖|detached sleeves;裸肩|bare shoulders;公主|princess"},{"names":["希儿","希儿（崩坏：星穹铁道）"],"tag":"seele (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑发|black hair;长发|long hair;呆毛|ahoge;蓝瞳|blue eyes;鬓发|sidelocks"},{"names":["克拉拉","克拉拉（崩坏：星穹铁道）"],"tag":"clara (honkai: star rail)","game":"崩坏：星穹铁道","auto":"白发|white hair;长发|long hair;红瞳|red eyes;小胸|small breasts;天使|angel;机械部件|mechanical parts"},{"names":["杰帕德","杰帕德（崩坏：星穹铁道）"],"tag":"gepard (honkai: star rail)","game":"崩坏：星穹铁道","auto":"金发|blonde hair;蓝瞳|blue eyes;靴子|boots"},{"names":["佩拉","佩拉（崩坏：星穹铁道）"],"tag":"pela (honkai: star rail)","game":"崩坏：星穹铁道","auto":"蓝发|blue hair;蓝瞳|blue eyes;眼镜|glasses;小胸|small breasts;短靴|ankle boots;黑色连裤袜|black pantyhose;手套|gloves;贝雷帽|beret;姬发式|hime cut"},{"names":["虎克","虎克（崩坏：星穹铁道）"],"tag":"hook (honkai: star rail)","game":"崩坏：星穹铁道","auto":"红发|red hair;短发|short hair;双马尾|twintails;绿瞳|green eyes;护膝|knee pads;靴子|boots"},{"names":["白露","白露（崩坏：星穹铁道）"],"tag":"bailu (honkai: star rail)","game":"崩坏：星穹铁道","auto":"紫发|purple hair;麻花辫|braid;呆毛|ahoge;蓝瞳|blue eyes;小胸|small breasts;短靴|ankle boots"},{"names":["景元","景元（崩坏：星穹铁道）"],"tag":"jing yuan","game":"崩坏：星穹铁道","auto":"白发|white hair;马尾|ponytail;黄瞳|yellow eyes;盔甲|armor;靴子|boots;遮单眼发|hair over one eye"},{"names":["停云","停云（崩坏：星穹铁道）"],"tag":"tingyun (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑发|black hair;多色发|multicolored hair;绿瞳|green eyes;兽耳|animal ears;狐娘|fox girl;刘海|bangs;垂眼|tareme;分离袖|detached sleeves;裸肩|bare shoulders;凉鞋|sandals"},{"names":["罗刹","罗刹（崩坏：星穹铁道）"],"tag":"luocha (honkai: star rail)","game":"崩坏：星穹铁道","auto":"金发|blonde hair;长发|long hair;绿瞳|green eyes;靴子|boots;手套|gloves"},{"names":["刃","刃（崩坏：星穹铁道）"],"tag":"blade (honkai: star rail)","game":"崩坏：星穹铁道","auto":"白发|white hair;蓝瞳|blue eyes;遮单眼发|hair over one eye;伤疤|scar"},{"names":["符玄","符玄（崩坏：星穹铁道）"],"tag":"fu xuan (honkai: star rail)","game":"崩坏：星穹铁道","auto":"粉发|pink hair;长发|long hair;双马尾|twintails;麻花辫|braid;吊眼|tsurime;连裤袜|pantyhose;汉服|hanfu;小胸|small breasts;发簪|hairpin;鬓发|sidelocks"},{"names":["镜流","镜流（崩坏：星穹铁道）"],"tag":"jingliu (honkai: star rail)","game":"崩坏：星穹铁道","auto":"白发|white hair;多色发|multicolored hair;长发|long hair;红瞳|red eyes;眼罩|eyepatch;靴子|boots"},{"names":["托帕","托帕（崩坏：星穹铁道）"],"tag":"topaz (honkai: star rail)","game":"崩坏：星穹铁道","auto":"银发|silver hair;短发|short hair;蓝瞳|blue eyes;发夹|hair clip;吊眼|tsurime;巨乳|huge breasts;手枪|pistol;分离袖|detached sleeves;手套|gloves;短裤|shorts"},{"names":["藿藿","藿藿（崩坏：星穹铁道）"],"tag":"huohuo (honkai: star rail)","game":"崩坏：星穹铁道","auto":"绿发|green hair;呆毛|ahoge;绿瞳|green eyes;狐耳|fox ears;尾巴|tail;小胸|small breasts;无袖|sleeveless"},{"names":["花火","花火（崩坏：星穹铁道）"],"tag":"sparkle (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑发|black hair;多色发|multicolored hair;双马尾|twintails;粉瞳|pink eyes;小胸|small breasts;口罩|mask;和服|kimono;木屐|geta;分离袖|detached sleeves;吐舌|tongue out"},{"names":["黑天鹅","黑天鹅（崩坏：星穹铁道）"],"tag":"black swan (honkai: star rail)","game":"崩坏：星穹铁道","auto":"紫发|purple hair;紫瞳|purple eyes;手套|gloves;黑色连裤袜|black pantyhose;过膝靴|thigh boots;兜帽|hood;巨乳|huge breasts;水晶球|crystal ball"},{"names":["黄泉","黄泉（崩坏：星穹铁道）"],"tag":"acheron (honkai: star rail)","game":"崩坏：星穹铁道","auto":"紫发|purple hair;多色发|multicolored hair;长发|long hair;紫瞳|purple eyes;遮单眼发|hair over one eye;巨乳|huge breasts;手套|gloves;靴子|boots;过膝靴|thigh boots;高跟鞋|high heels"},{"names":["流萤","流萤（崩坏：星穹铁道）"],"tag":"firefly (honkai: star rail)","game":"崩坏：星穹铁道","auto":"银发|silver hair;双马尾|twintails;蓝瞳|blue eyes;机械部件|mechanical parts;发带|hair ribbon;领巾|cravat;刘海|bangs;大胸|large breasts"},{"names":["知更鸟","知更鸟（崩坏：星穹铁道）"],"tag":"robin (honkai: star rail)","game":"崩坏：星穹铁道","auto":"银发|silver hair;卷发|curly hair;绿瞳|green eyes;光环|halo;翅膀|wings;偶像|idol;分离袖|detached sleeves;连衣裙|dress;裸肩|bare shoulders;高跟鞋|high heels"},{"names":["砂金","砂金（崩坏：星穹铁道）"],"tag":"aventurine (honkai: star rail)","game":"崩坏：星穹铁道","auto":"金发|blonde hair;紫瞳|purple eyes;吊眼|tsurime;手套|gloves;手表|watch;礼帽|fedora;墨镜|sunglasses"},{"names":["漂泊者","漂泊者（鸣潮）"],"tag":"rover (wuthering waves)","game":"鸣潮","auto":"黑发|black hair;低马尾|low ponytail;呆毛|ahoge;手套|gloves;无袖|sleeveless;过膝袜|thighhighs;过膝靴|thigh boots;巨乳|huge breasts"},{"names":["秧秧","秧秧（鸣潮）"],"tag":"yangyang (wuthering waves)","game":"鸣潮","auto":"黑发|black hair;黑瞳|black eyes;臂环|armlet;蝴蝶结|bow;短裤|shorts;贝雷帽|beret;背带裙|pinafore;短靴|ankle boots;黑色连裤袜|black pantyhose"},{"names":["炽霞","炽霞（鸣潮）"],"tag":"chixia (wuthering waves)","game":"鸣潮","auto":"红发|red hair;马尾|ponytail;麻花辫|braid;红瞳|red eyes;额头|forehead;刘海|bangs;蝴蝶结|bow;披肩|shawl;护臂|arm warmers;露指手套|fingerless gloves"},{"names":["白芷","白芷（鸣潮）"],"tag":"baizhi (wuthering waves)","game":"鸣潮","auto":"黑发|black hair;长发|long hair;绿瞳|green eyes;发夹|hair clip;露指手套|fingerless gloves;头花|hair flower;发珠|hair beads;裸肩|bare shoulders;科学家|scientist"},{"names":["吟霖","吟霖（鸣潮）"],"tag":"yinlin (wuthering waves)","game":"鸣潮","auto":"红发|red hair;长发|long hair;高马尾|high ponytail;粉瞳|pink eyes;尖耳|pointy ears;发箍|hairband;巨乳|huge breasts;手套|gloves;耳环|earrings;露背|backless"},{"names":["忌炎","忌炎（鸣潮）"],"tag":"jiyan (wuthering waves)","game":"鸣潮","auto":"绿发|green hair;高马尾|high ponytail;靴子|boots;腰带|belt;手套|gloves"},{"names":["卡卡罗","卡卡罗（鸣潮）"],"tag":"calcharo (wuthering waves)","game":"鸣潮","auto":"银发|silver hair;长发|long hair"},{"names":["鉴心","鉴心（鸣潮）"],"tag":"jianxin (wuthering waves)","game":"鸣潮","auto":"黑发|black hair;双色发|two-tone hair;双马尾|twintails;呆毛|ahoge;绿瞳|green eyes;手套|gloves;靴子|boots"},{"names":["散华","散华（鸣潮）"],"tag":"sanhua (wuthering waves)","game":"鸣潮","auto":"银发|silver hair;白发|white hair;红瞳|red eyes;贝雷帽|beret;丝带|ribbon;鬓发|sidelocks;盘发|updo;耳环|earrings;露背|backless;项链|necklace"},{"names":["丹瑾","丹瑾（鸣潮）"],"tag":"danjin (wuthering waves)","game":"鸣潮","auto":"红发|red hair;短发|short hair;呆毛|ahoge;蓝瞳|blue eyes;耳环|earrings;蝴蝶结|bow;手套|gloves;短靴|ankle boots"},{"names":["桃祈","桃祈（鸣潮）"],"tag":"taoqi (wuthering waves)","game":"鸣潮","auto":"粉发|pink hair;呆毛|ahoge;粉瞳|pink eyes;发饰|hair ornament;遮单眼发|hair over one eye;分离袖|detached sleeves;护臂|arm warmers;露背|backless;腰带|belt;黑色连裤袜|black pantyhose"},{"names":["莫特斐","莫特斐（鸣潮）"],"tag":"mortefi (wuthering waves)","game":"鸣潮","auto":"红发|red hair;麻花辫|braid;红瞳|red eyes;科学家|scientist;眼镜|glasses;腰带|belt"},{"names":["凌阳","凌阳（鸣潮）"],"tag":"lingyang (wuthering waves)","game":"鸣潮","auto":"银发|silver hair;低马尾|low ponytail;呆毛|ahoge;灰瞳|grey eyes;兽耳|animal ears;尾巴|tail;臂环|armlet;头带|headband;裸肩|bare shoulders"},{"names":["安可","安可（鸣潮）"],"tag":"encore (wuthering waves)","game":"鸣潮","auto":"粉发|pink hair;双马尾|twintails;呆毛|ahoge;紫瞳|purple eyes;蝴蝶结|bow;发珠|hair beads;玛丽珍鞋|mary janes"},{"names":["今汐","今汐（鸣潮）"],"tag":"jinhsi (wuthering waves)","game":"鸣潮","auto":"白发|white hair;双马尾|twintails;麻花辫|braid;银瞳|silver eyes;齐刘海|blunt bangs;无袖|sleeveless;过膝靴|thigh boots;过膝袜|thighhighs"},{"names":["长离","长离（鸣潮）"],"tag":"changli (wuthering waves)","game":"鸣潮","auto":"粉发|pink hair;双马尾|twintails;呆毛|ahoge;刘海|bangs;发夹|hair clip;发带|hair ribbon;巨乳|huge breasts;分离袖|detached sleeves;过膝袜|thighhighs;高跟鞋|high heels"},{"names":["折枝","折枝（鸣潮）"],"tag":"zhezhi (wuthering waves)","game":"鸣潮","auto":"黑发|black hair;双马尾|twintails;粉瞳|pink eyes;尾巴|tail;发带|hair ribbon;眼镜|glasses;披风|cape;露指手套|fingerless gloves"},{"names":["相里要","相里要（鸣潮）"],"tag":"xiangli yao (wuthering waves)","game":"鸣潮","auto":"白发|white hair;长发|long hair;耳钉|ear piercing;机械部件|mechanical parts;丝带|ribbon"},{"names":["守岸人","守岸人（鸣潮）"],"tag":"shorekeeper (wuthering waves)","game":"鸣潮","auto":"蓝发|blue hair;紫瞳|purple eyes;臂环|armlet;露背|backless;连衣裙|dress;高跟鞋|high heels;凉鞋|sandals"},{"names":["维里奈","维里奈（鸣潮）"],"tag":"verina (wuthering waves)","game":"鸣潮","auto":"金发|blonde hair;双马尾|twintails;绿瞳|green eyes;发箍|hairband;蝴蝶结|bow;背带裙|pinafore;露指手套|fingerless gloves"},{"names":["白子","白子（蔚蓝档案）"],"tag":"shiroko (blue archive)","game":"蔚蓝档案","auto":"白发|white hair;长发|long hair;蓝瞳|blue eyes;光环|halo;兽耳|animal ears;自行车|bicycle;及膝袜|kneehighs;运动鞋|sneakers;发夹|hair clip;围巾|scarf"},{"names":["星野","星野（蔚蓝档案）"],"tag":"hoshino (blue archive)","game":"蔚蓝档案","auto":"粉发|pink hair;呆毛|ahoge;蓝瞳|blue eyes;光环|halo;尖耳|pointy ears;学生|student;异色瞳|heterochromia;运动鞋|sneakers;盾牌|shield"},{"names":["芹香","芹香（蔚蓝档案）"],"tag":"serika (blue archive)","game":"蔚蓝档案","auto":"黑发|black hair;双马尾|twintails;红瞳|red eyes;光环|halo;猫耳|cat ears;护膝|knee pads;短袜|ankle socks;狙击步枪|sniper rifle"},{"names":["野宫","野宫（蔚蓝档案）"],"tag":"nonomi (blue archive)","game":"蔚蓝档案","auto":"金发|blonde hair;麻花辫|braid;绿瞳|green eyes;光环|halo;巨乳|huge breasts;短袜|ankle socks;运动鞋|sneakers"},{"names":["绫音","绫音（蔚蓝档案）"],"tag":"ayane (blue archive)","game":"蔚蓝档案","auto":"黑发|black hair;短发|short hair;光环|halo;尖耳|pointy ears;精灵耳|elf ears;眼镜|glasses;王冠|crown;校服|school uniform;及膝袜|kneehighs;乐福鞋|loafers"},{"names":["优香","优香（蔚蓝档案）"],"tag":"yuuka (blue archive)","game":"蔚蓝档案","auto":"紫发|purple hair;双马尾|twintails;紫瞳|purple eyes;光环|halo;短靴|ankle boots;学生|student"},{"names":["诺亚","诺亚（蔚蓝档案）"],"tag":"noa (blue archive)","game":"蔚蓝档案","auto":"白发|white hair;超长发|very long hair;紫瞳|purple eyes;光环|halo;学生|student;姬发式|hime cut;巨乳|huge breasts;垂眼|tareme;黑色连裤袜|black pantyhose;短靴|ankle boots"},{"names":["阿露","阿露（蔚蓝档案）"],"tag":"aru (blue archive)","game":"蔚蓝档案","auto":"红发|red hair;麻花辫|braid;光环|halo;披肩|shawl;公主|princess;高跟鞋|high heels;巨乳|huge breasts;狙击步枪|sniper rifle"},{"names":["睦月","睦月（蔚蓝档案）"],"tag":"mutsuki (blue archive)","game":"蔚蓝档案","auto":"白发|white hair;马尾|ponytail;紫瞳|purple eyes;光环|halo;小胸|small breasts;鬓发|sidelocks;头花|hair flower;眼镜|glasses"},{"names":["佳代子","佳代子（蔚蓝档案）"],"tag":"kayoko (blue archive)","game":"蔚蓝档案","auto":"黑发|black hair;双色发|two-tone hair;高马尾|high ponytail;红瞳|red eyes;光环|halo;翅膀|wings;小胸|small breasts;耳钉|ear piercing;运动鞋|sneakers;手枪|pistol"},{"names":["春香","春香（蔚蓝档案）"],"tag":"haruna (blue archive)","game":"蔚蓝档案","auto":"紫发|purple hair;短发|short hair;紫瞳|purple eyes;光环|halo;尖耳|pointy ears;发夹|hair clip;刘海|bangs"},{"names":["日奈","日奈（蔚蓝档案）"],"tag":"hina (blue archive)","game":"蔚蓝档案","auto":"白发|white hair;马尾|ponytail;紫瞳|purple eyes;光环|halo;翅膀|wings;小胸|small breasts;过膝袜|thighhighs;靴子|boots;刘海|bangs"},{"names":["伊织","伊织（蔚蓝档案）"],"tag":"iori (blue archive)","game":"蔚蓝档案","auto":"白发|white hair;双马尾|twintails;红瞳|red eyes;光环|halo;兔耳|rabbit ears;尖耳|pointy ears;尾巴|tail;领带|necktie;手套|gloves;及膝袜|kneehighs"},{"names":["千夏","千夏（蔚蓝档案）"],"tag":"chinatsu (blue archive)","game":"蔚蓝档案","auto":"粉发|pink hair;双马尾|twintails;红瞳|red eyes;光环|halo;尖耳|pointy ears;眼镜|glasses;护士|nurse;发箍|hairband;巨乳|huge breasts;百褶裙|pleated skirt"},{"names":["亚子","亚子（蔚蓝档案）"],"tag":"ako (blue archive)","game":"蔚蓝档案","auto":"蓝发|blue hair;蓝瞳|blue eyes;光环|halo;巨乳|huge breasts;耳钉|ear piercing;发箍|hairband;鬓发|sidelocks;手枪|pistol"},{"names":["日富美","日富美（蔚蓝档案）"],"tag":"hifumi (blue archive)","game":"蔚蓝档案","auto":"金发|blonde hair;双马尾|twintails;光环|halo;尖耳|pointy ears;黑色连裤袜|black pantyhose;运动鞋|sneakers;狙击步枪|sniper rifle"},{"names":["梓","梓（蔚蓝档案）"],"tag":"azusa (blue archive)","game":"蔚蓝档案","auto":"白发|white hair;紫瞳|purple eyes;光环|halo;翅膀|wings;学生|student;小胸|small breasts;发饰|hair ornament;连衣裙|dress;狙击步枪|sniper rifle;短袜|ankle socks"},{"names":["小春","小春（蔚蓝档案）"],"tag":"koharu (blue archive)","game":"蔚蓝档案","auto":"粉发|pink hair;双马尾|twintails;粉瞳|pink eyes;光环|halo;翅膀|wings;小胸|small breasts;贝雷帽|beret;竖瞳|slit pupils;狙击步枪|sniper rifle"},{"names":["花子","花子（蔚蓝档案）"],"tag":"hanako (blue archive)","game":"蔚蓝档案","auto":"粉发|pink hair;麻花辫|braid;绿瞳|green eyes;光环|halo;巨乳|huge breasts;泳装|swimsuit;及膝袜|kneehighs;狙击步枪|sniper rifle"},{"names":["未花","未花（蔚蓝档案）"],"tag":"mika (blue archive)","game":"蔚蓝档案","auto":"粉发|pink hair;发髻|hair bun;光环|halo;翅膀|wings;学生|student;发饰|hair ornament;连衣裙|dress;大胸|large breasts;发圈|hair scrunchie;连裤袜|pantyhose"},{"names":["圣亚","圣亚（蔚蓝档案）"],"tag":"seia (blue archive)","game":"蔚蓝档案","auto":"金发|blonde hair;卷发|curly hair;超长发|very long hair;黄瞳|yellow eyes;光环|halo;学生|student;狐娘|fox girl;头花|hair flower;额头|forehead;露背|backless"},{"names":["渚","渚（蔚蓝档案）"],"tag":"nagisa (blue archive)","game":"蔚蓝档案","auto":"灰发|grey hair;长发|long hair;黄瞳|yellow eyes;光环|halo;翅膀|wings;学生|student;王冠|crown;发饰|hair ornament;黑色连裤袜|black pantyhose;高跟鞋|high heels"},{"names":["鹤城","鹤城（蔚蓝档案）"],"tag":"tsurugi (blue archive)","game":"蔚蓝档案","auto":"黑发|black hair;高马尾|high ponytail;红瞳|red eyes;光环|halo;翅膀|wings;短靴|ankle boots;脸红|blush;比基尼|bikini;头花|hair flower;凉鞋|sandals"},{"names":["莲见","莲见（蔚蓝档案）"],"tag":"hasumi (blue archive)","game":"蔚蓝档案","auto":"黑发|black hair;高马尾|high ponytail;红瞳|red eyes;光环|halo;翅膀|wings;巨乳|huge breasts;刘海|bangs;高跟鞋|high heels;狙击步枪|sniper rifle;体操服|gym uniform"},{"names":["真白","真白（蔚蓝档案）"],"tag":"mashiro (blue archive)","game":"蔚蓝档案","auto":"黑发|black hair;短发|short hair;紫瞳|purple eyes;光环|halo;翅膀|wings;兔耳|rabbit ears;水手服|serafuku;手套|gloves;乐福鞋|loafers;狙击步枪|sniper rifle"},{"names":["爱丽丝","爱丽丝（蔚蓝档案）"],"tag":"aris (blue archive)","game":"蔚蓝档案","auto":"蓝发|blue hair;长发|long hair;马尾|ponytail;麻花辫|braid;蓝瞳|blue eyes;光环|halo;机械部件|mechanical parts;天使|angel;刘海|bangs;发箍|hairband"},{"names":["桃井","桃井（蔚蓝档案）"],"tag":"momoi (blue archive)","game":"蔚蓝档案","auto":"金发|blonde hair;短发|short hair;双马尾|twintails;粉瞳|pink eyes;光环|halo;猫耳|cat ears;小胸|small breasts;双胞胎|twins;背带裙|pinafore;过膝袜|thighhighs"},{"names":["绿","绿（蔚蓝档案）"],"tag":"midori (blue archive)","game":"蔚蓝档案","auto":"金发|blonde hair;短发|short hair;低马尾|low ponytail;绿瞳|green eyes;光环|halo;猫耳|cat ears;猫尾|cat tail;小胸|small breasts;画家|artist;双胞胎|twins"},{"names":["柚子","柚子（蔚蓝档案）"],"tag":"yuzu (blue archive)","game":"蔚蓝档案","auto":"红发|red hair;高马尾|high ponytail;麻花辫|braid;蓝瞳|blue eyes;光环|halo;小胸|small breasts;拖鞋|slippers;刘海|bangs;额头|forehead;女仆|maid"},{"names":["香琳","香琳（蔚蓝档案）"],"tag":"karin (blue archive)","game":"蔚蓝档案","auto":"黑发|black hair;长发|long hair;高马尾|high ponytail;光环|halo;女仆|maid;姬发式|hime cut;竖瞳|slit pupils;巨乳|huge breasts;高跟鞋|high heels;连裤袜|pantyhose"},{"names":["明日奈","明日奈（蔚蓝档案）"],"tag":"asuna (blue archive)","game":"蔚蓝档案","auto":"金发|blonde hair;长发|long hair;蓝瞳|blue eyes;光环|halo;女仆|maid;盘发|updo;刘海|bangs;巨乳|huge breasts;发带|hair ribbon;手套|gloves"},{"names":["时","时（蔚蓝档案）"],"tag":"toki (blue archive)","game":"蔚蓝档案","auto":"金发|blonde hair;蓝瞳|blue eyes;光环|halo;女仆|maid;盘发|updo;过膝靴|thigh boots;步枪|rifle"},{"names":["若藻","若藻（蔚蓝档案）"],"tag":"wakamo (blue archive)","game":"蔚蓝档案","auto":"红发|red hair;光环|halo;口罩|mask;姬发式|hime cut;大胸|large breasts;狐娘|fox girl;心形瞳|heart-shaped pupils;露指手套|fingerless gloves;短袜|ankle socks;短靴|ankle boots"},{"names":["貂蝉","貂蝉（王者荣耀）"],"tag":"diaochan (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;长发|long hair;过膝袜|thighhighs;连衣裙|dress;紫瞳|purple eyes"},{"names":["孙尚香","孙尚香（王者荣耀）"],"tag":"lady_sun (honor of kings)","game":"王者荣耀","auto":"棕发|brown hair;双马尾|twintails;麻花辫|braid;呆毛|ahoge;过膝袜|thighhighs;蝴蝶结|bow;过膝靴|thigh boots"},{"names":["小乔","小乔（王者荣耀）"],"tag":"xiao_qiao (honor of kings)","game":"王者荣耀","auto":"发髻|hair bun;小胸|small breasts;双丸子头|double bun;扇子|fan;连衣裙|dress;过膝袜|thighhighs;短靴|ankle boots"},{"names":["大乔","大乔（王者荣耀）"],"tag":"da_qiao (honor of kings)","game":"王者荣耀","auto":"麻花辫|braid;发饰|hair ornament"},{"names":["上官婉儿","上官婉儿（王者荣耀）"],"tag":"shangguan (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;长发|long hair;马尾|ponytail;姬发式|hime cut;高跟鞋|high heels;扇子|fan"},{"names":["诸葛亮","诸葛亮（王者荣耀）"],"tag":"kongming (honor of kings)","game":"王者荣耀","auto":"卷发|curly hair;偶像|idol"},{"names":["李白","李白（王者荣耀）"],"tag":"li_bai (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;长发|long hair;呆毛|ahoge;风衣|trench coat"},{"names":["花木兰","花木兰（王者荣耀）"],"tag":"mulan (honor of kings)","game":"王者荣耀","auto":"马尾|ponytail;过膝袜|thighhighs;发饰|hair ornament;过膝靴|thigh boots"},{"names":["妲己","妲己（王者荣耀）"],"tag":"daji (honor of kings)","game":"王者荣耀","auto":"粉发|pink hair;长发|long hair;人偶|doll;狐娘|fox girl;刘海|bangs;分离袖|detached sleeves;狐耳|fox ears"},{"names":["武则天","武则天（王者荣耀）"],"tag":"wu_zetian (honor of kings)","game":"王者荣耀","auto":"巨乳|huge breasts;长腿|long legs;发饰|hair ornament"},{"names":["杨玉环","杨玉环（王者荣耀）"],"tag":"yuhuan (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;长发|long hair;丰满|plump"},{"names":["甄姬","甄姬（王者荣耀）"],"tag":"lady_zhen (honor of kings)","game":"王者荣耀","auto":"紫发|purple hair;高马尾|high ponytail;蓝瞳|blue eyes;忧郁|melancholic"},{"names":["虞姬","虞姬（王者荣耀）"],"tag":"consort_yu (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;长发|long hair;小胸|small breasts"},{"names":["兰陵王","兰陵王（王者荣耀）"],"tag":"lanling_wang (honor of kings)","game":"王者荣耀","auto":"紫发|purple hair;长发|long hair;麻花辫|braid;额头|forehead;口罩|mask"},{"names":["嬴政","嬴政（王者荣耀）"],"tag":"ying_zheng (honor of kings)","game":"王者荣耀","auto":"白发|white hair;长发|long hair;金瞳|golden eyes;盔甲|armor;王冠|crown"},{"names":["白起","白起（王者荣耀）"],"tag":"bai_qi (honor of kings)","game":"王者荣耀","auto":"白发|white hair;短发|short hair;口罩|mask;披风|cape;盔甲|armor"},{"names":["狄仁杰","狄仁杰（王者荣耀）"],"tag":"di_renjie (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;短发|short hair;侦探|detective"},{"names":["澜","澜（王者荣耀）"],"tag":"lam (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;长发|long hair;围巾|scarf;分离袖|detached sleeves;背心|tank top"},{"names":["米莱狄","米莱狄（王者荣耀）"],"tag":"milady (honor of kings)","game":"王者荣耀","auto":"金发|blonde hair;眼罩|eyepatch;过膝靴|thigh boots;手套|gloves"},{"names":["雅典娜","雅典娜（王者荣耀）"],"tag":"athena (honor of kings)","game":"王者荣耀","auto":"金发|blonde hair;长发|long hair;公主|princess"},{"names":["马可波罗","马可波罗（王者荣耀）"],"tag":"marco_polo (honor of kings)","game":"王者荣耀","auto":"金发|blonde hair;披风|cape"},{"names":["周瑜","周瑜（王者荣耀）"],"tag":"zhou_yu (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;长发|long hair;红瞳|red eyes;中式服装|chinese clothes"},{"names":["司马懿","司马懿（王者荣耀）"],"tag":"sima_yi (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;长发|long hair;病娇|yandere"},{"names":["马超","马超（王者荣耀）"],"tag":"ma_chao (honor of kings)","game":"王者荣耀","auto":"银发|silver hair;刺猬头|spiked hair;分离袖|detached sleeves;背心|tank top;头盔|helmet"},{"names":["孙策","孙策（王者荣耀）"],"tag":"sun_ce (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;长发|long hair;红瞳|red eyes;盔甲|armor"},{"names":["安琪拉","安琪拉（王者荣耀）"],"tag":"angela (honor of kings)","game":"王者荣耀","auto":"双马尾|twintails;小胸|small breasts;刘海|bangs;发箍|hairband;手套|gloves;过膝袜|thighhighs;百褶裙|pleated skirt;眼镜|glasses;蝴蝶结|bow;齐刘海|blunt bangs"},{"names":["夏洛特","夏洛特（王者荣耀）"],"tag":"charlotte (honor of kings)","game":"王者荣耀","auto":"金发|blonde hair;骑士|knight;盔甲|armor;手套|gloves;过膝靴|thigh boots"},{"names":["不知火舞","不知火舞（王者荣耀）"],"tag":"shiranui_mai (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;马尾|ponytail;忍者|ninja;巨乳|huge breasts;折扇|folding fan"},{"names":["娜可露露","娜可露露（王者荣耀）"],"tag":"nakoruru (honor of kings)","game":"王者荣耀","auto":"姬发式|hime cut;发箍|hairband;蝴蝶结|bow;匕首|dagger"},{"names":["嫦娥","嫦娥（王者荣耀）"],"tag":"chang'e (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;长发|long hair;公主|princess"},{"names":["女娲","女娲（王者荣耀）"],"tag":"nuwa (honor of kings)","game":"王者荣耀","auto":"白发|white hair;长发|long hair;高马尾|high ponytail"},{"names":["李信","李信（王者荣耀）"],"tag":"li_xin (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;长发|long hair;披风|cape;纹身|tattoo"},{"names":["亚连","亚连（王者荣耀）"],"tag":"allain (honor of kings)","game":"王者荣耀","auto":"金发|blonde hair;短发|short hair;低马尾|low ponytail"},{"names":["朵莉亚","朵莉亚（王者荣耀）"],"tag":"dolia (honor of kings)","game":"王者荣耀","auto":"蓝发|blue hair;长发|long hair;呆毛|ahoge;人鱼|mermaid"},{"names":["百里玄策","百里玄策（王者荣耀）"],"tag":"xuance (honor of kings)","game":"王者荣耀","auto":"白发|white hair;短发|short hair;兽耳|animal ears;尾巴|tail"},{"names":["百里守约","百里守约（王者荣耀）"],"tag":"shouyue (honor of kings)","game":"王者荣耀","auto":"白发|white hair;狼耳|wolf ears;狼尾|wolf tail;披风|cape;项链|necklace"},{"names":["弈星","弈星（王者荣耀）"],"tag":"yixing (honor of kings)","game":"王者荣耀","auto":"银发|silver hair;低马尾|low ponytail;披风|cape"},{"names":["镜","镜（王者荣耀）"],"tag":"jing (honor of kings)","game":"王者荣耀","auto":"黑发|black hair;长发|long hair;盔甲|armor;刀刃|blade;紫瞳|purple eyes"},{"names":["瑶","瑶（王者荣耀）"],"tag":"yao (honor of kings)","game":"王者荣耀","auto":"棕发|brown hair;长发|long hair;麻花辫|braid;披风|cape;小胸|small breasts;法杖|staff;天使|angel"},{"names":["赵云","赵云（王者荣耀）"],"tag":"zilong (honor of kings)","game":"王者荣耀","auto":"棕发|brown hair"},{"names":["芙莉莲","芙莉莲（葬送的芙莉莲）"],"tag":"frieren","game":"热门番剧","auto":"银发|silver hair;双马尾|twintails;绿瞳|green eyes;尖耳|pointy ears;法杖|staff;小胸|small breasts;黑色连裤袜|black pantyhose;围巾|scarf"},{"names":["菲伦","菲伦（葬送的芙莉莲）"],"tag":"fern (sousou no frieren)","game":"热门番剧","auto":"紫发|purple hair;紫瞳|purple eyes;法杖|staff;齐刘海|blunt bangs;连衣裙|dress;披风|cape;靴子|boots;巨乳|huge breasts;学生|student"},{"names":["修塔尔克","修塔尔克（葬送的芙莉莲）"],"tag":"stark (sousou no frieren)","game":"热门番剧","auto":"红发|red hair;橙瞳|orange eyes;斧头|axe;吊眼|tsurime;伤疤|scar;手套|gloves;靴子|boots"},{"names":["辛美尔","辛美尔（葬送的芙莉莲）"],"tag":"himmel (sousou no frieren)","game":"热门番剧","auto":"蓝发|blue hair;蓝瞳|blue eyes"},{"names":["阿乌拉","阿乌拉（葬送的芙莉莲）"],"tag":"aura (sousou no frieren)","game":"热门番剧","auto":"紫发|purple hair;双马尾|twintails;麻花辫|braid;紫瞳|purple eyes;刘海|bangs;手套|gloves;过膝靴|thigh boots"},{"names":["赛莉艾","赛莉艾（葬送的芙莉莲）"],"tag":"serie (sousou no frieren)","game":"热门番剧","auto":"金发|blonde hair;长发|long hair;尖耳|pointy ears;吊眼|tsurime;刘海|bangs;巨乳|huge breasts;项链|necklace;耳环|earrings;腰带|belt;披风|cape"},{"names":["尤贝尔","尤贝尔（葬送的芙莉莲）"],"tag":"ubel (sousou no frieren)","game":"热门番剧","auto":"绿发|green hair;长发|long hair;马尾|ponytail;紫瞳|purple eyes;法杖|staff;刘海|bangs;吊眼|tsurime;百褶裙|pleated skirt;连衣裙|dress;腰带|belt"},{"names":["艾泽","艾泽（葬送的芙莉莲）"],"tag":"eisen (sousou no frieren)","game":"热门番剧","auto":"棕发|brown hair;黑瞳|black eyes;胡须|beard;斧头|axe;披风|cape;头盔|helmet"},{"names":["兰泽","兰泽（葬送的芙莉莲）"],"tag":"land (sousou no frieren)","game":"热门番剧","auto":"棕发|brown hair;长发|long hair;蓝瞳|blue eyes;大衣|coat"},{"names":["五条悟","五条悟（咒术回战）"],"tag":"gojo satoru","game":"热门番剧","auto":"白发|white hair;刺猬头|spiked hair;蓝瞳|blue eyes;教师|teacher;眼罩|eyepatch;墨镜|sunglasses"},{"names":["虎杖悠仁","虎杖悠仁（咒术回战）"],"tag":"itadori yuji","game":"热门番剧","auto":"粉发|pink hair;刺猬头|spiked hair;棕瞳|brown eyes;刘海|bangs;天使|angel;伤疤|scar;学生|student"},{"names":["伏黑惠","伏黑惠（咒术回战）"],"tag":"fushiguro megumi","game":"热门番剧","auto":"黑发|black hair;刺猬头|spiked hair;绿瞳|green eyes;影子|shadow"},{"names":["钉崎野蔷薇","钉崎野蔷薇（咒术回战）"],"tag":"kugisaki nobara","game":"热门番剧","auto":"棕发|brown hair;染发|dyed hair;短发|short hair;棕瞳|brown eyes;黑色连裤袜|black pantyhose;巨乳|huge breasts;刘海|bangs;腰带|belt"},{"names":["伏黑甚尔","伏黑甚尔（咒术回战）"],"tag":"fushiguro toji","game":"热门番剧","auto":"黑发|black hair;绿瞳|green eyes;伤疤|scar"},{"names":["两面宿傩","两面宿傩（咒术回战）"],"tag":"ryoumen sukuna (jujutsu kaisen)","game":"热门番剧","auto":"粉发|pink hair;红瞳|red eyes;纹身|tattoo"},{"names":["灶门炭治郎","灶门炭治郎（鬼灭之刃）"],"tag":"kamado tanjirou","game":"热门番剧","auto":"红发|red hair;红瞳|red eyes;额头|forehead;伤疤|scar;耳环|earrings;天使|angel"},{"names":["灶门祢豆子","灶门祢豆子（鬼灭之刃）"],"tag":"kamado nezuko","game":"热门番剧","auto":"黑发|black hair;粉瞳|pink eyes;额头|forehead;盘发|updo;和服|kimono;竹筒|bamboo;丝带|ribbon;独角|single horn;巨乳|huge breasts;大胸|large breasts"},{"names":["我妻善逸","我妻善逸（鬼灭之刃）"],"tag":"agatsuma zenitsu","game":"热门番剧","auto":"黑发|black hair"},{"names":["嘴平伊之助","嘴平伊之助（鬼灭之刃）"],"tag":"hashibira inosuke","game":"热门番剧","auto":"黑发|black hair;长发|long hair;绿瞳|green eyes;刘海|bangs;口罩|mask"},{"names":["蝴蝶忍","蝴蝶忍（鬼灭之刃）"],"tag":"kochou shinobu","game":"热门番剧","auto":"黑发|black hair;长发|long hair;紫瞳|purple eyes;盘发|updo;发饰|hair ornament;大胸|large breasts;垂眼|tareme"},{"names":["炼狱杏寿郎","炼狱杏寿郎（鬼灭之刃）"],"tag":"rengoku kyoujurou","game":"热门番剧","auto":"金发|blonde hair;长发|long hair;马尾|ponytail"},{"names":["猗窝座","猗窝座（鬼灭之刃）"],"tag":"akaza (kimetsu no yaiba)","game":"热门番剧","auto":"粉发|pink hair;短发|short hair"},{"names":["堕姬","堕姬（鬼灭之刃）"],"tag":"daki (kimetsu no yaiba)","game":"热门番剧","auto":"黑发|black hair;高马尾|high ponytail;蓝瞳|blue eyes;刘海|bangs;巨乳|huge breasts"},{"names":["绿谷出久","绿谷出久（我的英雄学院）"],"tag":"midoriya izuku","game":"热门番剧","auto":"绿发|green hair;卷发|curly hair;绿瞳|green eyes;大眼睛|wide eyes;雀斑|freckles"},{"names":["爆豪胜己","爆豪胜己（我的英雄学院）"],"tag":"bakugou katsuki","game":"热门番剧","auto":"金发|blonde hair;红瞳|red eyes;吊眼|tsurime"},{"names":["轰焦冻","轰焦冻（我的英雄学院）"],"tag":"todoroki shoto","game":"热门番剧","auto":"白发|white hair;双色发|two-tone hair;黑瞳|black eyes;吊眼|tsurime"},{"names":["丽日御茶子","丽日御茶子（我的英雄学院）"],"tag":"uraraka ochaco","game":"热门番剧","auto":"棕发|brown hair;短发|short hair;棕瞳|brown eyes;天使|angel;连裤袜|pantyhose"},{"names":["渡我被身子","渡我被身子（我的英雄学院）"],"tag":"toga himiko","game":"热门番剧","auto":"棕发|brown hair;发髻|hair bun;齐刘海|blunt bangs;水手服|serafuku;病娇|yandere"},{"names":["三笠·阿克曼","三笠·阿克曼（进击的巨人）"],"tag":"mikasa ackerman","game":"热门番剧","auto":"黑发|black hair;短发|short hair;黑瞳|black eyes;腹肌|abs;病娇|yandere;围巾|scarf;过膝靴|thigh boots;制服|uniform;伤疤|scar"},{"names":["阿尔敏·阿诺德","阿尔敏·阿诺德（进击的巨人）"],"tag":"armin arlert","game":"热门番剧","auto":"金发|blonde hair;蓝瞳|blue eyes;天使|angel"},{"names":["利威尔","利威尔（进击的巨人）"],"tag":"levi (shingeki no kyojin)","game":"热门番剧","auto":"黑发|black hair;灰瞳|grey eyes;披风|cape"},{"names":["艾伦·耶格尔","艾伦·耶格尔（进击的巨人）"],"tag":"eren yeager","game":"热门番剧","auto":"棕发|brown hair;长发|long hair;绿瞳|green eyes;天使|angel;刘海|bangs;制服|uniform"},{"names":["电次","电次（电锯人）"],"tag":"denji (chainsaw man)","game":"热门番剧","auto":"金发|blonde hair;红瞳|red eyes;运动鞋|sneakers;手枪|pistol"},{"names":["帕瓦","帕瓦（电锯人）"],"tag":"power (chainsaw man)","game":"热门番剧","auto":"金发|blonde hair;刘海|bangs;小胸|small breasts"},{"names":["玛奇玛","玛奇玛（电锯人）"],"tag":"makima (chainsaw man)","game":"热门番剧","auto":"红发|red hair;麻花辫|braid;齐刘海|blunt bangs;锁链|chain"},{"names":["早川秋","早川秋（电锯人）"],"tag":"hayakawa aki","game":"热门番剧","auto":"黑发|black hair;长发|long hair;麻花辫|braid;绿瞳|green eyes;制服|uniform;耳钉|ear piercing"},{"names":["蒙奇·D·路飞","蒙奇·D·路飞（海贼王）"],"tag":"monkey d. luffy","game":"热门番剧","auto":"黑发|black hair;黑瞳|black eyes;草帽|straw hat;海盗|pirate;伤疤|scar;草履|zori"},{"names":["罗罗诺亚·索隆","罗罗诺亚·索隆（海贼王）"],"tag":"roronoa zoro","game":"热门番剧","auto":"绿发|green hair;短发|short hair;黑瞳|black eyes"},{"names":["娜美","娜美（海贼王）"],"tag":"nami (one piece)","game":"热门番剧","auto":"橙发|orange hair;卷发|curly hair;长发|long hair;橙瞳|orange eyes;刘海|bangs;鬓发|sidelocks;巨乳|huge breasts;泳装|swimsuit;比基尼|bikini;牛仔裤|jeans"},{"names":["妮可·罗宾","妮可·罗宾（海贼王）"],"tag":"nico robin","game":"热门番剧","auto":"黑发|black hair;长发|long hair;蓝瞳|blue eyes;连衣裙|dress"},{"names":["后藤一里","后藤一里（孤独摇滚）"],"tag":"gotoh hitori","game":"热门番剧","auto":"粉发|pink hair;长发|long hair;呆毛|ahoge;蓝瞳|blue eyes;吉他|guitar;刘海|bangs;大胸|large breasts;半身裙|skirt"},{"names":["伊地知虹夏","伊地知虹夏（孤独摇滚）"],"tag":"ijichi nijika","game":"热门番剧","auto":"金发|blonde hair;马尾|ponytail;麻花辫|braid;呆毛|ahoge;红瞳|red eyes;竖瞳|slit pupils;领结|bowtie;短袜|ankle socks;天使|angel"},{"names":["山田凉","山田凉（孤独摇滚）"],"tag":"yamada ryo","game":"热门番剧","auto":"蓝发|blue hair;黄瞳|yellow eyes;黑色连裤袜|black pantyhose;耳钉|ear piercing;遮单眼发|hair over one eye"},{"names":["喜多郁代","喜多郁代（孤独摇滚）"],"tag":"kita ikuyo","game":"热门番剧","auto":"红发|red hair;长发|long hair;马尾|ponytail;黄瞳|yellow eyes;吉他|guitar;天使|angel;短袜|ankle socks;小胸|small breasts"},{"names":["四宫辉夜","四宫辉夜（辉夜大小姐想让我告白）"],"tag":"shinomiya kaguya","game":"热门番剧","auto":"黑发|black hair;麻花辫|braid;红瞳|red eyes;猫耳|cat ears;小胸|small breasts;发带|hair ribbon;学生|student;及膝袜|kneehighs"},{"names":["藤原千花","藤原千花（辉夜大小姐想让我告白）"],"tag":"fujiwara chika","game":"热门番剧","auto":"粉发|pink hair;卷发|curly hair;蓝瞳|blue eyes;齐刘海|blunt bangs;蝴蝶结|bow;巨乳|huge breasts;学生|student;天使|angel"},{"names":["早坂爱","早坂爱（辉夜大小姐想让我告白）"],"tag":"hayasaka ai","game":"热门番剧","auto":"金发|blonde hair;马尾|ponytail;麻花辫|braid;蓝瞳|blue eyes;女仆|maid;刘海|bangs;发圈|hair scrunchie"},{"names":["星野爱","星野爱（我推的孩子）"],"tag":"hoshino ai","game":"热门番剧","auto":"紫发|purple hair;马尾|ponytail;紫瞳|purple eyes;偶像|idol;过膝靴|thigh boots;手套|gloves;发饰|hair ornament;刘海|bangs;大胸|large breasts"},{"names":["星野露比","星野露比（我推的孩子）"],"tag":"hoshino ruby","game":"热门番剧","auto":"金发|blonde hair;马尾|ponytail;红瞳|red eyes;偶像|idol;及膝袜|kneehighs;靴子|boots;双胞胎|twins"},{"names":["雷姆","雷姆（Re:从零开始的异世界生活）"],"tag":"rem (re:zero)","game":"热门番剧","auto":"蓝发|blue hair;长发|long hair;蓝瞳|blue eyes;女仆|maid;巨乳|huge breasts;垂眼|tareme;遮单眼发|hair over one eye;齐刘海|blunt bangs;发夹|hair clip;过膝袜|thighhighs"},{"names":["爱蜜莉雅","爱蜜莉雅（Re:从零开始的异世界生活）"],"tag":"emilia (re:zero)","game":"热门番剧","auto":"银发|silver hair;长发|long hair;紫瞳|purple eyes;尖耳|pointy ears;披风|cape;斗篷|cloak;天使|angel;过膝靴|thigh boots;过膝袜|thighhighs;头花|hair flower"},{"names":["艾姬多娜","艾姬多娜（Re:从零开始的异世界生活）"],"tag":"echidna (re:zero)","game":"热门番剧","auto":"白发|white hair;黑瞳|black eyes;好奇|curious;巨乳|huge breasts;魔女|witch;发饰|hair ornament;刘海|bangs;制服|uniform"},{"names":["阿尼亚","阿尼亚（间谍过家家）"],"tag":"anya (spy x family)","game":"热门番剧","auto":"粉发|pink hair;长发|long hair;呆毛|ahoge;绿瞳|green eyes;小胸|small breasts;学生|student;发饰|hair ornament;短袜|ankle socks;过膝袜|thighhighs;玛丽珍鞋|mary janes"},{"names":["约尔·福杰","约尔·福杰（间谍过家家）"],"tag":"yor briar","game":"热门番剧","auto":"黑发|black hair;红瞳|red eyes;巨乳|huge breasts;过膝靴|thigh boots;高跟鞋|high heels;耳环|earrings;发箍|hairband;盘发|updo"},{"names":["莱欧斯","莱欧斯（迷宫饭）"],"tag":"laios touden","game":"热门番剧","auto":"金发|blonde hair;短发|short hair;盔甲|armor;长剑|sword"},{"names":["玛露希尔","玛露希尔（迷宫饭）"],"tag":"marcille donato","game":"热门番剧","auto":"金发|blonde hair;麻花辫|braid;绿瞳|green eyes;尖耳|pointy ears;法杖|staff;公主|princess;额头|forehead;披风|cape;腰带|belt;凉鞋|sandals"},{"names":["奇尔查克","奇尔查克（迷宫饭）"],"tag":"chilchuck tims","game":"热门番剧","auto":"棕发|brown hair;短发|short hair;呆毛|ahoge;棕瞳|brown eyes;露指手套|fingerless gloves"},{"names":["先西","先西（迷宫饭）"],"tag":"senshi (dungeon meshi)","game":"热门番剧","auto":"黑发|black hair;卷发|curly hair;黑瞳|black eyes;胡须|beard;盔甲|armor;头盔|helmet;斧头|axe;凉鞋|sandals;厨师|chef"},{"names":["法琳","法琳（迷宫饭）"],"tag":"falin touden","game":"热门番剧","auto":"金发|blonde hair;短发|short hair;眯眼|squinting;靴子|boots;法杖|staff;丰满|plump"},{"names":["锦木千束","锦木千束（Lycoris Recoil）"],"tag":"nishikigi chisato","game":"热门番剧","auto":"金发|blonde hair;短发|short hair;红瞳|red eyes;巨乳|huge breasts;天使|angel;制服|uniform;丝带|ribbon;手枪|pistol;及膝袜|kneehighs"},{"names":["井之上泷奈","井之上泷奈（Lycoris Recoil）"],"tag":"inoue takina","game":"热门番剧","auto":"黑发|black hair;双马尾|twintails;紫瞳|purple eyes;刘海|bangs;及膝袜|kneehighs;乐福鞋|loafers;制服|uniform;短裤|shorts"},{"names":["洁世一","洁世一（蓝色监狱）"],"tag":"isagi yoichi","game":"热门番剧","auto":"黑发|black hair;短发|short hair;呆毛|ahoge;蓝瞳|blue eyes;运动员|athlete"},{"names":["蜂乐回","蜂乐回（蓝色监狱）"],"tag":"bachira meguru","game":"热门番剧","auto":"黑发|black hair;黄瞳|yellow eyes;吐舌|tongue out;运动员|athlete"},{"names":["樱岛麻衣","樱岛麻衣（青春猪头少年不会梦到兔女郎学姐）"],"tag":"sakurajima mai","game":"热门番剧","auto":"黑发|black hair;黑瞳|black eyes;发夹|hair clip;黑色连裤袜|black pantyhose;巨乳|huge breasts"},{"names":["薇尔莉特","薇尔莉特·伊芙加登（紫罗兰永恒花园）"],"tag":"violet evergarden","game":"热门番剧","auto":"金发|blonde hair;蓝瞳|blue eyes;盘发|updo;士兵|soldier;举手|arms up;靴子|boots;连衣裙|dress"},{"names":["猫猫","猫猫（药屋少女的呢喃）"],"tag":"maomao (kusuriya no hitorigoto)","game":"热门番剧","auto":"绿发|green hair;双马尾|twintails;蓝瞳|blue eyes;雀斑|freckles"},{"names":["埼玉","埼玉（一拳超人）"],"tag":"saitama (one-punch man)","game":"热门番剧","auto":"黑发|black hair;黑瞳|black eyes;光头|bald;披风|cape;手套|gloves"},{"names":["龙卷","龙卷（一拳超人）"],"tag":"tatsumaki","game":"热门番剧","auto":"绿发|green hair;卷发|curly hair;短发|short hair;绿瞳|green eyes;小胸|small breasts;高跟鞋|high heels"},{"names":["喜多川海梦","喜多川海梦（更衣人偶坠入爱河）"],"tag":"kitagawa marin","game":"热门番剧","auto":"金发|blonde hair;染发|dyed hair;黑瞳|black eyes;制服|uniform;短袜|ankle socks;耳环|earrings;过膝靴|thigh boots;戒指|ring;巨乳|huge breasts;天使|angel"},{"names":["五条新菜","五条新菜（更衣人偶坠入爱河）"],"tag":"gojou wakana","game":"热门番剧","auto":"黑发|black hair;黑瞳|black eyes;和服|kimono;方巾|bandana;刘海|bangs;人偶关节|doll joints"},{"names":["Saber","Saber（Fate/stay night）"],"tag":"saber (fate)","game":"热门番剧","auto":"金发|blonde hair;长发|long hair;低马尾|low ponytail;呆毛|ahoge;绿瞳|green eyes;骑士|knight;盘发|updo;盔甲|armor;小胸|small breasts"},{"names":["漩涡鸣人","漩涡鸣人（火影忍者）"],"tag":"uzumaki naruto","game":"热门番剧","auto":"金发|blonde hair;刺猬头|spiked hair;短发|short hair;蓝瞳|blue eyes;忍者|ninja;护目镜|goggles;夹克|jacket;披风|cape"},{"names":["黑崎一护","黑崎一护（死神）"],"tag":"kurosaki ichigo","game":"热门番剧","auto":"橙发|orange hair;刺猬头|spiked hair;棕瞳|brown eyes;光环|halo;口罩|mask"},{"names":["惠惠","惠惠（为美好的世界献上祝福！）"],"tag":"megumin","game":"热门番剧","auto":"黑发|black hair;红瞳|red eyes;小胸|small breasts;眼罩|eyepatch;过膝袜|thighhighs;帽子|hat;手套|gloves;腰带|belt;绷带|bandage;披风|cape"},{"names":["安洁莉娜","安洁莉娜（明日方舟）"],"tag":"angelina (arknights)","game":"明日方舟","auto":"棕发|brown hair;双马尾|twintails;红瞳|red eyes;兽耳|animal ears;法杖|staff;手套|gloves"},{"names":["黍","黍（明日方舟）"],"tag":"shu (arknights)","game":"明日方舟","auto":"银发|silver hair;长发|long hair;蓝瞳|blue eyes;尾巴|tail;尖耳|pointy ears;裸肩|bare shoulders;无袖|sleeveless;小胸|small breasts;高腰|high-waist;短靴|ankle boots"},{"names":["年","年（明日方舟）"],"tag":"nian (arknights)","game":"明日方舟","auto":"银发|silver hair;高马尾|high ponytail;紫瞳|purple eyes;尾巴|tail;尖耳|pointy ears;纹身|tattoo;盾牌|shield;短靴|ankle boots;吐舌|tongue out;披肩|shawl"},{"names":["澄闪","澄闪（明日方舟）"],"tag":"goldenglow (arknights)","game":"明日方舟","auto":"粉发|pink hair;猫耳|cat ears;发箍|hairband"},{"names":["苏苏洛","苏苏洛（明日方舟）"],"tag":"sussurro (arknights)","game":"明日方舟","auto":"粉发|pink hair;蓝瞳|blue eyes;狐娘|fox girl;天使|angel;小胸|small breasts;黑色连裤袜|black pantyhose;运动鞋|sneakers"},{"names":["艾丽妮","艾丽妮（明日方舟）"],"tag":"irene (arknights)","game":"明日方舟","auto":"银发|silver hair;长发|long hair;灰瞳|grey eyes;手枪|pistol;手套|gloves;伤疤|scar;刘海|bangs"},{"names":["塞雷娅","塞雷娅（明日方舟）"],"tag":"saria (arknights)","game":"明日方舟","auto":"银发|silver hair;橙瞳|orange eyes;尾巴|tail;盾牌|shield;大胸|large breasts"},{"names":["霍尔海雅","霍尔海雅（明日方舟）"],"tag":"ho'olheyak (arknights)","game":"明日方舟","auto":"灰发|grey hair;绿瞳|green eyes;尾巴|tail;丰满|plump;黑色连裤袜|black pantyhose;高跟鞋|high heels"},{"names":["星熊","星熊（明日方舟）"],"tag":"hoshiguma (arknights)","game":"明日方舟","auto":"绿发|green hair;棕瞳|brown eyes;手套|gloves;巨乳|huge breasts"},{"names":["艾雅法拉","艾雅法拉（明日方舟）"],"tag":"eyjafjalla (arknights)","game":"明日方舟","auto":"棕发|brown hair;卷发|curly hair;粉瞳|pink eyes;科学家|scientist;天使|angel;过膝袜|thighhighs;短靴|ankle boots;法杖|staff;小胸|small breasts"},{"names":["塑心","塑心（明日方舟）"],"tag":"virtuosa (arknights)","game":"明日方舟","auto":"黑发|black hair;黑瞳|black eyes;光环|halo;翅膀|wings;天使|angel;姬发式|hime cut;吊眼|tsurime;小胸|small breasts;过膝袜|thighhighs;高跟鞋|high heels"},{"names":["缪尔赛思","缪尔赛思（明日方舟）"],"tag":"muelsyse (arknights)","game":"明日方舟","auto":"灰金发|ash blonde hair;黄瞳|yellow eyes;科学家|scientist;调皮|mischievous"},{"names":["山","山（明日方舟）"],"tag":"mountain (arknights)","game":"明日方舟","auto":"黑发|black hair;蓝瞳|blue eyes;兽耳|animal ears;伤疤|scar"},{"names":["重岳","重岳（明日方舟）"],"tag":"chongyue (arknights)","game":"明日方舟","auto":"黑发|black hair;多色发|multicolored hair;绿瞳|green eyes;尾巴|tail;尖耳|pointy ears;运动鞋|sneakers;纹身|tattoo"},{"names":["特蕾西娅","特蕾西娅（明日方舟）"],"tag":"theresa (arknights)","game":"明日方舟","auto":"长发|long hair;粉瞳|pink eyes;戒指|ring"},{"names":["苇草","苇草（明日方舟）"],"tag":"reed (arknights)","game":"明日方舟","auto":"白发|white hair;超长发|very long hair;呆毛|ahoge;尖耳|pointy ears;枪|gun;小胸|small breasts;过膝靴|thigh boots"},{"names":["羽毛笔","羽毛笔（明日方舟）"],"tag":"la pluma (arknights)","game":"明日方舟","auto":"黑发|black hair;短发|short hair;呆毛|ahoge;黑瞳|black eyes;凉鞋|sandals;发夹|hair clip"},{"names":["推进之王","推进之王（明日方舟）"],"tag":"siege (arknights)","game":"明日方舟","auto":"金发|blonde hair;棕瞳|brown eyes;兽耳|animal ears;尾巴|tail;刘海|bangs;巨乳|huge breasts;背心|tank top;夹克|jacket"},{"names":["煌","煌（明日方舟）"],"tag":"blaze (arknights)","game":"明日方舟","auto":"黑发|black hair;蓝瞳|blue eyes;兽耳|animal ears;尾巴|tail;发箍|hairband;过膝袜|thighhighs;短袜|ankle socks;泡泡袖|puffy sleeves;巨乳|huge breasts;泳装|swimsuit"},{"names":["初雪","初雪（明日方舟）"],"tag":"pramanix (arknights)","game":"明日方舟","auto":"白发|white hair;麻花辫|braid;灰瞳|grey eyes;兽耳|animal ears;尾巴|tail;项链|necklace;过膝袜|thighhighs;靴子|boots;垂眼|tareme"},{"names":["宴","宴（明日方舟）"],"tag":"utage (arknights)","game":"明日方舟","auto":"长发|long hair;粉瞳|pink eyes;兽耳|animal ears;尾巴|tail;巨乳|huge breasts;过膝袜|thighhighs"},{"names":["黑","黑（明日方舟）"],"tag":"schwarz (arknights)","game":"明日方舟","auto":"银发|silver hair;马尾|ponytail;兽耳|animal ears;尾巴|tail;巨乳|huge breasts"},{"names":["提丰","提丰（明日方舟）"],"tag":"typhon (arknights)","game":"明日方舟","auto":"紫发|purple hair;粉瞳|pink eyes;长弓|longbow;巨乳|huge breasts;短袜|ankle socks;靴子|boots"},{"names":["刻俄柏","刻俄柏（明日方舟）"],"tag":"ceobe (arknights)","game":"明日方舟","auto":"金发|blonde hair;粉瞳|pink eyes;过膝靴|thigh boots;巨乳|huge breasts"},{"names":["赫默","赫默（明日方舟）"],"tag":"silence (arknights)","game":"明日方舟","auto":"棕发|brown hair;短发|short hair;眼镜|glasses;短袜|ankle socks;科学家|scientist"},{"names":["菲亚梅塔","菲亚梅塔（明日方舟）"],"tag":"fiammetta (arknights)","game":"明日方舟","auto":"粉发|pink hair;短发|short hair;红瞳|red eyes;靴子|boots;制服|uniform;巨乳|huge breasts"},{"names":["水月","水月（明日方舟）"],"tag":"mizuki (arknights)","game":"明日方舟","auto":"蓝发|blue hair;多色发|multicolored hair;渐变发|gradient hair;粉瞳|pink eyes;黑色连裤袜|black pantyhose;背心|tank top;贝雷帽|beret;无袖|sleeveless;手套|gloves"},{"names":["诗怀雅","诗怀雅（明日方舟）"],"tag":"swire (arknights)","game":"明日方舟","auto":"金发|blonde hair;卷发|curly hair;超长发|very long hair;发髻|hair bun;绿瞳|green eyes;过膝袜|thighhighs;大胸|large breasts"},{"names":["临光","临光（明日方舟）"],"tag":"nearl (arknights)","game":"明日方舟","auto":"金发|blonde hair;马尾|ponytail;橙瞳|orange eyes;骑士|knight;盾牌|shield;大胸|large breasts;盔甲|armor"},{"names":["吽","吽（明日方舟）"],"tag":"hung (arknights)","game":"明日方舟","auto":"白发|white hair;橙瞳|orange eyes;兽耳|animal ears;盾牌|shield"},{"names":["杰西卡","杰西卡（明日方舟）"],"tag":"jessica (arknights)","game":"明日方舟","auto":"蓝发|blue hair;马尾|ponytail;绿瞳|green eyes;猫娘|catgirl;手套|gloves;短靴|ankle boots"},{"names":["塔露拉","塔露拉（明日方舟）"],"tag":"talulah (arknights)","game":"明日方舟","auto":"银发|silver hair;灰瞳|grey eyes;尾巴|tail;长剑|sword;短靴|ankle boots"},{"names":["霜星","霜星（明日方舟）"],"tag":"frostnova (arknights)","game":"明日方舟","auto":"银发|silver hair;灰瞳|grey eyes;兔耳|rabbit ears;遮单眼发|hair over one eye;过膝靴|thigh boots;匕首|dagger"},{"names":["斥罪","斥罪（明日方舟）"],"tag":"penance (arknights)","game":"明日方舟","auto":"棕发|brown hair;麻花辫|braid;盔甲|armor;巨乳|huge breasts;过膝袜|thighhighs"},{"names":["桃金娘","桃金娘（明日方舟）"],"tag":"myrtle (arknights)","game":"明日方舟","auto":"红发|red hair;超长发|very long hair;呆毛|ahoge;绿瞳|green eyes;尖耳|pointy ears;美人痣|beauty mark;小胸|small breasts;长袖|long sleeves;短袜|ankle socks;运动鞋|sneakers"},{"names":["鞭刃","鞭刃（明日方舟）"],"tag":"whislash (arknights)","game":"明日方舟","auto":"金发|blonde hair;蓝瞳|blue eyes;兽耳|animal ears;尾巴|tail;过膝袜|thighhighs;巨乳|huge breasts;丝带|ribbon"},{"names":["嵯峨","嵯峨（明日方舟）"],"tag":"saga (arknights)","game":"明日方舟","auto":"黑发|black hair;棕瞳|brown eyes;兽耳|animal ears;姬发式|hime cut;木屐|geta"},{"names":["红","红（明日方舟）"],"tag":"projekt red (arknights)","game":"明日方舟","auto":"灰发|grey hair;长发|long hair;狼尾|wolf tail;狗耳|dog ears;刘海|bangs;匕首|dagger;兜帽|hood"},{"names":["风笛","风笛（明日方舟）"],"tag":"bagpipe (arknights)","game":"明日方舟","auto":"橙发|orange hair;蓝瞳|blue eyes;枪|gun;巨乳|huge breasts;过膝袜|thighhighs"},{"names":["瑕光","瑕光（明日方舟）"],"tag":"blemishine (arknights)","game":"明日方舟","auto":"金发|blonde hair;马尾|ponytail;兽耳|animal ears;尾巴|tail;骑士|knight;盔甲|armor;盾牌|shield;披风|cape;过膝靴|thigh boots"},{"names":["极光","极光（明日方舟）"],"tag":"aurora (arknights)","game":"明日方舟","auto":"白发|white hair;蓝瞳|blue eyes;兽耳|animal ears"},{"names":["歌蕾蒂娅","歌蕾蒂娅（明日方舟）"],"tag":"gladiia (arknights)","game":"明日方舟","auto":"金发|blonde hair;红瞳|red eyes;尖耳|pointy ears;披风|cape;过膝靴|thigh boots"},{"names":["食铁兽","食铁兽（明日方舟）"],"tag":"feater (arknights)","game":"明日方舟","auto":"银发|silver hair;双马尾|twintails;红瞳|red eyes;旗袍|qipao;巨乳|huge breasts;墨镜|sunglasses"},{"names":["霜叶","霜叶（明日方舟）"],"tag":"frostleaf (arknights)","game":"明日方舟","auto":"银发|silver hair;红瞳|red eyes;狐娘|fox girl;裸肩|bare shoulders;黑色连裤袜|black pantyhose;护膝|knee pads"},{"names":["棘刺","棘刺（明日方舟）"],"tag":"thorns (arknights)","game":"明日方舟","auto":"黑发|black hair;低马尾|low ponytail;橙瞳|orange eyes;手套|gloves;王冠|crown"},{"names":["龙舌兰","龙舌兰（明日方舟）"],"tag":"tequila (arknights)","game":"明日方舟","auto":"金发|blonde hair;呆毛|ahoge;狗耳|dog ears;尾巴|tail;无袖|sleeveless;凉鞋|sandals;短裤|shorts;项链|necklace;墨镜|sunglasses"},{"names":["华法琳","华法琳（明日方舟）"],"tag":"warfarin (arknights)","game":"明日方舟","auto":"白发|white hair;红瞳|red eyes;尖耳|pointy ears;吸血鬼|vampire;黑色连裤袜|black pantyhose"},{"names":["芙兰卡","芙兰卡（明日方舟）"],"tag":"franka (arknights)","game":"明日方舟","auto":"棕发|brown hair;兽耳|animal ears;尾巴|tail;狐娘|fox girl;巨乳|huge breasts;短袜|ankle socks;过膝袜|thighhighs;领带|necktie;制服|uniform;高跟鞋|high heels"},{"names":["嘉维尔","嘉维尔（明日方舟）"],"tag":"gavial (arknights)","game":"明日方舟","auto":"绿发|green hair;尖耳|pointy ears;大胸|large breasts;短靴|ankle boots"},{"names":["雷蛇","雷蛇（明日方舟）"],"tag":"liskarm (arknights)","game":"明日方舟","auto":"灰发|grey hair;红瞳|red eyes;尾巴|tail;盾牌|shield;大胸|large breasts"},{"names":["空","空（明日方舟）"],"tag":"sora (arknights)","game":"明日方舟","auto":"金发|blonde hair;双马尾|twintails;呆毛|ahoge;红瞳|red eyes;狗耳|dog ears;偶像|idol;大胸|large breasts;过膝袜|thighhighs;靴子|boots"},{"names":["凛冬","凛冬（明日方舟）"],"tag":"zima (arknights)","game":"明日方舟","auto":"棕发|brown hair;蓝瞳|blue eyes;兽耳|animal ears;刘海|bangs;短靴|ankle boots"},{"names":["星极","星极（明日方舟）"],"tag":"astesia (arknights)","game":"明日方舟","auto":"蓝发|blue hair;麻花辫|braid;蓝瞳|blue eyes;双胞胎|twins;公主|princess"},{"names":["巫恋","巫恋（明日方舟）"],"tag":"shamare (arknights)","game":"明日方舟","auto":"粉发|pink hair;粉瞳|pink eyes;小胸|small breasts;连裤袜|pantyhose"},{"names":["弑君者","弑君者（明日方舟）"],"tag":"crownslayer (arknights)","game":"明日方舟","auto":"红发|red hair;红瞳|red eyes;兽耳|animal ears;兜帽|hood;露指手套|fingerless gloves"},{"names":["克洛丝","克洛丝（明日方舟）"],"tag":"kroos (arknights)","game":"明日方舟","auto":"黑发|black hair;短发|short hair;绿瞳|green eyes;眯眼|squinting;创可贴|bandaid"},{"names":["逻各斯","逻各斯（明日方舟）"],"tag":"logos (arknights)","game":"明日方舟","auto":"灰发|grey hair;红瞳|red eyes;尖耳|pointy ears;手套|gloves"},{"names":["送葬人","送葬人（明日方舟）"],"tag":"executor (arknights)","game":"明日方舟","auto":"白发|white hair;长发|long hair;光环|halo;翅膀|wings;天使|angel;微笑|smile"},{"names":["普瑞赛斯","普瑞赛斯（明日方舟）"],"tag":"priestess (arknights)","game":"明日方舟","auto":"棕发|brown hair;紫瞳|purple eyes;黑色连裤袜|black pantyhose;科学家|scientist;发箍|hairband;蝴蝶结|bow"},{"names":["帕拉斯","帕拉斯（明日方舟）"],"tag":"pallas (arknights)","game":"明日方舟","auto":"灰金发|ash blonde hair;绿瞳|green eyes;黑色连裤袜|black pantyhose"},{"names":["薇薇安娜","薇薇安娜（明日方舟）"],"tag":"viviana (arknights)","game":"明日方舟","auto":"金发|blonde hair;高马尾|high ponytail;蓝瞳|blue eyes;兽耳|animal ears;骑士|knight;巨乳|huge breasts;高跟鞋|high heels"},{"names":["伊内丝","伊内丝（明日方舟）"],"tag":"ines (arknights)","game":"明日方舟","auto":"黑发|black hair;巨乳|huge breasts;靴子|boots"},{"names":["古米","古米（明日方舟）"],"tag":"gummy (arknights)","game":"明日方舟","auto":"金发|blonde hair;双马尾|twintails;橙瞳|orange eyes;兽耳|animal ears;发夹|hair clip;连裤袜|pantyhose;玛丽珍鞋|mary janes;天使|angel"},{"names":["多萝西","多萝西（明日方舟）"],"tag":"dorothy (arknights)","game":"明日方舟","auto":"金发|blonde hair;低马尾|low ponytail;巨乳|huge breasts;短袜|ankle socks;短靴|ankle boots;科学家|scientist;过膝袜|thighhighs;过膝靴|thigh boots"},{"names":["维什戴尔","维什戴尔（明日方舟）"],"tag":"wis'adel (arknights)","game":"明日方舟","auto":"白发|white hair;红瞳|red eyes;尾巴|tail;巨乳|huge breasts;短裤|shorts;短靴|ankle boots"},{"names":["玛恩纳","玛恩纳（明日方舟）"],"tag":"mlynar (arknights)","game":"明日方舟","auto":"黄瞳|yellow eyes;骑士|knight;遮单眼发|hair over one eye"},{"names":["号角","号角（明日方舟）"],"tag":"horn (arknights)","game":"明日方舟","auto":"金发|blonde hair;绿瞳|green eyes;头带|headband;背心|tank top;巨乳|huge breasts;过膝靴|thigh boots"},{"names":["黑键","黑键（明日方舟）"],"tag":"ebenholz (arknights)","game":"明日方舟","auto":"黑发|black hair;低马尾|low ponytail;紫瞳|purple eyes"},{"names":["琴柳","琴柳（明日方舟）"],"tag":"saileach (arknights)","game":"明日方舟","auto":"金发|blonde hair;超长发|very long hair;麻花辫|braid;蓝瞳|blue eyes;过膝袜|thighhighs;发箍|hairband;巨乳|huge breasts"},{"names":["可颂","可颂（明日方舟）"],"tag":"croissant (arknights)","game":"明日方舟","auto":"橙发|orange hair;呆毛|ahoge;蓝瞳|blue eyes;吊眼|tsurime;盾牌|shield"},{"names":["散兵","散兵（原神）"],"tag":"scaramouche (genshin impact)","game":"原神","auto":"紫发|purple hair;紫瞳|purple eyes;人偶关节|doll joints;木屐|geta;披风|cape;飞行|flying"},{"names":["钟离","钟离（原神）"],"tag":"zhongli (genshin impact)","game":"原神","auto":"黑发|black hair;多色发|multicolored hair;麻花辫|braid;呆毛|ahoge;长枪|spear"},{"names":["达达利亚","达达利亚（原神）"],"tag":"tartaglia (genshin impact)","game":"原神","auto":"橙发|orange hair;呆毛|ahoge;蓝瞳|blue eyes;刘海|bangs;手套|gloves;口罩|mask"},{"names":["魈","魈（原神）"],"tag":"xiao (genshin impact)","game":"原神","auto":"绿发|green hair;呆毛|ahoge;口罩|mask;项链|necklace;手套|gloves;靴子|boots;长枪|spear"},{"names":["阿蕾奇诺","阿蕾奇诺（原神）"],"tag":"arlecchino (genshin impact)","game":"原神","auto":"白发|white hair;低马尾|low ponytail;黑瞳|black eyes;高跟鞋|high heels"},{"names":["茜特菈莉","茜特菈莉（原神）"],"tag":"citlali (genshin impact)","game":"原神","auto":"粉发|pink hair;麻花辫|braid;蓝瞳|blue eyes;刘海|bangs;无袖|sleeveless;露背|backless;手套|gloves;高跟鞋|high heels;凉鞋|sandals"},{"names":["夜兰","夜兰（原神）"],"tag":"yelan (genshin impact)","game":"原神","auto":"黑发|black hair;短发|short hair;绿瞳|green eyes;项链|necklace;巨乳|huge breasts;分离袖|detached sleeves;露背|backless;手套|gloves;鬓发|sidelocks;高跟鞋|high heels"},{"names":["艾尔海森","艾尔海森（原神）"],"tag":"alhaitham (genshin impact)","game":"原神","auto":"灰发|grey hair;呆毛|ahoge;绿瞳|green eyes;披风|cape;遮单眼发|hair over one eye;裸肩|bare shoulders;靴子|boots"},{"names":["克洛琳德","克洛琳德（原神）"],"tag":"clorinde (genshin impact)","game":"原神","auto":"藏蓝发|navy blue hair;紫瞳|purple eyes;巨乳|huge breasts;手枪|pistol;披风|cape;手套|gloves;黑色连裤袜|black pantyhose;短靴|ankle boots;高跟鞋|high heels"},{"names":["卡维","卡维（原神）"],"tag":"kaveh (genshin impact)","game":"原神","auto":"金发|blonde hair;红瞳|red eyes;披风|cape;吊眼|tsurime;发饰|hair ornament"},{"names":["赛诺","赛诺（原神）"],"tag":"cyno (genshin impact)","game":"原神","auto":"白发|white hair;竖瞳|slit pupils;遮单眼发|hair over one eye;枪|gun"},{"names":["提纳里","提纳里（原神）"],"tag":"tighnari (genshin impact)","game":"原神","auto":"黑发|black hair;长发|long hair;棕瞳|brown eyes;兽耳|animal ears;狐尾|fox tail;兜帽|hood;短靴|ankle boots;手套|gloves;耳环|earrings;披风|cape"},{"names":["柯莱","柯莱（原神）"],"tag":"collei (genshin impact)","game":"原神","auto":"绿发|green hair;紫瞳|purple eyes;绷带|bandage;学生|student;露背|backless;披风|cape;分离袖|detached sleeves;长弓|longbow;过膝袜|thighhighs;人偶关节|doll joints"},{"names":["坎蒂丝","坎蒂丝（原神）"],"tag":"candace (genshin impact)","game":"原神","auto":"黑发|black hair;短发|short hair;双马尾|twintails;异色瞳|heterochromia;头带|headband;刘海|bangs;凉鞋|sandals;盾牌|shield;枪|gun;发饰|hair ornament"},{"names":["莱依拉","莱依拉（原神）"],"tag":"layla (genshin impact)","game":"原神","auto":"蓝发|blue hair;发髻|hair bun;尖耳|pointy ears;垂眼|tareme;自信|confident;高跟鞋|high heels;连裤袜|pantyhose;手套|gloves;披风|cape;斗篷|cloak"},{"names":["珐露珊","珐露珊（原神）"],"tag":"faruzan (genshin impact)","game":"原神","auto":"青绿发|teal hair;双马尾|twintails;呆毛|ahoge;蓝瞳|blue eyes;连衣裙|dress;吊眼|tsurime;异色瞳|heterochromia;发饰|hair ornament;齐刘海|blunt bangs"},{"names":["绮良良","绮良良（原神）"],"tag":"kirara (genshin impact)","game":"原神","auto":"灰金发|ash blonde hair;绿瞳|green eyes;猫耳|cat ears;猫娘|catgirl;蝴蝶结|bow;分离袖|detached sleeves"},{"names":["琳妮特","琳妮特（原神）"],"tag":"lynette (genshin impact)","game":"原神","auto":"棕发|brown hair;麻花辫|braid;紫瞳|purple eyes;猫耳|cat ears;猫尾|cat tail;礼帽|fedora;黑色连裤袜|black pantyhose;短靴|ankle boots;手套|gloves;鬓发|sidelocks"},{"names":["林尼","林尼（原神）"],"tag":"lyney (genshin impact)","game":"原神","auto":"棕发|brown hair;麻花辫|braid;紫瞳|purple eyes;吐舌|tongue out;礼帽|fedora;手套|gloves;分离袖|detached sleeves"},{"names":["菲米尼","菲米尼（原神）"],"tag":"freminet (genshin impact)","game":"原神","auto":"金发|blonde hair;蓝瞳|blue eyes;短裤|shorts;贝雷帽|beret;遮单眼发|hair over one eye;手套|gloves;雀斑|freckles"},{"names":["莱欧斯利","莱欧斯利（原神）"],"tag":"wriothesley (genshin impact)","game":"原神","auto":"黑发|black hair;呆毛|ahoge;紫瞳|purple eyes;绷带|bandage;手套|gloves;过膝靴|thigh boots;耳钉|ear piercing;披肩|shawl;伤疤|scar"},{"names":["希格雯","希格雯（原神）"],"tag":"sigewinne (genshin impact)","game":"原神","auto":"蓝发|blue hair;双马尾|twintails;呆毛|ahoge;红瞳|red eyes;尾巴|tail;兽耳|animal ears;小胸|small breasts;触角|antennae;护士|nurse;护士服|nurse uniform"},{"names":["玛薇卡","玛薇卡（原神）"],"tag":"mavuika (genshin impact)","game":"原神","auto":"红发|red hair;多色发|multicolored hair;长发|long hair;呆毛|ahoge;红瞳|red eyes;巨乳|huge breasts;手套|gloves;短靴|ankle boots;墨镜|sunglasses"},{"names":["希诺宁","希诺宁（原神）"],"tag":"xilonen (genshin impact)","game":"原神","auto":"多色发|multicolored hair;卷发|curly hair;金发|blonde hair;波浪发|wavy hair;麻花辫|braid;呆毛|ahoge;绿瞳|green eyes;猫耳|cat ears;猫尾|cat tail;猫娘|catgirl"},{"names":["基尼奇","基尼奇（原神）"],"tag":"kinich (genshin impact)","game":"原神","auto":"黑发|black hair;呆毛|ahoge;绿瞳|green eyes;方巾|bandana;手套|gloves;短靴|ankle boots"},{"names":["玛拉妮","玛拉妮（原神）"],"tag":"mualani (genshin impact)","game":"原神","auto":"灰发|grey hair;马尾|ponytail;麻花辫|braid;红瞳|red eyes;头带|headband;凉鞋|sandals;露指手套|fingerless gloves"},{"names":["卡齐娜","卡齐娜（原神）"],"tag":"kachina (genshin impact)","game":"原神","auto":"棕发|brown hair;马尾|ponytail;黑瞳|black eyes;兽耳|animal ears;小胸|small breasts;手套|gloves;短裤|shorts;及膝袜|kneehighs;创可贴|bandaid"},{"names":["欧洛伦","欧洛伦（原神）"],"tag":"ororon (genshin impact)","game":"原神","auto":"藏蓝发|navy blue hair;粉瞳|pink eyes;兽耳|animal ears;异色瞳|heterochromia;兜帽|hood;围巾|scarf;露指手套|fingerless gloves;无袖|sleeveless"},{"names":["瓦蕾莎","瓦蕾莎（原神）"],"tag":"varesa (genshin impact)","game":"原神","auto":"粉发|pink hair;麻花辫|braid;呆毛|ahoge;紫瞳|purple eyes;兽耳|animal ears;尾巴|tail;巨乳|huge breasts;口罩|mask;丰满|plump;创可贴|bandaid"},{"names":["爱可菲","爱可菲（原神）"],"tag":"escoffier (genshin impact)","game":"原神","auto":"金发|blonde hair;呆毛|ahoge;蓝瞳|blue eyes;尾巴|tail;厨师|chef;高跟鞋|high heels;过膝袜|thighhighs"},{"names":["丝柯克","丝柯克（原神）"],"tag":"skirk (genshin impact)","game":"原神","auto":"白发|white hair;红瞳|red eyes;尾巴|tail;裸肩|bare shoulders;吉他|guitar"},{"names":["艾丽丝","艾丽丝（原神）"],"tag":"alice (genshin impact)","game":"原神","auto":"长发|long hair;尖耳|pointy ears;魔女|witch;帽子|hat"},{"names":["队长","队长（原神）"],"tag":"capitano (genshin impact)","game":"原神","auto":"黑发|black hair;长发|long hair;蓝瞳|blue eyes;口罩|mask;披风|cape"},{"names":["少女","少女（原神）"],"tag":"columbina (genshin impact)","game":"原神","auto":"黑发|black hair;渐变发|gradient hair;长发|long hair;闭眼|closed eyes;翅膀|wings;齐刘海|blunt bangs;眼罩|eyepatch;蝴蝶结|bow;丝带|ribbon;制服|uniform"},{"names":["木偶","木偶（原神）"],"tag":"sandrone (genshin impact)","game":"原神","auto":"棕发|brown hair;蓝瞳|blue eyes;制服|uniform;科学家|scientist"},{"names":["女士","女士（原神）"],"tag":"signora (genshin impact)","game":"原神","auto":"白发|white hair;紫瞳|purple eyes;口罩|mask;巨乳|huge breasts;鬓发|sidelocks"},{"names":["博士","博士（原神）"],"tag":"dottore (genshin impact)","game":"原神","auto":"蓝发|blue hair;红瞳|red eyes;科学家|scientist;口罩|mask"},{"names":["千织","千织（原神）"],"tag":"chiori (genshin impact)","game":"原神","auto":"棕发|brown hair;卷发|curly hair;高马尾|high ponytail;红瞳|red eyes;头花|hair flower;和服|kimono;木屐|geta;吊眼|tsurime"},{"names":["闲云","闲云（原神）"],"tag":"xianyun (genshin impact)","game":"原神","auto":"黑发|black hair;蓝瞳|blue eyes;眼镜|glasses"},{"names":["云堇","云堇（原神）"],"tag":"yun jin (genshin impact)","game":"原神","auto":"黑发|black hair;红瞳|red eyes;姬发式|hime cut;长枪|spear;黑色连裤袜|black pantyhose;靴子|boots;汉服|hanfu"},{"names":["烟绯","烟绯（原神）"],"tag":"yanfei (genshin impact)","game":"原神","auto":"粉发|pink hair;绿瞳|green eyes;垂眼|tareme;帽子|hat;围巾|scarf;夹克|jacket;裸肩|bare shoulders;分离袖|detached sleeves;短靴|ankle boots;靴子|boots"},{"names":["辛焱","辛焱（原神）"],"tag":"xinyan (genshin impact)","game":"原神","auto":"黑发|black hair;双马尾|twintails;吊眼|tsurime"},{"names":["罗莎莉亚","罗莎莉亚（原神）"],"tag":"rosaria (genshin impact)","game":"原神","auto":"紫发|purple hair;短发|short hair;紫瞳|purple eyes;修女|nun;巨乳|huge breasts;高跟鞋|high heels;长枪|spear;手套|gloves"},{"names":["迪奥娜","迪奥娜（原神）"],"tag":"diona (genshin impact)","game":"原神","auto":"粉发|pink hair;麻花辫|braid;绿瞳|green eyes;猫娘|catgirl;小胸|small breasts;吊眼|tsurime;刘海|bangs;额头|forehead;分离袖|detached sleeves;短靴|ankle boots"},{"names":["砂糖","砂糖（原神）"],"tag":"sucrose (genshin impact)","game":"原神","auto":"绿发|green hair;低马尾|low ponytail;呆毛|ahoge;兽耳|animal ears;眼镜|glasses;手套|gloves;披风|cape;好奇|curious"},{"names":["班尼特","班尼特（原神）"],"tag":"bennett (genshin impact)","game":"原神","auto":"白发|white hair;绿瞳|green eyes;护目镜|goggles;创可贴|bandaid;伤疤|scar;手套|gloves"},{"names":["雷泽","雷泽（原神）"],"tag":"razor (genshin impact)","game":"原神","auto":"银发|silver hair;红瞳|red eyes;伤疤|scar;兜帽|hood"},{"names":["行秋","行秋（原神）"],"tag":"xingqiu (genshin impact)","game":"原神","auto":"蓝发|blue hair;黄瞳|yellow eyes;鬓发|sidelocks;齐刘海|blunt bangs;耳环|earrings;垂眼|tareme;汉服|hanfu"},{"names":["重云","重云（原神）"],"tag":"chongyun (genshin impact)","game":"原神","auto":"蓝发|blue hair;呆毛|ahoge;蓝瞳|blue eyes;绷带|bandage;兜帽|hood;竖瞳|slit pupils"},{"names":["北斗","北斗（原神）"],"tag":"beidou (genshin impact)","game":"原神","auto":"黑发|black hair;红瞳|red eyes;眼罩|eyepatch;发饰|hair ornament;旗袍|qipao;过膝靴|thigh boots;巨乳|huge breasts"},{"names":["香菱","香菱（原神）"],"tag":"xiangling (genshin impact)","game":"原神","auto":"蓝发|blue hair;短发|short hair;麻花辫|braid;厨师|chef;露指手套|fingerless gloves;长枪|spear;发饰|hair ornament;旗袍|qipao"},{"names":["瑶瑶","瑶瑶（原神）"],"tag":"yaoyao (genshin impact)","game":"原神","auto":"棕发|brown hair;双马尾|twintails;麻花辫|braid;小胸|small breasts;学生|student;天使|angel;齐刘海|blunt bangs"},{"names":["夏洛蒂","夏洛蒂（原神）"],"tag":"charlotte (genshin impact)","game":"原神","auto":"粉发|pink hair;绿瞳|green eyes;单片眼镜|monocle;分离袖|detached sleeves;手套|gloves;短靴|ankle boots"},{"names":["托马","托马（原神）"],"tag":"thoma (genshin impact)","game":"原神","auto":"金发|blonde hair;马尾|ponytail;呆毛|ahoge;绿瞳|green eyes;发饰|hair ornament;耳钉|ear piercing;夹克|jacket;项链|necklace;长枪|spear;刘海|bangs"},{"names":["五郎","五郎（原神）"],"tag":"gorou (genshin impact)","game":"原神","auto":"棕发|brown hair;蓝瞳|blue eyes;长弓|longbow"},{"names":["早柚","早柚（原神）"],"tag":"sayu (genshin impact)","game":"原神","auto":"绿发|green hair;双马尾|twintails;紫瞳|purple eyes;尾巴|tail;小胸|small breasts;忍者|ninja;兜帽|hood;刘海|bangs"},{"names":["阿贝多","阿贝多（原神）"],"tag":"albedo (genshin impact)","game":"原神","auto":"金发|blonde hair;蓝瞳|blue eyes;过膝靴|thigh boots;画家|artist"},{"names":["白术","白术（原神）"],"tag":"baizhu (genshin impact)","game":"原神","auto":"绿发|green hair;麻花辫|braid;呆毛|ahoge;红瞳|red eyes;眼镜|glasses;竖瞳|slit pupils;手套|gloves;鬓发|sidelocks"},{"names":["夏沃蕾","夏沃蕾（原神）"],"tag":"chevreuse (genshin impact)","game":"原神","auto":"紫发|purple hair;长发|long hair;紫瞳|purple eyes;小胸|small breasts;刘海|bangs;美人痣|beauty mark;眼罩|eyepatch;裸肩|bare shoulders;手套|gloves;黑色连裤袜|black pantyhose"},{"names":["嘉明","嘉明（原神）"],"tag":"gaming (genshin impact)","game":"原神","auto":"黑发|black hair;马尾|ponytail;呆毛|ahoge;手套|gloves;眉钉|eyebrow piercing"},{"names":["恰斯卡","恰斯卡（原神）"],"tag":"chasca (genshin impact)","game":"原神","auto":"红发|red hair;麻花辫|braid;蓝瞳|blue eyes;尖耳|pointy ears;遮单眼发|hair over one eye;耳环|earrings;手套|gloves"},{"names":["多莉","多莉（原神）"],"tag":"dori (genshin impact)","game":"原神","auto":"粉发|pink hair;呆毛|ahoge;灯笼裤|bloomers;分离袖|detached sleeves;墨镜|sunglasses;戒指|ring"},{"names":["米卡","米卡（原神）"],"tag":"mika (genshin impact)","game":"原神","auto":"金发|blonde hair;呆毛|ahoge;蓝瞳|blue eyes;骑士|knight;垂眼|tareme;耳钉|ear piercing;及膝袜|kneehighs"},{"names":["戴因斯雷布","戴因斯雷布（原神）"],"tag":"dainsleif (genshin impact)","game":"原神","auto":"金发|blonde hair;蓝瞳|blue eyes;骑士|knight"},{"names":["艾梅莉埃","艾梅莉埃（原神）"],"tag":"emilie (genshin impact)","game":"原神","auto":"金发|blonde hair;多色发|multicolored hair;呆毛|ahoge;红瞳|red eyes;礼帽|fedora;手套|gloves;分离袖|detached sleeves;连衣裙|dress;眼镜|glasses;高跟鞋|high heels"},{"names":["潘塔罗涅","潘塔罗涅（原神）"],"tag":"pantalone (genshin impact)","game":"原神","auto":"灰发|grey hair;短发|short hair;眼镜|glasses;眯眼|squinting;制服|uniform"},{"names":["归终","归终（原神）"],"tag":"guizhong (genshin impact)","game":"原神","auto":"灰发|grey hair;超长发|very long hair;灰瞳|grey eyes;小胸|small breasts;汉服|hanfu;露背|backless;分离袖|detached sleeves;长袖|long sleeves;短裤|shorts"},{"names":["真","真（原神）"],"tag":"makoto (genshin impact)","game":"原神","auto":"紫发|purple hair;紫瞳|purple eyes;和服|kimono;足袋|tabi"},{"names":["伊安珊","伊安珊（原神）"],"tag":"iansan (genshin impact)","game":"原神","auto":"白发|white hair;双马尾|twintails;绿瞳|green eyes;尖耳|pointy ears;方巾|bandana;耳环|earrings;短袜|ankle socks"},{"names":["留云借风真君","留云借风真君（原神）"],"tag":"cloud retainer (genshin impact)","game":"原神","auto":"黑发|black hair;蓝瞳|blue eyes;眼镜|glasses"},{"names":["芙卡洛斯","芙卡洛斯（原神）"],"tag":"focalors (genshin impact)","game":"原神","auto":"白发|white hair;多色发|multicolored hair;卷发|curly hair;呆毛|ahoge;蓝瞳|blue eyes;异色瞳|heterochromia;小胸|small breasts;礼帽|fedora;手套|gloves;短裤|shorts"},{"names":["法尔伽","法尔伽（原神）"],"tag":"varka (genshin impact)","game":"原神","auto":"金发|blonde hair;长发|long hair;蓝瞳|blue eyes;大衣|coat"},{"names":["黑塔","黑塔（崩坏：星穹铁道）"],"tag":"herta (honkai: star rail)","game":"崩坏：星穹铁道","auto":"棕发|brown hair;长发|long hair;紫瞳|purple eyes;人偶关节|doll joints;科学家|scientist;头花|hair flower;贝雷帽|beret;短靴|ankle boots;齐刘海|blunt bangs;小胸|small breasts"},{"names":["大黑塔","大黑塔（崩坏：星穹铁道）"],"tag":"the herta (honkai: star rail)","game":"崩坏：星穹铁道","auto":"棕发|brown hair;多色发|multicolored hair;紫瞳|purple eyes;帽子|hat;黑色连裤袜|black pantyhose;靴子|boots;高跟鞋|high heels;分离袖|detached sleeves;露背|backless"},{"names":["星期日","星期日（崩坏：星穹铁道）"],"tag":"sunday (honkai: star rail)","game":"崩坏：星穹铁道","auto":"浅蓝发|light blue hair;长发|long hair;光环|halo;翅膀|wings;手套|gloves;靴子|boots;戒指|ring;耳钉|ear piercing;兜帽|hood"},{"names":["阮·梅","阮·梅（崩坏：星穹铁道）"],"tag":"ruan mei (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑发|black hair;绿瞳|green eyes;科学家|scientist;项链|necklace;手套|gloves;高跟鞋|high heels;盘发|updo"},{"names":["真理医生","真理医生（崩坏：星穹铁道）"],"tag":"dr. ratio (honkai: star rail)","game":"崩坏：星穹铁道","auto":"蓝发|blue hair;红瞳|red eyes;凉鞋|sandals;手套|gloves;头花|hair flower;粉笔|chalk"},{"names":["阿格莱雅","阿格莱雅（崩坏：星穹铁道）"],"tag":"aglaea (honkai: star rail)","game":"崩坏：星穹铁道","auto":"金发|blonde hair;短发|short hair;连衣裙|dress;背带裙|pinafore;吊带裙|slip dress;蝴蝶结|bow;高跟鞋|high heels;凉鞋|sandals;头花|hair flower;巨乳|huge breasts"},{"names":["飞霄","飞霄（崩坏：星穹铁道）"],"tag":"feixiao (honkai: star rail)","game":"崩坏：星穹铁道","auto":"银发|silver hair;多色发|multicolored hair;长发|long hair;高马尾|high ponytail;绿瞳|green eyes;狐耳|fox ears;风衣|trench coat;靴子|boots;手套|gloves;项链|necklace"},{"names":["波提欧","波提欧（崩坏：星穹铁道）"],"tag":"boothill (honkai: star rail)","game":"崩坏：星穹铁道","auto":"银发|silver hair;长发|long hair;红瞳|red eyes;遮单眼发|hair over one eye;手枪|pistol"},{"names":["迷迷","迷迷（崩坏：星穹铁道）"],"tag":"mem (honkai: star rail)","game":"崩坏：星穹铁道","auto":"粉发|pink hair;蓝瞳|blue eyes;翅膀|wings;尾巴|tail"},{"names":["云璃","云璃（崩坏：星穹铁道）"],"tag":"yunli (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑发|black hair;双马尾|twintails;小胸|small breasts;发饰|hair ornament;脚链|anklet"},{"names":["缇宝","缇宝（崩坏：星穹铁道）"],"tag":"tribbie (honkai: star rail)","game":"崩坏：星穹铁道","auto":"红发|red hair;短发|short hair;麻花辫|braid;紫瞳|purple eyes;尖耳|pointy ears;翅膀|wings;小胸|small breasts;臂环|armlet;裸肩|bare shoulders;头花|hair flower"},{"names":["萨姆","萨姆（崩坏：星穹铁道）"],"tag":"sam (honkai: star rail)","game":"崩坏：星穹铁道","auto":"骑士|knight"},{"names":["瑶光","瑶光（崩坏：星穹铁道）"],"tag":"yao guang (honkai: star rail)","game":"崩坏：星穹铁道","auto":"金发|blonde hair;长发|long hair;蓝瞳|blue eyes;连衣裙|dress"},{"names":["灵砂","灵砂（崩坏：星穹铁道）"],"tag":"lingsha (honkai: star rail)","game":"崩坏：星穹铁道","auto":"棕发|brown hair;长发|long hair;呆毛|ahoge;红瞳|red eyes;尖耳|pointy ears;高跟鞋|high heels;齐刘海|blunt bangs;发簪|hairpin"},{"names":["翡翠","翡翠（崩坏：星穹铁道）"],"tag":"jade (honkai: star rail)","game":"崩坏：星穹铁道","auto":"紫发|purple hair;长发|long hair;蓝瞳|blue eyes;礼帽|fedora;巨乳|huge breasts;手套|gloves;项链|necklace;高跟鞋|high heels;竖瞳|slit pupils;露背|backless"},{"names":["青雀","青雀（崩坏：星穹铁道）"],"tag":"qingque (honkai: star rail)","game":"崩坏：星穹铁道","auto":"棕发|brown hair;双马尾|twintails;麻花辫|braid;绿瞳|green eyes;汉服|hanfu;发饰|hair ornament;小胸|small breasts;短袜|ankle socks;短靴|ankle boots;吊眼|tsurime"},{"names":["椒丘","椒丘（崩坏：星穹铁道）"],"tag":"jiaoqiu (honkai: star rail)","game":"崩坏：星穹铁道","auto":"粉发|pink hair;长发|long hair;麻花辫|braid;狐耳|fox ears;尾巴|tail;厨师|chef;眯眼|squinting;竖瞳|slit pupils;靴子|boots;手套|gloves"},{"names":["乱破","乱破（崩坏：星穹铁道）"],"tag":"rappa (honkai: star rail)","game":"崩坏：星穹铁道","auto":"粉发|pink hair;马尾|ponytail;绿瞳|green eyes;巨乳|huge breasts;忍者|ninja;露指手套|fingerless gloves;夹克|jacket;遮阳帽|sun hat;滑板|skateboarding"},{"names":["忘归人","忘归人（崩坏：星穹铁道）"],"tag":"fugue (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑发|black hair;多色发|multicolored hair;绿瞳|green eyes;汉服|hanfu;高跟鞋|high heels;扇子|fan;裸肩|bare shoulders"},{"names":["账账","账账（崩坏：星穹铁道）"],"tag":"numby (honkai: star rail)","game":"崩坏：星穹铁道","auto":"兽耳|animal ears;尾巴|tail;发饰|hair ornament"},{"names":["彦卿","彦卿（崩坏：星穹铁道）"],"tag":"yanqing (honkai: star rail)","game":"崩坏：星穹铁道","auto":"金发|blonde hair;短发|short hair;马尾|ponytail;呆毛|ahoge;黄瞳|yellow eyes;汉服|hanfu;短靴|ankle boots;士兵|soldier"},{"names":["缇安","缇安（崩坏：星穹铁道）"],"tag":"trianne (honkai: star rail)","game":"崩坏：星穹铁道","auto":"红发|red hair;紫瞳|purple eyes;遮单眼发|hair over one eye"},{"names":["缇宁","缇宁（崩坏：星穹铁道）"],"tag":"trinnon (honkai: star rail)","game":"崩坏：星穹铁道","auto":"红发|red hair;紫瞳|purple eyes"},{"names":["艾丝妲","艾丝妲（崩坏：星穹铁道）"],"tag":"asta (honkai: star rail)","game":"崩坏：星穹铁道","auto":"粉发|pink hair;短发|short hair;马尾|ponytail;麻花辫|braid;蓝瞳|blue eyes;发夹|hair clip;鬓发|sidelocks;科学家|scientist;高跟鞋|high heels"},{"names":["素裳","素裳（崩坏：星穹铁道）"],"tag":"sushang (honkai: star rail)","game":"崩坏：星穹铁道","auto":"棕发|brown hair;双马尾|twintails;靴子|boots"},{"names":["银枝","银枝（崩坏：星穹铁道）"],"tag":"argenti (honkai: star rail)","game":"崩坏：星穹铁道","auto":"红发|red hair;长发|long hair;呆毛|ahoge;绿瞳|green eyes;骑士|knight;盔甲|armor;长枪|spear"},{"names":["桂乃芬","桂乃芬（崩坏：星穹铁道）"],"tag":"guinaifen (honkai: star rail)","game":"崩坏：星穹铁道","auto":"橙发|orange hair;马尾|ponytail;吊眼|tsurime;头花|hair flower;黑色连裤袜|black pantyhose;分离袖|detached sleeves;手套|gloves;短靴|ankle boots;鬓发|sidelocks"},{"names":["加拉赫","加拉赫（崩坏：星穹铁道）"],"tag":"gallagher (honkai: star rail)","game":"崩坏：星穹铁道","auto":"棕发|brown hair;红瞳|red eyes;手套|gloves;胡须|beard;领带|necktie;露指手套|fingerless gloves"},{"names":["貊泽","貊泽（崩坏：星穹铁道）"],"tag":"moze (honkai: star rail)","game":"崩坏：星穹铁道","auto":"银发|silver hair;紫瞳|purple eyes;兜帽|hood;披风|cape;短靴|ankle boots;匕首|dagger;刘海|bangs;伤疤|scar"},{"names":["应星","应星（崩坏：星穹铁道）"],"tag":"yingxing (honkai: star rail)","game":"崩坏：星穹铁道","auto":"白发|white hair;蓝瞳|blue eyes"},{"names":["驭空","驭空（崩坏：星穹铁道）"],"tag":"yukong (honkai: star rail)","game":"崩坏：星穹铁道","auto":"青绿发|teal hair;紫瞳|purple eyes;兽耳|animal ears;狐娘|fox girl;刘海|bangs;长弓|longbow;分离袖|detached sleeves;裸肩|bare shoulders;高跟鞋|high heels;竖瞳|slit pupils"},{"names":["寒鸦","寒鸦（崩坏：星穹铁道）"],"tag":"hanya (honkai: star rail)","game":"崩坏：星穹铁道","auto":"白发|white hair;长发|long hair;灰瞳|grey eyes;巨乳|huge breasts;分离袖|detached sleeves;发饰|hair ornament"},{"names":["米沙","米沙（崩坏：星穹铁道）"],"tag":"misha (honkai: star rail)","game":"崩坏：星穹铁道","auto":"蓝发|blue hair;卷发|curly hair;低马尾|low ponytail;紫瞳|purple eyes;遮单眼发|hair over one eye;手套|gloves;短裤|shorts;短袜|ankle socks;短靴|ankle boots;天使|angel"},{"names":["雪衣","雪衣（崩坏：星穹铁道）"],"tag":"xueyi (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑发|black hair;短发|short hair;红瞳|red eyes;机械部件|mechanical parts;连裤袜|pantyhose;锁链|chain"},{"names":["螺丝咕姆","螺丝咕姆（崩坏：星穹铁道）"],"tag":"screwllum (honkai: star rail)","game":"崩坏：星穹铁道","auto":"蓝瞳|blue eyes;机械部件|mechanical parts;礼帽|fedora;手套|gloves"},{"names":["钟表小子","钟表小子（崩坏：星穹铁道）"],"tag":"clockie (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑瞳|black eyes;领结|bowtie"},{"names":["丹枫","丹枫（崩坏：星穹铁道）"],"tag":"dan feng (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑发|black hair;长发|long hair;尖耳|pointy ears"},{"names":["卡卡瓦夏","卡卡瓦夏（崩坏：星穹铁道）"],"tag":"kakavasha (honkai: star rail)","game":"崩坏：星穹铁道","auto":"金发|blonde hair;紫瞳|purple eyes;吊眼|tsurime;手套|gloves;手表|watch;礼帽|fedora;墨镜|sunglasses"},{"names":["尾巴","尾巴（崩坏：星穹铁道）"],"tag":"tail (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑瞳|black eyes;狐耳|fox ears;吊眼|tsurime"},{"names":["白厄","白厄（崩坏：星穹铁道）"],"tag":"phainon (honkai: star rail)","game":"崩坏：星穹铁道","auto":"银发|silver hair;呆毛|ahoge;蓝瞳|blue eyes;露指手套|fingerless gloves;鬓发|sidelocks;刘海|bangs;披风|cape;靴子|boots"},{"names":["昔涟","昔涟（崩坏：星穹铁道）"],"tag":"cyrene (honkai: star rail)","game":"崩坏：星穹铁道","auto":"粉发|pink hair;短发|short hair;蓝瞳|blue eyes;背带裙|pinafore;吊带裙|slip dress;凉鞋|sandals"},{"names":["万敌","万敌（崩坏：星穹铁道）"],"tag":"mydei (honkai: star rail)","game":"崩坏：星穹铁道","auto":"金发|blonde hair;多色发|multicolored hair;长发|long hair;麻花辫|braid;呆毛|ahoge;臂环|armlet;盔甲|armor;项链|necklace"},{"names":["娜塔莎","娜塔莎（崩坏：星穹铁道）"],"tag":"natasha (honkai: star rail)","game":"崩坏：星穹铁道","auto":"青绿发|teal hair;长发|long hair;马尾|ponytail;粉瞳|pink eyes;手套|gloves;巨乳|huge breasts;刘海|bangs"},{"names":["史瓦罗","史瓦罗（崩坏：星穹铁道）"],"tag":"svarog (honkai: star rail)","game":"崩坏：星穹铁道","auto":"红瞳|red eyes;机器人|robot"},{"names":["卢卡","卢卡（崩坏：星穹铁道）"],"tag":"luka (honkai: star rail)","game":"崩坏：星穹铁道","auto":"红发|red hair;呆毛|ahoge;蓝瞳|blue eyes;项链|necklace;臂章|armband;腰带|belt"},{"names":["阿兰","阿兰（崩坏：星穹铁道）"],"tag":"arlan (honkai: star rail)","game":"崩坏：星穹铁道","auto":"白发|white hair;紫瞳|purple eyes;伤疤|scar;遮单眼发|hair over one eye;绷带|bandage;创可贴|bandaid"},{"names":["白珩","白珩（崩坏：星穹铁道）"],"tag":"baiheng (honkai: star rail)","game":"崩坏：星穹铁道","auto":"紫发|purple hair;蓝瞳|blue eyes;兽耳|animal ears;飞行|flying;狐娘|fox girl;长弓|longbow"},{"names":["药师","药师（崩坏：星穹铁道）"],"tag":"yaoshi (honkai: star rail)","game":"崩坏：星穹铁道","auto":"金发|blonde hair"},{"names":["纳努克","纳努克（崩坏：星穹铁道）"],"tag":"nanook (honkai: star rail)","game":"崩坏：星穹铁道","auto":"白发|white hair;麻花辫|braid"},{"names":["阿哈","阿哈（崩坏：星穹铁道）"],"tag":"aha (honkai: star rail)","game":"崩坏：星穹铁道","auto":"口罩|mask;小丑服|jester;黑发|black hair"},{"names":["谛听","谛听（崩坏：星穹铁道）"],"tag":"diting (honkai: star rail)","game":"崩坏：星穹铁道","auto":"吐舌|tongue out"},{"names":["呼雷","呼雷（崩坏：星穹铁道）"],"tag":"hoolay (honkai: star rail)","game":"崩坏：星穹铁道","auto":"白发|white hair"},{"names":["芮克先生","芮克先生（崩坏：星穹铁道）"],"tag":"mr. reca (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑发|black hair;红瞳|red eyes;手套|gloves"},{"names":["呜呜伯","呜呜伯（崩坏：星穹铁道）"],"tag":"wubbaboo (honkai: star rail)","game":"崩坏：星穹铁道","auto":"蓝瞳|blue eyes"},{"names":["骄傲的垃圾桶","骄傲的垃圾桶（崩坏：星穹铁道）"],"tag":"lordly trashcan (honkai: star rail)","game":"崩坏：星穹铁道","auto":"帽子|hat;金属|metal;手套|gloves"},{"names":["佩佩","佩佩（崩坏：星穹铁道）"],"tag":"peppy (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑瞳|black eyes"},{"names":["斯科特","斯科特（崩坏：星穹铁道）"],"tag":"skott (honkai: star rail)","game":"崩坏：星穹铁道","auto":"棕发|brown hair;黑瞳|black eyes;墨镜|sunglasses"},{"names":["莱古斯","莱古斯（崩坏：星穹铁道）"],"tag":"lygus (honkai: star rail)","game":"崩坏：星穹铁道","auto":"白发|white hair;短发|short hair;紫瞳|purple eyes;机械部件|mechanical parts;眼罩|eyepatch;教师|teacher"},{"names":["阿奎拉","阿奎拉（崩坏：星穹铁道）"],"tag":"aquila (honkai: star rail)","game":"崩坏：星穹铁道","auto":"白发|white hair;翅膀|wings;光环|halo"},{"names":["星","星（崩坏：星穹铁道）"],"tag":"stelle (honkai: star rail)","game":"崩坏：星穹铁道","auto":"灰发|grey hair;长发|long hair;调皮|mischievous;风衣|trench coat;棒球棒|baseball bat;礼帽|fedora;手套|gloves;短靴|ankle boots;高跟鞋|high heels;大胸|large breasts"},{"names":["穹","穹（崩坏：星穹铁道）"],"tag":"caelus (honkai: star rail)","game":"崩坏：星穹铁道","auto":"灰发|grey hair;呆毛|ahoge;调皮|mischievous;风衣|trench coat;棒球棒|baseball bat;礼帽|fedora;露指手套|fingerless gloves;长裤|pants;运动鞋|sneakers"},{"names":["开拓者","开拓者（崩坏：星穹铁道）"],"tag":"trailblazer (honkai: star rail)","game":"崩坏：星穹铁道","auto":"灰发|grey hair;调皮|mischievous;风衣|trench coat;棒球棒|baseball bat;礼帽|fedora"},{"names":["风堇","风堇（崩坏：星穹铁道）"],"tag":"hyacine (honkai: star rail)","game":"崩坏：星穹铁道","auto":"粉发|pink hair;多色发|multicolored hair;发髻|hair bun;绿瞳|green eyes;小胸|small breasts;教师|teacher;贝雷帽|beret;连裤袜|pantyhose;蝴蝶结|bow;乐福鞋|loafers"},{"names":["赛飞儿","赛飞儿（崩坏：星穹铁道）"],"tag":"cipher (honkai: star rail)","game":"崩坏：星穹铁道","auto":"银发|silver hair;麻花辫|braid;蓝瞳|blue eyes;猫耳|cat ears;猫尾|cat tail;猫娘|catgirl;吊眼|tsurime;露背|backless;兜帽|hood;巨乳|huge breasts"},{"names":["遐蝶","遐蝶（崩坏：星穹铁道）"],"tag":"castorice (honkai: star rail)","game":"崩坏：星穹铁道","auto":"紫发|purple hair;双马尾|twintails;紫瞳|purple eyes;尖耳|pointy ears;头花|hair flower;靴子|boots;手套|gloves;蝴蝶结|bow;高跟鞋|high heels;露背|backless"},{"names":["长夜月","长夜月（崩坏：星穹铁道）"],"tag":"evernight (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑发|black hair;长发|long hair;红瞳|red eyes;连衣裙|dress"},{"names":["海瑟音","海瑟音（崩坏：星穹铁道）"],"tag":"hysilens (honkai: star rail)","game":"崩坏：星穹铁道","auto":"紫发|purple hair;长发|long hair;紫瞳|purple eyes;吊眼|tsurime;齐刘海|blunt bangs;发夹|hair clip;过膝袜|thighhighs;骑士|knight;手套|gloves"},{"names":["那刻夏","那刻夏（崩坏：星穹铁道）"],"tag":"anaxa (honkai: star rail)","game":"崩坏：星穹铁道","auto":"绿发|green hair;低马尾|low ponytail;红瞳|red eyes;手套|gloves;眼罩|eyepatch;刘海|bangs;披肩|shawl;分离袖|detached sleeves;教师|teacher;科学家|scientist"},{"names":["三月七（巡猎）","三月七（巡猎）（崩坏：星穹铁道）"],"tag":"march 7th (hunt) (honkai: star rail)","game":"崩坏：星穹铁道","auto":"粉发|pink hair;粉瞳|pink eyes;相机|camera;发夹|hair clip;汉服|hanfu;过膝袜|thighhighs;高跟鞋|high heels"},{"names":["丹恒·饮月","丹恒·饮月（崩坏：星穹铁道）"],"tag":"dan heng (imbibitor lunae) (honkai: star rail)","game":"崩坏：星穹铁道","auto":"黑发|black hair;多色发|multicolored hair;长发|long hair;尖耳|pointy ears;分离袖|detached sleeves;手套|gloves;靴子|boots"},{"names":["黑塔（人偶）","黑塔（人偶）（崩坏：星穹铁道）"],"tag":"herta (puppet) (honkai: star rail)","game":"崩坏：星穹铁道","auto":"棕发|brown hair;长发|long hair;紫瞳|purple eyes;人偶|doll;科学家|scientist;头花|hair flower;贝雷帽|beret;短靴|ankle boots;齐刘海|blunt bangs;小胸|small breasts"},{"names":["银狼（LV.999）","银狼（LV.999）（崩坏：星穹铁道）"],"tag":"silver wolf (lv.999) (honkai: star rail)","game":"崩坏：星穹铁道","auto":"银发|silver hair;短发|short hair;紫瞳|purple eyes;鸭舌帽|cap;夹克|jacket"},{"names":["姬子（少女）","姬子（少女）（崩坏：星穹铁道）"],"tag":"himeko (young) (honkai: star rail)","game":"崩坏：星穹铁道","auto":"红发|red hair;长发|long hair;科学家|scientist;手套|gloves;巨乳|huge breasts;长腿|long legs;高跟鞋|high heels"},{"names":["椿","椿（鸣潮）"],"tag":"camellya (wuthering waves)","game":"鸣潮","auto":"白发|white hair;双马尾|twintails;发髻|hair bun;灰瞳|grey eyes;头花|hair flower;连衣裙|dress;戒指|ring;耳环|earrings"},{"names":["珂莱塔","珂莱塔（鸣潮）"],"tag":"carlotta (wuthering waves)","game":"鸣潮","auto":"白发|white hair;呆毛|ahoge;蓝瞳|blue eyes;发箍|hairband;蝴蝶结|bow;分离袖|detached sleeves;手套|gloves;连衣裙|dress;过膝袜|thighhighs;披肩|shawl"},{"names":["菲比","菲比（鸣潮）"],"tag":"phoebe (wuthering waves)","game":"鸣潮","auto":"长发|long hair;紫瞳|purple eyes;遮阳帽|sun hat;齐刘海|blunt bangs;发饰|hair ornament;修女|nun;长袖|long sleeves;连裤袜|pantyhose"},{"names":["赞妮","赞妮（鸣潮）"],"tag":"zani (wuthering waves)","game":"鸣潮","auto":"白发|white hair;长发|long hair;红瞳|red eyes;尾巴|tail;刘海|bangs;领带|necktie;手套|gloves;腰带|belt;腰包|pouch;长裤|pants"},{"names":["卡提希娅","卡提希娅（鸣潮）"],"tag":"cartethyia (wuthering waves)","game":"鸣潮","auto":"金发|blonde hair;长发|long hair;麻花辫|braid;蓝瞳|blue eyes;光环|halo;尖耳|pointy ears;项链|necklace;刘海|bangs;露背|backless;高跟鞋|high heels"},{"names":["尤诺","尤诺（鸣潮）"],"tag":"iuno (wuthering waves)","game":"鸣潮","auto":"金发|blonde hair;长发|long hair;蓝瞳|blue eyes;连衣裙|dress"},{"names":["弗洛洛","弗洛洛（鸣潮）"],"tag":"phrolova (wuthering waves)","game":"鸣潮","auto":"绿发|green hair;短发|short hair;麻花辫|braid;红瞳|red eyes;花朵|flower;遮单眼发|hair over one eye;绷带|bandage;耳环|earrings;裸肩|bare shoulders;丝带|ribbon"},{"names":["坎特蕾拉","坎特蕾拉（鸣潮）"],"tag":"cantarella (wuthering waves)","game":"鸣潮","auto":"紫发|purple hair;卷发|curly hair;蓝瞳|blue eyes;发箍|hairband;头花|hair flower;吊眼|tsurime;巨乳|huge breasts;抹胸|tube top;分离袖|detached sleeves;戒指|ring"},{"names":["露帕","露帕（鸣潮）"],"tag":"lupa (wuthering waves)","game":"鸣潮","auto":"红发|red hair;双马尾|twintails;绿瞳|green eyes;发箍|hairband;无袖|sleeveless;披风|cape;过膝靴|thigh boots;高跟鞋|high heels;枪|gun;长枪|spear"},{"names":["奥古斯塔","奥古斯塔（鸣潮）"],"tag":"augusta (wuthering waves)","game":"鸣潮","auto":"白发|white hair;长发|long hair;金瞳|golden eyes;盔甲|armor;披风|cape"},{"names":["布兰特","布兰特（鸣潮）"],"tag":"brant (wuthering waves)","game":"鸣潮","auto":"蓝发|blue hair;粉瞳|pink eyes;发饰|hair ornament;海盗|pirate;耳钉|ear piercing;口罩|mask;腰带|belt"},{"names":["阿布","阿布（鸣潮）"],"tag":"abby (wuthering waves)","game":"鸣潮","auto":"白发|white hair;短发|short hair;蓝瞳|blue eyes;夹克|jacket"},{"names":["洛可可","洛可可（鸣潮）"],"tag":"roccia (wuthering waves)","game":"鸣潮","auto":"蓝发|blue hair;双马尾|twintails;黄瞳|yellow eyes;小胸|small breasts;异色瞳|heterochromia;蝴蝶结|bow;发珠|hair beads;戒指|ring;短靴|ankle boots"},{"names":["伤痕","伤痕（鸣潮）"],"tag":"scar (wuthering waves)","game":"鸣潮","auto":"黑发|black hair;长发|long hair;红瞳|red eyes;大衣|coat;口罩|mask"},{"names":["卢克·赫尔森","卢克·赫尔森（鸣潮）"],"tag":"luuk herssen (wuthering waves)","game":"鸣潮","auto":"棕发|brown hair;短发|short hair;灰瞳|grey eyes;大衣|coat"},{"names":["渊武","渊武（鸣潮）"],"tag":"yuanwu (wuthering waves)","game":"鸣潮","auto":"蓝发|blue hair;蓝瞳|blue eyes;眼镜|glasses;遮阳帽|sun hat;手套|gloves;胡须|beard"},{"names":["釉瑚","釉瑚（鸣潮）"],"tag":"youhu (wuthering waves)","game":"鸣潮","auto":"蓝发|blue hair;发髻|hair bun;呆毛|ahoge;蓝瞳|blue eyes;刘海|bangs;头花|hair flower;发夹|hair clip;手套|gloves;短裤|shorts;短靴|ankle boots"},{"names":["灯灯","灯灯（鸣潮）"],"tag":"lumi (wuthering waves)","game":"鸣潮","auto":"棕发|brown hair;发髻|hair bun;麻花辫|braid;粉瞳|pink eyes;发带|hair ribbon;露指手套|fingerless gloves;过膝袜|thighhighs"},{"names":["卜灵","卜灵（鸣潮）"],"tag":"buling (wuthering waves)","game":"鸣潮","auto":"黑发|black hair;长发|long hair;紫瞳|purple eyes;中式服装|chinese clothes"},{"names":["秋水","秋水（鸣潮）"],"tag":"aalto (wuthering waves)","game":"鸣潮","auto":"银发|silver hair;马尾|ponytail;黄瞳|yellow eyes;刘海|bangs;露指手套|fingerless gloves;腰带|belt;护膝|knee pads;靴子|boots"},{"names":["哥舒临","哥舒临（鸣潮）"],"tag":"geshu lin (wuthering waves)","game":"鸣潮","auto":"黑发|black hair;长发|long hair;红瞳|red eyes;盔甲|armor"},{"names":["克里斯托弗","克里斯托弗（鸣潮）"],"tag":"cristoforo (wuthering waves)","game":"鸣潮","auto":"金发|blonde hair;短发|short hair;蓝瞳|blue eyes;大衣|coat"},{"names":["无冠者","无冠者（鸣潮）"],"tag":"crownless (wuthering waves)","game":"鸣潮","auto":"白发|white hair;长发|long hair;金瞳|golden eyes;盔甲|armor;口罩|mask"},{"names":["无梦者","无梦者（鸣潮）"],"tag":"dreamless (wuthering waves)","game":"鸣潮","auto":"黑发|black hair;长发|long hair;紫瞳|purple eyes;连衣裙|dress"},{"names":["角","角（鸣潮）"],"tag":"jue (wuthering waves)","game":"鸣潮","auto":"犄角|horns;盔甲|armor;口罩|mask"},{"names":["赫卡忒","赫卡忒（鸣潮）"],"tag":"hecate (wuthering waves)","game":"鸣潮","auto":"白发|white hair;超长发|very long hair;红瞳|red eyes;连衣裙|dress"},{"names":["利维坦","利维坦（鸣潮）"],"tag":"leviathan (wuthering waves)","game":"鸣潮","auto":"蓝发|blue hair;长发|long hair;蓝瞳|blue eyes;大衣|coat"},{"names":["迷迭香","迷迭香（鸣潮）"],"tag":"rosemary (wuthering waves)","game":"鸣潮","auto":"白发|white hair;长发|long hair;绿瞳|green eyes;连衣裙|dress"},{"names":["玛格丽特","玛格丽特（鸣潮）"],"tag":"margherita (wuthering waves)","game":"鸣潮","auto":"金发|blonde hair;长发|long hair;蓝瞳|blue eyes;帽子|hat"},{"names":["米娅","米娅（鸣潮）"],"tag":"mya (wuthering waves)","game":"鸣潮","auto":"粉发|pink hair;双马尾|twintails;蓝瞳|blue eyes;连衣裙|dress"},{"names":["芙洛拉夫人","芙洛拉夫人（鸣潮）"],"tag":"lady flora (wuthering waves)","game":"鸣潮","auto":"白发|white hair;长发|long hair;红瞳|red eyes;连衣裙|dress"},{"names":["千咲","千咲（鸣潮）"],"tag":"chisa (wuthering waves)","game":"鸣潮","auto":"黑发|black hair;长发|long hair;紫瞳|purple eyes;和服|kimono"},{"names":["帕姆","帕姆（崩坏：星穹铁道）"],"tag":"pom-pom (honkai: star rail)","game":"崩坏：星穹铁道","auto":"灰发|grey hair;蓝瞳|blue eyes;尾巴|tail;厨师|chef"},{"names":["埃拉托","埃拉托（明日方舟）"],"tag":"erato (arknights)","game":"明日方舟","auto":"粉发|pink hair;超长发|very long hair;绿瞳|green eyes;手套|gloves;靴子|boots;无袖|sleeveless;高跟鞋|high heels"},{"names":["四月","四月（明日方舟）"],"tag":"april (arknights)","game":"明日方舟","auto":"黑发|black hair;紫瞳|purple eyes;短袜|ankle socks;运动鞋|sneakers;披风|cape"}];

export const PRESETS = [{"name":"全身立绘","desc":"纯背景 + 正面全身，适合做角色卡","tags":["1girl","solo","full body","from front","standing","simple background","white background","looking at viewer","official art","best quality"]},{"name":"半身特写","desc":"胸部以上，突出表情与眼神","tags":["1girl","portrait","upper body","close-up","looking at viewer","depth of field","detailed face","soft lighting"]},{"name":"夏日瘫软","desc":"电扇前的暑气溃败","tags":["1girl","solo","sitting on floor","slumped","leaning back","legs spread","arms limp","closed eyes","open mouth","blush","sweat","exhausted","electric fan","summer","hair blown by fan","sitting in front of electric fan"]},{"name":"雨中天台","desc":"湿发与积水反光","tags":["1girl","rain","rainy day","rooftop","wet hair","wet clothes","looking up","overcast","cinematic lighting","reflection","city","depth of field"]},{"name":"樱花树下","desc":"春日花瓣与柔光","tags":["1girl","cherry blossoms","spring","tree","petals","wind","hair blown by wind","sunlight","soft lighting","kimono","smile"]},{"name":"赛博夜街","desc":"霓虹雨夜的都市感","tags":["1girl","night","city","neon lights","rain","wet street","cyberpunk","glowing","backlighting","reflection","techwear","hoodie"]},{"name":"教室午后","desc":"斜阳与课桌","tags":["1girl","classroom","afternoon","sunlight","window","desk","school uniform","sitting","reading","lens flare","warm lighting"]},{"name":"神社参拜","desc":"石阶、鸟居与巫女","tags":["1girl","shrine","torii","stone stairs","miko","japanese clothes","autumn","maple leaves","lantern","traditional","dappled sunlight"]},{"name":"冬日围巾","desc":"雪地呼出的白气","tags":["1girl","winter","snow","snowing","scarf","coat","gloves","breath","blush","cold","white breath","pale skin"]},{"name":"海边黄昏","desc":"逆光剪影与浪花","tags":["1girl","beach","ocean","sunset","golden hour","backlighting","wind","dress","barefoot","waves","cinematic"]},{"name":"魔法少女","desc":"变身特效与魔法阵","tags":["1girl","magical girl","magic circle","glowing","sparkle","frilled dress","ribbon","wand","floating","starry sky","dynamic pose","energy"]},{"name":"战斗姿态","desc":"刀光与速度线","tags":["1girl","fighting stance","sword","holding sword","dynamic pose","motion blur","speed lines","action","serious","armor","sparks"]},{"name":"图书馆阅读","desc":"暖灯与成堆的书","tags":["1girl","library","bookshelf","book","reading","glasses","sitting","warm lighting","indoors","quiet","depth of field"]},{"name":"咖啡店打工","desc":"围裙与服务生","tags":["1girl","cafe","apron","waiter","holding tray","smile","indoors","warm lighting","counter","coffee"]},{"name":"黑白线稿","desc":"单色线画，适合上色底稿","tags":["1girl","monochrome","lineart","greyscale","sketch","white background","simple background","clean lines"]},{"name":"复古胶片","desc":"颗粒、漏光、褪色","tags":["1girl","film grain","vintage","light leak","faded colors","analog","35mm film","soft focus","nostalgic"]},{"name":"星空露营","desc":"银河与篝火","tags":["1girl","night","starry sky","milky way","campfire","tent","camping","bonfire","mountains","glowing","wide shot"]},{"name":"废墟探索","desc":"断壁与藤蔓","tags":["1girl","ruins","broken building","vines","overgrown","dust","god rays","exploring","backpack","muted colors"]},{"name":"偶像舞台","desc":"聚光灯与荧光棒","tags":["1girl","stage","spotlight","idol","microphone","singing","glowing","confetti","dynamic pose","crowd"]},{"name":"睡衣清晨","desc":"刚醒来的松弛感","tags":["1girl","bedroom","morning","pajamas","messy hair","bed","yawning","sleepy","sunlight","soft lighting","sitting on bed"]},{"name":"雨天窗边","desc":"玻璃上的水痕","tags":["1girl","rain","window","raindrops on glass","indoors","sitting","chin on hand","looking outside","moody","cool colors"]},{"name":"龙与少女","desc":"奇幻巨兽与小小身影","tags":["1girl","dragon","fantasy","epic","scale","horns","floating island","clouds","wide shot","cinematic lighting"]},{"name":"水墨和风","desc":"留白、墨迹、和纸质感","tags":["1girl","ink wash painting","sumi-e","japanese style","negative space","paper texture","monochrome","elegant","kimono"]},{"name":"像素游戏","desc":"16bit 复古游戏画面","tags":["1girl","pixel art","16-bit","retro game","dithering","limited palette","side view","game ui"]},{"name":"机甲少女","desc":"机械外骨骼与冷光","tags":["1girl","mecha","mecha musume","robot","armor","glowing","hangar","science fiction","metal","blue lighting"]},{"name":"花海仰望","desc":"躺着看天，前景虚化","tags":["1girl","flower field","lying","looking up","blue sky","clouds","from above","shallow depth of field","peaceful","petals"]}];

export const ARTISTS = [{"en":"wlop","zh":"WLOP"},{"en":"greg rutkowski","zh":"格雷格·鲁特科夫斯基"},{"en":"artgerm","zh":"Artgerm"},{"en":"makoto shinkai","zh":"新海诚"},{"en":"studio ghibli","zh":"吉卜力工作室"},{"en":"kyoto animation","zh":"京都动画"},{"en":"kantoku","zh":"监督"},{"en":"huke","zh":"huke"},{"en":"redjuice","zh":"redjuice"},{"en":"ask (artist)","zh":"ask"},{"en":"wada arco","zh":"和田あこ"},{"en":"pako","zh":"pako"},{"en":"lack","zh":"lack"},{"en":"noodle","zh":"noodle"},{"en":"ciloranko","zh":"ciloranko"},{"en":"modare","zh":"modare"},{"en":"shirow miwa","zh":"三轮士郎"},{"en":"yoshitaka amano","zh":"天野喜孝"},{"en":"alphonse mucha","zh":"慕夏"},{"en":"akihiko yoshida","zh":"吉田明彦"},{"en":"katsuhiro otomo","zh":"大友克洋"},{"en":"hayao miyazaki","zh":"宫崎骏"},{"en":"satoshi kon","zh":"今敏"},{"en":"mamoru hosoda","zh":"细田守"},{"en":"yoji shinkawa","zh":"新川洋司"},{"en":"ilya kuvshinov","zh":"伊利亚·库夫希诺夫"},{"en":"guweiz","zh":"顾卫"},{"en":"rossdraws","zh":"RossDraws"},{"en":"sakimichan","zh":"Sakimichan"},{"en":"krenz cushart","zh":"克伦兹·库沙特"},{"en":"yuumei","zh":"Yuumei"},{"en":"loish","zh":"Loish"},{"en":"james jean","zh":"詹姆斯·简"},{"en":"kim jung gi","zh":"金政基"},{"en":"frank frazetta","zh":"弗兰克·法拉捷特"},{"en":"boris vallejo","zh":"鲍里斯·瓦列霍"},{"en":"moebius","zh":"墨比斯"},{"en":"josan gonzalez","zh":"何塞·冈萨雷斯"},{"en":"tite kubo","zh":"久保带人"},{"en":"masashi kishimoto","zh":"岸本齐史"},{"en":"eiichiro oda","zh":"尾田荣一郎"},{"en":"akira toriyama","zh":"鸟山明"},{"en":"rumiko takahashi","zh":"高桥留美子"},{"en":"clamp","zh":"CLAMP"},{"en":"takeshi obata","zh":"小畑健"},{"en":"yusuke murata","zh":"村田雄介"},{"en":"kentaro miura","zh":"三浦建太郎"},{"en":"inio asano","zh":"浅野一二〇"},{"en":"taiyo matsumoto","zh":"松本大洋"},{"en":"naoki urasawa","zh":"浦泽直树"},{"en":"jiro taniguchi","zh":"谷口次郎"},{"en":"hirohiko araki","zh":"荒木飞吕彦"},{"en":"tetsuya nomura","zh":"野村哲也"},{"en":"yoh yoshinari","zh":"吉成曜"},{"en":"kiyotaka oshiyama","zh":"押山清高"},{"en":"yoshitoshi abe","zh":"阿部吉俊"},{"en":"kojima ayami","zh":"小岛文美"},{"en":"shunya yamashita","zh":"山下俊也"},{"en":"neco","zh":"neco"},{"en":"lpip","zh":"Lpip"},{"en":"mika pikazo","zh":"Mika Pikazo"},{"en":"fuzichoco","zh":"藤ちょこ"},{"en":"saitom","zh":"saitom"},{"en":"shigure ui","zh":"时雨羽衣"},{"en":"rurudo","zh":"rurudo"},{"en":"anmi","zh":"anmi"},{"en":"hisasi","zh":"hisasi"},{"en":"kurehito misaki","zh":"三咲久玲人"},{"en":"tony taka","zh":"Tony Taka"},{"en":"urushihara satoshi","zh":"漆原智志"},{"en":"ken sugimori","zh":"杉森建"},{"en":"hiro mashima","zh":"真岛浩"},{"en":"yasuhiro nightow","zh":"内藤泰弘"},{"en":"yoshikazu yasuhiko","zh":"安彦良和"},{"en":"leiji matsumoto","zh":"松本零士"},{"en":"go nagai","zh":"永井豪"},{"en":"osamu tezuka","zh":"手冢治虫"},{"en":"shotaro ishinomori","zh":"石森章太郎"},{"en":"fujiko fujio","zh":"藤子不二雄"},{"en":"tsukasa hojo","zh":"北条司"},{"en":"takehiko inoue","zh":"井上雄彦"},{"en":"q hayashida","zh":"林田球"},{"en":"kousuke fujishima","zh":"藤岛康介"},{"en":"kiyohiko azuma","zh":"东清彦"},{"en":"keiichi arawi","zh":"阿良々木圭一"},{"en":"hiroshi nagai","zh":"永井博"},{"en":"yoshitomo nara","zh":"奈良美智"},{"en":"takashi murakami","zh":"村上隆"},{"en":"hokusai","zh":"葛饰北斋"},{"en":"atey ghailan","zh":"Atey Ghailan"},{"en":"sam yang","zh":"Sam Yang"},{"en":"jeremy lipking","zh":"杰里米·利普金"},{"en":"anders zorn","zh":"安德斯·佐恩"},{"en":"john singer sargent","zh":"萨金特"},{"en":"claude monet","zh":"莫奈"},{"en":"vincent van gogh","zh":"梵高"},{"en":"gustav klimt","zh":"克里姆特"},{"en":"egon schiele","zh":"席勒"},{"en":"rembrandt","zh":"伦勃朗"},{"en":"caravaggio","zh":"卡拉瓦乔"},{"en":"norman rockwell","zh":"诺曼·洛克威尔"},{"en":"tim burton","zh":"蒂姆·伯顿"},{"en":"mike mignola","zh":"迈克·米格诺拉"},{"en":"jamie hewlett","zh":"杰米·休莱特"},{"en":"rebecca sugar","zh":"丽贝卡·舒格"},{"en":"craig mccracken","zh":"克雷格·麦克拉肯"}];

export const NEGATIVES = [{"en":"lowres","zh":"低分辨率"},{"en":"bad anatomy","zh":"解剖错误"},{"en":"worst quality","zh":"最差质量"},{"en":"low quality","zh":"低质量"},{"en":"blurry","zh":"画面模糊"},{"en":"extra fingers","zh":"多余手指"},{"en":"watermark","zh":"水印"},{"en":"text","zh":"文字"},{"en":"signature","zh":"签名"},{"en":"jpeg artifacts","zh":"压缩痕迹"},{"en":"bad hands","zh":"手部错误"},{"en":"missing fingers","zh":"缺手指"},{"en":"mutated hands","zh":"畸形手"},{"en":"poorly drawn face","zh":"脸部崩坏"},{"en":"username","zh":"用户名"},{"en":"logo","zh":"标志"},{"en":"cropped","zh":"画面裁切"},{"en":"out of frame","zh":"主体出画"},{"en":"ugly","zh":"丑陋"},{"en":"duplicate","zh":"重复元素"},{"en":"error","zh":"错误"},{"en":"less detailed","zh":"细节不足"},{"en":"bad proportions","zh":"比例失调"},{"en":"extra limbs","zh":"多余肢体"},{"en":"fused fingers","zh":"手指粘连"},{"en":"long neck","zh":"过长脖子"},{"en":"extra arms","zh":"多余手臂"},{"en":"extra legs","zh":"多余腿"},{"en":"missing arms","zh":"缺失手臂"},{"en":"missing legs","zh":"缺失腿"},{"en":"malformed limbs","zh":"肢体畸形"},{"en":"twisted body","zh":"身体扭曲"},{"en":"disfigured","zh":"面容损毁"},{"en":"bad face","zh":"脸部错误"},{"en":"deformed face","zh":"面部变形"},{"en":"asymmetric eyes","zh":"双眼不对称"},{"en":"cross-eyed","zh":"斗鸡眼"},{"en":"poorly drawn hands","zh":"手部崩坏"},{"en":"extra ears","zh":"多余耳朵"},{"en":"missing ears","zh":"缺失耳朵"},{"en":"bad feet","zh":"脚部错误"},{"en":"extra toes","zh":"多余脚趾"},{"en":"missing toes","zh":"缺失脚趾"},{"en":"fused toes","zh":"脚趾粘连"},{"en":"bad teeth","zh":"牙齿错误"},{"en":"extra eyes","zh":"多余眼睛"},{"en":"missing eyes","zh":"缺失眼睛"},{"en":"monochrome","zh":"单色画面"},{"en":"grayscale","zh":"灰阶画面"},{"en":"sepia","zh":"深褐色调"},{"en":"oversaturated","zh":"过度饱和"},{"en":"undersaturated","zh":"色彩黯淡"},{"en":"harsh lighting","zh":"刺眼光照"},{"en":"overexposed","zh":"画面过曝"},{"en":"underexposed","zh":"画面欠曝"},{"en":"noise","zh":"噪点"},{"en":"grain","zh":"颗粒"},{"en":"pixelated","zh":"像素化"},{"en":"scan artifacts","zh":"扫描痕迹"},{"en":"compression artifacts","zh":"压缩伪影"},{"en":"chromatic aberration","zh":"色差"},{"en":"lens flare","zh":"镜头光晕"},{"en":"motion blur","zh":"动态模糊"},{"en":"smudged","zh":"涂抹痕迹"},{"en":"unfinished","zh":"未完成"},{"en":"sketch","zh":"草稿"},{"en":"rough sketch","zh":"粗糙草图"},{"en":"flat color","zh":"单调平涂"},{"en":"cel shading","zh":"赛璐璐上色"},{"en":"low contrast","zh":"对比不足"},{"en":"washed out","zh":"颜色褪淡"},{"en":"bad composition","zh":"构图不佳"},{"en":"cluttered","zh":"画面杂乱"},{"en":"messy","zh":"凌乱"},{"en":"bad perspective","zh":"透视错误"},{"en":"floating limbs","zh":"肢体漂浮"},{"en":"disconnected limbs","zh":"肢体断裂"},{"en":"multiple views","zh":"多视角"},{"en":"multiple panels","zh":"多格分镜"},{"en":"speech bubble","zh":"对话气泡"},{"en":"comic","zh":"漫画风格"},{"en":"border","zh":"画面边框"},{"en":"frame","zh":"画框"},{"en":"white border","zh":"白色边框"},{"en":"letterboxed","zh":"上下黑边"},{"en":"censored","zh":"打码遮挡"},{"en":"mosaic censoring","zh":"马赛克"},{"en":"bar censor","zh":"遮挡条"},{"en":"nsfw","zh":"成人内容"},{"en":"nude","zh":"裸露"},{"en":"explicit","zh":"露骨内容"},{"en":"suggestive","zh":"暗示内容"},{"en":"bad reflection","zh":"倒影错误"},{"en":"bad shadow","zh":"阴影错误"},{"en":"harsh shadow","zh":"生硬阴影"},{"en":"glowing","zh":"异常发光"},{"en":"bloom","zh":"过强光晕"},{"en":"vignetting","zh":"暗角"},{"en":"distorted","zh":"画面扭曲"},{"en":"glitch","zh":"画面故障"},{"en":"static","zh":"雪花噪点"},{"en":"poorly drawn","zh":"画工粗糙"},{"en":"amateur","zh":"业余水平"},{"en":"rushed","zh":"赶工痕迹"},{"en":"inconsistent","zh":"前后不一致"},{"en":"wrong anatomy","zh":"错误结构"},{"en":"extra heads","zh":"多余头部"},{"en":"two heads","zh":"两个头"},{"en":"missing head","zh":"缺失头部"},{"en":"floating head","zh":"漂浮头颅"},{"en":"patreon","zh":"赞助标识"},{"en":"artist name","zh":"作者署名"},{"en":"web address","zh":"网址"},{"en":"timestamp","zh":"时间戳"},{"en":"dated","zh":"日期标注"},{"en":"ui","zh":"界面元素"},{"en":"text box","zh":"文本框"},{"en":"subtitles","zh":"字幕"},{"en":"caption","zh":"说明文字"},{"en":"stamp","zh":"印章"},{"en":"color banding","zh":"色带"},{"en":"aliasing","zh":"锯齿边缘"},{"en":"moire","zh":"摩尔纹"},{"en":"sharpening artifacts","zh":"锐化痕迹"},{"en":"double image","zh":"重影"},{"en":"body horror","zh":"身体异变"},{"en":"alien anatomy","zh":"异形结构"},{"en":"missing limbs","zh":"缺失肢体"},{"en":"fused limbs","zh":"肢体融合"},{"en":"too many fingers","zh":"手指过多"},{"en":"deformed hands","zh":"手部变形"},{"en":"asymmetrical","zh":"左右不对称"},{"en":"bad eyes","zh":"眼睛错误"},{"en":"ugly face","zh":"丑陋面容"}];
