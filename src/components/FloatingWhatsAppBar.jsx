import React from 'react';
import { IconWhatsApp, IconBag } from './Icons';
import { WHATSAPP_DISPLAY, createConsultationWhatsAppLink, formatFCFA } from '../data/perfumes';

export default function FloatingWhatsAppBar({ cartCount, cartTotal, onOpenCart }) {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 max-w-[402px] mx-auto px-4 pointer-events-none">
      <div className="flex items-center gap-2 justify-end pointer-events-auto">
        
        {/* Floating Cart Pill if Cart Has Items */}
        {cartCount > 0 && (
          <button
            onClick={onOpenCart}
            className="flex-1 bg-[#252D61] text-white px-4 py-2.5 rounded-full shadow-lg flex items-center justify-between border border-white/10 active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-2">
              <IconBag className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">Order Bag ({cartCount})</span>
            </div>
            <span className="text-[11px] font-bold font-elgina text-[#f3efe6]">
              {formatFCFA(cartTotal)}
            </span>
          </button>
        )}

        {/* WhatsApp Floating Chat Bubble */}
        <a
          href={createConsultationWhatsAppLink('general')}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#252D61] text-white p-3 rounded-full shadow-lg flex items-center justify-center hover:bg-[#1F2755] active:scale-90 transition-all border border-white/20"
          title={`Direct WhatsApp (${WHATSAPP_DISPLAY})`}
          aria-label="Direct WhatsApp Chat"
        >
          <IconWhatsApp className="w-5 h-5 text-emerald-400" />
        </a>

      </div>
    </div>
  );
}
