import { MenuCategory, Branch, AppConfig, SiteContent } from './types';

export const DEFAULT_MENU: MenuCategory[] = [
  {
    title: 'Delightful Treats',
    tagline: 'Prathi bite lo, delight!',
    items: [
      { id: 'dt1', name: 'Dark Delight', prices: { sticks: 59, pancakes8: 69, pancakes10: 79 } },
      { id: 'dt2', name: 'Milke Delight', prices: { sticks: 59, pancakes8: 69, pancakes10: 79 } },
      { id: 'dt3', name: 'White Delight', prices: { sticks: 59, pancakes8: 69, pancakes10: 79 } },
      { id: 'dt4', name: 'Triple Delight', prices: { sticks: 69, pancakes8: 79, pancakes10: 89 } },
    ],
  },
  {
    title: 'Choco Bites',
    tagline: 'Jo khaye Uska din ban jaye!',
    items: [
      { id: 'cb1', name: 'Choco Oreo Delight', prices: { sticks: 69, pancakes8: 79, pancakes10: 89 } },
      { id: 'cb2', name: 'Killer Kitkat', prices: { sticks: 69, pancakes8: 79, pancakes10: 89 }, image: 'https://99pancakes.in/cdn/shop/products/KitKat_1.jpg' },
      { id: 'cb3', name: 'Nutella Delight', prices: { sticks: 79, pancakes8: 89, pancakes10: 99 }, image: 'https://i.pinimg.com/236x/ef/54/7f/ef547f67b7404238f495b22da3e7a5f6.jpg' },
      { id: 'cb4', name: 'Choco Chips Delight', prices: { sticks: 79, pancakes8: 89, pancakes10: 99 } },
    ],
  },
  {
    title: 'Fruit Bliss',
    tagline: 'Pakka Paisa Vasool',
    items: [
      { id: 'fb1', name: 'Blueberry Bite', prices: { sticks: 89, pancakes8: 99, pancakes10: 109 } },
      { id: 'fb2', name: 'Strawberry Burst', prices: { sticks: 89, pancakes8: 99, pancakes10: 109 } },
    ],
  },
  {
    title: 'Signature Special',
    tagline: 'Unche logo Ki Pasand',
    premium: true,
    items: [
      { id: 'ss1', name: 'Lotus Biscoff Delight', prices: { sticks: 89, pancakes8: 99, pancakes10: 109 }, image: 'https://cdn.foodaciously.com/static/recipes/0f341be9-ac36-40f5-9b3e-b55428f61de5/biscoff-waffles-0a65b4d73368ea4782df2ca506e546bc-1920-q60.jpg' },
      { id: 'ss2', name: 'Red Velvet Triple Delight', prices: { sticks: 89, pancakes8: 99, pancakes10: 109 } },
      { 
        id: 'ss3', 
        name: 'Loaded Choco-Berry Glass', 
        prices: { sticks: 120, pancakes8: 120, pancakes10: 120 }, 
        seasonal: true, 
        featured: true, 
        isSingleUnit: true, 
        unitLabel: 'Per Glass' 
      },
    ],
  },
];

export const DEFAULT_BRANCHES: Branch[] = [
  {
    name: "Gachibowli Branch",
    address: "Near DLF Gate 2, Gachibowli, Hyderabad - 500032",
    phone: "916302908101",
    displayPhone: "+91 63029 08101",
    mapsUrl: "https://www.google.com/maps/place/WaffleWala/@17.439931,78.3595696,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb930060a80117:0x6a8ac330a743cff!8m2!3d17.439931!4d78.3595696!16s%2Fg%2F11wv3hg71w!17m2!4m1!1e3!18m1!1e1",
    whatsappMsg: "Hi Wafflewala Gachibowli! I'm craving some delicious waffles. Can you help me with the menu?"
  },
  {
    name: "Nanakramguda Branch",
    address: "Wafflewala Stall, Nanakramguda, Hyderabad - 500032",
    phone: "919700805421",
    displayPhone: "+91 97008 05421",
    mapsUrl: "https://www.google.com/maps/search/WaffleWala+Nanakramguda",
    whatsappMsg: "Hi Wafflewala Nanakramguda! I'm craving some delicious waffles. Can you help me with the menu?"
  }
];

export const DEFAULT_GALLERY: string[] = [
  'https://99pancakes.in/cdn/shop/files/Milky_Mania_waffle.jpg?v=1755019469&width=1920',
  'https://99pancakes.in/cdn/shop/products/KitKat_1.jpg',
  'https://99pancakes.in/cdn/shop/files/Red_Velvet_waffle.jpg',
  'https://cdn.foodaciously.com/static/recipes/0f341be9-ac36-40f5-9b3e-b55428f61de5/biscoff-waffles-0a65b4d73368ea4782df2ca506e546bc-1920-q60.jpg',
  'https://www.designeatrepeat.com/wp-content/uploads/2024/11/blueberry-waffles-featured-500x375.jpg',
  'https://www.frugalmomeh.com/wp-content/uploads/2022/06/Strawberry-Waffles-14-scaled-720x720.jpg',
  'https://assets.telegraphindia.com/telegraph/2024/Jan/1704464682_lead-59.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGONjnQi5V4VOIMN1B_Rvzzlix_FH8uvo0bQ&s',
  'https://b.zmtcdn.com/data/reviews_photos/3fa/4d779f35369b9d381b5b74943748b3fa_1753019343.jpg?fit=around|750:500&crop=750:500;*,*',
  'https://b.zmtcdn.com/data/dish_photos/48d/f13c4debb983937fb7a885f62a30f48d.jpg'
];

export const DEFAULT_CONFIG: AppConfig = {
  orderPhoneNumber: '916302908101'
};

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    titleLine1: 'Love at',
    titleHighlight: 'First Bite!',
    subtitle: 'Prathi bite lo, delight!',
    description: 'Indulge in our freshly baked waffles and pancakes, loaded with premium Belgian chocolate.',
    ctaText1: 'View Menu',
    ctaText2: 'Our Story',
    videoUrl: 'https://videos.pexels.com/video-files/4684288/4684288-hd_1920_1080_30fps.mp4',
    videoPoster: 'https://images.pexels.com/videos/4684288/free-video-4684288.jpg',
    heroImage: 'https://i.pinimg.com/736x/05/c0/ff/05c0ff540a0f77f990dfa526e89e584a.jpg'
  },
  social: {
    instagramUrl: 'https://www.instagram.com/waffle__wala?igsh=MXZhdWgyOGpxanFvdw=='
  },
  footer: {
    aboutText: '"Love at First Bite! Wafflewala brings you the most indulgent treats in town. From crispy sticks to fluffy pancakes, every bite is a celebration."',
    copyrightText: 'Wafflewala'
  },
  experience: {
    title: 'The Wafflewala Experience',
    subtitle: '',
    features: [
      {
        title: 'Freshly Baked',
        description: 'Baked fresh on every order to ensure that perfect crunch.',
        icon: 'Utensils'
      },
      {
        title: 'Premium Chocolate',
        description: 'We use only the finest Belgian and specialty chocolates.',
        icon: 'Zap'
      },
      {
        title: 'Pocket Friendly',
        description: 'Luxury taste at prices that will make you smile.',
        icon: 'Smile'
      }
    ]
  },
  bestseller: {
    title: 'Crowd Favorites',
    subtitle: 'The ones that disappear in seconds.'
  },
  location: {
    title: 'Visit Us',
    subtitle: 'Come say hi at our branches!'
  }
};
