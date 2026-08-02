import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SANARA_INFO } from '../data/menuData';
import { CheckCircle2, Clock, PhoneCall, Flame, Bike, Utensils, MapPin } from 'lucide-react';

export const OrderStatusPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [step, setStep] = useState(1);
  const [eta, setEta] = useState(25);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev < 4) {
          const next = prev + 1;
          setEta(25 - (next - 1) * 7);
          return next;
        }
        clearInterval(timer);
        setEta(0);
        return 4;
      });
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const steps = [
    { n: 1, label: 'Order Confirmed', desc: 'Received by Sanara Grill team' },
    { n: 2, label: 'Flame Grilling', desc: 'Preparing BBQ & seafood over open charcoal' },
    { n: 3, label: 'En Route', desc: 'Rider is delivering to your Mbezi location' },
    { n: 4, label: 'Delivered', desc: 'Enjoy your meal! Karibuni Sanara Grill' },
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-stone-200 pt-24 pb-24 px-4 md:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="p-8 rounded-3xl bg-stone-900 border border-stone-800 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Order Tracking
          </div>
          <h1 className="text-3xl font-serif font-bold text-amber-50">
            Order #{id || 'SANARA-98231'}
          </h1>
          <p className="text-xs text-stone-400 font-medium">
            Sanara Grill Restaurant • {SANARA_INFO.location}
          </p>

          {eta > 0 ? (
            <div className="pt-2 flex items-center justify-center gap-2 text-orange-400 text-sm font-bold">
              <Clock size={16} /> Estimated Delivery: ~{eta} minutes
            </div>
          ) : (
            <div className="pt-2 text-emerald-400 text-sm font-bold flex items-center justify-center gap-1.5">
              <CheckCircle2 size={18} /> Order Arrived!
            </div>
          )}
        </div>

        {/* Progress Tracker */}
        <div className="p-6 md:p-8 rounded-3xl bg-stone-900 border border-stone-800 space-y-6">
          <h3 className="font-serif font-bold text-amber-100 text-lg border-b border-stone-800 pb-3">
            Kitchen & Delivery Status
          </h3>

          <div className="space-y-6">
            {steps.map((s) => {
              const isDone = step >= s.n;
              const isCurrent = step === s.n;
              return (
                <div key={s.n} className="flex items-start gap-4 relative">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm transition-colors ${
                      isDone
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-stone-950 text-stone-600 border border-stone-800'
                    }`}
                  >
                    {isDone ? <CheckCircle2 size={20} /> : s.n}
                  </div>

                  <div>
                    <h4 className={`font-serif font-bold text-base ${isCurrent ? 'text-orange-400' : isDone ? 'text-amber-100' : 'text-stone-500'}`}>
                      {s.label}
                    </h4>
                    <p className="text-xs text-stone-400 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Contact & Navigation Buttons */}
        <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PhoneCall size={20} className="text-orange-500 shrink-0" />
            <div>
              <div className="font-serif font-bold text-amber-100 text-sm">Need help with your order?</div>
              <div className="text-xs text-stone-400">Call Sanara Grill: {SANARA_INFO.phonePrimary}</div>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <a
              href={`tel:${SANARA_INFO.phonePrimary.replace(/\s+/g, '')}`}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider text-center"
            >
              Call Kitchen
            </a>
            <Link
              to="/"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-100 font-bold text-xs uppercase tracking-wider text-center border border-stone-700"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
