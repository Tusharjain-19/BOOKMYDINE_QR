import React, { useState } from 'react';
import { Search, Leaf, Flame, Star, Award } from 'lucide-react';
import type { MenuData, MenuItem, RestaurantDetails } from '../../types/menu';

interface MenuCanvasPreviewProps {
  menuData: MenuData;
  deviceView: 'mobile' | 'tablet' | 'desktop';
  onUpdateItem?: (catId: string, itemId: string, itemData: Partial<MenuItem>) => void;
  onUpdateRestaurant?: (details: Partial<RestaurantDetails>) => void;
  onUpdateCategory?: (catId: string, name: string, description?: string) => void;
}

export const MenuCanvasPreview: React.FC<MenuCanvasPreviewProps> = ({
  menuData,
  deviceView,
  onUpdateItem,
  onUpdateRestaurant,
  onUpdateCategory,
}) => {
  const { restaurant, categories, theme } = menuData;
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.name || '');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getContainerWidth = () => {
    switch (deviceView) {
      case 'mobile':
        return 'w-[375px] max-w-[375px] h-[720px] max-h-[calc(100vh-100px)] my-4 rounded-[36px] border-[10px] border-slate-900 shadow-2xl overflow-y-auto shrink-0 ring-1 ring-slate-800 scrollbar-thin';
      case 'tablet':
        return 'w-[768px] max-w-[768px] h-[820px] max-h-[calc(100vh-100px)] my-4 rounded-2xl border-[12px] border-slate-900 shadow-2xl overflow-y-auto shrink-0 ring-1 ring-slate-800 scrollbar-thin';
      case 'desktop':
      default:
        return 'w-full max-w-4xl min-h-[600px] my-4 rounded-2xl border border-stone-300 shadow-2xl overflow-y-auto';
    }
  };

  // Is 2-column layout appropriate?
  const useTwoCol = deviceView === 'tablet' || deviceView === 'desktop';

  // Filter categories & items by search query
  const filteredCategories = categories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        cat.name.toLowerCase().includes(q) ||
        item.price.includes(q)
      );
    })
  })).filter(cat => searchQuery.trim() ? cat.items.length > 0 : true)
    .filter(cat => {
      if (searchQuery.trim()) return true; 
      if (!activeCategory || activeCategory === 'All Categories') return true;
      return cat.name === activeCategory;
    });

  const BrandingFooter = () => {
    if (restaurant.showBranding === false) return null;
    return (
      <div className="mt-3 pt-2 flex justify-center">
        <a
          href={restaurant.brandingUrl || 'https://bookmydineqr.vercel.app/'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-800 border border-stone-300 rounded-full text-[11px] font-bold hover:scale-105 transition-all shadow-sm"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[9px] font-black">B</span>
          <span>{restaurant.brandingText || 'Powered by BookMyDine'}</span>
        </a>
      </div>
    );
  };

  // SVG / Lucide Icon-based Dietary Badge Component with instant toggle
  const VegBadge = ({ item, catId }: { item: MenuItem; catId?: string }) => {
    const handleToggleDiet = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!onUpdateItem || !catId) return;

      if (item.tags?.includes('vegan')) {
        onUpdateItem(catId, item.id, { isVeg: false, isNonVeg: true, tags: [] });
      } else if (item.isNonVeg) {
        onUpdateItem(catId, item.id, { isVeg: false, isNonVeg: false, tags: ['egg'] });
      } else if (item.tags?.includes('egg')) {
        onUpdateItem(catId, item.id, { isVeg: true, isNonVeg: false, tags: [] });
      } else {
        onUpdateItem(catId, item.id, { isVeg: true, isNonVeg: false, tags: ['vegan'] });
      }
    };

    if (item.tags?.includes('vegan')) {
      return (
        <button
          onClick={handleToggleDiet}
          title="Click to toggle dietary type (Vegan -> Non-Veg -> Egg -> Veg)"
          className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-300 bg-teal-50 text-teal-800 shrink-0 hover:scale-105 transition-transform"
        >
          <Leaf className="w-3 h-3 text-teal-700" />
          VEGAN
        </button>
      );
    }

    if (item.tags?.includes('egg')) {
      return (
        <button
          onClick={handleToggleDiet}
          title="Click to toggle dietary type (Egg -> Veg -> Vegan -> Non-Veg)"
          className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300 bg-amber-50 text-amber-900 shrink-0 hover:scale-105 transition-transform"
        >
          <span className="h-2 w-2 border border-amber-600 flex items-center justify-center p-[1px] rounded-full">
            <span className="h-1 w-1 rounded-full bg-amber-600"></span>
          </span>
          EGG
        </button>
      );
    }

    const isNonVeg = item.isNonVeg || (!item.isVeg && item.isVeg !== undefined);

    return (
      <button
        onClick={handleToggleDiet}
        title="Click to toggle dietary type (Veg / Non-Veg / Egg / Vegan)"
        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 hover:scale-105 transition-transform ${
          !isNonVeg 
            ? "bg-emerald-50 border-emerald-300 text-emerald-800" 
            : "bg-red-50 border-red-300 text-red-800"
        }`}
      >
        <span className={`h-2 w-2 border flex items-center justify-center p-[1px] ${!isNonVeg ? "border-emerald-600" : "border-red-600"}`}>
          <span className={`h-1 w-1 ${!isNonVeg ? "rounded-full bg-emerald-600" : "bg-red-600"}`}></span>
        </span>
        <span>{!isNonVeg ? "VEG" : "NON-VEG"}</span>
      </button>
    );
  };

  const EmptyCategoryNotice = () => (
    <div className="p-8 text-center border-2 border-dashed border-stone-300 rounded-2xl space-y-2 bg-stone-50/50 my-6">
      <p className="text-xs font-bold text-slate-700">No matching menu items found for {restaurant.name || 'this shop'}</p>
      <p className="text-[11px] text-slate-500">Try clearing search or add new items in the left sidebar.</p>
    </div>
  );

  /* Helper for inline editable text across the canvas */
  const EditableText = ({ 
    text, 
    onSave, 
    className = "", 
    placeholder = "Click to edit..." 
  }: { 
    text: string; 
    onSave: (newVal: string) => void; 
    className?: string;
    placeholder?: string;
  }) => {
    return (
      <span
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const val = e.currentTarget.textContent?.trim() || '';
          if (val !== text) onSave(val);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
        className={`outline-none transition-all duration-150 rounded px-1 hover:bg-amber-100/70 hover:outline hover:outline-1 hover:outline-dashed hover:outline-amber-500/80 focus:bg-amber-50 focus:ring-2 focus:ring-emerald-500/80 cursor-text inline-block ${className}`}
        title="Click to edit text directly"
      >
        {text || placeholder}
      </span>
    );
  };

  /* ── Dish Card Component ── Always vertical: image top, text bottom */
  const DishCard = ({ item, catId }: { item: MenuItem; catId: string }) => (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
      {item.image && (
        <div className="w-full aspect-[4/3] overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h4 className="font-serif font-bold text-sm text-[#170f0b] leading-snug flex-1 min-w-0">
            <EditableText 
              text={item.name} 
              onSave={(val) => onUpdateItem?.(catId, item.id, { name: val })} 
            />
          </h4>
          <span className="font-semibold text-sm text-[#170f0b] font-mono shrink-0 whitespace-nowrap">
            {restaurant.currency}
            <EditableText 
              text={item.price} 
              onSave={(val) => onUpdateItem?.(catId, item.id, { price: val })} 
            />
          </span>
        </div>
        {item.description && (
          <p className="text-xs text-[#4e4540] leading-relaxed line-clamp-3">
            <EditableText 
              text={item.description} 
              onSave={(val) => onUpdateItem?.(catId, item.id, { description: val })} 
            />
          </p>
        )}
        <div className="mt-auto pt-1 flex items-center gap-1.5 flex-wrap">
          <VegBadge item={item} catId={catId} />
          {item.isSpicy && <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200"><Flame className="w-2.5 h-2.5 text-rose-600" /> SPICY</span>}
          {item.isBestseller && <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200"><Star className="w-2.5 h-2.5 text-amber-600 fill-amber-500" /> POPULAR</span>}
          {item.isChefSpecial && <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-violet-800 bg-violet-50 px-1.5 py-0.5 rounded border border-violet-200"><Award className="w-2.5 h-2.5 text-violet-600" /> CHEF</span>}
        </div>
      </div>
    </div>
  );

  /* ── Luxury Dish Card ── */
  const LuxuryDishCard = ({ item, catId }: { item: MenuItem; catId: string }) => (
    <div className="bg-[#1b1b1b] rounded-lg border border-[#4d4639] overflow-hidden flex flex-col">
      {item.image && (
        <div className="w-full aspect-[4/3] overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover border-b border-[#e5c276]/20"
          />
        </div>
      )}
      <div className="p-3.5 flex flex-col gap-1 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h4 className="font-normal text-sm text-[#e5e2e1] leading-snug flex-1 min-w-0">
            <EditableText text={item.name} onSave={(val) => onUpdateItem?.(catId, item.id, { name: val })} />
          </h4>
          <span className="font-sans font-bold text-sm text-[#e5c276] font-mono shrink-0 whitespace-nowrap">
            {restaurant.currency}<EditableText text={item.price} onSave={(val) => onUpdateItem?.(catId, item.id, { price: val })} />
          </span>
        </div>
        {item.description && (
          <p className="text-xs text-stone-400 font-sans italic line-clamp-3 leading-relaxed">
            <EditableText text={item.description} onSave={(val) => onUpdateItem?.(catId, item.id, { description: val })} />
          </p>
        )}
        <div className="mt-auto pt-1 flex items-center gap-1.5 flex-wrap">
          <VegBadge item={item} catId={catId} />
          {item.isSpicy && <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-rose-400 border border-rose-800 bg-rose-950/40 px-1.5 py-0.5 rounded"><Flame className="w-2.5 h-2.5 text-rose-500" /> SPICY</span>}
        </div>
      </div>
    </div>
  );

  /* =========================================================================
     STITCH SCREEN 1: Minimalist Digital Menu (Atelier Minimalist)
     ========================================================================= */
  const renderMinimalCafe = () => {
    const featuredItems = filteredCategories
      .flatMap((cat) => cat.items.map(item => ({ item, catId: cat.id })))
      .filter(({ item }) => item.isChefSpecial || item.isBestseller)
      .slice(0, 4);

    return (
      <div className="w-full mx-auto bg-[#fbf9f5] text-[#170f0b] min-h-screen pb-20 font-sans relative text-left">
        {/* Top Header */}
        <header className="bg-[#fbf9f5] sticky top-0 z-30 flex justify-between items-center px-4 py-3 border-b border-[#d1c4be]/30">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {restaurant.logoUrl && (
              <img src={restaurant.logoUrl} alt="Logo" className="h-7 w-auto max-w-[60px] object-contain shrink-0 rounded" />
            )}
            <h1 className="text-sm font-bold uppercase tracking-wider text-[#170f0b] truncate">
              <EditableText 
                text={restaurant.name || 'My Restaurant'} 
                onSave={(val) => onUpdateRestaurant?.({ name: val })} 
              />
            </h1>
          </div>
          <span className="text-xs font-semibold text-[#170f0b] shrink-0 ml-2">
            <EditableText 
              text={restaurant.phone || "OPEN"} 
              onSave={(val) => onUpdateRestaurant?.({ phone: val })} 
            />
          </span>
        </header>

        {/* Hero Section */}
        <section className="relative h-[200px] w-full overflow-hidden">
          <div 
            className="bg-cover bg-center w-full h-full" 
            style={{ backgroundImage: `url('${restaurant.bannerUrl || categories[0]?.items[0]?.image || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200"}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fbf9f5] to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 space-y-1">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4e4540]">
              <EditableText 
                text={restaurant.tagline || 'Artisanal Flavors & Fresh Dishes'} 
                onSave={(val) => onUpdateRestaurant?.({ tagline: val })} 
              />
            </p>
            <h2 className="text-2xl font-serif text-[#170f0b] font-bold leading-tight">
              <EditableText 
                text={restaurant.name || 'My Restaurant'} 
                onSave={(val) => onUpdateRestaurant?.({ name: val })} 
              />
            </h2>
            <p className="text-xs text-[#4e4540]">
              📍 <EditableText 
                text={restaurant.address || 'Click to add location address'} 
                onSave={(val) => onUpdateRestaurant?.({ address: val })} 
              />
            </p>
          </div>
        </section>

        {/* Live Search Bar */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients, price..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#d1c4be]/60 rounded-xl text-xs text-slate-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 shadow-sm"
            />
          </div>
        </div>

        {categories.length > 0 && !searchQuery && (
          <nav className="sticky top-[49px] z-20 bg-[#fbf9f5]/95 backdrop-blur-sm py-3 px-4 border-b border-[#d1c4be]/30 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <button
              onClick={() => setActiveCategory('All Categories')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all shrink-0 ${
                activeCategory === 'All Categories' || !activeCategory
                  ? "bg-[#2d241f] text-white"
                  : "border border-[#d1c4be] text-[#4e4540] hover:border-[#170f0b]"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === cat.name
                    ? "bg-[#2d241f] text-white"
                    : "border border-[#d1c4be] text-[#4e4540] hover:border-[#170f0b]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </nav>
        )}

        {/* Chef Recommends Section */}
        {featuredItems.length > 0 && !searchQuery && (
          <section className="px-4 mt-5 space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#170f0b]" />
              <div>
                <h3 className="text-lg font-serif text-[#170f0b] font-bold">Chef Recommends</h3>
                <p className="text-[11px] text-[#4e4540] italic">Handpicked favourites by our kitchen</p>
              </div>
            </div>
            <div className={`grid gap-3 ${useTwoCol ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {featuredItems.map(({ item, catId }) => (
                <DishCard key={item.id} item={item} catId={catId} />
              ))}
            </div>
          </section>
        )}

        {/* Regular Menu Categories */}
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <section key={cat.id} className="px-4 mt-7 space-y-3">
              <div className="border-b border-[#d1c4be]/40 pb-2 space-y-1">
                <h3 className="text-xl font-serif text-[#170f0b]">
                  <EditableText 
                    text={cat.name} 
                    onSave={(val) => onUpdateCategory?.(cat.id, val, cat.description)} 
                    placeholder="Category Title..."
                  />
                </h3>
                {cat.description && (
                  <p className="text-xs text-[#4e4540] italic">
                    <EditableText 
                      text={cat.description} 
                      onSave={(val) => onUpdateCategory?.(cat.id, cat.name, val)} 
                      placeholder="Category description..."
                    />
                  </p>
                )}
              </div>

              <div className={`grid gap-3 ${useTwoCol ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {cat.items.map((item) => (
                  <DishCard key={item.id} item={item} catId={cat.id} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="px-4">
            <EmptyCategoryNotice />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-8 pb-6 px-4 text-center text-xs opacity-70 border-t border-[#d1c4be]/30">
          <p>© {new Date().getFullYear()} <EditableText text={restaurant.name || 'My Restaurant'} onSave={(val) => onUpdateRestaurant?.({ name: val })} />. All rights reserved.</p>
          <BrandingFooter />
        </footer>
      </div>
    );
  };

  /* =========================================================================
     STITCH SCREEN 2: Obsidian Digital Menu (Luxury Fine Dining)
     ========================================================================= */
  const renderLuxury = () => {
    return (
      <div className="w-full mx-auto bg-[#131313] text-[#e5e2e1] min-h-screen pb-20 font-serif relative text-left">
        <header className="sticky top-0 z-30 bg-[#131313]/90 backdrop-blur-md px-4 py-3 border-b border-[#4d4639] flex justify-between items-center">
          <span className="material-symbols-outlined text-[#e5c276]">menu</span>
          <h1 className="text-xs font-serif uppercase tracking-widest text-[#e5c276] text-center font-bold truncate mx-2">
            <EditableText text={restaurant.name || 'My Restaurant'} onSave={(val) => onUpdateRestaurant?.({ name: val })} />
          </h1>
          <span className="material-symbols-outlined text-[#e5c276]">shopping_bag</span>
        </header>

        <section className="relative h-[240px] flex flex-col items-center justify-center text-center px-4">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url('${restaurant.bannerUrl || categories[0]?.items[0]?.image || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200"}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#131313]" />
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#e5c276] border border-[#e5c276]/40 px-3 py-1 rounded-full">Fine Dining</span>
            <h2 className="text-2xl font-serif text-[#e5c276] tracking-tight font-bold">
              <EditableText text={restaurant.name || 'My Restaurant'} onSave={(val) => onUpdateRestaurant?.({ name: val })} />
            </h2>
            <p className="text-xs font-sans text-stone-300 italic">
              <EditableText text={restaurant.tagline || 'Artisanal Flavors & Fine Cuisine'} onSave={(val) => onUpdateRestaurant?.({ tagline: val })} />
            </p>
            <p className="text-xs font-sans text-stone-400">
              📍 <EditableText text={restaurant.address || 'Click to add location'} onSave={(val) => onUpdateRestaurant?.({ address: val })} />
            </p>
          </div>
        </section>

        {/* Live Search Bar */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#e5c276]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients, price..."
              className="w-full pl-9 pr-4 py-2 bg-[#1b1b1b] border border-[#4d4639] rounded-xl text-xs text-[#e5e2e1] placeholder:text-stone-500 focus:outline-none focus:border-[#e5c276]"
            />
          </div>
        </div>

        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <section key={cat.id} className="px-4 mt-7 space-y-3">
              <div className="text-center border-b border-[#4d4639]/40 pb-2">
                <h3 className="text-xl font-normal text-[#e5c276] tracking-widest uppercase">
                  <EditableText text={cat.name} onSave={(val) => onUpdateCategory?.(cat.id, val, cat.description)} placeholder="Category Name..." />
                </h3>
              </div>
              <div className={`grid gap-3 ${useTwoCol ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {cat.items.map((item) => (
                  <LuxuryDishCard key={item.id} item={item} catId={cat.id} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="px-4">
            <EmptyCategoryNotice />
          </div>
        )}

        <footer className="mt-12 pt-8 pb-6 px-4 text-center text-xs text-stone-500 border-t border-[#4d4639]/40 font-sans space-y-1">
          <p>© {new Date().getFullYear()} <EditableText text={restaurant.name || 'My Restaurant'} onSave={(val) => onUpdateRestaurant?.({ name: val })} />. ALL RIGHTS RESERVED.</p>
          <BrandingFooter />
        </footer>
      </div>
    );
  };

  /* Default minimal cafe layout */
  const renderActiveLayout = () => {
    switch (theme.id) {
      case 'luxury': return renderLuxury();
      case 'minimal':
      default:
        return renderMinimalCafe();
    }
  };

  return (
    <div className="flex-1 bg-stone-200/60 p-4 md:p-8 flex flex-col items-center overflow-y-auto h-[calc(100vh-64px)]">
      {/* Live Canvas Click-To-Edit Banner */}
      <div className="mb-2 px-4 py-1.5 bg-amber-50 border border-amber-300/80 text-amber-900 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 animate-pulse">
        <span>⚡ Canvas Live Editor:</span>
        <span className="font-medium text-amber-800">Click on any text below to edit it directly!</span>
      </div>

      <div className={`transition-all duration-300 ${getContainerWidth()}`}>
        {renderActiveLayout()}
      </div>
    </div>
  );
};
