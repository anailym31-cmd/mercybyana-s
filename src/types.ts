/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ItalianCharm {
  id: string;
  code: string; // e.g., 'A16', 'A48'
  name: string;
  type: 'letter' | 'symbol' | 'crystal' | 'dangle';
  imageType: 'svg' | 'emoji';
  value: string; // The SVG path descriptor name or abbreviation
  color?: string; // Color coding
  price: number;
  category: 'Letras' | 'Frutas y Comida' | 'Protección y Ojos' | 'Amor y Flores' | 'Astros y Astros' | 'Otros';
}

export interface Bead {
  id: string;
  name: string;
  color: string;
  emoji: string;
  price: number;
}

export interface Medallion {
  id: string;
  name: string;
  symbol: string;
  price: number;
  description: string;
}

export interface CustomDesign {
  type: 'italian-charm' | 'beaded-beads' | 'charm-necklace';
  baseColor: 'silver' | 'gold';
  items: (ItalianCharm | null)[]; // For italian charms, fixed size array (e.g., 18 links)
  beads: string[]; // For beaded bracelet, list of bead IDs or characters
  medallions: Medallion[]; // For necklaces, selected gold pendants
}
