import React from "react";
import { FullLogo } from "./Logo";
import servicesData from "~/data/services.json";

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  ({ ...props }, ref) => {
    // Get services from JSON data
    const services = Object.values(servicesData);

    return (
    <footer 
      ref={ref} 
      className="pt-16 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 text-white relative flex flex-col items-center justify-center w-full bg-[#050917] before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2" 
      role="contentinfo"
      aria-label="Site footer with company information and links"
      {...props}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 w-full">
        {/* Company Info */}
        <div 
          className="col-span-1 md:col-span-2 text-center md:text-left"
          id="footer-company"
        >
          <FullLogo color="white" className="w-48 sm:w-56 lg:w-64 mb-4 sm:mb-6 mx-auto md:mx-0" />
          <p className="text-slate-300 text-base sm:text-lg mb-4 sm:mb-6 max-w-md mx-auto md:mx-0">
            We help businesses and agencies bring their digital projects to life with expert technical consulting and custom development.
          </p>
          <div className="space-y-2 sm:space-y-3 text-slate-300 text-sm sm:text-base">
            <p className="flex items-center justify-center md:justify-start">
              <span className="mr-2">📧</span>
              hello@augmentedwebcraft.com
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <span className="mr-2">📱</span>
              Available for consultation calls
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <span className="mr-2">🌍</span>
              Remote-first, serving clients worldwide
            </p>
          </div>
        </div>

        {/* Services */}
        <nav 
          className="text-center md:text-left"
          id="footer-services"
          aria-labelledby="footer-services-heading"
        >
          <h3 id="footer-services-heading" className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">Services</h3>
          <ul className="space-y-2 sm:space-y-3 text-slate-300 text-sm sm:text-base" role="list">
            {services.map((service, index) => (
              <li key={service.slug}>
                <a 
                  href={`/services/${service.slug}`}
                  className="hover:text-blue-300 transition-all duration-300 cursor-pointer block w-full text-center md:text-left hover:scale-105 hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                  aria-label={`Learn more about ${service.id} service`}
                >
                  {service.id}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Technologies & Links */}
        <div 
          className="text-center md:text-left"
          id="footer-technologies"
          aria-labelledby="footer-technologies-heading"
        >
          <h3 id="footer-technologies-heading" className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">Technologies</h3>
          <ul className="space-y-2 sm:space-y-3 text-slate-300 text-sm sm:text-base" role="list">
            <li>React & Next.js</li>
            <li>TypeScript</li>
            <li>Python & Django</li>
            <li>PHP & WordPress</li>
            <li>Node.js</li>
            <li>Cloud Platforms</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full max-w-7xl mx-auto mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="text-slate-400 text-xs sm:text-sm text-center md:text-left">
            Copyright &copy; 2025 Augmented Webcraft. All rights reserved.
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-slate-400 text-xs sm:text-sm" aria-label="Legal pages navigation">
            <a href="/privacy" className="hover:text-blue-300 transition-all duration-300 cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900 rounded">Privacy Policy</a>
            <a href="/terms" className="hover:text-blue-300 transition-all duration-300 cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900 rounded">Terms of Service</a>
            <a href="/accessibility" className="hover:text-blue-300 transition-all duration-300 cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900 rounded">Accessibility Statement</a>
          </nav>
        </div>
      </div>
    </footer>
    );
  }
);

Footer.displayName = "Footer"
export default Footer