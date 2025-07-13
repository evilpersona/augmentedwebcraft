import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Route } from "./../+types/services.$slug";
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

// SEO Meta Tags Export
export const meta: Route.MetaFunction = ({ params }) => {
  const { slug } = params;
  const service = servicesData[slug as keyof typeof servicesData];
  
  if (!service) {
    return [
      { title: "Service Not Found - Augmented Webcraft" },
      { name: "description", content: "The requested service was not found." }
    ];
  }

  return [
    { title: service.seo.title },
    { name: "description", content: service.seo.description },
    { name: "keywords", content: service.seo.keywords },
    
    // Open Graph Tags
    { property: "og:title", content: service.seo.title },
    { property: "og:description", content: service.seo.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `https://augmentedwebcraft.com/services/${slug}` },
    { property: "og:image", content: `https://augmentedwebcraft.com/services/${slug}-og.jpg` },
    
    // Twitter Card Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: service.seo.title },
    { name: "twitter:description", content: service.seo.description },
    { name: "twitter:image", content: `https://augmentedwebcraft.com/services/${slug}-twitter.jpg` },
  ];
};

export default function ServicePage() {
  const { slug } = useParams();
  const service = servicesData[slug as keyof typeof servicesData];
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

  if (!service) {
    return (
      <div className="relative bg-[#050917] min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-xl text-gray-300 mb-8">The requested service could not be found.</p>
          <a
            href="/services"
            className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
          >
            View All Services
          </a>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon as keyof typeof iconMap];

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.id,
    "description": service.desc,
    "provider": {
      "@type": "Organization",
      "name": "Augmented Webcraft",
      "url": "https://augmentedwebcraft.com"
    },
    "serviceType": service.id,
    "areaServed": "Worldwide",
    "offers": {
      "@type": "Offer",
      "description": service.detailedInfo.pricing
    }
  };

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
            <div className="flex justify-center mb-6" data-scroll-animation id="service-icon">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl shadow-lg">
                <IconComponent className="text-white" size={48} />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-scroll-animation id="service-title">
              {service.id}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed" data-scroll-animation id="service-description">
              {service.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 text-white">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-scroll-animation id="overview-content">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">What We Do</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {service.detailedInfo.overview}
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Investment</h3>
                <p className="text-gray-700">{service.detailedInfo.pricing}</p>
              </div>
            </div>
            <div className="relative" data-scroll-animation id="overview-visual">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-2xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <IconLogo color="white" className="w-full h-48 opacity-20 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Professional Service</h3>
                <p className="text-gray-300">
                  Our expert team delivers high-quality solutions using industry best practices and cutting-edge technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 text-white">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" data-scroll-animation id="features-title">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-scroll-animation id="features-grid">
            {service.detailedInfo.features.map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full mb-4"></div>
                <h3 className="text-lg font-semibold mb-3">{feature}</h3>
                <p className="text-gray-300 text-sm">
                  Professional implementation of {feature.toLowerCase()} with focus on quality and results.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 text-white">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" data-scroll-animation id="tech-title">Technologies & Tools</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12" data-scroll-animation id="tech-tags">
            {service.detailedInfo.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/30 text-white rounded-full text-sm font-medium hover:from-blue-600/30 hover:to-violet-600/30 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our technology stack is carefully chosen to ensure optimal performance, security, and maintainability. 
              We stay current with industry standards and best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 text-white">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.detailedInfo.process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss your project and see how we can help achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
            </a>
            <a
              href="/services"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 border border-white/20"
            >
              View All Services
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-white/5">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-gray-300">Ready to start your project? Contact us today for a consultation.</p>
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