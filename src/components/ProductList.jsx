
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Filter } from 'lucide-react';

const ProductList = ({ products, onAddToCart, onViewDetails }) => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [filters, setFilters] = useState({ brand: 'all', price: 'all' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Animation for product cards entry
  useEffect(() => {
    const filteredProducts = products.filter(product => {
      const brandMatch = filters.brand === 'all' || product.brand === filters.brand;
      const priceMatch = filters.price === 'all' || 
                        (filters.price === 'below300' && product.price < 300) ||
                        (filters.price === '300to600' && product.price >= 300 && product.price <= 600) ||
                        (filters.price === 'above600' && product.price > 600);
      return brandMatch && priceMatch;
    });
    
    // Animate products into view one by one
    let timeoutIds = [];
    filteredProducts.forEach((product, index) => {
      const timeoutId = setTimeout(() => {
        setVisibleProducts(prev => [...prev, product.id]);
      }, index * 100); // 100ms delay between each card
      timeoutIds.push(timeoutId);
    });
    
    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
      setVisibleProducts([]);
    };
  }, [products, filters]);
  
  const uniqueBrands = ['all', ...new Set(products.map(p => p.brand))];
  
  const handleFilterChange = (type, value) => {
    setVisibleProducts([]); // Reset for animation
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Premium Collection</h2>
          
          <button 
            className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
        </div>
        
        {/* Filters */}
        {isFilterOpen && (
          <div className="glass-effect p-6 rounded-2xl mb-8 animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Brand</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueBrands.map(brand => (
                    <button
                      key={brand}
                      className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                        filters.brand === brand 
                          ? 'bg-luxury-blue text-white' 
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => handleFilterChange('brand', brand)}
                    >
                      {brand === 'all' ? 'All Brands' : brand}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Price Range</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                      filters.price === 'all' 
                        ? 'bg-luxury-blue text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => handleFilterChange('price', 'all')}
                  >
                    All Prices
                  </button>
                  <button
                    className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                      filters.price === 'below300' 
                        ? 'bg-luxury-blue text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => handleFilterChange('price', 'below300')}
                  >
                    Below $300
                  </button>
                  <button
                    className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                      filters.price === '300to600' 
                        ? 'bg-luxury-blue text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => handleFilterChange('price', '300to600')}
                  >
                    $300 - $600
                  </button>
                  <button
                    className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                      filters.price === 'above600' 
                        ? 'bg-luxury-blue text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => handleFilterChange('price', 'above600')}
                  >
                    Above $600
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products
            .filter(product => {
              const brandMatch = filters.brand === 'all' || product.brand === filters.brand;
              const priceMatch = filters.price === 'all' || 
                                (filters.price === 'below300' && product.price < 300) ||
                                (filters.price === '300to600' && product.price >= 300 && product.price <= 600) ||
                                (filters.price === 'above600' && product.price > 600);
              return brandMatch && priceMatch;
            })
            .map(product => (
              <div 
                key={product.id} 
                className={`transition-all duration-500 ${
                  visibleProducts.includes(product.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <ProductCard 
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetails={() => onViewDetails(product)}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
