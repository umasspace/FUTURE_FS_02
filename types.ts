
export interface MenuItem {
  id: string;
  name: string;
  prices: {
    sticks: number;
    pancakes8: number;
    pancakes10: number;
  };
  seasonal?: boolean;
  featured?: boolean;
  specialPrice?: number;
  isSingleUnit?: boolean;
  unitLabel?: string;
  image?: string;
}

export interface MenuCategory {
  title: string;
  tagline: string;
  items: MenuItem[];
  icon?: string;
  premium?: boolean;
}

export interface Branch {
  name: string;
  address: string;
  phone: string;
  displayPhone: string;
  mapsUrl: string;
  whatsappMsg: string;
}

export interface CartItem {
  cartId: string; // Unique ID for the specific item+size combination
  id: string;
  name: string;
  size: 'Stick' | '8 Pcs' | '10 Pcs' | string;
  price: number;
  quantity: number;
}

export interface AppConfig {
  orderPhoneNumber: string;
}

export interface SiteContent {
  hero: {
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    description: string;
    ctaText1: string;
    ctaText2: string;
    videoUrl: string;
    videoPoster: string;
    heroImage: string;
  };
  social: {
    instagramUrl: string;
    facebookUrl?: string;
    twitterUrl?: string;
  };
  footer: {
    aboutText: string;
    copyrightText: string;
  };
  experience: {
    title: string;
    subtitle: string;
    features: {
      title: string;
      description: string;
      icon: 'Utensils' | 'Zap' | 'Smile';
    }[];
  };
  bestseller: {
    title: string;
    subtitle: string;
  };
  location: {
    title: string;
    subtitle: string;
  };
}
