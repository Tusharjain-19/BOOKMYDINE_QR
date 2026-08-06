export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image?: string;
  isVeg?: boolean;
  isNonVeg?: boolean;
  isSpicy?: boolean;
  spicyLevel?: number; // 1 to 3
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export type ThemePresetId = 'minimal' | 'luxury' | 'traditional' | 'modern' | 'street' | 'dark';

export interface ThemeConfig {
  id: ThemePresetId;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  cardBgColor: string;
  textColor: string;
  subtextColor: string;
  fontHeader: string;
  fontBody: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  showBorders: boolean;
  shadowStyle: 'none' | 'sm' | 'md' | 'lg' | 'glow';
  headerStyle: 'centered' | 'banner' | 'minimal' | 'glass';
}

export interface RestaurantDetails {
  name: string;
  tagline: string;
  logoUrl?: string;
  bannerUrl?: string;
  address?: string;
  phone?: string;
  currency: string;
  notice?: string;
  wifiSsid?: string;
  wifiPassword?: string;
  showBranding?: boolean;
  brandingText?: string;
  brandingUrl?: string;
}

export interface MenuData {
  slug: string;
  restaurant: RestaurantDetails;
  categories: MenuCategory[];
  theme: ThemeConfig;
  lastUpdated: string;
}
