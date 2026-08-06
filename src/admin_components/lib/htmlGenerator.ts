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

// ─── CSS Generator ─────────────────────────────────────────────────────────────
export function generateCSS(theme: ThemeConfig): string {
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

/* ── Responsive wrapper ── */
.wrap {
  width: 100%;
  max-width: min(860px, 100%);
  margin: 0 auto;
  padding: 0 clamp(12px, 4vw, 32px);
}

/* ── Sticky Top Bar ── */
.topbar {
  position: sticky;
  top: 0;
  z-index: 200;
  background: var(--cd);
  border-bottom: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
}
.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px clamp(12px, 4vw, 32px);
  max-width: min(860px, 100%);
  margin: 0 auto;
}
.topbar-name {
  font-family: var(--fh);
  font-size: clamp(1rem, 3.5vw, 1.25rem);
  font-weight: 700;
  color: var(--pr);
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 55vw;
  display: flex;
  align-items: center;
  gap: 6px;
}
.topbar-contact {
  font-size: clamp(0.68rem, 2vw, 0.78rem);
  font-weight: 600;
  color: var(--sx);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

/* ── Hero Banner ── */
.hero {
  position: relative;
  width: 100%;
  height: clamp(180px, 40vw, 320px);
  overflow: hidden;
  background: var(--pr);
}
.hero img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 55%, transparent 100%);
}
.hero-body {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: clamp(14px,4vw,28px);
  color: #fff;
}
.hero-sub {
  font-size: clamp(0.6rem, 1.8vw, 0.72rem);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.78;
  margin-bottom: 5px;
}
.hero-title {
  font-family: var(--fh);
  font-size: clamp(1.4rem, 5.5vw, 2.4rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 8px;
}
.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: clamp(0.68rem, 2vw, 0.78rem);
  opacity: 0.84;
}
.hero-meta-item { display: flex; align-items: center; gap: 4px; }

/* ── Text header (no banner) ── */
.text-header {
  background: var(--cd);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  text-align: center;
  padding: clamp(24px,6vw,48px) clamp(14px,4vw,32px);
}
.text-header h1 {
  font-family: var(--fh);
  font-size: clamp(1.6rem, 6vw, 2.5rem);
  font-weight: 800;
  color: var(--pr);
  line-height: 1.2;
}
.text-header .tagline {
  font-size: clamp(0.8rem, 2.5vw, 0.95rem);
  color: var(--sx);
  margin-top: 6px;
}
.meta-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 7px; margin-top: 12px; }
.meta-chip {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: clamp(0.68rem, 2vw, 0.78rem);
  background: var(--bg);
  border: 1px solid rgba(0,0,0,0.1);
  padding: 4px 12px;
  border-radius: 9999px;
  color: var(--tx);
}

/* ── Notice Banner ── */
.notice {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 10px clamp(12px,4vw,32px);
  padding: 10px 14px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: var(--r);
  font-size: clamp(0.74rem, 2vw, 0.82rem);
  font-weight: 600;
  color: #92400e;
  line-height: 1.5;
}
.notice svg { flex-shrink: 0; margin-top: 1px; }

/* ── Sticky Search + Category Nav ── */
.nav-bar {
  position: sticky;
  top: 52px;
  z-index: 100;
  background: var(--bg);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  padding: 10px 0 8px;
}
.search-row {
  padding: 0 clamp(12px,4vw,32px);
  margin-bottom: 8px;
}
.search-box {
  position: relative;
}
.search-box svg {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px; height: 15px;
  opacity: 0.4;
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 9px 14px 9px 34px;
  border-radius: var(--r);
  border: 1.5px solid rgba(0,0,0,0.13);
  background: var(--cd);
  color: var(--tx);
  font-size: clamp(0.8rem, 2.5vw, 0.88rem);
  font-family: var(--fb);
  outline: none;
  transition: border-color 0.2s;
  -webkit-appearance: none;
}
.search-input:focus { border-color: var(--pr); }

/* Category scroll tabs */
.cat-tabs {
  display: flex;
  gap: 7px;
  padding: 0 clamp(12px,4vw,32px);
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.cat-tabs::-webkit-scrollbar { display: none; }
.cat-tab {
  flex-shrink: 0;
  white-space: nowrap;
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1.5px solid rgba(0,0,0,0.12);
  background: var(--cd);
  color: var(--sx);
  font-size: clamp(0.72rem, 2vw, 0.8rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
  font-family: var(--fb);
  line-height: 1;
}
.cat-tab:hover { border-color: var(--pr); color: var(--pr); }
.cat-tab.active { background: var(--pr); color: #fff; border-color: var(--pr); }

/* ── Main container ── */
.main { padding-bottom: 60px; }

/* ── Chef Recommends Section ── */
.chef-section {
  padding: clamp(20px,5vw,32px) clamp(12px,4vw,32px) 0;
}
.section-head {
  margin-bottom: 14px;
}
.section-title {
  font-family: var(--fh);
  font-size: clamp(1.15rem, 3.5vw, 1.5rem);
  font-weight: 700;
  color: var(--pr);
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.3;
}
.section-sub {
  font-size: clamp(0.74rem, 2vw, 0.82rem);
  color: var(--sx);
  font-style: italic;
  margin-top: 3px;
}

/* Chef cards - horizontal scroll on mobile */
.chef-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));
  gap: 12px;
}
.chef-card {
  background: var(--cd);
  border-radius: var(--r);
  border: 1px solid rgba(0,0,0,0.07);
  box-shadow: var(--sh);
  overflow: hidden;
  transition: transform 0.18s ease;
}
.chef-card:hover { transform: translateY(-2px); }
.chef-card-img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}
.chef-card-img-placeholder {
  width: 100%;
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, var(--pr) 0%, var(--sc) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.chef-card-body {
  padding: 12px 14px;
}
.chef-card-name {
  font-family: var(--fh);
  font-size: clamp(0.95rem, 2.8vw, 1.05rem);
  font-weight: 700;
  color: var(--tx);
  margin-bottom: 3px;
}
.chef-card-desc {
  font-size: clamp(0.72rem, 2vw, 0.8rem);
  color: var(--sx);
  line-height: 1.5;
  margin-bottom: 8px;
}
.chef-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.chef-card-price {
  font-size: clamp(0.92rem, 2.5vw, 1rem);
  font-weight: 800;
  color: var(--pr);
}

/* ── Category Section ── */
.cat-section {
  padding: clamp(24px,5vw,36px) clamp(12px,4vw,32px) 0;
  scroll-margin-top: 110px;
}
.cat-head {
  padding-bottom: 10px;
  border-bottom: 2px solid var(--ac);
  margin-bottom: 14px;
}
.cat-title {
  font-family: var(--fh);
  font-size: clamp(1.15rem, 3.8vw, 1.5rem);
  font-weight: 700;
  color: var(--pr);
  line-height: 1.25;
}
.cat-desc {
  font-size: clamp(0.74rem, 2vw, 0.82rem);
  color: var(--sx);
  line-height: 1.55;
  font-style: italic;
  margin-top: 4px;
}

/* ── Dish Grid — TRULY RESPONSIVE ── */
/* Mobile first: always 1 column (up to 600px) */
.dish-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}
/* Tablet+: 2 columns only above 600px viewport */
@media (min-width: 600px) {
  .dish-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
}
@media (min-width: 860px) {
  .dish-grid { gap: 14px; }
}

/* ── Dish Card ── */
.dish-card {
  background: var(--cd);
  border-radius: var(--r);
  border: 1px solid rgba(0,0,0,0.07);
  box-shadow: var(--sh);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  min-height: 0;
  position: relative;
}
.dish-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 18px rgba(0,0,0,0.12);
}

/* Card with image: image on top, info below */
.dish-card.has-img {
  flex-direction: column;
}
.dish-img-wrap {
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  flex-shrink: 0;
}
.dish-img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}
.dish-card:hover .dish-img-wrap img { transform: scale(1.04); }

.dish-body {
  padding: 11px 13px 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
}

/* Name + price always on same line */
.dish-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}
.dish-name {
  font-family: var(--fh);
  font-size: clamp(0.88rem, 2.6vw, 1rem);
  font-weight: 700;
  color: var(--tx);
  line-height: 1.3;
  flex: 1;
  min-width: 0;
}
.dish-price {
  font-size: clamp(0.88rem, 2.4vw, 1rem);
  font-weight: 800;
  color: var(--pr);
  white-space: nowrap;
  flex-shrink: 0;
}

.dish-desc {
  font-size: clamp(0.7rem, 1.9vw, 0.78rem);
  color: var(--sx);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

/* Badges */
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: clamp(0.6rem, 1.7vw, 0.67rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 4px;
  border: 1px solid;
  white-space: nowrap;
  line-height: 1.4;
}
.badge svg { flex-shrink: 0; }
.bv  { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
.bnv { background: #fef2f2; color: #b91c1c; border-color: #fecaca; }
.be  { background: #fffbeb; color: #92400e; border-color: #fde68a; }
.bvg { background: #ecfdf5; color: #065f46; border-color: #a7f3d0; }
.bsp { background: #fff1f2; color: #be123c; border-color: #fda4af; }
.bbs { background: #fef9c3; color: #854d0e; border-color: #fde047; }
.bch { background: #ede9fe; color: #5b21b6; border-color: #c4b5fd; }

/* ── No results ── */
.no-results {
  display: none;
  text-align: center;
  padding: 28px 0;
  color: var(--sx);
  font-size: 0.85rem;
  font-style: italic;
  grid-column: 1 / -1;
}
.empty { text-align: center; padding: 60px 20px; color: var(--sx); font-size: 0.9rem; }

/* ── Footer ── */
.footer {
  background: var(--cd);
  border-top: 1px solid rgba(0,0,0,0.07);
  padding: clamp(28px,6vw,48px) clamp(14px,4vw,32px);
  text-align: center;
  margin-top: 28px;
}
.footer-name {
  font-family: var(--fh);
  font-size: clamp(1.1rem, 3.5vw, 1.4rem);
  font-weight: 700;
  color: var(--pr);
  margin-bottom: 6px;
}
.footer-copy {
  font-size: clamp(0.66rem, 1.8vw, 0.76rem);
  color: var(--sx);
  margin-top: 8px;
}
.powered-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  padding: 6px 16px;
  border-radius: 9999px;
  border: 1px solid rgba(0,0,0,0.1);
  background: var(--bg);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--pr);
  transition: opacity 0.2s;
}
.powered-link:hover { opacity: 0.72; }
.powered-dot {
  width: 16px; height: 16px;
  border-radius: 50%;
  background: #047857;
  color: #fff;
  font-size: 9px;
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* ── Fade up animation ── */
.fade-up {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.fade-up.visible { opacity: 1; transform: none; }

/* ── Hidden card (search) ── */
.dish-card[hidden] { display: none !important; }

/* ── Section hidden by search ── */
.cat-section.search-hidden { display: none; }
`;
}

// ─── JS Generator ────────────────────────────────────────────────────────────────
export function generateJS(): string {
  return `
document.addEventListener('DOMContentLoaded', () => {
  // Fade-up observer
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.06 });
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  // Search
  const si = document.getElementById('search-input');
  const sections = document.querySelectorAll('.cat-section');
  if (si) {
    si.addEventListener('input', () => {
      const q = si.value.toLowerCase().trim();
      sections.forEach(sec => {
        const cards = sec.querySelectorAll('.dish-card');
        let any = false;
        cards.forEach(card => {
          const m = !q || card.textContent.toLowerCase().includes(q);
          card.toggleAttribute('hidden', !m);
          if (m) any = true;
        });
        const nr = sec.querySelector('.no-results');
        if (nr) nr.style.display = (!any && q) ? 'block' : 'none';
        sec.classList.toggle('search-hidden', !any && !!q);
      });
    });
  }

  // Tab navigation
  const tabs = document.querySelectorAll('.cat-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const id = tab.getAttribute('data-target');
      if (id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Auto-highlight tab on scroll
  const sio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-target') === id));
      }
    });
  }, { threshold: 0.2, rootMargin: '-80px 0px -55% 0px' });
  sections.forEach(s => sio.observe(s));
});
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

// ─── HTML Generator ─────────────────────────────────────────────────────────────
export function generateStandaloneHtml(menu: MenuData): string {
  const css = generateCSS(menu.theme);
  const js = generateJS();
  const r = menu.restaurant;
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

  // ── Badge builder (SVG only, no emoji) ──
  const badges = (item: any) => {
    const parts: string[] = [];
    if (item.tags?.includes('vegan')) {
      parts.push(`<span class="badge bvg">${SVG.vegan} Vegan</span>`);
    } else if (item.tags?.includes('egg')) {
      parts.push(`<span class="badge be">${SVG.egg} Egg</span>`);
    } else if (item.isNonVeg) {
      parts.push(`<span class="badge bnv">${SVG.nonveg} Non-Veg</span>`);
    } else if (item.isVeg) {
      parts.push(`<span class="badge bv">${SVG.veg} Veg</span>`);
    }
    if (item.isSpicy)       parts.push(`<span class="badge bsp">${SVG.spicy} Spicy</span>`);
    if (item.isBestseller)  parts.push(`<span class="badge bbs">${SVG.star} Bestseller</span>`);
    if (item.isChefSpecial) parts.push(`<span class="badge bch">${SVG.chef} Chef's Special</span>`);
    return parts.join('');
  };

  // ── Single dish card ──
  const dishCard = (item: any) => {
    const hasImg = !!item.image;
    return `
<div class="dish-card${hasImg ? ' has-img' : ''}" data-dish>
  ${hasImg ? `<div class="dish-img-wrap"><img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async"></div>` : ''}
  <div class="dish-body">
    <div class="dish-top">
      <span class="dish-name">${item.name || 'Dish'}</span>
      <span class="dish-price">${cur}${item.price || '0'}</span>
    </div>
    ${item.description ? `<p class="dish-desc">${item.description}</p>` : ''}
    <div class="badges">${badges(item)}</div>
  </div>
</div>`;
  };

  // ── Chef Recommends Section (top, filtered) ──
  const chefItems = menu.categories
    .flatMap(cat => cat.items)
    .filter(item => item.isChefSpecial || item.isBestseller);

  const chefSection = chefItems.length > 0 ? `
<!-- Chef Recommends -->
<section class="chef-section fade-up">
  <div class="section-head">
    <div class="section-title">
      ${SVG.award}
      Chef Recommends
    </div>
    <p class="section-sub">Handpicked favourites by our kitchen team</p>
  </div>
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
</section>` : '';

  // ── Category sections ──
  const catSections = menu.categories.map(cat => `
<section class="cat-section fade-up" id="cat-${cat.id}">
  <div class="cat-head">
    <h2 class="cat-title">${cat.name}</h2>
    ${cat.description ? `<p class="cat-desc">${cat.description}</p>` : ''}
  </div>
  <div class="dish-grid">
    ${cat.items.length > 0
      ? cat.items.map(dishCard).join('')
      : `<p style="color:var(--sx);font-style:italic;font-size:0.85rem;grid-column:1/-1;padding:16px 0;">No items yet.</p>`
    }
    <p class="no-results">No matching dishes in this section.</p>
  </div>
</section>`).join('');

  // ── Header ──
  const hasBanner = !!r.bannerUrl;
  const headerHtml = hasBanner ? `
<div class="hero fade-up">
  <img src="${r.bannerUrl}" alt="${r.name}">
  <div class="hero-overlay"></div>
  <div class="hero-body">
    ${r.tagline ? `<p class="hero-sub">${r.tagline}</p>` : ''}
    <h1 class="hero-title">${r.name}</h1>
    <div class="hero-meta">
      ${r.address ? `<span class="hero-meta-item">${SVG.pin} ${r.address}</span>` : ''}
      ${r.phone   ? `<span class="hero-meta-item">${SVG.phone} ${r.phone}</span>` : ''}
    </div>
  </div>
</div>` : `
<div class="text-header">
  <h1>${r.name}</h1>
  ${r.tagline ? `<p class="tagline">${r.tagline}</p>` : ''}
  <div class="meta-chips">
    ${r.address  ? `<span class="meta-chip">${SVG.pin} ${r.address}</span>` : ''}
    ${r.phone    ? `<span class="meta-chip">${SVG.phone} ${r.phone}</span>` : ''}
    ${r.wifiSsid ? `<span class="meta-chip">${SVG.wifi} Wi-Fi: ${r.wifiSsid}</span>` : ''}
  </div>
</div>`;

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
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=EB+Garamond:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
  <script type="application/ld+json">${JSON.stringify(schemaJsonLd)}</script>
  <style>${css}</style>
</head>
<body>

<!-- Top sticky bar -->
<header class="topbar">
  <div class="topbar-inner">
    <span class="topbar-name">${SVG.menu} ${r.name}</span>
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

// ── Download Helpers ────────────────────────────────────────────────────────────
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
