
import React from 'react';
import { useData } from '../providers/data-provider';

const Gallery: React.FC = () => {
  const instagramUrl = "https://www.instagram.com/waffle__wala?igsh=MXZhdWgyOGpxanFvdw==";
  const { gallery: galleryImages } = useData();

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-playful font-bold mb-6">Sweet Moments</h1>
          <p className="text-xl text-gray-500 font-medium">Warning: May cause intense sugar cravings!</p>
          <div className="w-24 h-2 bg-[#FFB7C5] mx-auto rounded-full mt-6 shadow-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((img, i) => (
            <a 
              key={i} 
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-[40px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-4 border-white"
            >
              <img 
                src={img || 'https://images.unsplash.com/photo-1562444030-7114b8446530?q=80&w=600&auto=format&fit=crop'} 
                alt={`Delicious Waffle ${i}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <div>
                   <p className="text-white font-playful text-3xl font-bold">Insta-Worthy Delight</p>
                   <p className="text-pink-300 font-bold text-lg">#WafflewalaLove</p>
                </div>
              </div>
            </a>
          ))}
        </div>



        <div className="mt-12 text-center">
           <a 
             href={instagramUrl}
             target="_blank"
             rel="noopener noreferrer"
             className="inline-block bg-[#FFB7C5] text-black px-12 py-5 rounded-full text-xl font-bold hover:scale-105 transition-all bouncy-hover shadow-xl border-2 border-white"
           >
              View More on Instagram
           </a>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
