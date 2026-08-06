import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Edit3, 
  Layout, 
  Sparkles, 
  ArrowRight, 
  UtensilsCrossed, 
  FileText
} from 'lucide-react';
import { PRESET_THEMES } from '../../lib/defaultTemplates';
import type { ThemePresetId } from '../../types/menu';

interface CreateMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWithMethod: (method: 'upload' | 'manual' | 'template' | 'blank', data?: { name: string; themeId?: ThemePresetId }) => void;
}

export const CreateMenuModal: React.FC<CreateMenuModalProps> = ({
  isOpen,
  onClose,
  onCreateWithMethod,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upload' | 'manual' | 'template' | 'blank'>('template');
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [selectedThemeId, setSelectedThemeId] = useState<ThemePresetId>('luxury');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateWithMethod(selectedMethod, {
      name: restaurantName,
      themeId: selectedThemeId,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-700 rounded-xl text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Create New Restaurant Menu</h2>
              <p className="text-xs text-slate-500">Choose how you want to build your digital QR menu</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-stone-200/60 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Restaurant Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <UtensilsCrossed className="w-4 h-4 text-emerald-700" /> Restaurant Name:
            </label>
            <input
              type="text"
              required
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="e.g. Spice Villa, Urban Cafe, Metro Grill"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
            />
          </div>

          {/* 4 Creation Paths Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900">Select Creation Method:</label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              
              {/* Option 1: Template Auto-fill */}
              <div
                onClick={() => setSelectedMethod('template')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethod === 'template'
                    ? 'border-emerald-700 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                    <Layout className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-700 text-white px-2 py-0.5 rounded-full">
                    Recommended
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Use Template & Auto-fill</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Pick a premium theme preset with sample categories and dish cards pre-formatted.
                  </p>
                </div>
              </div>

              {/* Option 2: Upload Existing Menu */}
              <div
                onClick={() => setSelectedMethod('upload')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethod === 'upload'
                    ? 'border-emerald-700 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                    AI / OCR
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Upload Existing Menu</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Extract categories, prices & text directly from PDF, images or raw text menu.
                  </p>
                </div>
              </div>

              {/* Option 3: Add Items Manually */}
              <div
                onClick={() => setSelectedMethod('manual')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethod === 'manual'
                    ? 'border-emerald-700 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-sky-100 text-sky-800 rounded-xl">
                    <Edit3 className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Add Items Manually</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Build categories and dishes one by one in the drag & drop editor studio.
                  </p>
                </div>
              </div>

              {/* Option 4: Custom Blank Canvas */}
              <div
                onClick={() => setSelectedMethod('blank')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedMethod === 'blank'
                    ? 'border-emerald-700 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-purple-100 text-purple-800 rounded-xl">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Custom Blank Canvas</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Start with a clean slate and build custom layouts from scratch.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Theme Selector if Template / Blank selected */}
          {(selectedMethod === 'template' || selectedMethod === 'blank') && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900">Choose Starting Theme Preset:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(Object.keys(PRESET_THEMES) as ThemePresetId[]).map((themeKey) => {
                  const preset = PRESET_THEMES[themeKey];
                  const isSelected = selectedThemeId === themeKey;
                  return (
                    <button
                      type="button"
                      key={themeKey}
                      onClick={() => setSelectedThemeId(themeKey)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-600'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: preset.primaryColor }} />
                        <div className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: preset.bgColor }} />
                        <span className="text-xs font-bold truncate text-slate-900">{preset.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">{preset.fontHeader.split(',')[0]}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              Start Building Menu <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
