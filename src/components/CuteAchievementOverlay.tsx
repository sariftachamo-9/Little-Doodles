import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Award, Star, Crown } from 'lucide-react';
import { CuteAchievement } from '../types/store';

interface CuteAchievementOverlayProps {
  achievement: CuteAchievement;
  isHovered: boolean;
  isPopular?: boolean;
}

export const CuteAchievementOverlay: React.FC<CuteAchievementOverlayProps> = ({
  achievement,
  isHovered,
  isPopular = true,
}) => {
  // Staggered floating stars & sparkles for the animated burst
  const floatingSparks = [
    { id: 1, char: '⭐', x: -28, y: -45, delay: 0, rotate: 18, scale: 1.2 },
    { id: 2, char: '✨', x: 26, y: -50, delay: 0.08, rotate: -20, scale: 1.1 },
    { id: 3, char: achievement.iconEmoji, x: -35, y: -20, delay: 0.12, rotate: -12, scale: 1.3 },
    { id: 4, char: '🌟', x: 38, y: -22, delay: 0.05, rotate: 25, scale: 1.15 },
    { id: 5, char: '💫', x: 0, y: -58, delay: 0.15, rotate: 0, scale: 1.25 },
  ];

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'trophy':
        return <Trophy className="w-3.5 h-3.5 text-amber-900" />;
      case 'crown':
        return <Crown className="w-3.5 h-3.5 text-amber-900" />;
      case 'medal':
        return <Award className="w-3.5 h-3.5 text-amber-900" />;
      default:
        return <Star className="w-3.5 h-3.5 fill-amber-900 text-amber-900" />;
    }
  };

  return (
    <>
      {/* Permanent Little Achievement Badge on the Card so kids know it's a popular achievement book */}
      <div className="absolute top-2.5 right-12 z-10 flex items-center gap-1 bg-amber-300/95 hover:bg-amber-300 text-amber-950 font-cartoon font-black text-[10px] px-2 py-0.5 rounded-full border border-amber-400 shadow-xs pointer-events-none transition-transform group-hover:scale-105">
        <span className="text-xs animate-bounce">{achievement.iconEmoji}</span>
        <span className="hidden sm:inline">Badge</span>
      </div>

      {/* Floating Animated Stars & Medals on Hover */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-2.5 overflow-visible">
            
            {/* Ambient Rainbow Glow Border */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute -inset-1 rounded-3xl bg-linear-to-r from-amber-400/40 via-rose-400/40 to-yellow-300/40 -z-10 blur-xs"
            />

            {/* Top Star Burst Container */}
            <div className="relative w-full">
              {floatingSparks.map((spark) => (
                <motion.div
                  key={spark.id}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0.9],
                    scale: [0.2, spark.scale, spark.scale * 1.1, spark.scale],
                    x: [0, spark.x * 0.5, spark.x],
                    y: [10, spark.y * 0.6, spark.y],
                    rotate: [0, spark.rotate, spark.rotate * 1.5],
                  }}
                  exit={{ opacity: 0, scale: 0.3, y: spark.y - 15, transition: { duration: 0.2 } }}
                  transition={{
                    duration: 0.8,
                    delay: spark.delay,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeOut',
                  }}
                  className="absolute left-1/2 -top-2 text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] select-none pointer-events-none"
                >
                  {spark.char}
                </motion.div>
              ))}

              {/* Achievement Unlocked Ribbon Banner */}
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.9 }}
                transition={{ type: 'spring', damping: 15, stiffness: 280 }}
                className="w-full bg-linear-to-r from-amber-400 via-yellow-300 to-amber-400 border-2 border-amber-500 rounded-2xl p-2 shadow-[0_6px_16px_rgba(217,119,6,0.35)] flex items-center justify-between gap-2 select-none"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                    className="w-8 h-8 rounded-xl bg-white shadow-xs border border-amber-400 flex items-center justify-center text-lg shrink-0"
                  >
                    {achievement.iconEmoji}
                  </motion.div>
                  <div className="text-left leading-tight">
                    <div className="flex items-center gap-1">
                      <span className="font-cartoon font-black text-[9px] uppercase tracking-wider text-amber-900 flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5 text-amber-700" />
                        Cute Achievement
                      </span>
                    </div>
                    <div className="font-cartoon font-black text-xs text-[#2B2A29] line-clamp-1">
                      {achievement.title}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 bg-white/95 px-2 py-1 rounded-xl border border-amber-300 text-center shadow-2xs">
                  <span className="font-cartoon font-black text-[11px] text-amber-800 block leading-none">
                    +{achievement.points}
                  </span>
                  <span className="font-cartoon font-bold text-[8px] text-[#78716C] block leading-none mt-0.5">
                    KID XP
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Playful Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="bg-amber-950/90 text-amber-100 backdrop-blur-xs font-cartoon text-[10px] font-bold px-2.5 py-1.5 rounded-xl border border-amber-400/50 shadow-md text-center line-clamp-1"
            >
              🎮 {achievement.tagline}
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
};
