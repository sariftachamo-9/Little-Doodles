import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Star, Sparkles, Award, Volume2, VolumeX, CheckCircle, Lock } from 'lucide-react';
import { Product, CuteAchievement } from '../types/store';
import { soundManager } from '../utils/soundEffects';

interface TrophyRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  unlockedIds: string[];
  onTriggerSparkles?: () => void;
}

export const TrophyRoomModal: React.FC<TrophyRoomModalProps> = ({
  isOpen,
  onClose,
  products,
  unlockedIds,
}) => {
  const [soundOn, setSoundOn] = useState(soundManager.soundEnabled);
  const [celebrationActive, setCelebrationActive] = useState(false);

  // Collect all achievements from products
  const achievements: { product: Product; achievement: CuteAchievement }[] = [];
  products.forEach(p => {
    if (p.achievement) {
      achievements.push({ product: p, achievement: p.achievement });
    }
  });

  const totalPoints = achievements
    .filter(a => unlockedIds.includes(a.achievement.id))
    .reduce((sum, a) => sum + a.achievement.points, 0);

  const maxPoints = achievements.reduce((sum, a) => sum + a.achievement.points, 0);
  const progressPercent = Math.round((unlockedIds.length / (achievements.length || 1)) * 100);

  const toggleSound = () => {
    const next = !soundOn;
    soundManager.soundEnabled = next;
    setSoundOn(next);
    if (next) soundManager.playPopSound();
  };

  const handleCelebrate = () => {
    soundManager.playAchievementChime();
    setCelebrationActive(true);
    setTimeout(() => setCelebrationActive(false), 2400);
  };

  const getKidRank = (score: number) => {
    if (score >= 300) return { title: 'Grand Doodle Champion 👑', color: 'text-amber-500' };
    if (score >= 180) return { title: 'Star Activity Wizard 🌟', color: 'text-purple-600' };
    if (score >= 90) return { title: 'Super Coloring Scout 🎨', color: 'text-rose-500' };
    return { title: 'Playful Little Explorer 🎒', color: 'text-emerald-600' };
  };

  const rank = getKidRank(totalPoints);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[32px] border-4 border-amber-300 shadow-2xl p-5 sm:p-7 max-h-[90vh] overflow-y-auto scrollbar-none flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-amber-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-amber-500 flex items-center justify-center text-2xl shadow-[0_3px_0_0_#D97706]">
                  🏆
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-cartoon font-black text-[#2B2A29]">
                      Cute Trophy Room
                    </h3>
                    <span className="bg-amber-100 text-amber-900 font-cartoon font-bold text-xs px-2.5 py-0.5 rounded-full border border-amber-300">
                      Kid Gamemode
                    </span>
                  </div>
                  <p className="text-xs font-cartoon font-medium text-[#78716C] mt-0.5">
                    Hover over popular activity books in the store to discover all stars and medals!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleSound}
                  className="p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 text-xs font-cartoon font-bold transition-colors"
                  title={soundOn ? 'Sound On' : 'Sound Muted'}
                >
                  {soundOn ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
                </button>

                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 flex items-center justify-center font-bold border border-amber-300 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Score & Progress Tracker Bar */}
            <div className="my-5 p-4 bg-linear-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-2xl border-2 border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-cartoon font-bold text-[#78716C] uppercase tracking-wider block">
                  Current Kid Rank:
                </span>
                <span className={`text-base font-cartoon font-black ${rank.color}`}>
                  {rank.title}
                </span>
                <div className="text-xs font-cartoon text-[#57534E]">
                  Discovered <strong className="text-amber-900">{unlockedIds.length}</strong> of <strong>{achievements.length}</strong> medals · <strong className="text-amber-800">{totalPoints}</strong> / {maxPoints} XP
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-28 sm:w-36 bg-white rounded-full h-4 border border-amber-300 p-0.5 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-amber-400 to-yellow-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <button
                  onClick={handleCelebrate}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-cartoon font-black text-xs border border-amber-500 shadow-[0_2px_0_0_#D97706] flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cheer!</span>
                </button>
              </div>
            </div>

            {/* Confetti Celebration Rain */}
            {celebrationActive && (
              <div className="pointer-events-none fixed inset-0 flex items-center justify-center z-60">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -50, x: (i - 12) * 20, opacity: 1, scale: 0.8 }}
                    animate={{ y: 250, opacity: 0, rotate: i * 30, scale: 1.4 }}
                    transition={{ duration: 1.8, delay: (i % 6) * 0.08 }}
                    className="text-2xl absolute"
                  >
                    {['⭐', '🌟', '🏅', '🎉', '🏆', '💖', '✨'][i % 7]}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {achievements.map(({ product, achievement }) => {
                const isUnlocked = unlockedIds.includes(achievement.id);

                return (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      if (isUnlocked) {
                        soundManager.playAchievementChime();
                      } else {
                        soundManager.playPopSound();
                      }
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                      isUnlocked
                        ? 'bg-amber-50/70 border-amber-300 shadow-2xs hover:border-amber-400'
                        : 'bg-stone-50 border-stone-200/90 opacity-70 hover:opacity-90'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl shrink-0 shadow-xs ${
                        isUnlocked
                          ? 'bg-linear-to-br from-amber-300 to-yellow-200 border-amber-400 text-amber-950 scale-105 animate-pulse'
                          : 'bg-stone-200 border-stone-300 grayscale'
                      }`}
                    >
                      {isUnlocked ? achievement.iconEmoji : <Lock className="w-5 h-5 text-stone-500" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-cartoon font-black text-xs sm:text-sm text-[#2B2A29] truncate">
                          {achievement.title}
                        </h4>
                        <span className={`text-[10px] font-cartoon font-black px-1.5 py-0.5 rounded-md ${
                          isUnlocked ? 'bg-amber-200 text-amber-900' : 'bg-stone-200 text-stone-600'
                        }`}>
                          +{achievement.points} XP
                        </span>
                      </div>

                      <p className="text-[11px] font-cartoon text-[#57534E] line-clamp-1 mt-0.5">
                        {isUnlocked ? achievement.tagline : `Hover over "${product.category}" in the shop`}
                      </p>

                      <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-cartoon">
                        {isUnlocked ? (
                          <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Unlocked in store!
                          </span>
                        ) : (
                          <span className="text-stone-500 font-bold">
                            🔍 Hidden in: {product.title.split(':')[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Tip for Toddlers */}
            <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-cartoon text-[#78716C]">
              <span>💡 Tip: Move your mouse or tap any activity book in the store to earn medals!</span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black cursor-pointer shadow-xs"
              >
                Let's Play!
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
