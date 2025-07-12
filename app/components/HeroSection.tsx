import React from "react"
import { FullLogo, IconLogo } from "./Logo";

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollToContact?: () => void;
  scrollToServices?: () => void;
  id?: string;
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ scrollToContact, scrollToServices, id, ...props }, ref) => (
<section 
  ref={ref}
  id={id}
  {...props}
  className="md:snap-always w-screen min-h-screen flex items-center justify-center md:snap-center relative overflow-hidden pt-16 sm:pt-20 md:pt-28 before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2"
>
    <IconLogo className="opacity-5 absolute top-0 left-0 w-screen h-screen z-1" color="white" />
    
    {/* Floating particles */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-violet-400 rounded-full animate-pulse opacity-80 animation-delay-1000"></div>
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse opacity-40 animation-delay-2000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse opacity-70 animation-delay-3000"></div>
    </div>

  <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pb-10 z-10 relative">
    
    {/* Title */}
    <div 
      className="mt-5 max-w-4xl text-center mx-auto"
      data-scroll-animation
      id="hero-title"
    >
      <h1 className="block font-bold text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight">
        Augmented <span className="bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 text-transparent">Webcraft</span>
      </h1>
    </div>
    {/* End Title */}

    <div 
      className="mt-6 sm:mt-8 max-w-4xl text-center mx-auto px-4"
      data-scroll-animation
      id="hero-subtitle"
    >
      <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
        We help businesses and agencies bring their digital projects to life with expert technical consulting and custom development.
      </p>
    </div>

    {/* Enhanced Features */}
    <div 
      className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4"
      data-scroll-animation
      id="hero-features"
    >
      <div className="text-center p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">⚡</div>
        <h3 className="text-white font-semibold text-base sm:text-lg mb-2">Fast Development</h3>
        <p className="text-slate-300 text-xs sm:text-sm">Rapid prototyping and deployment with modern frameworks</p>
      </div>
      <div className="text-center p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🎯</div>
        <h3 className="text-white font-semibold text-base sm:text-lg mb-2">Expert Solutions</h3>
        <p className="text-slate-300 text-xs sm:text-sm">Custom-tailored solutions for your unique challenges</p>
      </div>
      <div className="text-center p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 sm:col-span-2 md:col-span-1">
        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🚀</div>
        <h3 className="text-white font-semibold text-base sm:text-lg mb-2">Scalable Results</h3>
        <p className="text-slate-300 text-xs sm:text-sm">Built to grow with your business needs</p>
      </div>
    </div>

    {/* Buttons */}
    <div 
      className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
      data-scroll-animation
      id="hero-buttons"
    >
      <button 
        onClick={scrollToContact}
        className="w-full sm:w-auto inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-r from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-base sm:text-lg font-semibold rounded-xl py-3 sm:py-4 px-6 sm:px-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer group relative overflow-hidden"
      >
        <span className="relative z-10">Get Started Today</span>
        <svg className="shrink-0 size-4 sm:size-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
      </button>
      <button 
        onClick={scrollToServices}
        className="w-full sm:w-auto inline-flex justify-center items-center gap-x-3 text-center bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 hover:border-white/50 text-white text-base sm:text-lg font-medium rounded-xl py-3 sm:py-4 px-6 sm:px-8 transition-all duration-300 cursor-pointer hover:scale-105 group relative overflow-hidden"
      >
        <span className="relative z-10">View Our Services</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </button>
    </div>
    {/* End Buttons */}
  </div>
</section>
)
);

HeroSection.displayName = 'HeroSection'
export default HeroSection



