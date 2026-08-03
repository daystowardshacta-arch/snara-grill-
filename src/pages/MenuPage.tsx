import React, { useState } from 'react';
import { ALL_MENU_ITEMS, SANARA_INFO } from '../data/menuData';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { DishDetailDrawer } from '../components/DishDetailDrawer';
import { Search, Plus, Check, Sparkles, Filter, CalendarCheck, ShoppingCart, MapPin, Clock, Banknote } from 'lucide-react';
import { SymbolIcon } from '../components/SymbolIcon';
import { Link } from 'react-router-dom';

export const MenuPage: React.FC = () => {
  const { cart, addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const categories = ['All', 'Seafood', 'Grill/BBQ', 'Rice & Mains', 'Drinks'];
  const tags = ['All', 'Signature', 'Seafood', 'Grill', 'Bestseller', 'Halal', 'Veg', 'Rooftop Bar'];

  const filteredItems = ALL_MENU_ITEMS.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.cat === activeCategory;
    const matchesTag = selectedTag === 'All' || item.tags.includes(selectedTag);
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#141414] text-stone-200 pt-24 pb-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-orange-950/40 to-stone-900 border border-stone-800 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/80 border border-orange-700/50 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles size={14} /> Official Restaurant Menu
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-50">
            Sanara Grill Menu
          </h1>
          <p className="mt-2 text-stone-300 font-sans text-sm md:text-base max-w-xl mx-auto">
            "Sanara grills Mbezi. Nicely done, well served."
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-stone-300">
            <span className="px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 flex items-center gap-1.5">
              <MapPin size={13} className="text-orange-500" /> Jangwani Shopping Centre, Mbezi
            </span>
            <span className="px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 flex items-center gap-1.5">
              <Clock size={13} className="text-orange-400" /> Open Daily until 12 AM
            </span>
            <span className="px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 flex items-center gap-1.5">
              <Banknote size={13} className="text-amber-400" /> {SANARA_INFO.priceRange}
            </span>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-amber-50 placeholder-stone-500 focus:border-orange-500 focus:outline-none text-sm transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-stone-700 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter Pill */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs text-stone-400 flex items-center gap-1 shrink-0 font-medium">
              <Filter size={14} /> Filter:
            </span>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors shrink-0 ${
                  selectedTag === t
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'bg-stone-900/80 text-stone-400 border border-stone-800 hover:text-stone-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Listings Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const inCart = cart.some((c) => c.id === item.id);
              return (
                <div
                  key={item.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="relative h-48 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedDish(item)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.badge && (
                        <span className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                          {item.badge}
                        </span>
                      )}
                      <span className="absolute bottom-3 right-3 bg-stone-950/90 backdrop-blur-md text-amber-300 font-bold text-xs px-2.5 py-1 rounded-lg border border-stone-700">
                        {item.price.toLocaleString()} TZS
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
                        <SymbolIcon symbol={item.emoji} size={14} cl="text-orange-400" />
                        <span>{item.cat}</span>
                      </div>
                      <h3
                        className="font-serif text-lg font-bold text-amber-100 hover:text-orange-400 transition-colors cursor-pointer"
                        onClick={() => setSelectedDish(item)}
                      >
                        {item.name}
                      </h3>
                      <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] bg-stone-950 text-stone-400 px-2 py-0.5 rounded-md border border-stone-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-stone-800/80 flex items-center justify-between mt-4">
                    <button
                      onClick={() => setSelectedDish(item)}
                      className="text-xs text-stone-300 hover:text-amber-100 underline underline-offset-4"
                    >
                      View details
                    </button>

                    <button
                      onClick={() => addToCart(item)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        inCart
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50'
                          : 'bg-orange-600 hover:bg-orange-500 text-white shadow-sm'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check size={14} /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Add to Order
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-900 border border-stone-800 rounded-3xl">
            <p className="text-stone-400 text-sm">No menu items found matching your filters.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSelectedTag('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom CTA Bar */}
        <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-amber-100 text-base">Planning a Special Meal or Group Gathering?</h3>
            <p className="text-xs text-stone-400 mt-1">Reserve a table on our rooftop or order in advance for instant pick-up.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/reservations"
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <CalendarCheck size={15} /> Reserve Table
            </Link>
            <Link
              to="/cart"
              className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-100 text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <ShoppingCart size={15} /> View Order Cart
            </Link>
          </div>
        </div>
      </div>

      <DishDetailDrawer
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
      />
    </div>
  );
};
