
import React, { useState, useRef } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const cardRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    // Get position of mouse relative to card
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const rotateY = ((x / rect.width) - 0.5) * 10; // Max 10 degree rotation
    const rotateX = ((y / rect.height) - 0.5) * -10; // Max 10 degree rotation, inverted
    
    // Apply rotation and lift effect
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };
  
  const resetTransform = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  };
  
  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const addToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div 
      ref={cardRef}
      className="product-card cursor-pointer transition-all duration-300"
      onClick={onViewDetails}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        resetTransform();
      }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square bg-luxury-gray rounded-t-2xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        
        {/* Favorite Button */}
        <button 
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'
          }`}
          onClick={toggleFavorite}
          aria-label="Add to favorites"
        >
          <Heart className="w-5 h-5" fill={isFavorite ? "white" : "none"} />
        </button>
        
        {/* Brand Tag */}
        <div className="absolute top-4 left-4 py-1 px-3 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium">
          {product.brand}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium">{product.name}</h3>
          <span className="font-display font-bold">${product.price}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{product.shortDescription}</p>
        
        <div className="flex space-x-3">
          <button
            className="flex-1 bg-luxury-black text-white dark:bg-white dark:text-luxury-black rounded-full py-2.5 transition-all duration-300 hover:opacity-90 button-hover flex justify-center items-center space-x-2"
            onClick={addToCart}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
      
      {/* Shine effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 rounded-2xl pointer-events-none"></div>
      )}
    </div>
  );
};

export default ProductCard;
