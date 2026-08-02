import React from 'react';
import { motion } from 'motion/react';
import { Testimonial } from '../types';

interface ColumnProps {
  testimonials: Testimonial[];
  className?: string;
  duration?: number;
}

export const TestimonialColumn: React.FC<ColumnProps> = ({ testimonials, className = '', duration = 10 }) => (
  <div className={className}>
    <motion.div
      animate={{ translateY: '-50%' }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop',
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...Array(2)].map((_, loopIdx) => (
        <React.Fragment key={loopIdx}>
          {testimonials.map((item, index) => (
            <div
              key={index}
              id={`testimonial-item-${item.name.replace(/\s+/g, '-').toLowerCase()}-${index}`}
              className="p-5 rounded-[20px] border border-obs3 bg-obs2 shadow-xl max-w-xs w-full hover:border-ochre/40 hover:bg-obs2/90 transition-all duration-300 flex flex-col gap-3.5"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-obs3 border border-obs3 flex items-center justify-center font-bold text-[11px] text-ochre">
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="font-serif text-[12px] font-bold text-cream tracking-tight leading-tight truncate">
                    @{item.name}
                  </div>
                  <div className="font-sans text-[8px] text-ochre uppercase tracking-widest leading-none font-extrabold mt-0.5">
                    {item.role}
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-obs3/80 bg-obs shadow-inner select-none transition-transform hover:scale-[1.02] duration-300">
                <img
                  src={item.screenshot}
                  alt={`Review by ${item.name}`}
                  className="w-full h-auto object-contain rounded-lg max-h-[220px]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="font-sans text-[11px] text-cream/80 leading-relaxed italic border-t border-obs3/30 pt-2">
                "{item.text}"
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

interface TestimonialsScrollerProps {
  testimonials: Testimonial[];
}

export const TestimonialsScroller: React.FC<TestimonialsScrollerProps> = ({ testimonials }) => {
  const col1 = [testimonials[0], testimonials[1]];
  const col2 = [testimonials[2], testimonials[3]];
  const col3 = [testimonials[4], testimonials[5]];

  return (
    <section className="bg-obs3/30 my-6 py-6 md:my-10 relative rounded-[24px] border border-obs3 overflow-hidden" id="testimonials-scroller-section">
      <div className="max-w-[1200px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center mb-8"
        >
          <div className="flex justify-center mb-3">
            <div className="border border-ochre/30 bg-obs2/60 text-ochre font-sans text-[10px] font-bold uppercase tracking-[0.2em] py-1.5 px-4 rounded-full">
              Maoni ya Wateja
            </div>
          </div>
          <h2 className="font-serif text-[28px] sm:text-[36px] md:text-[42px] leading-tight text-cream mt-2">
            What our <span className="italic text-ochre font-normal">users say</span>
          </h2>
          <p className="font-sans text-[13px] text-cream/55 mt-3 max-w-[400px]">
            See what our customers have to say about our delicious dishes and dedicated services.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[580px] overflow-hidden">
          <TestimonialColumn testimonials={col1} duration={16} />
          <TestimonialColumn testimonials={col2} className="hidden md:block" duration={22} />
          <TestimonialColumn testimonials={col3} className="hidden lg:block" duration={18} />
        </div>
      </div>
    </section>
  );
};
