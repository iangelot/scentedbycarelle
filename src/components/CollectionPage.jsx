import React, { useMemo, useState } from 'react';
import Navbar from './Navbar';
import FilterAndSearchBar from './FilterAndSearchBar';
import PerfumeCard from './PerfumeCard';
import QuickViewModal from './QuickViewModal';
import Footer from './Footer';
import FloatingWhatsAppBar from './FloatingWhatsAppBar';
import { PERFUMES_DATA } from '../data/perfumes';

const normalize = (value = '') => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function CollectionPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gender, setGender] = useState('all');
  const [family, setFamily] = useState('all');
  const [sort, setSort] = useState('recommended');
  const [selected, setSelected] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [quizOpen, setQuizOpen] = useState(false);

  const perfumes = useMemo(() => PERFUMES_DATA.filter((p) => {
    if (gender !== 'all' && p.gender !== gender) return false;
    if (searchTerm && !normalize(`${p.name} ${p.brand}`).includes(normalize(searchTerm))) return false;
    if (family !== 'all') {
      const words = normalize([...(p.topNotes || []), ...(p.heartNotes || []), ...(p.baseNotes || []), p.description, p.tagline, p.name].join(' '));
      const terms = { vanilla: ['vanill','tonka','almond','amber','choco','gourmand'], oud: ['oud','wood','sandalwood','cedar','ebony'], floral: ['rose','jasmine','gardenia','blossom','floral'], fresh: ['bergamot','citrus','coconut','sea','fresh'] }[family] || [];
      if (!terms.some((term) => words.includes(term))) return false;
    }
    return true;
  }).sort((a,b) => sort === 'price-asc' ? a.price-b.price : sort === 'price-desc' ? b.price-a.price : 0), [gender,family,searchTerm,sort]);
  const addToCart = (item) => setCartItems((prev) => {
    const found = prev.find((entry) => entry.id === item.id && entry.size === item.size);
    return found ? prev.map((entry) => entry === found ? {...entry, quantity: entry.quantity + item.quantity} : entry) : [...prev,item];
  });
  const cartCount = cartItems.reduce((sum,item) => sum + item.quantity,0);
  const cartTotal = cartItems.reduce((sum,item) => sum + item.price * item.quantity,0);

  return <div className="mobile-site min-h-screen bg-white text-[#252D61] flex flex-col font-helvetica antialiased">
    <Navbar cartCount={cartCount} onOpenCart={() => {}} onOpenSearch={() => document.querySelector('#collection-search input')?.focus()} onOpenQuiz={() => setQuizOpen(true)} />
    <main className="flex-1 w-full bg-white pb-24">
      <header className="collection-heading mx-auto max-w-[1180px] px-5 md:px-8 pt-10 pb-7 text-center">
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#252D61]/60 font-elgina">The Carelle Edit</p>
        <h1 className="font-elgina text-3xl md:text-5xl text-[#252D61] mt-2">The Fragrance Collection</h1>
        <p className="text-xs md:text-sm text-[#858585] max-w-xl mx-auto mt-2 leading-relaxed">Find the scent that feels like it was made for you.</p>
        <a href="/" className="inline-flex mt-5 text-[11px] uppercase tracking-widest text-[#252D61]/70 hover:text-[#252D61]">← Back to the house</a>
      </header>
      <div id="collection-search"><FilterAndSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} genderFilter={gender} setGenderFilter={setGender} scentFamilyFilter={family} setScentFamilyFilter={setFamily} sortBy={sort} setSortBy={setSort} totalResults={perfumes.length} perfumes={PERFUMES_DATA} onSelectSuggestion={(p) => setSearchTerm(p.name)} /></div>
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="flex justify-between items-center pb-4 text-[11px] text-[#858585]"><span>{perfumes.length} {perfumes.length === 1 ? 'fragrance' : 'fragrances'}</span><label className="flex items-center gap-2">Sort<select className="rounded-full border border-[#252D61]/15 bg-white px-3 py-1.5 text-[#252D61]" value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></label></div>
        {perfumes.length ? <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">{perfumes.map((p) => <PerfumeCard key={p.id} perfume={p} onAddToCart={addToCart} onQuickView={setSelected} />)}</div> : <div className="py-20 text-center font-elgina text-xl">No fragrances found</div>}
      </div>
    </main>
    <Footer onOpenQuiz={() => setQuizOpen(true)} />
    <FloatingWhatsAppBar cartCount={cartCount} cartTotal={cartTotal} onOpenCart={() => {}} />
    <QuickViewModal perfume={selected} onClose={() => setSelected(null)} onAddToCart={addToCart} />
  </div>;
}
