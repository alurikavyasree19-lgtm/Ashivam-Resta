/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SignatureDishes } from './components/SignatureDishes';
import { Menu } from './components/Menu';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Reservations } from './components/Reservations';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { BackToTop } from './components/BackToTop';
import { AIChatBot } from './components/AIChatBot';

export default function App() {
  const [prefilledRequest, setPrefilledRequest] = useState<string>('');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookEventTable = (eventTitle: string) => {
    setPrefilledRequest(`Attending Event: ${eventTitle}`);
    scrollTo('reservations');
  };

  return (
    <ToastProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#faf7f2] text-stone-900 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
          
          {/* Top Sticky Navigation Bar */}
          <Navbar onOpenReservations={() => scrollTo('reservations')} />

          {/* Main Content Area */}
          <main className="flex-1">
            {/* 1. Hero Section */}
            <Hero
              onExploreMenu={() => scrollTo('menu')}
              onReserveTable={() => scrollTo('reservations')}
            />

            {/* 2. About Us Section */}
            <About />

            {/* 3. Signature Dishes Section */}
            <SignatureDishes />

            {/* 4. Complete Interactive Menu Section (Veg items, Non-veg items, Starters, Drinks) */}
            <Menu />

            {/* 5. Restaurant Events & Experiences Section (Replacing Offers) */}
            <Events onBookEventTable={handleBookEventTable} />

            {/* 6. Restaurant Gallery with Lightbox */}
            <Gallery />

            {/* 7. Table Reservation Section */}
            <Reservations prefilledRequest={prefilledRequest} />

            {/* 8. Customer Testimonials Carousel */}
            <Testimonials />

            {/* 9. Contact & Interactive Location Section */}
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Slide-out Shopping Bag & Checkout Drawer */}
          <CartDrawer />

          {/* Floating AI Dining Concierge Chatbot */}
          <AIChatBot />

          {/* Floating Back to Top Button */}
          <BackToTop />
        </div>
      </CartProvider>
    </ToastProvider>
  );
}
