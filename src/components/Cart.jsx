import React, { useEffect, useRef } from 'react';
import { X, Trash2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const cartRef = useRef(null);
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex overflow-hidden">
      <div className="flex-1" onClick={onClose}></div>
      
      <div 
        ref={cartRef}
        className="w-full max-w-md bg-white dark:bg-gray-900 h-full flex flex-col shadow-xl animate-slide-in"
      >
        <div className="py-5 px-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold">My Bag ({cartItems.length})</h2>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto py-4 px-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-1">Your bag is empty</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added any products to your bag yet.</p>
              <button 
                className="cta-button"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id || Math.random()} className="flex border-b border-gray-200 dark:border-gray-800 pb-6">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        {item.brand && <p className="text-sm text-gray-500 dark:text-gray-400">{item.brand}</p>}
                        
                        {item.selectedColor && (
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Color:</span>
                            <span 
                              className="h-4 w-4 rounded-full inline-block border border-gray-300 dark:border-gray-600"
                              style={{ backgroundColor: item.selectedColor }}
                            ></span>
                          </div>
                        )}
                      </div>
                      
                      <p className="font-bold">${item.price}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center">
                        <button 
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => onUpdateQuantity(item.id, Math.max((item.quantity || 1) - 1, 1))}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 8H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                        
                        <span className="w-8 text-center font-medium text-sm">{item.quantity || 1}</span>
                        
                        <button 
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 4V12M4 8H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                      
                      <button 
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-800 py-5 px-6">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
              <span className="font-bold">${calculateTotal().toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between mb-6">
              <span className="text-gray-600 dark:text-gray-300">Shipping</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
            
            <Link 
              to="/checkout" 
              className="w-full py-3 bg-luxury-blue text-white rounded-full font-medium button-hover flex items-center justify-center"
              onClick={onClose}
            >
              Proceed to Checkout
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
            
            <button 
              className="w-full py-3 mt-3 border border-gray-300 dark:border-gray-700 rounded-full font-medium button-hover"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
