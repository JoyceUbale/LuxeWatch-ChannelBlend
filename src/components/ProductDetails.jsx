
import React, { useState, useRef, useEffect } from 'react';
import { X, Star, ShoppingBag, ChevronRight, ChevronLeft } from 'lucide-react';

const ProductDetails = ({ product, onClose, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  
  const images = product.images || [product.image];
  
  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Fade in animation
    if (modalRef.current) {
      modalRef.current.style.opacity = '0';
      setTimeout(() => {
        if (modalRef.current) modalRef.current.style.opacity = '1';
      }, 10);
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  useEffect(() => {
    // Handle escape key to close modal
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) onClose();
  };
  
  // 3D rotation effect for product image
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateY = ((x / rect.width) - 0.5) * 20;
    const rotateX = ((y / rect.height) - 0.5) * -20;
    
    imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const resetImageTransform = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      imageRef.current.style.transition = 'transform 0.6s ease';
    }
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const changeQuantity = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };
  
  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity,
      selectedColor,
    });
    onClose();
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 overflow-auto"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-xl animate-scale-in overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="grid md:grid-cols-2 h-full">
          {/* Product Image Section */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 md:p-8 flex flex-col overflow-auto">
            <div 
              className="relative flex-1 flex items-center justify-center"
              onMouseMove={handleMouseMove}
              onMouseLeave={resetImageTransform}
            >
              <div ref={imageRef} className="transition-transform duration-200 w-full">
                <img 
                  src={images[currentImageIndex]} 
                  alt={product.name} 
                  className="w-full h-auto object-contain max-h-[400px]"
                />
              </div>
              
              {/* Image navigation buttons */}
              {images.length > 1 && (
                <>
                  <button 
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-lg"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white shadow-lg"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail navigation */}
            {images.length > 1 && (
              <div className="flex justify-center space-x-3 mt-6">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    className={`h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex ? 'border-luxury-blue ring-2 ring-luxury-blue/30' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details Section */}
          <div className="p-6 md:p-8 overflow-auto">
            <span className="inline-block px-3 py-1 bg-luxury-blue/10 text-luxury-blue rounded-full text-xs font-medium mb-3">
              {product.brand}
            </span>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h2>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className="h-4 w-4 text-yellow-400" 
                    fill={star <= (product.rating || 5) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                {product.reviewCount || 128} reviews
              </span>
            </div>
            
            <p className="text-2xl font-bold mb-6">${product.price}</p>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex space-x-8">
                <button 
                  className={`pb-3 text-sm font-medium transition-colors ${
                    activeTab === 'description' 
                      ? 'border-b-2 border-luxury-blue text-luxury-blue' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button 
                  className={`pb-3 text-sm font-medium transition-colors ${
                    activeTab === 'features' 
                      ? 'border-b-2 border-luxury-blue text-luxury-blue' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('features')}
                >
                  Features
                </button>
                <button 
                  className={`pb-3 text-sm font-medium transition-colors ${
                    activeTab === 'reviews' 
                      ? 'border-b-2 border-luxury-blue text-luxury-blue' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === 'description' && (
                <div className="prose dark:prose-invert max-w-none">
                  <p>{product.description || product.shortDescription}</p>
                </div>
              )}
              
              {activeTab === 'features' && (
                <div className="space-y-4">
                  <ul className="space-y-2">
                    {(product.features || [
                      "Premium sapphire crystal display",
                      "Water resistant up to 50 meters",
                      "Heart rate and ECG monitoring",
                      "GPS and cellular connectivity",
                      "7-day battery life",
                      "Wireless charging capability"
                    ]).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="bg-luxury-blue text-white h-5 w-5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {(product.reviews || [
                    {
                      id: 1,
                      user: "Alex Johnson",
                      rating: 5,
                      date: "March 15, 2024",
                      comment: "Absolutely stunning timepiece. The attention to detail is remarkable, and the smart features integrate seamlessly with my daily routine."
                    },
                    {
                      id: 2,
                      user: "Samantha Lee",
                      rating: 4,
                      date: "March 10, 2024",
                      comment: "Beautiful design and intuitive interface. Battery life is impressive. Only giving 4 stars because the band could be more comfortable."
                    },
                    {
                      id: 3,
                      user: "Michael Chen",
                      rating: 5,
                      date: "February 28, 2024",
                      comment: "Worth every penny. The craftsmanship is exceptional, and it's become an essential part of my everyday life."
                    }
                  ]).map(review => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-5">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{review.user}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star}
                            className="h-4 w-4 text-yellow-400" 
                            fill={star <= review.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Color Selection */}
            {product.colors && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Select Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`h-10 w-10 rounded-full border-2 transition-all ${
                        selectedColor === color 
                          ? 'ring-2 ring-luxury-blue/50 border-luxury-blue' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center">
                <button 
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => changeQuantity(-1)}
                  disabled={quantity <= 1}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                
                <span className="w-12 text-center font-medium">{quantity}</span>
                
                <button 
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => changeQuantity(1)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 4V12M4 8H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              className="w-full py-3 bg-luxury-black dark:bg-white text-white dark:text-luxury-black rounded-full font-medium button-hover flex items-center justify-center"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
