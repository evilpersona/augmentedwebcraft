import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { InlineWidget } from "react-calendly";
import { IconLogo } from "./Logo";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  calendlyUrl?: string;
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({ 
  isOpen, 
  onClose, 
  calendlyUrl = "https://calendly.com/augmentedwebcraft/free-consultation" 
}) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={() => onClose()}
    >
      <div 
        style={{
          backgroundColor: 'white',
          width: '100%',
          maxWidth: '1000px',
          height: '85vh',
          maxHeight: '700px',
          minHeight: '600px',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-4 rounded-t-2xl relative overflow-hidden flex-shrink-0">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Schedule Your Free Consultation</h2>
                <p className="text-blue-100 text-sm">Let's discuss your project and goals</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-full transition-all duration-300 cursor-pointer hover:scale-110"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Quick Info */}
          <div className="p-4 text-center bg-gray-50 border-b">
            <p className="text-gray-700 text-sm">
              <strong>Free 30-minute consultation</strong> • No obligation • Expert insights and recommendations
            </p>
          </div>
          
          {/* Calendly Widget */}
          <div style={{ flex: 1, backgroundColor: 'white', overflow: 'hidden', height: '100%' }}>
            <InlineWidget 
              url={calendlyUrl}
              styles={{
                height: '500px',
                width: '100%'
              }}
              pageSettings={{
                backgroundColor: 'ffffff',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: '3b82f6',
                textColor: '1f2937'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CalendlyModal;