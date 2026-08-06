import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Sparkles, 
  Check, 
  Copy,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import type { ThemePresetId } from '../../types/menu';

interface StitchDesignMdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyStitchTheme: (themeId: ThemePresetId) => void;
}

export const STITCH_DESIGN_MD_CONTENT = `---
name: Atelier Minimalist (Stitch Project 2115898792409020010)
colors:
  primary: '#170f0b'
  primary-container: '#2d241f'
  secondary: '#695c52'
  secondary-container: '#efdcd0'
  tertiary-container: '#ca7857'
  background: '#fbf9f5'
  surface: '#ffffff'
  surface-container: '#efeeea'
  outline-variant: '#d1c4be'
typography:
  headline-xl: EB Garamond (48px / 56px)
  headline-lg: EB Garamond (32px / 40px)
  headline-md: EB Garamond (24px / 32px)
  body-lg: Inter (18px / 28px)
  body-md: Inter (16px / 24px)
  price-md: Inter SemiBold (16px / 24px)
  label-sm: Inter 12px (0.08em tracking)
---

## Brand & Style
The design system is rooted in the intersection of Scandinavian functionality and Japanese minimalism (*Wabi-sabi*). It prioritizes "empty space" as much as content, creating an editorial experience resembling a curated lifestyle magazine.

### Key Aesthetics:
- **Quiet Luxury:** High-quality typography and a restrained color palette.
- **Organic Precision:** Balanced grid layouts with soft, organic shapes and natural tones.
- **Tactile Digitalism:** Surfaces that feel like premium uncoated paper through subtle depth and warm neutrals.

## Color Tokens & Palette
- **Primary (Deep Espresso):** #170f0b — Essential interactive states and headings.
- **Secondary (Muted Brown):** #695c52 — Descriptive text and secondary metadata.
- **Accent (Muted Terracotta):** #ca7857 — Call-to-actions, category highlights, or "New" indicators.
- **Background (Warm Ivory):** #fbf9f5 — Paper-like canvas reducing eye strain.
- **Surface (Soft White):** #ffffff — Card containers and elevated elements.

## 6 Stitch Project Menu Screens Integrated:
1. **The Minimalist Digital Menu** (Atelier Minimalist / Cream & Espresso)
2. **The Obsidian Digital Menu** (Luxury Fine Dining / Champagne Gold & Midnight)
3. **The Heritage Reserve Digital Menu** (Traditional Heritage / Royal Maroon & Gold)
4. **Komorebi Modern Bistro** (Forest Green & Warm Ivory)
5. **Street Eats Urban Kitchen** (Vibrant Crimson & Mustard Yellow)
6. **Neon Taproom & Craft Bar** (Dark Industrial Glass & Amber Glow)
`;

export const StitchDesignMdModal: React.FC<StitchDesignMdModalProps> = ({
  isOpen,
  onClose,
  onApplyStitchTheme,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeScreenTab, setActiveScreenTab] = useState<ThemePresetId>('minimal');

  if (!isOpen) return null;

  const handleCopyMd = () => {
    navigator.clipboard.writeText(STITCH_DESIGN_MD_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const STITCH_SCREENS: { id: ThemePresetId; title: string; subtitle: string; color: string }[] = [
    { id: 'minimal', title: 'The Minimalist Digital Menu', subtitle: 'Atelier Minimalist (EB Garamond & Inter)', color: '#2d241f' },
    { id: 'luxury', title: 'The Obsidian Digital Menu', subtitle: 'Luxury Fine Dining (Champagne Gold & Midnight)', color: '#e5c276' },
    { id: 'traditional', title: 'The Heritage Reserve', subtitle: 'Heritage Indian (Royal Maroon & Gold)', color: '#5d181b' },
    { id: 'modern', title: 'Komorebi Modern Bistro', subtitle: 'Japanese & Scandi Fusion (Forest Green)', color: '#4b6549' },
    { id: 'street', title: 'Street Eats Urban Kitchen', subtitle: 'Urban Fast Food (Vibrant Crimson)', color: '#ac2c23' },
    { id: 'dark', title: 'Neon Taproom & Craft Bar', subtitle: 'Premium Dark Glass (Amber Glow)', color: '#ffc574' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-700 rounded-xl text-white shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">Stitch Project 2115898792409020010</h2>
                <span className="text-[10px] uppercase font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                  design.md Verified
                </span>
              </div>
              <p className="text-xs text-slate-500">Official Design System & 6 Menu Screens imported from Stitch</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <a 
              href="https://stitch.withgoogle.com/projects/2115898792409020010" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-100 text-slate-700 border border-stone-200 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-700" /> Open in Stitch
            </a>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-stone-200/60 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Quick Apply 6 Stitch Project Screens */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              6 Integrated Stitch Project Menu Screens:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {STITCH_SCREENS.map((sc) => (
                <div
                  key={sc.id}
                  onClick={() => {
                    setActiveScreenTab(sc.id);
                    onApplyStitchTheme(sc.id);
                  }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all space-y-2 group shadow-sm ${
                    activeScreenTab === sc.id
                      ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600/30'
                      : 'border-stone-200 bg-stone-50 hover:bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 truncate">{sc.title}</span>
                    <div className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ backgroundColor: sc.color }} />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">{sc.subtitle}</p>
                  <button className="w-full py-1 text-[11px] font-bold bg-white text-emerald-800 border border-emerald-300 rounded-lg text-center group-hover:bg-emerald-700 group-hover:text-white transition-all">
                    Apply Screen Theme
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* design.md Specification Code Box */}
          <div className="space-y-2 pt-4 border-t border-stone-200">
            <div className="flex justify-between items-center">
              <label className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-700" />
                Raw design.md Specification (Atelier Minimalist):
              </label>
              <button
                onClick={handleCopyMd}
                className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-lg transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied design.md!' : 'Copy design.md'}
              </button>
            </div>

            <pre className="bg-stone-900 text-amber-200 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-72 border border-stone-800 leading-relaxed shadow-inner">
              {STITCH_DESIGN_MD_CONTENT}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex justify-between items-center">
          <span className="text-xs text-slate-500 font-medium">Connected with Stitch Project 2115898792409020010</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
