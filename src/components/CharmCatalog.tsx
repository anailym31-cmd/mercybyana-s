/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Sparkles, Star, Tag, CornerDownRight, ShieldCheck } from 'lucide-react';
import { ITALIAN_CHARMS_CATALOG, BEADS_CATALOG, HANDCRAFTED_BRACELETS } from '../constants';
import { ItalianCharm } from '../types';

export const ItalianCharmLink: React.FC<{
  charm: { value: string; name: string };
  baseColor?: 'gold' | 'silver';
  size?: 'sm' | 'md' | 'lg';
}> = ({ charm, baseColor = 'silver', size = 'md' }) => {
  const isGold = baseColor === 'gold';
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  const metalBg = isGold
    ? 'bg-gradient-to-br from-amber-100 via-[#fbbf24] to-amber-600 border-amber-300'
    : 'bg-gradient-to-br from-slate-100 via-neutral-200 to-slate-400 border-slate-300';

  const borderHighlight = isGold
    ? 'border-t-amber-100 border-l-amber-200 border-b-amber-700 border-r-amber-700'
    : 'border-t-white border-l-slate-100 border-b-slate-500 border-r-slate-500';

  return (
    <div 
      className={`relative ${sizeClasses[size]} rounded-md border flex items-center justify-center shadow-md select-none transition-all duration-300 overflow-hidden ${metalBg} ${borderHighlight}`}
      style={{
        boxShadow: 'inset 0 1.5px 3px rgba(255,255,255,0.8), 0 3px 6px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.12)'
      }}
    >
      {/* Left side metal notch */}
      <div className={`absolute top-1/2 -left-0.5 -translate-y-1/2 w-[3px] h-1/2 rounded-r-sm ${isGold ? 'bg-amber-400' : 'bg-slate-300'} opacity-85 shadow-xs`} />
      {/* Right side metal notch */}
      <div className={`absolute top-1/2 -right-0.5 -translate-y-1/2 w-[3px] h-1/2 rounded-l-sm ${isGold ? 'bg-amber-400' : 'bg-slate-300'} opacity-85 shadow-xs`} />
      
      {/* Inner bezel */}
      <div className={`absolute inset-[3px] rounded-[3px] flex items-center justify-center overflow-hidden ${
        isGold 
          ? 'bg-gradient-to-br from-yellow-50 to-amber-100/90 border border-amber-200/50' 
          : 'bg-gradient-to-br from-white to-slate-50 border border-slate-200/50'
      }`}
        style={{
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)'
        }}
      >
        {/* Shine glare */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
        <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 pointer-events-none" />

        {/* Emojis or Letters inside */}
        <div className="relative transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
          {charm.value.length === 1 && charm.value >= 'A' && charm.value <= 'Z' ? (
            <span className={`font-serif font-extrabold select-none leading-none ${
              isGold 
                ? 'bg-gradient-to-b from-amber-700 to-amber-950 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' 
                : 'bg-gradient-to-b from-slate-700 to-slate-950 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]'
            }`}
              style={{
                fontSize: size === 'sm' ? '14px' : size === 'md' ? '18px' : '22px'
              }}
            >
              {charm.value}
            </span>
          ) : (
            <span className={`${size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-3xl'} select-none leading-none filter saturate-[1.2] drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]`}>
              {charm.value}
            </span>
          )}
        </div>
      </div>
      <div className="absolute inset-[0.5px] rounded-[5px] border border-white/20 pointer-events-none" />
    </div>
  );
};

export const CharmCatalog: React.FC = () => {
  const [selectedMainGroup, setSelectedMainGroup] = useState<'italian' | 'beads' | 'handcrafted-bracelets'>('italian');
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');

  // Categories list for Italian charms
  const italianCategories = ['Todos', 'Letras', 'Protección y Ojos', 'Frutas y Comida', 'Amor y Flores', 'Astros y Astros', 'Otros'];

  const filteredItalian = ITALIAN_CHARMS_CATALOG.filter(item => {
    const matchesCategory = categoryFilter === 'Todos' || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          item.value.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredBeads = BEADS_CATALOG.filter(item => 
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredBracelets = HANDCRAFTED_BRACELETS.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section id="catalog-section" className="py-20 bg-linear-to-b from-white to-[#faf6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono font-bold tracking-widest text-[#4d1519] uppercase block mb-1">
            Galería del Orfebre
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#4d1519]">
            Catálogo Completo de Componentes
          </h2>
          <p className="mt-3 text-sm text-[#8c6d58] leading-relaxed">
            Explora las joyas, abalorios y conchas disponibles en el inventario activo de Merci by Ana's. Todos cuentan con esmalte resistente y base quirúrgica hipoalergénica.
          </p>
        </div>

        {/* Elegant Catalog Visual Banner */}
        <div className="max-w-4xl mx-auto mb-12 rounded-3xl overflow-hidden border border-[#ebdcd0] shadow-md hover:shadow-lg transition-all duration-300">
          <img 
            src="/src/assets/images/merci_jewelry_catalog_1781725389326.jpg" 
            alt="Muestra física de Charms y Cadenas Merci" 
            className="w-full h-64 sm:h-80 object-cover hover:scale-101 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Catalog Main Type Selector tabs */}
        <div className="flex flex-wrap border-b border-[#ebdcd0]/85 mb-8 justify-center gap-1 sm:gap-4">
          <button
            onClick={() => { setSelectedMainGroup('italian'); setSearchText(''); setCategoryFilter('Todos'); }}
            className={`pb-4 px-3 sm:px-4 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 border-b-2 cursor-pointer ${
              selectedMainGroup === 'italian' 
                ? 'border-[#4d1519] text-[#4d1519]' 
                : 'border-transparent text-[#8c6d58] hover:text-[#4d1519]'
            }`}
          >
            🔗 Dije Italiano
          </button>
          
          <button
            onClick={() => { setSelectedMainGroup('beads'); setSearchText(''); }}
            className={`pb-4 px-3 sm:px-4 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 border-b-2 cursor-pointer ${
              selectedMainGroup === 'beads' 
                ? 'border-[#4d1519] text-[#4d1519]' 
                : 'border-transparent text-[#8c6d58] hover:text-[#4d1519]'
            }`}
          >
            🌸 Cuentas y Muranos
          </button>

          <button
            onClick={() => { setSelectedMainGroup('handcrafted-bracelets'); setSearchText(''); }}
            className={`pb-4 px-3 sm:px-4 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 border-b-2 cursor-pointer ${
              selectedMainGroup === 'handcrafted-bracelets' 
                ? 'border-[#4d1519] text-[#4d1519]' 
                : 'border-transparent text-[#8c6d58] hover:text-[#4d1519]'
            }`}
          >
            📿 Pulseras Artesanales
          </button>
        </div>

        {/* Filtering & Searching Box */}
        <div className="bg-[#faf6f0] border border-[#ebdcd0] rounded-3xl p-5 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
          
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-[#8c6d58]" />
            </span>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={`🔎 Buscar en ${selectedMainGroup === 'italian' ? 'eslabones' : selectedMainGroup === 'beads' ? 'cuentas' : 'pulseras artesanales'}...`}
              className="block w-full pl-10 pr-4 py-2 bg-white text-xs sm:text-sm text-[#4d1519] placeholder-[#8c6d58]/60 border border-[#ebdcd0] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#4d1519]"
            />
          </div>

          {selectedMainGroup === 'italian' && (
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-end">
              {italianCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    categoryFilter === cat 
                      ? 'bg-[#4d1519] text-white border-[#4d1519]' 
                      : 'bg-white text-[#8c6d58] border-[#ebdcd0] hover:bg-[#ebdcd0]/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Quick info tag */}
          <div className="hidden lg:flex items-center text-[11px] font-mono font-semibold text-[#8c6d58] uppercase">
            <ShieldCheck className="w-4 h-4 mr-1 text-emerald-700" /> Quirúrgico Seguro
          </div>
        </div>

        {/* Content Listing based on selected tab */}
        {selectedMainGroup === 'italian' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {filteredItalian.map(item => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-[#ebdcd0]/75 hover:border-[#4d1519] transition-all flex flex-col items-center justify-between text-center shadow-xs group"
              >
                <div className="mb-3.5 transition-transform group-hover:scale-105 duration-300">
                  <ItalianCharmLink charm={item} baseColor="silver" size="md" />
                </div>
                <div>
                  <span className="text-[8px] font-mono tracking-wider text-[#8c6d58] uppercase font-bold block mb-0.5">
                    Cod: {item.code}
                  </span>
                  <p className="text-[11px] font-bold text-[#4d1519] leading-tight mb-1 truncate max-w-[100px]" title={item.name}>
                    {item.name}
                  </p>
                  <span className="text-[10px] text-[#8c6d58] block mb-2">{item.category}</span>
                </div>
                <span className="text-[9px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold uppercase tracking-widest whitespace-nowrap">
                  Consultar disponibilidad
                </span>
              </div>
            ))}
            {filteredItalian.length === 0 && (
              <div className="col-span-full py-16 text-center text-xs text-[#8c6d58] italic bg-white rounded-2xl border">
                No hay charms que coincidan con la búsqueda. Intenta de nuevo...
              </div>
            )}
          </div>
        )}

        {selectedMainGroup === 'beads' && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredBeads.map(item => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl p-4.5 border border-[#ebdcd0]/75 hover:border-[#4d1519] transition-all flex items-center space-x-4 shadow-xs"
              >
                <div className="w-12 h-12 bg-[#faf6f0] border-2 border-amber-100 flex items-center justify-center text-2xl rounded-full relative shadow-md">
                  {item.emoji}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#4d1519] leading-tight">{item.name}</p>
                  <span className="text-[9px] font-mono text-[#8c6d58] uppercase tracking-wider block mt-0.5">Handmade bead</span>
                  <span className="inline-block text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-widest mt-1.5 self-start">
                    Consultar disponibilidad
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMainGroup === 'handcrafted-bracelets' && (
          <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredBracelets.map(item => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#ebdcd0] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image display */}
                <div className="h-64 sm:h-72 overflow-hidden border-b border-[#ebdcd0] relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 right-4 text-[9px] uppercase font-mono tracking-widest font-extrabold bg-[#4d1519] text-[#faf6f0] px-3 py-1.5 rounded-full shadow-md">
                    Hecho a Mano 🧵
                  </span>
                </div>
                
                {/* Text Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#4d1519] tracking-tight leading-snug mb-2">{item.name}</h3>
                    <p className="text-xs text-[#8c6d58] leading-relaxed mb-4">{item.description}</p>
                    
                    {/* Features badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.features.map((feat, idx) => (
                        <span key={idx} className="text-[10px] font-sans font-medium text-[#8c6d58] bg-[#ebdcd0]/15 border border-[#ebdcd0]/35 px-2.5 py-1 rounded-lg">
                          ✨ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp click target triggers direct message */}
                  <div className="pt-4 border-t border-[#ebdcd0]/50 flex justify-between items-center gap-4">
                    <span className="text-[9px] font-mono tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-bold uppercase">
                      Disponible
                    </span>
                    <button
                      onClick={() => {
                        const message = encodeURIComponent(`Hola Ana! Vi en tu catálogo de la web la pulsera artesanal: *${item.name}*. ¿La tienes disponible para armado? 💕`);
                        window.open(`https://wa.me/5216677519658?text=${message}`, '_blank');
                      }}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center space-x-1.5"
                    >
                      <span>Consultar disponibilidad</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredBracelets.length === 0 && (
              <div className="col-span-full py-16 text-center text-xs text-[#8c6d58] italic bg-white rounded-2xl border">
                No hay pulseras que coincidan con la búsqueda. Intenta de nuevo...
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
