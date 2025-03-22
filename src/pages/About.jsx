import React from 'react'
import Navbar from '../components/Navbar'

const About = () => {
  return (
    <>

    <Navbar />

    {/* Hero Section */}
    <section className="py-20 md:py-28 bg-gradient-to-b from-luxury-light to-white pt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-luxury-black mb-6 animate-fade-in">Our Story</h1>
          <p className="text-lg text-text-gray-800 animate-fade-in animate-delay-200">
            Crafting excellence at the intersection of luxury and technology.
          </p>
        </div>
      </div>
    </section>
    
    {/* Mission Section */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="section-reveal">
            <span className="inline-block px-3 py-1 bg-luxury-light text-luxury-accent2 rounded-full text-sm font-medium mb-6">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-luxury-black mb-6">
              Redefining Wearable Luxury
            </h2>
            <p className="text-text-gray-800 mb-6">
              At LuxeWatch, we're dedicated to creating timepieces that seamlessly blend cutting-edge technology with timeless elegance. We believe that smart devices should enhance your life without compromising on style or craftsmanship.
            </p>
            <p className="text-text-gray-800">
              Founded in 2018, our journey began with a simple question: Why should you have to choose between beauty and functionality? Our team of designers, engineers, and luxury craftspeople came together to create a new category of wearable technology.
            </p>
          </div>
          <div className="section-reveal">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-luxury-accent/10 rounded-full animate-pulse-slow"></div>
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" 
                alt="Luxury smartwatch" 
                className="rounded-lg shadow-luxury relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Values Section */}
    <section className="py-16 md:py-24 bg-luxury-light">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 section-reveal">
          <span className="inline-block px-3 py-1 bg-white text-luxury-accent2 rounded-full text-sm font-medium mb-6">
            Our Values
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-luxury-black mb-6">
            The Principles That Guide Us
          </h2>
          <p className="text-text-gray-800">
            Every decision we make is informed by our core values. These principles have guided us from day one and continue to shape our approach to product design, customer service, and business growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-luxury section-reveal">
            <div className="w-14 h-14 bg-luxury-accent/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-accent"><path d="M12.41 6.75L13 2l-2.43 2.92"></path><path d="M18.57 12.91L21 10h-5.34"></path><path d="M8 8l-3 6.26a1 1 0 0 0 1.33 1.27"></path><path d="M6.33 20.9L7 22l3-6"></path><path d="M15 2.1L17 4l.36-.35a1 1 0 0 1 1.41.07l.79.84a1 1 0 0 1-.12 1.43l-6.42 5.38a1 1 0 0 1-1.42-.12L8.79 7.09a1 1 0 0 1 .08-1.41l2.06-2"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-luxury-black mb-4">Craftsmanship</h3>
            <p className="text-text-gray-800">
              We meticulously craft each watch with attention to detail, combining traditional watchmaking techniques with modern technology.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-luxury section-reveal">
            <div className="w-14 h-14 bg-luxury-accent/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-accent"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-luxury-black mb-4">Innovation</h3>
            <p className="text-text-gray-800">
              We constantly push technological boundaries, ensuring our watches offer cutting-edge features while maintaining elegant design.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-luxury section-reveal">
            <div className="w-14 h-14 bg-luxury-accent/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-accent"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-luxury-black mb-4">Sustainability</h3>
            <p className="text-text-gray-800">
              We're committed to responsible production, using ethically sourced materials and creating products designed to last.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    {/* Team Section */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 section-reveal">
          <span className="inline-block px-3 py-1 bg-luxury-light text-luxury-accent2 rounded-full text-sm font-medium mb-6">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-luxury-black mb-6">
            The Minds Behind LuxeWatch
          </h2>
          <p className="text-text-gray-800">
            Our diverse team combines expertise from the worlds of luxury watchmaking, technology, and design. Together, we're creating the future of wearable luxury.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="section-reveal">
            <div className="relative overflow-hidden rounded-lg shadow-luxury group">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
                alt="Team member" 
                className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h4 className="text-white text-xl font-bold">Alexander Chen</h4>
                <p className="text-white/80">Founder & CEO</p>
              </div>
            </div>
          </div>
          
          {/* Team Member 2 */}
          <div className="section-reveal">
            <div className="relative overflow-hidden rounded-lg shadow-luxury group">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                alt="Team member" 
                className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h4 className="text-white text-xl font-bold">Sophia Martinez</h4>
                <p className="text-white/80">Head of Design</p>
              </div>
            </div>
          </div>
          
          {/* Team Member 3 */}
          <div className="section-reveal">
            <div className="relative overflow-hidden rounded-lg shadow-luxury group">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7" 
                alt="Team member" 
                className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h4 className="text-white text-xl font-bold">James Wilson</h4>
                <p className="text-white/80">CTO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* CTA Section */}
    <section className="py-16 md:py-24 bg-luxury-black text-white">
      <div className="container mx-auto px-6 text-center section-reveal">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Luxury. Experience Innovation.</h2>
        <p className="text-luxury-silver max-w-2xl mx-auto mb-8">
          Join us on our journey to redefine what a smartwatch can be. Explore our collections and find the perfect blend of technology and style.
        </p>
        <a href="#" className="luxury-button bg-luxury-accent text-luxury-black hover:bg-luxury-accent2 transition-all">
          Explore Collections
        </a>
      </div>
    </section>
    </>
  )
}

export default About
