
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Star, Cookie, Utensils, Zap, Smile } from 'lucide-react';
import { useData } from '../providers/data-provider';
import LocationSection from '../components/LocationSection';

const WaffleIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
    <path d="M9 3v18" />
    <path d="M15 3v18" />
  </svg>
);

const ICON_MAP: Record<string, React.ElementType> = {
  'Utensils': Utensils,
  'Zap': Zap,
  'Smile': Smile
};

const Home: React.FC = () => {
  const { menu: menuData, siteContent } = useData();
  const bestsellers = menuData.flatMap(cat => cat.items).filter(item => 
    ['Killer Kitkat', 'Nutella Delight', 'Lotus Biscoff Delight'].includes(item.name)
  );

  const bestSellerImages: Record<string, string> = {
    'Killer Kitkat': 'https://99pancakes.in/cdn/shop/products/KitKat_1.jpg',
    'Nutella Delight': 'https://i.pinimg.com/236x/ef/54/7f/ef547f67b7404238f495b22da3e7a5f6.jpg',
    'Lotus Biscoff Delight': 'https://cdn.foodaciously.com/static/recipes/0f341be9-ac36-40f5-9b3e-b55428f61de5/biscoff-waffles-0a65b4d73368ea4782df2ca506e546bc-1920-q60.jpg'
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1562444030-7114b8446530?q=80&w=600&auto=format&fit=crop';
  
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
        
        {/* Layer 1: Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover"
            poster={siteContent.hero.videoPoster}
          >
            <source src={siteContent.hero.videoUrl} type="video/mp4" />
          </video>
          {/* Tint Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-pink-50/60 mix-blend-overlay" />
          <div className="absolute inset-0 bg-white/40" />
        </div>

        {/* Layer 2: Decorative Floating Icons */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <WaffleIcon className="absolute top-[10%] left-[15%] text-pink-600 w-24 h-24 animate-drift opacity-20" />
          <Cookie className="absolute top-[40%] left-[8%] text-pink-500 w-32 h-32 animate-drift opacity-20 delay-1000" />
          <WaffleIcon className="absolute bottom-[15%] left-[30%] text-pink-600 w-20 h-20 animate-drift opacity-20 delay-2000" />
          <Cookie className="absolute top-[20%] right-[25%] text-white w-48 h-48 animate-drift opacity-40 delay-500 drop-shadow-lg" />
          <WaffleIcon className="absolute bottom-[30%] right-[15%] text-pink-500 w-28 h-28 animate-drift opacity-20 delay-1500" />
          <Cookie className="absolute top-[65%] right-[5%] text-white w-16 h-16 animate-drift opacity-30 delay-3000" />
          {/* Extra floating elements for density */}
          <WaffleIcon className="absolute top-[5%] right-[40%] text-pink-400 w-12 h-12 animate-drift opacity-10 delay-700" />
          <WaffleIcon className="absolute bottom-[5%] left-[10%] text-pink-400 w-16 h-16 animate-drift opacity-10 delay-2500" />
        </div>

        {/* Decorative Shape on Right */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 bg-[#FFB7C5]/90 rounded-l-[100px] hidden lg:block z-10 shadow-2xl backdrop-blur-sm" />
        
        {/* Layer 3: Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="relative">
               <h1 className="text-6xl md:text-8xl font-playful font-bold leading-tight mb-4 drop-shadow-sm">
                {siteContent.hero.titleLine1} <span className="text-[#FFB7C5] lg:text-black">{siteContent.hero.titleHighlight}</span>
              </h1>
              <p className="font-handwritten text-4xl text-pink-500 lg:text-pink-600 drop-shadow-sm">
                {siteContent.hero.subtitle}
              </p>
            </div>
            <p className="text-xl text-gray-800 max-w-lg leading-relaxed font-medium">
              {siteContent.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link
                to="/menu"
                className="w-full sm:w-auto bg-[#FFB7C5] text-black px-10 py-5 rounded-full text-lg font-bold shadow-lg transition-all hover:scale-105 hover:bg-[#ff96ac] flex items-center justify-center gap-2 bouncy-hover"
              >
                {siteContent.hero.ctaText1} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/story"
                className="w-full sm:w-auto bg-black text-white px-10 py-5 rounded-full text-lg font-bold transition-all hover:bg-gray-800 flex items-center justify-center gap-2 bouncy-hover"
              >
                {siteContent.hero.ctaText2}
              </Link>
            </div>
          </div>
          
          <div className="relative flex justify-center items-center py-12 lg:py-0">
            {/* Enhanced Steam Wisps Wrapper */}
            <div className="absolute bottom-1/4 flex justify-center items-center pointer-events-none w-full h-1/2 z-10">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-16 h-24 bg-gradient-to-t from-white/30 to-transparent blur-2xl rounded-full animate-steam"
                  style={{ 
                    left: `${35 + (i * 8)}%`,
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: `${4 + (i % 3)}s`
                  }} 
                />
              ))}
            </div>

            <div className="absolute w-[80%] aspect-square bg-pink-100/50 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="relative group">
              {/* Featured Waffle Image */}
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl transform lg:rotate-6 group-hover:rotate-0 transition-transform duration-700 animate-float border-8 border-white bg-white">
                 <img 
                   src={siteContent.hero.heroImage} 
                   alt="Featured Waffle"
                   className="w-full max-w-lg aspect-square object-cover"
                 />
                 <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              </div>
              
              {/* Floating Embellishments */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-3xl shadow-xl animate-float delay-700 z-20">
                <Star className="text-yellow-400 fill-yellow-400 w-8 h-8" />
              </div>
              <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-3xl shadow-xl animate-float delay-1000 z-20">
                <Heart className="text-pink-500 fill-pink-500 w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playful font-bold mb-4">{siteContent.experience.title}</h2>
          <div className="w-24 h-2 bg-[#FFB7C5] mx-auto rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteContent.experience.features.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] || Utensils;
            return (
              <div key={i} className="p-10 rounded-[40px] border border-pink-100 hover:border-[#FFB7C5] transition-all hover:shadow-xl group bg-white bouncy-hover">
                <div className="w-20 h-20 bg-pink-50 rounded-3xl flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform">
                  <Icon className="w-10 h-10 text-[#FFB7C5]" />
                </div>
                <h3 className="text-2xl font-playful font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bestseller Section */}
      <section className="py-24 bg-pink-50/50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-playful font-bold mb-4">{siteContent.bestseller.title}</h2>
            <p className="text-gray-600 text-xl">{siteContent.bestseller.subtitle}</p>
          </div>
          <Link to="/menu" className="text-lg font-bold text-[#FFB7C5] hover:text-[#ff96ac] flex items-center gap-2 group">
            See all menu <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-8 min-w-max md:min-w-0">
            {bestsellers.map((item) => (
              <div key={item.id} className="w-[300px] md:w-1/3 bg-white rounded-[40px] p-6 shadow-lg hover:shadow-2xl transition-all group border border-transparent hover:border-[#FFB7C5] bouncy-hover">
                <div className="relative rounded-[30px] overflow-hidden mb-6 aspect-square">
                  <img 
                    src={item.image || bestSellerImages[item.name] || fallbackImage} 
                    alt={item.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImage;
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                    Bestseller
                  </div>
                </div>
                <h4 className="text-2xl font-playful font-bold mb-2">{item.name}</h4>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-pink-600 font-bold text-xl">₹{item.prices.sticks}</span>
                  <Link to="/menu" className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-black/80 transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Location Section */}
      <div id="visit" className="relative z-20">
        <LocationSection />
      </div>
    </div>
  );
};

export default Home;
