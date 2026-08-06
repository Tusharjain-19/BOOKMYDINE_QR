import React, { useMemo } from 'react';
import { Edit3 } from 'lucide-react';
import { generateStandaloneHtml } from '../../lib/htmlGenerator';
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
}) => {
  // Generate the EXACT same HTML that gets downloaded — directly from htmlGenerator.ts
  const htmlContent = useMemo(() => generateStandaloneHtml(menuData), [menuData]);

  const getContainerClass = () => {
    switch (deviceView) {
      case 'mobile':
        return 'w-[375px] max-w-[375px] h-[720px] max-h-[calc(100vh-100px)] my-4 rounded-[36px] border-[10px] border-slate-900 shadow-2xl overflow-hidden shrink-0 ring-1 ring-slate-800';
      case 'tablet':
        return 'w-[768px] max-w-[768px] h-[820px] max-h-[calc(100vh-100px)] my-4 rounded-2xl border-[12px] border-slate-900 shadow-2xl overflow-hidden shrink-0 ring-1 ring-slate-800';
      case 'desktop':
      default:
        return 'w-full max-w-4xl min-h-[600px] h-[calc(100vh-120px)] my-4 rounded-2xl border border-stone-300 shadow-2xl overflow-hidden';
    }
  };

  return (
    <div className="flex-1 bg-stone-200/60 p-4 md:p-8 flex flex-col items-center overflow-y-auto h-[calc(100vh-64px)]">
      {/* Live Canvas Banner */}
      <div className="mb-2 px-4 py-1.5 bg-amber-50 border border-amber-300/80 text-amber-900 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5">
        <span className="flex items-center gap-1"><Edit3 className="w-3.5 h-3.5 text-amber-700" /> Live Preview:</span>
        <span className="font-medium text-amber-800">This is the exact template that gets downloaded as HTML</span>
      </div>

      <div className={`transition-all duration-300 ${getContainerClass()}`}>
        <iframe
          srcDoc={htmlContent}
          title="Menu Preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          style={{ background: menuData.theme.bgColor || '#fbf9f5' }}
        />
      </div>
    </div>
  );
};
