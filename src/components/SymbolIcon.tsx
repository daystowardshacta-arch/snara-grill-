import React from 'react';
import {
  Fish,
  Flame,
  Soup,
  Coffee,
  Wine,
  GlassWater,
  Sparkles,
  Utensils,
  UtensilsCrossed,
  ChefHat,
  Sun,
  Moon,
  Accessibility,
  Bike,
  Wifi,
  Users,
  Car,
  CreditCard,
  Camera,
  Star,
  Calendar,
  MessageSquare,
  Salad
} from 'lucide-react';

interface SymbolIconProps {
  symbol: string;
  size?: number;
  cl?: string;
}

export const SymbolIcon: React.FC<SymbolIconProps> = ({ symbol, size = 20, cl = '' }) => {
  const iconProps = {
    size,
    className: `inline-block transition-transform duration-200 hover:scale-110 shrink-0 ${cl}`,
    strokeWidth: 1.75,
  };

  switch (symbol) {
    case 'shrimp':
    case 'lobster':
    case 'crab':
    case 'seafood':
    case '🦐':
    case '🦞':
    case '🦀':
      return <UtensilsCrossed {...iconProps} />;
    case 'fish':
    case '🐟':
    case '🐠':
      return <Fish {...iconProps} />;
    case 'flame':
    case 'grill':
    case 'bbq':
    case '🔥':
      return <Flame {...iconProps} />;
    case 'skewer':
    case 'chicken':
    case '🍢':
    case '🍗':
    case '🥩':
      return <Utensils {...iconProps} />;
    case 'rice':
    case 'biryani':
    case 'mains':
    case '🍛':
    case '🍚':
    case '🥣':
      return <Soup {...iconProps} />;
    case 'veggie':
    case 'salad':
    case '🥦':
    case '🥗':
      return <Salad {...iconProps} />;
    case 'shawarma':
    case '🥙':
    case '🥟':
    case '🫓':
      return <Utensils {...iconProps} />;
    case 'cocktail':
    case 'drinks':
    case '🍹':
    case '🍸':
      return <Wine {...iconProps} />;
    case 'smoothie':
    case 'shake':
    case 'juice':
    case '🥤':
    case '🧃':
    case '🥑':
    case '🥭':
      return <GlassWater {...iconProps} />;
    case 'coffee':
    case 'tea':
    case '☕':
    case '🫖':
      return <Coffee {...iconProps} />;
    case 'chef':
    case '👨‍🍳':
    case '👩‍🍳':
      return <ChefHat {...iconProps} />;
    case 'sunset':
    case '🌇':
      return <Sun {...iconProps} />;
    case 'moon':
    case '🌙':
      return <Moon {...iconProps} />;
    case 'accessibility':
    case '♿':
      return <Accessibility {...iconProps} />;
    case 'delivery':
    case '🛵':
    case '🚗':
      return <Bike {...iconProps} />;
    case 'sparkles':
    case '✨':
    case '🎉':
      return <Sparkles {...iconProps} />;
    case 'utensils':
    case 'dining':
    case '🍽️':
      return <Utensils {...iconProps} />;
    case 'wifi':
    case '📶':
      return <Wifi {...iconProps} />;
    case 'users':
    case 'family':
    case '👥':
    case '👨‍👩‍👧‍👦':
      return <Users {...iconProps} />;
    case 'parking':
    case '🅿️':
      return <Car {...iconProps} />;
    case 'card':
    case 'payment':
    case '💳':
      return <CreditCard {...iconProps} />;
    case 'camera':
    case 'photo':
    case '📸':
      return <Camera {...iconProps} />;
    case 'star':
    case 'rating':
    case '🌟':
    case '⭐':
      return <Star {...iconProps} />;
    case 'calendar':
    case '📅':
      return <Calendar {...iconProps} />;
    case 'message':
    case '📩':
      return <MessageSquare {...iconProps} />;
    default:
      return <Utensils {...iconProps} />;
  }
};

export const StarRating: React.FC<{ n?: number; size?: number }> = ({ n = 5, size = 13 }) => (
  <div className="flex gap-0.5 items-center">
    {Array.from({ length: n }).map((_, i) => (
      <Star
        key={i}
        size={size}
        className="text-amber-400 fill-amber-400 shrink-0 transition-transform hover:scale-110"
        strokeWidth={1.5}
      />
    ))}
  </div>
);

export const ZigzagDivider: React.FC<{ flip?: boolean; className?: string }> = ({ flip = false, className = '' }) => (
  <div
    className={`w-full h-3 bg-repeat-x opacity-90 ${className}`}
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12'%3E%3Cpath d='M0 ${
        flip ? 0 : 12
      } L12 ${flip ? 12 : 0} L24 ${flip ? 0 : 12} Z' fill='%23C1272D'/%3E%3Ccircle cx='12' cy='${
        flip ? 4 : 8
      }' r='1.8' fill='%23FFFFFF'/%3E%3C/svg%3E")`,
      backgroundSize: '24px 12px',
    }}
  />
);

export const DecorativeOrnament: React.FC = () => (
  <div className="flex justify-center items-center gap-3 my-12 text-[#C1272D]/20 select-none">
    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C1272D]" />
    <span className="text-base font-serif italic text-[#C1272D]/40">❦ Good Choice ❦</span>
    <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C1272D]" />
  </div>
);
