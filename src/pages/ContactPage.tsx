import React, { useState } from 'react';
import { SANARA_INFO } from '../data/menuData';
import { MapPin, PhoneCall, Clock, Instagram, MessageSquare, Send, CheckCircle2, Sparkles, Heart } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-stone-200 pt-24 pb-24 px-4 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-orange-950/40 to-stone-900 border border-stone-800 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/80 border border-orange-700/50 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles size={14} /> Get In Touch
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-50">
            Contact & Location
          </h1>
          <p className="mt-2 text-stone-300 font-sans text-sm md:text-base max-w-xl mx-auto">
            Visit us at Jangwani Shopping Centre in Mbezi, or contact us for reservations, feedback, and private event inquiries.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-950/80 border border-orange-700/40 text-orange-400 flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <h3 className="font-serif font-bold text-amber-100 text-lg">Location</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {SANARA_INFO.location}
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Jangwani+Shopping+Centre+Mbezi+Dar+es+Salaam"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-bold text-orange-400 hover:underline inline-flex items-center gap-1"
            >
              Open in Google Maps &rarr;
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-700/40 text-amber-400 flex items-center justify-center">
                <PhoneCall size={20} />
              </div>
              <h3 className="font-serif font-bold text-amber-100 text-lg">Phone & WhatsApp</h3>
              <p className="text-xs text-stone-300">
                Primary: <strong className="text-amber-100">{SANARA_INFO.phonePrimary}</strong>
              </p>
              <p className="text-xs text-stone-300">
                Alt: <strong className="text-amber-100">{SANARA_INFO.phoneAlt}</strong>
              </p>
            </div>
            <a
              href={`https://wa.me/${SANARA_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-bold text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              Chat on WhatsApp &rarr;
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-950/80 border border-orange-700/40 text-orange-400 flex items-center justify-center">
                <Clock size={20} />
              </div>
              <h3 className="font-serif font-bold text-amber-100 text-lg">Hours & Socials</h3>
              <p className="text-xs text-stone-300">{SANARA_INFO.hours}</p>
              <div className="flex items-center gap-1.5 text-xs text-orange-400 font-semibold pt-1">
                <Instagram size={14} />
                <a
                  href={SANARA_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {SANARA_INFO.instagram}
                </a>
              </div>
            </div>
            <div className="mt-4 text-[11px] text-stone-400 flex items-center gap-1">
              <Heart size={12} className="text-orange-500 fill-orange-500" /> Women-Owned Business
            </div>
          </div>
        </div>

        {/* Map & Message Form */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Embedded Google Map */}
          <div className="md:col-span-7 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl h-[420px] relative">
            <iframe
              title="Sanara Grill Restaurant Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.083756285223!2d39.123512315!3d-6.7583212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDUnMjkuOSJTIDM5wrAwNyczMi42IkU!5e0!3m2!1sen!2stz!4v1650000000000!5m2!1sen!2stz"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className="grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Form */}
          <div className="md:col-span-5 p-6 md:p-8 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl">
            <h3 className="font-serif font-bold text-amber-100 text-xl mb-4">
              Send Us A Message
            </h3>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-amber-50 focus:border-orange-500 focus:outline-none text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+255..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-amber-50 focus:border-orange-500 focus:outline-none text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                    Message / Special Inquiry
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-amber-50 focus:border-orange-500 focus:outline-none text-sm transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="font-serif font-bold text-amber-100 text-lg">Thank You!</h4>
                <p className="text-xs text-stone-300">
                  Your message has been received. Our team will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-stone-800 text-amber-100 text-xs font-bold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
