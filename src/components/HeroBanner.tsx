import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, CheckCircle2, Palette } from 'lucide-react';
import mascotLogoImg from '../assets/images/littledoodles_mascot_logo_1791956943319.jpg';
import { ProductCategory } from '../types/store';

interface HeroBannerProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenDoodleSandbox: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  onOpenDoodleSandbox,
}) => {
  return (
    <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100/70 border-4 border-amber-300 p-6 sm:p-10 shadow-[0_8px_0_0_#FDE68A]">
      
      {/* Floating Playful Background Bubbles */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute -top-10 -right-10 w-48 h-48 bg-yellow-200/50 rounded-full blur-2xl pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 12, 0], rotate: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute -bottom-10 -left-10 w-48 h-48 bg-orange-200/40 rounded-full blur-2xl pointer-events-none" 
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Cheerful Title & Action Callouts */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-amber-300 text-amber-900 font-cartoon font-extrabold text-xs shadow-xs">
            <span className="text-base animate-bounce">🎈</span>
            <span>LittleDoodles · Rs & Dollar Pricing · Starting at Rs. 220 ($2.20)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-cartoon font-black text-[#2B2A29] leading-tight tracking-tight">
            Printable Fun for <br className="hidden sm:inline" />
            <span className="text-amber-600 inline-block drop-shadow-xs">
              Curious Little Hands!
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#57534E] font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            Learn with easy basic activities: <strong>Reading ABC</strong>, jumbo <strong>Color Books</strong>, 
            <strong>1 2 3 Numbers</strong>, and visual <strong>Daily Routine</strong> cards. 
            Print unlimited times at home with instant PDF downloads!
          </p>

          {/* Quick Category Jump Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5">
            <button
              onClick={() => onSelectCategory('Reading ABC')}
              className="px-3 py-1.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-cartoon font-bold text-xs border border-amber-400 transition-colors cursor-pointer"
            >
              🔤 Reading ABC
            </button>
            <button
              onClick={() => onSelectCategory('Color Book')}
              className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-950 font-cartoon font-bold text-xs border border-rose-300 transition-colors cursor-pointer"
            >
              🎨 Color Book
            </button>
            <button
              onClick={() => onSelectCategory('1 2 3 Numbers')}
              className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-cartoon font-bold text-xs border border-emerald-300 transition-colors cursor-pointer"
            >
              🔢 1 2 3 Numbers
            </button>
            <button
              onClick={() => onSelectCategory('Daily Routine')}
              className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-950 font-cartoon font-bold text-xs border border-purple-300 transition-colors cursor-pointer"
            >
              🧸 Daily Routine
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory('All Printables')}
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-cartoon font-black text-sm border-2 border-amber-500 shadow-[0_4px_0_0_#D97706] flex items-center gap-2 transition-transform cursor-pointer"
            >
              <span>Explore All Printables</span>
              <ArrowDown className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenDoodleSandbox}
              className="px-5 py-3.5 rounded-2xl bg-white hover:bg-amber-50 text-amber-900 font-cartoon font-black text-sm border-2 border-amber-300 shadow-[0_4px_0_0_#FCD34D] flex items-center gap-2 transition-transform cursor-pointer"
            >
              <Palette className="w-4 h-4 text-emerald-600" />
              <span>Coloring Sandbox 🎨</span>
            </motion.button>
          </div>

          {/* Trust Highlights & Domestic Nepal Payment */}
          <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-cartoon font-bold text-[#78716C]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Rs & Dollar Dual Pricing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-purple-600">💜</span>
              <span>Khalti & eSewa: <strong>9840531722</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Instant High-Res PDF</span>
            </div>
          </div>

        </div>

        {/* Right Column: Cartoon Mascot Hero Card */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div 
            whileHover={{ rotate: 1, scale: 1.02 }}
            className="relative w-full max-w-sm bg-white rounded-3xl border-4 border-amber-300 p-4 shadow-[0_8px_0_0_#FBBF24]"
          >
            {/* Top Mascot Badge */}
            <div className="absolute -top-4 -right-3 bg-amber-400 text-amber-950 font-cartoon font-black text-xs px-3 py-1 rounded-full border-2 border-amber-500 shadow-xs rotate-6">
              Rs. 220–750 ($2.20–$7) ⭐
            </div>

            {/* Visual Mascot Art */}
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-amber-50 border-2 border-amber-200">
              <img 
                src={mascotLogoImg} 
                alt="LittleDoodles Mascot with magic crayon" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Quick Caption */}
            <div className="mt-3.5 text-center space-y-1">
              <h3 className="font-cartoon font-black text-base text-[#2B2A29]">
                Meet LittleDoodle the Explorer! 🌟
              </h3>
              <p className="text-xs font-cartoon text-[#78716C]">
                Ready to read ABC, color big books, and count 1 2 3!
              </p>
            </div>
          </motion.div>
        </div>

      </div>

    </div>
  );
};
