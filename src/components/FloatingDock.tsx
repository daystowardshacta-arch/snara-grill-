import React, { useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import {
  House,
  Utensils,
  ShoppingCart,
  CalendarCheck,
  Image as ImageIcon,
  Phone,
  Info
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface DockItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface FloatingDockProps {
  className?: string;
  customItems?: DockItem[];
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ className = '', customItems }) => {
  const location = useLocation();
  const mouseX = useMotionValue(Infinity);
  const { cartCount } = useCart();

  const defaultItems: DockItem[] = [
    { to: '/', label: 'Home', icon: House },
    { to: '/about', label: 'About', icon: Info },
    { to: '/menu', label: 'Menu', icon: Utensils },
    { to: '/reservations', label: 'Reservations', icon: CalendarCheck },
    { to: '/cart', label: 'Order Cart', icon: ShoppingCart, badge: cartCount > 0 ? cartCount : undefined },
    { to: '/gallery', label: 'Gallery', icon: ImageIcon },
    { to: '/contact', label: 'Contact', icon: Phone },
  ];

  const items = customItems || defaultItems;

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[45] flex flex-col items-center gap-2 pointer-events-none ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.2 }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end gap-3.5 bg-obs/75 sm:bg-obs2/60 border border-obs3/60 backdrop-blur-2xl px-4 py-3 rounded-2xl sm:rounded-3xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)] relative group/dock"
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ochre/25 to-transparent blur-xs pointer-events-none" />
        {items.map((item, idx) => (
          <DockIcon key={item.label + idx} item={item} mouseX={mouseX} isActive={location.pathname === item.to} />
        ))}
      </motion.div>
    </div>
  );
};

interface DockIconProps {
  item: DockItem;
  mouseX: any;
  isActive: boolean;
}

const DockIcon: React.FC<DockIconProps> = ({ item, mouseX, isActive }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-140, 0, 140], [42, 64, 42]);
  const heightSync = useTransform(distance, [-140, 0, 140], [42, 64, 42]);

  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 14 });
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 200, damping: 14 });

  const Icon = item.icon;

  return (
    <Link to={item.to} ref={ref} className="relative block">
      <motion.div
        style={{ width, height }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.9 }}
        className={`flex items-center justify-center rounded-xl sm:rounded-2xl relative transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-b from-ochre/15 to-ochre/5 border border-ochre/60 shadow-[0_0_15px_rgba(230,172,0,0.15)] text-ochre'
            : 'bg-obs2/40 hover:bg-obs3/80 border border-obs3/30 hover:border-cream/20 text-cream/70 hover:text-cream'
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10 rounded-t-xl sm:rounded-t-2xl pointer-events-none" />

        {isActive && (
          <motion.div
            layoutId="active-indicator"
            className="absolute -bottom-1 w-1 h-1 rounded-full bg-ochre shadow-[0_0_8px_#ffd700]"
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          />
        )}

        <motion.span
          animate={isHovered ? { scale: 1.12 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          className="flex items-center justify-center p-2.5 z-10"
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.span>

        {item.badge !== undefined && (
          <span className="absolute -top-1.5 -right-1.5 bg-[#dc2626] border border-obs/80 text-white font-extrabold rounded-full px-1.5 py-0.5 text-[8px] tracking-tight leading-none z-20 shadow-md">
            {item.badge}
          </span>
        )}
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: -12, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full z-50 pointer-events-none px-2.5 py-1.5 rounded-lg bg-obs backdrop-blur-xl border border-obs3 shadow-2xl flex flex-col items-center justify-center whitespace-nowrap"
          >
            <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#f5f5f7]">
              {item.label}
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-obs" />
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};
