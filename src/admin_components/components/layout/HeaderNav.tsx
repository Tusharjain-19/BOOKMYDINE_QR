import React, { useState } from 'react';
import { 
  Palette, 
  QrCode, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Download, 
  RotateCcw,
  Layers,
  LayoutDashboard,
  FileCode,
  Database,
  ExternalLink,
  Check,
  ChevronDown,
  UploadCloud,
  Palette as PaintIcon
} from 'lucide-react';
import { PRESET_THEMES } from '../../lib/defaultTemplates';
import type { ThemePresetId } from '../../types/menu';

interface HeaderNavProps {
  currentView: 'dashboard' | 'editor';
  setCurrentView: (view: 'dashboard' | 'editor') => void;
  activeTab: 'extractor' | 'editor' | 'qr';
  setActiveTab: (tab: 'extractor' | 'editor' | 'qr') => void;
  deviceView: 'mobile' | 'tablet' | 'desktop';
  setDeviceView: (device: 'mobile' | 'tablet' | 'desktop') => void;
  onOpenSmartInput: () => void;
  onExportHtml: () => void;
  onExportJson: () => void;
  onReset: () => void;
  onSaveDatabase: () => void;
  onSelectPresetTheme: (themeId: ThemePresetId) => void;
  currentThemeId: string;
  restaurantName: string;
  restaurantSlug: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentView,
  setCurrentView,
  activeTab,
  setActiveTab,
  deviceView,
  setDeviceView,
  onOpenSmartInput,
  onExportHtml,
  onExportJson,
  onReset,
  onSaveDatabase,
  onSelectPresetTheme,
  currentThemeId,
  restaurantName,
  restaurantSlug,
}) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = async () => {
    onSaveDatabase();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const currentPresetName = PRESET_THEMES[currentThemeId as ThemePresetId]?.name || 'Custom Theme';

  return (
    <header className="bg-white border-b border-stone-200 text-slate-900 px-4 sm:px-6 py-2.5 min-h-[64px] flex flex-wrap xl:flex-nowrap items-center justify-between gap-3 z-50 shrink-0 shadow-xs overflow-x-auto no-scrollbar">
      
      {/* Left: Brand Logo & Current Restaurant Title */}
      <div className="flex items-center gap-3 shrink-0">
        <div 
          onClick={() => setCurrentView('dashboard')}
          className="h-9 w-9 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center font-black shadow-sm cursor-pointer transition-all shrink-0"
        >
          <Layers className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span 
              onClick={() => setCurrentView('dashboard')}
              className="text-lg font-black tracking-tight text-slate-900 cursor-pointer hover:text-emerald-700 transition-colors"
            >
              BookMyDine<span className="font-light text-slate-400">QR</span>
            </span>
            <span className="text-[10px] uppercase font-extrabold tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
              Studio
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate max-w-[180px]">
            Editing: <span className="text-emerald-700 font-bold">{restaurantName || 'My Restaurant'}</span>
          </p>
        </div>
      </div>

      {/* Middle: Clean Navigation Links & Template Switcher */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentView === 'dashboard'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('editor');
            setActiveTab('editor');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            currentView === 'editor' && activeTab === 'editor'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Menu Designer</span>
        </button>

        <button
          onClick={onOpenSmartInput}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-stone-100 border border-stone-200 transition-all shrink-0"
        >
          <UploadCloud className="w-3.5 h-3.5 text-emerald-700" />
          <span>Upload & Scan</span>
        </button>

        <button
          onClick={() => setActiveTab('qr')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'qr'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>QR Suite</span>
        </button>
      </div>

      {/* Right: Actions Bar (Device Switcher, Live Preview, Save to DB, Download HTML) */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* Segmented Device Switcher */}
        {currentView === 'editor' && (
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 shrink-0">
            <button
              onClick={() => setDeviceView('mobile')}
              title="Mobile View (375px)"
              className={`p-1.5 rounded-lg transition-all ${
                deviceView === 'mobile' ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              title="Tablet View (768px)"
              className={`p-1.5 rounded-lg transition-all ${
                deviceView === 'tablet' ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceView('desktop')}
              title="Desktop View (100% width)"
              className={`p-1.5 rounded-lg transition-all ${
                deviceView === 'desktop' ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Live Menu Link Button */}
        {restaurantSlug && (
          <a
            href={`/m/${restaurantSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 border border-stone-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
            title="View Live Menu in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">Live Preview</span>
          </a>
        )}

        {/* Save to Database Button */}
        <button
          onClick={handleSaveClick}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 text-white shrink-0 ${
            isSaved ? 'bg-emerald-800' : 'bg-emerald-700 hover:bg-emerald-800'
          }`}
          title="Save menu data directly into Database"
        >
          {isSaved ? <Check className="w-3.5 h-3.5 text-white" /> : <Database className="w-3.5 h-3.5 text-emerald-200" />}
          <span>{isSaved ? 'Saved!' : 'Save to DB'}</span>
        </button>

        {/* Download Standalone HTML Package */}
        <button
          onClick={onExportHtml}
          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0"
          title="Download standalone responsive HTML file"
        >
          <FileCode className="w-3.5 h-3.5 text-emerald-400" />
          <span>Download HTML</span>
        </button>

        {/* Export JSON Button */}
        <button
          onClick={onExportJson}
          className="hidden md:flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 border border-stone-200 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0"
          title="Download Raw JSON Package"
        >
          <Download className="w-3.5 h-3.5 text-slate-600" />
          <span>JSON</span>
        </button>

        <button
          onClick={onReset}
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-stone-100 rounded-xl transition-all border border-stone-200 shrink-0"
          title="Reset Menu"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

    </header>
  );
};
