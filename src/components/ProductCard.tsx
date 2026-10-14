import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Eye, Star, FileText } from 'lucide-react';
import { Product } from '../types/store';
import { CuteAchievementOverlay } from './CuteAchievementOverlay';
import { soundManager } from '../utils/soundEffects';

interface ProductCardProps {
  product: Product;
  currency: 'NPR' | 'USD';
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
  onUnlockAchievement?: (achievementId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onOpenQuickView,
  onUnlockAchievement,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.achievement) {
      soundManager.playAchievementChime();
      if (onUnlockAchievement) {
        onUnlockAchievement(product.achievement.id);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -7, scale: 1.015 }}
      transition={{ type: 'spring', damping: 18, stiffness: 220 }}
      className={`relative bg-white rounded-3xl border-3 transition-all flex flex-col justify-between group p-4 ${
        product.achievement && isHovered
          ? 'border-amber-400 shadow-[0_10px_0_0_#FCD34D] ring-2 ring-amber-300/60'
          : 'border-amber-200/90 hover:border-amber-400 shadow-[0_4px_0_0_#FDE68A] hover:shadow-[0_8px_0_0_#FCD34D]'
      }`}
    >
      <div>
        {/* Image Container with Badges & Cute Achievement Overlay */}
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-amber-50 border-2 border-amber-100 cursor-pointer mb-3.5">
          <img
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isHovered ? 'scale-106' : 'scale-100'
            }`}
            referrerPolicy="no-referrer"
            onClick={() => onOpenQuickView(product)}
          />

          {/* Cute Achievement Floating Stars & Medals on Hover */}
          {product.achievement && (
            <CuteAchievementOverlay
              achievement={product.achievement}
              isHovered={isHovered}
              isPopular={product.isPopular}
            />
          )}

          {/* Badge: e.g. Popular ABC ⭐ or Top Color Book 🎨 */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 bg-amber-400 text-amber-950 font-cartoon font-black text-[11px] px-2.5 py-1 rounded-full border border-amber-500 shadow-xs z-10">
              {product.badge}
            </div>
          )}

          {/* Age Band Badge */}
          <div className="absolute bottom-2.5 left-2.5 bg-emerald-500 text-white font-cartoon font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs z-10">
            {product.ageBand}
          </div>

          {/* Page Count */}
          <div className="absolute bottom-2.5 right-2.5 bg-white/95 text-[#2B2A29] font-cartoon font-bold text-[10px] px-2 py-0.5 rounded-full border border-amber-200 shadow-xs flex items-center gap-1 z-10">
            <FileText className="w-3 h-3 text-amber-600" />
            <span>{product.pageCount} pgs</span>
          </div>

          {/* Wishlist Heart Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-rose-500 flex items-center justify-center border border-rose-200 shadow-xs transition-colors z-10"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
          </motion.button>
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-cartoon text-[#78716C]">
            <span className="text-amber-800 font-extrabold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => onOpenQuickView(product)}
            className="font-cartoon font-black text-base text-[#2B2A29] hover:text-amber-800 transition-colors line-clamp-1 cursor-pointer pt-0.5 flex items-center gap-1.5"
          >
            <span>{product.title}</span>
          </h3>

          <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>
      </div>

      {/* Footer Price & Buttons: Clear Rs / Dollar formatting */}
      <div className="pt-4 mt-3 border-t-2 border-amber-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-cartoon font-bold text-[#78716C] block leading-none">Instant PDF Price:</span>
          <div className="flex items-baseline gap-1.5 font-cartoon mt-0.5">
            <span className="font-black text-base sm:text-lg text-[#2B2A29]">
              Rs. {product.priceNpr}
            </span>
            <span className="text-xs font-bold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded-md border border-amber-200">
              ${product.priceUsd.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenQuickView(product)}
            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-cartoon font-bold transition-colors cursor-pointer"
            title="Preview worksheets"
          >
            <Eye className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => onAddToCart(product)}
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-cartoon font-black text-xs border border-amber-500 shadow-[0_2px_0_0_#D97706] flex items-center gap-1.5 transition-transform cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
