import React, { useState, useEffect } from "react";
import BarcodeScanner from "../components/BarcodeScanner";

const ScanProductPage = () => {
  const [barcode, setBarcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [scanHistory, setScanHistory] = useState(() => {
    const saved = localStorage.getItem("scanHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const handleDetected = (code) => {
    // Avoid duplicate consecutive scans
    if (code === barcode) return;
    
    setBarcode(code);
    setIsLoading(true);
    
    // Simulate product lookup
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock product data - in a real app, this would come from an API
      const mockProduct = {
        name: `Product ${code.substring(0, 4)}`,
        price: `$${(Math.random() * 100).toFixed(2)}`,
        category: ["Electronics", "Groceries", "Books", "Clothing"][Math.floor(Math.random() * 4)],
        timestamp: new Date().toISOString()
      };
      
      setProductInfo(mockProduct);
      
      // Add to scan history
      const newHistory = [
        { barcode: code, product: mockProduct },
        ...scanHistory.filter(item => item.barcode !== code).slice(0, 4)
      ];
      setScanHistory(newHistory);
      localStorage.setItem("scanHistory", JSON.stringify(newHistory));
    }, 800);
  };

  const clearScanHistory = () => {
    setScanHistory([]);
    localStorage.removeItem("scanHistory");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto pt-6 pb-16 px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Scan a Product</h1>
          <p className="text-gray-600">Use your camera to scan a product barcode</p>
        </header>
        
        {/* Scanner Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <BarcodeScanner onDetected={handleDetected} />
        </div>
        
        {/* Results Section */}
        {(barcode || isLoading) && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Scan Results
            </h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-600">Looking up product info...</span>
              </div>
            ) : (
              <div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                    </svg>
                    <p className="font-mono text-blue-800">{barcode}</p>
                  </div>
                </div>
                
                {productInfo && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-800">{productInfo.name}</h3>
                      <span className="font-semibold text-green-600">{productInfo.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                          {productInfo.category}
                        </span>
                      </div>
                      
                      <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Scan History Section */}
        {scanHistory.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Scans</h2>
              <button 
                onClick={clearScanHistory}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Clear History
              </button>
            </div>
            
            <div className="space-y-3">
              {scanHistory.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.product.name}</p>
                      <p className="text-sm text-gray-500 font-mono">{item.barcode}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{item.product.price}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.product.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanProductPage;