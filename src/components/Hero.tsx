import React from 'react';
import { ChevronDown, Utensils, CalendarCheck, Sparkles, Clock, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onExploreMenu: () => void;
  onReserveTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onReserveTable }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950 pt-20 pb-14 sm:pb-16">
      {/* Background Image with Dark Atmospheric Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_saffron_stone_dining_1793203589411.jpg"
          alt="Saffron & Stone Fine Dining Room"
          className="w-full h-full object-cover object-center transform scale-105 animate-in fade-in duration-1000 opacity-45"
          referrerPolicy="no-referrer"
        />
        {/* Measured multi-layer scrim for contrast & warmth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151311] via-[#151311]/85 to-black/75" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#151311]/50 to-[#151311]/95" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Brand Kicker */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-amber-400 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/90" />
          <span>Award-Winning Modern Indian Fine Dining</span>
          <span aria-hidden="true" className="text-amber-500/50">·</span>
          <span className="text-stone-300">Mumbai Waterfront</span>
        </div>

        {/* Restaurant Subtitle */}
        <p className="font-serif text-lg sm:text-xl text-cream-200 tracking-wide mb-2 italic">
          Welcome to Saffron & Stone
        </p>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-cream-50 leading-[1.12] mb-5 max-w-3xl" style={{ textWrap: 'balance' }}>
          Where Flavour{' '}
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-terracotta-400 bg-clip-text text-transparent">
            Meets Elegance
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-2xl font-light leading-relaxed mb-8 text-center" style={{ textWrap: 'balance' }}>
          Discover an unforgettable dining experience where authentic flavours, handcrafted dishes, and warm hospitality come together.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Our Menu</span>
          </button>

          <button
            onClick={onReserveTable}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-cream-100 hover:text-white bg-stone-900/80 hover:bg-stone-800/90 border border-amber-500/30 hover:border-amber-400/60 rounded-lg backdrop-blur-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 text-amber-400" />
            <span>Reserve a Table</span>
          </button>
        </div>

        {/* Trust Highlights Bar */}
        <div className="w-full max-w-2xl border-t border-stone-800/80 pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-[11px] text-stone-400 font-medium">Opening Hours</div>
              <div className="text-xs text-cream-100 font-semibold">{RESTAURANT_INFO.hours.mon_thu}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-[11px] text-stone-400 font-medium">Prime Location</div>
              <div className="text-xs text-cream-100 font-semibold">Colaba, Mumbai</div>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 justify-center sm:justify-start">
            <div className="w-9 h-9 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-[11px] text-stone-400 font-medium">Guest Rating</div>
              <div className="text-xs text-cream-100 font-semibold">4.9 ★ (1,250+ Reviews)</div>
            </div>
          </div>
        </div>

      </div>

      {/* Subtle Scroll Down Indicator */}
      <button
        onClick={onExploreMenu}
        aria-label="Scroll down to menu"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-stone-400 hover:text-amber-400 transition-colors cursor-pointer group"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium opacity-80 group-hover:opacity-100">
          Discover
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-400/80 group-hover:text-amber-400" />
      </button>
    </section>
  );
};
