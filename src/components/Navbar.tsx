import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, X, PhoneCall, CalendarCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { NotificationBell } from './NotificationBell';
import { SANARA_INFO } from '../data/menuData';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname.startsWith('/order')) {
    return null;
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/menu', label: 'Menu' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/reservations', label: 'Reservations' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        className={`h-[72px] fixed top-0 left-0 w-full z-40 flex items-center justify-between px-4 md:px-10 transition-all duration-300 ${
          scrolled
            ? 'bg-[#141414]/95 backdrop-blur-md border-b border-stone-800 shadow-lg'
            : 'bg-[#141414]/80 backdrop-blur-sm border-b border-stone-800/60'
        }`}
      >
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="text-amber-100/80 hover:text-amber-100 cursor-pointer p-1.5 rounded-lg bg-stone-900 border border-stone-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>

        <Link
          to="/"
          className="flex items-center transition-transform duration-300 hover:scale-[1.02] shrink-0"
        >
          <Logo variant="header" />
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-sans text-[12px] tracking-[0.14em] uppercase transition-colors py-1 relative ${
                location.pathname === link.to
                  ? 'text-orange-400 font-bold'
                  : 'text-stone-300 hover:text-amber-100 font-semibold'
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <NotificationBell />

          <button
            type="button"
            className="relative cursor-pointer text-stone-300 hover:text-amber-100 transition-colors p-2 rounded-xl hover:bg-stone-800"
            onClick={() => navigate('/cart')}
            title="Shopping Cart"
          >
            <ShoppingCart size={21} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-600 text-white w-[18px] h-[18px] rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-stone-900 shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          <Link
            to="/reservations"
            className="hidden sm:inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded-xl font-sans text-[11px] font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-orange-600/20 active:scale-95"
          >
            <CalendarCheck size={15} />
            Reserve Table
          </Link>

          <a
            href={`tel:${SANARA_INFO.phonePrimary.replace(/\s+/g, '')}`}
            className="hidden xl:inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-700/80 text-amber-100 py-2 px-3.5 rounded-xl font-sans text-[11px] font-bold tracking-wide transition-colors"
          >
            <PhoneCall size={14} className="text-orange-400" />
            {SANARA_INFO.phonePrimary}
          </a>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-stone-950/98 backdrop-blur-xl pt-[72px]"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col px-6 py-8 gap-2 max-w-md mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-serif text-[26px] py-3 border-b border-stone-800/80 transition-colors ${
                  location.pathname === link.to ? 'text-orange-400 font-semibold' : 'text-stone-200 hover:text-amber-100'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/reservations"
                className="flex items-center justify-center gap-2 h-[48px] bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-sans text-[12px] font-bold uppercase tracking-wider text-center shadow-lg"
              >
                <CalendarCheck size={18} /> Reserve A Table
              </Link>

              <a
                href={`tel:${SANARA_INFO.phonePrimary.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 h-[48px] bg-stone-900 border border-stone-700 text-amber-100 rounded-xl font-sans text-[12px] font-bold tracking-wider"
              >
                <PhoneCall size={16} className="text-orange-400" /> Call Us: {SANARA_INFO.phonePrimary}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
