import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import mascotLogoImg from '../../assets/images/littledoodles_mascot_logo_1791956943319.jpg';
import { BarnabyTeddySVG, BellaBunnySVG } from './CuteMascots';
import { soundManager } from '../../utils/soundEffects';

type BuddyType = 'doodle' | 'barnaby' | 'bella';

interface BuddyInfo {
  id: BuddyType;
  name: string;
  tagline: string;
  badge: string;
  quote: string;
  favoriteActivity: string;
  accentBg: string;
}

const BUDDIES: BuddyInfo[] = [
  {
    id: 'doodle',
    name: 'LittleDoodle Explorer',
    tagline: 'Magic Crayon Captain 🖍️',
    badge: 'Rs. 220–750 ($2.20–$7) ⭐',
    quote: 'Ready to trace ABCs and color big books? Let’s make art!',
    favoriteActivity: 'Tracing jumbo animal letters',
    accentBg: 'bg-amber-100 border-amber-300',
  },
  {
    id: 'barnaby',
    name: 'Barnaby Bear',
    tagline: 'Warm Hugs & Big Outlines 🧸',
    badge: 'Toddler Favorite 🍯',
    quote: 'Thick black lines keep crayons right inside the pictures!',
    favoriteActivity: 'Coloring smiling safari animals',
    accentBg: 'bg-orange-100 border-orange-300',
  },
  {
    id: 'bella',
    name: 'Bella Bunny',
    tagline: 'Sweet Storybooks & 1 2 3 🐰',
    badge: 'Preschool Star 🥕',
    quote: 'Counting smiling apples and brushing teeth on time!',
    favoriteActivity: 'Morning & bedtime routine cards',
    accentBg: 'bg-rose-100 border-rose-300',
  },
];

export const HeroMascotCard: React.FC = () => {
  const [activeBuddy, setActiveBuddy] = useState<BuddyType>('doodle');
  const [sparkleCount, setSparkleCount] = useState<number>(0);
  const [isCheering, setIsCheering] = useState<boolean>(false);

  const current = BUDDIES.find((b) => b.id === activeBuddy) || BUDDIES[0];

  const handleBuddySelect = (id: BuddyType) => {
    setActiveBuddy(id);
    soundManager.playAchievementChime();
    setIsCheering(true);
    setSparkleCount((c) => c + 1);
    setTimeout(() => setIsCheering(false), 600);
  };

  const handleCheerTap = () => {
    soundManager.playAchievementChime();
    setIsCheering(true);
    setSparkleCount((c) => c + 1);
    setTimeout(() => setIsCheering(false), 600);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', damping: 20, stiffness: 240 }}
      className="relative w-full max-w-sm bg-white rounded-3xl border-4 border-amber-300 p-4 shadow-[0_8px_0_0_#FBBF24] select-none"
    >
      {/* Top Floating Badge */}
      <div className="absolute -top-3.5 -right-2 bg-amber-400 text-amber-950 font-cartoon font-black text-xs px-3 py-1 rounded-full border-2 border-amber-500 shadow-xs rotate-3 flex items-center gap-1 z-20">
        <span>{current.badge}</span>
      </div>

      {/* Buddy Switcher Pills */}
      <div className="flex items-center justify-between gap-1 mb-3 bg-amber-50/80 p-1.5 rounded-2xl border border-amber-200">
        <button
          onClick={() => handleBuddySelect('doodle')}
          className={`flex-1 py-1 px-2 rounded-xl text-xs font-cartoon font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeBuddy === 'doodle'
              ? 'bg-amber-400 text-amber-950 shadow-xs'
              : 'text-[#78716C] hover:text-[#2B2A29]'
          }`}
        >
          <span>⭐</span>
          <span>Doodle</span>
        </button>

        <button
          onClick={() => handleBuddySelect('barnaby')}
          className={`flex-1 py-1 px-2 rounded-xl text-xs font-cartoon font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeBuddy === 'barnaby'
              ? 'bg-amber-400 text-amber-950 shadow-xs'
              : 'text-[#78716C] hover:text-[#2B2A29]'
          }`}
        >
          <span>🧸</span>
          <span>Barnaby</span>
        </button>

        <button
          onClick={() => handleBuddySelect('bella')}
          className={`flex-1 py-1 px-2 rounded-xl text-xs font-cartoon font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeBuddy === 'bella'
              ? 'bg-amber-400 text-amber-950 shadow-xs'
              : 'text-[#78716C] hover:text-[#2B2A29]'
          }`}
        >
          <span>🐰</span>
          <span>Bella</span>
        </button>
      </div>

      {/* Visual Character Stage with Spring Animation */}
      <div
        onClick={handleCheerTap}
        className="relative rounded-2xl overflow-hidden aspect-4/3 bg-gradient-to-b from-amber-50 to-orange-50/60 border-2 border-amber-200 flex items-center justify-center cursor-pointer group"
      >
        <AnimatePresence mode="wait">
          {activeBuddy === 'doodle' ? (
            <motion.div
              key="doodle"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                scale: isCheering ? [1, 1.08, 1] : 1,
                opacity: 1,
                rotate: isCheering ? [0, -3, 3, 0] : 0,
              }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 250 }}
              className="w-full h-full relative"
            >
              <img
                src={mascotLogoImg}
                alt="LittleDoodles Mascot with magic crayon"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ) : activeBuddy === 'barnaby' ? (
            <motion.div
              key="barnaby"
              initial={{ scale: 0.85, opacity: 0, y: 15 }}
              animate={{
                scale: isCheering ? [1, 1.1, 1] : 1,
                opacity: 1,
                y: isCheering ? [0, -10, 0] : 0,
              }}
              exit={{ scale: 0.85, opacity: 0, y: -10 }}
              transition={{ type: 'spring', damping: 14, stiffness: 220 }}
              className="flex items-center justify-center h-full py-2"
            >
              <BarnabyTeddySVG
                size={145}
                pose={isCheering ? 'waving' : 'happy'}
              />
            </motion.div>
          ) : (
            <motion.div
              key="bella"
              initial={{ scale: 0.85, opacity: 0, y: 15 }}
              animate={{
                scale: isCheering ? [1, 1.1, 1] : 1,
                opacity: 1,
                y: isCheering ? [0, -10, 0] : 0,
              }}
              exit={{ scale: 0.85, opacity: 0, y: -10 }}
              transition={{ type: 'spring', damping: 14, stiffness: 220 }}
              className="flex items-center justify-center h-full py-2"
            >
              <BellaBunnySVG
                size={135}
                pose={isCheering ? 'cheering' : 'happy'}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap to Giggle Callout */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-2xs px-2.5 py-0.5 rounded-full border border-amber-300 font-cartoon font-bold text-[10px] text-amber-900 shadow-2xs opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500 animate-spin" />
          <span>Tap to giggle!</span>
        </div>

        {/* Bursting Star Particle on Tap */}
        {sparkleCount > 0 && (
          <motion.div
            key={sparkleCount}
            initial={{ scale: 0, opacity: 1, y: 0 }}
            animate={{ scale: 1.6, opacity: 0, y: -35 }}
            transition={{ duration: 0.55 }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 text-2xl pointer-events-none"
          >
            💖
          </motion.div>
        )}
      </div>

      {/* Cheerful Speech Bubble */}
      <div className="mt-3 text-center space-y-1.5">
        <div className="flex items-center justify-center gap-1.5">
          <h3 className="font-cartoon font-black text-base text-[#2B2A29]">
            {current.name}
          </h3>
          <span className="text-xs">✨</span>
        </div>

        <p className="text-xs font-cartoon text-amber-900 bg-amber-50/80 rounded-xl p-2 border border-amber-200/80 leading-relaxed font-semibold">
          "{current.quote}"
        </p>

        <div className="text-[11px] font-cartoon font-bold text-[#78716C] flex items-center justify-center gap-1">
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>Favorite: {current.favoriteActivity}</span>
        </div>
      </div>
    </motion.div>
  );
};
