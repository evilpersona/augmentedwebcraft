import React, { useEffect, useState } from "react";
import type { Route } from "./../+types/services";
import { FaCode } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { MdMiscellaneousServices } from "react-icons/md";
import { GrHostMaintenance } from "react-icons/gr";
import { IconLogo } from "../components/Logo";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import ContactForm from "~/components/ContactForm";
import FloatingConsultationWidget from "~/components/FloatingConsultationWidget";
import servicesData from "~/data/services.json";

// Icon mapping
const iconMap = {
  FaCode,
  FaUsersGear,
  MdMiscellaneousServices,
  GrHostMaintenance,
};

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Our Services - Augmented Webcraft | Web Development & Consulting" },
    { 
      name: "description", 
      content: "Discover our comprehensive web development services: custom React applications, Next.js solutions, technical consulting, and ongoing maintenance & support." 
    },
    { 
      name: "keywords", 
      content: "web development services, React development, Next.js, custom web solutions, technical consulting, JavaScript, TypeScript, full-stack development" 
    },
    // Open Graph Tags
    { property: "og:title", content: "Our Services - Augmented Webcraft" },
    { property: "og:description", content: "Discover our comprehensive web development services: custom React applications, Next.js solutions, technical consulting, and ongoing maintenance & support." },
    { property: "og:url", content: "https://augmentedwebcraft.com/services" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://augmentedwebcraft.com/og-services.jpg" },
    // Twitter Card Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Our Services - Augmented Webcraft" },
    { name: "twitter:description", content: "Discover our comprehensive web development services and technical consulting solutions." },
  ];
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Augmented Webcraft",
  "url": "https://augmentedwebcraft.com",
  "description": "Expert web development and technical consulting services",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Services",
    "itemListElement": Object.values(servicesData).map((service, index) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.id,
        "description": service.desc
      },
      "url": `https://augmentedwebcraft.com/services/${service.slug}`,
      "position": index + 1
    }))
  }
};

export default function ServicesPage() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  // Scroll animation logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          element.classList.add("animate-in");
          setVisibleElements(prev => new Set(prev).add(element.id));
        }
      });
    }, observerOptions);

    // Observe all elements with data-scroll-animation
    const animatedElements = document.querySelectorAll("[data-scroll-animation]");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-[#050917] min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navbar currentPage="services" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-8 lg:px-12 text-white before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-scroll-animation id="services-title">
              Our Services
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed" data-scroll-animation id="services-subtitle">
              Transform your digital vision into reality with our expert web development and technical consulting services.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 text-white">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-scroll-animation id="services-grid">
            {Object.values(servicesData).map((service, index) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap];
              return (
                <a
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group block w-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/10 focus:shadow-2xl focus:scale-[1.02] focus:bg-white/10 border border-white/10 hover:border-blue-400/50 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900 relative overflow-hidden"
                  aria-label={`Learn more about ${service.id} service`}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-violet-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-violet-600/5 group-hover:to-blue-600/10 transition-all duration-700"></div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/30 rounded-full group-hover:bg-blue-400/60 transition-all duration-500 group-hover:animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-violet-400/40 rounded-full group-hover:bg-violet-400/70 transition-all duration-500 group-hover:animate-pulse delay-100"></div>
                  
                  <div className="relative z-10">
                    {/* Icon and Title Section */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl group-hover:from-blue-400 group-hover:to-violet-400 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:-rotate-3">
                        <IconComponent className="text-white transition-transform duration-500 group-hover:scale-110" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-blue-300 transition-all duration-500 group-hover:translate-x-2">
                          {service.id}
                        </h3>
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full group-hover:w-20 transition-all duration-500"></div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-300 text-base leading-relaxed mb-6 group-hover:text-gray-200 transition-all duration-500">
                      {service.desc}
                    </p>
                    
                    {/* Features Preview */}
                    <div className="mb-6">
                      <h4 className="text-white text-sm font-semibold mb-3 opacity-90">Key Features:</h4>
                      <div className="space-y-2">
                        {service.detailedInfo.features.slice(0, 3).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-gray-300 group-hover:text-gray-200 transition-all duration-300">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-300"></div>
                            {feature}
                          </div>
                        ))}
                        {service.detailedInfo.features.length > 3 && (
                          <div className="text-xs text-gray-400 ml-6 group-hover:text-gray-300">
                            +{service.detailedInfo.features.length - 3} more features
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {service.detailedInfo.technologies.slice(0, 5).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-medium group-hover:bg-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {service.detailedInfo.technologies.length > 5 && (
                          <span className="px-3 py-1 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-full text-xs">
                            +{service.detailedInfo.technologies.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-all duration-500 text-sm group-hover:translate-x-2">
                        <span>Explore Service</span>
                        <svg className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded group-hover:bg-gray-800/70 transition-all duration-300">
                        Learn More
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 text-white">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why Choose Augmented Webcraft?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We combine technical expertise with business understanding to deliver solutions that drive real results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Team",
                description: "Experienced developers with deep knowledge of modern web technologies and best practices."
              },
              {
                title: "Custom Solutions",
                description: "Tailored approaches that fit your specific business needs and technical requirements."
              },
              {
                title: "Ongoing Support",
                description: "Comprehensive maintenance and support to keep your solutions running smoothly."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 text-white">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss your needs and find the perfect solution for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </a>
            <a
              href="/#services"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 border border-white/20"
            >
              View Interactive Demo
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-white/5">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-gray-300">Ready to discuss your project? Contact us for a free consultation.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer onServiceClick={() => {}} />
      
      {/* Floating Consultation Widget */}
      <FloatingConsultationWidget />
    </div>
  );
}