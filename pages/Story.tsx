
import React from 'react';
import { Heart, Sparkles, Utensils } from 'lucide-react';

const Story: React.FC = () => {
  // Updated brand image URL from the user request
  const brandImageUrl = "https://i.pinimg.com/736x/5d/21/79/5d217967470cd719c4f2abde058cfd6a.jpg";

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FFB7C5]/30 rounded-full blur-3xl" />
            <div className="rounded-[60px] shadow-2xl relative z-10 w-full aspect-[4/5] overflow-hidden border-8 border-white bg-gray-50">
              <img 
                src={brandImageUrl} 
                alt="Wafflewala Brand Story" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback for non-direct image links
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop";
                }}
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[40px] shadow-2xl z-20 max-w-xs animate-float border border-pink-50">
              <p className="font-handwritten text-3xl text-pink-500 mb-2">Since 2024</p>
              <p className="text-gray-600 italic font-medium">"It started with a dream of the perfect crunch..."</p>
            </div>
          </div>

          <div className="space-y-8">
            <h1 className="text-6xl font-playful font-bold">Our Story</h1>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              Wafflewala was born out of a simple passion: to make people smile one waffle at a time. What started as a small kitchen experiment with chocolate and batter soon turned into Hyderabad's favorite dessert destination.
            </p>
            
            <div className="space-y-6">
               {[
                 { title: 'The Mission', text: 'To serve world-class waffles at prices that everyone can enjoy.', icon: Sparkles },
                 { title: 'The Quality', text: 'We never compromise. Only the finest ingredients go into our batter and toppings.', icon: Utensils },
                 { title: 'The Vibe', text: 'Wafflewala is not just about food; it is about the "Love at First Bite" experience.', icon: Heart }
               ].map((item, i) => (
                 <div key={i} className="flex gap-6 items-start">
                   <div className="shrink-0 w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center">
                     <item.icon className="w-6 h-6 text-[#FFB7C5]" />
                   </div>
                   <div>
                     <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                     <p className="text-gray-500 font-medium">{item.text}</p>
                   </div>
                 </div>
               ))}
            </div>

            <div className="p-8 bg-pink-50 rounded-[40px] border border-pink-100 italic text-gray-600 font-medium">
               "At Wafflewala, we don't just sell waffles. We sell a moment of pure, sugary bliss. Whether you're celebrating a win or cheering yourself up, we've got the perfect loaded glass for you."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
