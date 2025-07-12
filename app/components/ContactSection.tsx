import React, { useState } from "react";
import ContactForm from "./ContactForm";

const ContactSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {

    return (
      <section
        ref={ref}
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
                  <span className="text-sm sm:text-base lg:text-lg">Available for consultation calls <a href="https://calendly.com/augmentedwebcraft/free-consultation" className="text-blue-300 hover:text-blue-200 underline">Schedule Now</a></span>
                </p>
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
      </section>
    );
  }
);

ContactSection.displayName = "ContactSection";
export default ContactSection;