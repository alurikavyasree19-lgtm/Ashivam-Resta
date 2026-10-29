import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/restaurantData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const total = TESTIMONIALS.length;

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextTestimonial]);

  const active = TESTIMONIALS[currentIndex];

  return (
    <section className="py-12 sm:py-16 bg-[#f7f4ed] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-800 mb-2">
            Guest Reflections
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Celebrated by Connoisseurs
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-terracotta-500 mx-auto mt-3" />
        </div>

        {/* Carousel Container */}
        <div 
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Card with Decorative Subtle Watermark Quote */}
          <div className="relative bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-xl text-center">
            
            <Quote className="w-8 h-8 text-amber-500/20 mx-auto mb-4" />

            {/* Star Rating */}
            <div className="flex items-center justify-center gap-1.5 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < active.rating
                      ? 'fill-amber-500 text-amber-500'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="font-serif text-lg sm:text-2xl text-stone-800 italic leading-relaxed max-w-3xl mx-auto min-h-[5rem] flex items-center justify-center">
              "{active.quote}"
            </p>

            {/* Dish Favored Note */}
            <div className="mt-6 text-xs text-amber-800 font-medium">
              Favorite Dish: <span className="text-stone-900 font-semibold">{active.dishFavored}</span>
            </div>

            {/* Profile Avatar & Info */}
            <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-center gap-4">
              <img
                src={active.avatar}
                alt={active.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/50"
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  {active.name}
                </h4>
                <p className="text-xs text-stone-500">
                  {active.role} · <span className="text-stone-400">{active.date}</span>
                </p>
              </div>
            </div>

            {/* Navigation Buttons (Prev / Next) */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-stone-950 hover:bg-amber-500 hover:border-amber-500 flex items-center justify-center shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6">
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-stone-950 hover:bg-amber-500 hover:border-amber-500 flex items-center justify-center shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all focus:outline-none ${
                  currentIndex === idx
                    ? 'w-8 bg-amber-600'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-3 text-[11px] text-stone-500">
            Verified diner reviews from Mumbai dining patrons & food critics
          </div>

        </div>

      </div>
    </section>
  );
};
