/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BrandMessage } from './components/BrandMessage';
import { DesignStudio } from './components/DesignStudio';
import { ProductGallery } from './components/ProductGallery';
import { CharmCatalog } from './components/CharmCatalog';
import { OrderSummaryModal } from './components/OrderSummaryModal';
import { CustomDesign } from './types';
import { Heart, Send, Sparkles, MapPin, PhoneCall, Instagram } from 'lucide-react';

interface SavedDesignItem {
  name: string;
  design: CustomDesign;
  price: number;
}

export default function App() {
  const [savedDesigns, setSavedDesigns] = useState<SavedDesignItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<{ type: 'italian-charm' | 'beaded-beads' | 'charm-necklace', id: string, timestamp: number } | null>(null);

  // Load and persist inside localStorage
  useEffect(() => {
    try {
      const cached = localStorage.getItem('merci_saved_designs');
      if (cached) {
        setSavedDesigns(JSON.parse(cached));
      }
    } catch (e) {
      console.warn('LocalStorage not available or structure modified', e);
    }
  }, []);

  const saveAndPersist = (updated: SavedDesignItem[]) => {
    setSavedDesigns(updated);
    try {
      localStorage.setItem('merci_saved_designs', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to persist to localStorage', e);
    }
  };

  // Add custom design saved from DesignStudio
  const handleAddDesignToCart = (design: CustomDesign, titleName: string) => {
    // Determine design pricing based on active tab calculations
    let calculatedPrice = 0;
    if (design.type === 'italian-charm') {
      const baseLinkPrice = design.baseColor === 'gold' ? 25 : 18;
      const count = design.items.length || 17;
      const totalBase = count * baseLinkPrice;
      const extraCharmsPrice = design.items.reduce((acc, charm) => {
        return acc + (charm ? charm.price : 0);
      }, 0);
      calculatedPrice = totalBase + extraCharmsPrice;
    } 
    else if (design.type === 'beaded-beads') {
      // Basic handmade design is $120. Text beads are $8 each, attached central bow/shell is $40
      // Find name length from titleName or beads list
      const textualLettersCount = design.beads.filter(b => b.startsWith('🔤')).length;
      calculatedPrice = 120 + (textualLettersCount * 8);
      // Extra bow accessories price
      const hasBow = titleName.toLowerCase().includes('lazo') || true; 
      calculatedPrice += hasBow ? 40 : 0;
    } 
    else {
      // Necklaces: Base is $220. Medallions are $130 - $180
      calculatedPrice = 220;
      if (design.medallions && design.medallions.length > 0) {
        calculatedPrice += design.medallions.reduce((acc, med) => acc + med.price, 0);
      }
    }

    const newItem: SavedDesignItem = {
      name: titleName,
      design,
      price: calculatedPrice
    };

    const nextList = [...savedDesigns, newItem];
    saveAndPersist(nextList);
  };

  const handleRemoveDesign = (indexToRemove: number) => {
    const nextList = savedDesigns.filter((_, idx) => idx !== indexToRemove);
    saveAndPersist(nextList);
  };

  const handleClearAll = () => {
    saveAndPersist([]);
  };

  // Preset quick navigation scrollers
  const scrollToBlock = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#4d1519] font-sans selection:bg-[#ebdcd0]/80 selection:text-[#4d1519]">
      
      {/* Exquisite Top Header Bar */}
      <Header
        onNavigateToStudio={() => scrollToBlock('design-studio-block')}
        onNavigateToCatalog={() => scrollToBlock('catalog-section')}
        onNavigateToGallery={() => scrollToBlock('gallery-block')}
        cartCount={savedDesigns.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Brand Message and Motivation */}
      <BrandMessage />

      {/* Main Interactive Studio Workbench */}
      <DesignStudio onAddDesignToCart={handleAddDesignToCart} activePreset={activePreset} />

      {/* Product Gallery Section with premade collections */}
      <ProductGallery 
        onSelectPreset={(type, id) => {
          setActivePreset({ type, id, timestamp: Date.now() });
          scrollToBlock('design-studio-block');
        }} 
      />

      {/* Searchable Beads and Charms active parts Catalog */}
      <CharmCatalog />

      {/* Permanent floating cart button for desktop users */}
      {savedDesigns.length > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#4d1519] text-[#faf6f0] px-5 py-3.5 rounded-full font-bold shadow-2xl hover:bg-[#340c0f] hover:scale-105 transition-all flex items-center space-x-2 animate-bounce cursor-pointer border border-[#f5d0a9]/30"
        >
          <Heart className="w-5 h-5 fill-rose-300 text-rose-300" />
          <span className="text-xs tracking-wider uppercase">Revisar Pedido ({savedDesigns.length})</span>
        </button>
      )}

      {/* Cart & Checkout Modal compilation with WhatsApp Integration */}
      <OrderSummaryModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        savedDesigns={savedDesigns}
        onRemoveDesign={handleRemoveDesign}
        onClearAll={handleClearAll}
      />

      {/* EXQUISITE LUXURY BRAND FOOTER */}
      <footer className="bg-linear-to-b from-white to-[#fcf9f5] border-t border-[#ebdcd0]/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold tracking-widest text-[#4d1519] uppercase">MERCI</h4>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#8c6d58] block mt-1">by Ana's • Joyería</span>
            <p className="text-xs text-[#8c6d58] leading-relaxed">
              Joyas de amor propio y amuletos que reflejan tu esencia auténtica. Diseñado con aceros premium y chapa de alta calidad en Maracaibo, Zulia, enviando elegancia a todo el país.
            </p>
          </div>

          {/* Col 2: Services */}
          <div>
            <h5 className="text-xs font-bold tracking-wider text-[#4d1519] uppercase mb-4">Colección Personalizada</h5>
            <ul className="space-y-2.5 text-xs text-[#8c6d58] font-medium">
              <li>
                <button onClick={() => scrollToBlock('design-studio-block')} className="hover:text-[#4d1519] hover:underline cursor-pointer">
                  Taller de Charms Italianos
                </button>
              </li>
              <li>
                <button onClick={() => scrollToBlock('design-studio-block')} className="hover:text-[#4d1519] hover:underline cursor-pointer">
                  Collares de Chapa de Alta Calidad
                </button>
              </li>
              <li>
                <button onClick={() => scrollToBlock('design-studio-block')} className="hover:text-[#4d1519] hover:underline cursor-pointer">
                  Pulseras de Cuentas y Listones
                </button>
              </li>
              <li>
                <button onClick={() => scrollToBlock('catalog-section')} className="hover:text-[#4d1519] hover:underline cursor-pointer">
                  Ver Diarios de Eslabones
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Safe materials badge */}
          <div>
            <h5 className="text-xs font-bold tracking-wider text-[#4d1519] uppercase mb-4">Garantía del Taller</h5>
            <ul className="space-y-2.5 text-xs text-[#8c6d58] font-medium">
              <li className="flex items-center">
                <span className="mr-2">🔬</span> Acero de Grado Quirúrgico
              </li>
              <li className="flex items-center">
                <span className="mr-2">👑</span> Chapa y Metal de Alta Gama
              </li>
              <li className="flex items-center">
                <span className="mr-2">🍃</span> Hipoalergénico sin Níquel
              </li>
              <li className="flex items-center">
                <span className="mr-2">📦</span> Envío Garantizado por Correo
              </li>
            </ul>
          </div>

          {/* Col 4: Contact links */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold tracking-wider text-[#4d1519] uppercase">Contacto y Redes</h5>
            <div className="space-y-2.5 text-xs text-[#8c6d58]">
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-[#4d1519]" />
                Maracaibo, Zulia, VE
              </p>
              <p className="flex items-center">
                <PhoneCall className="w-4 h-4 mr-2 text-[#4d1519]" />
                Contacto Directo por WhatsApp
              </p>
              <a 
                href="https://www.instagram.com/mercybyanas_/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center hover:text-[#4d1519] transition-colors font-semibold"
              >
                <Instagram className="w-4 h-4 mr-2 text-[#4d1519]" />
                @mercybyanas_
              </a>
            </div>
            {/* Visual payment support indicators */}
            <div className="flex gap-2.5 pt-2 text-xl opacity-60">
              <span title="Oxxo">🏪</span> <span title="Banco SPEI">🏦</span> <span title="Efectivo en manos">💵</span>
            </div>
          </div>

        </div>

        {/* Legal bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[#ebdcd0]/50 text-center text-[10px] font-mono tracking-wider text-[#8c6d58]">
          <p>© 2026 Merci by Ana's. Diseñado de manera interactiva y armada a mano con amor en Maracaibo, Zulia.</p>
          <p className="mt-1 text-neutral-400">Los diseños creados en este portal están regulados bajo los términos de stock físico de dijes y eslabones en el taller.</p>
        </div>
      </footer>

    </div>
  );
}
