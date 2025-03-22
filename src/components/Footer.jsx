
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-luxury-black text-white dark:bg-gray-900">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6">LUXEWATCH</h3>
            <p className="text-gray-400 mb-6">
              Redefining luxury timepieces for the modern era. Every LUXEWATCH combines exquisite craftsmanship with cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-5">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">All Watches</Link>
              </li>
              <li>
                <Link to="/products?brand=Summit" className="text-gray-400 hover:text-white transition-colors">Summit Collection</Link>
              </li>
              <li>
                <Link to="/products?brand=Elevation" className="text-gray-400 hover:text-white transition-colors">Elevation Series</Link>
              </li>
              <li>
                <Link to="/products?brand=Quantum" className="text-gray-400 hover:text-white transition-colors">Quantum Line</Link>
              </li>
              <li>
                <Link to="/accessories" className="text-gray-400 hover:text-white transition-colors">Accessories</Link>
              </li>
              <li>
                <Link to="/gift-cards" className="text-gray-400 hover:text-white transition-colors">Gift Cards</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-5">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Information</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-400 hover:text-white transition-colors">Size Guide</Link>
              </li>
              <li>
                <Link to="/warranty" className="text-gray-400 hover:text-white transition-colors">Warranty</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-5">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/technology" className="text-gray-400 hover:text-white transition-colors">Technology</Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-400 hover:text-white transition-colors">Sustainability</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-400 hover:text-white transition-colors">Press Room</Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-400 hover:text-white transition-colors">Partners</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} LUXEWATCH. All rights reserved.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
              <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
