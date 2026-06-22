/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ItalianCharm, Bead, Medallion } from './types';

// Catalog of Italian Charms
export const ITALIAN_CHARMS_CATALOG: ItalianCharm[] = [
  // Letters Category
  ...Array.from({ length: 26 }, (_, i) => {
    const letter = String.fromCharCode(65 + i); // A-Z
    return {
      id: `charm-letter-${letter}`,
      code: `L-${letter}`,
      name: `Letra ${letter}`,
      type: 'letter' as const,
      imageType: 'emoji' as const,
      value: letter,
      price: 35,
      category: 'Letras' as const,
    };
  }),

  // Protection and Mystic
  {
    id: 'charm-ojo-turco-azul',
    code: 'P-01',
    name: 'Ojo Turco Azul',
    type: 'symbol',
    imageType: 'emoji',
    value: '🧿',
    price: 45,
    category: 'Protección y Ojos'
  },
  {
    id: 'charm-ojo-turco-rojo',
    code: 'P-02',
    name: 'Ojo Turco Rojo',
    type: 'symbol',
    imageType: 'emoji',
    value: '👁️‍🗨️',
    price: 45,
    category: 'Protección y Ojos'
  },
  {
    id: 'charm-trebol',
    code: 'P-03',
    name: 'Trébol de 4 Hojas',
    type: 'symbol',
    imageType: 'emoji',
    value: '🍀',
    price: 40,
    category: 'Protección y Ojos'
  },
  {
    id: 'charm-mano-fatima',
    code: 'P-04',
    name: 'Mano de Fátima',
    type: 'symbol',
    imageType: 'emoji',
    value: '✋',
    price: 45,
    category: 'Protección y Ojos'
  },

  // Fruits & Food (from photos: cerezas, aguacate, cheeseburger)
  {
    id: 'charm-cerezas',
    code: 'F-01',
    name: 'Cerezas Dulces',
    type: 'symbol',
    imageType: 'emoji',
    value: '🍒',
    price: 45,
    category: 'Frutas y Comida'
  },
  {
    id: 'charm-aguacate',
    code: 'F-02',
    name: 'Aguacate Split',
    type: 'symbol',
    imageType: 'emoji',
    value: '🥑',
    price: 40,
    category: 'Frutas y Comida'
  },
  {
    id: 'charm-burger',
    code: 'F-03',
    name: 'Burguesía retro',
    type: 'symbol',
    imageType: 'emoji',
    value: '🍔',
    price: 45,
    category: 'Frutas y Comida'
  },
  {
    id: 'charm-fresa',
    code: 'F-04',
    name: 'Fresa Fresh',
    type: 'symbol',
    imageType: 'emoji',
    value: '🍓',
    price: 40,
    category: 'Frutas y Comida'
  },
  {
    id: 'charm-durazno',
    code: 'F-05',
    name: 'Durazno Coquette',
    type: 'symbol',
    imageType: 'emoji',
    value: '🍑',
    price: 40,
    category: 'Frutas y Comida'
  },

  // Love & Flowers (from photos: heart, coquette pink bows, margaritas)
  {
    id: 'charm-corazon-rojo',
    code: 'A-01',
    name: 'Corazón Esmeralda',
    type: 'symbol',
    imageType: 'emoji',
    value: '❤️',
    price: 40,
    category: 'Amor y Flores'
  },
  {
    id: 'charm-corazon-rosa',
    code: 'A-02',
    name: 'Corazón Glaseado',
    type: 'symbol',
    imageType: 'emoji',
    value: '💖',
    price: 45,
    category: 'Amor y Flores'
  },
  {
    id: 'charm-flower',
    code: 'A-03',
    name: 'Margarita Blanca',
    type: 'symbol',
    imageType: 'emoji',
    value: '🌼',
    price: 40,
    category: 'Amor y Flores'
  },
  {
    id: 'charm-pink-bow',
    code: 'A-04',
    name: 'Moño Coquette Rosa',
    type: 'symbol',
    imageType: 'emoji',
    value: '🎀',
    price: 50,
    category: 'Amor y Flores'
  },
  {
    id: 'charm-girasol',
    code: 'A-05',
    name: 'Girasol Alegre',
    type: 'symbol',
    imageType: 'emoji',
    value: '🌻',
    price: 40,
    category: 'Amor y Flores'
  },

  // Astros & Symbols (yin yang, stars, crescent moon)
  {
    id: 'charm-yin-yang',
    code: 'M-01',
    name: 'Yin Yang Balance',
    type: 'symbol',
    imageType: 'emoji',
    value: '☯️',
    price: 45,
    category: 'Astros y Astros'
  },
  {
    id: 'charm-estrella-brillo',
    code: 'M-02',
    name: 'Destello Estelar',
    type: 'symbol',
    imageType: 'emoji',
    value: '⭐',
    price: 35,
    category: 'Astros y Astros'
  },
  {
    id: 'charm-luna-estrellas',
    code: 'M-03',
    name: 'Luna Mística',
    type: 'symbol',
    imageType: 'emoji',
    value: '🌙',
    price: 45,
    category: 'Astros y Astros'
  },
  {
    id: 'charm-sol-radiante',
    code: 'M-04',
    name: 'Medallón Sol',
    type: 'symbol',
    imageType: 'emoji',
    value: '☀️',
    price: 45,
    category: 'Astros y Astros'
  },

  // Others & Character (like Stitch, puppy, smiley, pearl)
  {
    id: 'charm-stitch',
    code: 'O-01',
    name: 'Stitch Azul',
    type: 'symbol',
    imageType: 'emoji',
    value: '👽',
    price: 50,
    category: 'Otros'
  },
  {
    id: 'charm-carita-feliz',
    code: 'O-02',
    name: 'Smiley Retro',
    type: 'symbol',
    imageType: 'emoji',
    value: '🙂',
    price: 35,
    category: 'Otros'
  },
  {
    id: 'charm-gatito',
    code: 'O-03',
    name: 'Gatito de la Suerte',
    type: 'symbol',
    imageType: 'emoji',
    value: '🐱',
    price: 45,
    category: 'Otros'
  },
  {
    id: 'charm-perla',
    code: 'O-04',
    name: 'Perla de Río Colgante',
    type: 'dangle',
    imageType: 'emoji',
    value: '⚪',
    price: 55,
    category: 'Otros'
  },
  {
    id: 'charm-crystal-bangle',
    code: 'O-05',
    name: 'Cristal Zircón',
    type: 'crystal',
    imageType: 'emoji',
    value: '💎',
    price: 50,
    category: 'Otros'
  }
];

// Catalog of Beads for Bead Bracelets/Boxes
export const BEADS_CATALOG: Bead[] = [
  { id: 'bead-pink', name: 'Cuenta Rosa Melocotón', color: '#fbcfe8', emoji: '🌸', price: 5 },
  { id: 'bead-pearl', name: 'Perla de Agua Dulce', color: '#f8fafc', emoji: '⚪', price: 8 },
  { id: 'bead-gold', name: 'Separador Dorado Premium', color: '#fef08a', emoji: '✨', price: 6 },
  { id: 'bead-lilac', name: 'Cuenta Lavanda', color: '#e9d5ff', emoji: '💜', price: 5 },
  { id: 'bead-mint', name: 'Cuenta Menta Pastel', color: '#ccfbf1', emoji: '🍃', price: 5 },
  { id: 'bead-sky', name: 'Cuenta Celeste Mar', color: '#bae6fd', emoji: '💧', price: 5 },
  { id: 'bead-star', name: 'Estrellita de Concha Nácar', color: '#fed7aa', emoji: '⭐', price: 7 },
  { id: 'bead-heart-pink', name: 'Coraconcito de Arcilla Fina', color: '#fbcfe8', emoji: '💖', price: 7 },
  { id: 'bead-shell', name: 'Concha Marina Natural', color: '#ffedd5', emoji: '🐚', price: 12 },
  { id: 'bead-bow-pink', name: 'Lazo Coquette Listón', color: '#fda4af', emoji: '🎀', price: 15 }
];

// Catalog of Medallions for Necklaces (Sun medal, wing charm, shell, lock, key, heart)
export const MEDALLIONS_CATALOG: Medallion[] = [
  {
    id: 'medallion-sun',
    name: 'Medallón Zodiacal del Sol',
    symbol: '☀️',
    price: 180,
    description: 'Medallón con acabado dorado premium con diseño de destello solar vibrante.'
  },
  {
    id: 'medallion-lock',
    name: 'Candado del Amor Eterno',
    symbol: '🔒',
    price: 150,
    description: 'Dije de candado vintage pulido con acabado premium.'
  },
  {
    id: 'medallion-wing',
    name: 'Ala del Ángel Guardián',
    symbol: '🪶',
    price: 140,
    description: 'Ala tallada hiper-detallada con brillo dorado sutil.'
  },
  {
    id: 'medallion-heart',
    name: 'Corazón Sagrado Liso',
    symbol: '💝',
    price: 160,
    description: 'Corazón inflado tridimensional con acabado dorado resplandeciente.'
  },
  {
    id: 'medallion-shell',
    name: 'Concha de Venus Marina',
    symbol: '🐚',
    price: 140,
    description: 'Símbolo del mar y feminidad con finas estrías doradas.'
  },
  {
    id: 'medallion-star',
    name: 'Estrella Polar de Guía',
    symbol: '✨',
    price: 130,
    description: 'Estrella de 8 puntas con un delicado cristal central.'
  }
];

// Aesthetic presets reflecting style categories shown in uploaded pics
export const PRESETS_DESIGNS = [
  {
    id: 'preset-italian-classic',
    title: 'Pulsera Italian Glamour',
    description: 'La clásica pulsera con eslabones plateados, letras personalizadas y amuletos celestiales.',
    type: 'italian-charm' as const,
    price: 640,
    imagePlaceholder: '🔗✨🌸',
    tags: ['Italian Charms', 'Acero Inoxidable']
  },
  {
    id: 'preset-coquette-bows',
    title: 'Set Love Beads & Bows',
    description: 'Inspiración dulce con hilos de perlas, cuentas rosa pastel y el icónico lazo coquette hecho a mano.',
    type: 'beaded-beads' as const,
    price: 380,
    imagePlaceholder: '🎀⚪🌸',
    tags: ['Coquette', 'Hecho a Mano']
  },
  {
    id: 'preset-golden-mystic',
    title: 'Gargantilla Cosmos Dorada',
    description: 'Collar de eslabones finos con acabado dorado y medallones de Sol y Luna para brillar.',
    type: 'charm-necklace' as const,
    price: 520,
    imagePlaceholder: '✨☀️🌙',
    tags: ['Acabado Dorado', 'Místico']
  }
];

// Handcrafted string & crystal bracelets section matching uploaded photos
export const HANDCRAFTED_BRACELETS = [
  {
    id: 'handcrafted-azul-imperial',
    name: 'Colección Azul Imperial y Armonía',
    description: 'Bello set de pulseras de hilo azul rey tejidas a mano con nudo corredizo. Incluye dijes protectores como ojo turco de cristal, hamsa labrada de concha nácar, estrellas de chapa, cuentas brillantes de murano y perlas genuinas de agua dulce.',
    image: '/src/assets/images/pulsera_azul_1781725697422.jpg',
    features: ['Tejido Macramé Azul', 'Amuletos de Protección', 'Ajustables con Nudo Corredizo']
  },
  {
    id: 'handcrafted-hilo-rojo',
    name: 'Pulsera de Hilo Rojo de la Suerte (Siete Nudos)',
    description: 'La clásica pulsera de protección tejida a mano con hilo de seda rojo satinado, con siete balines de acabado dorado premium de alta calidad que se complementan con nudos de macramé de precisión, ideales para regular la buena energía y protección en el día a día.',
    image: '/src/assets/images/pulsera_roja_mejorada_1781726045427.jpg',
    features: ['Hilo Rojo de Seda', 'Siete Balines de Chapa', 'Nudos de Protección Hechos a Mano']
  },
  {
    id: 'handcrafted-perla-macrame',
    name: 'Set Macramé Orgánico con Perla Central',
    description: 'Diseño sutil disponible en preciosos hilos neutros (blanco perla, negro medianoche, café cacao, crema de trigo, verde oliva o caqui militar). Cada pieza tiene una perla natural de río en el centro complementada con balines dorados.',
    image: '/src/assets/images/pulseras_macrame_1781725721722.jpg',
    features: ['Hilo de Macramé de Alta Densidad', 'Perla Natural Central', 'Tonos Tierra Minimalistas']
  },
  {
    id: 'handcrafted-arcoiris-cristales',
    name: 'Sartas de Cristales Murano Ajustables (Arcoíris)',
    description: 'Pulseras elásticas y ajustables de hilos de colores vibrantes repletas de cristales facetados murano que reflejan destellos hermosos con el sol. Perfectas para apilar en sets personalizados llenos de brillo.',
    image: '/src/assets/images/pulseras_arcoiris_1781725734203.jpg',
    features: ['Cristales Murano Facetados', 'Variedad de Colores del Arcoíris', 'Nudo Corredizo de Fácil Ajuste']
  }
];
