import React, { useState } from "react";
import { GrHostMaintenance } from "react-icons/gr";
import { FaCode } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { MdMiscellaneousServices } from "react-icons/md";
import { IconLogo } from "./Logo";
import TagManager from 'react-gtm-module';

const Services = [
    {
        'id':'Web Development',
        'desc': 'From sleek marketing sites to dynamic web applications, we design and build modern websites using the latest frameworks and best practices',
        'icon': FaCode,
        'detailedInfo': {
            'overview': 'We create modern, responsive websites and web applications that deliver exceptional user experiences and drive business growth.',
            'features': [
                'Custom website design and development',
                'E-commerce platforms and online stores',
                'Progressive Web Applications (PWAs)',
                'Content Management Systems',
                'Performance optimization and SEO',
                'Mobile-first responsive design'
            ],
            'technologies': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'MongoDB'],
            'pricing': 'Starting from $2,500 for basic websites, custom quotes for complex applications'
        }
    },
    {
        'id': 'Development Assistance',
        'desc': 'Need extra hands or advanced skills for your team? We provide reliable development support for projects big and small, with deep expertise in React, Next.js, PHP, WordPress, Python, and Django.',
        'icon': FaUsersGear,
        'detailedInfo': {
            'overview': 'Augment your development team with our experienced engineers who integrate seamlessly with your existing workflow.',
            'features': [
                'Dedicated developer assignments',
                'Code review and mentoring',
                'Technical architecture consultation',
                'Emergency bug fixes and support',
                'Legacy system modernization',
                'Team training and knowledge transfer'
            ],
            'technologies': ['React', 'Next.js', 'PHP', 'WordPress', 'Python', 'Django', 'Laravel', 'Vue.js'],
            'pricing': '$75-150/hour depending on expertise level and project complexity'
        }
    },
    {
        'id': 'Custom Solutions & Integrations',
        'desc': 'Whether it\'s automating workflows, connecting APIs, or building custom plugins and features, we solve complex technical challenges so you can focus on your business.',
        'icon': MdMiscellaneousServices,
        'detailedInfo': {
            'overview': 'We build custom software solutions and integrations that streamline your business processes and connect your systems.',
            'features': [
                'API development and integration',
                'Workflow automation tools',
                'Custom plugins and extensions',
                'Third-party service integrations',
                'Database design and optimization',
                'Cloud infrastructure setup'
            ],
            'technologies': ['REST APIs', 'GraphQL', 'Webhooks', 'AWS', 'Google Cloud', 'Zapier', 'Salesforce'],
            'pricing': 'Project-based pricing from $1,500 to $25,000+ depending on complexity'
        }
    },
    {
        'id': 'Ongoing Maintenance & Support',
        'desc': 'Keep your site running smoothly with proactive updates, security monitoring, and technical support you can count on.',
        'icon': GrHostMaintenance,
        'detailedInfo': {
            'overview': 'Comprehensive maintenance and support services to keep your website secure, updated, and performing optimally.',
            'features': [
                'Regular security updates and patches',
                'Performance monitoring and optimization',
                'Backup and disaster recovery',
                '24/7 uptime monitoring',
                'Content updates and modifications',
                'Technical support and troubleshooting'
            ],
            'technologies': ['Monitoring Tools', 'Security Scanners', 'CDN Services', 'Backup Solutions'],
            'pricing': 'Monthly retainers starting from $250/month, annual plans available'
        }
    }
]

interface ServicesSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedService?: typeof Services[0] | null;
  setSelectedService?: (service: typeof Services[0] | null) => void;
  closeModal?: () => void;
}

const ServicesSection = React.forwardRef<HTMLDivElement, ServicesSectionProps>(
  ({ selectedService: externalSelectedService, setSelectedService: externalSetSelectedService, closeModal: externalCloseModal, ...props }, ref) => {
    // Use internal state if external state is not provided
    const [internalSelectedService, setInternalSelectedService] = useState<typeof Services[0] | null>(null);
    
    const selectedService = externalSelectedService !== undefined ? externalSelectedService : internalSelectedService;
    const setSelectedService = externalSetSelectedService || setInternalSelectedService;
    
    const openModal = (service: typeof Services[0]) => {
      // Track service modal opening in GTM
      TagManager.dataLayer({
        dataLayer: {
          event: 'service_modal_open',
          service_name: service.id,
          service_category: 'web_development'
        }
      });
      
      setSelectedService(service);
    };

    const closeModal = () => {
      if (externalCloseModal) {
        externalCloseModal();
      } else {
        setInternalSelectedService(null);
      }
    };

    return (
    <section
      ref={ref}
      className="pt-16 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-8 lg:px-12 text-white relative flex flex-col items-start justify-center w-screen min-h-screen md:snap-always md:snap-center before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2"
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
            onClick={() => openModal(item)}
            className="group w-full min-h-32 sm:min-h-36 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-gray-100 border border-gray-200 hover:border-blue-300 relative overflow-hidden"
            data-scroll-animation
            id={`service-card-${i}`}
            style={{ animationDelay: `${i * 0.15}s` }}
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
                      Learn more →
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
