import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Gift,
  ArrowRight,
  Copy,
  Check,
  QrCode
} from 'lucide-react';
import { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'NPR' | 'USD';
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);
  const [paymentChoice, setPaymentChoice] = useState<'khalti' | 'esewa'>('khalti');
  const [copiedNumber, setCopiedNumber] = useState<boolean>(false);

  const PAYMENT_NUMBER = '9840531722';

  const subtotalNpr = items.reduce((sum, item) => sum + item.product.priceNpr * item.quantity, 0);
  const subtotalUsd = items.reduce((sum, item) => sum + item.product.priceUsd * item.quantity, 0);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(PAYMENT_NUMBER);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1200);
  };

  const handleDownloadPurchasedFiles = () => {
    alert(`🎉 Success! Downloading high-resolution printables package for ${items.length} activity books. Happy printing!`);
    onClearCart();
    setCheckoutComplete(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
        
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-md bg-[#FFFDF9] h-full shadow-2xl flex flex-col justify-between z-10 border-l-4 border-amber-300"
        >
          
          {/* Header */}
          <div className="p-5 border-b-2 border-amber-200 flex items-center justify-between bg-amber-50/80">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎒</span>
              <div>
                <h3 className="font-cartoon font-black text-lg text-[#2B2A29] leading-tight">
                  Your Activity Backpack
                </h3>
                <span className="text-xs text-[#78716C] font-cartoon font-semibold">
                  {items.length} {items.length === 1 ? 'activity pack' : 'activity packs'} ready
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white hover:bg-amber-100 text-[#2B2A29] border border-amber-200 flex items-center justify-center font-bold transition-transform active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {checkoutComplete ? (
              /* Celebration Screen */
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="text-6xl animate-bounce">🎉</div>
                <h3 className="text-2xl font-cartoon font-black text-[#2B2A29]">
                  Yay! Order Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] font-medium leading-relaxed max-w-xs mx-auto">
                  Your payment was verified. All print-ready PDF files and certificates are unlocked and ready for printing!
                </p>

                <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-xs font-cartoon text-emerald-950 space-y-1.5">
                  <div className="font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Instant Digital Access Unlocked</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-800">
                    Payment via {paymentChoice === 'khalti' ? '💜 Khalti' : '💚 eSewa'}
                  </div>
                  <div className="text-[11px] text-[#78716C]">
                    Receiver Mobile: <strong>{PAYMENT_NUMBER}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleDownloadPurchasedFiles}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-cartoon font-black text-sm rounded-2xl shadow-[0_4px_0_0_#059669] flex items-center justify-center gap-2 transition-transform active:translate-y-1 cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download All Printables Now!</span>
                  </button>
                </div>
              </motion.div>
            ) : items.length === 0 ? (
              /* Empty Bag State */
              <div className="py-16 text-center space-y-3">
                <div className="text-6xl">🧸</div>
                <h4 className="font-cartoon font-black text-lg text-[#2B2A29]">
                  Your backpack is empty!
                </h4>
                <p className="text-xs text-[#78716C] font-medium max-w-xs mx-auto">
                  Browse our printable tracing books, coloring sheets, and daily routine cards to fill it up!
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-cartoon font-black text-xs rounded-2xl shadow-[0_3px_0_0_#D97706]"
                >
                  Start Exploring Printables
                </button>
              </div>
            ) : (
              <>
                {/* Free Bonus Gift Progress */}
                <div className="p-3.5 bg-gradient-to-r from-amber-100 to-yellow-50 rounded-2xl border-2 border-amber-300 space-y-2">
                  <div className="flex items-center justify-between text-xs font-cartoon font-bold text-amber-950">
                    <span className="flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-amber-600" />
                      <span>Free Safari Stickers Pack!</span>
                    </span>
                    <span className="text-emerald-700">Unlocked! 🎁</span>
                  </div>
                  <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-amber-300">
                    <div className="w-full h-full bg-emerald-500 rounded-full" />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map(item => (
                    <div
                      key={item.product.id}
                      className="bg-white rounded-2xl border-2 border-amber-200 p-3 shadow-2xs flex gap-3 items-center"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-amber-50 border border-amber-200 shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-cartoon font-bold text-xs text-[#2B2A29] truncate">
                          {item.product.title}
                        </h4>
                        <div className="text-[11px] text-[#78716C] font-cartoon">
                          {item.product.ageBand} · {item.product.pageCount} pgs
                        </div>
                        <div className="font-cartoon text-xs text-amber-900 mt-0.5 flex items-baseline gap-1.5">
                          <span className="font-black text-sm text-[#2B2A29]">Rs. {item.product.priceNpr * item.quantity}</span>
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-200">
                            ${(item.product.priceUsd * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-rose-500 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-1 bg-stone-100 rounded-lg p-0.5 border border-stone-200 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-5 h-5 flex items-center justify-center rounded hover:bg-white text-[#2B2A29]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center font-cartoon font-bold text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-5 h-5 flex items-center justify-center rounded hover:bg-white text-[#2B2A29]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nepal Domestic Payment Selection: Khalti & eSewa ONLY */}
                <div className="p-4 bg-white rounded-2xl border-2 border-amber-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-cartoon font-extrabold text-[#2B2A29] flex items-center gap-1.5">
                      <span>🇳🇵</span>
                      <span>Payment Method (Domestic Nepal):</span>
                    </span>
                    <span className="text-[10px] font-cartoon font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      eSewa & Khalti Only
                    </span>
                  </div>
                  
                  {/* Two Payment Buttons: Khalti and eSewa */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-cartoon font-bold">
                    <button
                      type="button"
                      onClick={() => setPaymentChoice('khalti')}
                      className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        paymentChoice === 'khalti'
                          ? 'bg-purple-50 border-purple-500 text-purple-950 shadow-xs ring-2 ring-purple-200'
                          : 'bg-stone-50 border-stone-200 text-[#57534E] hover:bg-purple-50/50'
                      }`}
                    >
                      <span className="text-base">💜</span>
                      <span className="font-black text-xs">Khalti Wallet</span>
                      <span className="text-[10px] text-purple-700 font-semibold">{PAYMENT_NUMBER}</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentChoice('esewa')}
                      className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        paymentChoice === 'esewa'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs ring-2 ring-emerald-200'
                          : 'bg-stone-50 border-stone-200 text-[#57534E] hover:bg-emerald-50/50'
                      }`}
                    >
                      <span className="text-base">💚</span>
                      <span className="font-black text-xs">eSewa Wallet</span>
                      <span className="text-[10px] text-emerald-700 font-semibold">{PAYMENT_NUMBER}</span>
                    </button>
                  </div>

                  {/* Personal Number & Copy Feature */}
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-2">
                    <div className="text-xs font-cartoon">
                      <span className="text-[#78716C] block text-[10px]">
                        Send via {paymentChoice === 'khalti' ? 'Khalti' : 'eSewa'} to personal number:
                      </span>
                      <span className="font-black text-[#2B2A29] text-sm tracking-wider font-mono">
                        {PAYMENT_NUMBER}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyNumber}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 font-cartoon font-bold text-xs border border-stone-300 flex items-center gap-1.5 shadow-2xs transition-transform active:scale-95"
                    >
                      {copiedNumber ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </>
            )}

          </div>

          {/* Footer Checkout Bar */}
          {!checkoutComplete && items.length > 0 && (
            <div className="p-5 border-t-2 border-amber-200 bg-white space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-cartoon font-bold text-xs text-[#78716C] block">Total (Rs / Dollar):</span>
                  <span className="text-[10px] text-emerald-700 font-cartoon font-semibold">Instant digital access</span>
                </div>
                <div className="text-right font-cartoon">
                  <div className="font-black text-2xl text-[#2B2A29]">
                    Rs. {subtotalNpr}
                  </div>
                  <div className="text-xs font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-md inline-block border border-amber-200">
                    ${subtotalUsd.toFixed(2)} USD
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-cartoon font-black text-sm rounded-2xl shadow-[0_4px_0_0_#D97706] transition-transform flex items-center justify-center gap-2 cursor-pointer"
              >
                {isCheckingOut ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-800" />
                    <span>Verifying {paymentChoice.toUpperCase()} (9840531722)...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Unlock Download</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
              
              <div className="text-[11px] text-center text-[#78716C] font-cartoon">
                🔒 Instant high-res PDF download · Safe for family printing
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
