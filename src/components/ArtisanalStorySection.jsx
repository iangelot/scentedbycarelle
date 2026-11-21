import React from 'react';
import { IconStar, IconShield, IconWhatsApp } from './Icons';
import { createConsultationWhatsAppLink } from '../data/perfumes';
import ScrollReveal from './ScrollReveal';

export default function ArtisanalStorySection() {
  return (
    <section className="w-full bg-[#fcfbf9] py-14 border-t border-[#f1efe9]">
      <div className="max-w-[402px] md:max-w-5xl mx-auto px-5 md:px-8">
        
        {/* Eyebrow & Title */}
        <ScrollReveal className="text-center mb-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#252D61]/60 font-elgina font-medium">
            Behind the Brand
          </p>
          <h2 className="font-elgina text-2xl text-[#252D61] mt-1">
            The House of Carelle
          </h2>
          <p className="text-[11.5px] text-[#858585] max-w-[290px] mx-auto mt-1 leading-relaxed font-helvetica">
            Rooted in Douala, Cameroon, with a curated selection of perfumes for every signature.
          </p>
        </ScrollReveal>

        {/* 2 Story Pillars */}
        <div className="space-y-4 mb-8">
          {/* Pillar 1: Curated selection */}
          <ScrollReveal as="div" className="bg-white rounded-xl p-4 border border-[#f1efe9]">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#252D61] block mb-1">
              A Curated Selection
            </span>
            <p className="text-[11.5px] text-[#252D61] leading-relaxed font-helvetica">
              Explore the perfumes currently available in the collection, with clear pricing and ordering through WhatsApp.
            </p>
          </ScrollReveal>

          {/* Pillar 2: Personal service */}
          <ScrollReveal as="div" className="bg-white rounded-xl p-4 border border-[#f1efe9]" delay={0.08}>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#252D61] block mb-1">
              Personal Fragrance Advice
            </span>
            <p className="text-[11.5px] text-[#252D61] leading-relaxed font-helvetica">
              Need help choosing? Contact Carelle for a recommendation based on the kind of fragrance you enjoy.
            </p>
          </ScrollReveal>
        </div>

        {/* Carelle's Quote & Bespoke CTA */}
        <ScrollReveal className="bg-[#252D61] text-white rounded-2xl p-6 text-center">
          <p className="font-elgina text-sm sm:text-base italic leading-relaxed text-[#f3ede0]">
            "A perfume should never whisper goodbye when you walk into the room. It should linger like an indelible memory."
          </p>
          <p className="text-[10px] uppercase tracking-widest text-[#c5a059] font-medium mt-2">
            Carelle — Founder & Perfumer
          </p>

          <a
            href={createConsultationWhatsAppLink('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 bg-white text-[#252D61] px-5 py-2.5 rounded-full text-[11px] font-medium hover:bg-[#f6f5f2] active:scale-95 transition-all"
          >
            <IconWhatsApp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ask Carelle for Advice</span>
          </a>
        </ScrollReveal>

      </div>
    </section>
  );
}
