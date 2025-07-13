import React, { useState } from "react";
import CalendlyModal from "./CalendlyModal";

const FloatingConsultationWidget: React.FC = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openCalendly = () => setIsCalendlyOpen(true);
  const closeCalendly = () => setIsCalendlyOpen(false);

  return (
    <>
      {/* Floating Consultation Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          {/* Enhanced Curved Text Ring */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out pointer-events-none ${
              isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-0'
            }`}
          >
            <svg 
              className="w-56 h-56" 
              viewBox="0 0 200 200" 
              style={{ 
                animation: isHovered ? 'spin 20s linear infinite' : 'none'
              }}
              aria-hidden="true"
              role="presentation"
            >
              {/* Circular path for text */}
              <defs>
                <path
                  id="circle-path"
                  d="M 100,100 m -85,0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                />
              </defs>
              
              {/* Curved text */}
              <text 
                className="fill-white font-bold"
                style={{ 
                  fontSize: '16px',
                  letterSpacing: '0.25em',
                  textShadow: '0 0 12px rgba(0,0,0,0.9), 0 0 6px rgba(59,130,246,0.8)'
                }}
              >
                <textPath href="#circle-path" startOffset="0%">
                  FREE CONSULTATION • EXPERT ADVICE • SCHEDULE NOW • 
                </textPath>
              </text>
            </svg>
          </div>

          {/* Expanding Ring Animation */}
          <div 
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              isHovered ? 'scale-125 opacity-60' : 'scale-100 opacity-0'
            }`}
            style={{
              background: 'conic-gradient(from 0deg, #60a5fa, #a78bfa, #60a5fa)',
              padding: '2px',
              animation: isHovered ? 'pulse-ring 2s infinite' : 'none'
            }}
          >
            <div className="w-full h-full rounded-full bg-transparent"></div>
          </div>

          {/* Secondary ring */}
          <div 
            className={`absolute inset-0 rounded-full border-2 border-white/20 transition-all duration-700 delay-100 ${
              isHovered ? 'scale-150 opacity-40' : 'scale-100 opacity-0'
            }`}
          ></div>

          {/* Main Button */}
          <button
            onClick={openCalendly}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            className="relative group bg-gradient-to-r from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white p-5 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 focus:scale-110 cursor-pointer overflow-hidden z-10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
            style={{
              boxShadow: isHovered 
                ? '0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)' 
                : '0 10px 25px rgba(0, 0, 0, 0.3)'
            }}
            aria-label="Schedule free consultation"
          >
            {/* Enhanced animated background */}
            <div 
              className={`absolute inset-0 bg-gradient-to-r from-blue-400/20 to-violet-400/20 rounded-full transition-all duration-500 ${
                isHovered ? 'animate-pulse scale-110' : ''
              }`}
            ></div>
            
            {/* Multiple ripple effects */}
            <div className="absolute inset-0 rounded-full bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            <div className="absolute inset-0 rounded-full bg-white/5 transform scale-0 group-hover:scale-125 transition-transform duration-500 delay-100"></div>
            
            {/* Calendar icon with enhanced animation */}
            <svg 
              className={`w-7 h-7 relative z-10 transition-all duration-500 ${
                isHovered ? 'rotate-12 scale-110' : ''
              }`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="presentation"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>

            {/* Enhanced floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              <div className={`absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full transition-all duration-300 ${
                isHovered ? 'animate-ping opacity-80 scale-125' : 'animate-ping opacity-60'
              }`}></div>
              <div className={`absolute -bottom-2 -left-2 w-2 h-2 bg-violet-400 rounded-full transition-all duration-300 ${
                isHovered ? 'animate-pulse opacity-90 scale-110' : 'animate-pulse opacity-80'
              }`} style={{ animationDelay: '300ms' }}></div>
              <div className={`absolute -top-3 left-1/2 w-1.5 h-1.5 bg-white rounded-full transition-all duration-300 ${
                isHovered ? 'animate-bounce opacity-90' : 'animate-bounce opacity-70'
              }`} style={{ animationDelay: '600ms' }}></div>
              <div className={`absolute -right-3 top-1/2 w-2 h-2 bg-blue-300 rounded-full transition-all duration-300 ${
                isHovered ? 'animate-pulse opacity-70 scale-125' : 'opacity-0'
              }`} style={{ animationDelay: '900ms' }}></div>
            </div>
          </button>
        </div>
      </div>

      {/* Calendly Modal */}
      <CalendlyModal 
        isOpen={isCalendlyOpen} 
        onClose={closeCalendly}
      />
    </>
  );
};

export default FloatingConsultationWidget;