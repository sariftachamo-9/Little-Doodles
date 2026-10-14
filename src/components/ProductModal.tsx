import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  CheckCircle2, 
  Download, 
  Sparkles
} from 'lucide-react';
import { Product } from '../types/store';

interface ProductModalProps {
  product: Product | null;
  currency: 'NPR' | 'USD';
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isFavorite,
  onClose,
  onToggleFavorite,
  onAddToCart,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [sampleDownloaded, setSampleDownloaded] = useState<boolean>(false);

  if (!product) return null;

  const handleDownloadFreeSample = () => {
    setSampleDownloaded(true);
    setTimeout(() => {
      alert(`🎉 Free sample printable for "${product.title}" downloaded! Have fun coloring!`);
      setSampleDownloaded(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 260 }}
          className="relative w-full max-w-3xl bg-[#FFFDF9] rounded-3xl border-4 border-amber-300 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Top Bar with Close & Favorite */}
          <div className="p-4 sm:p-5 border-b-2 border-amber-200 bg-amber-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌟</span>
              <span className="font-cartoon font-extrabold text-xs text-amber-900 uppercase tracking-wider bg-amber-200/70 px-2.5 py-1 rounded-full border border-amber-300">
                {product.category} · {product.ageBand}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(product.id)}
                className="w-9 h-9 rounded-full bg-white hover:bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 shadow-xs transition-colors cursor-pointer"
                title="Save to favorites"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white hover:bg-amber-100 border border-amber-200 flex items-center justify-center text-[#2B2A29] font-bold shadow-xs transition-transform active:scale-90 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Image Preview Gallery */}
              <div className="md:col-span-6 space-y-3">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-amber-50 border-3 border-amber-200 shadow-inner">
                  <img
                    src={product.samplePages[selectedImageIndex] || product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {product.badge && (
                    <div className="absolute top-2.5 left-2.5 bg-amber-400 text-amber-950 font-cartoon font-black text-xs px-2.5 py-1 rounded-full border border-amber-500 shadow-xs">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {product.samplePages.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {product.samplePages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          selectedImageIndex === idx
                            ? 'border-amber-500 scale-105 shadow-xs'
                            : 'border-stone-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt="Thumbnail preview" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer" 
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Free Sample Download Trigger */}
                <div className="p-3 bg-emerald-50 rounded-2xl border-2 border-emerald-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎁</span>
                    <div className="text-xs font-cartoon">
                      <div className="font-black text-emerald-950">Try 1 Free Sample Sheet!</div>
                      <div className="text-[11px] text-emerald-700">Test home printing quality</div>
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadFreeSample}
                    disabled={sampleDownloaded}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-cartoon font-bold text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{sampleDownloaded ? 'Sending...' : 'Free PDF'}</span>
                  </button>
                </div>

              </div>

              {/* Right Column: Details & Benefits */}
              <div className="md:col-span-6 space-y-4">
                
                <div>
                  <div className="flex items-center gap-2 text-xs font-cartoon text-[#78716C] mb-1">
                    <div className="flex items-center gap-1 font-bold text-amber-500">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                    <span>·</span>
                    <span>{product.reviewCount} happy parent reviews</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-cartoon font-black text-[#2B2A29] leading-tight">
                    {product.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-800 font-semibold font-cartoon mt-1">
                    {product.subtitle}
                  </p>
                </div>

                {product.achievement && (
                  <div className="p-3 bg-linear-to-r from-amber-100 via-yellow-100 to-amber-100 rounded-2xl border-2 border-amber-300 flex items-center justify-between gap-2 shadow-2xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-400 border border-amber-500 flex items-center justify-center text-xl shadow-xs shrink-0">
                        {product.achievement.iconEmoji}
                      </div>
                      <div>
                        <div className="text-[10px] font-cartoon font-black text-amber-900 uppercase flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-amber-700" />
                          Cute Achievement Badge
                        </div>
                        <div className="text-xs font-cartoon font-black text-[#2B2A29]">
                          {product.achievement.title}
                        </div>
                        <div className="text-[10px] font-cartoon text-amber-800 line-clamp-1">
                          🎮 {product.achievement.tagline}
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 bg-white px-2.5 py-1 rounded-xl border border-amber-300 text-center font-cartoon font-black text-xs text-amber-900 shadow-2xs">
                      +{product.achievement.points} XP
                    </div>
                  </div>
                )}

                <p className="text-xs text-[#57534E] leading-relaxed">
                  {product.description}
                </p>

                {/* Specs Pill Matrix */}
                <div className="grid grid-cols-2 gap-2 text-xs font-cartoon">
                  <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200">
                    <span className="text-[#78716C] block text-[10px]">Print Format</span>
                    <span className="font-bold text-[#2B2A29]">{product.format}</span>
                  </div>
                  <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200">
                    <span className="text-[#78716C] block text-[10px]">Page Count</span>
                    <span className="font-bold text-[#2B2A29]">{product.pageCount} Activity Pages</span>
                  </div>
                  <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200">
                    <span className="text-[#78716C] block text-[10px]">Paper Sizing</span>
                    <span className="font-bold text-[#2B2A29]">{product.dimensions}</span>
                  </div>
                  <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-200">
                    <span className="text-[#78716C] block text-[10px]">Family License</span>
                    <span className="font-bold text-[#2B2A29]">Home & Classroom</span>
                  </div>
                </div>

                {/* What's Included */}
                <div className="space-y-1.5 pt-1">
                  <h4 className="font-cartoon font-black text-xs text-[#2B2A29] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>What's Inside Your Download:</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-[#57534E]">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Learned */}
                <div className="space-y-1.5 pt-1">
                  <h4 className="font-cartoon font-black text-xs text-[#2B2A29]">
                    Key Developmental Skills:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.skillsLearned.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white text-stone-700 font-cartoon font-bold text-[11px] rounded-lg border border-amber-200 shadow-2xs"
                      >
                        ✨ {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Modal Footer / Checkout Action with clear Rs / Dollar price */}
          <div className="p-5 border-t-2 border-amber-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-cartoon text-[#78716C] block">Instant Download Price (Rs / Dollar):</span>
              <div className="flex items-baseline gap-2 font-cartoon">
                <span className="text-2xl font-black text-[#2B2A29]">
                  Rs. {product.priceNpr}
                </span>
                <span className="text-base font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300">
                  ${product.priceUsd.toFixed(2)} USD
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-cartoon font-black text-sm rounded-2xl shadow-[0_4px_0_0_#D97706] flex items-center justify-center gap-2 transition-transform cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Backpack</span>
              </motion.button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
