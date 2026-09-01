export type ThemeId = 'classic-card' | 'timeless-snapshot' | 'elegant-light' | 'photovit';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  accentColor: string;
  fontTitle: string;
  fontBody: string;
  thumbnail: string;
}

export const THEME_PRESETS: Record<ThemeId, ThemeConfig> = {
  'classic-card': {
    id: 'classic-card',
    name: 'Classic Emerald Botanical',
    tagline: 'Nuansa Alami & Elegan',
    description: 'Desain kartu elegan dengan bingkai dedaunan botani, aksen warna hijau emerald lembut, dan floating dock navigation.',
    badge: 'Bawaan / Default',
    accentColor: '#2F5D62',
    fontTitle: 'Philosopher, serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    thumbnail: '/assets/images/gallery-1.jpg'
  },
  'timeless-snapshot': {
    id: 'timeless-snapshot',
    name: 'Timeless Snapshot',
    tagline: 'Vintage Polaroid & Warm Parchment',
    description: 'Nuansa kertas hangat vintage dengan bingkai foto snapshot/polaroid estetik, tipografi serif klasik, dan efek film retro.',
    badge: 'Retro & Earthy',
    accentColor: '#8C6D53',
    fontTitle: 'Philosopher, serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    thumbnail: '/assets/images/story-first-meet.jpg'
  },
  'elegant-light': {
    id: 'elegant-light',
    name: 'Elegant Light',
    tagline: 'Royal Luxury & Champagne Gold',
    description: 'Kemewahan aristokrat dengan palet ivory alabaster, aksen emas berkilau (champagne gold), garis border emas halus, dan tipografi script memukau.',
    badge: 'Luxury & Royal',
    accentColor: '#B89047',
    fontTitle: 'Great Vibes, cursive',
    fontBody: 'Plus Jakarta Sans, serif',
    thumbnail: '/assets/images/gallery-2.jpg'
  },
  'photovit': {
    id: 'photovit',
    name: 'Photovit Magazine',
    tagline: 'Modern Photo-Centric & Romantic Chic',
    description: 'Tata letak modern ala majalah pernikahan dengan framing foto menonjol, tipografi romantis berkarakter, dan aksen charcoal blush.',
    badge: 'Modern & Chic',
    accentColor: '#D97768',
    fontTitle: 'Great Vibes, cursive',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    thumbnail: '/assets/images/gallery-3.jpg'
  }
};
