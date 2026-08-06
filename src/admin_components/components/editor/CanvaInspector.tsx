import React, { useState } from 'react';
import { 
  Palette, 
  Store, 
  UtensilsCrossed, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  Type, 
  Layers,
  Upload,
  Flame,
  Star,
  Award,
  Leaf,
  FileText,
  PlusCircle
} from 'lucide-react';
import { PRESET_THEMES } from '../../lib/defaultTemplates';
import type { MenuData, MenuItem, RestaurantDetails, ThemeConfig, ThemePresetId } from '../../types/menu';
export const FOOD_PRESET_IMAGES = [
  { label: 'Curry', url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&auto=format&fit=crop&q=80' },
  { label: 'Coffee', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80' },
  { label: 'Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80' },
  { label: 'Pizza', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80' },
  { label: 'Biryani', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80' },
  { label: 'Sweets', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80' },
  { label: 'Kebab', url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80' },
  { label: 'Drink', url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=80' },
  { label: 'Salad', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80' },
  { label: 'Dessert', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80' },
];

interface CanvaInspectorProps {
  menuData: MenuData;
  onUpdateRestaurant: (details: Partial<RestaurantDetails>) => void;
  onUpdateTheme: (theme: Partial<ThemeConfig>) => void;
  onSelectPresetTheme: (themeId: ThemePresetId) => void;
  onAddCategory: (categoryName: string) => void;
  onUpdateCategory: (categoryId: string, name: string, description?: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  onAddItem: (categoryId: string, item: Omit<MenuItem, 'id'>) => void;
  onUpdateItem: (categoryId: string, itemId: string, item: Partial<MenuItem>) => void;
  onDeleteItem: (categoryId: string, itemId: string) => void;
  onOpenSmartInput?: () => void;
}

export const CanvaInspector: React.FC<CanvaInspectorProps> = ({
  menuData,
  onUpdateRestaurant,
  onUpdateTheme,
  onSelectPresetTheme,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onOpenSmartInput,
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'restaurant' | 'items'>('themes');
  const [selectedCatId, setSelectedCatId] = useState<string>(menuData.categories[0]?.id || '');
  const [newCatName, setNewCatName] = useState<string>('');

  const FOOD_PRESET_IMAGES = [
    { label: 'Gourmet Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80' },
    { label: 'Artisan Pizza', url: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&auto=format&fit=crop&q=80' },
    { label: 'Fresh Sushi', url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=80' },
    { label: 'Ribeye Steak', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80' },
    { label: 'Craft Cocktail', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&auto=format&fit=crop&q=80' },
    { label: 'Matcha Drink', url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="w-full lg:w-96 bg-white border-r border-stone-200 text-slate-800 flex flex-col h-[calc(100vh-64px)] overflow-hidden shadow-sm shrink-0">
      
      {/* Inspector Top Tabs */}
      <div className="flex border-b border-stone-200 bg-stone-50 p-2 gap-1">
        <button
          onClick={() => setActiveTab('themes')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'themes'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/60'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Themes & Styling
        </button>

        <button
          onClick={() => setActiveTab('restaurant')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'restaurant'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/60'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          Restaurant Info
        </button>

        <button
          onClick={() => setActiveTab('items')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'items'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/60'
          }`}
        >
          <UtensilsCrossed className="w-3.5 h-3.5" />
          Dishes & Items
        </button>
      </div>

      {/* Main Inspector Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* ================= TAB 1: THEMES & STYLING ================= */}
        {activeTab === 'themes' && (
          <div className="space-y-6">
            
            {/* 6 Visual Preset Selector */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                Select Stitch Visual Template (6 Themes)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(PRESET_THEMES).map((preset) => {
                  const isSelected = menuData.theme.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => onSelectPresetTheme(preset.id)}
                      className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50 ring-2 ring-emerald-700/20'
                          : 'border-stone-200 bg-stone-50 hover:border-stone-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 truncate">
                          {preset.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 font-bold" />}
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: preset.primaryColor }} />
                        <div className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: preset.bgColor }} />
                        <div className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: preset.cardBgColor }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Color Palette Controls */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <label className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                <Palette className="w-4 h-4 text-emerald-700" />
                Color Palette Customizer
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[11px] text-slate-600 block font-semibold">Primary Accent</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={menuData.theme.primaryColor}
                      onChange={(e) => onUpdateTheme({ primaryColor: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono text-slate-800 font-bold">{menuData.theme.primaryColor}</span>
                  </div>
                </div>

                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[11px] text-slate-600 block font-semibold">Background Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={menuData.theme.bgColor}
                      onChange={(e) => onUpdateTheme({ bgColor: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono text-slate-800 font-bold">{menuData.theme.bgColor}</span>
                  </div>
                </div>

                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[11px] text-slate-600 block font-semibold">Card Background</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={menuData.theme.cardBgColor}
                      onChange={(e) => onUpdateTheme({ cardBgColor: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono text-slate-800 font-bold">{menuData.theme.cardBgColor}</span>
                  </div>
                </div>

                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[11px] text-slate-600 block font-semibold">Text Color</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={menuData.theme.textColor}
                      onChange={(e) => onUpdateTheme({ textColor: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono text-slate-800 font-bold">{menuData.theme.textColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography & Shape Styles */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <label className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                <Type className="w-4 h-4 text-emerald-700" />
                Typography & Shape Styles
              </label>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-600 block mb-1 font-semibold">Card Border Radius</span>
                  <div className="grid grid-cols-4 gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
                    {(['none', 'sm', 'md', 'lg'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => onUpdateTheme({ borderRadius: r })}
                        className={`py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                          menuData.theme.borderRadius === r ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-600 block mb-1 font-semibold">Header Style</span>
                  <div className="grid grid-cols-2 gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
                    {(['centered', 'banner', 'minimal', 'glass'] as const).map((hs) => (
                      <button
                        key={hs}
                        onClick={() => onUpdateTheme({ headerStyle: hs })}
                        className={`py-1.5 px-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                          menuData.theme.headerStyle === hs ? 'bg-emerald-700 text-white shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {hs}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: RESTAURANT DETAILS ================= */}
        {activeTab === 'restaurant' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Restaurant Name</label>
              <input
                type="text"
                value={menuData.restaurant.name}
                onChange={(e) => onUpdateRestaurant({ name: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tagline / Subtitle</label>
              <input
                type="text"
                value={menuData.restaurant.tagline}
                onChange={(e) => onUpdateRestaurant({ tagline: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Currency Symbol</label>
                <input
                  type="text"
                  value={menuData.restaurant.currency}
                  onChange={(e) => onUpdateRestaurant({ currency: e.target.value })}
                  placeholder="₹ or $ or €"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone Number</label>
                <input
                  type="text"
                  value={menuData.restaurant.phone || ''}
                  onChange={(e) => onUpdateRestaurant({ phone: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Address / Location</label>
              <input
                type="text"
                value={menuData.restaurant.address || ''}
                onChange={(e) => onUpdateRestaurant({ address: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Restaurant Logo & Header Photo File Selectors */}
            <div className="space-y-4 pt-2 border-t border-stone-200 bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-200/60">
              
              {/* Logo Uploader */}
              <div>
                <label className="text-xs font-bold text-slate-800 flex items-center justify-between mb-1">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-emerald-700" /> Restaurant Logo
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Square (1:1)</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    id="restaurant-logo-file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (evt) => {
                        const dataUrl = evt.target?.result as string;
                        if (dataUrl) onUpdateRestaurant({ logoUrl: dataUrl });
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <label
                    htmlFor="restaurant-logo-file"
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1 shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" /> Choose Logo
                  </label>
                  {menuData.restaurant.logoUrl && (
                    <button
                      type="button"
                      onClick={() => onUpdateRestaurant({ logoUrl: '' })}
                      className="px-2.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold border border-rose-200"
                    >
                      Clear
                    </button>
                  )}
                  {menuData.restaurant.logoUrl && (
                    <img src={menuData.restaurant.logoUrl} alt="Logo" className="h-8 w-8 object-cover rounded shadow-sm border border-stone-300 ml-auto" />
                  )}
                </div>
              </div>

              {/* Banner Uploader */}
              <div className="border-t border-emerald-200/50 pt-3">
                <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-emerald-700" /> Header Banner Photo
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">1200 x 600 px (2:1)</span>
                </label>

              <p className="text-[10px] text-slate-500 leading-tight">
                Recommended aspect ratio: <strong>2:1 (Landscape)</strong>. Resolution: <strong>1200 x 600 px</strong> (or min 800 x 400 px). Dark/warm ambience food shots work best.
              </p>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="file"
                  accept="image/*"
                  id="restaurant-banner-file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                      const dataUrl = evt.target?.result as string;
                      if (dataUrl) onUpdateRestaurant({ bannerUrl: dataUrl });
                    };
                    reader.readAsDataURL(file);
                  }}
                />
                <label
                  htmlFor="restaurant-banner-file"
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" /> Choose Banner File
                </label>
                {menuData.restaurant.bannerUrl && (
                  <button
                    type="button"
                    onClick={() => onUpdateRestaurant({ bannerUrl: '' })}
                    className="px-2.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold border border-rose-200"
                  >
                    Clear
                  </button>
                )}
              </div>
              {menuData.restaurant.bannerUrl && (
                <div className="w-full h-20 rounded-xl overflow-hidden border border-stone-300 shadow-sm mt-1">
                  <img src={menuData.restaurant.bannerUrl} alt="Header Banner" className="w-full h-full object-cover" />
                </div>
              )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Announcement / Notice Banner</label>
              <textarea
                value={menuData.restaurant.notice || ''}
                onChange={(e) => onUpdateRestaurant({ notice: e.target.value })}
                rows={2}
                placeholder="e.g. Taxes included. Ask server for vegan options."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:border-emerald-700 focus:bg-white focus:outline-none resize-none"
              />
            </div>

            {/* Branding Settings Section */}
            <div className="space-y-3 pt-3 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span>⚡ BookMyDine Branding Badge</span>
                </label>
                <button
                  type="button"
                  onClick={() => onUpdateRestaurant({ showBranding: menuData.restaurant.showBranding === false ? true : false })}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase transition-all ${
                    menuData.restaurant.showBranding !== false
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-stone-100 text-slate-400 border border-stone-200'
                  }`}
                >
                  {menuData.restaurant.showBranding !== false ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              {menuData.restaurant.showBranding !== false && (
                <div className="space-y-2 pl-1">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Branding Label Text</label>
                    <input
                      type="text"
                      value={menuData.restaurant.brandingText ?? 'Powered by BookMyDine'}
                      onChange={(e) => onUpdateRestaurant({ brandingText: e.target.value })}
                      placeholder="e.g. Powered by BookMyDine"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Branding Link URL</label>
                    <input
                      type="text"
                      value={menuData.restaurant.brandingUrl ?? 'https://bookmydineqr.vercel.app/'}
                      onChange={(e) => onUpdateRestaurant({ brandingUrl: e.target.value })}
                      placeholder="https://bookmydineqr.vercel.app/"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-700"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: DISHES & CATEGORIES ================= */}
        {activeTab === 'items' && (
          <div className="space-y-6">
            
            {/* Quick Action bar: Add Category & Raw Text Bulk Import */}
            <div className="grid grid-cols-2 gap-2 bg-stone-100 p-2 rounded-xl border border-stone-200">
              <button
                type="button"
                onClick={() => {
                  const inputEl = document.getElementById('new-category-input');
                  if (inputEl) inputEl.focus();
                }}
                className="px-2.5 py-1.5 bg-white hover:bg-emerald-50 text-emerald-800 border border-stone-300 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>+ Category</span>
              </button>

              {onOpenSmartInput && (
                <button
                  type="button"
                  onClick={onOpenSmartInput}
                  className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Bulk Text / OCR</span>
                </button>
              )}
            </div>

            {/* Custom In-App UI Category Creator Card (Zero Browser Popups) */}
            <div className="bg-emerald-50/70 border border-emerald-300/80 p-3 rounded-xl space-y-2 shadow-sm">
              <label className="text-xs font-bold text-emerald-900 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-700" /> Add New Category
                </span>
                <span className="text-[10px] text-emerald-700 font-normal">e.g. Starters, Sweets, Drinks</span>
              </label>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newCatName.trim()) {
                    onAddCategory(newCatName.trim());
                    setNewCatName('');
                  }
                }}
                className="flex items-center gap-1.5"
              >
                <input
                  id="new-category-input"
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Type category title..."
                  className="flex-1 bg-white border border-emerald-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!newCatName.trim()}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>
            </div>

            {/* Category Add, Selector & Edit Controls */}
            <div className="space-y-3 border-t border-stone-200 pt-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-700" />
                  Menu Categories ({menuData.categories.length})
                </label>
              </div>

              {/* Category tabs & Selected Category Editor */}
              {menuData.categories.length > 0 && (
                <div className="space-y-3 bg-stone-50 border border-stone-200 p-3 rounded-xl">
                  <div className="flex flex-wrap gap-1.5">
                    {menuData.categories.map((cat) => {
                      const isSelected = (selectedCatId || menuData.categories[0]?.id) === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCatId(cat.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-700/30'
                              : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
                          }`}
                        >
                          <span>{cat.name}</span>
                          <span className="text-[10px] opacity-80 font-mono">({cat.items.length})</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Category Edit & Rename Section */}
                  {(() => {
                    const currentCat = menuData.categories.find(c => c.id === (selectedCatId || menuData.categories[0]?.id));
                    if (!currentCat) return null;

                    return (
                      <div className="space-y-2.5 pt-2 border-t border-stone-200/80">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-extrabold text-emerald-800">
                            Edit Category Details
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteCategory(currentCat.id);
                            }}
                            className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[10px] font-bold border border-rose-200 flex items-center gap-1 transition-all"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3 h-3" /> Delete Category
                          </button>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700 block">Category Name</label>
                          <input
                            type="text"
                            value={currentCat.name}
                            onChange={(e) => onUpdateCategory(currentCat.id, e.target.value, currentCat.description)}
                            placeholder="e.g. Starters, Main Course, Sweets"
                            className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-bold focus:border-emerald-700 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-600 block">Category Subtitle / Description</label>
                          <input
                            type="text"
                            value={currentCat.description || ''}
                            onChange={(e) => onUpdateCategory(currentCat.id, currentCat.name, e.target.value)}
                            placeholder="e.g. Freshly cooked clay oven dishes..."
                            className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:border-emerald-700 focus:outline-none"
                          />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Selected Category Items List */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-emerald-800">
                  {menuData.categories.length > 0 
                    ? `Items in "${menuData.categories.find(c => c.id === (selectedCatId || menuData.categories[0]?.id))?.name || 'Category'}"`
                    : 'Dish Items'}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const targetCat = selectedCatId || menuData.categories[0]?.id || '';
                    onAddItem(targetCat, {
                      name: 'New Dish Item',
                      description: 'Delicious dish details and fresh ingredients',
                      price: '250',
                      category: menuData.categories.find(c => c.id === targetCat)?.name || 'Main Course',
                      isVeg: true,
                    });
                  }}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> + Add Dish Item
                </button>
              </div>

              {menuData.categories.length === 0 ? (
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-center space-y-2">
                  <p className="text-xs font-bold text-amber-900">No categories or items added yet!</p>
                  <p className="text-[11px] text-amber-800">Click <strong>"+ Add Dish Item"</strong> above or type a category name above to start adding dishes.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {menuData.categories.find(c => c.id === (selectedCatId || menuData.categories[0]?.id))?.items.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-3 hover:border-emerald-300 transition-all shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => onUpdateItem(selectedCatId, item.id, { name: e.target.value })}
                          className="bg-white font-bold text-xs text-slate-900 rounded-lg px-2.5 py-1 flex-1 border border-stone-200 focus:border-emerald-700 focus:outline-none"
                        />
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-mono text-emerald-700 font-extrabold">{menuData.restaurant.currency}</span>
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) => onUpdateItem(selectedCatId, item.id, { price: e.target.value })}
                            className="bg-white font-mono text-xs text-emerald-800 font-bold rounded-lg px-2 py-1 w-16 text-right border border-stone-200 focus:border-emerald-700 focus:outline-none"
                          />
                          <button
                            onClick={() => onDeleteItem(selectedCatId, item.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-stone-200/60 rounded-lg transition-all"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <textarea
                        value={item.description}
                        onChange={(e) => onUpdateItem(selectedCatId, item.id, { description: e.target.value })}
                        rows={2}
                        placeholder="Description of item..."
                        className="w-full bg-white text-[11px] text-slate-700 rounded-lg p-2 border border-stone-200 focus:border-emerald-700 focus:outline-none resize-none"
                      />

                      {/* Image Selector / Local File Upload / Food Gallery */}
                      <div className="space-y-2 pt-1 border-t border-stone-200">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-700 flex items-center gap-1 font-bold">
                            <ImageIcon className="w-3.5 h-3.5 text-emerald-700" /> Dish Photo:
                          </span>
                          <div className="flex items-center gap-1">
                            <input
                              type="file"
                              accept="image/*"
                              id={`file-input-${item.id}`}
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = (evt) => {
                                  const dataUrl = evt.target?.result as string;
                                  if (dataUrl && selectedCatId) {
                                    onUpdateItem(selectedCatId, item.id, { image: dataUrl });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                            <label
                              htmlFor={`file-input-${item.id}`}
                              className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1 shadow-sm"
                            >
                              <Upload className="w-3 h-3" /> Select Photo File
                            </label>
                            {item.image && (
                              <button
                                type="button"
                                onClick={() => onUpdateItem(selectedCatId, item.id, { image: '' })}
                                className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[10px] font-bold border border-rose-200"
                                title="Remove photo"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        </div>

                        {item.image && (
                          <div className="relative w-full h-20 rounded-lg overflow-hidden border border-stone-300 bg-stone-100 shadow-inner">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        )}

                        <input
                          type="text"
                          value={item.image || ''}
                          onChange={(e) => onUpdateItem(selectedCatId, item.id, { image: e.target.value })}
                          placeholder="Or paste image URL..."
                          className="w-full bg-white text-[11px] text-slate-800 rounded-lg px-2.5 py-1 border border-stone-200 focus:border-emerald-700 focus:outline-none"
                        />

                        {/* Quick Food Presets */}
                        <div className="space-y-1">
                          <span className="text-[9px] text-slate-500 font-semibold block">Quick Food Gallery:</span>
                          <div className="flex flex-wrap gap-1">
                            {FOOD_PRESET_IMAGES.map((presetImg, idx) => (
                              <button
                                type="button"
                                key={idx}
                                onClick={() => onUpdateItem(selectedCatId, item.id, { image: presetImg.url })}
                                className="text-[10px] bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 px-2 py-0.5 rounded border border-stone-200 font-medium transition-colors"
                              >
                                + {presetImg.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Dietary Badges & Tags */}
                      <div className="space-y-2 pt-1">
                        <span className="text-[10px] text-slate-500 font-semibold block">Dietary & Flag Options:</span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onUpdateItem(selectedCatId, item.id, { isVeg: true, isNonVeg: false })}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-all flex items-center gap-1 ${
                              item.isVeg && !item.isNonVeg ? 'bg-emerald-100 text-emerald-800 border-emerald-400 shadow-sm ring-1 ring-emerald-400/50' : 'bg-white text-slate-500 border-stone-200 hover:bg-stone-50'
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                            Veg
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateItem(selectedCatId, item.id, { isVeg: false, isNonVeg: true })}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-all flex items-center gap-1 ${
                              item.isNonVeg ? 'bg-rose-100 text-rose-800 border-rose-400 shadow-sm ring-1 ring-rose-400/50' : 'bg-white text-slate-500 border-stone-200 hover:bg-stone-50'
                            }`}
                          >
                            <span className="w-2 h-2 bg-rose-600 inline-block"></span>
                            Non-Veg
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateItem(selectedCatId, item.id, { isVeg: false, isNonVeg: false, tags: ['egg'] })}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-all flex items-center gap-1 ${
                              !item.isVeg && !item.isNonVeg && item.tags?.includes('egg') ? 'bg-amber-100 text-amber-900 border-amber-400 shadow-sm ring-1 ring-amber-400/50' : 'bg-white text-slate-500 border-stone-200 hover:bg-stone-50'
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full border border-amber-700 bg-amber-400 inline-block"></span>
                            Egg
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateItem(selectedCatId, item.id, { isVeg: true, isNonVeg: false, tags: ['vegan'] })}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-all flex items-center gap-1 ${
                              item.isVeg && item.tags?.includes('vegan') ? 'bg-teal-100 text-teal-900 border-teal-400 shadow-sm ring-1 ring-teal-400/50' : 'bg-white text-slate-500 border-stone-200 hover:bg-stone-50'
                            }`}
                          >
                            <Leaf className="w-3 h-3 text-teal-700" />
                            Vegan
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateItem(selectedCatId, item.id, { isSpicy: !item.isSpicy, spicyLevel: item.isSpicy ? 0 : 2 })}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-all flex items-center gap-1 ${
                              item.isSpicy ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-white text-slate-400 border-stone-200'
                            }`}
                          >
                            <Flame className="w-3 h-3 text-rose-600" />
                            Spicy
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateItem(selectedCatId, item.id, { isBestseller: !item.isBestseller })}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-all flex items-center gap-1 ${
                              item.isBestseller ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-white text-slate-400 border-stone-200'
                            }`}
                          >
                            <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                            Bestseller
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateItem(selectedCatId, item.id, { isChefSpecial: !item.isChefSpecial })}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-all flex items-center gap-1 ${
                              item.isChefSpecial ? 'bg-indigo-100 text-indigo-800 border-indigo-300' : 'bg-white text-slate-400 border-stone-200'
                            }`}
                          >
                            <Award className="w-3 h-3 text-indigo-700" />
                            Chef Special
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
