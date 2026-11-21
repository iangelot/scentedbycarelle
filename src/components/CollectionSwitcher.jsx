import React from 'react';

export default function CollectionSwitcher() {
  return (
    <div className="w-full max-w-[402px] md:max-w-5xl mx-auto px-5 md:px-8 mb-6">
      <div className="text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#252D61]/60 font-elgina font-medium">
          Perfume Collection
        </p>
        <h3 className="font-elgina text-2xl text-[#252D61] mt-0.5">
          Find Your Fragrance
        </h3>
        <p className="text-[11.5px] text-[#858585] max-w-[280px] md:max-w-xl mx-auto mt-1 leading-relaxed font-helvetica">
          Explore the collection by name, scent family, or who it is for.
        </p>
      </div>
    </div>
  );
}
