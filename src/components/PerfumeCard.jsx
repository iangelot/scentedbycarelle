import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { IconWhatsApp, IconBag, IconCheck } from './Icons';
import { formatFCFA, createSingleProductWhatsAppLink } from '../data/perfumes';

export default function PerfumeCard({ perfume, onAddToCart, onQuickView }) {
  const [selectedSize, setSelectedSize] = useState(perfume.sizes[0]);
  const [addedNotice, setAddedNotice] = useState(false);
  const unitPrice = perfume.priceOptions ? perfume.priceOptions[selectedSize] : perfume.price;
  const reduceMotion = useReducedMotion();

  const handleAddToCart = (event) => {
    event.stopPropagation();
    onAddToCart({
      id: perfume.id,
      name: perfume.name,
      brand: perfume.brand,
      collection: perfume.collection,
      collectionLabel: perfume.collectionLabel,
      image: perfume.image,
      size: selectedSize,
      price: unitPrice,
      quantity: 1,
    });
    setAddedNotice(true);
    window.setTimeout(() => setAddedNotice(false), 1500);
  };

  const handleDirectWhatsAppOrder = (event) => {
    event.stopPropagation();
    window.open(createSingleProductWhatsAppLink(perfume, selectedSize, 1), '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.article
      onClick={() => onQuickView(perfume)}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
      className="product-card group cursor-pointer overflow-hidden rounded-[12px] bg-white transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="product-card-image relative aspect-square overflow-hidden bg-white">
        <img
          src={perfume.image}
          alt={perfume.name}
          className="h-full w-full object-contain p-0 transition-transform duration-500 group-hover:scale-[1.035]"
          loading="lazy"
        />
      </div>

      <div className="product-card-body p-2.5 sm:p-3.5">
        {perfume.brand && <p className="mb-1 truncate text-[8px] uppercase tracking-[0.12em] text-[#858585]">{perfume.brand}</p>}
        <h3 className="line-clamp-2 min-h-[2.15rem] font-elgina text-[14px] font-semibold leading-[1.08] text-[#252D61] sm:text-[16px]">
          {perfume.name}
        </h3>

        <div className="mt-1.5 flex items-baseline justify-between gap-2">
          <span className="font-helvetica text-[11px] font-medium text-[#252D61] sm:text-xs">{formatFCFA(unitPrice)}</span>
          {perfume.genderLabel && <span className="truncate text-[8px] text-[#858585]">{perfume.genderLabel}</span>}
        </div>

        {perfume.sizes.length > 1 && (
          <div className="mt-2 flex items-center gap-2" aria-label="Choose bottle size">
            {perfume.sizes.map((size) => (
              <button
                key={size}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`border-b pb-0.5 text-[9px] transition-colors ${selectedSize === size ? 'border-[#252D61] text-[#252D61]' : 'border-transparent text-[#858585] hover:text-[#252D61]'}`}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <div className="mt-2.5 flex items-center gap-1.5">
          <button
            onClick={handleDirectWhatsAppOrder}
            className="flex min-h-8 flex-1 items-center justify-center gap-1 rounded-full bg-[#252D61] px-2 text-[9px] font-medium text-white transition-colors hover:bg-[#1F2755] active:scale-[.98] sm:text-[10px]"
          >
            <IconWhatsApp className="h-3 w-3 text-white/80" />
            <span>Commander</span>
          </button>
          <button
            onClick={handleAddToCart}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${addedNotice ? 'border-[#252D61] bg-[#252D61] text-white' : 'border-[#252D61]/20 text-[#252D61] hover:bg-white'}`}
            aria-label="Add to order bag"
            title="Add to order bag"
          >
            {addedNotice ? <IconCheck className="h-3.5 w-3.5" /> : <IconBag className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
