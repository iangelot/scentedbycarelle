import React from 'react';
import { IconTruck, IconWhatsApp } from './Icons';
import { WHATSAPP_DISPLAY, createConsultationWhatsAppLink } from '../data/perfumes';
import ScrollReveal from './ScrollReveal';

export default function DeliveryInfoSection() {
  const steps = [
    {
      num: "01",
      title: "Select Your Fragrance",
      desc: "Browse the perfume collection, then tap 'Order on WhatsApp' or add your choices to the order bag."
    },
    {
      num: "02",
      title: "Direct WhatsApp Confirmation",
      desc: `Your selection is pre-filled directly into WhatsApp (${WHATSAPP_DISPLAY}). Carelle confirms availability and your address.`
    },
    {
      num: "03",
      title: "Doorstep Delivery & Payment",
      desc: "Choose doorstep or agency delivery anywhere in Cameroon. Carelle confirms the available option and timing for your location. Pay upon delivery or via Mobile Money."
    }
  ];

  return (
    <section id="delivery" className="w-full bg-white py-14 border-t border-[#f1efe9]">
      <div className="max-w-[402px] md:max-w-5xl mx-auto px-5 md:px-8">
        
        {/* Header */}
        <ScrollReveal className="text-center mb-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#252D61]/60 font-elgina font-medium">
            Cameroon Wide Service
          </p>
          <h2 className="font-elgina text-2xl text-[#252D61] mt-0.5">
            How WhatsApp Ordering Works
          </h2>
          <p className="text-[11.5px] text-[#858585] max-w-[280px] mx-auto mt-1 leading-relaxed font-helvetica">
            Direct, personalized concierge service with Carelle. No credit card required.
          </p>
        </ScrollReveal>

        {/* 3 Step Cards */}
        <div className="space-y-3 mb-8">
          {steps.map((step, idx) => (
            <ScrollReveal key={idx} as="div" className="p-4 rounded-xl bg-[#fcfbf9] border border-[#f1efe9] flex items-start gap-3.5" delay={idx * 0.07}>
              <span className="font-elgina text-xl text-[#252D61] font-bold min-w-[28px]">
                {step.num}
              </span>
              <div>
                <h4 className="font-elgina text-[13px] text-[#252D61] font-semibold mb-0.5">
                  {step.title}
                </h4>
                <p className="text-[11px] text-[#252D61] leading-relaxed font-helvetica">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Speed & Payment Notice */}
        <ScrollReveal className="bg-[#f6f5f2] rounded-xl p-4 border border-[#252D61]/10 text-center">
          <p className="text-[11.5px] font-semibold text-[#252D61] mb-1">
            Doorstep and agency delivery throughout Cameroon
          </p>
          <p className="text-[11px] text-[#858585] mb-3 font-helvetica">
            Payment on Delivery, Orange Money, or MTN Mobile Money (MoMo).
          </p>
          <a
            href={createConsultationWhatsAppLink('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#252D61] underline"
          >
            <IconWhatsApp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct WhatsApp Concierge: {WHATSAPP_DISPLAY}</span>
          </a>
        </ScrollReveal>

      </div>
    </section>
  );
}
