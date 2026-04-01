
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, Send } from 'lucide-react';
import { CartItem } from '../types';
import { useData } from '../providers/data-provider';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemove: (cartId: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { config } = useData();

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    // Generate a unique token based on current timestamp (last 4 digits)
    const token = Date.now().toString().slice(-4);
    const orderRef = `#WW-${token}`;

    // Create message summary
    const itemSummary = items
      .map(item => `• ${item.name} (${item.size}) x ${item.quantity} - ₹${item.price * item.quantity}`)
      .join('\n');
    
    const message = `*WAFFLEWALA ORDER*\n*Order Token: ${orderRef}*\n\nHey Wafflewala! I'm craving these:\n\n${itemSummary}\n\n*Total Order: ₹${total}*\n\nCan you prepare this for me? I'm on my way! 🧇✨`;
    
    // Use the configured phone number for ordering
    const url = `https://wa.me/${config.orderPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleStartSnacking = () => {
    navigate('/menu');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-500">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-pink-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFB7C5] rounded-xl">
              <ShoppingBag className="w-6 h-6 text-black" />
            </div>
            <h2 className="text-2xl font-playful font-bold">Your Treats</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-playful">Your cart is empty!</h3>
                <p className="text-gray-500 font-medium">Add some sweet treats to get started.</p>
              </div>
              <button 
                onClick={handleStartSnacking}
                className="bg-[#FFB7C5] text-black px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all"
              >
                Start Snacking
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.cartId} className="bg-gray-50 p-4 rounded-3xl flex items-center gap-4 group">
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-pink-500 text-xs font-black uppercase tracking-wider">{item.size}</p>
                    <p className="text-gray-400 font-bold mt-1">₹{item.price}</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center bg-white rounded-2xl border p-1 shadow-sm">
                      <button 
                        onClick={() => onUpdateQuantity(item.cartId, -1)}
                        className="p-1 hover:text-pink-500 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.cartId, 1)}
                        className="p-1 hover:text-pink-500 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.cartId)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-8 border-t bg-gray-50 space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 font-medium">Subtotal</p>
              <p className="text-3xl font-playful font-bold">₹{total}</p>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#FFB7C5] text-black py-5 rounded-[25px] font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                Order via WhatsApp <Send className="w-5 h-5" />
              </button>
              <p className="text-[10px] text-center text-gray-400 font-medium uppercase tracking-widest">
                Pakka Paisa Vasool promise on every bite!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
