import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarCheck, Clock, Users, PhoneCall, CheckCircle2, Sparkles, MapPin, MessageSquare, AlertCircle } from 'lucide-react';
import { SANARA_INFO } from '../data/menuData';

export const ReservationsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: '2 Guests',
    diningOption: 'dinner',
    placement: 'rooftop',
    specialRequests: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const ref = 'SANARA-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    const text = `Habari Sanara Grill! I would like to reserve a table:
• Reference: ${bookingRef}
• Name: ${formData.name}
• Phone: ${formData.phone}
• Date: ${formData.date}
• Time: ${formData.time}
• Guests: ${formData.guests}
• Meal: ${formData.diningOption.toUpperCase()}
• Seating: ${formData.placement}
• Special Requests: ${formData.specialRequests || 'None'}

Please confirm my table reservation. Thank you!`;

    const url = `https://wa.me/${SANARA_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#141414] text-stone-200 pt-24 pb-20 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Banner */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-950/80 border border-orange-700/50 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles size={14} /> Table Booking
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-50">
            Reserve Your Table
          </h1>
          <p className="mt-3 text-stone-300 font-sans text-sm md:text-base max-w-xl mx-auto">
            Experience Mbezi's best flame-grilled BBQ, seafood, and rooftop dining.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950/40 border border-amber-600/30 text-amber-200 text-xs md:text-sm font-semibold">
            <AlertCircle size={16} className="text-amber-400 shrink-0" />
            <span><strong>Note:</strong> Brunch, lunch, and dinner reservations are highly recommended.</span>
          </div>
        </div>

        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 md:p-10 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amina Hassan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-amber-50 focus:border-orange-500 focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +255 716 110 011"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-amber-50 focus:border-orange-500 focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-amber-50 focus:border-orange-500 focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                    Time *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-amber-50 focus:border-orange-500 focus:outline-none transition-colors text-sm"
                  >
                    <option value="08:00">08:00 AM (Breakfast)</option>
                    <option value="10:30">10:30 AM (Brunch)</option>
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="14:00">02:00 PM (Lunch)</option>
                    <option value="17:00">05:00 PM (Sunset Drinks)</option>
                    <option value="19:00">07:00 PM (Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                    <option value="22:00">10:00 PM (Late Night Grill)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                    Guests *
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-amber-50 focus:border-orange-500 focus:outline-none transition-colors text-sm"
                  >
                    <option value="1 Guest">1 Guest (Solo)</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="5-8 Guests">5-8 Guests (Group)</option>
                    <option value="9+ Guests">9+ Guests (Large Party)</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                    Dining Meal
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['brunch', 'lunch', 'dinner', 'drinks'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, diningOption: opt })}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold capitalize transition-colors ${
                          formData.diningOption === opt
                            ? 'bg-orange-600 border-orange-500 text-white'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                    Seating Preference
                  </label>
                  <select
                    value={formData.placement}
                    onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-amber-50 focus:border-orange-500 focus:outline-none transition-colors text-sm"
                  >
                    <option value="Rooftop Outdoor Seating">Rooftop Outdoor Seating</option>
                    <option value="Cozy Indoor Fireplace">Cozy Indoor Fireplace Area</option>
                    <option value="Main Dining Hall">Main Dining Hall</option>
                    <option value="High Top Bar Seating">High Top Bar Seating</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Special Requests / Celebrations (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Birthday celebration, anniversary, highchair needed for toddler..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-amber-50 focus:border-orange-500 focus:outline-none transition-colors text-sm"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-6 rounded-xl text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <CalendarCheck size={18} /> Confirm Table Reservation
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 md:p-12 rounded-3xl bg-stone-900 border border-stone-800 text-center shadow-2xl max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={36} />
            </div>

            <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-50">
              Reservation Request Received!
            </h2>
            <p className="mt-2 text-stone-300 text-sm">
              Reference Number: <strong className="text-orange-400 font-mono">{bookingRef}</strong>
            </p>

            <div className="my-6 p-5 rounded-2xl bg-stone-950 border border-stone-800 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Guest Name:</span>
                <span className="font-bold text-amber-100">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Date & Time:</span>
                <span className="font-bold text-amber-100">{formData.date} at {formData.time}</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Party Size:</span>
                <span className="font-bold text-amber-100">{formData.guests}</span>
              </div>
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Seating Area:</span>
                <span className="font-bold text-amber-100">{formData.placement}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Location:</span>
                <span className="font-bold text-amber-100">{SANARA_INFO.location}</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 mb-6">
              Our reservation team will verify table availability shortly. You can also send this booking request directly to WhatsApp for instant confirmation.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWhatsAppBooking}
                className="flex-1 bg-[#25d366] hover:bg-[#20ba5a] text-stone-950 font-bold py-3.5 px-5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} /> Send via WhatsApp
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-stone-800 hover:bg-stone-700 text-amber-100 font-bold py-3.5 px-5 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                Book Another Table
              </button>
            </div>
          </motion.div>
        )}

        {/* Location & Quick Phone Box */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex items-start gap-4">
            <MapPin size={24} className="text-orange-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-serif font-bold text-amber-100 text-base">Location</h3>
              <p className="text-xs text-stone-300 mt-1">{SANARA_INFO.location}</p>
              <p className="text-xs text-stone-400 mt-1">Hours: {SANARA_INFO.hours}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex items-start gap-4">
            <PhoneCall size={24} className="text-orange-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-serif font-bold text-amber-100 text-base">Call For Immediate Table</h3>
              <p className="text-xs text-stone-300 mt-1">{SANARA_INFO.phonePrimary} / {SANARA_INFO.phoneAlt}</p>
              <p className="text-xs text-stone-400 mt-1">Open daily for breakfast, brunch, lunch, and dinner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
