import React from 'react';
import { motion } from 'motion/react';
import { Search, ShoppingBag, Heart, Sparkles, Palette } from 'lucide-react';
import mascotLogoImg from '../assets/images/littledoodles_mascot_logo_1791956943319.jpg';
import { ProductCategory } from '../types/store';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  currency: 'NPR' | 'USD';
  onToggleCurrency: () => void;
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenDoodle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  currency,
  onToggleCurrency,
  cartCount,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
  onOpenDoodle,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b-4 border-amber-300 px-4 sm:px-8 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Brand Logo with Bouncing Mascot */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <motion.div 
            whileHover={{ scale: 1.08, rotate: [0, -6, 6, 0] }}
            className="relative w-12 h-12 rounded-2xl overflow-hidden border-3 border-amber-400 bg-amber-50 shadow-[0_3px_0_0_#F59E0B] p-0.5 cursor-pointer"
          >
            <img 
              src={mascotLogoImg} 
              alt="LittleDoodles Mascot" 
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-[#2B2A29] font-cartoon leading-none">
                LittleDoodles
              </span>
              <span className="hidden sm:inline-block text-[10px] bg-amber-300 text-amber-950 font-black px-2 py-0.5 rounded-full border border-amber-400 shadow-2xs font-cartoon">
                Digital Printables!
              </span>
            </div>
            <p className="text-[11px] text-[#78716C] font-cartoon font-semibold mt-0.5">
              Toddler & Preschool Activity Boutique
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search coloring pages, letters, numbers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-amber-50/70 border-2 border-amber-200 rounded-full text-xs font-cartoon text-[#2B2A29] placeholder:text-stone-400 focus:outline-hidden focus:border-amber-400 focus:bg-white transition-all shadow-inner"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Interactive Doodle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenDoodle}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-2 border-emerald-300 text-xs font-cartoon font-extrabold shadow-xs transition-colors"
          >
            <Palette className="w-3.5 h-3.5 text-emerald-600" />
            <span>Doodle Sandbox</span>
          </motion.button>

          {/* Currency Switcher */}
          <button
            onClick={onToggleCurrency}
            className="px-3 py-1.5 rounded-full bg-white hover:bg-amber-50 border-2 border-amber-200 text-xs font-cartoon font-black text-[#2B2A29] shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Toggle Primary Currency Focus (Rs. / $)"
          >
            <span>{currency === 'NPR' ? '🇳🇵 Rs. Priority' : '🌍 $ Priority'}</span>
            <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-md font-bold">
              Rs / $
            </span>
          </button>

          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onOpenFavorites}
            className="relative w-10 h-10 rounded-2xl bg-white hover:bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-rose-500 shadow-2xs transition-colors"
            title="View Saved Favorites"
          >
            <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-cartoon font-black flex items-center justify-center border-2 border-white shadow-xs">
                {favoritesCount}
              </span>
            )}
          </motion.button>

          {/* Backpack / Shopping Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 border-2 border-amber-500 shadow-[0_3px_0_0_#D97706] font-cartoon font-black text-xs transition-transform"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Backpack</span>
            <span className="w-5 h-5 rounded-full bg-white text-amber-950 text-[11px] font-black flex items-center justify-center border border-amber-300 shadow-2xs">
              {cartCount}
            </span>
          </motion.button>

        </div>

      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden mt-2.5 pt-2 border-t border-amber-200/60">
        <div className="relative">
          <Search className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search coloring, letters, numbers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-amber-50/70 border-2 border-amber-200 rounded-full text-xs font-cartoon text-[#2B2A29] placeholder:text-stone-400 focus:outline-hidden focus:bg-white"
          />
        </div>
      </div>
    </header>
  );
};
