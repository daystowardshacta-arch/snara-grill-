import React, { useState } from 'react';
import { Minus, Plus, Check, Clock } from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { SANARA_INFO } from '../data/menuData';
import { SymbolIcon } from './SymbolIcon';
import { SecureVideo } from './VideoPlayerModal';

interface DishDetailDrawerProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const DishDetailDrawer: React.FC<DishDetailDrawerProps> = ({ item, onClose }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  if (!item) return null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(item);
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 drawer-overlay" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-obs2 rounded-t-[28px] p-6 md:p-8 border-t border-obs3 shadow-2xl fade-up z-10">
        <div
          className="w-10 h-1.5 bg-obs4 rounded-full mx-auto mb-5 cursor-pointer"
          onClick={onClose}
        />

        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 pr-4">
            {item.badge && (
              <span className="inline-block px-2 py-0.5 bg-ochre/15 text-ochre text-[10px] uppercase tracking-widest font-bold rounded mb-2">
                {item.badge}
              </span>
            )}
            <h2 className="font-serif text-[26px] text-cream leading-tight">{item.name}</h2>
            <p className="font-sans text-[12px] text-cream/50 mt-0.5">{item.cat}</p>
          </div>

          <div className="w-[72px] h-[72px] rounded-[16px] overflow-hidden shrink-0 border border-obs3 shadow relative bg-obs3/40 flex items-center justify-center">
            {item.videoUrl ? (
              <SecureVideo
                src={item.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                onTimeUpdate={(e) => {
                  if (e.currentTarget.currentTime >= 3) {
                    e.currentTarget.currentTime = 0;
                  }
                }}
              />
            ) : item.image ? (
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full food-gradient flex items-center justify-center">
                <SymbolIcon symbol={item.emoji} size={36} cl="text-ochre" />
              </div>
            )}
          </div>
        </div>

        <p className="font-sans text-[14px] text-cream/70 leading-relaxed mb-5">{item.desc}</p>

        <div className="flex gap-2 mb-5 flex-wrap">
          <span className="px-3 py-1 bg-obs3 text-cream/70 rounded-full text-[10px] font-sans border border-obs4 flex items-center gap-1.5">
            <Clock size={13} className="text-orange-400" /> {item.time} min
          </span>
          {item.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-obs3 text-cream/70 rounded-full text-[10px] font-sans border border-obs4"
            >
              {t}
            </span>
          ))}
        </div>

        {item.kcal > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-5">
            {[
              { label: 'Calories', value: `${item.kcal} kcal` },
              { label: 'Prep Time', value: `${item.time} min` },
            ].map((stat, idx) => (
              <div key={idx} className="bg-obs border border-obs3 rounded-[10px] p-3 text-center">
                <div className="text-[9px] text-terra font-bold mb-1 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-[13px] text-cream font-medium">{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-5 border-t border-obs3">
          <div>
            <div className="text-ochre font-serif text-[26px] italic">
              TZS {item.price.toLocaleString()}
            </div>
            <div className="text-cream/40 text-[11px] font-sans">incl. all taxes</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-obs border border-obs3 rounded-full overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-cream/60 hover:text-cream cursor-pointer"
              >
                <Minus size={14} />
              </button>
              <span className="px-2 text-cream font-sans text-[13px] font-semibold w-6 text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 text-cream/60 hover:text-cream cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={`h-[44px] px-7 rounded-lg font-sans text-[12px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                added ? 'bg-teal text-obs' : 'bg-ochre text-obs hover:bg-ochre2'
              }`}
            >
              {added ? <Check size={18} /> : 'Add'}
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-stone-400 mt-3 font-sans">
          Sanara Grill Order Line: <span className="text-orange-400 font-bold">{SANARA_INFO.phonePrimary}</span>
        </p>
      </div>
    </div>
  );
};
