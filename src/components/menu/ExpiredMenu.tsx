import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

export default function ExpiredMenu({ restaurantName }: { restaurantName: string }) {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
          <UtensilsCrossed className="w-10 h-10 text-red-500" />
        </div>
        
        <div>
          <h1 className="text-2xl font-black mb-2">{restaurantName}</h1>
          <p className="text-slate-500">
            This menu is currently inactive or the subscription has expired.
          </p>
        </div>

        <div className="pt-6 border-t border-stone-100">
          <p className="text-xs text-slate-400">
            Powered by BookMyDine QR SaaS
          </p>
        </div>
      </div>
    </div>
  );
}
