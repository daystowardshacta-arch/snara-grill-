import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import {
  SANARA_INFO,
  ALL_MENU_ITEMS,
  TESTIMONIALS,
  AMENITIES_LIST,
  imgRooftop,
  imgPrawnsMakange,
  imgBbqSinia,
  imgGrilledFishChips,
  imgCocktails,
  imgGrillMaster
} from '../data/menuData';
import { MenuItem } from '../types';
import { DishDetailDrawer } from '../components/DishDetailDrawer';
import {
  Flame,
  Star,
  Clock,
  MapPin,
  PhoneCall,
  CalendarCheck,
  Utensils,
  Plus,
  Check,
  ChevronRight,
  Heart,
  Sparkles,
  Award,
  ShieldCheck,
  Users,
  Instagram,
  Play,
  Accessibility,
  Sun,
  Salad,
  Car
} from 'lucide-react';
import { SymbolIcon } from '../components/SymbolIcon';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [logoError, setLogoError] = useState(false);

  // Featured dishes for the homepage showcase
  const signatureDishes = ALL_MENU_ITEMS.filter((item) =>
    [101, 202, 104, 301, 404, 105].includes(item.id)
  );

  return (
    <div className="min-h-screen bg-[#141414] text-stone-200 pt-[72px] pb-24">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-12 md:py-24 px-4 md:px-12 bg-gradient-to-b from-stone-900 via-[#141414] to-[#141414] border-b border-stone-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,83,30,0.15),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {SANARA_INFO.rating} Stars ({SANARA_INFO.reviewCount}+ Google Reviews)
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-700/50 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Heart size={14} className="fill-orange-500 text-orange-500" />
                Women-Owned Business
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-700 text-stone-300 text-xs font-medium">
                <Clock size={14} className="text-orange-400" />
                Open Daily until 12 AM
              </span>
            </div>

            {/* Headline & Tagline */}
            <div className="space-y-3">
              {!logoError && (
                <div className="flex justify-start">
                  <img
                    src="/sanara_logo.png"
                    alt="Sanara Grill Logo"
                    onError={() => setLogoError(true)}
                    className="h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-2xl mb-2 rounded-xl"
                  />
                </div>
              )}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-amber-50 tracking-tight leading-[1.1]">
                SANARA GRILL <span className="text-orange-500 italic font-light">RESTAURANT</span>
              </h1>
              <p className="text-xl md:text-2xl font-serif italic text-amber-200/90 font-medium">
                "{SANARA_INFO.tagline}"
              </p>
            </div>

            <p className="text-stone-300 text-base md:text-lg leading-relaxed max-w-2xl font-sans">
              Dar es Salaam's destination for authentic flame-grilled BBQ, sizzling Prawns Makange, whole red snapper, coastal biryani, and craft rooftop cocktails at Jangwani Shopping Centre, Mbezi.
            </p>

            {/* Location Pill */}
            <div className="flex items-center gap-2 text-xs md:text-sm text-stone-400 bg-stone-900/80 border border-stone-800 p-3 rounded-2xl max-w-xl">
              <MapPin size={18} className="text-orange-500 shrink-0" />
              <span>{SANARA_INFO.location}</span>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                to="/reservations"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <CalendarCheck size={18} /> Reserve A Table
              </Link>

              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-100 border border-stone-700 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
              >
                <Utensils size={18} className="text-orange-400" /> Order Online
              </Link>

              <a
                href={`tel:${SANARA_INFO.phonePrimary.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 bg-stone-950 hover:bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-100 px-5 py-3.5 rounded-xl font-semibold text-xs transition-colors"
              >
                <PhoneCall size={16} className="text-orange-400" /> Call Us
              </a>
            </div>
          </motion.div>

          {/* Hero Image / Atmosphere Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div
              onClick={() => navigate('/gallery#videos')}
              className="relative rounded-3xl overflow-hidden border border-stone-800 shadow-2xl group cursor-pointer"
            >
              <img
                src={imgRooftop}
                alt="Sanara Grill Rooftop Dining Mbezi"
                className="w-full h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

              {/* Subtle Circular Play Button Overlay in Center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-stone-950/70 border border-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-orange-600/90 transition-all">
                  <Play size={22} className="fill-white ml-0.5" />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span>Atmosphere</span>
                    <span className="text-[10px] bg-orange-600/80 text-white px-2 py-0.5 rounded-full lowercase font-sans">watch video reels</span>
                  </div>
                  <div className="text-sm font-serif font-bold text-amber-100">Scenic Rooftop & Live Music</div>
                </div>
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                  <Star size={16} className="fill-amber-400" /> 4.5
                </div>
              </div>
            </div>

            {/* Floating Mini Badge */}
            <div className="absolute -bottom-4 -left-4 bg-stone-900/95 backdrop-blur-md border border-stone-700 p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 pointer-events-none">
              <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-500 flex items-center justify-center font-bold">
                <Flame size={20} />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-100">Flame-Grilled Specialties</div>
                <div className="text-[10px] text-stone-400">Prawns Makange & BBQ Sinia XXL</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK STATS BAR */}
      <section className="py-8 bg-stone-900/60 border-b border-stone-800 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3">
            <div className="text-2xl md:text-3xl font-serif font-bold text-amber-100">4.5 ⭐</div>
            <div className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-semibold">670+ Google Reviews</div>
          </div>
          <div className="p-3 border-l border-stone-800">
            <div className="text-2xl md:text-3xl font-serif font-bold text-orange-400">Women-Owned</div>
            <div className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-semibold">Local Mbezi Leadership</div>
          </div>
          <div className="p-3 border-l border-stone-800">
            <div className="text-2xl md:text-3xl font-serif font-bold text-amber-100">7 AM – 12 AM</div>
            <div className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-semibold">Open Daily</div>
          </div>
          <div className="p-3 border-l border-stone-800">
            <div className="text-2xl md:text-3xl font-serif font-bold text-orange-400">Rooftop Bar</div>
            <div className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-semibold">Craft Cocktails & Vibe</div>
          </div>
        </div>
      </section>

      {/* SIGNATURE SEAFOOD & GRILL SHOWCASE */}
      <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-orange-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Flame size={14} className="fill-orange-500" /> Signature Grill & Seafood
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-50">
              Popular Sanara Specialties
            </h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Explore Full Menu ({ALL_MENU_ITEMS.length} Items) <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatureDishes.map((item) => {
            const inCart = cart.some((c) => c.id === item.id);
            return (
              <div
                key={item.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all group flex flex-col"
              >
                <div
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedDish(item)}
                >
                  <img
                    src={item.image || imgPrawnsMakange}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-md text-amber-300 font-bold text-xs px-2.5 py-1 rounded-lg border border-stone-700">
                    {item.price.toLocaleString()} TZS
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
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
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
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
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT US TEASER SECTION */}
      <section className="py-16 px-4 md:px-12 bg-stone-900/40 border-y border-stone-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden border border-stone-800 shadow-2xl group">
            <img
              src={imgGrillMaster}
              alt="Grill Chef Sanara Mbezi"
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-stone-800">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">Women-Owned Excellence</span>
              <span className="text-sm font-serif font-bold text-amber-100">Sanara Grills Mbezi. Nicely Done, Well Served.</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/80 border border-orange-700/50 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> About Sanara Grill
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-50 leading-tight">
              Proudly Women-Owned & Dedicated to Flavor
            </h2>

            <p className="text-stone-300 text-sm md:text-base leading-relaxed">
              Located at Jangwani Shopping Centre in Mbezi, Sanara Grill Restaurant is owned and operated by passionate women founders. We take pride in authentic charcoal flame grilling, ocean-fresh seafood makange, and creating an inviting atmosphere where every guest feels at home.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800">
                <div className="text-amber-100 font-serif font-bold text-lg">Rooftop Dining</div>
                <div className="text-xs text-stone-400 mt-1">Live music & sunset cocktails</div>
              </div>
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800">
                <div className="text-amber-100 font-serif font-bold text-lg">Family & Accessible</div>
                <div className="text-xs text-stone-400 mt-1">Wheelchair access & kids friendly</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-amber-100 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border border-stone-700 transition-colors"
              >
                Read Our Story & Amenities <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES HIGHLIGHTS GRID */}
      <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-50">
            Why Guests Love Sanara Grill
          </h2>
          <p className="mt-2 text-stone-400 text-sm">
            Top amenities and features available for every visitor.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
            <div className="w-11 h-11 rounded-xl bg-orange-950/80 border border-orange-700/40 text-orange-400 flex items-center justify-center mb-4">
              <Accessibility size={22} strokeWidth={1.75} />
            </div>
            <h3 className="font-serif font-bold text-amber-100 text-base">Full Accessibility</h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Wheelchair-accessible seating, entrance, parking, restroom, and assistive hearing loop.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
            <div className="w-11 h-11 rounded-xl bg-amber-950/80 border border-amber-700/40 text-amber-400 flex items-center justify-center mb-4">
              <Sun size={22} strokeWidth={1.75} />
            </div>
            <h3 className="font-serif font-bold text-amber-100 text-base">Rooftop & Live Music</h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Rooftop seating, live music events, cozy fireplace, craft cocktails, and sports broadcasts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
            <div className="w-11 h-11 rounded-xl bg-orange-950/80 border border-orange-700/40 text-orange-400 flex items-center justify-center mb-4">
              <Salad size={22} strokeWidth={1.75} />
            </div>
            <h3 className="font-serif font-bold text-amber-100 text-base">Diverse Offerings</h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Halal certified, vegan & vegetarian options, organic dishes, late-night food until 12 AM.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
            <div className="w-11 h-11 rounded-xl bg-amber-950/80 border border-amber-700/40 text-amber-400 flex items-center justify-center mb-4">
              <Car size={22} strokeWidth={1.75} />
            </div>
            <h3 className="font-serif font-bold text-amber-100 text-base">Parking & Pets</h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Ample free parking lot & street parking, dog-friendly seating (indoors & outdoors).
            </p>
          </div>
        </div>
      </section>

      {/* REVIEWS & TESTIMONIALS */}
      <section className="py-16 px-4 md:px-12 bg-stone-900/50 border-y border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Star size={14} className="fill-amber-400" /> Rated 4.5 Stars on Google
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-50">
              Loved by Mbezi & Dar es Salaam
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                  <h4 className="font-serif font-bold text-amber-100 text-sm mb-2">"{t.summary}"</h4>
                  <p className="text-xs text-stone-300 italic leading-relaxed">"{t.text}"</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80">
                  <div className="font-bold text-xs text-orange-400">{t.name}</div>
                  <div className="text-[10px] text-stone-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION & HOURS BANNER */}
      <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-stone-900 border border-stone-800 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block">Visit Us Today</span>
            <h2 className="text-3xl font-serif font-bold text-amber-50">
              Sanara Grill Restaurant Mbezi
            </h2>
            <div className="space-y-2 text-stone-300 text-sm">
              <p className="flex items-center gap-2">
                <MapPin size={18} className="text-orange-500 shrink-0" />
                <span>{SANARA_INFO.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={18} className="text-orange-500 shrink-0" />
                <span>{SANARA_INFO.hours}</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall size={18} className="text-orange-500 shrink-0" />
                <span>Phone: {SANARA_INFO.phonePrimary} / {SANARA_INFO.phoneAlt}</span>
              </p>
              <p className="flex items-center gap-2">
                <Instagram size={18} className="text-orange-500 shrink-0" />
                <a
                  href={SANARA_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-amber-200"
                >
                  Instagram: {SANARA_INFO.instagram}
                </a>
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-3">
            <Link
              to="/reservations"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider text-center shadow-lg"
            >
              Reserve A Table
            </Link>
            <Link
              to="/contact"
              className="w-full bg-stone-800 hover:bg-stone-700 text-amber-100 font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider text-center border border-stone-700"
            >
              View Location Map & Contact
            </Link>
          </div>
        </div>
      </section>

      {/* DISH DETAIL DRAWER MODAL */}
      <DishDetailDrawer
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
      />
    </div>
  );
};
