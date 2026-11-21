import React, { useMemo, useState } from 'react';
import { IconSearch, IconClose } from './Icons';
import { formatFCFA } from '../data/perfumes';

const normalizeSearchText = (value = '') => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

export default function FilterAndSearchBar({
  searchTerm,
  setSearchTerm,
  genderFilter,
  setGenderFilter,
  scentFamilyFilter,
  setScentFamilyFilter,
  sortBy,
  setSortBy,
  totalResults,
  perfumes = [],
  onSelectSuggestion = () => {}
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const suggestions = useMemo(() => {
    const query = normalizeSearchText(searchTerm.trim());
    if (!query) return [];
    return perfumes
      .filter((perfume) => normalizeSearchText(perfume.name).includes(query))
      .slice(0, 6);
  }, [perfumes, searchTerm]);
  const genderOptions = [
    { id: 'all', label: 'All' },
    { id: 'female', label: 'Pour Femme' },
    { id: 'male', label: 'Pour Homme' },
    { id: 'unisex', label: 'Unisex' }
  ];

  const scentFamilies = [
    { id: 'all', label: 'All Notes' },
    { id: 'vanilla', label: 'Vanilla & Amber' },
    { id: 'oud', label: 'Oud & Woods' },
    { id: 'floral', label: 'Floral & Rose' },
    { id: 'fresh', label: 'Fresh Citrus' }
  ];

  const hasActiveFilters = searchTerm !== '' || genderFilter !== 'all' || scentFamilyFilter !== 'all' || sortBy !== 'recommended';

  const resetFilters = () => {
    setSearchTerm('');
    setGenderFilter('all');
    setScentFamilyFilter('all');
    setSortBy('recommended');
  };

  return (
    <div className="w-full max-w-[402px] md:max-w-5xl mx-auto px-5 md:px-8 mb-6">
      {/* Search Input Bar with custom SVG */}
      <div className="relative mb-3.5">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#858585]">
          <IconSearch className="w-3.5 h-3.5" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => window.setTimeout(() => setIsSearchFocused(false), 120)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setIsSearchFocused(false);
            if (event.key === 'Enter' && suggestions[0]) {
              onSelectSuggestion(suggestions[0]);
              setIsSearchFocused(false);
            }
          }}
          autoComplete="off"
          placeholder="Search perfume names..."
          className="w-full pl-9 pr-9 py-2.5 rounded-full bg-white border border-[#252D61]/15 text-[11.5px] text-[#252D61] placeholder:text-[#858585] focus:outline-none focus:border-[#252D61] transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#858585] hover:text-[#252D61]"
            aria-label="Clear search"
          >
            <IconClose className="w-3.5 h-3.5" />
          </button>
        )}
        {isSearchFocused && searchTerm.trim() && (
          <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-[#252D61]/10 bg-white shadow-xl">
            {suggestions.length ? suggestions.map((perfume) => (
              <button
                key={perfume.id}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onSelectSuggestion(perfume);
                  setIsSearchFocused(false);
                }}
                className="flex w-full items-center gap-3 border-b border-[#f1efe9] px-3 py-2.5 text-left last:border-0 hover:bg-[#fcfbf9]"
              >
                <img src={perfume.image} alt="" className="h-10 w-10 rounded-lg bg-[#f6f5f2] object-contain p-1" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-medium text-[#252D61]">{perfume.name}</span>
                  <span className="block truncate text-[9px] text-[#858585]">{perfume.brand}</span>
                </span>
                <span className="shrink-0 text-[10px] text-[#252D61]">{formatFCFA(perfume.price)}</span>
              </button>
            )) : (
              <p className="px-4 py-3 text-[11px] text-[#858585]">No matching perfume names</p>
            )}
          </div>
        )}
      </div>

      {/* Gender Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {genderOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setGenderFilter(opt.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] transition-all duration-150 ${
              genderFilter === opt.id
                ? 'bg-[#252D61] text-white font-medium'
                : 'bg-[#f6f5f2] text-[#252D61]/75 hover:bg-[#edebe6]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Scent Family & Sort Line */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#f1efe9] text-[11px] text-[#858585]">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {scentFamilies.map((fam) => (
            <button
              key={fam.id}
              onClick={() => setScentFamilyFilter(fam.id)}
              className={`whitespace-nowrap px-2 py-0.5 rounded-md text-[10.5px] transition-all ${
                scentFamilyFilter === fam.id
                  ? 'bg-[#252D61] text-white font-medium'
                  : 'bg-[#f6f5f2] text-[#252D61]/70 hover:bg-[#edebe6]'
              }`}
            >
              {fam.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10.5px] text-[#858585]">
            {totalResults} {totalResults === 1 ? 'scent' : 'scents'}
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[10.5px] text-rose-600 underline"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
