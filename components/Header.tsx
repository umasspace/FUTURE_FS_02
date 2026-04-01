
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, Cookie, ShoppingCart } from 'lucide-react';
import { NAVIGATION } from '../constants';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-[#FFB7C5] rounded-xl transform group-hover:rotate-12 transition-transform">
              <Cookie className="w-8 h-8 text-black" />
            </div>
            <span className="text-2xl font-playful font-bold tracking-tight">Wafflewala</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAVIGATION.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#FFB7C5] ${
                  isActive(link.href) ? 'text-[#FFB7C5]' : 'text-black'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-black hover:text-[#FFB7C5] transition-colors group"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFB7C5] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              to="/#visit"
              className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold transition-all hover:bg-black/90 hover:shadow-[0_0_15px_rgba(255,183,197,0.5)] bouncy-hover"
              onClick={() => {
                 const el = document.getElementById('visit');
                 if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Visit Us
            </Link>
          </nav>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-black"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFB7C5] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-black hover:bg-pink-50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-pink-50 py-4 px-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
          {NAVIGATION.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-lg font-medium ${
                isActive(link.href) ? 'bg-pink-50 text-[#FFB7C5]' : 'text-black hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/#visit"
            onClick={() => {
              setIsOpen(false);
              const el = document.getElementById('visit');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block w-full text-center bg-black text-white py-4 rounded-xl font-bold mt-4"
          >
            Visit Us
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
