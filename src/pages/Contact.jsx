import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    console.log("Submitted Form" , formData)
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message. We will get back to you shortly.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section - Improved spacing and consistency */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-luxury-light to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-luxury-black mb-6">Get in Touch</h1>
            <p className="text-lg text-text-gray-800 max-w-2xl mx-auto">
              We're here to assist you. Reach out to us with your questions, feedback, or inquiries.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section - Improved alignment and spacing */}
      <section className="py-16 md:py-20 mx-auto">
        <div className="container mx-auto flex px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-3 py-1 bg-luxury-light text-luxury-accent2 rounded-full text-sm font-medium mb-4">
                  Contact Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-luxury-black mb-4">
                  Let's Connect
                </h2>
                <p className="text-text-gray-800 mb-6">
                  Whether you have a question about our products, need assistance with an order, or want to discuss a potential partnership, our team is ready to help.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-10">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-luxury-accent/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-accent"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-luxury-black mb-1">Phone</h4>
                    <p className="text-text-gray-800">+1 (800) 123-4567</p>
                    <p className="text-text-gray-800">Monday-Friday: 9am - 6pm EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-luxury-accent/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-accent"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-luxury-black mb-1">Email</h4>
                    <p className="text-text-gray-800">support@luxewatch.com</p>
                    <p className="text-text-gray-800">We aim to respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-luxury-accent/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-luxury-accent"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-luxury-black mb-1">Visit Us</h4>
                    <p className="text-text-gray-800">123 Luxury Lane</p>
                    <p className="text-text-gray-800">New York, NY 10001</p>
                    <p className="text-text-gray-800">United States</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-luxury-black mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-luxury-light flex items-center justify-center transition-all hover:bg-luxury-accent hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-luxury-light flex items-center justify-center transition-all hover:bg-luxury-accent hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-luxury-light flex items-center justify-center transition-all hover:bg-luxury-accent hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-luxury-light flex items-center justify-center transition-all hover:bg-luxury-accent hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form - Improved layout and styling */}
            <div>
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-luxury-black mb-6">Send Us a Message</h3>
                
                {formStatus.submitted && (
                  <div className={`p-4 mb-6 rounded-md ${formStatus.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {formStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-luxury-dark mb-2">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-md border border-luxury-silver focus:outline-none focus:ring-2 focus:ring-luxury-accent/50 transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-luxury-dark mb-2">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-md border border-luxury-silver focus:outline-none focus:ring-2 focus:ring-luxury-accent/50 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-luxury-dark mb-2">
                      Subject
                    </label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-luxury-silver focus:outline-none focus:ring-2 focus:ring-luxury-accent/50 transition-all"
                      placeholder="What is this regarding?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-luxury-dark mb-2">
                      Message
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-luxury-silver focus:outline-none focus:ring-2 focus:ring-luxury-accent/50 transition-all resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full py-3 px-6 bg-luxury-black text-white font-medium rounded-md hover:bg-luxury-dark transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-accent/50"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section - Improved layout */}
      <section className="py-16 md:py-20 bg-luxury-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-luxury-black mb-4">Visit Our Flagship Store</h2>
            <p className="text-text-gray-800 max-w-2xl mx-auto">
              Experience LuxeWatch firsthand at our flagship store in New York City. Our experts are ready to guide you through our collections.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto relative rounded-lg overflow-hidden shadow-lg h-80 md:h-96">
            {/* This is a placeholder for a map. In a real project, you'd integrate Google Maps or similar */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="text-center px-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-text-gray-800"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <p className="text-luxury-dark font-medium">123 Luxury Lane, New York, NY 10001</p>
                <p className="text-text-gray-800 mt-2">Interactive map would display here</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section - Improved layout and consistency */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-3 py-1 bg-luxury-light text-luxury-accent2 rounded-full text-sm font-medium mb-4">
              FAQs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-luxury-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-text-gray-800">
              Find quick answers to common questions about our products and services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-luxury-silver/30 p-6 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-luxury-black mb-2">What payment methods do you accept?</h4>
              <p className="text-text-gray-800">
                We accept all major credit cards, PayPal, Apple Pay, and Google Pay. For orders over $5,000, we also offer wire transfer options.
              </p>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-luxury-silver/30 p-6 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-luxury-black mb-2">What is your shipping policy?</h4>
              <p className="text-text-gray-800">
                We offer free express shipping on all orders over $300. International shipping is available to most countries. All watches are shipped fully insured with signature required upon delivery.
              </p>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="bg-white rounded-lg shadow-sm border border-luxury-silver/30 p-6 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-luxury-black mb-2">What warranty do your watches come with?</h4>
              <p className="text-text-gray-800">
                All LuxeWatch timepieces come with a 2-year international warranty covering manufacturing defects. Premium collections include an extended 5-year warranty.
              </p>
            </div>
            
            {/* FAQ Item 4 */}
            <div className="bg-white rounded-lg shadow-sm border border-luxury-silver/30 p-6 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-luxury-black mb-2">Do you offer repairs and servicing?</h4>
              <p className="text-text-gray-800">
                Yes, we provide comprehensive repair and servicing for all our watches through our certified service centers. Please contact our customer service team to arrange a service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;