import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Printer, ShieldCheck, Mail } from 'lucide-react';
import mascotLogoImg from '../assets/images/littledoodles_mascot_logo_1791956943319.jpg';
import safetyShieldImg from '../assets/images/toddler_safety_shield_1791957629932.jpg';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#FFFDF9] border-t-4 border-amber-300 py-12 px-4 sm:px-8 text-xs text-[#78716C] font-cartoon">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Parent Trust Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-amber-50/80 rounded-2xl border-2 border-amber-200 p-4 flex items-center gap-3">
            <span className="text-3xl">🖨️</span>
            <div>
              <h4 className="font-black text-sm text-[#2B2A29]">Easy Home Printing</h4>
              <p className="text-[11px] text-[#78716C]">Standard A4 & US Letter sizing ready</p>
            </div>
          </div>

          <div className="bg-emerald-50/80 rounded-2xl border-2 border-emerald-200 p-4 flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <div>
              <h4 className="font-black text-sm text-[#2B2A29]">Instant Digital Access</h4>
              <p className="text-[11px] text-[#78716C]">Download immediately, no shipping wait</p>
            </div>
          </div>

          <div className="bg-sky-50/80 rounded-2xl border-2 border-sky-200 p-4 flex items-center gap-3">
            <span className="text-3xl">🧸</span>
            <div>
              <h4 className="font-black text-sm text-[#2B2A29]">100% Kids Safe</h4>
              <p className="text-[11px] text-[#78716C]">Zero child data collection, pure learning</p>
            </div>
          </div>

          <div className="bg-purple-50/80 rounded-2xl border-2 border-purple-200 p-4 flex items-center gap-3">
            <span className="text-3xl">🇳🇵</span>
            <div>
              <h4 className="font-black text-sm text-[#2B2A29]">eSewa & Khalti Ready</h4>
              <p className="text-[11px] text-[#78716C]">Easy local payments (ID: 9840531722)</p>
            </div>
          </div>

        </div>

        {/* Brand & Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t-2 border-amber-200/60">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-amber-400 bg-amber-50 shadow-xs shrink-0">
              <img 
                src={mascotLogoImg} 
                alt="LittleDoodles Toddler Mascot" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="font-black text-lg text-[#2B2A29]">
                LittleDoodles · Digital Children's Store
              </div>
              <p className="text-[11px] text-[#78716C]">
                Handcrafted printable worksheets & coloring activities for little learners
              </p>
            </div>
          </div>

          {/* Friendly Contact */}
          <div className="flex items-center gap-4 text-xs font-bold text-[#57534E]">
            <a 
              href="mailto:support@littledoodles.store" 
              className="flex items-center gap-1.5 hover:text-amber-800 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-600" />
              <span>support@littledoodles.store</span>
            </a>
            <span>·</span>
            <span>Kathmandu, Nepal</span>
          </div>

          <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-emerald-300 bg-emerald-50 shrink-0">
            <img 
              src={safetyShieldImg} 
              alt="Child Safety Shield" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center text-[11px] text-stone-400 pt-4 border-t border-amber-200/40">
          © {new Date().getFullYear()} LittleDoodles. Designed with 💛 for curious toddlers, happy parents, and inspiring teachers.
        </div>

      </div>
    </footer>
  );
};
