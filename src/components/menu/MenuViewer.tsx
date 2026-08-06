'use client';

import React, { useState } from 'react';
import { Search, MapPin, Phone, Info } from 'lucide-react';

export default function MenuViewer({ menuData }: { menuData: any }) {
  const [searchQuery, setSearchQuery] = useState('');

  const { restaurant, theme, categories } = menuData;

  const filteredCategories = categories.map((cat: any) => ({
    ...cat,
    items: cat.items.filter((item: any) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter((cat: any) => cat.items.length > 0);

  return (
    <div 
      className="min-h-screen font-sans selection:bg-black/10" 
      style={{ backgroundColor: theme.bgColor || '#f8fafc', color: theme.textColor || '#0f172a' }}
    >
      {/* Header */}
      <header 
        className="pt-12 pb-8 px-6 text-center rounded-b-3xl shadow-sm relative overflow-hidden"
        style={{ backgroundColor: theme.primaryColor || '#10b981', color: '#ffffff' }}
      >
        <div className="relative z-10 space-y-3">
          <h1 className="text-4xl font-black tracking-tight">{restaurant.name}</h1>
          {restaurant.tagline && <p className="text-sm font-medium opacity-90">{restaurant.tagline}</p>}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 pt-4 text-xs font-medium opacity-80">
            {restaurant.address && (
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {restaurant.address}</span>
            )}
            {restaurant.phone && (
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {restaurant.phone}</span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
          <input
            type="text"
            placeholder="Search for your favorite dish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-0 ring-1 ring-black/5 shadow-sm focus:ring-2 focus:outline-none transition-all"
            style={{ 
              backgroundColor: '#ffffff', 
              color: '#000000',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}
          />
        </div>

        {/* Notice */}
        {restaurant.notice && (
          <div className="p-4 rounded-xl flex items-start gap-3 bg-blue-50/50 border border-blue-100 text-blue-800 text-sm">
            <Info className="w-5 h-5 shrink-0 mt-0.5 text-blue-500" />
            <p>{restaurant.notice}</p>
          </div>
        )}

        {/* Categories */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 opacity-50">
            <p>No items found matching "{searchQuery}"</p>
          </div>
        ) : (
          <div className="space-y-10">
            {filteredCategories.map((cat: any) => (
              <section key={cat.id} className="space-y-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold tracking-tight">{cat.name}</h2>
                  <div className="flex-1 h-px bg-black/5 mt-1"></div>
                </div>
                {cat.description && <p className="text-sm opacity-70">{cat.description}</p>}

                <div className="grid gap-4">
                  {cat.items.map((item: any) => (
                    <div 
                      key={item.id} 
                      className="p-4 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 flex justify-between gap-4 transition-transform hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-base leading-tight">{item.name}</h3>
                          <span className="font-black text-lg shrink-0" style={{ color: theme.primaryColor || '#10b981' }}>
                            {restaurant.currency || '₹'}{item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-sm opacity-70 line-clamp-2">{item.description}</p>
                        )}
                        
                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {item.tags.map((tag: string) => (
                              <span 
                                key={tag} 
                                className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md"
                                style={{
                                  backgroundColor: tag.toLowerCase() === 'veg' ? '#dcfce7' : tag.toLowerCase() === 'non-veg' ? '#fee2e2' : '#f1f5f9',
                                  color: tag.toLowerCase() === 'veg' ? '#166534' : tag.toLowerCase() === 'non-veg' ? '#991b1b' : '#334155',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center py-8 opacity-40 text-xs font-medium">
        Powered by BookMyDine QR SaaS
      </footer>
    </div>
  );
}
