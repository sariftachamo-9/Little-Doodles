import React from 'react';

interface MascotProps {
  size?: number;
  className?: string;
  pose?: 'happy' | 'cheering' | 'waving' | 'holding-star';
}

// 1. Barnaby Bear - Super Cuddly Plush Teddy Bear
export const BarnabyTeddySVG: React.FC<MascotProps> = ({ size = 80, className = '', pose = 'happy' }) => (
  <svg
    width={size}
    height={size * 1.05}
    viewBox="0 0 100 105"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none filter drop-shadow-sm ${className}`}
  >
    {/* Soft Shadow */}
    <ellipse cx="50" cy="100" rx="26" ry="4" fill="#000000" opacity="0.08" />

    {/* Round Plush Ears */}
    <circle cx="26" cy="26" r="14" fill="#FBBF24" stroke="#78350F" strokeWidth="2.8" />
    <circle cx="26" cy="26" r="8" fill="#FECDD3" />
    <circle cx="74" cy="26" r="14" fill="#FBBF24" stroke="#78350F" strokeWidth="2.8" />
    <circle cx="74" cy="26" r="8" fill="#FECDD3" />

    {/* Chubby Body */}
    <ellipse cx="50" cy="70" rx="26" ry="24" fill="#FBBF24" stroke="#78350F" strokeWidth="2.8" />
    <ellipse cx="50" cy="71" rx="16" ry="15" fill="#FEF3C7" />

    {/* Chubby Feet */}
    <ellipse cx="32" cy="92" rx="10" ry="7" fill="#FBBF24" stroke="#78350F" strokeWidth="2.8" />
    <ellipse cx="32" cy="92" rx="5" ry="3.5" fill="#FEF3C7" />
    <ellipse cx="68" cy="92" rx="10" ry="7" fill="#FBBF24" stroke="#78350F" strokeWidth="2.8" />
    <ellipse cx="68" cy="92" rx="5" ry="3.5" fill="#FEF3C7" />

    {/* Chubby Round Head */}
    <circle cx="50" cy="44" r="26" fill="#FBBF24" stroke="#78350F" strokeWidth="2.8" />
    <ellipse cx="44" cy="27" rx="8" ry="4" fill="#FDE68A" opacity="0.6" />

    {/* Snout Area */}
    <ellipse cx="50" cy="50" rx="12" ry="8.5" fill="#FFFBEB" stroke="#78350F" strokeWidth="2.2" />
    <ellipse cx="50" cy="46.5" rx="3.5" ry="2.6" fill="#78350F" />
    <circle cx="49" cy="45.5" r="0.9" fill="#FFFFFF" />

    {/* Sweet Smile */}
    <path
      d="M50 49V51.5M46 52.5C48 54.5 50 54.5 50 51.5M50 51.5C50 54.5 52 54.5 54 52.5"
      stroke="#78350F"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Big Kawaii Sparkling Eyes */}
    <ellipse cx="40" cy="38" rx="3.4" ry="4.2" fill="#451A03" />
    <circle cx="39" cy="36.5" r="1.4" fill="#FFFFFF" />
    <circle cx="41.2" cy="39.5" r="0.8" fill="#FFFFFF" />
    <ellipse cx="60" cy="38" rx="3.4" ry="4.2" fill="#451A03" />
    <circle cx="59" cy="36.5" r="1.4" fill="#FFFFFF" />
    <circle cx="61.2" cy="39.5" r="0.8" fill="#FFFFFF" />

    {/* Rosy Watercolor Cheeks */}
    <ellipse cx="32" cy="46" rx="5.5" ry="3.8" fill="#F472B6" opacity="0.65" />
    <ellipse cx="68" cy="46" rx="5.5" ry="3.8" fill="#F472B6" opacity="0.65" />

    {/* Paws based on pose */}
    {pose === 'holding-star' ? (
      <g>
        {/* Glowing Star in hands */}
        <path
          d="M50 54L52.5 61.5L60.5 61.5L54 66.5L56.5 74.5L50 69.5L43.5 74.5L46 66.5L39.5 61.5L47.5 61.5Z"
          fill="#FDE047"
          stroke="#D97706"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="64" r="1.8" fill="#FEF08A" />
        <circle cx="41" cy="68" r="5" fill="#FBBF24" stroke="#78350F" strokeWidth="2.5" />
        <circle cx="59" cy="68" r="5" fill="#FBBF24" stroke="#78350F" strokeWidth="2.5" />
      </g>
    ) : pose === 'waving' ? (
      <g>
        <ellipse cx="26" cy="67" rx="6" ry="10" transform="rotate(25 26 67)" fill="#FBBF24" stroke="#78350F" strokeWidth="2.8" />
        <path
          d="M68 64C74 54 82 42 86 36C89 40 86 48 78 62"
          fill="#FBBF24"
          stroke="#78350F"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <circle cx="86" cy="36" r="4.5" fill="#FBBF24" stroke="#78350F" strokeWidth="2" />
      </g>
    ) : (
      // Heart Hugging Paws
      <g>
        <path
          d="M50 75C50 75 38 66 38 58C38 54 41.5 51 45.5 51C48 51 49.5 52 50 53.5C50.5 52 52 51 54.5 51C58.5 51 62 54 62 58C62 66 50 75 50 75Z"
          fill="#FDA4AF"
          stroke="#E11D48"
          strokeWidth="2"
        />
        <circle cx="41" cy="64" r="4.5" fill="#FBBF24" stroke="#78350F" strokeWidth="2.4" />
        <circle cx="59" cy="64" r="4.5" fill="#FBBF24" stroke="#78350F" strokeWidth="2.4" />
      </g>
    )}
  </svg>
);

// 2. Bella Bunny - Super Fluffy Sweet Pastel Bunny
export const BellaBunnySVG: React.FC<MascotProps> = ({ size = 80, className = '', pose = 'happy' }) => (
  <svg
    width={size}
    height={size * 1.12}
    viewBox="0 0 100 112"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none filter drop-shadow-sm ${className}`}
  >
    {/* Soft Shadow */}
    <ellipse cx="50" cy="107" rx="24" ry="4" fill="#000000" opacity="0.08" />

    {/* Fluffy Round Tail */}
    <circle cx="74" cy="84" r="9" fill="#FFFFFF" stroke="#78350F" strokeWidth="2.5" />

    {/* Long Droop Ears */}
    <g>
      <path
        d="M36 38C30 18 20 0 32 0C44 -1 46 20 44 38"
        fill="#FFFDF9"
        stroke="#78350F"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <path d="M35 30C31 16 26 5 33 5C39 5 41 17 40 30" fill="#FECDD3" />
    </g>
    <g>
      <path
        d="M58 38C58 20 60 -1 72 0C84 0 74 18 68 38"
        fill="#FFFDF9"
        stroke="#78350F"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <path d="M63 30C62 17 64 5 70 5C77 5 72 16 68 30" fill="#FECDD3" />
    </g>

    {/* Chubby Body */}
    <ellipse cx="50" cy="77" rx="24" ry="22" fill="#FFFDF9" stroke="#78350F" strokeWidth="2.8" />
    <ellipse cx="50" cy="79" rx="15" ry="14" fill="#FEF3C7" />

    {/* Paws */}
    <ellipse cx="32" cy="97" rx="9" ry="6.5" fill="#FFFDF9" stroke="#78350F" strokeWidth="2.5" />
    <ellipse cx="32" cy="97" rx="4.5" ry="3" fill="#FECDD3" />
    <ellipse cx="68" cy="97" rx="9" ry="6.5" fill="#FFFDF9" stroke="#78350F" strokeWidth="2.5" />
    <ellipse cx="68" cy="97" rx="4.5" ry="3" fill="#FECDD3" />

    {/* Chubby Head */}
    <ellipse cx="50" cy="50" rx="25" ry="22" fill="#FFFDF9" stroke="#78350F" strokeWidth="2.8" />

    {/* Big Kawaii Sparkling Eyes */}
    <ellipse cx="40" cy="45" rx="3.4" ry="4.4" fill="#451A03" />
    <circle cx="39" cy="43.5" r="1.4" fill="#FFFFFF" />
    <circle cx="41.2" cy="46.5" r="0.8" fill="#FFFFFF" />
    <ellipse cx="60" cy="45" rx="3.4" ry="4.4" fill="#451A03" />
    <circle cx="59" cy="43.5" r="1.4" fill="#FFFFFF" />
    <circle cx="61.2" cy="46.5" r="0.8" fill="#FFFFFF" />

    {/* Tiny Nose & Smile */}
    <ellipse cx="50" cy="52" rx="2.5" ry="1.8" fill="#FB7185" />
    <path
      d="M50 54V55.5M46.5 56.5C48.5 58 50 58 50 55.5M50 55.5C50 58 51.5 58 53.5 56.5"
      stroke="#78350F"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Soft Whiskers */}
    <path d="M34 52L24 50M34 55L23 55M34 58L25 60" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    <path d="M66 52L76 50M66 55L77 55M66 58L75 60" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />

    {/* Rosy Cheeks */}
    <ellipse cx="32" cy="52" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.65" />
    <ellipse cx="68" cy="52" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.65" />

    {/* Carrot Accessory */}
    <g>
      <path
        d="M50 63L57 82C57 84.5 53.5 85.5 52 84.5L44 67Z"
        fill="#FB923C"
        stroke="#C2410C"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M47 71H50" stroke="#EA580C" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M49 76H52" stroke="#EA580C" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M46 63C42 58 41 54 44 53C47 55 47 59 48 63" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
      <path d="M48 63C49 57 51 51 54 51C56 54 54 58 52 63" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />
      <circle cx="42" cy="70" r="4.5" fill="#FFFDF9" stroke="#78350F" strokeWidth="2" />
      <circle cx="56" cy="72" r="4.5" fill="#FFFDF9" stroke="#78350F" strokeWidth="2" />
    </g>
  </svg>
);

// 3. Sunny Duckling - Baby Duckling with paintbrush or flower
export const SunnyDucklingSVG: React.FC<MascotProps> = ({ size = 70, className = '' }) => (
  <svg
    width={size}
    height={size * 0.95}
    viewBox="0 0 80 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none filter drop-shadow-sm ${className}`}
  >
    <ellipse cx="40" cy="72" rx="22" ry="3.5" fill="#000000" opacity="0.08" />
    <ellipse cx="36" cy="48" rx="22" ry="16" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" />
    <circle cx="52" cy="30" r="15" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" />
    <circle cx="48" cy="34" r="3" fill="#FDA4AF" opacity="0.8" />
    <circle cx="56" cy="27" r="2.8" fill="#1E293B" />
    <circle cx="57.5" cy="25.5" r="1" fill="#FFFFFF" />
    <path d="M64 29L73 33L64 36Z" fill="#FB923C" stroke="#EA580C" strokeWidth="1.8" strokeLinejoin="round" />
    <ellipse cx="34" cy="48" rx="10" ry="7" transform="rotate(-15 34 48)" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
  </svg>
);
