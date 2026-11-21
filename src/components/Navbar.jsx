import React, { useState } from 'react';
import { IconClose, IconWhatsApp, IconBag, IconSearch, IconArrowRight } from './Icons';
import { WHATSAPP_DISPLAY, createConsultationWhatsAppLink } from '../data/perfumes';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  onOpenSearch, 
  onOpenQuiz
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Exact Figma Header */}
      <header className="sticky top-0 z-40 w-full border-0 bg-transparent">
        <div className="max-w-[420px] md:max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center"
          >
            <img 
              src="/images/scented by carelle logo.png" 
              alt="Scented by Carelle" 
              className="h-[30px] w-auto object-contain"
            />
          </a>

          {/* Right Action: Pill Hamburger Menu matching Figma */}
          <div className="flex items-center gap-3">
            {/* Subtle bag indicator if items added */}
            {cartCount > 0 && (
              <button 
                onClick={onOpenCart}
                className="relative p-1.5 text-[#252D61] hover:opacity-80 transition-opacity"
                aria-label="Order Bag"
              >
                <IconBag className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-[#252D61] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            )}

            {/* Exact Figma Pill Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="relative flex h-[27px] w-[44px] items-center justify-center rounded-full bg-[#252D61] px-2.5 text-white transition-transform duration-200 hover:scale-105 active:scale-95"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className={`absolute h-[1.8px] w-4 rounded-full bg-white transition-transform duration-300 ease-out motion-reduce:transition-none ${mobileMenuOpen ? 'rotate-45' : '-translate-y-[5px]'}`} />
              <span className={`absolute h-[1.8px] w-4 rounded-full bg-white transition-opacity duration-200 motion-reduce:transition-none ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute h-[1.8px] w-4 rounded-full bg-white transition-transform duration-300 ease-out motion-reduce:transition-none ${mobileMenuOpen ? '-rotate-45' : 'translate-y-[5px]'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Slide-Over Menu (No emojis, pure typographic refinement) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="menu-backdrop fixed inset-0 bg-[#252D61]/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Panel */}
          <div id="mobile-navigation" className="menu-panel relative z-10 flex h-full w-full max-w-[340px] flex-col justify-between bg-white p-6 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#f1efe9]">
                <img 
                  src="/images/scented by carelle logo.png" 
                  alt="Scented by Carelle" 
                  className="h-[28px] w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#f6f5f2] flex items-center justify-center text-[#252D61] hover:bg-[#eae8e3]"
                  aria-label="Close"
                >
                  <IconClose className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="mt-8 flex flex-col space-y-5 text-sm">
                <button
                  onClick={() => { setMobileMenuOpen(false); window.location.assign('/collection'); }}
                  className="flex items-center justify-between text-left font-elgina text-lg text-[#252D61] hover:text-[#9ca3af] transition-colors"
                >
                  <span>View Collection</span>
                  <IconArrowRight className="w-4 h-4 text-[#9ca3af]" />
                </button>

                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenQuiz(); }}
                  className="flex items-center justify-between text-left font-elgina text-lg text-[#252D61] hover:text-[#9ca3af] transition-colors"
                >
                  <span>Scent Matcher Quiz</span>
                  <IconArrowRight className="w-4 h-4 text-[#9ca3af]" />
                </button>

                <button
                  onClick={() => scrollToSection('delivery')}
                  className="flex items-center justify-between text-left font-elgina text-lg text-[#252D61] hover:text-[#9ca3af] transition-colors"
                >
                  <span>Delivery in Cameroon</span>
                  <IconArrowRight className="w-4 h-4 text-[#9ca3af]" />
                </button>
              </div>
            </div>

            {/* Bottom Direct Concierge */}
            <div className="pt-6 border-t border-[#f1efe9]">
              <p className="text-[10px] uppercase tracking-widest text-[#858585] mb-2 font-medium">
                WhatsApp Concierge
              </p>
              <a
                href={createConsultationWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#252D61] text-white py-3 rounded-full text-xs font-medium tracking-wide active:scale-95 transition-transform"
              >
                <IconWhatsApp className="w-4 h-4 text-emerald-400" />
                <span>Chat with Carelle ({WHATSAPP_DISPLAY})</span>
              </a>
              <p className="text-[10px] text-center text-[#858585] mt-2">
                Delivery available throughout Cameroon
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
