import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, ClipboardList, Gift, Flame, Check, Trash2, X } from 'lucide-react';
import { NotificationItem } from '../types';

export const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Uagizaji Umepokelewa! 🍛',
      description: 'My Choice combo request is being hand-crafted with pure Zanzibar spices by our head chefs in Mbeya.',
      time: '2 mins ago',
      read: false,
      type: 'order',
    },
    {
      id: '2',
      title: 'Mbeya Office Lunch Promo! 🛵',
      description: 'Homa ya ofisini? Enjoys free delivery inside Mbeya town area for orders above TZS 25,000 between 12:00 PM - 2:00 PM.',
      time: '1 hour ago',
      read: false,
      type: 'promo',
    },
    {
      id: '3',
      title: 'Biryani Pambe is Back! 🔥',
      description: 'Back by popular customer demand. Weekend special Biryani is available for pre-booking with real local beef and chicken options.',
      time: '4 hours ago',
      read: false,
      type: 'alert',
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const renderIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return <ClipboardList className="w-4 h-4 text-[#10b981]" />;
      case 'promo':
        return <Gift className="w-4 h-4 text-ochre" />;
      case 'alert':
        return <Flame className="w-4 h-4 text-orange-500" />;
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className="relative w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center transition-all cursor-pointer text-cream"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Notifications"
      >
        <Bell className="w-[17px] h-[17px] text-slate-700" strokeWidth={2.4} aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute -top-[5px] -right-[5px] min-w-[18px] h-[18px] px-1 bg-ochre border-2 border-white text-white text-[9px] font-black flex items-center justify-center rounded-full animate-bounce">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-3 w-[320px] sm:w-[350px] bg-white border border-slate-200 rounded-[16px] shadow-xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-extrabold text-[15px] text-cream">Arifa</span>
                {unreadCount > 0 && (
                  <span className="bg-ochre/10 text-ochre text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                    {unreadCount} mpya
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="font-sans text-[10px] uppercase font-bold tracking-wider text-[#10b981] hover:text-[#059669] transition-colors cursor-pointer"
                  >
                    Soma Zote
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-100">
              {notifications.length > 0 ? (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 transition-all hover:bg-slate-50/50 relative group flex gap-3 ${
                      item.read ? '' : 'bg-slate-50/30 font-medium'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200/50">
                        {renderIcon(item.type)}
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-baseline justify-between gap-1">
                        <h4
                          className={`text-[12.5px] leading-snug flex-1 ${
                            item.read ? 'text-cream2 font-medium' : 'text-cream font-bold'
                          }`}
                        >
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-normal whitespace-nowrap self-start">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-sans">
                        {item.description}
                      </p>
                      <div className="flex gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={(e) => toggleRead(item.id, e)}
                          className="flex items-center gap-1 font-sans text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-cream transition-colors cursor-pointer"
                        >
                          <Check className={`w-3.5 h-3.5 ${item.read ? 'text-[#10b981]' : 'text-slate-400'}`} />
                          {item.read ? 'Soma' : 'Soma tayari'}
                        </button>
                        <button
                          onClick={(e) => deleteNotification(item.id, e)}
                          className="flex items-center gap-1 font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-ochre transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          Futa
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <Bell className="w-8 h-8 mx-auto stroke-1 mb-2.5 opacity-40 text-slate-500" />
                  <p className="font-serif text-[13px] text-slate-500 font-light">
                    Hakuna arifa mpya kwa sasa
                  </p>
                  <p className="font-sans text-[10px] text-slate-400 mt-0.5">
                    Utapokea arifa kukiwa na mabadiliko ya maagizo yako.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
              <span className="font-sans text-[9px] uppercase tracking-widest font-extrabold text-ochre">
                Good Choice Mbeya
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
