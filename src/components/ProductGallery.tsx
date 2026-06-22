/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Calendar, Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { PRESETS_DESIGNS } from '../constants';

interface ProductGalleryProps {
  onSelectPreset: (type: 'italian-charm' | 'beaded-beads' | 'charm-necklace', id: string) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ onSelectPreset }) => {
  
  const designIdeas = [
    {
      id: 'idea-1',
      title: 'Muestrario de Eslabones Italianos',
      description: 'Nuestra colección icónica en acero. Combina dijes de comida retro, emojis, ojos turcos protectores y tu nombre.',
      category: 'Italian Charms',
      badge: 'Más Vendido 🔥',
      price: '$590 MXN',
      type: 'italian-charm' as const,
      colorTheme: 'bg-[#cbd5e1]/30',
      symbols: ['🍒', '⭐', '🧿', '🎀', '🥑', '🍔']
    },
    {
      id: 'idea-2',
      title: 'Bead-Kit Box Rosa Coquette',
      description: 'Una caja organizadora repleta de cuentas de acrílico pastel, perlas de agua dulce, dijes de estrellas e hilos de listón.',
      category: 'Bead Kits',
      badge: 'Favorito del Taller ✨',
      price: '$420 MXN',
      type: 'beaded-beads' as const,
      colorTheme: 'bg-rose-100/40',
      symbols: ['🌸', '🐚', '💖', '🎀', '⚪', '⭐']
    },
    {
      id: 'idea-3',
      title: 'Pulsera Artesanal Hilos de Seda',
      description: 'Tejido elegante de hilos satinados combinados con cuentas de chapa premium brillante y ojos turcos protectores tejidos a mano.',
      category: 'Pulseras Artesanales',
      badge: 'Tejido a Mano 💕',
      price: '$290 MXN',
      type: 'beaded-beads' as const,
      colorTheme: 'bg-red-50/50',
      symbols: ['🧵', '✨', '🧿', '💖', '✨', '📿']
    },
    {
      id: 'idea-4',
      title: 'Cadena Artesanal Gipsy Link',
      description: 'Gargantilla de eslabones gruesos martillados a mano con terminales de seguridad reforzadas y perlas barrocas naturales.',
      category: 'Cadenas Artesanales',
      badge: 'Diseño Exclusivo 👑',
      price: '$580 MXN',
      type: 'charm-necklace' as const,
      colorTheme: 'bg-amber-50/50',
      symbols: ['🔗', '⚪', '👑', '✨', '🐚', '🔗']
    },
    {
      id: 'idea-5',
      title: 'Llavero Sweet Pearl & Ribbon',
      description: 'Hermosos moños y llaveros hechos a mano con hilos de perlas y cuentas satinadas para tus llaves o celular.',
      category: 'Accesorios',
      badge: 'Handmade 🎀',
      price: '$250 MXN',
      type: 'beaded-beads' as const,
      colorTheme: 'bg-pink-100/40',
      symbols: ['🎀', '⚪', '💓', '🌟', '🔑', '🎀']
    },
    {
      id: 'idea-6',
      title: 'Gargantilla San Valentino Celestial',
      description: 'Collar de chapa fina con medallones de Sol místico y candados de amor grabados.',
      category: 'Collares',
      badge: 'Chapa Premium 👑',
      price: '$610 MXN',
      type: 'charm-necklace' as const,
      colorTheme: 'bg-yellow-10 border-yellow-20/40',
      symbols: ['👑', '🔒', '☀️', '✨', '🐚', '👁️']
    }
  ];

  return (
    <section id="gallery-block" className="py-20 bg-linear-to-b from-[#faf6f0] to-white border-b border-[#ebdcd0]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-mono font-bold tracking-widest text-[#4d1519] uppercase block mb-2">
              Inspiración de Temporada
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#4d1519]">
              Colecciones y Sets Exclusivos
            </h2>
            <p className="mt-3 text-sm text-[#8c6d58]">
              Modelos inspiracionales basados directamente en los productos más populares armados a mano por Ana en nuestro taller físico.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2 text-xs text-[#8c6d58] items-center">
            <span className="flex items-center"><Star className="w-3.5 h-3.5 fill-[#dcae82] text-[#dcae82] mr-1" /> 4.9 estrellas de clientes</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {designIdeas.map((idea) => {
            const handleLoad = () => {
              const studioBlock = document.getElementById('design-studio-block');
              if (studioBlock) {
                studioBlock.scrollIntoView({ behavior: 'smooth' });
              }
              onSelectPreset(idea.type, idea.id);
            };

            return (
              <div 
                key={idea.id}
                onClick={handleLoad}
                className="bg-[#faf6f0]/40 backdrop-blur-xs rounded-3xl border border-[#ebdcd0]/60 p-5 flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 relative group overflow-hidden cursor-pointer hover:border-[#4d1519]/60"
                title="Toca para personalizar este ejemplar en el taller interactivo"
              >
                {/* Product Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[9px] font-mono tracking-wider font-bold bg-[#4d1519]/95 text-[#faf6f0] px-3 py-1 rounded-full uppercase shadow-xs">
                    {idea.badge}
                  </span>
                </div>

                {/* Simulated Jewelry Graphic Representation */}
                <div className={`aspect-square w-full rounded-2xl ${idea.colorTheme} flex flex-col items-center justify-center p-4 mb-4 relative overflow-hidden shadow-inner transition-transform group-hover:scale-[1.01] duration-300`}>
                  
                  {/* Visual grid decor inside representation */}
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none" />
                  
                  {/* Beads or links representation */}
                  <div className="flex gap-1 items-center justify-center flex-wrap max-w-[140px]">
                    {idea.symbols.map((sym, i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 rounded-lg bg-white border border-[#ebdcd0] flex items-center justify-center shadow-xs text-lg select-none group-hover:rotate-6 transition-transform duration-300"
                        style={{
                          boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.05)'
                        }}
                      >
                        {sym}
                      </div>
                    ))}
                  </div>

                  <span className="text-[10px] font-mono tracking-widest text-[#8c6d58] uppercase font-bold mt-4">
                    Modelo {idea.category}
                  </span>
                </div>

                {/* Title & info text */}
                <div>
                  <span className="text-[9px] font-mono tracking-wider text-[#8c6d58] uppercase block mb-1 font-bold">
                    {idea.category}
                  </span>
                  <h3 className="text-base font-bold text-[#4d1519] tracking-tight mb-2 group-hover:text-[#4d1519] transition-colors">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-[#8c6d58]/95 leading-relaxed mb-4">
                    {idea.description}
                  </p>
                </div>

                {/* Action */}
                <div className="pt-4 border-t border-[#ebdcd0]/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#4d1519] font-bold group-hover:underline flex items-center gap-1">
                      Diseñar estilo <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  
                  <div className="bg-[#4d1519] text-[#faf6f0] p-2 rounded-full group-hover:scale-115 transition-transform duration-300">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Info card block below */}
        <div className="mt-16 bg-radial from-[#5a1c21] to-[#3a0d10] text-[#faf6f0] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
              ¿No sabes qué eslabones elegir?
            </h4>
            <p className="text-xs sm:text-sm text-[#f5d0a9]">
              Nuestras piezas son de edición limitada. Agenda una sesión virtual guiada con Ana por mensaje privado y diseña paso a paso con su asesoría experta en tendencias "Coquette" y "Gipsy Gold".
            </p>
          </div>
          <button
            onClick={() => window.open('https://wa.me/message/ANAS_WHATSAPP_PLACEHOLDER', '_blank')}
            className="bg-[#f5d0a9] text-[#4d1519] px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase hover:bg-white transition-all cursor-pointer whitespace-nowrap"
          >
            Chatear con Ana 💬
          </button>
        </div>

      </div>
    </section>
  );
};
