
import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Instagram, Heart } from 'lucide-react';
import { useData } from '../providers/data-provider';

const Footer: React.FC = () => {
  const { siteContent } = useData();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 group w-fit">
              <div className="p-2 bg-[#FFB7C5] rounded-xl transition-transform group-hover:rotate-12">
                <Cookie className="w-8 h-8 text-black" />
              </div>
              <span className="text-3xl font-playful font-bold tracking-tight">Wafflewala</span>
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed text-lg italic">
              {siteContent.footer.aboutText}
            </p>
            <div className="flex gap-4">
              <a 
                href={siteContent.social.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all hover:bg-[#FFB7C5] hover:border-[#FFB7C5] hover:text-black group"
              >
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-playful font-bold mb-8 text-[#FFB7C5]">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-white transition-colors">Full Menu</Link></li>
              <li><Link to="/story" className="text-gray-400 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/#visit" onClick={() => document.getElementById('visit')?.scrollIntoView({behavior: 'smooth'})} className="text-gray-400 hover:text-white transition-colors">Location</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-playful font-bold mb-8 text-[#FFB7C5]">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            Copyright &copy; {new Date().getFullYear()}{' '}
            <Link to="/" onClick={scrollToTop} className="text-[#FFB7C5] hover:text-white transition-colors font-bold">
              {siteContent.footer.copyrightText || 'Wafflewala'}
            </Link>
            . All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Link to="/admin"><Heart className="w-4 h-4 text-[#FFB7C5] fill-[#FFB7C5] hover:scale-110 transition-transform cursor-pointer" /></Link> for waffle lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
