
import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductList from '../components/ProductList';
import ProductDetails from '../components/ProductDetails';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';

const Products = () => {
  const { 
    products, 
    cart, 
    selectedProduct, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    setSelectedProduct, 
    clearSelectedProduct 
  } = useProducts();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Handle product selection for detail view
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };
  
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItems={cart} toggleCart={() => setIsCartOpen(true)} />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="mb-16 text-center">
            <span className="inline-block px-4 py-1.5 bg-luxury-blue/10 text-luxury-blue rounded-full font-medium text-sm mb-4">
              Our Collection
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Luxury Smart Timepieces</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our exquisite collection of premium smartwatches that blend sophisticated design with innovative technology.
            </p>
          </div>
          
          {/* Product List */}
          <ProductList 
            products={products} 
            onAddToCart={addToCart} 
            onViewDetails={handleViewDetails}
          />
        </div>
      </main>
      
      <Footer />
      
      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetails 
          product={selectedProduct} 
          onClose={clearSelectedProduct}
          onAddToCart={addToCart}
        />
      )}
      
      {/* Shopping Cart */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
};

export default Products;
