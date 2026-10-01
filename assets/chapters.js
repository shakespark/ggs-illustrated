// 全站共享数据：章节清单、分部、全书因果链。导航、首页、每章顶部的"你在这里"都从这里读。
// 章节中文标题沿用中信出版社 2022 年版（全新翻译增订版）的译名；说明文字一律用本站自己的话写，不照抄原书。
// words：英文原版词数（从 epub 统计）；role：这一章在全书论证里的角色（见 GGS_ROLES）。
window.GGS_CHAPTERS = [
  { n: 0,  slug: "00-prologue",       part: 0, words: 8433,  role: "spine",    title: "亚力的问题",                   en: "Prologue: Yali's Question",
    q: "为什么是欧亚大陆的人带着枪炮、病菌和钢铁去了别的大陆，而不是反过来？" },
  { n: 1,  slug: "01-starting-line",  part: 1, words: 6842,  role: "context",  title: "人类社会的起跑线",                   en: "Up to the Starting Line",
    q: "公元前 11000 年，各大陆的人站在起跑线上时，谁领先了吗？" },
  { n: 2,  slug: "02-natural-experiment", part: 1, words: 4944, role: "method", title: "历史的自然实验",               en: "A Natural Experiment of History",
    q: "同一批祖先，散到不同的岛上，几百年后为什么变成了截然不同的社会？" },
  { n: 3,  slug: "03-cajamarca",      part: 1, words: 5944,  role: "spine",    title: "卡哈马卡的冲突",               en: "Collision at Cajamarca",
    q: "168 个西班牙人怎么俘虏了一个拥有八万军队的皇帝？" },
  { n: 4,  slug: "04-farmer-power",   part: 2, words: 2584,  role: "spine",    title: "农民的力量",                   en: "Farmer Power",
    q: "种地的人凭什么打赢了打猎的人——而且几乎每次都赢？" },
  { n: 5,  slug: "05-haves",          part: 2, words: 3754,  role: "spine",    title: "历史上的有与无",             en: "History's Haves and Have-nots",
    q: "食物生产在哪里、什么时候独立出现过？为什么分布这么不均？" },
  { n: 6,  slug: "06-to-farm",        part: 2, words: 3511,  role: "spine",    title: "下田好，还是打猎好？",               en: "To Farm or Not to Farm",
    q: "种地更累、吃得更差，人们为什么还是一步步变成了农民？" },
  { n: 7,  slug: "07-almond",         part: 2, words: 6061,  role: "evidence", title: "杏仁的前世今生",                 en: "How to Make an Almond",
    q: "没有人打算'发明农业'，野生植物是怎么不知不觉变成庄稼的？" },
  { n: 8,  slug: "08-apples",         part: 2, words: 9765,  role: "evidence", title: "是苹果的问题，还是印第安人的问题？",     en: "Apples or Indians",
    q: "有些地方没发展出农业，是那里的人不行，还是那里的野生植物不行？" },
  { n: 9,  slug: "09-anna-karenina",  part: 2, words: 6843,  role: "spine",    title: "斑马、不幸福的婚姻与安娜·卡列尼娜原则", en: "Zebras, Unhappy Marriages, and the Anna Karenina Principle",
    q: "世界上那么多大型哺乳动物，为什么被驯化的只有区区十几种？" },
  { n: 10, slug: "10-axes",           part: 2, words: 5620,  role: "spine",    title: "大陆轴线——历史的伏笔",       en: "Spacious Skies and Tilted Axes",
    q: "大陆是东西走向还是南北走向，为什么能决定庄稼传得快还是慢？" },
  { n: 11, slug: "11-germs",          part: 3, words: 7775,  role: "spine",    title: "牲畜的致命礼物",               en: "Lethal Gift of Livestock",
    q: "为什么病菌几乎只从欧亚大陆流向美洲，而不是反过来？" },
  { n: 12, slug: "12-writing",        part: 3, words: 7487,  role: "spine",    title: "蓝本和借来的字母",               en: "Blueprints and Borrowed Letters",
    q: "文字只被独立发明过寥寥几次，其余的都是怎么来的？" },
  { n: 13, slug: "13-necessity",      part: 3, words: 9560,  role: "spine",    title: "发明为需求之母",                     en: "Necessity's Mother",
    q: "发明真的是'需要之母'催生的吗？技术为什么在有些地方滚雪球？" },
  { n: 14, slug: "14-kleptocracy",    part: 3, words: 10401, role: "spine",    title: "从人人平等到盗贼统治",         en: "From Egalitarianism to Kleptocracy",
    q: "人们为什么会接受一个拿走自己余粮的统治者？" },
  { n: 15, slug: "15-yali",           part: 4, words: 9918,  role: "case",     title: "亚力的族人",                   en: "Yali's People",
    q: "新几内亚和澳大利亚：同一块古大陆，为什么走上两条路？" },
  { n: 16, slug: "16-china",          part: 4, words: 3764,  role: "case",     title: "中国——东亚之光", en: "How China Became Chinese",
    q: "中国为什么这么早、这么彻底地统一？" },
  { n: 17, slug: "17-polynesia",      part: 4, words: 6920,  role: "case",     title: "开往波利尼西亚的快船",         en: "Speedboat to Polynesia",
    q: "南岛语族怎么从台湾一路扩散到半个地球？" },
  { n: 18, slug: "18-hemispheres",    part: 4, words: 7410,  role: "spine",    title: "两个半球的碰撞",               en: "Hemispheres Colliding",
    q: "把欧亚和美洲逐项对比，前面所有的因素加起来，够不够解释结局？" },
  { n: 19, slug: "19-africa",         part: 4, words: 8496,  role: "case",     title: "非洲是怎么变成黑人的非洲的？",   en: "How Africa Became Black",
    q: "非洲内部的大迁徙，和欧洲殖民非洲，是同一个故事的两个版本吗？" },
  { n: 20, slug: "20-japan",          part: 4, words: 9102,  role: "case",     title: "日本人是什么人？",               en: "Who Are the Japanese?",
    q: "日本人从哪里来？为什么这个问题在日本这么敏感？" },
  { n: 21, slug: "21-epilogue",       part: 5, words: 7840,  role: "spine",    title: "人类史作为一门科学的未来",       en: "Epilogue: The Future of Human History as a Science",
    q: "为什么是欧洲而不是中国？历史能不能像科学一样被检验？" },
  { n: 22, slug: "22-afterword",      part: 5, words: 4758,  role: "spine",    title: "富国与穷国",        en: "2017 Afterword: Rich and Poor Countries",
    q: "地理还是制度？作者怎么回应'制度决定论'的经济学家？" },
];

window.GGS_PARTS = [
  { name: "提问",               en: "The Question",                      color: "var(--part0)" },
  { name: "从伊甸园到卡哈马卡", en: "From Eden to Cajamarca",            color: "var(--part1)" },
  { name: "食物生产的兴起与扩散", en: "The Rise and Spread of Food Production", color: "var(--part2)" },
  { name: "从食物到枪炮、病菌与钢铁", en: "From Food to Guns, Germs, and Steel", color: "var(--part3)" },
  { name: "环游世界",       en: "Around the World in Six Chapters",  color: "var(--part4)" },
  { name: "回望与回应",         en: "Looking Back",                      color: "var(--part5)" },
];

// 章节在论证里的角色：首页和每章顶部会显示，帮读者决定"这一章能不能读快一点"
window.GGS_ROLES = {
  spine:    { zh: "主干",   tip: "论证的承重墙：跳过它，后面的章节会接不上。" },
  method:   { zh: "方法",   tip: "教你作者怎么论证（自然实验）。读懂了，全书的说服力都会变强。" },
  evidence: { zh: "证据",   tip: "细节密集、篇幅长，很多人在这里停下。抓住一个结论就可以往前走，细节以后回来翻。" },
  context:  { zh: "背景",   tip: "铺垫史前背景。只需要带走一个结论，可以读快。" },
  case:     { zh: "案例",   tip: "拿前面的理论去检验一个地区。彼此独立，顺序随意，挑感兴趣的读。" },
};

// 全书因果链（本站自绘，不是原书图 4.1 的复刻）。col：0 地理底牌 → 1 食物生产 → 2 社会后果 → 3 直接原因。
// ch：讲这一环的章节；每章顶部的小地图会高亮本章负责的节点。
window.GGS_CHAIN = {
  cols: ["地理底牌", "食物生产", "人口与余粮", "社会后果", "征服的直接原因"],
  nodes: [
    { id: "species", col: 0, zh: "可驯化的野生动植物", ch: [7, 8, 9] },
    { id: "axis",    col: 0, zh: "大陆轴向与地理阻隔", ch: [10] },
    { id: "origin",  col: 1, zh: "食物生产出现得早",   ch: [5, 6] },
    { id: "spread",  col: 1, zh: "作物与技术传播得快", ch: [10] },
    { id: "dense",   col: 2, zh: "人多、定居、有余粮", ch: [4] },
    { id: "germs",   col: 3, zh: "群聚病菌",           ch: [4, 11] },
    { id: "writing", col: 3, zh: "文字",               ch: [12] },
    { id: "tech",    col: 3, zh: "技术积累",           ch: [13] },
    { id: "state",   col: 3, zh: "国家与专职人员",     ch: [4, 14] },
    { id: "conquest",col: 4, zh: "枪·马·钢刀·病菌",    ch: [3] },
  ],
  // 第三项为 "over" 的边从所有节点上方绕过（牲畜 → 病菌）
  edges: [
    ["species", "origin"], ["axis", "spread"], ["origin", "spread"],
    ["origin", "dense"], ["spread", "dense"], ["species", "germs", "over"],
    ["dense", "germs"], ["dense", "writing"], ["dense", "tech"], ["dense", "state"],
    ["germs", "conquest"], ["writing", "conquest"], ["tech", "conquest"], ["state", "conquest"],
  ],
  // 不在链条上、而是"检验链条"的章节
  tests: { zh: "拿这条链去检验各地区", ch: [2, 15, 16, 17, 18, 19, 20] },
};

// 已经写好的章节。没写好的章节在导航里显示为"待写"。
window.GGS_READY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
