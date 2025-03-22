
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const watchRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!watchRef.current) return;
      
      const rect = watchRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateY = (e.clientX - centerX) / 20;
      const rotateX = (centerY - e.clientY) / 20;
      
      watchRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const resetRotation = () => {
      if (!watchRef.current) return;
      watchRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      watchRef.current.style.transition = 'transform 0.6s ease';
    };
    
    const container = document.querySelector('.hero-container');
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', resetRotation);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', resetRotation);
    };
  }, []);

  return (
    <section className="hero-container min-h-screen pt-24 flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 md:space-y-8">
            <span className="inline-block px-4 py-1.5 bg-luxury-blue/10 text-luxury-blue rounded-full font-medium text-sm">
              Redefined Luxury
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              The Next Generation <br />
              <span className="text-gradient">Smart Timepiece</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
              Unparalleled craftsmanship meets cutting-edge technology. 
              Experience the perfect harmony of luxury and innovation.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products" className="cta-button">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5 inline-block" />
              </Link>
              <Link to="/about" className="rounded-full border border-gray-300 dark:border-gray-700 px-6 py-3 font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-blue/20 to-transparent rounded-full blur-3xl opacity-30 animate-pulse-subtle"></div>
            <div 
              ref={watchRef} 
              className="relative transition-transform duration-300 ease-out"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop"
                alt="Luxury Smartwatch" 
                className="w-full rounded-2xl shadow-product mx-auto"
                style={{ maxWidth: '500px' }}
              />
              
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-white/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
