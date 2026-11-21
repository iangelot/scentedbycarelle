import React, { useState } from 'react';
import { IconClose, IconBag, IconWhatsApp, IconTruck, IconShield } from './Icons';
import { formatFCFA, createCartWhatsAppLink, WHATSAPP_DISPLAY } from '../data/perfumes';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}) {
  const [deliveryCity, setDeliveryCity] = useState('');

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0 || !deliveryCity.trim()) return;
    const link = createCartWhatsAppLink(cartItems, deliveryCity);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#252D61]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-[370px] bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-250">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#f1efe9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconBag className="w-4 h-4 text-[#252D61]" />
            <h3 className="font-elgina text-base text-[#252D61] font-bold">
              Order Bag
            </h3>
            <span className="text-[10px] bg-[#f6f5f2] text-[#252D61] font-medium px-2 py-0.5 rounded-full">
              {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#f6f5f2] flex items-center justify-center text-[#252D61] hover:bg-[#eae8e3]"
            aria-label="Close"
          >
            <IconClose className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#858585]">
              <div className="w-12 h-12 rounded-full bg-[#f6f5f2] flex items-center justify-center mb-3">
                <IconBag className="w-6 h-6 text-[#858585]" />
              </div>
              <h4 className="font-elgina text-lg text-[#252D61] mb-1">Your bag is empty</h4>
              <p className="text-[11.5px] text-[#858585] max-w-xs mb-5 font-helvetica">
                Discover Carelle's handmade extraits or authentic designer imports to begin.
              </p>
              <button
                onClick={onClose}
                className="py-2.5 px-5 rounded-full bg-[#252D61] text-white text-[11px] font-medium shadow-xs"
              >
                Browse Scent Catalog
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-2.5">
                {cartItems.map((item) => (
                  <div 
                    key={`${item.id}-${item.size}`}
                    className="flex items-center gap-3 p-2.5 bg-[#fcfbf9] rounded-xl border border-[#f1efe9]"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-[#f1efe9]">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className="font-elgina text-[12.5px] text-[#252D61] font-semibold truncate">
                        {item.name}
                      </h5>
                      <span className="text-[10.5px] text-[#858585] block">
                        {item.size && item.size !== 'As pictured' ? `${item.size} • ` : ''}{formatFCFA(item.price)}
                      </span>

                      {/* Controls */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-5 h-5 rounded-full bg-white border border-[#252D61]/15 flex items-center justify-center text-[#252D61] text-xs"
                        >
                          -
                        </button>
                        <span className="text-[11px] font-bold text-[#252D61]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-5 h-5 rounded-full bg-white border border-[#252D61]/15 flex items-center justify-center text-[#252D61] text-xs"
                        >
                          +
                        </button>

                        <button
                          onClick={() => onRemoveItem(item.id, item.size)}
                          className="ml-auto text-rose-500 hover:text-rose-700 text-[10px]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Destination */}
              <div className="bg-[#fcfbf9] p-3 rounded-xl border border-[#f1efe9]">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#252D61] mb-1.5">
                  <IconTruck className="w-3.5 h-3.5" />
                  <span>Town or city</span>
                </label>
                <input
                  type="text"
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  placeholder="Enter your town in Cameroon"
                  autoComplete="address-level2"
                  className="w-full bg-white border border-[#252D61]/15 rounded-lg px-2.5 py-1.5 text-[11px] text-[#252D61] focus:outline-none"
                  required
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-[#f1efe9] bg-white space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#858585]">Total:</span>
              <span className="font-elgina text-base font-bold text-[#252D61]">
                {formatFCFA(totalAmount)}
              </span>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              disabled={!deliveryCity.trim()}
              className="w-full bg-[#252D61] text-white py-3 rounded-full text-xs font-medium flex items-center justify-center gap-2 hover:bg-[#1F2755] active:scale-95 transition-all shadow-xs disabled:cursor-not-allowed disabled:opacity-45"
            >
              <IconWhatsApp className="w-4 h-4 text-emerald-400" />
              <span>Send Order to WhatsApp ({WHATSAPP_DISPLAY})</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
