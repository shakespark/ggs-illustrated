# 枪炮、病菌与钢铁 · 伴读

《枪炮、病菌与钢铁》（Jared Diamond）的伴读站：给总是读到一半就停下的人。读者读中信出版社 2022 年版中译本。
不替代原书：每章伴读页的前半在读原书之前用（先下注、因果链定位、读速地图、边读边填），后半在读完之后用（体检与反方、想一想、换个镜头、回到赌注）。

- 纯静态页面，无构建步骤；`python3 -m http.server 8780` 后打开 http://localhost:8780/ 。
- 编写规范：`AUTHORING.md`（版权红线、页面结构、引用纪律）。
- 原书材料在 `source/`（epub 与提取的英文文本），**不入库、不部署**。
- 质检：`node tools/check.mjs`（浏览器质检，需 playwright）；`python3 tools/overlap.py chapters/*.html`（与原文的英文长片段重合）。
