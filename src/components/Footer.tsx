import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, PhoneCall, Clock, Instagram, Heart, Star, CalendarCheck } from 'lucide-react';
import { SANARA_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f0f0f] text-stone-300 border-t border-stone-800/80 pt-16 pb-28 md:pb-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center transition-transform duration-300 hover:scale-[1.02] shrink-0">
            <img
              src="/sanara_logo.png"
              alt="Sanara Grill Logo"
              className="h-12 w-auto object-contain max-h-[52px]"
            />
          </Link>

          <p className="text-xs text-stone-400 italic font-serif leading-relaxed">
            "{SANARA_INFO.tagline}"
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-950/80 border border-orange-700/50 text-orange-400 text-[10px] font-bold uppercase tracking-wider">
              <Heart size={12} className="fill-orange-500 text-orange-500" /> Women-Owned
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-amber-400 text-[10px] font-bold">
              <Star size={12} className="fill-amber-400" /> 4.5 Stars (670+)
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-serif font-bold text-amber-100 text-base mb-4">Quick Navigation</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/" className="hover:text-orange-400 transition-colors">Home Page</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400 transition-colors">About Us & Amenities</Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-orange-400 transition-colors">Our Full Menu</Link>
            </li>
            <li>
              <Link to="/reservations" className="hover:text-orange-400 transition-colors">Table Reservations</Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-orange-400 transition-colors">Photos & Ambiance Gallery</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-400 transition-colors">Contact & Location</Link>
            </li>
          </ul>
        </div>

        {/* Hours & Contact Column */}
        <div>
          <h4 className="font-serif font-bold text-amber-100 text-base mb-4">Hours & Contact</h4>
          <ul className="space-y-3 text-xs text-stone-400">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
              <span>{SANARA_INFO.location}</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} className="text-orange-500 shrink-0" />
              <span>{SANARA_INFO.hours}</span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneCall size={16} className="text-orange-500 shrink-0" />
              <span>{SANARA_INFO.phonePrimary} / {SANARA_INFO.phoneAlt}</span>
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={16} className="text-orange-500 shrink-0" />
              <a
                href={SANARA_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-amber-200 font-semibold"
              >
                {SANARA_INFO.instagram}
              </a>
            </li>
          </ul>
        </div>

        {/* Reservation Callout Column */}
        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
          <h4 className="font-serif font-bold text-amber-100 text-base flex items-center gap-2">
            <CalendarCheck size={18} className="text-orange-500" /> Book A Table
          </h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Brunch, lunch, and dinner reservations are highly recommended for rooftop seating.
          </p>
          <Link
            to="/reservations"
            className="inline-block w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center transition-colors shadow-md"
          >
            Reserve Table Now
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
        <div>
          &copy; {new Date().getFullYear()} {SANARA_INFO.name}. All rights reserved. Mbezi, Dar es Salaam.
        </div>
        <div className="text-stone-400">
          "Sanara grills Mbezi. Nicely done, well served."
        </div>
      </div>
    </footer>
  );
};
