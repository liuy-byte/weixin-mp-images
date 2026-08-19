// FDE 贴图卡片生成（4:5 竖版，1080×1350 @2x = 2160×2700）
// 视觉沿用 cover/generate.mjs 的暖金深色体系，保证与公众号封面同一家族。
// 用法: node fde-cards.mjs <cards.json> <输出目录>
import { readFileSync, mkdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
// 复用 wechat-mp skill 的 playwright-core（各 agent 工具安装位置不同，按序探测）
const CANDIDATES = [
  `${process.env.HOME}/.claude/skills/wechat-mp/scripts/cover/node_modules/playwright-core/index.mjs`,
  `${process.env.HOME}/.agents/skills/wechat-mp/scripts/cover/node_modules/playwright-core/index.mjs`,
  `${process.env.HOME}/.config/opencode/skills/wechat-mp/scripts/cover/node_modules/playwright-core/index.mjs`,
];
const PLAYWRIGHT = CANDIDATES.find((p) => existsSync(p));
if (!PLAYWRIGHT) {
  console.error('缺少 playwright-core。先装一次：\n'
    + '  PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm i \\\n'
    + '    --prefix ~/.claude/skills/wechat-mp/scripts/cover \\\n'
    + '    --registry=https://registry.npmmirror.com');
  process.exit(1);
}
const { chromium } = await import(PLAYWRIGHT);

const [cfgPath, outDir] = process.argv.slice(2);
if (!cfgPath || !outDir) { console.error('用法: node fde-cards.mjs <cards.json> <输出目录>'); process.exit(1); }
const cards = JSON.parse(readFileSync(cfgPath, 'utf8'));
mkdirSync(outDir, { recursive: true });

const W = 1080, H = 1350, SCALE = 2;
const P = { main: '#d99a1f', light: '#f6d47c', accent: '#f1c14b' };
const hexToRgb = (h) => { const n = parseInt(h.replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const rgba = (h, a) => { const [r, g, b] = hexToRgb(h); return `rgba(${r},${g},${b},${a})`; };

const esc = (s = '') => String(s)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
// 支持 <hl> 高亮标记与 <br> 换行
const rich = (s = '') => {
  const tokens = [];
  const t = String(s)
    .replace(/<br\s*\/?>/gi, () => `@@T${tokens.push('<br>') - 1}@@`)
    .replace(/<hl>/gi, () => `@@T${tokens.push('<hl>') - 1}@@`)
    .replace(/<\/hl>/gi, () => `@@T${tokens.push('</hl>') - 1}@@`);
  let out = esc(t);
  tokens.forEach((tok, i) => { out = out.replace(`@@T${i}@@`, tok); });
  return out;
};

const CSS = `
* { margin:0; padding:0; box-sizing:border-box; }
html, body { width:${W}px; height:${H}px; overflow:hidden; }
.card { position:relative; width:${W}px; height:${H}px; overflow:hidden;
  font-family:"PingFang SC","Helvetica Neue",Arial,sans-serif;
  background:
    radial-gradient(900px 800px at 15% 18%, ${rgba(P.main, 0.20)}, transparent 62%),
    radial-gradient(760px 700px at 92% 88%, ${rgba(P.main, 0.14)}, transparent 58%),
    linear-gradient(150deg, #0a1320 0%, #0d1b2e 55%, #0a1422 100%); }
.grid { position:absolute; inset:0;
  background-image:linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
  background-size:60px 60px;
  mask-image:radial-gradient(900px 900px at 50% 38%, #000 32%, transparent 82%); }
.dot { position:absolute; border-radius:50%; filter:blur(1px); }
.d1 { width:9px; height:9px; background:${P.main}; top:190px; left:880px; opacity:.75; }
.d2 { width:6px; height:6px; background:${P.light}; top:1120px; left:150px; opacity:.6; }
.d3 { width:5px; height:5px; background:${P.main}; top:720px; left:990px; opacity:.5; }

.wrap { position:absolute; inset:0; padding:186px 84px 170px;
  display:flex; flex-direction:column; align-items:stretch; justify-content:flex-start; }
.wrap > * { flex:none; }
.wrap.center { padding:96px 84px 150px; text-align:center; align-items:center;
  justify-content:center; }

.kicker { position:absolute; top:96px; left:84px; font-size:27px; font-weight:700;
  letter-spacing:6px; color:${P.accent}; }
.wrap.center .kicker { position:static; margin-bottom:26px; }
.bar { width:64px; height:6px; border-radius:4px; background:${P.main}; margin:0 0 34px; }
.wrap.center .bar { margin:0 auto 34px; }

.title { font-size:66px; font-weight:800; color:#f4f8ff; line-height:1.32; letter-spacing:.5px; }
.title hl { color:${P.accent}; }
.title.big { font-size:82px; line-height:1.26; }
.sub { margin-top:30px; font-size:34px; font-weight:500; color:#9fb3c8; line-height:1.6; }
.sub hl { color:${P.light}; font-weight:600; }

/* 两栏对比 */
.cols { margin-top:48px; display:flex; flex-direction:column; gap:24px; flex:none; }
.col { border:2px solid ${rgba(P.main, .28)}; border-radius:22px; padding:30px 40px 34px;
  background:${rgba(P.main, .06)}; }
.col .ct { font-size:31px; font-weight:700; color:${P.accent}; letter-spacing:1px; }
.col .cb { margin-top:14px; font-size:35px; font-weight:600; color:#e8f0fa; line-height:1.62; }

/* 条目列表 */
.list { margin-top:52px; display:flex; flex-direction:column; gap:34px; }
.item { display:flex; gap:24px; align-items:flex-start; }
.idx { flex:none; width:15px; height:15px; margin-top:16px; border-radius:50%; background:${P.main}; }
.itx { font-size:37px; font-weight:500; color:#dce7f3; line-height:1.56; }
.itx hl { color:${P.accent}; font-weight:700; }

/* 数据行 */
.stats { margin-top:60px; display:flex; flex-direction:column; gap:44px; }
.stat { border-left:6px solid ${P.main}; padding-left:32px; }
.stat .sl { font-size:30px; color:#8ea3ba; font-weight:500; letter-spacing:.5px; }
.stat .sv { margin-top:12px; font-size:52px; font-weight:800; color:#f4f8ff; letter-spacing:.5px; }
.stat .sv hl { color:${P.accent}; }

/* 大引语 */
.quote { font-size:60px; font-weight:700; color:#f4f8ff; line-height:1.5; letter-spacing:.5px; }
.quote hl { color:${P.accent}; }
.qmark { font-size:130px; font-weight:800; color:${rgba(P.main, .5)}; line-height:.8; margin-bottom:20px; }
.qfrom { margin-top:44px; font-size:29px; color:#7f94ab; font-weight:500; }

.note { margin-top:44px; padding-top:34px; font-size:28px; color:#7f94ab; line-height:1.62;
  border-top:1px solid rgba(255,255,255,.09); }
.note hl { color:${P.light}; }

.brand { position:absolute; left:84px; right:84px; bottom:62px;
  display:flex; align-items:center; justify-content:space-between; }
.brand .bl { display:flex; align-items:center; gap:14px; }
.brand .bn { font-size:27px; font-weight:600; color:#c7d6e6; letter-spacing:1px; }
.brand .pg { font-size:26px; font-weight:600; color:#5f7488; letter-spacing:2px;
  font-family:"SF Pro Display","Helvetica Neue",Arial,sans-serif; }
.brand .pg b { color:${P.accent}; }
`;

const ICON = `<svg width="30" height="30" viewBox="0 0 24 24"><path d="M12 2 L22 12 L12 22 L2 12 Z" fill="${P.main}"/></svg>`;
const DOTS = '<div class="dot d1"></div><div class="dot d2"></div><div class="dot d3"></div>';

function body(c) {
  const parts = [];
  if (c.kicker) parts.push(`<div class="kicker">${esc(c.kicker)}</div>`);
  parts.push('<div class="bar"></div>');
  if (c.quote) {
    parts.push('<div class="qmark">&ldquo;</div>');
    parts.push(`<div class="quote">${rich(c.quote)}</div>`);
    if (c.from) parts.push(`<div class="qfrom">${rich(c.from)}</div>`);
  } else {
    parts.push(`<div class="title${c.big ? ' big' : ''}">${rich(c.title)}</div>`);
    if (c.sub) parts.push(`<div class="sub">${rich(c.sub)}</div>`);
  }
  if (c.cols) {
    parts.push(`<div class="cols">${c.cols.map((x) => `<div class="col"><div class="ct">${rich(x.t)}</div><div class="cb">${rich(x.b)}</div></div>`).join('')}</div>`);
  }
  if (c.stats) {
    parts.push(`<div class="stats">${c.stats.map((x) => `<div class="stat"><div class="sl">${rich(x.l)}</div><div class="sv">${rich(x.v)}</div></div>`).join('')}</div>`);
  }
  if (c.list) {
    parts.push(`<div class="list">${c.list.map((x) => `<div class="item"><div class="idx"></div><div class="itx">${rich(x)}</div></div>`).join('')}</div>`);
  }
  if (c.note) parts.push(`<div class="note">${rich(c.note)}</div>`);
  return parts.join('\n');
}

const page_html = (c, i, total) => `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">
<style>${CSS}</style></head><body><div class="card"><div class="grid"></div>${DOTS}
<div class="wrap${c.center ? ' center' : ''}">${body(c)}</div>
<div class="brand"><div class="bl">${ICON}<span class="bn">技术洋</span></div>
<div class="pg">${String(i + 1).padStart(2, '0')} / <b>${String(total).padStart(2, '0')}</b></div></div>
</div></body></html>`;

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE });
for (const [i, c] of cards.entries()) {
  const page = await ctx.newPage();
  await page.setContent(page_html(c, i, cards.length), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  // 溢出自检：内容与品牌区/kicker 重叠或超出画布都直接报错，不出残图
  const chk = await page.evaluate(() => {
    const w = document.querySelector('.wrap');
    const brand = document.querySelector('.brand').getBoundingClientRect();
    const kicker = document.querySelector('.kicker');
    const kFixed = kicker && getComputedStyle(kicker).position === 'absolute';
    const blocks = [...w.children].filter((el) => !el.classList.contains('kicker') || !kFixed);
    const top = Math.min(...blocks.map((el) => el.getBoundingClientRect().top));
    const bottom = Math.max(...blocks.map((el) => el.getBoundingClientRect().bottom));
    return {
      top: Math.round(top),
      bottom: Math.round(bottom),
      brandTop: Math.round(brand.top),
      kickerBottom: kFixed ? Math.round(kicker.getBoundingClientRect().bottom) : 0,
    };
  });
  if (chk.bottom > chk.brandTop - 12) {
    throw new Error(`第 ${i + 1} 张内容压到底部品牌区（内容底 ${chk.bottom} / 品牌顶 ${chk.brandTop}），需精简文案`);
  }
  if (chk.top < chk.kickerBottom + 20) {
    throw new Error(`第 ${i + 1} 张内容压到顶部标签（内容顶 ${chk.top} / 标签底 ${chk.kickerBottom}），需精简文案`);
  }
  const out = join(outDir, `${c.file}.png`);
  await page.screenshot({ path: out });
  const kb = (statSync(out).size / 1024).toFixed(0);
  console.log(`✓ ${c.file}.png (${W * SCALE}×${H * SCALE}, ${kb}KB)`);
  await page.close();
}
await browser.close();
console.log(`done: ${cards.length} 张 -> ${outDir}`);
