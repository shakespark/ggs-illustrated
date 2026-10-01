// 枪炮、病菌与钢铁 · 伴读：共享运行时（从 APOSD 精读站的 aposd.js 派生）。
// 章节页在 <body data-chapter="4"> 上声明章号；其他页面不写 data-chapter。
// 本脚本注入顶栏、章节头（含"你在全书论证里的位置"小地图）、本页目录、"已读完"勾选、上下章导航、备案号页脚，
// 并接好通用组件：
//   .bet 先下注（data-key；按钮选一个 + 可选 textarea.note）、.payoff 读后对照（data-bet 指向同一个 key）、
//   textarea.note / input.note 本地笔记（data-key）、.mcq 选择题、[data-chain] 全书因果链图。
// localStorage 的键一律以 "ggs-" 开头：同一域名下还有 OSTEP、APOSD 两个站，不能撞键。
(function () {
  "use strict";
  const LS = {
    get(k, d) { try { const v = localStorage.getItem("ggs-" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("ggs-" + k, JSON.stringify(v)); } catch (e) {} },
  };

  // 站点根目录：从本脚本自己的 src 推出来（…/assets/ggs.js → …/）
  const ROOT = (() => {
    const el = document.currentScript || [...document.scripts].find((s) => /assets\/ggs\.js/.test(s.src));
    const src = el ? el.getAttribute("src") : "assets/ggs.js";
    return src.replace(/assets\/ggs\.js.*$/, "");
  })();

  // ---------- 主题 ----------
  function applyTheme(t) {
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }
  applyTheme(LS.get("theme", "system"));

  // ---------- DOM 小工具 ----------
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "style" && typeof v === "object") Object.assign(el.style, v);
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else if (k === "html") el.innerHTML = v;
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid.nodeType ? kid : String(kid));
    return el;
  }
  const SVGNS = "http://www.w3.org/2000/svg";
  function s(tag, attrs, ...kids) {
    const el = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else if (k === "text") el.textContent = v;
      else el.setAttribute(k, v);
    }
    for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    return el;
  }

  // ---------- 章节数据 ----------
  const CH = () => window.GGS_CHAPTERS || [];
  const READY = () => new Set(window.GGS_READY || []);
  const byN = (n) => CH().find((c) => c.n === n);
  const chHref = (c) => `${ROOT}chapters/${c.slug}.html`;
  const chLabel = (c) => (c.n === 0 ? "开场白" : c.n <= 20 ? `第 ${c.n} 章` : c.n === 21 ? "收场白" : "2017版后记");
  const minutes = (c) => Math.max(5, Math.round(c.words / 250 / 5) * 5); // 中译本阅读时间：英文 1 词约合 1.6 个汉字，每分钟读约 400 字 ≈ 每分钟 250 个原文词；取整到 5 分钟
  const isDone = (n) => !!LS.get("done-" + n, false);
  function roleBadge(c) {
    const r = (window.GGS_ROLES || {})[c.role];
    return r ? h("span", { class: "role role-" + c.role, title: r.tip }, r.zh) : null;
  }

  // ---------- 全书因果链 ----------
  // renderChain(host, { here: 章号 | null, big: 是否首页大图 })。节点可点（章节已写好时）。
  function renderChain(host, opts = {}) {
    const G = window.GGS_CHAIN;
    if (!G) return;
    const here = opts.here;
    const ready = READY();
    const NC = G.cols.length, W = 940, NW = 150, NH = 42, GAP = 52, TOP = 60;
    const colX = G.cols.map((_, k) => 6 + k * ((W - 12 - NW) / (NC - 1)));
    const perCol = G.cols.map((_, k) => G.nodes.filter((n) => n.col === k));
    const maxRows = Math.max(...perCol.map((c) => c.length));
    const pos = {};
    perCol.forEach((nodes, k) => nodes.forEach((n, i) => {
      pos[n.id] = { x: colX[k], y: TOP + ((maxRows - nodes.length) / 2 + i) * GAP };
    }));
    const testsY = TOP + maxRows * GAP + 4;
    const H = testsY + 36 + 6;
    const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": "全书因果链：地理底牌 → 食物生产 → 人口与余粮 → 社会后果 → 征服的直接原因" });
    svg.append(s("defs", {}, s("marker", { id: "ggs-arrow", viewBox: "0 0 8 8", refX: 7, refY: 4, markerWidth: 6, markerHeight: 6, orient: "auto" },
      s("path", { d: "M0,0 L8,4 L0,8 z", fill: "var(--faint)" }))));
    G.cols.forEach((name, k) => svg.append(s("text", { class: "col-label", x: colX[k] + NW / 2, y: 14, "text-anchor": "middle", text: name })));
    const hot = (id) => here != null && G.nodes.find((n) => n.id === id).ch.includes(here);
    for (const [a, b, how] of G.edges) {
      const p = pos[a], q = pos[b];
      let d;
      if (how === "over") { // 从上方绕过中间的列
        const x1 = p.x + NW * 0.75, y1 = p.y, x2 = q.x, y2 = q.y + NH / 2, top = TOP - 20;
        d = `M${x1},${y1} C${x1},${top} ${x1 + 40},${top} ${x1 + 80},${top} L${x2 - 60},${top} C${x2 - 20},${top} ${x2 - 30},${y2} ${x2 - 6},${y2}`;
      } else if (p.x === q.x) { // 同一列：竖直向下
        d = `M${p.x + NW / 2},${p.y + NH} L${q.x + NW / 2},${q.y - 4}`;
      } else {
        const x1 = p.x + NW, y1 = p.y + NH / 2, x2 = q.x, y2 = q.y + NH / 2, mx = (x1 + x2) / 2;
        d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2 - 6},${y2}`;
      }
      svg.append(s("path", { class: "edge" + (hot(a) || hot(b) ? " hot" : "") + (how === "over" ? " over" : ""), d, "marker-end": "url(#ggs-arrow)" }));
      if (how === "over") svg.append(s("text", { class: "edge-label", x: (p.x + NW + q.x) / 2, y: TOP - 26, "text-anchor": "middle", text: "牲畜身上来的病菌" }));
    }
    const chText = (chs) => chs.map((n) => (n === 0 ? "序" : n)).join("、");
    for (const n of G.nodes) {
      const p = pos[n.id];
      const first = n.ch.find((c) => ready.has(c));
      const done = n.ch.every(isDone);
      const g = s(first != null ? "a" : "g", { class: "node" + (hot(n.id) ? " here" : "") + (done ? " done" : ""), transform: `translate(${p.x},${p.y})` });
      if (first != null) g.setAttribute("href", chHref(byN(first)));
      g.append(s("title", { text: `${n.zh}：第 ${chText(n.ch)} 章${done ? "（已读完）" : ""}` }));
      g.append(s("rect", { width: NW, height: NH, rx: 7 }));
      g.append(s("text", { x: NW / 2, y: 18, "text-anchor": "middle", text: n.zh }));
      g.append(s("text", { class: "chs", x: NW / 2, y: 34, "text-anchor": "middle", text: (done ? "✓ " : "") + "第 " + chText(n.ch) + " 章" }));
      svg.append(g);
    }
    const T = G.tests;
    const tg = s("g", { class: "node tests" + (here != null && T.ch.includes(here) ? " here" : ""), transform: `translate(6,${testsY})` });
    tg.append(s("rect", { width: W - 12, height: 36, rx: 7 }));
    tg.append(s("text", { x: (W - 12) / 2, y: 23, "text-anchor": "middle", text: `${T.zh}：第 2 章（方法），第 15–20 章（新几内亚、中国、波利尼西亚、美洲、非洲、日本）` }));
    svg.append(tg);
    host.innerHTML = "";
    host.classList.add("chain");
    host.append(svg);
  }

  // ---------- 本地笔记 ----------
  // <textarea class="note" data-key="ch04-oneline"> / <input class="note" data-key="…">：输入即保存到本机浏览器
  function wireNotes(root) {
    root.querySelectorAll("textarea.note, input.note").forEach((ta) => {
      if (ta.dataset.wired) return;
      ta.dataset.wired = 1;
      const key = "note-" + ta.dataset.key;
      ta.value = LS.get(key, "");
      let tip = null;
      if (ta.tagName === "TEXTAREA") {
        tip = h("div", { class: "note-tip small muted" }, ta.value ? "已保存在本机浏览器" : "写下来会自动保存在本机浏览器（不会上传）");
        ta.after(tip);
      }
      let t = null;
      ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { LS.set(key, ta.value); if (tip) tip.textContent = "已保存在本机浏览器"; }, 400); });
    });
  }

  // ---------- 先下注 / 读后对照 ----------
  // <div class="bet" data-key="ch04"><div class="q">…</div><div class="opts"><button>…</button>…</div><textarea class="note" data-key="ch04-bet"></textarea></div>
  // <div class="payoff" data-bet="ch04"><div class="mine"></div>…</div>：显示读者当初选了什么、写了什么
  function wireBets(root) {
    root.querySelectorAll(".bet").forEach((bet) => {
      if (bet.dataset.wired) return;
      bet.dataset.wired = 1;
      const key = "bet-" + bet.dataset.key;
      const btns = [...bet.querySelectorAll(".opts button")];
      const paint = () => { const v = LS.get(key, null); btns.forEach((b, k) => b.classList.toggle("sel", k === v)); };
      btns.forEach((b, k) => b.addEventListener("click", () => { LS.set(key, LS.get(key, null) === k ? null : k); paint(); }));
      paint();
    });
  }
  function fillPayoffs(root) {
    root.querySelectorAll(".payoff").forEach((po) => {
      const k = po.dataset.bet;
      const mine = po.querySelector(".mine");
      if (!mine) return;
      const bet = document.querySelector(`.bet[data-key="${k}"]`);
      const v = LS.get("bet-" + k, null);
      const choice = bet && v != null ? bet.querySelectorAll(".opts button")[v] : null;
      const note = LS.get(`note-${k}-bet`, "");
      mine.textContent = [choice ? "你押的是：" + choice.textContent.trim() : "", note ? "你写的理由：" + note : ""].filter(Boolean).join("\n");
    });
  }

  // ---------- 选择题（少量使用：只考"想清楚了没有"，不考记忆） ----------
  function wireMcq(root) {
    root.querySelectorAll(".mcq").forEach((q) => {
      if (q.dataset.wired) return;
      q.dataset.wired = 1;
      const ans = Number(q.dataset.answer);
      const btns = [...q.querySelectorAll(".opts button")];
      btns.forEach((b, k) => b.addEventListener("click", () => {
        if (q.classList.contains("answered")) return;
        q.classList.add("answered");
        b.classList.add(k === ans ? "right" : "wrong");
        btns[ans] && btns[ans].classList.add("right");
      }));
    });
  }

  // ---------- 页面装配 ----------
  function mountChrome() {
    const list = CH();
    const ready = READY();
    const n = document.body.dataset.chapter;
    const cur = n == null ? null : byN(Number(n));
    const idx = cur ? list.indexOf(cur) : -1;
    const part = cur ? window.GGS_PARTS[cur.part] : null;

    const themeBtn = h("button", { title: "切换主题" });
    const themes = ["system", "light", "dark"], names = { system: "◐", light: "☀", dark: "☾" }, full = { system: "跟随系统", light: "浅色", dark: "深色" };
    const paintTheme = () => { const t = LS.get("theme", "system"); themeBtn.textContent = names[t]; themeBtn.title = "主题：" + full[t]; };
    themeBtn.onclick = () => { const t = themes[(themes.indexOf(LS.get("theme", "system")) + 1) % 3]; LS.set("theme", t); applyTheme(t); paintTheme(); };
    paintTheme();

    const navTo = (c, arrow) => c && ready.has(c.n) ? h("a", { class: "btn", href: chHref(c), title: chLabel(c) + " · " + c.title }, arrow) : null;
    document.body.prepend(h("header", { class: "topbar" }, h("div", { class: "topbar-inner" },
      h("a", { class: "home", href: ROOT + "index.html" }, "枪炮伴读"),
      h("span", { class: "crumb" }, cur ? `${chLabel(cur)} · ${cur.title}` : ""),
      cur ? navTo(list[idx - 1], "←") : null, cur ? navTo(list[idx + 1], "→") : null,
      themeBtn)));

    if (!cur) return;
    const main = document.querySelector("main");
    if (!main) return;
    if (!main.querySelector(".chapter-head")) {
      main.prepend(h("div", { class: "chapter-head" },
        h("div", { class: "kicker" }, h("span", { class: "dot", style: { background: part.color } }), `${part.name}`, h("span", {}, chLabel(cur))),
        h("h1", {}, cur.title), h("p", { class: "en" }, cur.en)));
    }
    const head = main.querySelector(".chapter-head");
    // 你在全书论证里的位置
    const map = h("div");
    const role = (window.GGS_ROLES || {})[cur.role];
    const where = h("div", { class: "whereami" },
      h("b", {}, "你在全书论证里的位置"),
      h("div", { class: "meta" }, roleBadge(cur), role ? h("span", {}, role.tip) : null,
        h("span", {}, `· 中译本读完约 ${minutes(cur)} 分钟`)),
      map);
    head.after(where);
    renderChain(map, { here: cur.n });

    const heads = [...main.querySelectorAll("h2")];
    if (heads.length >= 3 && !main.querySelector(".toc")) {
      heads.forEach((el, k) => { if (!el.id) el.id = "s" + (k + 1); });
      where.after(h("nav", { class: "toc" }, h("b", {}, "本页目录"), h("ol", {}, heads.map((el) => h("li", {}, h("a", { href: "#" + el.id }, el.textContent))))));
    }
    const cb = h("input", { type: "checkbox", id: "done-cb" });
    cb.checked = isDone(cur.n);
    cb.onchange = () => { LS.set("done-" + cur.n, cb.checked); renderChain(map, { here: cur.n }); };
    main.append(h("label", { class: "done-box", for: "done-cb" }, cb, "我读完了这一章（进度会显示在首页的因果链上）"));
    const prev = list[idx - 1], next = list[idx + 1];
    const navCard = (c, cls, label) => !c ? null : ready.has(c.n)
      ? h("a", { class: cls, href: chHref(c) }, h("small", {}, label), c.title)
      : h("a", { class: cls, href: ROOT + "index.html", title: "这一章的伴读还没写" }, h("small", {}, label + "（伴读待写）"), c.title);
    main.append(h("nav", { class: "chapter-nav" },
      navCard(prev, "prev", "← 上一章 · " + (prev ? chLabel(prev) : "")),
      navCard(next, "next", (next ? chLabel(next) : "") + " · 下一章 →")));
    document.title = `${chLabel(cur)} · ${cur.title} · 枪炮伴读`;
  }

  // 页脚：备案号（ICP 备案要求每个页面可见）
  function mountFooter() {
    document.body.append(h("footer", { class: "site-footer" },
      h("a", { href: "https://beian.miit.gov.cn/", target: "_blank", rel: "noopener" }, "京ICP备18057656号-1")));
  }

  function wire(root) {
    wireNotes(root);
    wireBets(root);
    wireMcq(root);
    root.querySelectorAll("[data-chain]").forEach((el) => renderChain(el, { here: el.dataset.chain ? Number(el.dataset.chain) : null }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    mountChrome();
    mountFooter();
    wire(document);
    fillPayoffs(document);
    // 读后对照框打开时刷新（读者可能刚刚改了下注）
    document.querySelectorAll(".payoff").forEach((po) => po.closest("details")?.addEventListener("toggle", () => fillPayoffs(document)));
  });

  window.GGS = { h, s, LS, ROOT, renderChain, minutes, chLabel, chHref, roleBadge, isDone, fillPayoffs };
})();
