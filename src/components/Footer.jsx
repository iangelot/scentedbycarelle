import React from 'react';
import { IconWhatsApp } from './Icons';
import { WHATSAPP_DISPLAY, createConsultationWhatsAppLink } from '../data/perfumes';

export default function Footer({ onOpenQuiz }) {
  return (
    <footer className="w-full bg-[#12182d] text-white pt-12 pb-16 border-t border-white/10">
      <div className="max-w-[402px] md:max-w-5xl mx-auto px-5 md:px-8 text-center">
        
        {/* Brand Logo */}
        <div className="flex flex-col items-center mb-6">
          <img 
            src="/images/scented by carelle logo.png" 
            alt="Scented by Carelle" 
            className="h-[30px] w-auto object-contain filter brightness-0 invert mb-2.5"
          />
          <p className="font-elgina text-sm text-[#f1ede4] italic">
            "Made to stick in your memory."
          </p>
          <p className="text-[11px] text-white/60 mt-1 font-helvetica max-w-[260px]">
            Handcrafted artisanal perfumes & authentic designer imports in Cameroon.
          </p>
        </div>

        {/* Links */}
        <div className="py-6 border-y border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11.5px] text-white/70">
          <a href="/collection" className="hover:text-white transition-colors">Fragrances</a>
          <button onClick={onOpenQuiz} className="hover:text-white transition-colors">Scent Matcher</button>
          <a href="#editorial" className="hover:text-white transition-colors">The Story</a>
          <a href="#delivery" className="hover:text-white transition-colors">Delivery</a>
        </div>

        {/* WhatsApp Contact */}
        <div className="pt-6 pb-2 text-[11px] text-white/60 space-y-1">
          <p>Delivery available throughout Cameroon</p>
          <p>WhatsApp: {WHATSAPP_DISPLAY}</p>
          <div className="pt-2">
            <a
              href={createConsultationWhatsAppLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline font-medium"
            >
              <IconWhatsApp className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>

        <p className="text-[10px] text-white/40 pt-4">
          © {new Date().getFullYear()} Scented by Carelle. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
