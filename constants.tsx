
import React from 'react';
import { Utensils, Zap, Smile } from 'lucide-react';
import { MenuCategory, Branch } from './types';
import { DEFAULT_MENU, DEFAULT_BRANCHES, DEFAULT_GALLERY, DEFAULT_CONFIG } from './defaults';

export const COLORS = {
  primary: '#FFFFFF',
  brand: '#FFB7C5',
  text: '#000000',
  secondaryText: '#333333',
};

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Our Story', href: '/story' },
  { name: 'Gallery', href: '/gallery' },
];

export const INITIAL_MENU_DATA = DEFAULT_MENU;
export const INITIAL_BRANCHES = DEFAULT_BRANCHES;
export const INITIAL_GALLERY_IMAGES = DEFAULT_GALLERY;
export const INITIAL_APP_CONFIG = DEFAULT_CONFIG;

export const FEATURES = [
  {
    title: 'Freshly Baked',
    description: 'Baked fresh on every order to ensure that perfect crunch.',
    Icon: Utensils,
  },
  {
    title: 'Premium Chocolate',
    description: 'We use only the finest Belgian and specialty chocolates.',
    Icon: Zap,
  },
  {
    title: 'Pocket Friendly',
    description: 'Luxury taste at prices that will make you smile.',
    Icon: Smile,
  },
];

// Helper functions for dynamic data
// DEPRECATED: Use DataContext instead
export const getMenuData = (): MenuCategory[] => {
  const stored = localStorage.getItem('wafflewala_menu');
  return stored ? JSON.parse(stored) : INITIAL_MENU_DATA;
};

export const getBranchData = (): Branch[] => {
  const stored = localStorage.getItem('wafflewala_branches');
  return stored ? JSON.parse(stored) : INITIAL_BRANCHES;
};

export const getGalleryData = (): string[] => {
  const stored = localStorage.getItem('wafflewala_gallery');
  return stored ? JSON.parse(stored) : INITIAL_GALLERY_IMAGES;
}

export const getAppConfig = () => {
  const stored = localStorage.getItem('wafflewala_config');
  return stored ? JSON.parse(stored) : INITIAL_APP_CONFIG;
}
