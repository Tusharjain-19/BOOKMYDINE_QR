'use client';

import React, { useMemo } from 'react';
import { generateCSS, generateJS } from '../../admin_components/lib/htmlGenerator';

// Inline SVG icons (same as htmlGenerator.ts)
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

interface MenuViewerProps {
  menuData: any;
}

export default function MenuViewer({ menuData }: MenuViewerProps) {
  const { restaurant: r, categories, theme } = menuData;
  const cur = r.currency || '₹';
  const css = useMemo(() => generateCSS(theme), [theme]);
  const js = useMemo(() => generateJS(), []);

  // Badge builder (exact same as htmlGenerator.ts)
  const badges = (item: any) => {
    const parts: string[] = [];
    if (item.tags?.includes('vegan'))      parts.push(`<span class="badge bvg">${SVG.vegan} Vegan</span>`);
    else if (item.tags?.includes('egg'))   parts.push(`<span class="badge be">${SVG.egg} Egg</span>`);
    else if (item.isNonVeg)                parts.push(`<span class="badge bnv">${SVG.nonveg} Non-Veg</span>`);
    else if (item.isVeg)                   parts.push(`<span class="badge bv">${SVG.veg} Veg</span>`);
    if (item.isSpicy)       parts.push(`<span class="badge bsp">${SVG.spicy} Spicy</span>`);
    if (item.isBestseller)  parts.push(`<span class="badge bbs">${SVG.star} Bestseller</span>`);
    if (item.isChefSpecial) parts.push(`<span class="badge bch">${SVG.chef} Chef's Special</span>`);
    return parts.join('');
  };

  // Dish card (exact same as htmlGenerator.ts)
  const dishCard = (item: any) => {
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
  };

  // Chef recommends
  const chefItems = categories
    .flatMap((cat: any) => cat.items)
    .filter((item: any) => item.isChefSpecial || item.isBestseller);

  const chefSection = chefItems.length > 0 ? `
<section class="chef-section fade-up">
  <div class="section-head">
    <div class="section-title">${SVG.award} Chef Recommends</div>
    <p class="section-sub">Handpicked favourites by our kitchen team</p>
  </div>
  <div class="chef-grid">
    ${chefItems.map((item: any) => `
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

  // Category sections
  const catSections = categories.map((cat: any) => `
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

  // Header
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
  </div>
</div>`;

  const bodyHtml = `
<!-- Top sticky bar -->
<header class="topbar">
  <div class="topbar-inner">
    <span class="topbar-name">
      ${r.logoUrl ? `<img src="${r.logoUrl}" alt="${r.name}" class="topbar-logo" />` : ''}
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
    ${categories.map((cat: any, i: number) =>
      `<button class="cat-tab${i === 0 ? ' active' : ''}" data-target="cat-${cat.id}" role="tab">${cat.name}</button>`
    ).join('')}
  </div>
</nav>

<!-- Main content -->
<main class="main">
  ${categories.length === 0
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
</footer>`;

  // Run JS after render
  React.useEffect(() => {
    const script = document.createElement('script');
    script.textContent = js;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, [js]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=EB+Garamond:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Cinzel:wght@400..900&family=Sora:wght@300..700&family=Bebas+Neue&family=Manrope:wght@300..700&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
