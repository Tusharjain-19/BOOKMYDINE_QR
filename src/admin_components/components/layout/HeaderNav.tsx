import React from 'react';
import { 
  Sparkles, 
  Palette, 
  QrCode, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Download, 
  RotateCcw,
  Layers,
  BookOpen,
  LayoutDashboard,
  FileCode
} from 'lucide-react';

interface HeaderNavProps {
  currentView: 'dashboard' | 'editor';
  setCurrentView: (view: 'dashboard' | 'editor') => void;
  activeTab: 'extractor' | 'editor' | 'qr';
  setActiveTab: (tab: 'extractor' | 'editor' | 'qr') => void;
  deviceView: 'mobile' | 'tablet' | 'desktop';
  setDeviceView: (device: 'mobile' | 'tablet' | 'desktop') => void;
  onOpenSmartInput: () => void;
  onOpenStitchMd: () => void;
  onExportHtml: () => void;
  onExportJson: () => void;
  onReset: () => void;
  onPublish?: () => void;
  onSave?: () => void;
  restaurantName: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentView,
  setCurrentView,
  activeTab,
  setActiveTab,
  deviceView,
  setDeviceView,
  onOpenSmartInput,
  onOpenStitchMd,
  onExportHtml,
  onExportJson,
  onReset,
  onPublish,
  onSave,
  restaurantName,
}) => {
  return (
    <header className="h-16 bg-white border-b border-stone-200 text-slate-900 px-4 sm:px-6 flex items-center justify-between z-50 shrink-0 shadow-sm">
      
      {/* Left: Main Website Logo & View Switcher */}
      <div className="flex items-center gap-3">
        <div 
          onClick={() => setCurrentView('dashboard')}
          className="h-9 w-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0 cursor-pointer hover:bg-emerald-800 transition-all"
        >
          <Layers className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span 
              onClick={() => setCurrentView('dashboard')}
              className="text-lg font-extrabold tracking-tight text-slate-900 cursor-pointer hover:text-emerald-700 transition-colors"
            >
              BookMyDine<span className="font-light text-slate-500">QR</span>
            </span>
            <span className="text-[10px] uppercase font-black tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full">
              Admin Studio
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate max-w-[200px]">
            Editing: <span className="text-emerald-700 font-bold">{restaurantName || 'My Restaurant'}</span>
          </p>
        </div>
      </div>

      {/* Middle: Navigation Mode Tabs */}
      <div className="hidden lg:flex items-center bg-stone-100 p-1.5 rounded-xl border border-stone-200 gap-1">
        
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            currentView === 'dashboard'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/70'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Dashboard
        </button>

        <button
          onClick={() => {
            setCurrentView('editor');
            setActiveTab('editor');
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            currentView === 'editor' && activeTab === 'editor'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/70'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Canva Designer
        </button>

        <button
          onClick={onOpenSmartInput}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 hover:bg-emerald-100/80 border border-emerald-300 bg-emerald-50 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
          AI / File Import
        </button>

        <button
          onClick={onOpenStitchMd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-900 hover:bg-amber-100/80 border border-amber-300 bg-amber-50 transition-all"
          title="Stitch Project design.md"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          Stitch design.md
        </button>

        <button
          onClick={() => setActiveTab('qr')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'qr'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/70'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          QR & Security
        </button>

      </div>

      {/* Right: Device Viewport Switcher & Actions */}
      <div className="flex items-center gap-2.5">
        
        {/* Device Switcher (Visible in Editor mode) */}
        {currentView === 'editor' && (
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              onClick={() => setDeviceView('mobile')}
              title="Mobile View (375px)"
              className={`p-1.5 rounded-lg transition-all ${
                deviceView === 'mobile' ? 'bg-white text-emerald-700 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              title="Tablet View (768px)"
              className={`p-1.5 rounded-lg transition-all ${
                deviceView === 'tablet' ? 'bg-white text-emerald-700 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceView('desktop')}
              title="Desktop View (1920px)"
              className={`p-1.5 rounded-lg transition-all ${
                deviceView === 'desktop' ? 'bg-white text-emerald-700 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Save Button */}
        {onSave && (
          <button
            onClick={onSave}
            className="flex items-center gap-1.5 bg-stone-200 hover:bg-stone-300 text-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
            title="Save to Dashboard"
          >
            Save
          </button>
        )}

        {/* Publish Button */}
        {onPublish && (
          <button
            onClick={onPublish}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
            title="Publish to Live Menu Website"
          >
            Publish
          </button>
        )}

        {/* Export HTML Package Button */}
        <button
          onClick={onExportHtml}
          className="hidden lg:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
          title="Export Standalone HTML5 index.html Package"
        >
          <FileCode className="w-3.5 h-3.5 text-emerald-400" />
          Export HTML
        </button>

        {/* Export JSON Button */}
        <button
          onClick={onExportJson}
          className="hidden sm:flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
          title="Download Menu JSON Package"
        >
          <Download className="w-3.5 h-3.5 text-white" />
          JSON
        </button>

        <button
          onClick={onReset}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-stone-100 rounded-xl transition-all border border-stone-200"
          title="Reset Menu"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

    </header>
  );
};
