import React, { useState, useEffect, useRef } from "react";
import { IconLogo, FullLogo } from "./Logo";

interface NavbarProps {
  currentPage?: 'home' | 'services' | 'contact';
}

const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Focus management refs
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const lastMenuItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    function handleResize() {
      const isMobileView = window.innerWidth < 640;
      setIsMobile(isMobileView);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    // Return focus to menu button when closing
    if (menuButtonRef.current) {
      menuButtonRef.current.focus();
    }
  };

  // Focus trapping for menu
  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (!isMenuOpen) return;

    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    if (e.key === 'Tab') {
      const focusableElements = [
        closeButtonRef.current,
        firstMenuItemRef.current,
        lastMenuItemRef.current
      ].filter(Boolean);

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab (moving backwards)
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab (moving forwards)
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }
  };

  // Focus management when menu opens/closes
  useEffect(() => {
    if (isMenuOpen) {
      // Focus the close button when menu opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }
  }, [isMenuOpen]);

  // Navigation items
  const navItems = [
    { label: 'Home', href: '/', isActive: currentPage === 'home' },
    { label: 'Services', href: '/services', isActive: currentPage === 'services' },
    { label: 'Contact', href: '/contact', isActive: currentPage === 'contact' }
  ];

  return (
    <>
      {/* Sticky Nav Bar */}
      <nav className="fixed z-40 left-0 top-0 w-full px-4 sm:px-6 py-2 flex items-center justify-between bg-[#101726] shadow-lg transition-all duration-700 opacity-100 translate-y-0" style={{ height: '60px' }}>
        {/* Logo Container - Responsive positioning */}
        <div
          className={`flex items-center justify-center bg-[#101726] rounded-full shadow-xl ${
            isMobile 
              ? 'border-2 border-[#101726] relative' // Mobile: inline with navbar
              : 'border-4 border-[#101726] absolute left-6 top-0' // Desktop: hanging below
          }`}
          style={{
            width: isMobile ? 45 : 100,
            height: isMobile ? 45 : 100,
            zIndex: 50,
          }}
        >
          <IconLogo color="white" className="w-full h-full" />
        </div>

        {/* Brand Text */}
        <a
          href="/"
          className={`text-white font-bold tracking-wider hover:text-blue-300 transition-all duration-300 cursor-pointer hover:scale-105 ${
            isMobile ? 'text-sm ml-16' : 'text-xl ml-32'
          }`}
        >
          Augmented Webcraft
        </a>

        {/* Hamburger Menu Button */}
        <button
          ref={menuButtonRef}
          onClick={toggleMenu}
          className="text-white p-2 hover:text-blue-300 transition-all duration-300 cursor-pointer hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="navigation-menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'mb-1'}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
      </nav>

      {/* Full-Screen Navigation Menu */}
      <div 
        id="navigation-menu"
        className={`fixed inset-0 z-50 transition-all duration-700 ease-out ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="navigation-menu-title"
        onKeyDown={handleMenuKeyDown}
      >
        <h2 id="navigation-menu-title" className="sr-only">Navigation Menu</h2>
        {/* Animated Background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#050917] via-[#0a1128] to-[#050917] transition-all duration-700 ${
          isMenuOpen ? 'scale-100' : 'scale-95'
        }`}></div>
        
        {/* Background Icon Logo with animation */}
        <div className={`absolute left-0 top-0 h-full flex items-center transition-all duration-1000 ease-out ${
          isMenuOpen ? 'translate-x-0 opacity-5' : '-translate-x-full opacity-0'
        }`}>
          <IconLogo 
            color="white" 
            className={`h-full w-auto -translate-x-1/4 transition-transform duration-1000 ${
              isMenuOpen ? 'scale-100' : 'scale-95'
            }`}
          />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full transition-all duration-700 ${
            isMenuOpen ? 'animate-pulse opacity-40' : 'opacity-0'
          }`}></div>
          <div className={`absolute top-1/3 right-1/4 w-1 h-1 bg-violet-400 rounded-full transition-all duration-700 delay-100 ${
            isMenuOpen ? 'animate-pulse opacity-60' : 'opacity-0'
          }`}></div>
          <div className={`absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-500 rounded-full transition-all duration-700 delay-200 ${
            isMenuOpen ? 'animate-pulse opacity-30' : 'opacity-0'
          }`}></div>
        </div>

        <div className="flex flex-col items-center justify-center h-full p-8 relative z-10">
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={closeMenu}
            className="absolute top-6 right-6 text-white p-3 hover:text-blue-300 transition-all duration-300 cursor-pointer hover:scale-110 hover:rotate-90 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Close navigation menu"
          >
            <div className="w-8 h-8 flex flex-col justify-center items-center">
              <span className="block w-8 h-0.5 bg-current transform rotate-45"></span>
              <span className="block w-8 h-0.5 bg-current transform -rotate-45 -translate-y-0.5"></span>
            </div>
          </button>

          {/* Menu Items with staggered animations */}
          <nav className="flex flex-col items-center space-y-8 text-center" role="navigation" aria-label="Main menu">
            <a
              ref={firstMenuItemRef}
              href="/"
              onClick={closeMenu}
              className={`text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider hover:text-blue-300 transition-all duration-500 cursor-pointer transform hover:scale-110 hover:translate-x-4 relative group block focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900 rounded ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${currentPage === 'home' ? 'text-blue-300' : ''}`}
              style={{ transitionDelay: isMenuOpen ? '200ms' : '0ms' }}
              aria-current={currentPage === 'home' ? 'page' : undefined}
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
            </a>
            <a
              href="/services"
              onClick={closeMenu}
              className={`text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider hover:text-blue-300 transition-all duration-500 cursor-pointer transform hover:scale-110 hover:translate-x-4 relative group block focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900 rounded ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${currentPage === 'services' ? 'text-blue-300' : ''}`}
              style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}
              aria-current={currentPage === 'services' ? 'page' : undefined}
            >
              <span className="relative z-10">Services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
            </a>
            <a
              ref={lastMenuItemRef}
              href="/contact"
              onClick={closeMenu}
              className={`text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider hover:text-blue-300 transition-all duration-500 cursor-pointer transform hover:scale-110 hover:translate-x-4 relative group block focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900 rounded ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${currentPage === 'contact' ? 'text-blue-300' : ''}`}
              style={{ transitionDelay: isMenuOpen ? '600ms' : '0ms' }}
              aria-current={currentPage === 'contact' ? 'page' : undefined}
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
            </a>
          </nav>
          
          {/* Company Logo in Menu - Bottom with animation (like homepage) */}
          <div className={`absolute bottom-8 w-48 sm:w-64 transition-all duration-700 ${
            isMenuOpen ? 'translate-y-0 opacity-15' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: isMenuOpen ? '800ms' : '0ms' }}>
            <FullLogo color="white" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;