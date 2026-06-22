/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, ShoppingBag, Send, Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  onNavigateToStudio: () => void;
  onNavigateToGallery: () => void;
  onNavigateToCatalog: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateToStudio,
  onNavigateToGallery,
  onNavigateToCatalog,
  cartCount,
  onOpenCart
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#faf6f0]/95 backdrop-blur-md border-b border-[#ebdcd0]/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full bg-[#4d1519] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-[#f5d0a9]" />
            </div>
            <div>
              <span className="font-sans text-xl sm:text-2xl font-bold tracking-widest text-[#4d1519] block leading-none">
                MERCI
              </span>
              <span className="font-mono text-[10px] tracking-widest text-[#8c6d58] uppercase block mt-1">
                by Ana's • Joyería
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button
              id="nav-btn-studio"
              onClick={onNavigateToStudio}
              className="text-sm font-medium text-[#4d1519]/80 hover:text-[#4d1519] transition-colors duration-200 cursor-pointer border-b-2 border-transparent hover:border-[#4d1519] py-1"
            >
              Estudio de Diseño
            </button>
            <button
              id="nav-btn-catalog"
              onClick={onNavigateToCatalog}
              className="text-sm font-medium text-[#4d1519]/80 hover:text-[#4d1519] transition-colors duration-200 cursor-pointer border-b-2 border-transparent hover:border-[#4d1519] py-1"
            >
              Catálogo de Charms
            </button>
            <button
              id="nav-btn-gallery"
              onClick={onNavigateToGallery}
              className="text-sm font-medium text-[#4d1519]/80 hover:text-[#4d1519] transition-colors duration-200 cursor-pointer border-b-2 border-transparent hover:border-[#4d1519] py-1"
            >
              Diseños Inspiradores
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              id="btn-header-cart"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#f3e9df] text-[#4d1519] hover:bg-[#ebdcd0] transition-colors duration-200 cursor-pointer group"
              aria-label="Ver diseños guardados"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4d1519] text-[#faf6f0] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse border-2 border-[#faf6f0]">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              id="btn-header-whatsapp"
              onClick={onNavigateToStudio}
              className="hidden sm:flex items-center space-x-2 bg-[#4d1519] text-[#faf6f0] px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider hover:bg-[#340c0f] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>DISEÑAR AHORA</span>
            </button>

            {/* Mobile menu button */}
            <button
              id="btn-mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#4d1519] hover:bg-[#f3e9df] rounded-lg transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#faf6f0] border-t border-[#ebdcd0]/60 px-4 pt-2 pb-6 space-y-1 shadow-inner">
          <button
            id="mobile-nav-studio"
            onClick={() => {
              onNavigateToStudio();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-3 text-base font-semibold text-[#4d1519] hover:bg-[#f3e9df] rounded-lg transition-all"
          >
            🎨 Estudio de Diseño
          </button>
          <button
            id="mobile-nav-catalog"
            onClick={() => {
              onNavigateToCatalog();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-3 text-base font-semibold text-[#4d1519] hover:bg-[#f3e9df] rounded-lg transition-all"
          >
            💖 Catálogo de Charms
          </button>
          <button
            id="mobile-nav-gallery"
            onClick={() => {
              onNavigateToGallery();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-3 text-base font-semibold text-[#4d1519] hover:bg-[#f3e9df] rounded-lg transition-all"
          >
            ✨ Diseños Inspiradores
          </button>
          <button
            id="mobile-nav-cta"
            onClick={() => {
              onNavigateToStudio();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-center mt-4 bg-[#4d1519] text-[#faf6f0] py-3 rounded-xl font-bold transition-all"
          >
            ¡Diseñar mi Joya!
          </button>
        </div>
      )}
    </header>
  );
};
