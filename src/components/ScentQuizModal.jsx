import React, { useEffect, useState } from 'react';
import { IconClose, IconArrowRight, IconWhatsApp, IconStar } from './Icons';
import { PERFUMES_DATA, formatFCFA, createSingleProductWhatsAppLink } from '../data/perfumes';

export default function ScentQuizModal({ isOpen, onClose, onSelectPerfume }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ gender: '', vibe: '', collectionType: '' });
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setAnswers({ gender: '', vibe: '', collectionType: '' });
      setResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectOption = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < 3) {
      setStep(step + 1);
    } else {
      computeMatch(updated);
    }
  };

  const computeMatch = (finalAnswers) => {
    const terms = {
      gourmand: ['vanilla', 'gourmand', 'choco', 'chocolate', 'caramel', 'eclair', 'la vie', 'eilish', 'sweet'],
      regal: ['oud', 'rose', 'angham', 'valentino', 'oud mood', 'royal', 'amber'],
      woody: ['wood', 'woody', 'asad', 'vetiver', 'spice', 'hugo', '9pm', 'oud'],
      fresh: ['fresh', 'citrus', 'bergamot', 'allure', 'dolce', 'marine', 'chloe', 'chloé']
    }[finalAnswers.vibe] || [];
    const eligible = PERFUMES_DATA.filter((p) => !finalAnswers.gender || finalAnswers.gender === 'any' || p.gender === finalAnswers.gender || p.gender === 'unisex');
    const ranked = eligible.map((p) => {
      const searchable = [p.name, p.brand, p.tagline, p.description, ...(p.topNotes || []), ...(p.heartNotes || []), ...(p.baseNotes || [])].join(' ').toLowerCase();
      return { perfume: p, score: terms.reduce((score, term) => score + (searchable.includes(term) ? 1 : 0), 0) };
    }).sort((a, b) => b.score - a.score || a.perfume.price - b.perfume.price);
    setResult(ranked[0]?.perfume || PERFUMES_DATA[0]);
    setStep(4);
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ gender: '', vibe: '', collectionType: '' });
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#252D61]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[370px] bg-white rounded-2xl shadow-2xl p-5 z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#f1efe9]">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#252D61] font-elgina">
            Scent Matcher
          </span>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#f6f5f2] flex items-center justify-center text-[#252D61]"
          >
            <IconClose className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="py-4 space-y-3">
            <div className="text-center mb-1">
              <span className="text-[9.5px] text-[#858585] uppercase tracking-widest font-medium">Question 1 of 3</span>
              <h4 className="font-elgina text-lg text-[#252D61] mt-0.5">Who is this perfume for?</h4>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleSelectOption('gender', 'female')}
                className="w-full p-3 rounded-xl bg-[#fcfbf9] border border-[#f1efe9] hover:border-[#252D61]/40 text-left flex items-center justify-between text-xs text-[#252D61] transition-colors"
              >
                <span>For a Woman (Pour Femme)</span>
                <IconArrowRight className="w-3.5 h-3.5 text-[#858585]" />
              </button>
              <button
                onClick={() => handleSelectOption('gender', 'male')}
                className="w-full p-3 rounded-xl bg-[#fcfbf9] border border-[#f1efe9] hover:border-[#252D61]/40 text-left flex items-center justify-between text-xs text-[#252D61] transition-colors"
              >
                <span>For a Man (Pour Homme)</span>
                <IconArrowRight className="w-3.5 h-3.5 text-[#858585]" />
              </button>
              <button
                onClick={() => handleSelectOption('gender', 'unisex')}
                className="w-full p-3 rounded-xl bg-[#fcfbf9] border border-[#f1efe9] hover:border-[#252D61]/40 text-left flex items-center justify-between text-xs text-[#252D61] transition-colors"
              >
                <span>Unisex / Shared Signature</span>
                <IconArrowRight className="w-3.5 h-3.5 text-[#858585]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="py-4 space-y-3">
            <div className="text-center mb-1">
              <span className="text-[9.5px] text-[#858585] uppercase tracking-widest font-medium">Question 2 of 3</span>
              <h4 className="font-elgina text-lg text-[#252D61] mt-0.5">What mood defines you?</h4>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleSelectOption('vibe', 'gourmand')}
                className="w-full p-3 rounded-xl bg-[#fcfbf9] border border-[#f1efe9] hover:border-[#252D61]/40 text-left flex items-center justify-between text-xs text-[#252D61] transition-colors"
              >
                <div>
                  <span className="block font-medium">Warm Vanilla & Amber Gourmand</span>
                  <span className="text-[10px] text-[#858585]">Caramel, bourbon vanilla, cozy</span>
                </div>
                <IconArrowRight className="w-3.5 h-3.5 text-[#858585]" />
              </button>
              <button
                onClick={() => handleSelectOption('vibe', 'regal')}
                className="w-full p-3 rounded-xl bg-[#fcfbf9] border border-[#f1efe9] hover:border-[#252D61]/40 text-left flex items-center justify-between text-xs text-[#252D61] transition-colors"
              >
                <div>
                  <span className="block font-medium">Regal Oud & Velvet Rose</span>
                  <span className="text-[10px] text-[#858585]">Prestige, ambergris, lasting presence</span>
                </div>
                <IconArrowRight className="w-3.5 h-3.5 text-[#858585]" />
              </button>
              <button
                onClick={() => handleSelectOption('vibe', 'woody')}
                className="w-full p-3 rounded-xl bg-[#fcfbf9] border border-[#f1efe9] hover:border-[#252D61]/40 text-left flex items-center justify-between text-xs text-[#252D61] transition-colors"
              >
                <div>
                  <span className="block font-medium">Dark African Woods & Spices</span>
                  <span className="text-[10px] text-[#858585]">Ebony, vetiver, cardamom</span>
                </div>
                <IconArrowRight className="w-3.5 h-3.5 text-[#858585]" />
              </button>
              <button
                onClick={() => handleSelectOption('vibe', 'fresh')}
                className="w-full p-3 rounded-xl bg-[#fcfbf9] border border-[#f1efe9] hover:border-[#252D61]/40 text-left flex items-center justify-between text-xs text-[#252D61] transition-colors"
              >
                <div>
                  <span className="block font-medium">Luminous Coastal & Citrus Marine</span>
                  <span className="text-[10px] text-[#858585]">Gardenia, coconut, bergamot</span>
                </div>
                <IconArrowRight className="w-3.5 h-3.5 text-[#858585]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="py-4 space-y-3">
            <div className="text-center mb-1">
              <span className="text-[9.5px] text-[#858585] uppercase tracking-widest font-medium">Question 3 of 3</span>
              <h4 className="font-elgina text-lg text-[#252D61] mt-0.5">How would you like to shop?</h4>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleSelectOption('collectionType', 'designer')}
                className="w-full p-3 rounded-xl bg-[#fcfbf9] border border-[#f1efe9] hover:border-[#252D61]/40 text-left flex items-center justify-between text-xs text-[#252D61] transition-colors"
              >
                <div>
                  <span className="block font-medium">Browse available perfumes</span>
                  <span className="text-[10px] text-[#858585]">Explore the current perfume collection</span>
                </div>
                <IconArrowRight className="w-3.5 h-3.5 text-[#858585]" />
              </button>
              <button
                onClick={() => handleSelectOption('collectionType', 'designer')}
                className="w-full p-3 rounded-xl bg-[#fcfbf9] border border-[#f1efe9] hover:border-[#252D61]/40 text-left flex items-center justify-between text-xs text-[#252D61] transition-colors"
              >
                <div>
                  <span className="block font-medium">Show me a scent recommendation</span>
                  <span className="text-[10px] text-[#858585]">Choose from perfumes that match your answers</span>
                </div>
                <IconArrowRight className="w-3.5 h-3.5 text-[#858585]" />
              </button>
              <button
                onClick={() => handleSelectOption('collectionType', 'any')}
                className="w-full p-3 rounded-xl bg-[#fcfbf9] border border-[#f1efe9] hover:border-[#252D61]/40 text-left flex items-center justify-between text-xs text-[#252D61] transition-colors"
              >
                <div>
                  <span className="block font-medium">Best Scent Recommendation</span>
                  <span className="text-[10px] text-[#858585]">Curated selection</span>
                </div>
                <IconArrowRight className="w-3.5 h-3.5 text-[#858585]" />
              </button>
            </div>
          </div>
        )}

        {/* Result */}
        {step === 4 && result && (
          <div className="py-3 text-center space-y-3">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#f6f5f2] text-[#252D61] text-[10px] font-semibold uppercase tracking-wider">
              Recommended Match
            </span>

            <div className="w-24 h-24 mx-auto bg-[#f8f7f4] rounded-xl p-2 flex items-center justify-center">
              <img 
                src={result.image} 
                alt={result.name} 
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div>
              {result.brand && <span className="text-[10px] text-[#858585] uppercase tracking-wider block">{result.brand}</span>}
              <h4 className="font-elgina text-lg text-[#252D61] font-bold mt-0.5">
                {result.name}
              </h4>
              {result.tagline && <p className="text-[11px] text-[#252D61] mt-1 font-helvetica">{result.tagline}</p>}
              <div className="font-elgina text-base text-[#252D61] font-bold mt-1.5">
                {formatFCFA(result.price)}
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href={createSingleProductWhatsAppLink(result)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#252D61] text-white py-2.5 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#1F2755] block"
              >
                <IconWhatsApp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onSelectPerfume(result);
                }}
                className="w-full py-2 rounded-full border border-[#252D61]/20 text-xs text-[#252D61] hover:bg-[#f6f5f2]"
              >
                View Full Details
              </button>

              <button
                onClick={resetQuiz}
                className="text-[11px] text-[#858585] hover:text-[#252D61] block mx-auto pt-1"
              >
                Restart Scent Matcher
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
