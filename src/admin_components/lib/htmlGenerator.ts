import type { MenuData, ThemeConfig } from '../types/menu';

// ─── Inline SVG Icons (no emoji, no external deps) ───────────────────────────
const SVG = {
  veg:    `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="12" height="12" rx="2" stroke="#16a34a" stroke-width="1.5"/><circle cx="6.5" cy="6.5" r="3.5" fill="#16a34a"/></svg>`,
  nonveg: `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="12" height="12" rx="2" stroke="#dc2626" stroke-width="1.5"/><polygon points="6.5,2.5 11,10.5 2,10.5" fill="#dc2626"/></svg>`,
  egg:    `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="12" height="12" rx="2" stroke="#d97706" stroke-width="1.5"/><circle cx="6.5" cy="6.5" r="3.5" fill="#d97706"/></svg>`,
  vegan:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="#059669" xmlns="http://www.w3.org/2000/svg"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2s5-2 5-4c-5 2-7 10-7 10s-.5-2-1-3c-4 3-3 8-3 8s-2-4 0-9 7-7 7-7z"/></svg>`,
  spicy:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="#e11d48" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C9 2 7 5 7 8c0 2.5 1.5 4.5 3.5 5.5L9 20h6l-1.5-6.5C15.5 12.5 17 10.5 17 8c0-3-2-6-5-6zm0 2c2 0 3 2.5 3 4 0 1.5-1 3-2.5 4.2l.5 6.8h-2l.5-6.8C9 11 8 9.5 8 8c0-1.5 1-4 4-4z"/></svg>`,
  star:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="#d97706" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  chef:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="#7c3aed" xmlns="http://www.w3.org/2000/svg"><path d="M19 5c0-1.1-.9-2-2-2h-1c0-1.1-.9-2-2-2s-2 .9-2 2h-1c-1.1 0-2 .9-2 2v1H5v14h14V6h-4V5zm-6 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/></svg>`,
  phone:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.27 6.27l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  pin:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  wifi:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
  notice: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  menu:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  award:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
};

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                        BASE CSS (shared by all)                          ║
// ╚════════════════════════════════════════════════════════════════════════════╝
function generateBaseCSS(theme: ThemeConfig): string {
  return `/* QRSS Menu Engine — ${theme.name} */
:root {
  --pr: ${theme.primaryColor || '#1b1c1a'};
  --sc: ${theme.secondaryColor || '#4b6549'};
  --ac: ${theme.accentColor || '#cdebc8'};
  --bg: ${theme.bgColor || '#fbf9f5'};
  --cd: ${theme.cardBgColor || '#ffffff'};
  --tx: ${theme.textColor || '#170f0b'};
  --sx: ${theme.subtextColor || '#4e4540'};
  --fh: ${theme.fontHeader || 'Georgia, serif'};
  --fb: ${theme.fontBody || "'Inter', sans-serif"};
  --r: ${
    theme.borderRadius === 'none' ? '0px' :
    theme.borderRadius === 'sm' ? '6px' :
    theme.borderRadius === 'md' ? '12px' :
    theme.borderRadius === 'lg' ? '18px' : '10px'
  };
  --sh: ${
    theme.shadowStyle === 'none' ? 'none' :
    theme.shadowStyle === 'sm' ? '0 1px 4px rgba(0,0,0,0.07)' :
    theme.shadowStyle === 'md' ? '0 3px 12px rgba(0,0,0,0.1)' :
    theme.shadowStyle === 'lg' ? '0 6px 24px rgba(0,0,0,0.14)' :
    theme.shadowStyle === 'glow' ? '0 0 20px rgba(255,197,116,0.12)' :
    '0 2px 8px rgba(0,0,0,0.09)'
  };
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; font-size: 16px; }
body {
  background: var(--bg);
  color: var(--tx);
  font-family: var(--fb);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  word-break: break-word;
  overflow-wrap: break-word;
}
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
button { font-family: inherit; }

/* Responsive wrapper */
.wrap { width: 100%; max-width: min(860px, 100%); margin: 0 auto; padding: 0 clamp(12px, 4vw, 32px); }

/* Badges (shared) */
.badges { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
.badge {
  display: inline-flex; align-items: center; gap: 3px;
  font-size: clamp(0.6rem, 1.7vw, 0.67rem); font-weight: 700;
  letter-spacing: 0.04em; text-transform: uppercase;
  padding: 2px 7px; border-radius: 4px; border: 1px solid;
  white-space: nowrap; line-height: 1.4;
}
.badge svg { flex-shrink: 0; }
.bv  { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
.bnv { background: #fef2f2; color: #b91c1c; border-color: #fecaca; }
.be  { background: #fffbeb; color: #92400e; border-color: #fde68a; }
.bvg { background: #ecfdf5; color: #065f46; border-color: #a7f3d0; }
.bsp { background: #fff1f2; color: #be123c; border-color: #fda4af; }
.bbs { background: #fef9c3; color: #854d0e; border-color: #fde047; }
.bch { background: #ede9fe; color: #5b21b6; border-color: #c4b5fd; }

/* Notice */
.notice {
  display: flex; align-items: flex-start; gap: 8px;
  margin: 10px clamp(12px,4vw,32px); padding: 10px 14px;
  background: #fffbeb; border: 1px solid #fde68a; border-radius: var(--r);
  font-size: clamp(0.74rem, 2vw, 0.82rem); font-weight: 600; color: #92400e; line-height: 1.5;
}
.notice svg { flex-shrink: 0; margin-top: 1px; }

/* No results / empty */
.no-results { display: none; text-align: center; padding: 28px 0; color: var(--sx); font-size: 0.85rem; font-style: italic; grid-column: 1 / -1; }
.empty { text-align: center; padding: 60px 20px; color: var(--sx); font-size: 0.9rem; }
.dish-card[hidden] { display: none !important; }
.cat-section.search-hidden { display: none; }

/* Fade up animation */
.fade-up { opacity: 0; transform: translateY(16px); transition: opacity 0.5s ease-out, transform 0.5s ease-out; }
.fade-up.visible { opacity: 1; transform: none; }

/* Footer (shared base) */
.topbar-logo { height: 26px; width: auto; max-width: 100px; object-fit: contain; flex-shrink: 0; border-radius: 4px; }
.dish-foot { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
.dish-price, .dish-row-price, .chef-card-price {
  white-space: nowrap !important;
  word-break: keep-all !important;
  flex-shrink: 0 !important;
  display: inline-flex !important;
  align-items: center !important;
}
.footer { text-align: center; margin-top: 28px; }
.footer-copy { font-size: clamp(0.66rem, 1.8vw, 0.76rem); color: var(--sx); margin-top: 8px; }
.powered-link {
  display: inline-flex; align-items: center; gap: 6px; margin-top: 14px;
  padding: 6px 16px; border-radius: 9999px; border: 1px solid rgba(0,0,0,0.1);
  background: var(--bg); font-size: 0.78rem; font-weight: 700; color: var(--pr); transition: opacity 0.2s;
}
.powered-link:hover { opacity: 0.72; }
.powered-dot {
  width: 16px; height: 16px; border-radius: 50%; background: #047857; color: #fff;
  font-size: 9px; font-weight: 900; display: inline-flex; align-items: center; justify-content: center; line-height: 1;
}
`;
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║            TEMPLATE 1 — MINIMAL CAFE (Airy, Clean, List-style)          ║
// ╚════════════════════════════════════════════════════════════════════════════╝
function cssMinimal(): string {
  return `
/* ─── MINIMAL CAFE ─── */
.topbar { position: sticky; top: 0; z-index: 200; background: var(--bg); border-bottom: 1px solid rgba(0,0,0,0.06); }
.topbar-inner { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 14px clamp(12px,4vw,32px); max-width: min(860px,100%); margin: 0 auto; }
.topbar-name { font-family: var(--fh); font-size: clamp(1rem,3.5vw,1.25rem); font-weight: 700; color: var(--pr); letter-spacing: 0.02em; display: flex; align-items: center; gap: 6px; }
.topbar-contact { font-size: clamp(0.68rem,2vw,0.78rem); font-weight: 500; color: var(--sx); display: flex; align-items: center; gap: 4px; }

.header-section { padding: clamp(32px,8vw,56px) clamp(14px,4vw,32px) clamp(16px,4vw,24px); text-align: center; border-bottom: 1px solid rgba(0,0,0,0.05); }
.header-section h1 { font-family: var(--fh); font-size: clamp(1.8rem,6vw,2.8rem); font-weight: 400; color: var(--pr); line-height: 1.15; letter-spacing: -0.01em; }
.header-section .tagline { font-size: clamp(0.82rem,2.5vw,0.95rem); color: var(--sx); margin-top: 8px; font-style: italic; }
.header-section .meta-line { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; margin-top: 14px; font-size: 0.78rem; color: var(--sx); }
.header-section .meta-line span { display: flex; align-items: center; gap: 4px; }

/* Minimal hero with banner */
.hero-minimal { position: relative; width: 100%; height: clamp(160px,35vw,260px); overflow: hidden; }
.hero-minimal img { width: 100%; height: 100%; object-fit: cover; }
.hero-minimal-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%); }

/* Search + nav */
.nav-bar { position: sticky; top: 52px; z-index: 100; background: var(--bg); border-bottom: 1px solid rgba(0,0,0,0.05); padding: 10px 0 8px; }
.search-row { padding: 0 clamp(12px,4vw,32px); margin-bottom: 8px; }
.search-box { position: relative; }
.search-box svg { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; opacity: 0.35; pointer-events: none; }
.search-input { width: 100%; padding: 8px 14px 8px 34px; border-radius: 9999px; border: 1px solid rgba(0,0,0,0.1); background: var(--cd); color: var(--tx); font-size: 0.84rem; font-family: var(--fb); outline: none; transition: border-color 0.2s; }
.search-input:focus { border-color: var(--pr); }
.cat-tabs { display: flex; gap: 6px; padding: 0 clamp(12px,4vw,32px); overflow-x: auto; scrollbar-width: none; }
.cat-tabs::-webkit-scrollbar { display: none; }
.cat-tab { flex-shrink: 0; white-space: nowrap; padding: 5px 14px; border-radius: 9999px; border: 1px solid rgba(0,0,0,0.08); background: transparent; color: var(--sx); font-size: 0.78rem; font-weight: 500; cursor: pointer; transition: all 0.18s; font-family: var(--fb); }
.cat-tab:hover { border-color: var(--pr); color: var(--pr); }
.cat-tab.active { background: var(--pr); color: #fff; border-color: var(--pr); }

/* Main */
.main { padding-bottom: 60px; }

/* Category */
.cat-section { padding: clamp(20px,4vw,32px) clamp(12px,4vw,32px) 0; scroll-margin-top: 110px; }
.cat-head { padding-bottom: 8px; margin-bottom: 4px; }
.cat-title { font-family: var(--fh); font-size: clamp(1.1rem,3.5vw,1.4rem); font-weight: 400; color: var(--pr); letter-spacing: 0.01em; }
.cat-desc { font-size: 0.78rem; color: var(--sx); font-style: italic; margin-top: 2px; }

/* LIST-STYLE DISH ROWS (not cards) */
.dish-list { display: flex; flex-direction: column; gap: 0; }
.dish-row { display: flex; align-items: flex-start; gap: 12px; padding: 14px 0; border-bottom: 1px solid rgba(0,0,0,0.05); transition: background 0.15s; }
.dish-row:hover { background: rgba(0,0,0,0.015); }
.dish-row:last-child { border-bottom: none; }
.dish-row-img { width: 72px; height: 72px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
.dish-row-body { flex: 1; min-width: 0; }
.dish-row-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.dish-row-name { font-family: var(--fh); font-size: 0.95rem; font-weight: 600; color: var(--tx); }
.dish-row-price { font-size: 0.9rem; font-weight: 700; color: var(--pr); white-space: nowrap; }
.dish-row-dots { flex: 1; border-bottom: 1px dotted rgba(0,0,0,0.15); margin: 0 6px; min-width: 20px; align-self: center; }
.dish-row-desc { font-size: 0.75rem; color: var(--sx); line-height: 1.5; margin-top: 2px; }

/* Chef section */
.chef-section { padding: clamp(20px,5vw,32px) clamp(12px,4vw,32px) 0; }
.section-title { font-family: var(--fh); font-size: clamp(1rem,3vw,1.25rem); font-weight: 400; color: var(--pr); display: flex; align-items: center; gap: 8px; font-style: italic; }
.section-sub { font-size: 0.78rem; color: var(--sx); margin-top: 2px; }
.chef-scroll { display: flex; gap: 12px; overflow-x: auto; scrollbar-width: none; padding: 12px 0; }
.chef-scroll::-webkit-scrollbar { display: none; }
.chef-pill { flex-shrink: 0; display: flex; align-items: center; gap: 10px; padding: 8px 16px 8px 8px; border-radius: 9999px; background: var(--cd); border: 1px solid rgba(0,0,0,0.06); }
.chef-pill img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
.chef-pill-placeholder { width: 44px; height: 44px; border-radius: 50%; background: var(--ac); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700; color: var(--pr); }
.chef-pill-info { display: flex; flex-direction: column; }
.chef-pill-name { font-family: var(--fh); font-size: 0.82rem; font-weight: 600; color: var(--tx); }
.chef-pill-price { font-size: 0.75rem; font-weight: 700; color: var(--pr); }

/* Footer */
.footer { background: transparent; border-top: 1px solid rgba(0,0,0,0.05); padding: clamp(24px,5vw,40px) clamp(14px,4vw,32px); }
.footer-name { font-family: var(--fh); font-size: 1rem; font-weight: 400; color: var(--pr); margin-bottom: 4px; }
`;
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║       TEMPLATE 2 — OBSIDIAN FINE DINING (Dark, Gold, Sophisticated)     ║
// ╚════════════════════════════════════════════════════════════════════════════╝
function cssLuxury(): string {
  return `
/* ─── OBSIDIAN FINE DINING ─── */
.topbar { position: sticky; top: 0; z-index: 200; background: rgba(19,19,19,0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid rgba(229,194,118,0.12); }
.topbar-inner { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 14px clamp(12px,4vw,32px); max-width: min(860px,100%); margin: 0 auto; }
.topbar-name { font-family: var(--fh); font-size: clamp(0.9rem,3vw,1.1rem); font-weight: 400; color: var(--pr); letter-spacing: 0.12em; text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
.topbar-contact { font-size: 0.72rem; font-weight: 500; color: var(--sx); display: flex; align-items: center; gap: 4px; }

/* Centered elegant header */
.header-section { padding: clamp(48px,12vw,80px) clamp(14px,4vw,32px) clamp(24px,6vw,40px); text-align: center; background: var(--bg); position: relative; }
.header-section::after { content: ''; display: block; width: 60px; height: 1px; background: var(--pr); margin: 20px auto 0; }
.header-section h1 { font-family: var(--fh); font-size: clamp(2rem,7vw,3.2rem); font-weight: 400; color: var(--pr); letter-spacing: 0.06em; line-height: 1.1; }
.header-section .tagline { font-size: clamp(0.78rem,2.2vw,0.88rem); color: var(--sx); margin-top: 10px; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 300; }
.header-section .meta-line { display: flex; flex-wrap: wrap; justify-content: center; gap: 18px; margin-top: 16px; font-size: 0.75rem; color: var(--sx); }
.header-section .meta-line span { display: flex; align-items: center; gap: 4px; }

/* Hero with banner */
.hero-luxury { position: relative; width: 100%; height: clamp(200px,45vw,360px); overflow: hidden; }
.hero-luxury img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.5); }
.hero-luxury-overlay { position: absolute; inset: 0; background: linear-gradient(to top, var(--bg) 0%, rgba(19,19,19,0.4) 50%, transparent 100%); }
.hero-luxury-body { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; color: #fff; }
.hero-luxury-body h1 { font-family: var(--fh); font-size: clamp(2rem,7vw,3.2rem); font-weight: 400; color: var(--pr); letter-spacing: 0.06em; }
.hero-luxury-body .tagline { font-size: 0.82rem; color: var(--sx); margin-top: 6px; letter-spacing: 0.12em; text-transform: uppercase; }

/* Search + Nav */
.nav-bar { position: sticky; top: 54px; z-index: 100; background: var(--bg); border-bottom: 1px solid rgba(229,194,118,0.08); padding: 10px 0 8px; }
.search-row { padding: 0 clamp(12px,4vw,32px); margin-bottom: 8px; }
.search-box { position: relative; }
.search-box svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 14px; height: 14px; opacity: 0.3; pointer-events: none; }
.search-input { width: 100%; padding: 9px 14px 9px 36px; border-radius: 0; border: 1px solid rgba(229,194,118,0.15); background: rgba(27,27,27,0.6); color: var(--tx); font-size: 0.82rem; font-family: var(--fb); outline: none; letter-spacing: 0.04em; transition: border-color 0.2s; }
.search-input:focus { border-color: var(--pr); }
.cat-tabs { display: flex; gap: 0; padding: 0 clamp(12px,4vw,32px); overflow-x: auto; scrollbar-width: none; }
.cat-tabs::-webkit-scrollbar { display: none; }
.cat-tab { flex-shrink: 0; white-space: nowrap; padding: 8px 18px; border: none; border-bottom: 2px solid transparent; background: transparent; color: var(--sx); font-size: 0.72rem; font-weight: 500; cursor: pointer; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.2s; font-family: var(--fb); }
.cat-tab:hover { color: var(--pr); }
.cat-tab.active { color: var(--pr); border-bottom-color: var(--pr); }

.main { padding-bottom: 60px; }

/* Category */
.cat-section { padding: clamp(28px,5vw,44px) clamp(12px,4vw,32px) 0; scroll-margin-top: 110px; }
.cat-head { padding-bottom: 12px; margin-bottom: 16px; border-bottom: 1px solid rgba(229,194,118,0.1); position: relative; }
.cat-title { font-family: var(--fh); font-size: clamp(1.1rem,3.5vw,1.5rem); font-weight: 400; color: var(--pr); letter-spacing: 0.08em; text-transform: uppercase; }
.cat-desc { font-size: 0.78rem; color: var(--sx); font-style: italic; margin-top: 4px; }

/* PORTRAIT CARD LAYOUT */
.dish-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
@media (min-width: 600px) { .dish-grid { grid-template-columns: repeat(2, 1fr); } }
.dish-card { background: var(--cd); border: 1px solid rgba(229,194,118,0.08); overflow: hidden; transition: transform 0.2s, border-color 0.2s; position: relative; }
.dish-card:hover { transform: translateY(-3px); border-color: rgba(229,194,118,0.2); }
.dish-card.has-img .dish-img-wrap { width: 100%; aspect-ratio: 4/5; overflow: hidden; }
.dish-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.dish-card:hover .dish-img-wrap img { transform: scale(1.03); }
.dish-body { padding: 14px 16px 16px; }
.dish-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.dish-name { font-family: var(--fh); font-size: 0.95rem; font-weight: 400; color: var(--tx); letter-spacing: 0.02em; flex: 1; }
.dish-price { font-size: 0.92rem; font-weight: 600; color: var(--pr); white-space: nowrap; }
.dish-desc { font-size: 0.74rem; color: var(--sx); line-height: 1.55; margin-top: 5px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.dish-card .badges { margin-top: 6px; }

/* Chef */
.chef-section { padding: clamp(24px,5vw,36px) clamp(12px,4vw,32px) 0; }
.section-title { font-family: var(--fh); font-size: clamp(1rem,3vw,1.3rem); font-weight: 400; color: var(--pr); display: flex; align-items: center; gap: 8px; letter-spacing: 0.06em; text-transform: uppercase; }
.section-sub { font-size: 0.76rem; color: var(--sx); margin-top: 3px; font-style: italic; }
.chef-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(220px,100%),1fr)); gap: 14px; margin-top: 14px; }
.chef-card { background: var(--cd); border: 1px solid rgba(229,194,118,0.08); overflow: hidden; transition: transform 0.2s; }
.chef-card:hover { transform: translateY(-2px); }
.chef-card-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.chef-card-img-placeholder { width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, var(--pr) 0%, var(--sc) 100%); display: flex; align-items: center; justify-content: center; }
.chef-card-body { padding: 12px 14px; }
.chef-card-name { font-family: var(--fh); font-size: 0.95rem; font-weight: 400; color: var(--tx); letter-spacing: 0.02em; margin-bottom: 3px; }
.chef-card-desc { font-size: 0.74rem; color: var(--sx); line-height: 1.5; margin-bottom: 8px; }
.chef-card-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.chef-card-price { font-size: 0.95rem; font-weight: 600; color: var(--pr); }

/* Footer */
.footer { background: var(--cd); border-top: 1px solid rgba(229,194,118,0.08); padding: clamp(28px,6vw,48px) clamp(14px,4vw,32px); }
.footer-name { font-family: var(--fh); font-size: 1.1rem; font-weight: 400; color: var(--pr); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px; }
.footer .powered-link { border-color: rgba(229,194,118,0.15); background: var(--bg); }

/* Dark theme badge overrides */
.bv  { background: rgba(22,163,74,0.1); border-color: rgba(22,163,74,0.25); }
.bnv { background: rgba(220,38,38,0.1); border-color: rgba(220,38,38,0.25); }
.be  { background: rgba(217,119,6,0.1); border-color: rgba(217,119,6,0.25); }
.bvg { background: rgba(5,150,105,0.1); border-color: rgba(5,150,105,0.25); }
.bsp { background: rgba(225,29,72,0.1); border-color: rgba(225,29,72,0.25); }
.bbs { background: rgba(217,119,6,0.1); border-color: rgba(217,119,6,0.25); }
.bch { background: rgba(124,58,237,0.1); border-color: rgba(124,58,237,0.25); }
.notice { background: rgba(255,251,235,0.08); border-color: rgba(253,230,138,0.15); color: #fbbf24; }
`;
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║     TEMPLATE 3 — HERITAGE RESERVE (Traditional, Ornate, Warm)           ║
// ╚════════════════════════════════════════════════════════════════════════════╝
function cssTraditional(): string {
  return `
/* ─── HERITAGE RESERVE ─── */
.topbar { position: sticky; top: 0; z-index: 200; background: var(--pr); border-bottom: 2px solid var(--sc); }
.topbar-inner { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 12px clamp(12px,4vw,32px); max-width: min(860px,100%); margin: 0 auto; }
.topbar-name { font-family: var(--fh); font-size: clamp(0.85rem,3vw,1.05rem); font-weight: 700; color: #fff; letter-spacing: 0.06em; text-transform: uppercase; display: flex; align-items: center; gap: 6px; }
.topbar-name svg { stroke: #fff; }
.topbar-contact { font-size: 0.72rem; font-weight: 500; color: rgba(255,255,255,0.7); display: flex; align-items: center; gap: 4px; }
.topbar-contact svg { stroke: rgba(255,255,255,0.7); }

/* Full banner hero */
.hero-trad { position: relative; width: 100%; height: clamp(200px,45vw,340px); overflow: hidden; }
.hero-trad img { width: 100%; height: 100%; object-fit: cover; }
.hero-trad-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(93,24,27,0.9) 0%, rgba(93,24,27,0.3) 50%, transparent 100%); }
.hero-trad-body { position: absolute; bottom: 0; left: 0; right: 0; padding: clamp(16px,4vw,28px); color: #fff; }
.hero-trad-body .ornament { width: 40px; height: 2px; background: var(--sc); margin-bottom: 8px; }
.hero-trad-body h1 { font-family: var(--fh); font-size: clamp(1.6rem,6vw,2.6rem); font-weight: 700; line-height: 1.1; }
.hero-trad-body .tagline { font-size: 0.82rem; margin-top: 6px; opacity: 0.85; }
.hero-trad-meta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; font-size: 0.75rem; opacity: 0.8; }
.hero-trad-meta span { display: flex; align-items: center; gap: 4px; }

/* Text header (no banner) */
.header-trad { background: var(--pr); padding: clamp(28px,7vw,48px) clamp(14px,4vw,32px); text-align: center; color: #fff; position: relative; }
.header-trad::before, .header-trad::after { content: ''; position: absolute; left: 50%; transform: translateX(-50%); height: 3px; width: 60px; }
.header-trad::before { top: clamp(14px,3vw,24px); background: var(--sc); }
.header-trad::after { bottom: clamp(14px,3vw,24px); background: var(--sc); }
.header-trad h1 { font-family: var(--fh); font-size: clamp(1.8rem,6vw,2.8rem); font-weight: 700; letter-spacing: 0.04em; }
.header-trad .tagline { font-size: 0.85rem; margin-top: 8px; opacity: 0.8; }
.header-trad .meta-line { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 12px; font-size: 0.78rem; opacity: 0.75; }
.header-trad .meta-line span { display: flex; align-items: center; gap: 4px; }

/* Search + Nav */
.nav-bar { position: sticky; top: 48px; z-index: 100; background: var(--bg); border-bottom: 2px solid var(--ac); padding: 10px 0 8px; }
.search-row { padding: 0 clamp(12px,4vw,32px); margin-bottom: 8px; }
.search-box { position: relative; }
.search-box svg { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); width: 14px; height: 14px; opacity: 0.4; pointer-events: none; }
.search-input { width: 100%; padding: 9px 14px 9px 34px; border-radius: 0; border: 1.5px solid rgba(93,24,27,0.15); background: var(--cd); color: var(--tx); font-size: 0.84rem; font-family: var(--fb); outline: none; transition: border-color 0.2s; }
.search-input:focus { border-color: var(--pr); }
.cat-tabs { display: flex; gap: 0; padding: 0 clamp(12px,4vw,32px); overflow-x: auto; scrollbar-width: none; }
.cat-tabs::-webkit-scrollbar { display: none; }
.cat-tab { flex-shrink: 0; white-space: nowrap; padding: 7px 16px; border: none; background: transparent; color: var(--sx); font-size: 0.76rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: var(--fh); letter-spacing: 0.04em; text-transform: uppercase; border-bottom: 2px solid transparent; }
.cat-tab:hover { color: var(--pr); }
.cat-tab.active { color: var(--pr); border-bottom-color: var(--pr); background: rgba(93,24,27,0.04); }

.main { padding-bottom: 60px; }

/* Category */
.cat-section { padding: clamp(24px,5vw,36px) clamp(12px,4vw,32px) 0; scroll-margin-top: 110px; }
.cat-head { padding-bottom: 10px; margin-bottom: 14px; border-bottom: 3px double var(--pr); position: relative; }
.cat-title { font-family: var(--fh); font-size: clamp(1.15rem,3.8vw,1.5rem); font-weight: 700; color: var(--pr); letter-spacing: 0.04em; }
.cat-desc { font-size: 0.78rem; color: var(--sx); font-style: italic; margin-top: 4px; }

/* HORIZONTAL CARD (image left, info right) */
.dish-grid { display: flex; flex-direction: column; gap: 10px; }
.dish-card { background: var(--cd); border: none; border-left: 3px solid var(--pr); overflow: hidden; display: flex; flex-direction: row; transition: transform 0.18s; min-height: 0; }
.dish-card:hover { transform: translateX(3px); }
.dish-card.has-img .dish-img-wrap { width: 100px; min-height: 90px; flex-shrink: 0; overflow: hidden; }
@media (min-width: 600px) { .dish-card.has-img .dish-img-wrap { width: 130px; } }
.dish-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.dish-body { padding: 10px 14px; display: flex; flex-direction: column; gap: 3px; flex: 1; justify-content: center; }
.dish-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.dish-name { font-family: var(--fh); font-size: 0.92rem; font-weight: 700; color: var(--tx); flex: 1; }
.dish-price { font-size: 0.9rem; font-weight: 800; color: var(--pr); white-space: nowrap; }
.dish-desc { font-size: 0.73rem; color: var(--sx); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* Chef */
.chef-section { padding: clamp(20px,5vw,32px) clamp(12px,4vw,32px) 0; }
.section-title { font-family: var(--fh); font-size: clamp(1.1rem,3.2vw,1.35rem); font-weight: 700; color: var(--pr); display: flex; align-items: center; gap: 8px; }
.section-sub { font-size: 0.78rem; color: var(--sx); font-style: italic; margin-top: 3px; }
.chef-grid { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 12px; }
@media (min-width: 500px) { .chef-grid { grid-template-columns: repeat(2,1fr); } }
.chef-card { background: var(--cd); border-left: 3px solid var(--sc); overflow: hidden; display: flex; flex-direction: row; }
.chef-card-img { width: 90px; aspect-ratio: 1; object-fit: cover; flex-shrink: 0; }
.chef-card-img-placeholder { width: 90px; aspect-ratio: 1; background: linear-gradient(135deg, var(--pr), var(--sc)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.chef-card-body { padding: 10px 12px; flex: 1; display: flex; flex-direction: column; justify-content: center; }
.chef-card-name { font-family: var(--fh); font-size: 0.9rem; font-weight: 700; color: var(--tx); margin-bottom: 2px; }
.chef-card-desc { font-size: 0.72rem; color: var(--sx); line-height: 1.4; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.chef-card-foot { display: flex; align-items: center; justify-content: space-between; }
.chef-card-price { font-size: 0.9rem; font-weight: 800; color: var(--pr); }

/* Footer */
.footer { background: var(--pr); border-top: 3px solid var(--sc); padding: clamp(24px,5vw,40px) clamp(14px,4vw,32px); color: #fff; }
.footer-name { font-family: var(--fh); font-size: 1.1rem; font-weight: 700; color: #fff; letter-spacing: 0.04em; margin-bottom: 4px; }
.footer-copy { color: rgba(255,255,255,0.6); }
.footer .powered-link { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.15); color: #fff; }
.footer .powered-dot { background: var(--sc); }
`;
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║      TEMPLATE 4 — KOMOREBI BISTRO (Modern, Rounded, Nature-Inspired)    ║
// ╚════════════════════════════════════════════════════════════════════════════╝
function cssModern(): string {
  return `
/* ─── KOMOREBI BISTRO ─── */
.topbar { position: sticky; top: 0; z-index: 200; background: rgba(251,249,245,0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(0,0,0,0.05); }
.topbar-inner { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 14px clamp(12px,4vw,32px); max-width: min(860px,100%); margin: 0 auto; }
.topbar-name { font-family: var(--fh); font-size: clamp(1rem,3.5vw,1.2rem); font-weight: 700; color: var(--sc); display: flex; align-items: center; gap: 6px; }
.topbar-contact { font-size: 0.75rem; font-weight: 500; color: var(--sx); display: flex; align-items: center; gap: 4px; }

/* Glass header */
.header-glass { position: relative; width: 100%; min-height: clamp(200px,45vw,320px); background: linear-gradient(135deg, var(--sc) 0%, #2d4a2b 50%, #1a3318 100%); overflow: hidden; display: flex; align-items: center; justify-content: center; }
.header-glass-inner { position: relative; z-index: 2; text-align: center; padding: 32px 20px; background: rgba(255,255,255,0.12); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 24px; border: 1px solid rgba(255,255,255,0.15); margin: 20px; max-width: 500px; width: calc(100% - 40px); }
.header-glass h1 { font-family: var(--fh); font-size: clamp(1.6rem,5.5vw,2.4rem); font-weight: 700; color: #fff; line-height: 1.15; }
.header-glass .tagline { font-size: 0.85rem; color: rgba(255,255,255,0.75); margin-top: 8px; }
.header-glass .meta-line { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 14px; font-size: 0.76rem; color: rgba(255,255,255,0.65); }
.header-glass .meta-line span { display: flex; align-items: center; gap: 4px; }
.header-glass .meta-line svg { stroke: rgba(255,255,255,0.65); }

/* Hero with banner */
.hero-modern { position: relative; width: 100%; height: clamp(200px,45vw,340px); overflow: hidden; }
.hero-modern img { width: 100%; height: 100%; object-fit: cover; }
.hero-modern-overlay { position: absolute; inset: 0; background: linear-gradient(to top, var(--bg) 5%, rgba(75,101,73,0.3) 50%, transparent 100%); }
.hero-modern-body { position: absolute; bottom: 0; left: 0; right: 0; padding: clamp(16px,5vw,32px); }
.hero-modern-card { background: rgba(255,255,255,0.88); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-radius: 20px; padding: 20px 24px; border: 1px solid rgba(255,255,255,0.3); }
.hero-modern-card h1 { font-family: var(--fh); font-size: clamp(1.4rem,5vw,2rem); font-weight: 700; color: var(--sc); }
.hero-modern-card .tagline { font-size: 0.82rem; color: var(--sx); margin-top: 4px; }
.hero-modern-card .meta-line { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; font-size: 0.75rem; color: var(--sx); }
.hero-modern-card .meta-line span { display: flex; align-items: center; gap: 4px; }

/* Search + Nav */
.nav-bar { position: sticky; top: 52px; z-index: 100; background: rgba(251,249,245,0.9); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0,0,0,0.04); padding: 10px 0 8px; }
.search-row { padding: 0 clamp(12px,4vw,32px); margin-bottom: 8px; }
.search-box { position: relative; }
.search-box svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; opacity: 0.35; pointer-events: none; }
.search-input { width: 100%; padding: 10px 16px 10px 38px; border-radius: 14px; border: 1.5px solid rgba(0,0,0,0.08); background: #fff; color: var(--tx); font-size: 0.84rem; font-family: var(--fb); outline: none; transition: all 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
.search-input:focus { border-color: var(--sc); box-shadow: 0 2px 8px rgba(75,101,73,0.1); }
.cat-tabs { display: flex; gap: 8px; padding: 0 clamp(12px,4vw,32px); overflow-x: auto; scrollbar-width: none; }
.cat-tabs::-webkit-scrollbar { display: none; }
.cat-tab { flex-shrink: 0; white-space: nowrap; padding: 6px 16px; border-radius: 12px; border: 1.5px solid rgba(0,0,0,0.07); background: #fff; color: var(--sx); font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: var(--fb); }
.cat-tab:hover { border-color: var(--sc); color: var(--sc); }
.cat-tab.active { background: var(--sc); color: #fff; border-color: var(--sc); }

.main { padding-bottom: 60px; }

/* Category */
.cat-section { padding: clamp(24px,5vw,36px) clamp(12px,4vw,32px) 0; scroll-margin-top: 110px; }
.cat-head { padding-bottom: 10px; margin-bottom: 14px; position: relative; }
.cat-head::after { content: ''; display: block; width: 40px; height: 3px; background: var(--sc); border-radius: 2px; margin-top: 8px; }
.cat-title { font-family: var(--fh); font-size: clamp(1.15rem,3.8vw,1.5rem); font-weight: 700; color: var(--tx); }
.cat-desc { font-size: 0.78rem; color: var(--sx); font-style: italic; margin-top: 4px; }

/* ROUNDED CARD LAYOUT */
.dish-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 600px) { .dish-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }
.dish-card { background: #fff; border-radius: 18px; border: none; box-shadow: 0 2px 12px rgba(0,0,0,0.06); overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; }
.dish-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.dish-card.has-img .dish-img-wrap { width: 100%; aspect-ratio: 16/10; overflow: hidden; }
.dish-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.dish-card:hover .dish-img-wrap img { transform: scale(1.04); }
.dish-body { padding: 14px 16px 16px; }
.dish-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.dish-name { font-family: var(--fh); font-size: 0.95rem; font-weight: 700; color: var(--tx); line-height: 1.3; flex: 1; }
.dish-price { font-size: 0.92rem; font-weight: 800; color: var(--sc); white-space: nowrap; background: var(--ac); padding: 2px 10px; border-radius: 8px; }
.dish-desc { font-size: 0.74rem; color: var(--sx); line-height: 1.5; margin-top: 5px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

/* Chef */
.chef-section { padding: clamp(20px,5vw,32px) clamp(12px,4vw,32px) 0; }
.section-title { font-family: var(--fh); font-size: clamp(1.1rem,3.2vw,1.35rem); font-weight: 700; color: var(--tx); display: flex; align-items: center; gap: 8px; }
.section-sub { font-size: 0.78rem; color: var(--sx); font-style: italic; margin-top: 3px; }
.chef-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(240px,100%),1fr)); gap: 12px; margin-top: 14px; }
.chef-card { background: #fff; border-radius: 18px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); overflow: hidden; transition: transform 0.2s; }
.chef-card:hover { transform: translateY(-3px); }
.chef-card-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.chef-card-img-placeholder { width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, var(--sc) 0%, #2d4a2b 100%); display: flex; align-items: center; justify-content: center; }
.chef-card-body { padding: 12px 16px; }
.chef-card-name { font-family: var(--fh); font-size: 0.95rem; font-weight: 700; color: var(--tx); margin-bottom: 3px; }
.chef-card-desc { font-size: 0.74rem; color: var(--sx); line-height: 1.5; margin-bottom: 8px; }
.chef-card-foot { display: flex; align-items: center; justify-content: space-between; }
.chef-card-price { font-size: 0.95rem; font-weight: 800; color: var(--sc); }

/* Footer */
.footer { background: #fff; border-top: 1px solid rgba(0,0,0,0.05); padding: clamp(28px,6vw,48px) clamp(14px,4vw,32px); border-radius: 24px 24px 0 0; }
.footer-name { font-family: var(--fh); font-size: 1.15rem; font-weight: 700; color: var(--sc); margin-bottom: 4px; }
`;
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║       TEMPLATE 5 — STREET EATS (Bold, Energetic, Urban)                ║
// ╚════════════════════════════════════════════════════════════════════════════╝
function cssStreet(): string {
  return `
/* ─── STREET EATS ─── */
.topbar { position: sticky; top: 0; z-index: 200; background: var(--pr); }
.topbar-inner { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 10px clamp(12px,4vw,32px); max-width: min(860px,100%); margin: 0 auto; }
.topbar-name { font-family: var(--fh); font-size: clamp(1rem,3.5vw,1.2rem); font-weight: 800; color: #fff; text-transform: uppercase; letter-spacing: 0.04em; display: flex; align-items: center; gap: 6px; }
.topbar-name svg { stroke: #fff; }
.topbar-contact { font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.8); display: flex; align-items: center; gap: 4px; }
.topbar-contact svg { stroke: rgba(255,255,255,0.8); }

/* Bold banner hero */
.hero-street { position: relative; width: 100%; height: clamp(200px,50vw,360px); overflow: hidden; }
.hero-street img { width: 100%; height: 100%; object-fit: cover; }
.hero-street-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(172,44,35,0.92) 0%, rgba(172,44,35,0.3) 50%, transparent 100%); }
.hero-street-body { position: absolute; bottom: 0; left: 0; right: 0; padding: clamp(16px,4vw,28px); color: #fff; }
.hero-street-body h1 { font-family: var(--fh); font-size: clamp(1.8rem,7vw,3rem); font-weight: 800; text-transform: uppercase; line-height: 1; }
.hero-street-body .tagline { font-size: 0.85rem; margin-top: 6px; color: var(--ac); font-weight: 700; }
.hero-street-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; font-size: 0.75rem; opacity: 0.85; }
.hero-street-meta span { display: flex; align-items: center; gap: 4px; }

/* Text header (no banner) */
.header-street { background: var(--pr); padding: clamp(28px,7vw,48px) clamp(14px,4vw,32px); text-align: left; color: #fff; position: relative; overflow: hidden; }
.header-street::after { content: ''; position: absolute; right: -20px; top: -20px; width: 120px; height: 120px; background: var(--ac); border-radius: 50%; opacity: 0.15; }
.header-street h1 { font-family: var(--fh); font-size: clamp(2rem,7vw,3rem); font-weight: 800; text-transform: uppercase; line-height: 1; position: relative; z-index: 1; }
.header-street .tagline { font-size: 0.88rem; color: var(--ac); font-weight: 700; margin-top: 8px; position: relative; z-index: 1; }
.header-street .meta-line { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; font-size: 0.78rem; opacity: 0.8; position: relative; z-index: 1; }
.header-street .meta-line span { display: flex; align-items: center; gap: 4px; }

/* Search + Nav */
.nav-bar { position: sticky; top: 44px; z-index: 100; background: var(--bg); border-bottom: 3px solid var(--ac); padding: 10px 0 8px; }
.search-row { padding: 0 clamp(12px,4vw,32px); margin-bottom: 8px; }
.search-box { position: relative; }
.search-box svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; opacity: 0.4; pointer-events: none; }
.search-input { width: 100%; padding: 10px 14px 10px 36px; border-radius: var(--r); border: 2px solid rgba(172,44,35,0.12); background: #fff; color: var(--tx); font-size: 0.85rem; font-family: var(--fb); font-weight: 600; outline: none; transition: border-color 0.2s; }
.search-input:focus { border-color: var(--pr); }
.cat-tabs { display: flex; gap: 6px; padding: 0 clamp(12px,4vw,32px); overflow-x: auto; scrollbar-width: none; }
.cat-tabs::-webkit-scrollbar { display: none; }
.cat-tab { flex-shrink: 0; white-space: nowrap; padding: 6px 14px; border-radius: var(--r); border: 2px solid rgba(0,0,0,0.08); background: #fff; color: var(--sx); font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all 0.15s; font-family: var(--fh); text-transform: uppercase; }
.cat-tab:hover { border-color: var(--pr); color: var(--pr); }
.cat-tab.active { background: var(--pr); color: #fff; border-color: var(--pr); }

.main { padding-bottom: 60px; }

/* Category */
.cat-section { padding: clamp(24px,5vw,36px) clamp(12px,4vw,32px) 0; scroll-margin-top: 110px; }
.cat-head { background: var(--pr); color: #fff; padding: 10px 16px; border-radius: var(--r); margin-bottom: 12px; }
.cat-title { font-family: var(--fh); font-size: clamp(1rem,3.2vw,1.25rem); font-weight: 800; text-transform: uppercase; }
.cat-desc { font-size: 0.76rem; opacity: 0.8; margin-top: 2px; font-style: normal; color: rgba(255,255,255,0.8); }

/* BOLD CARD with accent stripe */
.dish-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
@media (min-width: 600px) { .dish-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }
.dish-card { background: var(--cd); border-radius: var(--r); border: none; box-shadow: var(--sh); overflow: hidden; display: flex; flex-direction: column; transition: transform 0.15s; position: relative; border-left: 4px solid var(--ac); }
.dish-card:hover { transform: translateY(-3px); }
.dish-card.has-img .dish-img-wrap { width: 100%; aspect-ratio: 16/10; overflow: hidden; }
.dish-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.dish-card:hover .dish-img-wrap img { transform: scale(1.05); }
.dish-body { padding: 12px 14px; }
.dish-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.dish-name { font-family: var(--fh); font-size: clamp(0.9rem,2.6vw,1.02rem); font-weight: 800; color: var(--tx); text-transform: uppercase; flex: 1; }
.dish-price { font-size: 0.95rem; font-weight: 900; color: #fff; background: var(--pr); padding: 3px 12px; border-radius: 6px; white-space: nowrap; }
.dish-desc { font-size: 0.74rem; color: var(--sx); line-height: 1.5; margin-top: 5px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* Chef */
.chef-section { padding: clamp(20px,5vw,32px) clamp(12px,4vw,32px) 0; }
.section-title { font-family: var(--fh); font-size: clamp(1.1rem,3.2vw,1.35rem); font-weight: 800; color: var(--pr); display: flex; align-items: center; gap: 8px; text-transform: uppercase; }
.section-sub { font-size: 0.78rem; color: var(--sx); margin-top: 3px; }
.chef-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(240px,100%),1fr)); gap: 10px; margin-top: 12px; }
.chef-card { background: var(--cd); border-radius: var(--r); box-shadow: var(--sh); overflow: hidden; border-left: 4px solid var(--ac); }
.chef-card-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.chef-card-img-placeholder { width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, var(--pr), var(--sc)); display: flex; align-items: center; justify-content: center; }
.chef-card-body { padding: 10px 14px; }
.chef-card-name { font-family: var(--fh); font-size: 0.95rem; font-weight: 800; color: var(--tx); text-transform: uppercase; margin-bottom: 2px; }
.chef-card-desc { font-size: 0.74rem; color: var(--sx); line-height: 1.4; margin-bottom: 6px; }
.chef-card-foot { display: flex; align-items: center; justify-content: space-between; }
.chef-card-price { font-size: 0.95rem; font-weight: 900; color: var(--pr); }

/* Footer */
.footer { background: var(--pr); padding: clamp(24px,5vw,40px) clamp(14px,4vw,32px); color: #fff; }
.footer-name { font-family: var(--fh); font-size: 1.2rem; font-weight: 800; text-transform: uppercase; color: #fff; margin-bottom: 4px; }
.footer-copy { color: rgba(255,255,255,0.6); }
.footer .powered-link { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.15); color: #fff; }
`;
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║       TEMPLATE 6 — PREMIUM DARK GLASS (Neon, Glow, Futuristic)         ║
// ╚════════════════════════════════════════════════════════════════════════════╝
function cssDark(): string {
  return `
/* ─── PREMIUM DARK GLASS ─── */
.topbar { position: sticky; top: 0; z-index: 200; background: rgba(17,19,23,0.9); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,197,116,0.08); }
.topbar-inner { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 14px clamp(12px,4vw,32px); max-width: min(860px,100%); margin: 0 auto; }
.topbar-name { font-family: var(--fh); font-size: clamp(1rem,3.5vw,1.3rem); font-weight: 700; color: var(--pr); letter-spacing: 0.08em; text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
.topbar-contact { font-size: 0.72rem; font-weight: 500; color: var(--sx); display: flex; align-items: center; gap: 4px; }

/* Glass header */
.header-dark { position: relative; width: 100%; min-height: clamp(200px,45vw,320px); background: linear-gradient(135deg, #111317 0%, #1d2128 40%, #111317 100%); overflow: hidden; display: flex; align-items: center; justify-content: center; }
.header-dark::before { content: ''; position: absolute; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(255,197,116,0.12) 0%, transparent 70%); top: -80px; right: -60px; }
.header-dark::after { content: ''; position: absolute; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(244,163,0,0.08) 0%, transparent 70%); bottom: -60px; left: -40px; }
.header-dark-inner { position: relative; z-index: 2; text-align: center; padding: 32px 24px; background: rgba(29,33,40,0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 20px; border: 1px solid rgba(255,197,116,0.1); box-shadow: 0 0 40px rgba(255,197,116,0.06); margin: 20px; max-width: 500px; width: calc(100% - 40px); }
.header-dark h1 { font-family: var(--fh); font-size: clamp(1.8rem,6vw,2.8rem); font-weight: 700; color: var(--pr); letter-spacing: 0.06em; text-transform: uppercase; line-height: 1.1; }
.header-dark .tagline { font-size: 0.82rem; color: var(--sx); margin-top: 8px; letter-spacing: 0.04em; }
.header-dark .meta-line { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 14px; font-size: 0.75rem; color: var(--sx); }
.header-dark .meta-line span { display: flex; align-items: center; gap: 4px; }

/* Hero with banner */
.hero-dark { position: relative; width: 100%; height: clamp(200px,50vw,380px); overflow: hidden; }
.hero-dark img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.4) saturate(0.8); }
.hero-dark-overlay { position: absolute; inset: 0; background: linear-gradient(to top, var(--bg) 0%, rgba(17,19,23,0.5) 50%, transparent 100%); }
.hero-dark-body { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px; }
.hero-dark-body h1 { font-family: var(--fh); font-size: clamp(2rem,7vw,3.2rem); font-weight: 700; color: var(--pr); letter-spacing: 0.06em; text-transform: uppercase; text-shadow: 0 0 30px rgba(255,197,116,0.2); }
.hero-dark-body .tagline { font-size: 0.82rem; color: var(--sx); margin-top: 8px; letter-spacing: 0.06em; }
.hero-dark-meta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; font-size: 0.75rem; color: var(--sx); }
.hero-dark-meta span { display: flex; align-items: center; gap: 4px; }

/* Search + Nav */
.nav-bar { position: sticky; top: 54px; z-index: 100; background: rgba(17,19,23,0.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,197,116,0.06); padding: 10px 0 8px; }
.search-row { padding: 0 clamp(12px,4vw,32px); margin-bottom: 8px; }
.search-box { position: relative; }
.search-box svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 14px; height: 14px; opacity: 0.3; pointer-events: none; }
.search-input { width: 100%; padding: 9px 14px 9px 36px; border-radius: var(--r); border: 1px solid rgba(255,197,116,0.1); background: rgba(29,33,40,0.8); color: var(--tx); font-size: 0.82rem; font-family: var(--fb); outline: none; transition: all 0.2s; }
.search-input:focus { border-color: var(--pr); box-shadow: 0 0 12px rgba(255,197,116,0.08); }
.cat-tabs { display: flex; gap: 6px; padding: 0 clamp(12px,4vw,32px); overflow-x: auto; scrollbar-width: none; }
.cat-tabs::-webkit-scrollbar { display: none; }
.cat-tab { flex-shrink: 0; white-space: nowrap; padding: 6px 14px; border-radius: var(--r); border: 1px solid rgba(255,197,116,0.08); background: rgba(29,33,40,0.5); color: var(--sx); font-size: 0.76rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: var(--fb); }
.cat-tab:hover { border-color: rgba(255,197,116,0.25); color: var(--pr); }
.cat-tab.active { background: rgba(255,197,116,0.12); color: var(--pr); border-color: rgba(255,197,116,0.3); }

.main { padding-bottom: 60px; }

/* Category */
.cat-section { padding: clamp(28px,5vw,44px) clamp(12px,4vw,32px) 0; scroll-margin-top: 110px; }
.cat-head { padding-bottom: 10px; margin-bottom: 16px; border-bottom: 1px solid rgba(255,197,116,0.08); }
.cat-head::after { content: ''; display: block; width: 30px; height: 2px; background: var(--pr); margin-top: 8px; box-shadow: 0 0 8px rgba(255,197,116,0.3); }
.cat-title { font-family: var(--fh); font-size: clamp(1.1rem,3.5vw,1.5rem); font-weight: 700; color: var(--pr); letter-spacing: 0.06em; text-transform: uppercase; }
.cat-desc { font-size: 0.78rem; color: var(--sx); font-style: italic; margin-top: 4px; }

/* GLOW GLASS CARD LAYOUT */
.dish-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 600px) { .dish-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }
.dish-card { background: var(--cd); border-radius: var(--r); border: 1px solid rgba(255,197,116,0.06); box-shadow: var(--sh); overflow: hidden; display: flex; flex-direction: column; transition: all 0.25s; position: relative; }
.dish-card:hover { border-color: rgba(255,197,116,0.18); box-shadow: 0 0 24px rgba(255,197,116,0.08), 0 4px 16px rgba(0,0,0,0.2); transform: translateY(-3px); }
.dish-card.has-img .dish-img-wrap { width: 100%; aspect-ratio: 16/10; overflow: hidden; }
.dish-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; filter: brightness(0.9); }
.dish-card:hover .dish-img-wrap img { transform: scale(1.04); filter: brightness(1); }
.dish-body { padding: 14px 16px; }
.dish-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.dish-name { font-family: var(--fh); font-size: clamp(0.88rem,2.4vw,1rem); font-weight: 700; color: var(--tx); letter-spacing: 0.02em; flex: 1; }
.dish-price { font-size: 0.95rem; font-weight: 800; color: var(--pr); white-space: nowrap; }
.dish-desc { font-size: 0.74rem; color: var(--sx); line-height: 1.55; margin-top: 5px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

/* Chef */
.chef-section { padding: clamp(24px,5vw,36px) clamp(12px,4vw,32px) 0; }
.section-title { font-family: var(--fh); font-size: clamp(1rem,3vw,1.3rem); font-weight: 700; color: var(--pr); display: flex; align-items: center; gap: 8px; letter-spacing: 0.04em; text-transform: uppercase; }
.section-sub { font-size: 0.76rem; color: var(--sx); margin-top: 3px; font-style: italic; }
.chef-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(220px,100%),1fr)); gap: 12px; margin-top: 14px; }
.chef-card { background: var(--cd); border-radius: var(--r); border: 1px solid rgba(255,197,116,0.06); box-shadow: var(--sh); overflow: hidden; transition: all 0.25s; }
.chef-card:hover { border-color: rgba(255,197,116,0.15); box-shadow: 0 0 20px rgba(255,197,116,0.06); }
.chef-card-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; filter: brightness(0.9); }
.chef-card-img-placeholder { width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, rgba(255,197,116,0.15), rgba(244,163,0,0.08)); display: flex; align-items: center; justify-content: center; }
.chef-card-body { padding: 12px 14px; }
.chef-card-name { font-family: var(--fh); font-size: 0.95rem; font-weight: 700; color: var(--tx); letter-spacing: 0.02em; margin-bottom: 3px; }
.chef-card-desc { font-size: 0.74rem; color: var(--sx); line-height: 1.5; margin-bottom: 6px; }
.chef-card-foot { display: flex; align-items: center; justify-content: space-between; }
.chef-card-price { font-size: 0.95rem; font-weight: 800; color: var(--pr); }

/* Footer */
.footer { background: var(--cd); border-top: 1px solid rgba(255,197,116,0.06); padding: clamp(28px,6vw,48px) clamp(14px,4vw,32px); }
.footer-name { font-family: var(--fh); font-size: 1.15rem; font-weight: 700; color: var(--pr); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 4px; }
.footer .powered-link { background: rgba(255,197,116,0.06); border-color: rgba(255,197,116,0.1); }
.footer .powered-dot { background: var(--pr); color: #111317; }

/* Dark theme badge overrides */
.bv  { background: rgba(22,163,74,0.1); border-color: rgba(22,163,74,0.25); }
.bnv { background: rgba(220,38,38,0.1); border-color: rgba(220,38,38,0.25); }
.be  { background: rgba(217,119,6,0.1); border-color: rgba(217,119,6,0.25); }
.bvg { background: rgba(5,150,105,0.1); border-color: rgba(5,150,105,0.25); }
.bsp { background: rgba(225,29,72,0.1); border-color: rgba(225,29,72,0.25); }
.bbs { background: rgba(217,119,6,0.1); border-color: rgba(217,119,6,0.25); }
.bch { background: rgba(124,58,237,0.1); border-color: rgba(124,58,237,0.25); }
.notice { background: rgba(255,251,235,0.05); border-color: rgba(253,230,138,0.12); color: #fbbf24; }
`;
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                    MASTER CSS GENERATOR                                 ║
// ╚════════════════════════════════════════════════════════════════════════════╝
export function generateCSS(theme: ThemeConfig): string {
  const base = generateBaseCSS(theme);
  switch (theme.id) {
    case 'minimal':     return base + cssMinimal();
    case 'luxury':      return base + cssLuxury();
    case 'traditional': return base + cssTraditional();
    case 'modern':      return base + cssModern();
    case 'street':      return base + cssStreet();
    case 'dark':        return base + cssDark();
    default:            return base + cssMinimal();
  }
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                    JS GENERATOR (shared)                                ║
// ╚════════════════════════════════════════════════════════════════════════════╝
export function generateJS(): string {
  return `
(function() {
  function initMenu() {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.06 });
      document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
    } else {
      document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    }

    const si = document.getElementById('search-input');
    const sections = document.querySelectorAll('.cat-section');
    if (si) {
      si.addEventListener('input', function() {
        const q = this.value.toLowerCase().trim();
        sections.forEach(sec => {
          const dishes = sec.querySelectorAll('[data-dish], .dish-card, .dish-row');
          let visibleCount = 0;
          dishes.forEach(dish => {
            const text = (dish.textContent || '').toLowerCase();
            const match = !q || text.includes(q);
            dish.setAttribute('style', match ? '' : 'display: none !important');
            if (match) visibleCount++;
          });
          const nr = sec.querySelector('.no-results');
          if (nr) nr.setAttribute('style', (!visibleCount && q) ? 'display: block' : 'display: none');
          sec.setAttribute('style', (!visibleCount && q) ? 'display: none' : '');
        });
      });
    }

    const tabs = document.querySelectorAll('.cat-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const targetId = this.getAttribute('data-target');
        if (targetId) {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    if ('IntersectionObserver' in window) {
      const sio = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = e.target.id;
            tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-target') === id));
          }
        });
      }, { threshold: 0.2, rootMargin: '-80px 0px -55% 0px' });
      sections.forEach(s => sio.observe(s));
    }
  }

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initMenu();
  } else {
    document.addEventListener('DOMContentLoaded', initMenu);
  }
})();
`;
}

export function generateManifest(menu: MenuData): string {
  return JSON.stringify({
    name: menu.restaurant.name,
    short_name: menu.restaurant.name,
    start_url: './index.html',
    display: 'standalone',
    background_color: menu.theme.bgColor || '#ffffff',
    theme_color: menu.theme.primaryColor || '#1b1c1a',
    description: menu.restaurant.tagline || 'Digital Restaurant Menu',
  }, null, 2);
}

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║               THEME-SPECIFIC HTML BUILDERS                              ║
// ╚════════════════════════════════════════════════════════════════════════════╝

// ── Badge builder ──
function badges(item: any): string {
  const parts: string[] = [];
  if (item.tags?.includes('vegan'))      parts.push(`<span class="badge bvg">${SVG.vegan} Vegan</span>`);
  else if (item.tags?.includes('egg'))   parts.push(`<span class="badge be">${SVG.egg} Egg</span>`);
  else if (item.isNonVeg)                parts.push(`<span class="badge bnv">${SVG.nonveg} Non-Veg</span>`);
  else if (item.isVeg)                   parts.push(`<span class="badge bv">${SVG.veg} Veg</span>`);
  if (item.isSpicy)       parts.push(`<span class="badge bsp">${SVG.spicy} Spicy</span>`);
  if (item.isBestseller)  parts.push(`<span class="badge bbs">${SVG.star} Bestseller</span>`);
  if (item.isChefSpecial) parts.push(`<span class="badge bch">${SVG.chef} Chef's Special</span>`);
  return parts.join('');
}

// ── MINIMAL: List-style row ──
function dishMinimal(item: any, cur: string): string {
  return `
<div class="dish-row" data-dish>
  ${item.image ? `<img src="${item.image}" alt="${item.name}" class="dish-row-img" loading="lazy">` : ''}
  <div class="dish-row-body">
    <div class="dish-row-top">
      <span class="dish-row-name">${item.name || 'Dish'}</span>
      <span class="dish-row-dots"></span>
      <span class="dish-row-price">${cur}${item.price || '0'}</span>
    </div>
    ${item.description ? `<p class="dish-row-desc">${item.description}</p>` : ''}
    <div class="badges">${badges(item)}</div>
  </div>
</div>`;
}

// ── STANDARD: Card layout (luxury, modern, street, dark) ──
function dishCard(item: any, cur: string): string {
  const hasImg = !!item.image;
  return `
<div class="dish-card${hasImg ? ' has-img' : ''}" data-dish>
  ${hasImg ? `<div class="dish-img-wrap"><img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async"></div>` : ''}
  <div class="dish-body">
    <div class="dish-name">${item.name || 'Dish'}</div>
    ${item.description ? `<p class="dish-desc">${item.description}</p>` : ''}
    <div class="dish-foot">
      <span class="dish-price">${cur}${item.price || '0'}</span>
      <div class="badges">${badges(item)}</div>
    </div>
  </div>
</div>`;
}

// ── TRADITIONAL: Horizontal card (image left) ──
function dishTraditional(item: any, cur: string): string {
  const hasImg = !!item.image;
  return `
<div class="dish-card${hasImg ? ' has-img' : ''}" data-dish>
  ${hasImg ? `<div class="dish-img-wrap"><img src="${item.image}" alt="${item.name}" loading="lazy"></div>` : ''}
  <div class="dish-body">
    <div class="dish-name">${item.name || 'Dish'}</div>
    ${item.description ? `<p class="dish-desc">${item.description}</p>` : ''}
    <div class="dish-foot">
      <span class="dish-price">${cur}${item.price || '0'}</span>
      <div class="badges">${badges(item)}</div>
    </div>
  </div>
</div>`;
}


// ── Header builders per theme ──
function headerMinimal(r: any): string {
  if (r.bannerUrl) {
    return `
<div class="hero-minimal fade-up"><img src="${r.bannerUrl}" alt="${r.name}"><div class="hero-minimal-overlay"></div></div>
<div class="header-section">
  <h1>${r.name}</h1>
  ${r.tagline ? `<p class="tagline">${r.tagline}</p>` : ''}
  <div class="meta-line">
    ${r.address ? `<span>${SVG.pin} ${r.address}</span>` : ''}
    ${r.phone ? `<span>${SVG.phone} ${r.phone}</span>` : ''}
  </div>
</div>`;
  }
  return `
<div class="header-section">
  <h1>${r.name}</h1>
  ${r.tagline ? `<p class="tagline">${r.tagline}</p>` : ''}
  <div class="meta-line">
    ${r.address ? `<span>${SVG.pin} ${r.address}</span>` : ''}
    ${r.phone ? `<span>${SVG.phone} ${r.phone}</span>` : ''}
  </div>
</div>`;
}

function headerLuxury(r: any): string {
  if (r.bannerUrl) {
    return `
<div class="hero-luxury fade-up">
  <img src="${r.bannerUrl}" alt="${r.name}">
  <div class="hero-luxury-overlay"></div>
  <div class="hero-luxury-body">
    <h1>${r.name}</h1>
    ${r.tagline ? `<p class="tagline">${r.tagline}</p>` : ''}
  </div>
</div>`;
  }
  return `
<div class="header-section fade-up">
  <h1>${r.name}</h1>
  ${r.tagline ? `<p class="tagline">${r.tagline}</p>` : ''}
  <div class="meta-line">
    ${r.address ? `<span>${SVG.pin} ${r.address}</span>` : ''}
    ${r.phone ? `<span>${SVG.phone} ${r.phone}</span>` : ''}
  </div>
</div>`;
}

function headerTraditional(r: any): string {
  if (r.bannerUrl) {
    return `
<div class="hero-trad fade-up">
  <img src="${r.bannerUrl}" alt="${r.name}">
  <div class="hero-trad-overlay"></div>
  <div class="hero-trad-body">
    <div class="ornament"></div>
    <h1>${r.name}</h1>
    ${r.tagline ? `<p class="tagline">${r.tagline}</p>` : ''}
    <div class="hero-trad-meta">
      ${r.address ? `<span>${SVG.pin} ${r.address}</span>` : ''}
      ${r.phone ? `<span>${SVG.phone} ${r.phone}</span>` : ''}
    </div>
  </div>
</div>`;
  }
  return `
<div class="header-trad fade-up">
  <h1>${r.name}</h1>
  ${r.tagline ? `<p class="tagline">${r.tagline}</p>` : ''}
  <div class="meta-line">
    ${r.address ? `<span>${SVG.pin} ${r.address}</span>` : ''}
    ${r.phone ? `<span>${SVG.phone} ${r.phone}</span>` : ''}
  </div>
</div>`;
}

function headerModern(r: any): string {
  if (r.bannerUrl) {
    return `
<div class="hero-modern fade-up">
  <img src="${r.bannerUrl}" alt="${r.name}">
  <div class="hero-modern-overlay"></div>
  <div class="hero-modern-body">
    <div class="hero-modern-card">
      <h1>${r.name}</h1>
      ${r.tagline ? `<p class="tagline">${r.tagline}</p>` : ''}
      <div class="meta-line">
        ${r.address ? `<span>${SVG.pin} ${r.address}</span>` : ''}
        ${r.phone ? `<span>${SVG.phone} ${r.phone}</span>` : ''}
      </div>
    </div>
  </div>
</div>`;
  }
  return `
<div class="header-glass fade-up">
  <div class="header-glass-inner">
    <h1>${r.name}</h1>
    ${r.tagline ? `<p class="tagline">${r.tagline}</p>` : ''}
    <div class="meta-line">
      ${r.address ? `<span>${SVG.pin} ${r.address}</span>` : ''}
      ${r.phone ? `<span>${SVG.phone} ${r.phone}</span>` : ''}
    </div>
  </div>
</div>`;
}

function headerStreet(r: any): string {
  if (r.bannerUrl) {
    return `
<div class="hero-street fade-up">
  <img src="${r.bannerUrl}" alt="${r.name}">
  <div class="hero-street-overlay"></div>
  <div class="hero-street-body">
    <h1>${r.name}</h1>
    ${r.tagline ? `<p class="tagline">${r.tagline}</p>` : ''}
    <div class="hero-street-meta">
      ${r.address ? `<span>${SVG.pin} ${r.address}</span>` : ''}
      ${r.phone ? `<span>${SVG.phone} ${r.phone}</span>` : ''}
    </div>
  </div>
</div>`;
  }
  return `
<div class="header-street fade-up">
  <h1>${r.name}</h1>
  ${r.tagline ? `<p class="tagline">${r.tagline}</p>` : ''}
  <div class="meta-line">
    ${r.address ? `<span>${SVG.pin} ${r.address}</span>` : ''}
    ${r.phone ? `<span>${SVG.phone} ${r.phone}</span>` : ''}
  </div>
</div>`;
}

function headerDark(r: any): string {
  if (r.bannerUrl) {
    return `
<div class="hero-dark fade-up">
  <img src="${r.bannerUrl}" alt="${r.name}">
  <div class="hero-dark-overlay"></div>
  <div class="hero-dark-body">
    <h1>${r.name}</h1>
    ${r.tagline ? `<p class="tagline">${r.tagline}</p>` : ''}
    <div class="hero-dark-meta">
      ${r.address ? `<span>${SVG.pin} ${r.address}</span>` : ''}
      ${r.phone ? `<span>${SVG.phone} ${r.phone}</span>` : ''}
    </div>
  </div>
</div>`;
  }
  return `
<div class="header-dark fade-up">
  <div class="header-dark-inner">
    <h1>${r.name}</h1>
    ${r.tagline ? `<p class="tagline">${r.tagline}</p>` : ''}
    <div class="meta-line">
      ${r.address ? `<span>${SVG.pin} ${r.address}</span>` : ''}
      ${r.phone ? `<span>${SVG.phone} ${r.phone}</span>` : ''}
    </div>
  </div>
</div>`;
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                    MASTER HTML GENERATOR                                ║
// ╚════════════════════════════════════════════════════════════════════════════╝
export function generateStandaloneHtml(menu: MenuData): string {
  const css = generateCSS(menu.theme);
  const js = generateJS();
  const r = menu.restaurant;
  const themeId = menu.theme.id;
  const cur = r.currency || '₹';

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": r.name,
    "description": r.tagline,
    "address": r.address,
    "telephone": r.phone,
    "priceRange": cur,
    "hasMenu": {
      "@type": "Menu",
      "name": `${r.name} Digital Menu`,
      "hasMenuSection": menu.categories.map(cat => ({
        "@type": "MenuSection",
        "name": cat.name,
        "description": cat.description,
        "hasMenuItem": cat.items.map(item => ({
          "@type": "MenuItem",
          "name": item.name,
          "description": item.description,
          "offers": { "@type": "Offer", "price": item.price, "priceCurrency": "INR" }
        }))
      }))
    }
  };

  // ── Dish renderer per theme ──
  const renderDish = (item: any) => {
    switch (themeId) {
      case 'minimal':     return dishMinimal(item, cur);
      case 'traditional': return dishTraditional(item, cur);
      default:            return dishCard(item, cur);
    }
  };

  // ── Dish grid container class per theme ──
  const dishGridClass = themeId === 'minimal' ? 'dish-list' : 'dish-grid';

  // ── Chef section ──
  const chefItems = menu.categories.flatMap(cat => cat.items).filter(item => item.isChefSpecial || item.isBestseller);

  let chefSection = '';
  if (chefItems.length > 0) {
    if (themeId === 'minimal') {
      // Minimal: horizontal scroll pills
      chefSection = `
<section class="chef-section fade-up">
  <div class="section-title">${SVG.award} Chef Recommends</div>
  <p class="section-sub">Handpicked favourites by our kitchen</p>
  <div class="chef-scroll">
    ${chefItems.map(item => `
    <div class="chef-pill">
      ${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<div class="chef-pill-placeholder">${SVG.award}</div>`}
      <div class="chef-pill-info">
        <span class="chef-pill-name">${item.name}</span>
        <span class="chef-pill-price">${cur}${item.price}</span>
      </div>
    </div>`).join('')}
  </div>
</section>`;
    } else {
      // All other themes: grid cards
      chefSection = `
<section class="chef-section fade-up">
  <div class="section-title">${SVG.award} Chef Recommends</div>
  <p class="section-sub">Handpicked favourites by our kitchen team</p>
  <div class="chef-grid">
    ${chefItems.map(item => `
    <div class="chef-card">
      ${item.image
        ? `<img src="${item.image}" alt="${item.name}" class="chef-card-img" loading="lazy">`
        : `<div class="chef-card-img-placeholder">${SVG.award}</div>`
      }
      <div class="chef-card-body">
        <div class="chef-card-name">${item.name}</div>
        ${item.description ? `<p class="chef-card-desc">${item.description}</p>` : ''}
        <div class="chef-card-foot">
          <span class="chef-card-price">${cur}${item.price}</span>
          <div class="badges">${badges(item)}</div>
        </div>
      </div>
    </div>`).join('')}
  </div>
</section>`;
    }
  }

  // ── Category sections ──
  const catSections = menu.categories.map(cat => `
<section class="cat-section fade-up" id="cat-${cat.id}">
  <div class="cat-head">
    <h2 class="cat-title">${cat.name}</h2>
    ${cat.description ? `<p class="cat-desc">${cat.description}</p>` : ''}
  </div>
  <div class="${dishGridClass}">
    ${cat.items.length > 0
      ? cat.items.map(renderDish).join('')
      : `<p style="color:var(--sx);font-style:italic;font-size:0.85rem;grid-column:1/-1;padding:16px 0;">No items yet.</p>`
    }
    <p class="no-results">No matching dishes in this section.</p>
  </div>
</section>`).join('');

  // ── Header per theme ──
  let headerHtml = '';
  switch (themeId) {
    case 'minimal':     headerHtml = headerMinimal(r); break;
    case 'luxury':      headerHtml = headerLuxury(r); break;
    case 'traditional': headerHtml = headerTraditional(r); break;
    case 'modern':      headerHtml = headerModern(r); break;
    case 'street':      headerHtml = headerStreet(r); break;
    case 'dark':        headerHtml = headerDark(r); break;
    default:            headerHtml = headerMinimal(r);
  }

  // ── Font imports ──
  const fontImports = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=EB+Garamond:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Cinzel:wght@400..900&family=Sora:wght@300..700&family=Bebas+Neue&family=Manrope:wght@300..700&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <title>${r.name} — Menu</title>
  <meta name="description" content="${r.tagline || r.name + ' digital menu'}">
  <meta name="theme-color" content="${menu.theme.primaryColor || '#1b1c1a'}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${r.name} Menu">
  <meta property="og:description" content="${r.tagline || 'Browse our full digital menu'}">
  ${r.bannerUrl ? `<meta property="og:image" content="${r.bannerUrl}">` : ''}
  ${fontImports}
  <script type="application/ld+json">${JSON.stringify(schemaJsonLd)}</script>
  <style>${css}</style>
</head>
<body>

<!-- Top sticky bar -->
<header class="topbar">
  <div class="topbar-inner">
    <span class="topbar-name">
      ${r.logoUrl ? `<img src="${r.logoUrl}" alt="${r.name}" class="topbar-logo">` : ''}
      <span>${r.name}</span>
    </span>
    ${r.phone ? `<span class="topbar-contact">${SVG.phone} ${r.phone}</span>` : ''}
  </div>
</header>

${headerHtml}

${r.notice ? `<div class="notice">${SVG.notice} <span>${r.notice}</span></div>` : ''}

<!-- Search + Category Nav -->
<nav class="nav-bar">
  <div class="search-row">
    <div class="search-box">
      ${SVG.search}
      <input type="search" id="search-input" class="search-input" placeholder="Search dishes, ingredients..." autocomplete="off">
    </div>
  </div>
  <div class="cat-tabs" role="tablist">
    ${menu.categories.map((cat, i) =>
      `<button class="cat-tab${i === 0 ? ' active' : ''}" data-target="cat-${cat.id}" role="tab">${cat.name}</button>`
    ).join('')}
  </div>
</nav>

<!-- Main content -->
<main class="main">
  ${menu.categories.length === 0
    ? `<div class="empty">No menu items added yet.</div>`
    : chefSection + catSections
  }
</main>

<!-- Footer -->
<footer class="footer">
  <div class="footer-name">${r.name}</div>
  ${r.tagline ? `<p style="font-size:0.82rem;color:var(--sx);">${r.tagline}</p>` : ''}
  <p class="footer-copy">&copy; ${new Date().getFullYear()} ${r.name}. All rights reserved.</p>
  ${r.showBranding !== false ? `
  <a href="${r.brandingUrl || 'https://bookmydineqr.vercel.app/'}" target="_blank" rel="noopener noreferrer" class="powered-link">
    <span class="powered-dot">B</span>
    <span>${r.brandingText || 'Powered by BookMyDine'}</span>
  </a>` : ''}
</footer>

<script>${js}</script>
</body>
</html>`;
}


// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                    DOWNLOAD HELPERS                                     ║
// ╚════════════════════════════════════════════════════════════════════════════╝
export function downloadStandaloneHtmlFile(menu: MenuData): void {
  const htmlContent = generateStandaloneHtml(menu);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `menu-${menu.slug || 'export'}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadPackageFiles(menu: MenuData): void {
  downloadStandaloneHtmlFile(menu);
  setTimeout(() => {
    const cssBlob = new Blob([generateCSS(menu.theme)], { type: 'text/css;charset=utf-8' });
    const cssUrl = URL.createObjectURL(cssBlob);
    const cssLink = document.createElement('a');
    cssLink.href = cssUrl; cssLink.download = 'styles.css';
    document.body.appendChild(cssLink); cssLink.click();
    document.body.removeChild(cssLink); URL.revokeObjectURL(cssUrl);
  }, 300);
  setTimeout(() => {
    const jsBlob = new Blob([generateJS()], { type: 'text/javascript;charset=utf-8' });
    const jsUrl = URL.createObjectURL(jsBlob);
    const jsLink = document.createElement('a');
    jsLink.href = jsUrl; jsLink.download = 'script.js';
    document.body.appendChild(jsLink); jsLink.click();
    document.body.removeChild(jsLink); URL.revokeObjectURL(jsUrl);
  }, 600);
}
