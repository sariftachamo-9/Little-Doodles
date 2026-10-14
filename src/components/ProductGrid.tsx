import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RotateCcw, Trophy, Star, Volume2, VolumeX, Medal } from 'lucide-react';
import { Product, ProductCategory, AgeBand } from '../types/store';
import { ProductCard } from './ProductCard';
import { TrophyRoomModal } from './TrophyRoomModal';
import { soundManager } from '../utils/soundEffects';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedAge: AgeBand;
  onSelectAge: (age: AgeBand) => void;
  sortBy: 'popular' | 'price_asc' | 'price_desc' | 'rating';
  onSortChange: (sort: 'popular' | 'price_asc' | 'price_desc' | 'rating') => void;
  currency: 'NPR' | 'USD';
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  selectedAge,
  onSelectAge,
  sortBy,
  onSortChange,
  currency,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onOpenQuickView,
  onResetFilters,
}) => {
  // State for unlocked achievements (stored in localStorage)
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('littledoodles_cute_achievements');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Give young kids a welcome first discovery badge:
    return ['ach-reading-star'];
  });

  const [isTrophyRoomOpen, setIsTrophyRoomOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundManager.soundEnabled);
  const [newlyUnlockedName, setNewlyUnlockedName] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('littledoodles_cute_achievements', JSON.stringify(unlockedAchievements));
    } catch {
      // ignore storage error
    }
  }, [unlockedAchievements]);

  const handleUnlockAchievement = (id: string) => {
    if (!unlockedAchievements.includes(id)) {
      setUnlockedAchievements(prev => [...prev, id]);
      const matched = products.find(p => p.achievement?.id === id);
      if (matched?.achievement) {
        setNewlyUnlockedName(matched.achievement.title);
        setTimeout(() => setNewlyUnlockedName(null), 3000);
      }
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    soundManager.soundEnabled = next;
    setSoundEnabled(next);
    if (next) soundManager.playPopSound();
  };

  const categories: { name: ProductCategory; emoji: string; subtitle: string }[] = [
    { name: 'All Printables', emoji: '🌟', subtitle: 'All Books' },
    { name: 'Reading ABC', emoji: '🔤', subtitle: 'Letters & Words' },
    { name: 'Color Book', emoji: '🎨', subtitle: 'Big Coloring' },
    { name: '1 2 3 Numbers', emoji: '🔢', subtitle: 'Counting & Dots' },
    { name: 'Daily Routine', emoji: '🧸', subtitle: 'Morning & Bedtime' },
    { name: 'Party Cards', emoji: '💌', subtitle: 'Birthday Kits' },
    { name: 'Mega Pack', emoji: '🎁', subtitle: 'All-in-One' },
  ];

  const ageBands: AgeBand[] = ['All Ages', '2–3 yrs', '3–4 yrs', '4–5 yrs'];

  const totalAchievements = products.filter(p => !!p.achievement).length || 8;

  return (
    <div className="space-y-6">

      {/* Cute Achievement Game Banner for Kids & Toddlers */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-amber-100 via-yellow-100 to-orange-100 rounded-3xl border-3 border-amber-300 p-4 sm:p-5 shadow-[0_4px_0_0_#FCD34D] flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3.5">
          <motion.div
            animate={{ rotate: [0, -10, 10, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-amber-500 shadow-xs flex items-center justify-center text-2xl shrink-0"
          >
            ⭐
          </motion.div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-cartoon font-black text-xs text-amber-900 uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded-md border border-amber-300">
                Kids Fun Quest 🎮
              </span>
              <span className="font-cartoon font-bold text-xs text-amber-800">
                Hover over popular books to unlock animated stars & medals!
              </span>
            </div>
            <h3 className="font-cartoon font-black text-base sm:text-lg text-[#2B2A29] mt-0.5 flex items-center gap-2">
              <span>Cute Achievement Explorer</span>
              {newlyUnlockedName && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold shadow-xs animate-bounce"
                >
                  🎉 Unlocked: {newlyUnlockedName}!
                </motion.span>
              )}
            </h3>
          </div>
        </div>

        {/* Quest Controls & Progress */}
        <div className="flex items-center gap-2.5 self-start md:self-center shrink-0 flex-wrap">
          {/* Sound Mute/Unmute */}
          <button
            onClick={toggleSound}
            className="px-2.5 py-2 rounded-2xl bg-white hover:bg-amber-50 text-[#2B2A29] font-cartoon font-bold text-xs border border-amber-300 shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title={soundEnabled ? 'Chime sound on' : 'Chime sound muted'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px]">Chimes On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-[11px]">Muted</span>
              </>
            )}
          </button>

          {/* Trophy Room Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTrophyRoomOpen(true)}
            className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-cartoon font-black text-xs border-2 border-amber-500 shadow-[0_3px_0_0_#D97706] flex items-center gap-2 transition-transform cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-900" />
            <span>Trophy Room</span>
            <span className="bg-amber-900 text-amber-100 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {unlockedAchievements.length}/{totalAchievements}
            </span>
          </motion.button>
        </div>
      </motion.div>
      
      {/* Category Navigation with Basic Forms: Reading ABC, Color Book, 1 2 3 Numbers */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat.name;
          return (
            <motion.button
              key={cat.name}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-cartoon font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-400 text-amber-950 border-2 border-amber-500 shadow-[0_3px_0_0_#D97706] scale-102'
                  : 'bg-white text-[#57534E] border-2 border-amber-200/80 hover:bg-amber-50 shadow-2xs'
              }`}
            >
              <span className="text-lg">{cat.emoji}</span>
              <div className="text-left">
                <span className="block leading-tight font-black">{cat.name}</span>
                <span className={`text-[10px] font-semibold block leading-none ${isSelected ? 'text-amber-900' : 'text-[#78716C]'}`}>
                  {cat.subtitle}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Sub-Filters: Age Bands & Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl border-2 border-amber-200 p-3.5 shadow-2xs">
        
        {/* Age Band Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-xs font-cartoon font-bold text-[#78716C] mr-1 shrink-0">Age Group:</span>
          {ageBands.map(age => {
            const isSelected = selectedAge === age;
            return (
              <button
                key={age}
                onClick={() => onSelectAge(age)}
                className={`px-3 py-1 rounded-xl text-xs font-cartoon font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-stone-100 text-[#57534E] hover:bg-stone-200'
                }`}
              >
                {age}
              </button>
            );
          })}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 text-xs font-cartoon font-bold text-[#78716C] self-end sm:self-center">
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="px-3 py-1.5 bg-amber-50 border border-amber-300 rounded-xl text-[#2B2A29] font-cartoon font-bold text-xs focus:outline-hidden cursor-pointer"
          >
            <option value="popular">⭐ Most Popular</option>
            <option value="rating">🏆 Highest Rated</option>
            <option value="price_asc">💰 Price: Low to High (Rs / $)</option>
            <option value="price_desc">💎 Price: High to Low (Rs / $)</option>
          </select>
        </div>

      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-[32px] border-4 border-dashed border-amber-300 p-10 text-center space-y-4 shadow-sm">
          <div className="text-5xl animate-bounce">🎨</div>
          <h3 className="text-xl font-cartoon font-black text-[#2B2A29]">
            Oops! No printable activity books found here!
          </h3>
          <p className="text-xs sm:text-sm text-[#78716C] font-medium max-w-md mx-auto">
            Try picking Reading ABC, Color Book, or 1 2 3 Numbers to see all fun printable packs.
          </p>
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-cartoon font-black text-xs rounded-2xl shadow-[0_3px_0_0_#D97706] inline-flex items-center gap-2 transition-transform active:translate-y-0.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Show All Printables</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onOpenQuickView={onOpenQuickView}
              onUnlockAchievement={handleUnlockAchievement}
            />
          ))}
        </div>
      )}

      {/* Trophy Room Modal */}
      <TrophyRoomModal
        isOpen={isTrophyRoomOpen}
        onClose={() => setIsTrophyRoomOpen(false)}
        products={products}
        unlockedIds={unlockedAchievements}
      />

    </div>
  );
};
