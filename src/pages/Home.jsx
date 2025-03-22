
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import ProductDetails from '../components/ProductDetails';
import { ArrowRight, Watch, ShieldCheck, Zap, Clock } from 'lucide-react';

const Index = () => {
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
  const [activeWatchIndex, setActiveWatchIndex] = useState(0);
  
  // Featured products (just take first 4)
  const featuredProducts = products.slice(0, 4);
  
  // Auto rotate through featured watches
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWatchIndex(prev => (prev + 1) % featuredProducts.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredProducts.length]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItems={cart} toggleCart={() => setIsCartOpen(true)} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Products Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-luxury-blue/10 text-luxury-blue rounded-full font-medium text-sm mb-4">
                Featured Collection
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Timeless Innovation</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover our finest selection of luxury smartwatches, where timeless elegance meets cutting-edge technology.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="opacity-0 animate-fade-in" 
                  style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
                >
                  <ProductCard 
                    product={product}
                    onAddToCart={addToCart}
                    onViewDetails={() => setSelectedProduct(product)}
                  />
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                to="/products" 
                className="inline-flex items-center px-6 py-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-luxury-blue/10 text-luxury-blue rounded-full font-medium text-sm mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Uncompromising Excellence</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Every LUXEWATCH combines exquisite craftsmanship with cutting-edge technology to deliver a truly exceptional experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-card text-center opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                <div className="bg-luxury-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Watch className="h-7 w-7 text-luxury-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">Luxury Design</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Meticulously crafted from premium materials for a timepiece that makes a statement.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-card text-center opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                <div className="bg-luxury-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-7 w-7 text-luxury-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">Advanced Technology</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Cutting-edge features and sensors provide insights and connectivity for modern life.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-card text-center opacity-0 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                <div className="bg-luxury-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-7 w-7 text-luxury-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">Battery Longevity</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Extended battery life ensures your watch is ready when you are, day after day.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-card text-center opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                <div className="bg-luxury-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="h-7 w-7 text-luxury-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lifetime Warranty</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our confidence in quality is backed by an industry-leading warranty and support.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* 3D Watch Showcase */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-12 lg:mb-0">
                <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full font-medium text-sm mb-4">
                  The Timepiece Revolution
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Experience the Future <br />On Your Wrist</h2>
                <p className="text-gray-300 mb-8 text-lg max-w-lg">
                  Our smartwatches combine cutting-edge technology with timeless elegance, 
                  creating the perfect balance of form and function.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link to="/products" className="cta-button">
                    Explore Collection
                  </Link>
                  <button className="px-6 py-3 border border-white/30 rounded-full hover:bg-white/10 transition-colors">
                    Watch Video
                  </button>
                </div>
              </div>
              
              <div className="lg:w-1/2 relative perspective">
                <div className="watch-container">
                  {featuredProducts.map((product, index) => (
                    <div 
                      key={product.id}
                      className={`absolute inset-0 transition-all duration-1000 ease-out transform ${
                        index === activeWatchIndex 
                          ? 'opacity-100 scale-100 rotate-y-0' 
                          : 'opacity-0 scale-90 rotate-y-90'
                      }`}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain max-w-lg mx-auto"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Navigation dots */}
                <div className="flex justify-center mt-8 space-x-2">
                  {featuredProducts.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === activeWatchIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      onClick={() => setActiveWatchIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-white text-luxury-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Luxury on Your Wrist</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                Discover how a LUXEWATCH can elevate your style and enhance your life. Join the thousands who have already made the choice for uncompromising excellence.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/products" className="cta-button">
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
        </section>
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

export default Index;
