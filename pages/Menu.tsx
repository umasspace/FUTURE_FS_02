
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../providers/data-provider';
import { Star, Sparkles, Coffee, Zap, MapPin, X, ZoomIn, Plus } from 'lucide-react';
import { CartItem, MenuItem } from '../types';

interface MenuProps {
  onAddToCart: (item: CartItem) => void;
}

const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<{ url: string; alt: string } | null>(null);
  const { menu: menuData } = useData();

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [lightbox]);

  const handleVisitRedirect = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('visit');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const itemImageMap: Record<string, string> = {
    'Dark Delight': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGONjnQi5V4VOIMN1B_Rvzzlix_FH8uvo0bQ&s',
    'Milke Delight': 'https://99pancakes.in/cdn/shop/files/Milky_Mania_waffle.jpg?v=1755019469&width=1920',
    'White Delight': 'https://b.zmtcdn.com/data/reviews_photos/3fa/4d779f35369b9d381b5b74943748b3fa_1753019343.jpg?fit=around|750:500&crop=750:500;*,*',
    'Triple Delight': 'https://b.zmtcdn.com/data/dish_photos/48d/f13c4debb983937fb7a885f62a30f48d.jpg',
    'Choco Oreo Delight': 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2025/4/10/b4d95442-f7a8-4f7c-91b5-cd6ff162a8ce_ba736278-d30c-41a3-984b-608647ded442.png',
    'Killer Kitkat': 'https://99pancakes.in/cdn/shop/products/KitKat_1.jpg',
    'Nutella Delight': 'https://i.pinimg.com/236x/ef/54/7f/ef547f67b7404238f495b22da3e7a5f6.jpg',
    'Choco Chips Delight': 'https://bakingmischief.com/wp-content/uploads/2021/02/chocolate-chip-waffles-image-square-3.jpg',
    'Blueberry Bite': 'https://www.designeatrepeat.com/wp-content/uploads/2024/11/blueberry-waffles-featured-500x375.jpg',
    'Strawberry Burst': 'https://www.frugalmomeh.com/wp-content/uploads/2022/06/Strawberry-Waffles-14-scaled-720x720.jpg',
    'Lotus Biscoff Delight': 'https://cdn.foodaciously.com/static/recipes/0f341be9-ac36-40f5-9b3e-b55428f61de5/biscoff-waffles-0a65b4d73368ea4782df2ca506e546bc-1920-q60.jpg',
    'Red Velvet Triple Delight': 'https://99pancakes.in/cdn/shop/files/Red_Velvet_waffle.jpg',
    'Loaded Choco-Berry Glass': 'https://assets.telegraphindia.com/telegraph/2024/Jan/1704464682_lead-59.jpg',
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1562444030-7114b8446530?q=80&w=400&auto=format&fit=crop';
  const getItemImage = (name: string) => itemImageMap[name] || fallbackImage;

  const handleAdd = (item: MenuItem, size: string, price: number) => {
    onAddToCart({
      cartId: `${item.id}-${size}`,
      id: item.id,
      name: item.name,
      size,
      price,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Lightbox Modal */}
      {lightbox && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors bg-white/10 p-4 rounded-full backdrop-blur-md">
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <img 
              src={lightbox.url} 
              alt={lightbox.alt}
              className="w-full max-h-[80vh] object-contain rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="mt-6 text-white text-3xl font-playful font-bold">{lightbox.alt}</p>
            <p className="text-pink-300 font-handwritten text-2xl">Prathi bite lo, delight!</p>
          </div>
        </div>
      )}

      {/* Menu Header */}
      <section className="bg-pink-50 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-10 animate-float">
          <Zap className="w-64 h-64 text-[#FFB7C5]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-playful font-bold mb-6">Our Menu</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-medium">
            Choose your format: <span className="font-bold text-black">Waffle Stick</span>, <span className="font-bold text-black">8pcs Pancakes</span>, or <span className="font-bold text-black">10pcs Pancakes</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest text-pink-500">
            <span className="flex items-center gap-2"><Star className="w-4 h-4" /> Sticks</span>
            <span className="flex items-center gap-2"><Star className="w-4 h-4" /> 8 Pcs</span>
            <span className="flex items-center gap-2"><Star className="w-4 h-4" /> 10 Pcs</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-32">
          {menuData.map((category, catIdx) => (
            <div key={catIdx} className="relative">
              {/* Category Decoration */}
              {catIdx % 2 !== 0 && (
                <div className="absolute -left-20 top-0 opacity-5 hidden lg:block">
                  <Coffee className="w-48 h-48" />
                </div>
              )}
              
              <div className="mb-12 text-center md:text-left">
                <p className="font-handwritten text-4xl text-pink-500 mb-2">
                  {category.tagline}
                </p>
                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <h2 className={`text-4xl md:text-5xl font-playful font-bold ${category.premium ? 'text-black flex items-center gap-3' : 'text-black'}`}>
                    {category.title}
                    {category.premium && <Sparkles className="w-8 h-8 text-yellow-500 fill-yellow-500" />}
                  </h2>
                </div>
                <div className="w-16 h-2 bg-pink-100 mt-4 rounded-full" />
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {category.items.map((item) => (
                  <div 
                    key={item.id} 
                    className={`glass-card p-6 md:p-8 rounded-[40px] shadow-sm hover:shadow-xl transition-all border group flex flex-col sm:flex-row gap-6 items-center
                      ${item.featured ? 'border-yellow-200 bg-yellow-50/30' : 'border-pink-50 hover:border-[#FFB7C5]'}
                    `}
                  >
                    <button 
                      onClick={() => setLightbox({ url: getItemImage(item.name), alt: item.name })}
                      className="w-full sm:w-32 aspect-square rounded-3xl overflow-hidden shrink-0 shadow-md group/img relative cursor-zoom-in active:scale-95 transition-transform"
                    >
                      <img 
                        src={getItemImage(item.name)} 
                        alt={item.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = fallbackImage;
                        }}
                        className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover/img:opacity-100 transition-opacity" />
                      </div>
                    </button>
                    <div className="flex-grow w-full">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl md:text-2xl font-playful font-bold flex items-center gap-2">
                          {item.name}
                          {item.seasonal && <span className="bg-pink-100 text-pink-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Seasonal</span>}
                        </h3>
                        {item.featured && <span className="bg-yellow-400 text-black text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Must Try</span>}
                      </div>

                      {item.isSingleUnit ? (
                        <div className="bg-[#FFB7C5]/10 border-2 border-[#FFB7C5]/20 p-4 rounded-3xl text-center relative group/add">
                           <p className="text-2xl font-bold text-black">₹{item.prices.sticks}</p>
                           <p className="text-sm font-bold text-[#FFB7C5] uppercase tracking-widest">{item.unitLabel || 'Per Unit'}</p>
                           <button 
                             onClick={() => handleAdd(item, item.unitLabel || 'Unit', item.prices.sticks)}
                             className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-xl hover:scale-110 active:scale-90 transition-all opacity-0 group-hover/add:opacity-100"
                           >
                              <Plus className="w-4 h-4" />
                           </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                          <button 
                            onClick={() => handleAdd(item, 'Stick', item.prices.sticks)}
                            className="bg-white/80 p-3 rounded-2xl shadow-sm hover:bg-[#FFB7C5]/10 hover:shadow-md transition-all active:scale-95 group/btn relative"
                          >
                            <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Sticks</p>
                            <p className="text-lg font-bold text-black">₹{item.prices.sticks}</p>
                            <div className="absolute -top-1 -right-1 bg-black text-white p-1 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity">
                               <Plus className="w-3 h-3" />
                            </div>
                          </button>
                          <button 
                            onClick={() => handleAdd(item, '8 Pcs', item.prices.pancakes8)}
                            className="bg-white/80 p-3 rounded-2xl shadow-sm hover:bg-[#FFB7C5]/10 hover:shadow-md transition-all active:scale-95 group/btn relative"
                          >
                            <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">8 Pcs</p>
                            <p className="text-lg font-bold text-black">₹{item.prices.pancakes8}</p>
                            <div className="absolute -top-1 -right-1 bg-black text-white p-1 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity">
                               <Plus className="w-3 h-3" />
                            </div>
                          </button>
                          <button 
                            onClick={() => handleAdd(item, '10 Pcs', item.prices.pancakes10)}
                            className="bg-white/80 p-3 rounded-2xl shadow-sm hover:bg-[#FFB7C5]/10 hover:shadow-md transition-all active:scale-95 group/btn relative"
                          >
                            <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">10 Pcs</p>
                            <p className="text-lg font-bold text-black">₹{item.prices.pancakes10}</p>
                            <div className="absolute -top-1 -right-1 bg-black text-white p-1 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity">
                               <Plus className="w-3 h-3" />
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Seasonal Special Banner */}
              {category.items.some(i => i.name === 'Loaded Choco-Berry Glass') && (
                <div className="mt-16 bg-gradient-to-r from-pink-500 to-pink-400 rounded-[50px] p-12 text-white overflow-hidden relative group shadow-2xl">
                   <div 
                     className="absolute right-0 top-0 w-1/3 h-full overflow-hidden opacity-40 cursor-zoom-in hover:opacity-60 transition-opacity"
                     onClick={() => setLightbox({ url: getItemImage('Loaded Choco-Berry Glass'), alt: 'Loaded Choco-Berry Glass' })}
                   >
                      <img 
                        src={getItemImage('Loaded Choco-Berry Glass')} 
                        className="w-full h-full object-cover rounded-l-full group-hover:scale-105 transition-transform duration-700" 
                        alt="Seasonal"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = fallbackImage;
                        }}
                      />
                   </div>
                   <div className="relative z-10 max-w-xl">
                      <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase mb-6 inline-block">Featured Seasonal Delight</span>
                      <h3 className="text-4xl md:text-5xl font-playful font-bold mb-6">Loaded Choco-Berry Glass</h3>
                      <p className="text-pink-50 text-xl mb-8 leading-relaxed font-medium">A massive glass filled with layers of melted Belgian chocolate, fresh seasonal berries, and crispy warm waffle bites. Pure indulgence!</p>
                      <div className="flex flex-wrap items-center gap-6">
                         <div className="flex items-center gap-4">
                            <span className="text-4xl font-bold">₹120</span>
                            <span className="h-10 w-[1px] bg-white/30" />
                            <span className="font-handwritten text-3xl">Per Glass • Limited!</span>
                         </div>
                         <button 
                           onClick={() => {
                             const item = category.items.find(i => i.name === 'Loaded Choco-Berry Glass');
                             if (item) handleAdd(item, 'Glass', 120);
                           }}
                           className="bg-black text-white px-8 py-4 rounded-full font-bold shadow-2xl hover:bg-black/90 transition-all flex items-center gap-2 bouncy-hover"
                         >
                            Add to Cart <Plus className="w-4 h-4" />
                         </button>
                      </div>
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Updated Placement for Disclaimer - Moved higher up */}

      </section>

      {/* Allergens Notice */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h4 className="text-xl font-bold mb-4">Note for Our Friends</h4>
          <p className="text-gray-500 leading-relaxed italic text-lg">
            All our items are freshly prepared. Please inform our staff about any allergies before ordering. 
            We use dairy, nuts, and gluten in our kitchen. Prices are inclusive of all taxes. 
            <br />
            Pakka Paisa Vasool promise on every bite!
          </p>
          <button 
            onClick={handleVisitRedirect}
            className="mt-8 inline-flex items-center gap-2 text-[#FFB7C5] font-bold hover:underline text-lg mb-8"
          >
            Find our stall <MapPin className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Menu;
