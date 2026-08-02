import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { FloatingDock } from './components/FloatingDock';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MenuPage } from './pages/MenuPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { OrderStatusPage } from './pages/OrderStatusPage';
import { Bike, MessageSquare, CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { showTrackToast, setShowTrackToast } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const hideFloatingDock = location.pathname.startsWith('/order');

  return (
    <div className="relative min-h-screen bg-[#141414] text-stone-200 selection:bg-orange-600 selection:text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order/:id" element={<OrderStatusPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      <Footer />

      {!hideFloatingDock && <FloatingDock />}

      {/* Track Order Toast Notification */}
      {showTrackToast && (
        <div className="fixed top-20 right-4 left-4 md:right-8 md:left-auto md:w-[380px] bg-stone-900 border border-orange-500/40 backdrop-blur-md p-5 rounded-2xl shadow-2xl z-[9999] flex gap-4 text-stone-200">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center">
            <Bike size={24} />
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-serif text-sm font-bold text-amber-100 mb-1">
              Order Dispatched!
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Your order request is dispatched via WhatsApp! You can track live kitchen and delivery status.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowTrackToast(false);
                  navigate('/order/SANARA-7842');
                }}
                className="h-8 px-4 bg-orange-600 text-white rounded-lg font-sans text-[10px] font-bold uppercase tracking-wider hover:bg-orange-500 transition-colors cursor-pointer"
              >
                Track Order
              </button>
              <button
                onClick={() => setShowTrackToast(false)}
                className="h-8 px-3 border border-stone-800 text-stone-400 hover:text-stone-200 rounded-lg font-sans text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
