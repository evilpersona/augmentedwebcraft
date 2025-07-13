import React, { useState } from "react";
import { GrHostMaintenance } from "react-icons/gr";
import { FaCode } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { MdMiscellaneousServices } from "react-icons/md";
import { IconLogo } from "./Logo";
import TagManager from 'react-gtm-module';
import servicesData from "~/data/services.json";

// Icon mapping for services
const iconMap = {
  FaCode,
  FaUsersGear,
  MdMiscellaneousServices,
  GrHostMaintenance,
};

// Convert services data to match existing format
const Services = Object.values(servicesData).map(service => ({
  id: service.id,
  desc: service.desc,
  icon: iconMap[service.icon as keyof typeof iconMap],
  slug: service.slug,
  detailedInfo: service.detailedInfo
}));

interface ServicesSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
}

const ServicesSection = React.forwardRef<HTMLDivElement, ServicesSectionProps>(
  ({ id, ...props }, ref) => {
    
    const navigateToService = (service: typeof Services[0]) => {
      // Track service navigation in GTM
      TagManager.dataLayer({
        dataLayer: {
          event: 'service_page_navigate',
          service_name: service.id,
          service_category: 'web_development'
        }
      });
      
      // Navigate to individual service page
      window.location.href = `/services/${service.slug}`;
    };

    const handleKeyDown = (e: React.KeyboardEvent, service: typeof Services[0]) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigateToService(service);
      }
    };

    return (
    <section
      ref={ref}
      id={id}
      className="pt-16 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-8 lg:px-12 text-white relative flex flex-col items-start justify-center w-screen min-h-screen md:snap-always md:snap-center before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2"
      {...props}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div 
          data-scroll-animation
          id="services-header"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-2">Our Services</h2>
          <hr className="bg-linear-to-tl from-blue-600 to-violet-600 h-1 border-0 w-full mb-4" />
          <p className="text-lg sm:text-xl lg:text-2xl mb-6">At Augmented Webcraft, we help businesses and agencies bring their digital projects to life with expert technical consulting and custom development. Our team specializes in:</p>
        </div>
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6"
          id="services-grid"
        >
          {Services.map((item, i) => (
          <div 
            key={i}
            onClick={() => navigateToService(item)}
            onKeyDown={(e) => handleKeyDown(e, item)}
            className="group w-full min-h-32 sm:min-h-36 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-gray-100 border border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:shadow-2xl focus:scale-105 relative overflow-hidden"
            data-scroll-animation
            id={`service-card-${i}`}
            style={{ animationDelay: `${i * 0.15}s` }}
            tabIndex={0}
            role="button"
            aria-label={`Navigate to ${item.id} service page`}
          >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="w-full sm:w-1/4 flex items-center justify-center sm:justify-center mb-4 sm:mb-0 relative z-10">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl group-hover:from-blue-600 group-hover:to-violet-600 transition-all duration-500 shadow-lg group-hover:scale-110 group-hover:rotate-3">
                      <item.icon className="text-white transition-transform duration-500 group-hover:scale-110" size={28} />
                  </div>
              </div>
              <div className="w-full sm:w-3/4 flex flex-col sm:pl-4 relative z-10">
                  <h3 className="text-black text-lg sm:text-xl font-bold mb-2 group-hover:text-gray-800 transition-all duration-500 text-center sm:text-left group-hover:translate-x-2">{item.id}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-600 transition-all duration-500 text-center sm:text-left">{item.desc}</p>
                  <div className="mt-3 text-blue-600 font-medium group-hover:text-blue-700 transition-all duration-500 text-sm text-center sm:text-left group-hover:translate-x-4">
                      View service page →
                  </div>
              </div>
          </div>  
          ))}
        </div>
      </div>
    </section>
    );
  }
);

ServicesSection.displayName = "ServicesSection";
export default ServicesSection;
export { Services };
