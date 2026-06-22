/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Heart, Crown, Award } from 'lucide-react';

export const BrandMessage: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-radial from-[#5a1c21] to-[#3a0d10] text-[#faf6f0] py-20 px-4 sm:px-6 lg:px-8 shadow-2xl">
      {/* Decorative floral or sparkling vectors in background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="stars-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L32 20 L52 22 L32 24 L30 44 L28 24 L8 22 L28 20 Z" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Sparkle badge */}
        <div className="inline-flex items-center space-x-2 bg-[#f5d0a9]/15 border border-[#f5d0a9]/30 rounded-full px-4 py-1.5 mb-8">
          <Sparkles className="w-4 h-4 text-[#f5d0a9] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#f5d0a9] uppercase font-semibold">
            Esencia Merci • 100% Personalizado
          </span>
        </div>

        {/* Brand Headline */}
        <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          Diseña Accesorios que <span className="text-[#f5d0a9] underline decoration-[#f5d0a9]/40 underline-offset-8">Cuentan Tu Historia</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#fadcd3] mb-12 font-medium leading-relaxed">
          En Merci by Ana's, te damos la libertad de convertirte en la diseñadora de tu propia pieza de joyería fina. Accesorios hechos a mano inspirados en brillar con autenticidad.
        </p>

        {/* Feature Cards Grid (Representing the 2 specific cards verbatim) */}
        <div className="grid md:grid-cols-2 gap-8 text-left mt-16">
          
          {/* Card 1 - Libertad de diseñar */}
          <div className="bg-[#4d1519]/60 backdrop-blur-md border border-[#f5d0a9]/25 rounded-3xl p-8 sm:p-10 shadow-lg relative group overflow-hidden hover:border-[#f5d0a9]/50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute -right-6 -bottom-6 text-[#faf6f0]/5 group-hover:text-[#faf6f0]/8 transition-colors">
              <Crown className="w-32 h-32" />
            </div>
            
            <div className="w-12 h-12 rounded-2xl bg-[#f5d0a9] text-[#4d1519] flex items-center justify-center mb-6 shadow-md shadow-[#4d1519]/50">
              <Crown className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4 tracking-wide font-sans">
              Libertad Creativa Absoluta
            </h3>
            
            <p className="text-[#f5d0a9]/90 text-sm sm:text-base font-medium leading-relaxed font-sans border-l-2 border-[#f5d0a9] pl-4">
              "En Merci by Ana's te ofrecemos algo más que accesorios hechos a mano: te damos la libertad de convertirte en diseñadora de tu propia pieza."
            </p>
          </div>

          {/* Card 2 - Mujer auténtica */}
          <div className="bg-[#4d1519]/60 backdrop-blur-md border border-[#f5d0a9]/25 rounded-3xl p-8 sm:p-10 shadow-lg relative group overflow-hidden hover:border-[#f5d0a9]/50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute -right-6 -bottom-6 text-[#faf6f0]/5 group-hover:text-[#faf6f0]/8 transition-colors">
              <Heart className="w-32 h-32" />
            </div>

            <div className="w-12 h-12 rounded-2xl bg-[#f5d0a9] text-[#4d1519] flex items-center justify-center mb-6 shadow-md shadow-[#4d1519]/50">
              <Heart className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-4 tracking-wide font-sans">
              La Mujer Auténtica y Sencilla
            </h3>

            <p className="text-[#f5d0a9]/90 text-sm sm:text-base font-medium leading-relaxed font-sans border-l-2 border-[#f5d0a9] pl-4">
              "Una marca de accesorios inspirada en la mujer auténtica. Nos motiva florecer, brillar, transformarte con elegancia y encontrar el glamour en lo sencillo."
            </p>
          </div>

        </div>

        {/* Simple features ribbon */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-12 pt-10 border-t border-[#f5d0a9]/10 text-[#f5d0a9]/80 text-xs font-mono tracking-widest">
          <span className="flex items-center space-x-1">
            <Award className="w-4 h-4 mr-1 text-[#f5d0a9]" /> ACERO INOXIDABLE Premium
          </span>
          <span className="flex items-center space-x-1">
            <Heart className="w-4 h-4 mr-1 text-[#f5d0a9]" /> 100% HECHO CON AMOR
          </span>
          <span className="flex items-center space-x-1">
            <Sparkles className="w-4 h-4 mr-1 text-[#f5d0a9]" /> CHAPA DE CALIDAD PREMIUM
          </span>
        </div>
      </div>
    </section>
  );
};
