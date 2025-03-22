import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

const BarcodeScanner = ({ onDetected }) => {
  const videoRef = useRef(null);
  const scannerAreaRef = useRef(null);
  const [scanner, setScanner] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [lastDetected, setLastDetected] = useState("");

  useEffect(() => {
    if (!scanning) return;
    
    const codeReader = new BrowserMultiFormatReader();
    
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoInputDevices = devices.filter(device => device.kind === "videoinput");
        if (videoInputDevices.length === 0) {
          throw new Error("No camera devices found");
        }
        return videoInputDevices[0].deviceId;
      })
      .then((deviceId) => {
        return navigator.mediaDevices.getUserMedia({ 
          video: { 
            deviceId,
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", true);
          videoRef.current.play().catch((err) => console.error("Video play error:", err));
        }
        codeReader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result, err) => {
            if (result) {
              const scannedText = result.text;
              console.log("Barcode detected:", scannedText);
              setLastDetected(scannedText);
              onDetected(scannedText);
              
              // Show success animation
              if (scannerAreaRef.current) {
                scannerAreaRef.current.classList.add("success-scan");
                setTimeout(() => {
                  scannerAreaRef.current?.classList.remove("success-scan");
                }, 1000);
              }
              
              // Optional: Delay stopping after detection
              // setTimeout(() => setScanning(false), 2000);
            }
            if (err && !(err instanceof NotFoundException)) {
              console.error("Decoding error:", err);
            }
          }
        );
        setScanner(codeReader);
      })
      .catch((err) => {
        console.error("Camera access error:", err);
        alert("Failed to access camera. Ensure permissions are granted.");
        setScanning(false);
      });
      
    return () => {
      if (scanner) {
        scanner.reset();
        setScanner(null);
      }
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [scanning, onDetected]);

  const startScanner = () => setScanning(true);
  
  const stopScanner = () => {
    if (scanner) {
      scanner.reset();
    }
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setScanner(null);
    setScanning(false);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Barcode Scanner</h2>
      
      {!scanning ? (
        <div className="flex flex-col items-center w-full">
          <button 
            onClick={startScanner}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Start Scanner
          </button>
          
          {lastDetected && (
            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 w-full max-w-md">
              <p className="text-sm text-gray-500 mb-1">Last scanned code:</p>
              <p className="text-gray-800 font-medium break-all">{lastDetected}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div 
            ref={scannerAreaRef}
            className="relative overflow-hidden rounded-lg shadow-inner mb-4"
          >
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover bg-black"
            />
            
            {/* Scanner overlay with targeting lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 border-2 border-white/30 rounded-lg">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
              </div>
              
              {/* Scanning animation */}
              <div className="absolute left-0 right-0 h-1 bg-blue-500/50 animate-scan"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Position code within the frame</p>
            
            <button 
              onClick={stopScanner} 
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Stop Scanner
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: calc(100% - 4px); }
          100% { top: 0; }
        }
        
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        
        @keyframes success-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
          50% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0.2); }
        }
        
        .success-scan {
          animation: success-pulse 0.8s ease-out;
          border: 2px solid rgb(34, 197, 94) !important;
        }
      `}</style>
    </div>
  );
};

export default BarcodeScanner;