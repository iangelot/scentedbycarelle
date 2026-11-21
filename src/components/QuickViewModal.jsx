import React, { useEffect, useState } from 'react';
import { IconClose, IconWhatsApp, IconBag, IconClock, IconDrop } from './Icons';
import { formatFCFA, createSingleProductWhatsAppLink } from '../data/perfumes';

export default function QuickViewModal({ perfume, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (perfume) {
      setSelectedSize(perfume.sizes[0]);
      setQuantity(1);
    }
  }, [perfume?.id]);

  if (!perfume) return null;

  const activeSize = perfume.sizes.includes(selectedSize) ? selectedSize : perfume.sizes[0];
  const hasSelectableSizes = perfume.sizes.some((size) => size !== 'As pictured');
  const unitPrice = perfume.priceOptions ? perfume.priceOptions[activeSize] : perfume.price;
  const totalPrice = unitPrice * quantity;
  const hasNotes = [perfume.topNotes, perfume.heartNotes, perfume.baseNotes].some((notes) => notes?.length);

  const handleAddToCart = () => {
    onAddToCart({
      id: perfume.id,
      name: perfume.name,
      brand: perfume.brand,
      collection: perfume.collection,
      collectionLabel: perfume.collectionLabel,
      image: perfume.image,
      size: activeSize,
      price: unitPrice,
      quantity: quantity
    });
    onClose();
  };

  const handleDirectWhatsApp = () => {
    const link = createSingleProductWhatsAppLink(perfume, activeSize, quantity);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#252D61]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-[390px] bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f1efe9]">
          <div className="flex items-center gap-2">
            {perfume.genderLabel && <span className="text-[10px] text-[#858585]">{perfume.genderLabel}</span>}
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#f6f5f2] flex items-center justify-center text-[#252D61] hover:bg-[#eae8e3]"
            aria-label="Close"
          >
            <IconClose className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 space-y-4">
          {/* Image */}
          <div className="aspect-[4/3] bg-white rounded-xl flex items-center justify-center p-4 overflow-hidden">
            <img 
              src={perfume.image} 
              alt={perfume.name} 
              className="h-full w-full object-contain"
            />
          </div>

          {/* Details */}
          <div>
            {(perfume.brand || perfume.concentration) && (
              <span className="text-[10px] uppercase tracking-widest text-[#858585] font-medium">
                {[perfume.brand, perfume.concentration].filter(Boolean).join(' • ')}
              </span>
            )}
            <h3 className="font-elgina text-xl font-medium text-[#252D61] mt-0.5">
              {perfume.name}
            </h3>
            {perfume.description && <p className="text-[11.5px] text-[#252D61] mt-1.5 leading-relaxed font-helvetica">{perfume.description}</p>}
          </div>

          {/* Olfactory Notes */}
          {hasNotes && <div className="bg-[#fcfbf9] rounded-xl p-3.5 border border-[#f1efe9] space-y-2 text-[11px]">
            <h4 className="text-[10px] uppercase tracking-widest text-[#858585] font-semibold font-elgina">
              Olfactory Notes
            </h4>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-[#252D61] min-w-[50px]">Top:</span>
              <span className="text-[#252D61]">{perfume.topNotes.join(', ')}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-[#252D61] min-w-[50px]">Heart:</span>
              <span className="text-[#252D61]">{perfume.heartNotes.join(', ')}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-[#252D61] min-w-[50px]">Base:</span>
              <span className="text-[#252D61]">{perfume.baseNotes.join(', ')}</span>
            </div>
          </div>}

          {/* Longevity & Sillage */}
          {(perfume.longevity || perfume.sillage) &&
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {perfume.longevity && <div className="p-2.5 bg-[#fcfbf9] rounded-lg border border-[#f1efe9]">
              <span className="text-[9.5px] text-[#858585] uppercase tracking-wider block">Longevity</span>
              <span className="font-medium text-[#252D61] flex items-center gap-1 mt-0.5">
                <IconClock className="w-3 h-3 text-[#252D61]" />
                {perfume.longevity}
              </span>
            </div>}
            {perfume.sillage && <div className="p-2.5 bg-[#fcfbf9] rounded-lg border border-[#f1efe9]">
              <span className="text-[9.5px] text-[#858585] uppercase tracking-wider block">Sillage</span>
              <span className="font-medium text-[#252D61] flex items-center gap-1 mt-0.5">
                <IconDrop className="w-3 h-3 text-[#252D61]" />
                {perfume.sillage}
              </span>
            </div>}
          </div>}

          {/* Size Choice & Quantity Choice */}
          <div className="space-y-3 pt-1">
            {hasSelectableSizes && <div>
              <label className="block text-[11px] font-medium text-[#252D61] mb-1.5">Format :</label>
              <div className="flex items-center gap-2">
                {perfume.sizes.filter((size) => size !== 'As pictured').map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
                      activeSize === size
                        ? 'bg-[#252D61] text-white border-[#252D61]'
                        : 'bg-white text-[#252D61] border-[#252D61]/15 hover:border-[#252D61]/30'
                    }`}
                  >
                    {size} - {formatFCFA(perfume.priceOptions ? perfume.priceOptions[size] : perfume.price)}
                  </button>
                ))}
              </div>
            </div>}

            {/* Quantity Selector */}
            <div className="flex items-center justify-between bg-[#fcfbf9] p-2.5 rounded-xl border border-[#f1efe9]">
              <span className="text-[11px] font-medium text-[#252D61]">Quantité de flacons :</span>
              <div className="flex items-center gap-3 bg-white rounded-lg px-2.5 py-1 border border-[#252D61]/15">
                <button
                  onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
                  className="text-sm font-bold text-[#252D61] px-1 hover:opacity-70"
                >
                  -
                </button>
                <span className="text-xs font-bold text-[#252D61] min-w-[16px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="text-sm font-bold text-[#252D61] px-1 hover:opacity-70"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#f1efe9] bg-white flex items-center gap-2.5">
          <div className="mr-2">
            <span className="text-[9.5px] text-[#858585] uppercase tracking-wider block">
              {quantity > 1 ? `Total (${quantity})` : 'Prix'}
            </span>
            <span className="font-elgina text-base font-bold text-[#252D61]">
              {formatFCFA(totalPrice)}
            </span>
          </div>

          <button
            onClick={handleDirectWhatsApp}
            className="flex-1 bg-[#252D61] text-white py-2.5 rounded-full text-[11px] font-medium flex items-center justify-center gap-1.5 hover:bg-[#1F2755] active:scale-95 transition-all"
          >
            <IconWhatsApp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Commander ({quantity}) sur WhatsApp</span>
          </button>

          <button
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full border border-[#252D61]/20 flex items-center justify-center text-[#252D61] hover:bg-[#f6f5f2] active:scale-95"
            title="Ajouter au panier"
            aria-label="Add to bag"
          >
            <IconBag className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
