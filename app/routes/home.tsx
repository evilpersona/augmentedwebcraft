import React, { useEffect, useRef, useState } from "react";
import type { Route } from "./../+types/home";
import { FullLogo, IconLogo } from "../components/Logo"; // Adjust import
import HeroSection from "~/components/HeroSection";
import Footer from "~/components/Footer";
import ServicesSection, { Services } from "~/components/ServicesSection";
import ContactSection from "~/components/ContactSection";
import ContactForm from "~/components/ContactForm";

// SEO Meta Tags Export
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Augmented Webcraft - Expert Web Development & Technical Consulting" },
    { 
      name: "description", 
      content: "Transform your digital vision into reality with Augmented Webcraft. Expert web development, custom solutions, and technical consulting for businesses and agencies worldwide." 
    },
    { 
      name: "keywords", 
      content: "web development, React development, Next.js, custom web solutions, technical consulting, JavaScript, TypeScript, full-stack development, web applications, digital transformation" 
    },
    
    // Open Graph Tags
    { property: "og:title", content: "Augmented Webcraft - Expert Web Development & Technical Consulting" },
    { 
      property: "og:description", 
      content: "Transform your digital vision into reality with expert web development, custom solutions, and technical consulting services." 
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://augmentedwebcraft.com" },
    { property: "og:image", content: "https://augmentedwebcraft.com/og-image.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "Augmented Webcraft" },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Augmented Webcraft - Expert Web Development & Technical Consulting" },
    { 
      name: "twitter:description", 
      content: "Transform your digital vision into reality with expert web development and technical consulting services." 
    },
    { name: "twitter:image", content: "https://augmentedwebcraft.com/twitter-image.jpg" },
    { name: "twitter:creator", content: "@augmentedwebcraft" },
    
    // Additional SEO Tags
    { name: "author", content: "Augmented Webcraft" },
    { name: "language", content: "English" },
    { name: "geo.region", content: "US" },
    { name: "geo.placename", content: "United States" },
    { name: "format-detection", content: "telephone=no" },
  ];
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Augmented Webcraft",
  "url": "https://augmentedwebcraft.com",
  "logo": "https://augmentedwebcraft.com/logo.png",
  "description": "Expert web development and technical consulting services for businesses and agencies worldwide.",
  "foundingDate": "2024",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-000-000-0000",
    "contactType": "customer service",
    "email": "hello@augmentedwebcraft.com",
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "Remote"
  },
  "sameAs": [
    "https://linkedin.com/company/augmented-webcraft",
    "https://github.com/augmented-webcraft"
  ],
  "offers": {
    "@type": "Service",
    "serviceType": "Web Development",
    "description": "Custom web development, React applications, Next.js solutions, and technical consulting services."
  }
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const LOGO_FINAL_SIZE = 100; // Even bigger logo for desktop
const NAV_HEIGHT = 64;
const LOGO_MARGIN_TOP = 20; // Margin for half circle effect
const LOGO_FINAL_TOP = LOGO_MARGIN_TOP;
const LOGO_FINAL_LEFT = 24;
const ANIMATION_DURATION = 1500;

export default function HomePage() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 = splash, 1 = in navbar
  const [logoSwapped, setLogoSwapped] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [navVisible, setNavVisible] = useState(false);
  const navLogoRef = useRef<HTMLDivElement>(null);
const [logoTarget, setLogoTarget] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
const [showSplash, setShowSplash] = useState(true);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isMobile, setIsMobile] = useState(false);

// Scroll animation state
const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

// Floating contact widget state
const [isContactDrawerOpen, setIsContactDrawerOpen] = useState(false);

// Modal state for services
const [selectedService, setSelectedService] = useState<typeof Services[0] | null>(null);

// Prevent scrolling when modal is open
useEffect(() => {
  if (selectedService) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
  
  // Cleanup on unmount
  return () => {
    document.body.style.overflow = 'unset';
  };
}, [selectedService]);

const handleServiceClick = (serviceName: string) => {
  // Find the service by name
  const service = Services.find(s => s.id === serviceName);
  if (service) {
    setSelectedService(service);
    // Scroll to services section
    scrollToSection(servicesRef);
  }
};

const closeModal = () => {
  setSelectedService(null);
};

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};

const closeMenuAndScroll = (ref: React.RefObject<HTMLElement>) => {
  setIsMenuOpen(false);
  scrollToSection(ref);
};

const toggleContactDrawer = () => {
  setIsContactDrawerOpen(!isContactDrawerOpen);
};

const closeContactDrawer = () => {
  setIsContactDrawerOpen(false);
};

  useEffect(() => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("hasSeenSplash") === "1") {
      setShowSplash(false);
      setNavVisible(true); // If you want to skip splash and nav should be visible
    }
  }
}, []);
// After mount, update target position
useEffect(() => {
  if (navLogoRef.current) {
    const rect = navLogoRef.current.getBoundingClientRect();
    setLogoTarget({ x: rect.left, y: rect.top });
  }
}, [navVisible, showSplash]); // Run after nav is visible

  // Responsive scaling and mobile detection
  useEffect(() => {
    function handleResize() {
      const isMobileView = window.innerWidth < 640;
      setIsMobile(isMobileView);
      
      // No need to calculate splash size anymore, using full screen
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Enhanced scroll animation observer with parallax effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the animate-in class to trigger the animation
            entry.target.classList.add('animate-in');
            setVisibleElements(prev => new Set(prev).add(entry.target.id));
            
            // Add section transition effect
            if (entry.target.classList.contains('section-transition')) {
              entry.target.classList.add('active');
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    // Parallax scroll handler (simplified)
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.dataset.speed) || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    // Throttled scroll handler setup
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Small delay to ensure elements are ready and immediately show hero elements
    const timer = setTimeout(() => {
      const elementsToObserve = document.querySelectorAll('[data-scroll-animation]');
      
      // Immediately animate in hero elements
      const heroElements = document.querySelectorAll('#hero-title, #hero-subtitle, #hero-features, #hero-buttons');
      heroElements.forEach(el => {
        el.classList.add('animate-in');
      });
      
      elementsToObserve.forEach(el => observer.observe(el));
      
      // Add scroll listener for parallax
      window.addEventListener('scroll', throttledScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [showSplash]); // Re-run after splash is gone

  // Animation
  useEffect(() => {
    if (!showSplash) return;
    let start: number | null = null;
    let raf: number;

    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(1, elapsed / ANIMATION_DURATION);
      setProgress(t);
      setLogoSwapped(t > 0.85);
      if (t < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        // Slight delay so logo lands before nav appears
        setTimeout(() => {
          setNavVisible(true);
          setTimeout(() => {
    setShowSplash(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSeenSplash", "1");
    }
  }, 250);
        }, 200);
      }
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [showSplash]);

  // Logo transform
  useEffect(() => {
  if (!logoRef.current) return;

  // Get the actual logo size based on mobile/desktop
  const actualLogoSize = isMobile ? 45 : LOGO_FINAL_SIZE;
  
  // The splash logo container is full screen and starts centered
  // Calculate where the center of the screen is
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  // Final position in nav (top-left of the nav logo)
  const endX = logoTarget.x;
  const endY = logoTarget.y;
  
  // Calculate the scale needed to go from full screen width to final logo size
  const finalScale = actualLogoSize / window.innerWidth;
  
  // Calculate translation: move from center of screen to nav position
  // Since transform-origin is center, we need to account for that
  const translateX = lerp(0, endX + actualLogoSize/2 - centerX, progress);
  const translateY = lerp(0, endY + actualLogoSize/2 - centerY, progress);
  const scale = lerp(1, finalScale, progress);

  logoRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  logoRef.current.style.transition = "transform 0.01s";
  logoRef.current.style.transformOrigin = "center center";
}, [progress, logoTarget, isMobile]);

  // Skip on click
  function skipSplash() {
    setProgress(1);
    setLogoSwapped(true);
    setNavVisible(true);
    setTimeout(() => {
    setShowSplash(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSeenSplash", "1");
    }
  }, 250);
  }
  function scrollToSection(ref: React.RefObject<HTMLElement>) {
    if (ref.current) {
      const element = ref.current;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 80; // Account for fixed navbar
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }

  return (
    <div className="relative bg-[#050917]">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Splash Overlay & Animated Logo */}
      {showSplash && (
        <div
          className="fixed inset-0 z-50 bg-[#050917] flex items-center justify-center cursor-pointer"
          style={{
            opacity: showSplash ? 1 : 0,
            transition: "opacity 0.5s",
          }}
          onClick={skipSplash}
          title="Click to skip"
        >
          <div
            ref={logoRef}
            className="w-[100vw] h-[100vh] will-change-transform"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              cursor: "pointer",
              zIndex: 51,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: logoSwapped ? 0 : 1,
                transition: "opacity 0.3s",
              }}
            >
              <FullLogo color="white" className="w-full h-full" />
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: logoSwapped ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            >
              <IconLogo color="white" className="w-full h-full" />
            </div>
          </div>
          <span className="absolute bottom-8 w-full text-center text-xs text-slate-400 tracking-wider select-none">
            Click anywhere to skip
          </span>
        </div>
      )}

      {/* Sticky Nav Bar */}
      <nav
        className={`fixed z-40 left-0 top-0 w-full px-4 sm:px-6 py-2 flex items-center justify-between bg-[#101726] shadow-lg transition-all duration-700 ${
          navVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
        style={{
          height: '60px', // Standard navbar height
          transition:
            "opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* Logo Container - Responsive positioning */}
        <div
          ref={navLogoRef}
          className={`flex items-center justify-center bg-[#101726] rounded-full shadow-xl ${
            isMobile 
              ? 'border-2 border-[#101726] relative' // Mobile: inline with navbar
              : 'border-4 border-[#101726] absolute left-6 top-0' // Desktop: hanging below
          }`}
          style={{
            width: isMobile ? 45 : LOGO_FINAL_SIZE,
            height: isMobile ? 45 : LOGO_FINAL_SIZE,
            zIndex: 50,
          }}
        >
          {!showSplash && (
            <IconLogo color="white" className="w-full h-full" />
          )}
        </div>

        {/* Brand Text */}
        <button
          onClick={() => scrollToSection(homeRef)}
          className={`text-white font-bold tracking-wider hover:text-blue-300 transition-all duration-300 cursor-pointer hover:scale-105 ${
            isMobile ? 'text-sm ml-16' : 'text-xl ml-32'
          }`}
        >
          Augmented Webcraft
        </button>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-white p-2 hover:text-blue-300 transition-all duration-300 cursor-pointer hover:scale-110 hover:rotate-90"
          aria-label="Toggle menu"
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
        className={`fixed inset-0 z-50 transition-all duration-700 ease-out ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Animated Background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#050917] via-[#0a1128] to-[#050917] transition-all duration-700 ${
          isMenuOpen ? 'scale-100' : 'scale-95'
        }`}></div>
        
        {/* Background Icon Logo with animation */}
        <div className={`absolute left-0 top-0 h-full flex items-center transition-all duration-1000 ${
          isMenuOpen ? 'translate-x-0 opacity-5' : '-translate-x-full opacity-0'
        }`}>
          <IconLogo 
            color="white" 
            className="h-full w-auto -translate-x-1/4" 
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
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-white p-3 hover:text-blue-300 transition-all duration-300 cursor-pointer hover:scale-110 hover:rotate-90 rounded-full hover:bg-white/10"
            aria-label="Close menu"
          >
            <div className="w-8 h-8 flex flex-col justify-center items-center">
              <span className="block w-8 h-0.5 bg-current transform rotate-45"></span>
              <span className="block w-8 h-0.5 bg-current transform -rotate-45 -translate-y-0.5"></span>
            </div>
          </button>

          {/* Menu Items with staggered animations */}
          <div className="flex flex-col items-center space-y-8 text-center">
            <button
              onClick={() => closeMenuAndScroll(homeRef)}
              className={`text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider hover:text-blue-300 transition-all duration-500 cursor-pointer transform hover:scale-110 hover:translate-x-4 relative group ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '200ms' : '0ms' }}
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
            </button>
            <button
              onClick={() => closeMenuAndScroll(servicesRef)}
              className={`text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider hover:text-blue-300 transition-all duration-500 cursor-pointer transform hover:scale-110 hover:translate-x-4 relative group ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}
            >
              <span className="relative z-10">Services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
            </button>
            <button
              onClick={() => closeMenuAndScroll(contactRef)}
              className={`text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider hover:text-blue-300 transition-all duration-500 cursor-pointer transform hover:scale-110 hover:translate-x-4 relative group ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '600ms' : '0ms' }}
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
            </button>
          </div>

          {/* Company Logo in Menu - Bottom with animation */}
          <div className={`absolute bottom-8 w-48 sm:w-64 transition-all duration-700 ${
            isMenuOpen ? 'translate-y-0 opacity-15' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: isMenuOpen ? '800ms' : '0ms' }}>
            <FullLogo color="white" className="w-full" />
          </div>
        </div>
      </div>

      {/* Home Content */}
      <main
        className={`relative z-0 transition-opacity duration-500 z-1 bg-black w-full min-h-screen parallax-section geometric-bg ${
          showSplash ? "opacity-0" : "opacity-100"
        }`}
      >
        <HeroSection 
          ref={homeRef} 
          scrollToContact={() => scrollToSection(contactRef)}
          scrollToServices={() => scrollToSection(servicesRef)}
        />
        <ServicesSection 
          ref={servicesRef} 
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          closeModal={closeModal}
        />
        <ContactSection ref={contactRef} />
        <Footer onServiceClick={handleServiceClick} />
      </main>

      {/* Service Modal - Positioned at root level */}
      {selectedService && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-[9999] p-2 sm:p-4 before:absolute before:inset-0 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-center before:bg-cover before:opacity-40 before:z-[-1]"
          onClick={closeModal}
        >
          <IconLogo className="opacity-10 absolute inset-0 w-full h-full z-[-1]" color="white" />
          <div 
            className="bg-white rounded-xl sm:rounded-2xl max-w-3xl w-full max-h-[80vh] relative shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white border-b border-gray-200 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg">
                    <selectedService.icon className="text-white" size={20} />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">{selectedService.id}</h2>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-5 overflow-y-auto max-h-[60vh]">
              <div className="mb-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">Overview</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{selectedService.detailedInfo.overview}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">What We Offer</h3>
                  <ul className="space-y-1.5">
                    {selectedService.detailedInfo.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-gray-700 text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                    {selectedService.detailedInfo.features.length > 4 && (
                      <li className="text-gray-500 text-xs italic">+ {selectedService.detailedInfo.features.length - 4} more features</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedService.detailedInfo.technologies.slice(0, 6).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {selectedService.detailedInfo.technologies.length > 6 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">+{selectedService.detailedInfo.technologies.length - 6}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-lg p-3 mb-4">
                <h3 className="text-base font-bold text-gray-800 mb-1">Pricing</h3>
                <p className="text-gray-700 text-sm">{selectedService.detailedInfo.pricing}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={() => {
                    closeModal();
                    scrollToSection(contactRef);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 transform hover:scale-105 text-center text-sm"
                >
                  Get Started Today
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 px-5 rounded-lg transition-colors duration-300 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Contact Widget */}
      <div 
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          showSplash ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <button
          onClick={toggleContactDrawer}
          className="floating-widget bg-gradient-to-r from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform cursor-pointer group magnetic-pull"
          aria-label="Open contact form"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300 rounded-full"></div>
          <svg 
            className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:scale-110 micro-tilt" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          
          {/* Enhanced pulse animation ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 animate-pulse opacity-10"></div>
        </button>
      </div>

      {/* Contact Drawer */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          isContactDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-500"
          onClick={closeContactDrawer}
        ></div>
        
        {/* Drawer */}
        <div 
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-500 overflow-y-auto ${
            isContactDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Contact Us</h2>
              <button
                onClick={closeContactDrawer}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                aria-label="Close contact form"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Drawer Content */}
          <div className="p-4">
            <ContactForm 
              onSubmitSuccess={closeContactDrawer}
              className="border-0 bg-transparent p-0"
            />
          </div>
        </div>
      </div>
     
    </div>
  );
}
