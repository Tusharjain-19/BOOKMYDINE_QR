import type { MenuData, ThemeConfig, ThemePresetId } from '../types/menu';

export const PRESET_THEMES: Record<ThemePresetId, ThemeConfig> = {
  'minimal': {
    id: 'minimal',
    name: 'Minimal Cafe',
    primaryColor: '#2d241f', // Dark Espresso
    secondaryColor: '#efdcd0',
    accentColor: '#ca7857', // Terracotta
    bgColor: '#fbf9f5', // Warm Cream
    cardBgColor: '#efeeea',
    textColor: '#170f0b',
    subtextColor: '#4e4540',
    fontHeader: "'EB Garamond', Georgia, serif",
    fontBody: "'Inter', sans-serif",
    borderRadius: 'md',
    showBorders: true,
    shadowStyle: 'sm',
    headerStyle: 'minimal',
  },
  'luxury': {
    id: 'luxury',
    name: 'Luxury Fine Dining',
    primaryColor: '#e5c276', // Champagne Gold
    secondaryColor: '#d1c5b2',
    accentColor: '#e5e2e1',
    bgColor: '#131313', // Midnight Black
    cardBgColor: '#1b1b1b',
    textColor: '#e5e2e1',
    subtextColor: '#a39c94',
    fontHeader: "'EB Garamond', Georgia, serif",
    fontBody: "'Inter', sans-serif",
    borderRadius: 'sm',
    showBorders: true,
    shadowStyle: 'md',
    headerStyle: 'centered',
  },
  'traditional': {
    id: 'traditional',
    name: 'Traditional Indian',
    primaryColor: '#5d181b', // Heritage Maroon
    secondaryColor: '#7c580a', // Royal Amber
    accentColor: '#ffdad8',
    bgColor: '#fff8f7', // Warm Heritage
    cardBgColor: '#fff0ef',
    textColor: '#221a19',
    subtextColor: '#544242',
    fontHeader: "'Cinzel', 'Libre Caslon Text', serif",
    fontBody: "'Manrope', sans-serif",
    borderRadius: 'none',
    showBorders: true,
    shadowStyle: 'sm',
    headerStyle: 'banner',
  },
  'modern': {
    id: 'modern',
    name: 'Modern Restaurant',
    primaryColor: '#1b1c1a', // Charcoal
    secondaryColor: '#4b6549', // Komorebi Forest Green
    accentColor: '#cdebc8', // Soft Mint
    bgColor: '#fbf9f5',
    cardBgColor: '#f5f3ef',
    textColor: '#1b1c1a',
    subtextColor: '#444748',
    fontHeader: "'Libre Caslon Text', serif",
    fontBody: "'Manrope', sans-serif",
    borderRadius: 'lg',
    showBorders: false,
    shadowStyle: 'sm',
    headerStyle: 'glass',
  },
  'street': {
    id: 'street',
    name: 'Street Food & Urban Eats',
    primaryColor: '#ac2c23', // Vibrant Crimson
    secondaryColor: '#755700',
    accentColor: '#ffce5e', // Mustard Yellow
    bgColor: '#fcf9f8',
    cardBgColor: '#ffffff',
    textColor: '#1b1c1c',
    subtextColor: '#59413e',
    fontHeader: "'Sora', sans-serif",
    fontBody: "'Manrope', sans-serif",
    borderRadius: 'lg',
    showBorders: true,
    shadowStyle: 'md',
    headerStyle: 'banner',
  },
  'dark': {
    id: 'dark',
    name: 'Premium Dark Glass',
    primaryColor: '#ffc574', // Neon Gold Amber
    secondaryColor: '#f4a300',
    accentColor: '#A86B36',
    bgColor: '#111317', // Midnight Dark
    cardBgColor: '#1d2128', // Dark Glass Card
    textColor: '#e2e2e8',
    subtextColor: '#a0a0ab',
    fontHeader: "'Bebas Neue', 'Cinzel', serif",
    fontBody: "'Manrope', sans-serif",
    borderRadius: 'lg',
    showBorders: true,
    shadowStyle: 'glow',
    headerStyle: 'glass',
  },
};

export const INITIAL_MENU_DATA: MenuData = {
  slug: 'my-restaurant-menu',
  restaurant: {
    name: 'My Restaurant',
    tagline: 'Artisanal Flavors & Fresh Dishes',
    address: '',
    phone: '',
    currency: '₹',
    notice: '',
    showBranding: true,
    brandingText: 'Powered by BookMyDine',
    brandingUrl: 'https://bookmydineqr.vercel.app/',
  },
  theme: PRESET_THEMES['minimal'],
  lastUpdated: new Date().toISOString(),
  categories: [],
};
