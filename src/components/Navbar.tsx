import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Calendar, Phone, Share2, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useToast } from '../context/ToastContext';

interface NavbarProps {
  onOpenReservations?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservations }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [copied, setCopied] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { showToast } = useToast();

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      showToast('Link Copied', 'Website share link copied to clipboard.', 'success');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      showToast('Share Link', window.location.href, 'info');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'about', 'signatures', 'menu', 'events', 'gallery', 'reservations', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Signatures', id: 'signatures' },
    { label: 'Menu', id: 'menu' },
    { label: 'Events', id: 'events' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Reservations', id: 'reservations' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#ffffff]/95 backdrop-blur-md border-b border-[#e8e1d5] py-3.5 shadow-sm text-stone-900'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            
            {/* Zone 1: Brand Wordmark with Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="group flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
            >
              <div className="h-9 w-auto bg-white rounded-lg p-1 border border-stone-200/90 shadow-xs flex items-center justify-center">
                <img
                  src={RESTAURANT_INFO.company.logo}
                  alt="Ashivam Technologies"
                  className="h-7 w-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/public/assets/aistudio/image_fa912bac.png';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className={`font-serif text-lg sm:text-xl font-bold tracking-wide leading-tight transition-colors ${
                  isScrolled ? 'text-stone-900 group-hover:text-amber-800' : 'text-cream-50 group-hover:text-amber-300'
                }`}>
                  {RESTAURANT_INFO.shortName}
                </span>
                <span className={`text-[9px] uppercase tracking-wider font-semibold ${
                  isScrolled ? 'text-stone-500' : 'text-amber-300/90'
                }`}>
                  by Ashivam
                </span>
              </div>
            </a>

            {/* Zone 2: Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-semibold">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative py-1 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:text-amber-600 cursor-pointer ${
                      isActive
                        ? isScrolled ? 'text-amber-800 font-bold' : 'text-amber-300 font-bold'
                        : isScrolled ? 'text-stone-600 hover:text-stone-950' : 'text-stone-200 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-terracotta-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Actions (Share, Cart & Book a Table) */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Share with Company Button */}
              <button
                onClick={handleShare}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                  isScrolled
                    ? 'border-stone-200 text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                    : 'border-stone-700 text-stone-200 hover:text-white hover:bg-stone-800/60'
                }`}
                title="Share website link with company"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>

              {/* Dining Bag / Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2.5 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer ${
                  isScrolled
                    ? 'text-stone-700 hover:text-amber-800 hover:bg-stone-100 border-stone-200'
                    : 'text-stone-200 hover:text-amber-300 hover:bg-stone-800/60 border-stone-700'
                }`}
                aria-label={`Open dining bag with ${totalItems} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Book a Table Primary CTA */}
              <button
                onClick={() => {
                  if (onOpenReservations) {
                    onOpenReservations();
                  } else {
                    scrollToSection('reservations');
                  }
                }}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md shadow-amber-500/10 hover:shadow-amber-500/20 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer ${
                  isScrolled ? 'text-stone-800 hover:bg-stone-100' : 'text-stone-200 hover:bg-stone-800/60'
                }`}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Warm Light Luxury Style) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-white border-l border-stone-200 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-auto bg-white rounded-lg p-1 border border-stone-200 shadow-xs flex items-center justify-center">
                    <img
                      src={RESTAURANT_INFO.company.logo}
                      alt="Ashivam Technologies"
                      className="h-7 w-auto object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/public/assets/aistudio/image_fa912bac.png';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      {RESTAURANT_INFO.shortName}
                    </h3>
                    <p className="text-[10px] text-stone-500 uppercase tracking-wider">
                      by Ashivam
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-left px-4 py-3 rounded-lg text-sm tracking-wide transition-colors ${
                      activeSection === link.id
                        ? 'bg-amber-50 text-amber-800 font-bold'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-stone-200 flex flex-col gap-3">
              <button
                onClick={() => {
                  handleShare();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-amber-700" />}
                <span>{copied ? 'Link Copied!' : 'Share with Company'}</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToSection('reservations');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book a Table
              </button>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-stone-700 hover:text-stone-950 border border-stone-300 rounded-lg transition-colors font-medium cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>{RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
