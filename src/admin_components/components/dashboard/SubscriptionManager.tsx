import React, { useState, useEffect } from 'react';
import { X, Calendar, Settings, CreditCard, ShieldCheck } from 'lucide-react';
import type { SavedMenuRecord, SubscriptionData } from '../../lib/menuStorage';

interface SubscriptionManagerProps {
  isOpen: boolean;
  onClose: () => void;
  menuRecord: SavedMenuRecord | null;
  onSave: (menuId: string, subscription: SubscriptionData, isActive: boolean) => Promise<void>;
}

export const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({
  isOpen,
  onClose,
  menuRecord,
  onSave,
}) => {
  const [plan, setPlan] = useState<'99' | 'custom' | '499'>('99');
  const [startDate, setStartDate] = useState<string>('');
  const [validTill, setValidTill] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (menuRecord) {
      if (menuRecord.subscription) {
        setPlan(menuRecord.subscription.plan);
        setStartDate(menuRecord.subscription.startDate.split('T')[0]);
        setValidTill(menuRecord.subscription.validTill.split('T')[0]);
      } else {
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(today.getMonth() + 1);
        
        setPlan('99');
        setStartDate(today.toISOString().split('T')[0]);
        setValidTill(nextMonth.toISOString().split('T')[0]);
      }
      setIsActive(menuRecord.isActive ?? true);
    }
  }, [menuRecord]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuRecord) return;
    
    setIsSaving(true);
    try {
      const limit = plan === '99' ? 1 : plan === '499' ? 10 : 5;
      const sub: SubscriptionData = {
        plan,
        startDate: new Date(startDate).toISOString(),
        validTill: new Date(validTill).toISOString(),
        limit
      };
      
      await onSave(menuRecord.id, sub, isActive);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !menuRecord) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-700 rounded-xl text-white shadow-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Manage Subscription</h2>
              <p className="text-xs text-slate-500">{menuRecord.restaurantName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Plan Tier</label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value as any)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
            >
              <option value="99">₹99 Plan (Limit: 1 Menu)</option>
              <option value="custom">Custom Plan (Limit: 5 Menus)</option>
              <option value="499">₹499 Plan (Limit: 10 Menus)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Valid Till</label>
              <input
                type="date"
                value={validTill}
                onChange={(e) => setValidTill(e.target.value)}
                required
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200 rounded-lg mt-2">
            <input
              type="checkbox"
              id="isActiveToggle"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-stone-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActiveToggle" className="text-sm font-medium text-slate-700 select-none flex-1">
              Active Status
            </label>
            <div className={`text-xs px-2 py-1 rounded-full font-bold ${isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
              {isActive ? 'Live' : 'Disabled'}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-stone-100 text-slate-700 font-bold rounded-lg hover:bg-stone-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
