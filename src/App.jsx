import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EditorialShowcase from './components/EditorialShowcase';
import CollectionSwitcher from './components/CollectionSwitcher';
import FilterAndSearchBar from './components/FilterAndSearchBar';
import PerfumeCard from './components/PerfumeCard';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import ScentQuizModal from './components/ScentQuizModal';
import ArtisanalStorySection from './components/ArtisanalStorySection';
import DeliveryInfoSection from './components/DeliveryInfoSection';
import FloatingWhatsAppBar from './components/FloatingWhatsAppBar';
import Footer from './components/Footer';
import { PERFUMES_DATA } from './data/perfumes';

const normalizeSearchText = (value = '') => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [scentFamilyFilter, setScentFamilyFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const [selectedPerfumeForModal, setSelectedPerfumeForModal] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const qtyToAdd = product.quantity || 1;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qtyToAdd;
        return updated;
      }
      return [...prev, { ...product, quantity: qtyToAdd }];
    });
  };

  const handleUpdateQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (id, size) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const filteredPerfumes = useMemo(() => {
    return PERFUMES_DATA.filter((p) => {
      if (genderFilter !== 'all') {
        if (genderFilter === 'unisex' && p.gender !== 'unisex') return false;
        if (genderFilter !== 'all' && p.gender !== genderFilter) return false;
      }

      if (scentFamilyFilter !== 'all') {
        const textToSearch = [
          ...p.topNotes,
          ...p.heartNotes,
          ...p.baseNotes,
          p.description,
          p.tagline
        ].join(' ').toLowerCase();

        if (scentFamilyFilter === 'vanilla' && !textToSearch.includes('vanill') && !textToSearch.includes('tonka') && !textToSearch.includes('almond') && !textToSearch.includes('amber')) {
          return false;
        }
        if (scentFamilyFilter === 'oud' && !textToSearch.includes('oud') && !textToSearch.includes('wood') && !textToSearch.includes('sandalwood') && !textToSearch.includes('cedar') && !textToSearch.includes('ebony')) {
          return false;
        }
        if (scentFamilyFilter === 'floral' && !textToSearch.includes('rose') && !textToSearch.includes('jasmine') && !textToSearch.includes('gardenia') && !textToSearch.includes('blossom')) {
          return false;
        }
        if (scentFamilyFilter === 'fresh' && !textToSearch.includes('bergamot') && !textToSearch.includes('citrus') && !textToSearch.includes('coconut') && !textToSearch.includes('sea')) {
          return false;
        }
      }

      if (searchTerm.trim() !== '') {
        const q = normalizeSearchText(searchTerm);
        if (!normalizeSearchText(p.name).includes(q)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [genderFilter, scentFamilyFilter, searchTerm, sortBy]);

  const hasCatalogRefinement = genderFilter !== 'all' || scentFamilyFilter !== 'all' || searchTerm.trim() !== '';
  const visiblePerfumes = hasCatalogRefinement ? filteredPerfumes : filteredPerfumes.slice(0, 8);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <div className="mobile-site min-h-screen bg-white text-[#252D61] flex flex-col font-helvetica selection:bg-[#252D61] selection:text-white antialiased">
      
      {/* Exact Header matching Figma */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => {
          scrollToCatalog();
          const searchInput = document.querySelector('input[type="text"]');
          if (searchInput) searchInput.focus();
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Content strictly constrained to luxury mobile canvas */}
      <main className="flex-1 w-full">
        
        {/* 1. Hero Section matching Figma */}
        <HeroSection
          onShopNow={scrollToCatalog}
          onExploreCollection={scrollToCatalog}
        />

        {/* 2. Editorial Showcase matching Figma */}
        <EditorialShowcase />

        {/* 3. Catalog & Dual Collections Section */}
        <section id="catalog" className="w-full bg-white pt-8 pb-24 border-t border-[#f1efe9]">
          <CollectionSwitcher />

          <FilterAndSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
            scentFamilyFilter={scentFamilyFilter}
            setScentFamilyFilter={setScentFamilyFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            totalResults={filteredPerfumes.length}
            perfumes={PERFUMES_DATA}
            onSelectSuggestion={(perfume) => {
              setSearchTerm(perfume.name);
              requestAnimationFrame(scrollToCatalog);
            }}
          />

          {/* Product Grid */}
          <div className="max-w-[402px] md:max-w-5xl xl:max-w-6xl mx-auto px-5 md:px-8">
            {filteredPerfumes.length === 0 ? (
              <div className="text-center py-12 px-4 bg-[#fcfbf9] rounded-xl border border-[#f1efe9]">
                <p className="font-elgina text-base text-[#252D61] mb-1">
                  No matching fragrances found
                </p>
                <p className="text-[11px] text-[#858585] mb-3">
                  Try adjusting your search terms or reset filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setGenderFilter('all');
                    setScentFamilyFilter('all');
                  }}
                  className="py-2 px-5 rounded-full bg-[#252D61] text-white text-[11px] font-medium"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
                {visiblePerfumes.map((perfume) => (
                  <PerfumeCard
                    key={perfume.id}
                    perfume={perfume}
                    onAddToCart={handleAddToCart}
                    onQuickView={(p) => setSelectedPerfumeForModal(p)}
                  />
                ))}
              </div>
            )}
            {filteredPerfumes.length > 8 && !hasCatalogRefinement && (
              <div className="mt-8 flex justify-center">
                <a
                  href="/collection"
                  className="rounded-full border border-[#252D61] px-6 py-2.5 text-[11px] font-medium text-[#252D61] transition-colors hover:bg-[#252D61] hover:text-white"
                >
                  See All Collection
                </a>
              </div>
            )}
          </div>
        </section>

        {/* 4. Artisanal Story & Atelier */}
        <ArtisanalStorySection />

        {/* 5. Cameroon Delivery Protocol */}
        <DeliveryInfoSection />

      </main>

      {/* Footer */}
      <Footer onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* Floating Bottom WhatsApp & Bag Bar */}
      <FloatingWhatsAppBar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        perfume={selectedPerfumeForModal}
        onClose={() => setSelectedPerfumeForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Scent Matcher Quiz Modal */}
      <ScentQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectPerfume={(perfume) => {
          setSelectedPerfumeForModal(perfume);
        }}
      />

    </div>
    <main className="desktop-notice" aria-labelledby="desktop-notice-title">
      <div className="desktop-notice-inner">
        <div className="desktop-notice-copy">
          <img className="desktop-notice-logo" src="/images/scented by carelle logo.png" alt="Scented by Carelle" />
          <p className="desktop-notice-eyebrow">A little note from Carelle</p>
          <h1 id="desktop-notice-title">Best experienced<br /><em>on mobile.</em></h1>
          <p className="desktop-notice-message">Our fragrance boutique is designed for your phone. Open this page on your mobile device for the best way to explore the collection.</p>
        </div>
        <div className="desktop-notice-image-wrap">
          <img src="/images/new-products/asad.jpg" alt="Asad by Lattafa perfume bottle" />
        </div>
      </div>
    </main>
    </>
  );
}
