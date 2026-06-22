/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Trash2, 
  Plus, 
  Minus, 
  Link, 
  ChevronRight, 
  ShoppingBag, 
  HelpCircle, 
  Dices,
  Info 
} from 'lucide-react';
import { ItalianCharm, Bead, Medallion, CustomDesign } from '../types';
import { ITALIAN_CHARMS_CATALOG, BEADS_CATALOG, MEDALLIONS_CATALOG } from '../constants';
import { ItalianCharmLink } from './CharmCatalog';

interface DesignStudioProps {
  onAddDesignToCart: (design: CustomDesign, name: string) => void;
  activePreset?: { type: 'italian-charm' | 'beaded-beads' | 'charm-necklace', id: string, timestamp: number } | null;
}

export const DesignStudio: React.FC<DesignStudioProps> = ({ onAddDesignToCart, activePreset }) => {
  // Navigation inside the studio
  const [activeTab, setActiveTab] = useState<'italian-charm' | 'beaded-beads' | 'charm-necklace'>('italian-charm');

  // Universal custom states
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastSavedName, setLastSavedName] = useState('');

  // ==========================================
  // STATE A: Italian Charm Bracelet
  // ==========================================
  const [charmWristSize, setCharmWristSize] = useState<number>(17); // Default 17 links
  // Array representing the 18 possible slots. Contains either Italian`Charm` or null (empty link)
  const [italianBraceletSlots, setItalianBraceletSlots] = useState<(ItalianCharm | null)[]>([]);
  const [selectedCharmSlot, setSelectedCharmSlot] = useState<number | null>(0);
  const [charmBaseType, setCharmBaseType] = useState<'silver' | 'gold'>('silver');
  const [charmSearchText, setCharmSearchText] = useState('');
  const [selectedCharmCategory, setSelectedCharmCategory] = useState<string>('Todos');

  // Sync slots array length whenever wrist size changes
  useEffect(() => {
    setItalianBraceletSlots(prev => {
      const updated = [...prev];
      if (updated.length < charmWristSize) {
        // Grow array
        while (updated.length < charmWristSize) {
          updated.push(null);
        }
      } else if (updated.length > charmWristSize) {
        // Truncate array
        updated.splice(charmWristSize);
      }
      return updated;
    });
    // Ensure selected slot stays bounds
    if (selectedCharmSlot !== null && selectedCharmSlot >= charmWristSize) {
      setSelectedCharmSlot(0);
    }
  }, [charmWristSize]);

  // Handle setting a charm spot
  const handleAssignCharmToSlot = (charm: ItalianCharm) => {
    if (selectedCharmSlot === null) return;
    setItalianBraceletSlots(prev => {
      const next = [...prev];
      next[selectedCharmSlot] = charm;
      return next;
    });
    // Auto-advance to the next slot for rapid customization!
    if (selectedCharmSlot < charmWristSize - 1) {
      setSelectedCharmSlot(selectedCharmSlot + 1);
    } else {
      setSelectedCharmSlot(0); // Loop back
    }
  };

  // Remove charm from slot
  const handleRemoveCharmFromSlot = (slotIndex: number) => {
    setItalianBraceletSlots(prev => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  };

  // Autofill random cute charms
  const handleAutofillCharms = () => {
    setItalianBraceletSlots(() => {
      return Array.from({ length: charmWristSize }, () => {
        // 40% chance of staying standard metallic base
        if (Math.random() < 0.45) return null;
        const randomIndex = Math.floor(Math.random() * ITALIAN_CHARMS_CATALOG.length);
        return ITALIAN_CHARMS_CATALOG[randomIndex];
      });
    });
  };

  // Clear bracelet
  const handleClearBracelet = () => {
    setItalianBraceletSlots(Array(charmWristSize).fill(null));
    setSelectedCharmSlot(0);
  };

  const calculateItalianBraceletPrice = () => {
    // Base link is $15 ARS/MXN. Custom charms are added with their specific catalog pricing
    const baseLinkPrice = charmBaseType === 'gold' ? 25 : 18;
    const totalBase = charmWristSize * baseLinkPrice;
    const extraCharmsPrice = italianBraceletSlots.reduce((acc, charm) => {
      return acc + (charm ? charm.price : 0);
    }, 0);
    return totalBase + extraCharmsPrice;
  };

  // ==========================================
  // STATE B: Beaded Bracelet Builder
  // ==========================================
  const [beadTheme, setBeadTheme] = useState<'coquette' | 'ocean' | 'sunset' | 'custom'>('coquette');
  const [beadNameText, setBeadNameText] = useState<string>('MERCI');
  const [beadAccentColor, setBeadAccentColor] = useState<string>('#fda4af'); // rose-300
  const [attachedCenterCharm, setAttachedCenterCharm] = useState<'bow' | 'shell' | 'none'>('bow');

  // Dynamic beads generator based on text & styles
  const generateBeadsChain = () => {
    const sequence: string[] = [];
    const colorThemeBeads = {
      coquette: ['⚪', '🌸', '⚪', '💓', '⚪', '🌸'],
      ocean: ['🐳', '⚪', '💙', '🐚', '⭐', '⚪'],
      sunset: ['🍊', '⚪', '✨', '⚪', '💛', '🐚'],
      custom: ['✨', '⚪', '🌸', '⚪', '💖', '⚪']
    };

    const currentTheme = colorThemeBeads[beadTheme] || colorThemeBeads.coquette;
    
    // Add prefix beads
    sequence.push(...currentTheme);
    
    // Add letter beads for name
    if (beadNameText.trim().length > 0) {
      const cleanText = beadNameText.trim().toUpperCase();
      for (const char of cleanText) {
        sequence.push(`🔤 ${char}`);
      }
    }
    
    // Add suffix beads
    sequence.push(...currentTheme);
    return sequence;
  };

  const calculateBeadsPrice = () => {
    // Basic handmade design base price is $120. Text beads are $8 each, attached central bow/shell is $45
    let price = 120;
    if (beadNameText) {
      price += beadNameText.replace(/\s/g, '').length * 8;
    }
    if (attachedCenterCharm === 'bow') price += 40;
    if (attachedCenterCharm === 'shell') price += 35;
    return price;
  };

  // ==========================================
  // STATE C: Golden Charm Necklace Builder
  // ==========================================
  const [necklaceChainStyle, setNecklaceChainStyle] = useState<'figaro' | 'finas' | 'perlas'>('figaro');
  const [selectedMedallions, setSelectedMedallions] = useState<Medallion[]>([MEDALLIONS_CATALOG[0]]); // Preselect item

  const toggleMedallionOnNecklace = (medallion: Medallion) => {
    setSelectedMedallions(prev => {
      const exists = prev.some(item => item.id === medallion.id);
      if (exists) {
        return prev.filter(item => item.id !== medallion.id);
      } else {
        if (prev.length >= 5) return prev; // Max 5 charms on a necklace
        return [...prev, medallion];
      }
    });
  };

  const calculateNecklacePrice = () => {
    const chainPrices = {
      figaro: 220,
      finas: 180,
      perlas: 310
    };
    const basePrice = chainPrices[necklaceChainStyle];
    const medallionsTotal = selectedMedallions.reduce((acc, item) => acc + item.price, 0);
    return basePrice + medallionsTotal;
  };

  // Listen to incoming preset selection updates from ProductGallery
  useEffect(() => {
    if (!activePreset) return;

    setActiveTab(activePreset.type);

    if (activePreset.id === 'idea-1') {
      // Muestrario de Eslabones Italianos
      setCharmBaseType('silver');
      setCharmWristSize(17);
      // Fill the slots with nice charms
      const sampleCharms = [
        ITALIAN_CHARMS_CATALOG.find(c => c.value === '🍒') || null,
        null,
        ITALIAN_CHARMS_CATALOG.find(c => c.value === '🧿') || null,
        null,
        ITALIAN_CHARMS_CATALOG.find(c => c.value === '🎀') || null,
        null,
        ITALIAN_CHARMS_CATALOG.find(c => c.value === '🥑') || null,
        null,
        ITALIAN_CHARMS_CATALOG.find(c => c.value === '🧸') || null,
      ];
      setItalianBraceletSlots(prev => {
        const next = Array(17).fill(null);
        sampleCharms.forEach((charm, i) => {
          if (charm && i < 17) next[i * 2] = charm;
        });
        return next;
      });
      setSelectedCharmSlot(0);
    } 
    else if (activePreset.id === 'idea-2') {
      // Bead-Kit Box Rosa Coquette
      setBeadTheme('coquette');
      setBeadNameText('COQUETTE');
      setBeadAccentColor('#fda4af');
      setAttachedCenterCharm('bow');
    } 
    else if (activePreset.id === 'idea-3') {
      // Pulsera Artesanal Hilos de Seda (Red string / suture / thread)
      setBeadTheme('custom');
      setBeadNameText('SUERTE');
      setBeadAccentColor('#ef4444');
      setAttachedCenterCharm('none');
    } 
    else if (activePreset.id === 'idea-4') {
      // Cadena Artesanal Gipsy Link
      setNecklaceChainStyle('figaro');
      const sampleMeds = MEDALLIONS_CATALOG.filter(m => m.id === 'medallion-shell' || m.id === 'medallion-star' || m.id === 'medallion-heart');
      setSelectedMedallions(sampleMeds);
    } 
    else if (activePreset.id === 'idea-5') {
      // Llavero Sweet Pearl & Ribbon
      setBeadTheme('coquette');
      setBeadNameText('SWEET');
      setBeadAccentColor('#fbcfe8');
      setAttachedCenterCharm('bow');
    } 
    else if (activePreset.id === 'idea-6') {
      // Gargantilla San Valentino Celestial
      setNecklaceChainStyle('finas');
      const sampleMeds = MEDALLIONS_CATALOG.filter(m => m.id === 'medallion-sun' || m.id === 'medallion-lock');
      setSelectedMedallions(sampleMeds);
    }
  }, [activePreset]);

  // ==========================================
  // SHARED: Saving design to Cart
  // ==========================================
  const handleSaveAndAdd = () => {
    if (activeTab === 'italian-charm') {
      const count = italianBraceletSlots.filter(Boolean).length;
      const titleName = `Pulsera Charms (${count} dijes) - ${charmBaseType === 'gold' ? 'Dorado' : 'Plateado'}`;
      
      const design: CustomDesign = {
        type: 'italian-charm',
        baseColor: charmBaseType,
        items: italianBraceletSlots,
        beads: [],
        medallions: []
      };
      
      onAddDesignToCart(design, titleName);
      setLastSavedName(titleName);
    } 
    else if (activeTab === 'beaded-beads') {
      const beadsArray = generateBeadsChain();
      const titleName = `Pulsera Hilo Coquette "${beadNameText || 'Sin Nombre'}"`;
      
      const design: CustomDesign = {
        type: 'beaded-beads',
        baseColor: 'silver',
        items: [],
        beads: beadsArray,
        medallions: []
      };
      
      onAddDesignToCart(design, titleName);
      setLastSavedName(titleName);
    } 
    else {
      const titleName = `Collar Dijes (${selectedMedallions.length} Medallones) - ${necklaceChainStyle === 'perlas' ? 'Estilo Perlas' : 'Súper Figaro'}`;
      
      const design: CustomDesign = {
        type: 'charm-necklace',
        baseColor: 'gold',
        items: [],
        beads: [],
        medallions: selectedMedallions
      };
      
      onAddDesignToCart(design, titleName);
      setLastSavedName(titleName);
    }

    setIsSuccessModalOpen(true);
  };

  // Filtering catalog
  const categoriesList = ['Todos', 'Letras', 'Protección y Ojos', 'Frutas y Comida', 'Amor y Flores', 'Astros y Astros', 'Otros'];
  const filteredCharms = ITALIAN_CHARMS_CATALOG.filter(charm => {
    const matchesCategory = selectedCharmCategory === 'Todos' || charm.category === selectedCharmCategory;
    const matchesSearch = charm.name.toLowerCase().includes(charmSearchText.toLowerCase()) || 
                          charm.value.toLowerCase().includes(charmSearchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="design-studio-block" className="py-16 bg-[#faf6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold tracking-widest text-[#4d1519] uppercase block mb-2">
            Workspace Interactivo
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#4d1519]">
            Taller Experimental Merci
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8c6d58] font-medium leading-relaxed">
            Personaliza en tiempo real, diseña tus piezas de ensueño y solicita a nuestro taller el ensamble a mano de tu pieza ideal.
          </p>
        </div>

        {/* Tab Selection buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          <button
            id="tab-btn-italian-charm"
            onClick={() => setActiveTab('italian-charm')}
            className={`flex items-center space-x-2 px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xs cursor-pointer ${
              activeTab === 'italian-charm' 
                ? 'bg-[#4d1519] text-white ring-2 ring-[#4d1519]/20' 
                : 'bg-[#ebdcd0]/50 text-[#4d1519]/70 hover:bg-[#ebdcd0] hover:text-[#4d1519]'
            }`}
          >
            <span>🔗 Pulsera de Charms Italianos</span>
          </button>
          
          <button
            id="tab-btn-beaded-beads"
            onClick={() => setActiveTab('beaded-beads')}
            className={`flex items-center space-x-2 px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xs cursor-pointer ${
              activeTab === 'beaded-beads' 
                ? 'bg-[#4d1519] text-white ring-2 ring-[#4d1519]/20' 
                : 'bg-[#ebdcd0]/50 text-[#4d1519]/70 hover:bg-[#ebdcd0] hover:text-[#4d1519]'
            }`}
          >
            <span>🎀 Pulsera Coquette Bead-Kit</span>
          </button>

          <button
            id="tab-btn-charm-necklace"
            onClick={() => setActiveTab('charm-necklace')}
            className={`flex items-center space-x-2 px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xs cursor-pointer ${
              activeTab === 'charm-necklace' 
                ? 'bg-[#4d1519] text-white ring-2 ring-[#4d1519]/20' 
                : 'bg-[#ebdcd0]/50 text-[#4d1519]/70 hover:bg-[#ebdcd0] hover:text-[#4d1519]'
            }`}
          >
            <span>☀️ Collar de Dijes San Valentino</span>
          </button>
        </div>

        {/* Workbench Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Live Interactive Preview Card (7 cols) */}
          <div className="lg:col-span-12 xl:col-span-7 bg-[#faf6f0] border-2 border-[#ebdcd0] rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col items-center">
            
            {/* Visual background aesthetics */}
            <div className="absolute inset-0 bg-radial from-[#ffffff]/50 via-transparent to-transparent pointer-events-none" />
            
            <div className="w-full flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#8c6d58] bg-[#ebdcd0]/40 px-3 py-1 rounded-full uppercase">
                Vista de Simulación 3D
              </span>
              <div className="flex space-x-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#cbd5e1] shadow-xs" title="Acero Inoxidable Premium" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#fbbf24] shadow-xs" title="Acabado Dorado Premium" />
              </div>
            </div>

            {/* =======================================================
                VIEW A: Italian Charm Bracelet Interactive Slots
                ======================================================= */}
            {activeTab === 'italian-charm' && (
              <div className="w-full py-8 flex flex-col items-center">
                
                {/* Italian metallic chain view container */}
                <div id="italian-bracelet-canvas" className="w-full overflow-x-auto pb-4 pt-4 px-2 scrollbar-thin scrollbar-track-transparent">
                  <div className="flex gap-1 justify-start md:justify-center min-w-[max-content] select-none py-4">
                    
                    {italianBraceletSlots.map((slotCharm, i) => {
                      const isSelected = selectedCharmSlot === i;
                      return (
                        <div
                          key={`slot-${i}`}
                          onClick={() => setSelectedCharmSlot(i)}
                          className={`relative w-12 sm:w-14 h-12 sm:h-14 rounded-md transition-all duration-200 cursor-pointer flex flex-col items-center justify-center border ${
                            isSelected 
                              ? 'border-[#4d1519] ring-2 ring-[#4d1519]/30 scale-105 z-10 shadow-md' 
                              : slotCharm 
                                ? 'border-[#8c6d58]/40 hover:border-[#8c6d58] hover:scale-102' 
                                : 'border-[#ebdcd0]/85 bg-white'
                          } ${
                            charmBaseType === 'gold' 
                              ? 'bg-linear-to-b from-[#fef3c7] via-[#fcd34d] to-[#f59e0b]' 
                              : 'bg-linear-to-b from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]'
                          }`}
                          style={{
                            boxShadow: 'inset 0 1px 4px rgba(255,255,255,0.7), 0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        >
                          {/* Engraving lines representing clock links */}
                          <div className="absolute top-0 bottom-0 left-0.5 w-[1px] bg-[#94a3b8]/30" />
                          <div className="absolute top-0 bottom-0 right-0.5 w-[1px] bg-[#94a3b8]/30" />

                          {slotCharm ? (
                            <div className="flex flex-col items-center justify-center text-center animate-fade-in">
                              {slotCharm.value.length === 1 && slotCharm.value >= 'A' && slotCharm.value <= 'Z' ? (
                                <span className={`font-serif font-extrabold select-none leading-none filter drop-shadow-[0_1.5px_1px_rgba(255,255,255,0.85)] text-xl sm:text-2xl ${
                                  charmBaseType === 'gold' 
                                    ? 'bg-gradient-to-b from-amber-800 to-amber-950 bg-clip-text text-transparent' 
                                    : 'bg-gradient-to-b from-slate-700 to-slate-950 bg-clip-text text-transparent'
                                }`}>
                                  {slotCharm.value}
                                </span>
                              ) : (
                                <span className="text-xl sm:text-2xl filter drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.15)] select-none leading-none saturate-[1.2]">
                                  {slotCharm.value}
                                </span>
                              )}
                              
                              {/* Overlay deletion button on hover */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveCharmFromSlot(i);
                                }}
                                className="absolute -top-1.5 -right-1.5 bg-[#4d1519] hover:bg-red-700 text-white rounded-full p-0.5 shadow-md flex items-center justify-center w-4 h-4 text-[9px] font-bold"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] sm:text-xs font-semibold text-[#8c6d58]/60 uppercase tracking-widest font-mono select-none">
                              {i + 1}
                            </span>
                          )}

                          {/* Selected slot floating marker label */}
                          {isSelected && (
                            <div className="absolute -bottom-8 bg-[#4d1519] text-white text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-sm shadow-xs whitespace-nowrap z-20">
                              Elegir {i + 1}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legend & Instructions */}
                <div className="mt-8 text-center bg-[#ebdcd0]/30 rounded-2xl p-4 w-full">
                  <p className="text-xs text-[#8c6d58] font-medium">
                    ✨ Haz clic en un eslabón numerado <b className="text-[#4d1519]">({selectedCharmSlot !== null ? selectedCharmSlot + 1 : 'Ninguno seleccionado'})</b> y escoge del catálogo abajo el dije italiano que deseas insertar.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center mt-3 text-xs">
                    <button 
                      onClick={handleAutofillCharms}
                      className="flex items-center space-x-1.5 text-[#4d1519] hover:underline font-bold cursor-pointer"
                    >
                      <Dices className="w-3.5 h-3.5" />
                      <span>Llena con dijes al azar</span>
                    </button>
                    <button 
                      onClick={handleClearBracelet}
                      className="flex items-center space-x-1.5 text-[#8c6d58] hover:text-[#4d1519] hover:underline font-semibold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Vaciar eslabones</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* =======================================================
                VIEW B: Beaded Bracelet Interactive Thread
                ======================================================= */}
            {activeTab === 'beaded-beads' && (
              <div className="w-full py-8 flex flex-col items-center">
                
                {/* Bead chain display with physical string representation */}
                <div className="relative w-full max-w-md py-12 flex justify-center items-center">
                  {/* String Line */}
                  <div className="absolute left-0 right-0 h-1 bg-[#dcae82] rounded-full opacity-60 z-0" />
                  
                  {/* Beads flex row */}
                  <div className="flex flex-wrap gap-1 items-center justify-center z-10 w-full px-4">
                    {generateBeadsChain().map((beadElem, i) => {
                      const isLetter = beadElem.startsWith('🔤');
                      const charValue = isLetter ? beadElem.split(' ')[1] : '';

                      return (
                        <div
                          key={`bead-${i}`}
                          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md animate-fade-in ${
                            isLetter 
                              ? 'bg-white border-2 border-[#4d1519] font-black text-xs text-[#4d1519]' 
                              : 'bg-linear-to-br from-[#ffffff] via-[#fed7aa] to-[#fbcfe8]'
                          }`}
                          style={{
                            boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.15), 2px 2px 5px rgba(0,0,0,0.15)'
                          }}
                        >
                          <span className={`${isLetter ? 'text-xs md:text-sm font-sans tracking-tight' : 'text-lg'}`}>
                            {isLetter ? charValue : beadElem}
                          </span>
                        </div>
                      );
                    })}

                    {/* Central Hanger Bow option if enabled */}
                    {attachedCenterCharm !== 'none' && (
                      <div className="w-12 h-12 bg-rose-100 border border-rose-300 rounded-2xl flex items-center justify-center shadow-lg transform translate-y-2 z-20">
                        <span className="text-3xl animate-bounce">
                          {attachedCenterCharm === 'bow' ? '🎀' : '🐚'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick configuration forms */}
                <div className="w-full grid sm:grid-cols-2 gap-4 mt-8 bg-[#ebdcd0]/30 rounded-2xl p-5 text-left text-xs text-[#8c6d58]">
                  
                  <div>
                    <label className="block font-bold mb-1.5 text-[#4d1519] uppercase tracking-wide">
                      Texto Inicial / Nombre:
                    </label>
                    <input 
                      type="text"
                      maxLength={12}
                      value={beadNameText}
                      onChange={(e) => setBeadNameText(e.target.value.replace(/[^A-Za-z\s]/g, ''))}
                      className="w-full bg-white border border-[#ebdcd0] rounded-xl px-3 py-2 text-sm font-bold text-[#4d1519] focus:outline-hidden focus:ring-2 focus:ring-[#4d1519]"
                      placeholder="Ej. AMIGA, LOVE, ANA"
                    />
                    <p className="mt-1 text-[10px] text-[#8c6d58]">Letras acrílicas unidas en el centro.</p>
                  </div>

                  <div>
                    <label className="block font-bold mb-1.5 text-[#4d1519] uppercase tracking-wide">
                      Tema de Color de Cuentas:
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-bold">
                      <button 
                        onClick={() => setBeadTheme('coquette')}
                        className={`py-1.5 px-2 rounded-lg border ${beadTheme === 'coquette' ? 'bg-[#4d1519] text-white' : 'bg-white hover:bg-rose-50'}`}
                      >
                        🌸 Coquette Pink
                      </button>
                      <button 
                        onClick={() => setBeadTheme('ocean')}
                        className={`py-1.5 px-2 rounded-lg border ${beadTheme === 'ocean' ? 'bg-[#4d1519] text-white' : 'bg-white hover:bg-sky-50'}`}
                      >
                        🌊 Ocean Pearl
                      </button>
                      <button 
                        onClick={() => setBeadTheme('sunset')}
                        className={`py-1.5 px-2 rounded-lg border ${beadTheme === 'sunset' ? 'bg-[#4d1519] text-white' : 'bg-white hover:bg-orange-50'}`}
                      >
                        🍊 Sunset Glow
                      </button>
                      <button 
                        onClick={() => setBeadTheme('custom')}
                        className={`py-1.5 px-2 rounded-lg border ${beadTheme === 'custom' ? 'bg-[#4d1519] text-white' : 'bg-white'}`}
                      >
                        ✨ Custom Gold
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-2 pt-2 border-t border-[#ebdcd0]/50">
                    <label className="block font-bold mb-1.5 text-[#4d1519] uppercase tracking-wide">
                      Añadir Colgante Destacado en el Centro:
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2 cursor-pointer font-medium">
                        <input 
                          type="radio" 
                          name="pendant" 
                          checked={attachedCenterCharm === 'bow'}
                          onChange={() => setAttachedCenterCharm('bow')}
                          className="accent-[#4d1519]" 
                        />
                        <span>🎀 Lazo de Liston Hecho a mano</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer font-medium">
                        <input 
                          type="radio" 
                          name="pendant" 
                          checked={attachedCenterCharm === 'shell'}
                          onChange={() => setAttachedCenterCharm('shell')}
                          className="accent-[#4d1519]" 
                        />
                        <span>🐚 Concha de Mar Estelar</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer font-medium">
                        <input 
                          type="radio" 
                          name="pendant" 
                          checked={attachedCenterCharm === 'none'}
                          onChange={() => setAttachedCenterCharm('none')}
                          className="accent-[#4d1519]" 
                        />
                        <span>Sin colgante</span>
                      </label>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* =======================================================
                VIEW C: Golden Charm Necklace Builder strand
                ======================================================= */}
            {activeTab === 'charm-necklace' && (
              <div className="w-full py-8 flex flex-col items-center">
                
                {/* Exquisite simulated necklace and hanging models */}
                <div className="relative w-full max-w-sm h-48 bg-white border border-[#ebdcd0] rounded-2xl flex flex-col items-center justify-end overflow-hidden shadow-xs pb-10">
                  <div className="absolute top-0 w-4/5 h-20 border-b-2 border-dashed border-[#dcae82] rounded-b-full opacity-60" />
                  
                  {/* Real-time hanging row */}
                  <div className="flex justify-center gap-6 items-center px-4 z-10 relative">
                    {selectedMedallions.length > 0 ? (
                      selectedMedallions.map((medallion, index) => (
                        <div 
                          key={medallion.id}
                          className="flex flex-col items-center text-center animate-bounce-short"
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          {/* Thread linking chain to medallion */}
                          <div className="w-[1.5px] h-4 bg-[#dcae82]" />
                          {/* Round golden loop hanger */}
                          <div className="w-3.5 h-3.5 rounded-full border border-[#dcae82] bg-yellow-300 -my-0.5 z-10" />
                          
                          {/* Medallion pendant card */}
                          <div className="w-12 h-12 bg-linear-to-br from-[#fef08a] via-[#fbbf24] to-[#f59e0b] text-[#4d1519] rounded-full border border-[#dcae82] shadow-md flex items-center justify-center relative">
                            <span className="text-2xl filter drop-shadow-sm">{medallion.symbol}</span>
                            
                            {/* Inner intricate border circle */}
                            <div className="absolute inset-1 border border-white/50 rounded-full pointer-events-none" />
                          </div>
                          
                          {/* Mini name */}
                          <p className="text-[8px] font-mono tracking-wider font-bold text-[#8c6d58] uppercase mt-1">
                            {medallion.name.split(' ').slice(-1)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-xs text-[#8c6d58] italic">Selecciona medallones abajo para colgarlos de la cadena.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sub configuration options */}
                <div className="w-full mt-8 bg-[#ebdcd0]/30 rounded-2xl p-5 text-left text-xs text-[#8c6d58]">
                  <label className="block font-bold mb-1.5 text-[#4d1519] uppercase tracking-wide">
                    Estilo de Cadena (Base de Gargantilla):
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <button 
                      onClick={() => setNecklaceChainStyle('figaro')}
                      className={`py-2 px-3 rounded-xl border text-center font-bold font-sans ${necklaceChainStyle === 'figaro' ? 'bg-[#4d1519] text-white' : 'bg-white hover:bg-neutral-50'}`}
                    >
                      Cadena Figaro Dorada<br/><span className="text-[10px] font-medium opacity-85">(Acero Inoxidable)</span>
                    </button>
                    <button 
                      onClick={() => setNecklaceChainStyle('finas')}
                      className={`py-2 px-3 rounded-xl border text-center font-bold font-sans ${necklaceChainStyle === 'finas' ? 'bg-[#4d1519] text-white' : 'bg-white hover:bg-neutral-50'}`}
                    >
                      Eslabón Fino Chapado<br/><span className="text-[10px] font-medium opacity-85">(Acabado Dorado Fino)</span>
                    </button>
                    <button 
                      onClick={() => setNecklaceChainStyle('perlas')}
                      className={`py-2 px-3 rounded-xl border text-center font-bold font-sans ${necklaceChainStyle === 'perlas' ? 'bg-[#4d1519] text-white' : 'bg-white hover:bg-neutral-50'}`}
                    >
                      Sarta de Perlas Naturales<br/><span className="text-[10px] font-medium opacity-85">(Hecho a Mano)</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-[#8c6d58] italic">
                    💡 ¡Máximo de 5 medallones chapados permitidos por pieza para conservar estética exquisita de San Valentino!
                  </p>
                </div>
              </div>
            )}

            {/* Real-time Order calculations and Actions Bar */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-center bg-[#4d1519] text-[#faf6f0] p-6 rounded-2xl mt-6 gap-4 shadow-lg">
              <div className="text-left">
                <span className="text-[10px] font-mono tracking-widest text-[#f5d0a9] uppercase block font-semibold mb-0.5">
                  Estado del Diseño
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" /> Listo para Ensamble
                </span>
                <p className="text-[9px] text-[#f5d0a9] mt-1 italic">
                  *Ana verificará el diseño y la disponibilidad de piezas al recibir la solicitud.
                </p>
              </div>

              <button
                id="btn-studio-save"
                onClick={handleSaveAndAdd}
                className="w-full sm:w-auto bg-[#f5d0a9] text-[#4d1519] font-bold text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl hover:bg-white transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer active:translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>GUARDAR EN MI COLECCIÓN</span>
              </button>
            </div>

          </div>

          {/* RIGHT: Dynamic Selection Catalog Workspace (5 cols) */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col space-y-6">
            
            {/* Catalog Selector Panel */}
            {activeTab === 'italian-charm' && (
              <div className="bg-white rounded-3xl p-6 border border-[#ebdcd0] shadow-sm flex flex-col h-[520px]">
                
                {/* Search & Category Filter */}
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-[#4d1519] uppercase tracking-wider mb-2">
                    Librería de Charms Italianos
                  </h3>
                  
                  {/* Categories Row */}
                  <div className="flex gap-1 overflow-x-auto pb-2 mb-2 scrollbar-thin">
                    {categoriesList.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCharmCategory(cat)}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full border shrink-0 transition-all cursor-pointer ${
                          selectedCharmCategory === cat 
                            ? 'bg-[#4d1519] border-[#4d1519] text-white' 
                            : 'bg-[#faf6f0] border-[#ebdcd0] text-[#8c6d58] hover:bg-[#ebdcd0]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search box */}
                  <input
                    type="text"
                    value={charmSearchText}
                    onChange={(e) => setCharmSearchText(e.target.value)}
                    placeholder="🔎 Buscar charm... (ej., Letra A, ojo, fresa)"
                    className="w-full bg-[#faf6f0] border border-[#ebdcd0] rounded-xl px-3 py-1.5 text-xs text-[#4d1519] focus:outline-hidden"
                  />
                </div>

                {/* Base Link Customizer */}
                <div className="bg-[#ebdcd0]/30 rounded-xl p-3 mb-4 text-xs font-medium flex justify-between items-center text-[#8c6d58]">
                  <div>
                    <span className="font-bold text-[#4d1519] block">Base del Eslabón:</span>
                    <span>¿Plateado o Dorado?</span>
                  </div>
                  <div className="flex bg-white rounded-lg p-1 border border-[#ebdcd0]">
                    <button
                      onClick={() => setCharmBaseType('silver')}
                      className={`px-3 py-1 rounded-md text-[10px] font-bold ${
                        charmBaseType === 'silver' ? 'bg-[#4d1519] text-white' : 'text-[#8c6d58]'
                      }`}
                    >
                      Plateado
                    </button>
                    <button
                      onClick={() => setCharmBaseType('gold')}
                      className={`px-3 py-1 rounded-md text-[10px] font-bold ${
                        charmBaseType === 'gold' ? 'bg-[#4d1519] text-white' : 'text-[#8c6d58]'
                      }`}
                    >
                      Dorado
                    </button>
                  </div>
                </div>

                <div className="bg-[#ebdcd0]/30 rounded-xl p-3 mb-4 text-xs font-medium flex justify-between items-center text-[#8c6d58]">
                  <div>
                    <span className="font-bold text-[#4d1519] block">Medida de Muñeca:</span>
                    <span>Ajustados a tus eslabones</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setCharmWristSize(m => Math.max(12, m - 1))}
                      className="p-1.5 rounded-md bg-white border border-[#ebdcd0] text-[#4d1519] cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-semibold text-sm w-6 text-center text-[#4d1519]">{charmWristSize}</span>
                    <button 
                      onClick={() => setCharmWristSize(m => Math.min(22, m + 1))}
                      className="p-1.5 rounded-md bg-white border border-[#ebdcd0] text-[#4d1519] cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Grid items */}
                <div className="overflow-y-auto flex-1 pr-1 grid grid-cols-4 sm:grid-cols-5 gap-2.5 max-h-[200px] sm:max-h-none">
                  {filteredCharms.map(charm => {
                    const existsInCatalogCount = italianBraceletSlots.filter(s => s?.id === charm.id).length;
                    
                    return (
                      <button
                        key={charm.id}
                        id={`charm-item-${charm.id}`}
                        onClick={() => handleAssignCharmToSlot(charm)}
                        className="p-2 sm:p-2.5 rounded-xl border border-[#ebdcd0]/80 bg-white hover:border-[#4d1519] hover:bg-[#ebdcd0]/10 flex flex-col items-center justify-center relative cursor-pointer group hover:scale-102 transition-all"
                      >
                        <div className="mb-1.5">
                          <ItalianCharmLink charm={charm} baseColor={charmBaseType} size="sm" />
                        </div>
                        <span className="text-[8px] font-mono text-[#8c6d58] text-center mt-1 font-bold whitespace-nowrap overflow-hidden max-w-full text-ellipsis">
                          {charm.name.replace('Letra ', '')}
                        </span>
                        <span className="text-[8px] text-emerald-700 font-bold mt-0.5 leading-none">
                          Disponible
                        </span>

                        {existsInCatalogCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-[#4d1519] text-white text-[7px] font-mono rounded-full w-4 h-4 flex items-center justify-center font-bold">
                            {existsInCatalogCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                  {filteredCharms.length === 0 && (
                    <div className="col-span-full text-center py-6 text-xs text-[#8c6d58] italic">
                      No encontramos charms similares... Intenta con otra palabra.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Catalog list for Beaded items */}
            {activeTab === 'beaded-beads' && (
              <div className="bg-white rounded-3xl p-6 border border-[#ebdcd0] shadow-xs flex flex-col space-y-4">
                <h3 className="text-sm font-bold text-[#4d1519] uppercase tracking-wider">
                  Ingredientes del Bead-Kit Coquette
                </h3>
                <p className="text-xs text-[#8c6d58] leading-relaxed">
                  Las cuentas naturales hechas a mano se ensamblan en hilos elásticos de alta resistencia con remaches de acero inoxidable.
                </p>

                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {BEADS_CATALOG.map(bead => (
                    <div 
                      key={bead.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0]/40"
                    >
                      <div className="flex items-center space-x-3.5">
                        <span className="text-2xl">{bead.emoji}</span>
                        <div>
                          <p className="text-xs font-bold text-[#4d1519]">{bead.name}</p>
                          <span className="text-[9px] text-[#8c6d58] uppercase tracking-wider font-mono">Chapa / Acrílico</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#4d1519] bg-white border border-[#ebdcd0] px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Disponible
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Medallions selection for Collar */}
            {activeTab === 'charm-necklace' && (
              <div className="bg-white rounded-3xl p-6 border border-[#ebdcd0] shadow-xs flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-[#4d1519] uppercase tracking-wider">
                    Medallones de Chapa Premium
                  </h3>
                  <span className="text-[10px] font-mono bg-[#ebdcd0] text-[#4d1519] px-2.5 py-0.5 rounded-full font-bold">
                    {selectedMedallions.length}/5 Seleccionados
                  </span>
                </div>
                
                <p className="text-xs text-[#8c6d58] leading-relaxed">
                  Marca un medallón para colgarlo en el collar modelo. Cada elemento cuenta con un pulido brillante y alta resistencia al uso.
                </p>

                <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                  {MEDALLIONS_CATALOG.map(med => {
                    const isSelected = selectedMedallions.some(item => item.id === med.id);
                    return (
                      <button
                        key={med.id}
                        onClick={() => toggleMedallionOnNecklace(med)}
                        className={`w-full flex items-start text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-[#ebdcd0]/30 border-[#4d1519]/70 ring-1 ring-[#4d1519]/30' 
                            : 'bg-[#faf6f0]/50 border-[#ebdcd0] hover:border-[#8c6d58]'
                        }`}
                      >
                        <span className="text-3xl p-1 bg-yellow-100 border border-yellow-300 rounded-xl mr-3 shadow-xs">
                          {med.symbol}
                        </span>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-[#4d1519]">{med.name}</p>
                          <p className="text-[10px] text-[#8c6d58] mt-0.5 leading-snug">{med.description}</p>
                          <span className="inline-block mt-1 font-mono text-[9px] uppercase tracking-wider text-[#4d1519] bg-[#ebdcd0]/70 px-2.5 py-0.5 rounded-sm">
                            Chapa Premium
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ml-2 ${
                          isSelected ? 'bg-[#4d1519] border-[#4d1519]' : 'border-neutral-300 bg-white'
                        }`}>
                          {isSelected && <span className="text-[8px] text-white">✓</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* SUCCESS BANNER MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#faf6f0] rounded-3xl p-8 max-w-sm w-full border border-[#ebdcd0] text-center shadow-xl animate-fade-in">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ✓
            </div>
            
            <h3 className="text-lg font-bold text-[#4d1519] mb-2 font-sans">
              ¡Diseño Guardado!
            </h3>
            
            <p className="text-xs text-[#8c6d58] mb-6 leading-relaxed">
              Hemos añadido la pieza <b>"{lastSavedName}"</b> a tu colección personal de diseño. Puedes guardar múltiples piezas y ordenar todas juntas por WhatsApp.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full bg-[#4d1519] text-[#faf6f0] font-bold text-xs tracking-wider py-2.5 rounded-xl hover:bg-[#340c0f] cursor-pointer"
              >
                ENTENDIDO, CONTINUAR
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

// Simple helper for bead list price mapping to ensure stability
function beidPrice(bead: Bead) {
  return bead.price;
}
