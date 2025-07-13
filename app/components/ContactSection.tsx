import React, { useState } from "react";
import ContactForm from "./ContactForm";
import CalendlyModal from "./CalendlyModal";

interface ContactSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
}

const ContactSection = React.forwardRef<HTMLDivElement, ContactSectionProps>(
  ({ id, ...props }, ref) => {
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

    const openCalendly = () => setIsCalendlyOpen(true);
    const closeCalendly = () => setIsCalendlyOpen(false);

    return (
      <section
        ref={ref}
        id={id}
        className="pt-16 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-8 lg:px-12 text-white relative flex flex-col items-start justify-center w-screen min-h-screen md:snap-always md:snap-center before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2"
        {...props}
      >
        
        
        <div className="flex flex-col lg:flex-row w-full h-full max-w-7xl mx-auto gap-8 lg:gap-0">
          <div 
            className="w-full lg:w-1/2 flex flex-col justify-center lg:pr-8"
            data-scroll-animation
            id="contact-info"
          >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-2">Get In Touch</h2>
        <hr className="bg-linear-to-tl from-blue-600 to-violet-600 h-1 border-0 w-full mb-4" />
        <p className="text-lg sm:text-xl lg:text-2xl mb-6 lg:mb-8">Ready to bring your digital project to life? Let's discuss how we can help.</p>
            <div className="text-white space-y-4 lg:space-y-6">
              <div className="space-y-3 lg:space-y-4 text-slate-300 text-base sm:text-lg">
                <p className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">📧</span>
                  <span className="text-sm sm:text-base lg:text-lg">hello@augmentedwebcraft.com</span>
                </p>
                <p className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">📱</span>
                  <span className="text-sm sm:text-base lg:text-lg">Available for consultation calls</span>
                </p>
                <div className="mt-4 lg:mt-6">
                  <button 
                    onClick={openCalendly} 
                    className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/25 cursor-pointer group relative overflow-hidden border-2 border-blue-500/30 hover:border-blue-400/50"
                  >
                    <span className="relative z-10 flex items-center text-lg">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Schedule Free Consultation
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-violet-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
                <p className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">🌍</span>
                  <span className="text-sm sm:text-base lg:text-lg">Remote-first, serving clients worldwide</span>
                </p>
              </div>
            </div>
          </div>
          
          <div 
            className="w-full lg:w-1/2 flex flex-col justify-center"
            data-scroll-animation
            id="contact-form"
          >
            <ContactForm className="w-full max-w-2xl mx-auto lg:mx-0" />
          </div>
        </div>

        {/* Calendly Modal */}
        <CalendlyModal 
          isOpen={isCalendlyOpen} 
          onClose={closeCalendly}
        />
      </section>
    );
  }
);

ContactSection.displayName = "ContactSection";
export default ContactSection;