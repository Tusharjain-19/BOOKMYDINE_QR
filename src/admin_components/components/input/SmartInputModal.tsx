import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  FileText, 
  UploadCloud, 
  Layout, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Code
} from 'lucide-react';
import { parseRawTextToMenu } from '../../lib/parser';
import { extractTextFromImageFile, extractTextFromPdfFile } from '../../lib/ocr';
import { PRESET_THEMES } from '../../lib/defaultTemplates';
import type { MenuCategory, RestaurantDetails, ThemeConfig, ThemePresetId } from '../../types/menu';

interface SmartInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyImportedMenu: (categories: MenuCategory[], applyTheme?: ThemeConfig, restaurantDetails?: Partial<RestaurantDetails>) => void;
  onSelectPresetTheme: (themeId: ThemePresetId) => void;
}

export const SmartInputModal: React.FC<SmartInputModalProps> = ({
  isOpen,
  onClose,
  onApplyImportedMenu,
  onSelectPresetTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'json' | 'text' | 'file' | 'presets'>('json');
  const [rawText, setRawText] = useState<string>(`OM SWEETS
Authentic Taste of Gaya, Bihar

📍 Tekari Road, Gaya, Bihar
📞 +91 98765 43210

[SWEETS & DESSERTS]
Gulab Jamun (2 pcs) ... ₹60 (Veg)
Kaju Katli (250g) ... ₹240 (Veg) (Bestseller)
Rasgulla (2 pcs) ... ₹50 (Veg)

[SNACKS & CHAAT]
Samosa with Chole (2 pcs) ... ₹50 (Veg) (Spicy)
Raj Kachori ... ₹120 (Veg) (Chef Special)`);

  const [jsonInputText, setJsonInputText] = useState<string>(`{
  "restaurant": {
    "name": "OM SWEETS",
    "tagline": "Authentic Sweets & Snacks",
    "currency": "₹",
    "address": "Gaya, Bihar",
    "phone": "+91 98765 43210"
  },
  "categories": [
    {
      "name": "Sweets & Desserts",
      "description": "Pure ghee authentic Indian sweets",
      "items": [
        {
          "name": "Gulab Jamun (2 pcs)",
          "description": "Soft milk-solid balls soaked in rose scented syrup",
          "price": "60",
          "isVeg": true
        },
        {
          "name": "Kaju Katli (250g)",
          "description": "Premium cashew nut fudge with silver leaf",
          "price": "240",
          "isVeg": true,
          "isBestseller": true
        }
      ]
    },
    {
      "name": "Snacks & Chaat",
      "description": "Crispy samosas and hot snacks",
      "items": [
        {
          "name": "Samosa with Chole (2 pcs)",
          "description": "Spicy potato pastry served with chickpea curry",
          "price": "50",
          "isVeg": true,
          "isSpicy": true
        }
      ]
    }
  ]
}`);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressMsg, setProgressMsg] = useState<string>('');
  const [extractSuccess, setExtractSuccess] = useState<string | null>(null);
  const [extractError, setExtractError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleParseRawText = () => {
    setExtractError(null);
    setExtractSuccess(null);
    if (!rawText.trim()) {
      setExtractError('Please enter or paste menu text first.');
      return;
    }

    const { restaurantDetails, categories, detectedCount } = parseRawTextToMenu(rawText);
    const hasName = Boolean(restaurantDetails?.name);

    if (detectedCount === 0 && !hasName) {
      setExtractError('No shop details or menu items detected. Try pasting formatted lines with prices or restaurant title.');
      return;
    }

    const msgParts: string[] = [];
    if (hasName) msgParts.push(`Restaurant: "${restaurantDetails?.name}"`);
    if (detectedCount > 0) msgParts.push(`${detectedCount} menu items across ${categories.length} categories`);

    setExtractSuccess(`Successfully detected! ${msgParts.join(' & ')}. Applying to editor...`);

    setTimeout(() => {
      onApplyImportedMenu(categories, undefined, restaurantDetails);
      onClose();
    }, 900);
  };

  const handleImportJson = () => {
    setExtractError(null);
    setExtractSuccess(null);
    if (!jsonInputText.trim()) {
      setExtractError('Please enter JSON code payload.');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInputText);
      let categories: MenuCategory[] = [];
      let restaurantDetails: Partial<RestaurantDetails> = {};

      if (parsed.categories && Array.isArray(parsed.categories)) {
        categories = parsed.categories.map((c: any, index: number) => ({
          id: c.id || `cat-${Date.now()}-${index}`,
          name: c.name || `Category ${index + 1}`,
          description: c.description || '',
          items: Array.isArray(c.items)
            ? c.items.map((item: any, itemIdx: number) => ({
                id: item.id || `item-${Date.now()}-${itemIdx}`,
                name: item.name || 'Dish Item',
                description: item.description || '',
                price: String(item.price ?? '0'),
                category: c.name || '',
                image: item.image || '',
                isVeg: item.isVeg !== undefined ? item.isVeg : true,
                isNonVeg: item.isNonVeg || false,
                isSpicy: item.isSpicy || false,
                isBestseller: item.isBestseller || false,
                isChefSpecial: item.isChefSpecial || false,
                tags: item.tags || [],
              }))
            : [],
        }));
      }

      if (parsed.restaurant && typeof parsed.restaurant === 'object') {
        restaurantDetails = parsed.restaurant;
      }

      const totalDishes = categories.reduce((sum, c) => sum + (c.items?.length || 0), 0);

      if (categories.length === 0 && !restaurantDetails.name) {
        setExtractError('No valid categories or restaurant details found in JSON. Format: { "restaurant": {...}, "categories": [...] }');
        return;
      }

      setExtractSuccess(`✓ Valid JSON! ${categories.length} Categories & ${totalDishes} Dishes loaded. Applying...`);

      setTimeout(() => {
        onApplyImportedMenu(categories, undefined, restaurantDetails);
        onClose();
      }, 800);
    } catch (err: any) {
      setExtractError(`Invalid JSON Syntax: ${err.message}`);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setExtractError(null);
    setExtractSuccess(null);
    setProgressMsg('Reading uploaded file...');

    try {
      let extractedText = '';
      if (file.type === 'application/pdf') {
        extractedText = await extractTextFromPdfFile(file, (_, status) => setProgressMsg(status));
      } else {
        extractedText = await extractTextFromImageFile(file, (_, status) => setProgressMsg(status));
      }

      setRawText(extractedText);
      const { restaurantDetails, detectedCount } = parseRawTextToMenu(extractedText);
      const hasName = Boolean(restaurantDetails?.name);

      if (detectedCount > 0 || hasName) {
        setExtractSuccess(`Extracted details from ${file.name}! Review text or click Apply to Editor.`);
      } else {
        setExtractSuccess(`Extracted text from ${file.name}. Review in Text Editor tab to tweak.`);
      }
    } catch (err: any) {
      setExtractError(err.message || 'Error processing file');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh] text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-700 rounded-xl text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Import & Add Menu Items</h2>
              <p className="text-xs text-slate-500">Import JSON payload, raw text lines, PDF/Images, or preset templates</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-stone-200/60 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-stone-200 bg-stone-50/50 px-6 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-xs transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'json'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-4 h-4 text-emerald-700" />
            JSON Code Import
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-xs transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'text'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Raw Text Parser
          </button>
          <button
            onClick={() => setActiveTab('file')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-xs transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'file'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            PDF / Image OCR
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-xs transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'presets'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layout className="w-4 h-4" />
            6 Starter Templates
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 0: JSON CODE INPUT */}
          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-emerald-700" />
                  Paste JSON menu payload (Categories, Items, Prices, Descriptions & Dietary Tags):
                </label>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  JSON Schema Supported
                </span>
              </div>

              <textarea
                value={jsonInputText}
                onChange={(e) => setJsonInputText(e.target.value)}
                rows={12}
                placeholder="Paste valid JSON menu schema here..."
                className="w-full bg-stone-900 border border-stone-800 rounded-xl p-4 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 resize-none shadow-inner leading-relaxed"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500 italic">
                  Tip: Includes restaurant details, categories, items, prices & dietary flags (`isVeg`, `isNonVeg`, `isSpicy`, `isBestseller`).
                </span>
                <button
                  onClick={handleImportJson}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Code className="w-4 h-4" />
                  <span>Import JSON Menu</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: PASTE TEXT */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  Enter shop name, address, items & prices:
                </label>
                <span className="text-[11px] text-slate-500 font-medium">Auto-detects Shop Name, Address & Items</span>
              </div>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={10}
                placeholder="Paste shop details & menu... e.g. Om Sweets, Tekari Road, Gaya. Samosa ... ₹50"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600/30 resize-none shadow-inner"
              />
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleParseRawText}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Parse Text to Menu</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: FILE UPLOAD */}
          {activeTab === 'file' && (
            <div className="space-y-6 py-4">
              <div className="border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-2xl p-8 text-center bg-stone-50/50 transition-all">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="smart-file-upload"
                  disabled={isProcessing}
                />
                <label htmlFor="smart-file-upload" className="cursor-pointer space-y-3 block">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Upload Menu Image or PDF Document</p>
                    <p className="text-xs text-slate-500 mt-1">Supports PNG, JPG, JPEG, WEBP or PDF menu scans</p>
                  </div>
                  <span className="inline-block px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-all shadow-sm">
                    Select Menu File
                  </span>
                </label>
              </div>

              {isProcessing && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-xs text-emerald-900 font-medium">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
                  <span>{progressMsg}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: STARTER TEMPLATES */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">Select one of our 6 production templates to load sample layout:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.values(PRESET_THEMES).map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      onSelectPresetTheme(preset.id);
                      onClose();
                    }}
                    className="p-4 border border-stone-200 hover:border-emerald-600 bg-stone-50 hover:bg-white rounded-xl text-left transition-all space-y-2 group shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center" style={{ backgroundColor: preset.primaryColor }}>
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">{preset.name}</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{preset.headerStyle} style</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error / Success Notifications */}
          {extractError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{extractError}</span>
            </div>
          )}

          {extractSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{extractSuccess}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
