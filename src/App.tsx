import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { productsData } from './data/products';
import { Product, ProductCategory, AgeBand, CartItem } from './types/store';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { ColoringPlayground } from './components/ColoringPlayground';
import { Footer } from './components/Footer';

export default function App() {
  const [products] = useState<Product[]>(productsData);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All Printables');
  const [selectedAge, setSelectedAge] = useState<AgeBand>('All Ages');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'rating'>('popular');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currency, setCurrency] = useState<'NPR' | 'USD'>('NPR');

  const [cart, setCart] = useState<CartItem[]>([
    { product: productsData[0], quantity: 1 } // default 1 cute item in backpack for fun exploring!
  ]);
  const [favorites, setFavorites] = useState<string[]>([productsData[1].id]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);
  const [showDoodleSandbox, setShowDoodleSandbox] = useState<boolean>(false);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const handleToggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (selectedCategory !== 'All Printables' && p.category !== selectedCategory) return false;
        if (selectedAge !== 'All Ages' && p.ageBand !== selectedAge) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') {
          return currency === 'NPR' ? a.priceNpr - b.priceNpr : a.priceUsd - b.priceUsd;
        }
        if (sortBy === 'price_desc') {
          return currency === 'NPR' ? b.priceNpr - a.priceNpr : b.priceUsd - a.priceUsd;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        return b.reviewCount - a.reviewCount; // popular
      });
  }, [products, selectedCategory, selectedAge, searchQuery, sortBy, currency]);

  const handleResetFilters = () => {
    setSelectedCategory('All Printables');
    setSelectedAge('All Ages');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2B2A29] flex flex-col font-sans selection:bg-amber-200">
      
      {/* Cartoon Top Bar */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        currency={currency}
        onToggleCurrency={() => setCurrency(prev => prev === 'NPR' ? 'USD' : 'NPR')}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        favoritesCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => {
          // Filter to show favorites
          setSelectedCategory('All Printables');
        }}
        onOpenDoodle={() => {
          setShowDoodleSandbox(true);
          const el = document.getElementById('doodle-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-10">
        
        {/* Cartoon Hero Banner */}
        <HeroBanner
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const gridEl = document.getElementById('catalog-section');
            if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenDoodleSandbox={() => {
            setShowDoodleSandbox(true);
            const el = document.getElementById('doodle-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Interactive Coloring & Doodle Sandbox */}
        <section id="doodle-section" className="scroll-mt-24">
          <ColoringPlayground />
        </section>

        {/* Printable Activity Catalog Section */}
        <section id="catalog-section" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-amber-200 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-cartoon font-extrabold text-amber-800 uppercase tracking-wider">
                <span>⭐</span>
                <span>Printable Activity Store · Prices in Rs & Dollar ($)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-cartoon font-black text-[#2B2A29] mt-0.5">
                Explore All Printable Workbooks & Games
              </h2>
              <p className="text-xs sm:text-sm font-cartoon font-medium text-[#78716C] mt-1">
                Choose basic activities: <span className="text-amber-800 font-extrabold">Reading ABC</span>, <span className="text-rose-700 font-extrabold">Color Book</span>, <span className="text-emerald-800 font-extrabold">1 2 3 Numbers</span>, and <span className="text-purple-800 font-extrabold">Daily Routine</span> cards with instant home printing!
              </p>
            </div>
            <div className="text-xs font-cartoon font-bold text-[#78716C] shrink-0 bg-white px-3 py-1.5 rounded-xl border border-amber-200">
              Showing {filteredProducts.length} cute activities
            </div>
          </div>

          <ProductGrid
            products={filteredProducts}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedAge={selectedAge}
            onSelectAge={setSelectedAge}
            sortBy={sortBy}
            onSortChange={setSortBy}
            currency={currency}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            onOpenQuickView={setActiveQuickViewProduct}
            onResetFilters={handleResetFilters}
          />
        </section>

      </main>

      {/* Cheerful Cartoon Footer */}
      <Footer />

      {/* Product Quick View Explorer Modal */}
      <ProductModal
        product={activeQuickViewProduct}
        currency={currency}
        isFavorite={activeQuickViewProduct ? favorites.includes(activeQuickViewProduct.id) : false}
        onClose={() => setActiveQuickViewProduct(null)}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Backpack Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
