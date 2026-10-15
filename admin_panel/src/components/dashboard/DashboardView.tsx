import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Eye, 
  Download, 
  QrCode as QrIcon, 
  Copy, 
  Trash2, 
  Layers, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  Utensils,
  Settings
} from 'lucide-react';
import type { SavedMenuRecord } from '../../lib/menuStorage';
import type { MenuData } from '../../types/menu';

interface DashboardViewProps {
  menus: SavedMenuRecord[];
  onSelectEditMenu: (menu: SavedMenuRecord) => void;
  onSelectPreviewMenu: (menu: SavedMenuRecord) => void;
  onOpenQrSuite: (menu: SavedMenuRecord) => void;
  onExportMenuHtml: (menuData: MenuData) => void;
  onDuplicateMenu: (id: string) => void;
  onDeleteMenu: (id: string) => void;
  onOpenCreateModal: () => void;
  onOpenSmartInput: () => void;
  onOpenSubscriptionManager: (menu: SavedMenuRecord) => void;
  onClearAllMenus?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  menus,
  onSelectEditMenu,
  onSelectPreviewMenu,
  onOpenQrSuite,
  onExportMenuHtml,
  onDuplicateMenu,
  onDeleteMenu,
  onOpenCreateModal,
  onOpenSmartInput,
  onOpenSubscriptionManager,
  onClearAllMenus,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [sortBy, setSortBy] = useState<'updated' | 'name'>('updated');

  // Stats calculation
  const totalMenus = menus.length;
  const publishedCount = menus.filter(m => m.status === 'published').length;
  const draftCount = menus.filter(m => m.status === 'draft').length;
  const totalDishes = menus.reduce((acc, m) => acc + m.itemCount, 0);

  // Filter & Sort Logic
  const filteredMenus = menus.filter(menu => {
    const matchesSearch = menu.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          menu.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          menu.themeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || menu.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return a.restaurantName.localeCompare(b.restaurantName);
    }
    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
  });

  return (
    <div className="flex-1 bg-stone-100 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 text-slate-900">
      
      {/* Top Banner & Quick Create Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">QRSS Admin Dashboard</h1>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
              Menu Studio v1.0
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Visual Canva-style menu builder & instant HTML package deployment engine for BookMyDine
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {menus.length > 0 && onClearAllMenus && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all stored menus from your browser?')) {
                  onClearAllMenus();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
              title="Clear all stored menus"
            >
              <Trash2 className="w-4 h-4" />
              Clear Stored Menus
            </button>
          )}

          <button
            onClick={onOpenSmartInput}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-700 animate-pulse" />
            AI / OCR Import
          </button>

          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Create New Menu
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Menus</p>
            <p className="text-xl font-black text-slate-900">{totalMenus}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-800 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Published Live</p>
            <p className="text-xl font-black text-slate-900">{publishedCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Draft Menus</p>
            <p className="text-xl font-black text-slate-900">{draftCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-purple-100 text-purple-800 rounded-xl">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Dishes</p>
            <p className="text-xl font-black text-slate-900">{totalDishes}</p>
          </div>
        </div>

      </div>

      {/* Main Creation Quick Cards (4 Methods) */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700" /> Start Building Menu
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={onOpenSmartInput}
            className="p-4 bg-stone-50 hover:bg-stone-100/80 border border-stone-200 rounded-2xl cursor-pointer transition-all hover:shadow-md group space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              1. Upload Menu File
            </h3>
            <p className="text-xs text-slate-500">
              Extract items automatically from existing PDF, JPG/PNG image or text file using AI/OCR.
            </p>
          </div>

          <div 
            onClick={onOpenCreateModal}
            className="p-4 bg-stone-50 hover:bg-stone-100/80 border border-stone-200 rounded-2xl cursor-pointer transition-all hover:shadow-md group space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Edit3 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              2. Add Items Manually
            </h3>
            <p className="text-xs text-slate-500">
              Add categories, dishes, prices, and dietary tags item by item using visual controls.
            </p>
          </div>

          <div 
            onClick={onOpenCreateModal}
            className="p-4 bg-stone-50 hover:bg-stone-100/80 border border-stone-200 rounded-2xl cursor-pointer transition-all hover:shadow-md group space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              3. Use Preset Template
            </h3>
            <p className="text-xs text-slate-500">
              Auto-fill from 6 curated themes: Luxury, Modern Bistro, Heritage Indian, Minimal, Street Food.
            </p>
          </div>

          <div 
            onClick={onOpenCreateModal}
            className="p-4 bg-stone-50 hover:bg-stone-100/80 border border-stone-200 rounded-2xl cursor-pointer transition-all hover:shadow-md group space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              4. Custom Canvas Design
            </h3>
            <p className="text-xs text-slate-500">
              Start with a blank canvas and construct layout, colors, and typography from scratch.
            </p>
          </div>

        </div>
      </div>

      {/* Menus Table Section */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden space-y-4 p-6">
        
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">All Restaurant Menus</h2>
            <p className="text-xs text-slate-500">Manage, edit, export HTML packages, and issue secure QR codes</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurant or theme..."
                className="pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all w-48 sm:w-60"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'updated' | 'name')}
              className="bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
            >
              <option value="updated">Sort: Last Updated</option>
              <option value="name">Sort: Name (A-Z)</option>
            </select>

            {/* Status Filter */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  statusFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('published')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  statusFilter === 'published' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setStatusFilter('draft')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  statusFilter === 'draft' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Drafts
              </button>
            </div>
          </div>
        </div>

        {/* Menus Data Table */}
        <div className="overflow-x-auto border border-stone-200 rounded-xl">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-stone-50 text-slate-900 uppercase font-black tracking-wider text-[10px] border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4">Restaurant & Slug</th>
                <th className="py-3.5 px-4">Theme</th>
                <th className="py-3.5 px-4">Dishes & Categories</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 bg-white">
              {filteredMenus.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No menus found matching your criteria. Click <strong>"Create New Menu"</strong> to get started.
                  </td>
                </tr>
              ) : (
                filteredMenus.map((record) => (
                  <tr key={record.id} className="hover:bg-stone-50/80 transition-colors">
                    
                    {/* Restaurant Name & Slug */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-sm text-slate-900">{record.restaurantName}</div>
                      <div className="text-[11px] font-mono text-emerald-700">/m/{record.slug}</div>
                    </td>

                    {/* Theme */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">
                        {record.themeName}
                      </span>
                    </td>

                    {/* Counts */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{record.itemCount} items</div>
                      <div className="text-[11px] text-slate-500">{record.categoryCount} categories</div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {record.status === 'published' ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Live Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border border-amber-300">
                          <Clock className="w-3 h-3 text-amber-700" /> Draft
                        </span>
                      )}
                    </td>

                    {/* Last Updated */}
                    <td className="py-3.5 px-4 text-slate-500 font-medium">
                      {new Date(record.lastUpdated).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        <button
                          onClick={() => onOpenSubscriptionManager(record)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-blue-200"
                          title="Manage Subscription"
                        >
                          <Settings className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onSelectEditMenu(record)}
                          className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all border border-emerald-200"
                          title="Edit in Canva Studio"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onSelectPreviewMenu(record)}
                          className="p-1.5 text-slate-700 hover:bg-stone-100 rounded-lg transition-all border border-stone-200"
                          title="Live Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onExportMenuHtml(record.menuData)}
                          className="p-1.5 text-sky-700 hover:bg-sky-50 rounded-lg transition-all border border-sky-200"
                          title="Export Production HTML Package"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onOpenQrSuite(record)}
                          className="p-1.5 text-purple-700 hover:bg-purple-50 rounded-lg transition-all border border-purple-200"
                          title="QR Code & Signed Security Suite"
                        >
                          <QrIcon className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onDuplicateMenu(record.id)}
                          className="p-1.5 text-slate-500 hover:bg-stone-100 rounded-lg transition-all border border-stone-200"
                          title="Duplicate Menu"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete menu for "${record.restaurantName}"?`)) {
                              onDeleteMenu(record.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all border border-stone-200"
                          title="Delete Menu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
