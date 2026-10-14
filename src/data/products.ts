import { Product } from '../types/store';

import animalsDoodleImg from '../assets/images/cartoon_animals_doodle_1791958252947.jpg';
import rainbowSunImg from '../assets/images/cartoon_rainbow_sun_1791958288988.jpg';
import coloringAnimalsImg from '../assets/images/coloring_animals_pack_1791964705901.jpg';
import printableBundleImg from '../assets/images/printable_bundle_preview_1791956962182.jpg';
import routineCardsImg from '../assets/images/routine_flashcards_pack_1791964747473.jpg';

export const productsData: Product[] = [
  {
    id: 'prod-reading-abc-safari',
    title: 'Reading ABC: Big Animals & Letters',
    subtitle: 'Learn A to Z with cute smiling animals and big dotted trace lines',
    description: 'The easiest way for toddlers to start reading ABC! Big friendly letters from A to Z, each paired with a happy safari animal to trace and color with crayons.',
    priceNpr: 350,
    priceUsd: 3.50,
    category: 'Reading ABC',
    ageBand: '2–3 yrs',
    pageCount: 32,
    format: 'PDF (Print-Ready)',
    dimensions: 'A4 & US Letter',
    rating: 4.9,
    reviewCount: 48,
    badge: 'Popular ABC ⭐',
    isPopular: true,
    achievement: {
      id: 'ach-reading-star',
      title: 'Super Star Reader Medal',
      badgeType: 'medal',
      iconEmoji: '🥇',
      sparkleColor: 'from-amber-400 to-yellow-300',
      tagline: 'Mastered all 26 ABC Animal Sounds!',
      points: 50,
    },
    image: animalsDoodleImg,
    samplePages: [
      animalsDoodleImg,
      printableBundleImg,
      rainbowSunImg
    ],
    features: [
      '32 printable ABC activity sheets',
      'Big chunky dotted letters for first pencils',
      'Friendly smiling animal on every letter page',
      'Free printable completion award certificate'
    ],
    skillsLearned: [
      'Reading ABC letters (A to Z)',
      'Hand grip & pencil control',
      'Animal names & sounds',
      'Fun coloring practice'
    ]
  },
  {
    id: 'prod-color-book-animals',
    title: 'Color Book: Big Friendly Animals',
    subtitle: '45 jumbo coloring pages with super thick lines for toddlers',
    description: 'A cheerful color book made especially for tiny fingers! Thick bold black outlines prevent crayon slips. Features smiling baby elephants, lions, puppies, and birds.',
    priceNpr: 250,
    priceUsd: 2.50,
    category: 'Color Book',
    ageBand: '2–3 yrs',
    pageCount: 45,
    format: 'PDF (Print-Ready)',
    dimensions: 'A4 & US Letter',
    rating: 5.0,
    reviewCount: 62,
    badge: 'Top Color Book 🎨',
    isPopular: true,
    achievement: {
      id: 'ach-master-colorist',
      title: 'Rainbow Doodler Trophy',
      badgeType: 'trophy',
      iconEmoji: '🏆',
      sparkleColor: 'from-rose-400 to-amber-300',
      tagline: 'Stayed inside the thick lines like a pro artist!',
      points: 60,
    },
    image: coloringAnimalsImg,
    samplePages: [
      coloringAnimalsImg,
      animalsDoodleImg,
      rainbowSunImg
    ],
    features: [
      '45 thick-line color pages',
      'Instant home print-ready PDF file',
      'Print again and again anytime',
      'No frustrating tiny lines'
    ],
    skillsLearned: [
      'Color recognition & imagination',
      'Pencil & crayon grip confidence',
      'Screen-free calm play time',
      'Animal identification'
    ]
  },
  {
    id: 'prod-123-numbers-counting',
    title: '1 2 3 Numbers: Counting Fruits & Dots',
    subtitle: 'Numbers 1 to 20 with finger counting, big dots, and fruits',
    description: 'Learn 1 2 3 numbers the fun way! Toddlers count smiling apples, bananas, and rainbow balloons using big dot markers and finger tracing lines.',
    priceNpr: 300,
    priceUsd: 3.00,
    category: '1 2 3 Numbers',
    ageBand: '3–4 yrs',
    pageCount: 25,
    format: 'PDF (Print-Ready)',
    dimensions: 'A4 & US Letter',
    rating: 4.8,
    reviewCount: 37,
    badge: 'Easy 1 2 3 🔢',
    isPopular: true,
    achievement: {
      id: 'ach-number-wizard',
      title: '1 2 3 Star Counter Star',
      badgeType: 'star',
      iconEmoji: '⭐',
      sparkleColor: 'from-sky-400 to-emerald-300',
      tagline: 'Counted 20 yummy fruits without stopping!',
      points: 45,
    },
    image: rainbowSunImg,
    samplePages: [
      rainbowSunImg,
      printableBundleImg,
      animalsDoodleImg
    ],
    features: [
      '25 fun 1 2 3 number sheets',
      'Dot marker and finger dab circles',
      'Simple counting mazes and fruit games',
      'Clear number tracing guides'
    ],
    skillsLearned: [
      'Counting numbers 1 to 20',
      'One-to-one counting skills',
      'Recognizing number shapes',
      'Early math confidence'
    ]
  },
  {
    id: 'prod-daily-routine-cards',
    title: 'Daily Routine: Morning & Bedtime Cards',
    subtitle: '36 picture cards for brush teeth, get dressed & happy bedtime',
    description: 'Make daily routines happy and simple! Cute visual cards showing brushing teeth, putting on shoes, packing bags, eating breakfast, and listening to bedtime stories.',
    priceNpr: 280,
    priceUsd: 2.80,
    category: 'Daily Routine',
    ageBand: '2–3 yrs',
    pageCount: 18,
    format: 'PDF + PNG',
    dimensions: 'A4 & US Letter',
    rating: 4.9,
    reviewCount: 54,
    badge: 'Parent Favorite 🧸',
    isPopular: true,
    achievement: {
      id: 'ach-routine-hero',
      title: 'Happy Routine Hero Medal',
      badgeType: 'medal',
      iconEmoji: '🎖️',
      sparkleColor: 'from-emerald-400 to-teal-300',
      tagline: 'Brushed teeth & dressed up with a big smile!',
      points: 40,
    },
    image: routineCardsImg,
    samplePages: [
      routineCardsImg,
      rainbowSunImg,
      coloringAnimalsImg
    ],
    features: [
      '36 visual cards with round corners',
      'Morning, day, and night routine checklists',
      'Stick on the fridge with tape or magnets',
      'Helps toddlers build independent habits'
    ],
    skillsLearned: [
      'Daily morning & bedtime routines',
      'Time sequencing & expectations',
      'Less crying during transitions',
      'Pride in completing daily tasks'
    ]
  },
  {
    id: 'prod-reading-abc-words',
    title: 'Reading ABC: First Words & Sounds',
    subtitle: 'Simple 3-letter words (Cat, Sun, Dog) with picture cards',
    description: 'Next step after letters! Read first 3-letter words with big bright cartoon pictures. Toddlers match sounds to pictures and trace basic words easily.',
    priceNpr: 290,
    priceUsd: 2.90,
    category: 'Reading ABC',
    ageBand: '3–4 yrs',
    pageCount: 28,
    format: 'PDF (Print-Ready)',
    dimensions: 'A4 & US Letter',
    rating: 4.9,
    reviewCount: 41,
    badge: 'New ABC 🔤',
    isPopular: false,
    achievement: {
      id: 'ach-word-detective',
      title: 'Word Detective Star',
      badgeType: 'star',
      iconEmoji: '🌟',
      sparkleColor: 'from-blue-400 to-indigo-300',
      tagline: 'Spotted Cat, Dog and Sun words like magic!',
      points: 35,
    },
    image: animalsDoodleImg,
    samplePages: [
      animalsDoodleImg,
      rainbowSunImg,
      printableBundleImg
    ],
    features: [
      '28 simple first-word printable sheets',
      'Rhyming word families (Cat, Hat, Bat)',
      'Large handwriting stroke guidelines',
      'Colorable cartoon illustration on every page'
    ],
    skillsLearned: [
      'First word reading skills',
      'Phonics sound blending',
      'Early vocabulary development',
      'Handwriting practice'
    ]
  },
  {
    id: 'prod-color-book-nature',
    title: 'Color Book: Rainbows, Sun & Nature',
    subtitle: '30 cute sunny skies, flowers, clouds, and friendly bugs',
    description: 'Bright and cheerful! Toddlers color happy smiling suns, gentle clouds, colorful rainbows, butterflies, and giant garden flowers.',
    priceNpr: 220,
    priceUsd: 2.20,
    category: 'Color Book',
    ageBand: '2–3 yrs',
    pageCount: 30,
    format: 'PDF (Print-Ready)',
    dimensions: 'A4 & US Letter',
    rating: 4.8,
    reviewCount: 33,
    badge: 'Sweet & Fun 🌈',
    isPopular: false,
    achievement: {
      id: 'ach-nature-artist',
      title: 'Sunny Sky Artist Medal',
      badgeType: 'medal',
      iconEmoji: '🏅',
      sparkleColor: 'from-yellow-400 to-orange-300',
      tagline: 'Painted rainbow skies and smiling flowers!',
      points: 30,
    },
    image: rainbowSunImg,
    samplePages: [
      rainbowSunImg,
      coloringAnimalsImg,
      printableBundleImg
    ],
    features: [
      '30 cheerful nature color sheets',
      'Extra bold lines for tiny toddler hands',
      'High-quality 300 DPI PDF ready to print',
      'Instant download immediately after payment'
    ],
    skillsLearned: [
      'Nature and weather recognition',
      'Calm creative expression',
      'Hand-eye coordination',
      'Color naming practice'
    ]
  },
  {
    id: 'prod-all-in-one-mega-pack',
    title: 'Mega Pack: All Reading ABC, 1 2 3 & Color Books',
    subtitle: 'Over 160+ printable pages: Everything in LittleDoodles combined!',
    description: 'Get the complete bundle! All our Reading ABC tracing books, Jumbo Color Books, 1 2 3 Number counting sheets, and Daily Routine cards in one big discount pack.',
    priceNpr: 750,
    priceUsd: 7.00,
    category: 'Mega Pack',
    ageBand: 'All Ages',
    pageCount: 160,
    format: 'PDF (Print-Ready)',
    dimensions: 'A4 & US Letter',
    rating: 5.0,
    reviewCount: 119,
    badge: 'Best Value 65% OFF 🎁',
    isPopular: true,
    achievement: {
      id: 'ach-mega-genius',
      title: 'Grand Champion Crown',
      badgeType: 'crown',
      iconEmoji: '👑',
      sparkleColor: 'from-purple-500 to-pink-400',
      tagline: 'Unlocked all workbook worlds in one super chest!',
      points: 100,
    },
    image: printableBundleImg,
    samplePages: [
      printableBundleImg,
      animalsDoodleImg,
      coloringAnimalsImg,
      routineCardsImg
    ],
    features: [
      '160+ printable pages all in one click',
      'Includes Reading ABC, 123 Numbers, Color Books & Routines',
      'Bonus printable Completion Certificates',
      'Unlimited re-printing for family & classrooms'
    ],
    skillsLearned: [
      'Complete early toddler learning set',
      'Reading, writing, numbers, and colors',
      'Daily routine confidence',
      'Endless calm screen-free coloring'
    ]
  },
  {
    id: 'prod-party-birthday-kit',
    title: 'Party Cards: Happy Birthday Animal Set',
    subtitle: 'Printable birthday invites, animal party hats & cupcake signs',
    description: 'Cute birthday party kit! Printable invitation cards, animal cake toppers, birthday banners, and coloring placemats to entertain young party guests.',
    priceNpr: 300,
    priceUsd: 3.00,
    category: 'Party Cards',
    ageBand: 'All Ages',
    pageCount: 16,
    format: 'Editable Canva + PDF',
    dimensions: '5x7 inches',
    rating: 4.9,
    reviewCount: 29,
    badge: 'Party Fun 🎉',
    isPopular: false,
    achievement: {
      id: 'ach-party-champion',
      title: 'Party Host Champion Star',
      badgeType: 'star',
      iconEmoji: '🎉',
      sparkleColor: 'from-pink-400 to-amber-300',
      tagline: 'Hosted the happiest celebration for little buddies!',
      points: 40,
    },
    image: animalsDoodleImg,
    samplePages: [
      animalsDoodleImg,
      rainbowSunImg,
      printableBundleImg
    ],
    features: [
      '16 printable birthday party items',
      'Printable safari animal hats & toppers',
      'Table coloring placemats for kids',
      'Easy printable 5x7 invite cards'
    ],
    skillsLearned: [
      'Celebration & sharing joy',
      'Party game coloring fun',
      'Creative craft cutouts'
    ]
  }
];
