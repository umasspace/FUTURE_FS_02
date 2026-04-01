
import React from 'react';
import { MapPin, Phone, Send, MessageCircle } from 'lucide-react';
import { useData } from '../providers/data-provider';
import { Branch as BranchType } from '../types';

interface BranchProps extends BranchType {}

const BranchCard: React.FC<BranchProps> = ({ name, address, phone, displayPhone, mapsUrl, whatsappMsg }) => {
  const whatsappUrl = `https://wa.me/${phone.replace(/\s+/g, '')}?text=${encodeURIComponent(whatsappMsg || "Hi Wafflewala! I'm craving some delicious waffles.")}`;

  return (
    <div className="bg-pink-50/30 rounded-[40px] p-8 border border-pink-100 hover:border-[#FFB7C5] transition-all group/card">
      <h3 className="text-2xl font-playful font-bold mb-6 flex items-center gap-3">
        <div className="w-2 h-8 bg-[#FFB7C5] rounded-full" />
        {name}
      </h3>
      
      <div className="space-y-4">
        {/* Location Link */}
        <a 
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-4 p-3 -m-3 rounded-2xl transition-all hover:bg-white group block"
        >
          <div className="shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-[#FFB7C5] transition-colors shadow-sm">
            <MapPin className="w-6 h-6 text-[#FFB7C5] group-hover:text-white transition-colors" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider group-hover:text-[#FFB7C5] transition-colors">Find Us</h4>
            <p className="text-gray-700 font-medium leading-tight">{address}</p>
          </div>
        </a>

        {/* Call Link */}
        <a 
          href={`tel:+${phone.replace(/\s+/g, '')}`}
          className="flex gap-4 p-3 -m-3 rounded-2xl transition-all hover:bg-white group block"
        >
          <div className="shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-[#FFB7C5] transition-colors shadow-sm">
            <Phone className="w-6 h-6 text-[#FFB7C5] group-hover:text-white transition-colors" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider group-hover:text-[#FFB7C5] transition-colors">Call Us</h4>
            <p className="text-gray-700 font-bold text-lg">{displayPhone}</p>
          </div>
        </a>

        {/* WhatsApp Link - Themed */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-4 p-3 -m-3 rounded-2xl transition-all hover:bg-white group block"
        >
          <div className="shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-[#FFB7C5] transition-colors shadow-sm">
            <MessageCircle className="w-6 h-6 text-[#FFB7C5] group-hover:text-white transition-colors" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider group-hover:text-[#FFB7C5] transition-colors">WhatsApp</h4>
            <p className="text-gray-700 font-medium">Chat with {name} team</p>
          </div>
        </a>
      </div>
      
      <div className="mt-8">
        <a 
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-black text-white py-4 rounded-2xl font-bold transition-all hover:bg-gray-800 shadow-lg group-hover/card:shadow-[#FFB7C5]/20"
        >
          Get Directions <Send className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

const LocationSection: React.FC = () => {
  const { branches, siteContent } = useData();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-playful font-bold mb-6">{siteContent.location.title}</h2>
          <p className="text-xl text-gray-500 font-medium">{siteContent.location.subtitle}</p>
          <div className="w-24 h-2 bg-[#FFB7C5] mx-auto rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {branches.map((branch, index) => (
            <BranchCard key={index} {...branch} />
          ))}
        </div>

        {/* Live Map Preview (General View) */}
        <div className="mt-16 relative h-[400px] rounded-[50px] overflow-hidden shadow-2xl border-8 border-white group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3361848529594!2d78.3573809!3d17.439931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb930060a80117%3A0x6a8ac330a743cff!2sWaffleWala!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
