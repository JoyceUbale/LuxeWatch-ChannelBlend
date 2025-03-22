
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft, CreditCard, Shield } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useProducts();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  
  // Calculate cart total
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };
  
  const calculateShipping = () => {
    return cart.length > 0 ? 15 : 0;
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    
    // Payment validation
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!formData.cardName) newErrors.cardName = 'Name on card is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsOrderComplete(true);
      
      // Clear cart after successful order
      cart.forEach(item => removeFromCart(item.id));
      
      // After 3 seconds, redirect to home
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };
  
  if (isOrderComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar cartItems={[]} toggleCart={() => {}} />
        
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Complete!</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
              Thank you for your purchase! Your order has been successfully processed. 
              You will receive a confirmation email shortly.
            </p>
            
            <button 
              onClick={() => navigate('/')}
              className="cta-button"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItems={cart} toggleCart={() => navigate('/products')} />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-luxury-blue mb-8 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back
          </button>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Checkout</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Complete your purchase by providing your shipping and payment details.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Checkout Form */}
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-card">
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-luxury-blue/20 outline-none transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                {/* Shipping Information */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-card">
                  <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-luxury-blue/20 outline-none transition-all ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-luxury-blue/20 outline-none transition-all ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1" htmlFor="address">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-luxury-blue/20 outline-none transition-all ${
                          errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="city">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-luxury-blue/20 outline-none transition-all ${
                          errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="state">
                        State / Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-luxury-blue/20 outline-none transition-all ${
                          errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="zipCode">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-luxury-blue/20 outline-none transition-all ${
                          errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        value={formData.zipCode}
                        onChange={handleInputChange}
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="country">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-luxury-blue/20 outline-none transition-all"
                        value={formData.country}
                        onChange={handleInputChange}
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Payment Information */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Payment Information</h2>
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500">Secure Payment</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="cardNumber">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-luxury-blue/20 outline-none transition-all ${
                          errors.cardNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="cardName">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-luxury-blue/20 outline-none transition-all ${
                          errors.cardName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        value={formData.cardName}
                        onChange={handleInputChange}
                      />
                      {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="expiryDate">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-luxury-blue/20 outline-none transition-all ${
                            errors.expiryDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="cvv">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-luxury-blue/20 outline-none transition-all ${
                            errors.cvv ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          value={formData.cvv}
                          onChange={handleInputChange}
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isProcessing || cart.length === 0}
                  className={`w-full py-4 rounded-full font-medium ${
                    isProcessing || cart.length === 0
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-luxury-blue text-white button-hover'
                  }`}
                >
                  {isProcessing ? 'Processing Payment...' : `Complete Order • $${calculateTotal().toFixed(2)}`}
                </button>
                
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Shield className="h-4 w-4 mr-2" />
                  Your payment information is encrypted and secure
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-card sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <button 
                      onClick={() => navigate('/products')}
                      className="px-4 py-2 text-luxury-blue border border-luxury-blue rounded-full hover:bg-luxury-blue/10 transition-colors"
                    >
                      Shop Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Cart Items */}
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="h-16 w-16 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                          </div>
                          
                          <div className="font-bold">
                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Totals */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                        <span>${calculateShipping().toFixed(2)}</span>
                      </div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
