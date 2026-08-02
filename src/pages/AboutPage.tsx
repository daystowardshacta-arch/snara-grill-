import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Flame, Heart, Users, Sparkles, Star, MapPin, CalendarCheck, Utensils, CheckCircle2 } from 'lucide-react';
import { SANARA_INFO, AMENITIES_LIST, imgRooftop, imgGrillMaster, imgCozyAtmosphere, imgBbqSinia } from '../data/menuData';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#141414] text-stone-200 pt-24 pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden py-16 px-4 md:px-12 border-b border-stone-800 bg-gradient-to-b from-stone-900 via-[#141414] to-[#141414]">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-950/80 border border-orange-700/50 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles size={14} /> Proudly Women-Owned Business
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-amber-50 tracking-tight"
          >
            Sanara Grills Mbezi.
            <span className="block text-orange-500 italic font-light mt-1">
              Nicely Done, Well Served.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-stone-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-sans"
          >
            Located at Jangwani Shopping Centre in Mbezi, Dar es Salaam, Sanara Grill Restaurant is a premier destination for flame-grilled BBQ, ocean-fresh seafood makange, artisanal cocktails, and vibrant rooftop dining.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 border border-stone-800">
              <Star className="text-amber-400 fill-amber-400" size={18} />
              <span className="font-bold text-amber-100">{SANARA_INFO.rating} Stars</span>
              <span className="text-stone-400 text-sm">({SANARA_INFO.reviewCount}+ Google Reviews)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 border border-stone-800">
              <MapPin className="text-orange-500" size={18} />
              <span className="text-stone-300 text-sm">{SANARA_INFO.location}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Story & Women-Owned Section */}
      <section className="py-16 px-4 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Heart size={14} className="fill-orange-500 text-orange-500" /> Our Origin & Heart
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-50 leading-tight">
              A Passionate Women-Owned Culinary Destination
            </h2>
            <p className="mt-4 text-stone-300 leading-relaxed font-sans">
              Sanara Grill Restaurant was built with a clear vision: to bring the authentic warmth of Tanzanian hospitality and top-tier flame cooking together in Mbezi. Owned and spearheaded by dedicated women entrepreneurs, Sanara is powered by meticulous attention to flavor, cleanliness, and guest comfort.
            </p>
            <p className="mt-4 text-stone-300 leading-relaxed font-sans">
              Whether you are craving sizzling Prawns Makange, a massive BBQ Sinia XXL platter with friends, or a relaxing sunset cocktail on the rooftop, every plate served at Sanara carries our pledge: <strong className="text-amber-200">"Nicely done, well served."</strong>
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800">
                <div className="text-2xl font-bold text-orange-400 font-serif">100%</div>
                <div className="text-xs text-stone-400 font-medium uppercase tracking-wider mt-1">Fresh Coastal Catch</div>
              </div>
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800">
                <div className="text-2xl font-bold text-amber-400 font-serif">Daily</div>
                <div className="text-xs text-stone-400 font-medium uppercase tracking-wider mt-1">7:00 AM – 12:00 AM</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-stone-800 shadow-2xl group">
              <img
                src={imgGrillMaster}
                alt="Sanara Grill Master cooking"
                className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-stone-800">
                <p className="text-sm font-semibold text-amber-100 flex items-center gap-2">
                  <Flame size={16} className="text-orange-500 fill-orange-500" />
                  Flame-charred with authentic Tanzanian spices
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Atmosphere & Unique Features */}
      <section className="py-16 px-4 md:px-12 bg-stone-900/50 border-y border-stone-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-50">
              The Sanara Experience
            </h2>
            <p className="mt-3 text-stone-300 font-sans">
              An upscale-casual grill atmosphere designed for memorable moments with family, friends, and colleagues.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 hover:border-orange-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-orange-950/80 border border-orange-700/40 flex items-center justify-center text-orange-400 mb-5">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-100">Rooftop & Sunset Seating</h3>
              <p className="mt-2 text-stone-400 text-sm leading-relaxed">
                Enjoy open-air rooftop dining overlooking Mbezi with refreshing evening breezes, live music, and handcrafted cocktails.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 hover:border-orange-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-700/40 flex items-center justify-center text-amber-400 mb-5">
                <Flame size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-100">Signature Flame Cooking</h3>
              <p className="mt-2 text-stone-400 text-sm leading-relaxed">
                From our famous BBQ Sinia XXL to sizzling Prawns Makange, every dish is grilled over open embers with custom marinations.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 hover:border-orange-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-orange-950/80 border border-orange-700/40 flex items-center justify-center text-orange-400 mb-5">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-100">Family & Group Friendly</h3>
              <p className="mt-2 text-stone-400 text-sm leading-relaxed">
                Complete with high chairs, kids' menu items, wheelchair access, ample free parking, and dog-friendly patio areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Amenities & Features Grid */}
      <section className="py-16 px-4 md:px-12 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-50">
            Amenities & Features
          </h2>
          <p className="mt-3 text-stone-300 font-sans">
            Everything you need for a comfortable and enjoyable dining visit.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AMENITIES_LIST.map((group, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800">
              <div className="flex items-center gap-3 mb-4 border-b border-stone-800 pb-3">
                <span className="text-2xl">{group.icon}</span>
                <h3 className="font-serif font-bold text-amber-100 text-lg">{group.category}</h3>
              </div>
              <ul className="space-y-2">
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-2 text-xs text-stone-300">
                    <CheckCircle2 size={14} className="text-orange-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-12 px-4 md:px-12 max-w-4xl mx-auto text-center">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-stone-900 via-orange-950/40 to-stone-900 border border-orange-500/30">
          <h2 className="text-3xl font-serif font-bold text-amber-50">
            Ready to Experience Sanara Grill?
          </h2>
          <p className="mt-3 text-stone-300 max-w-lg mx-auto text-sm">
            Reserve your rooftop table or place an order for fast local delivery in Mbezi.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/reservations"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg"
            >
              <CalendarCheck size={18} /> Reserve A Table
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-amber-100 border border-stone-700 px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
            >
              <Utensils size={18} /> Browse Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
