import React, { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import FloatingConsultationWidget from "~/components/FloatingConsultationWidget";

export const meta: any = () => {
  return [
    { title: "Terms of Service - Augmented Webcraft" },
    { 
      name: "description", 
      content: "Terms of Service for Augmented Webcraft. Legal terms and conditions for using our web development services." 
    },
    { 
      name: "keywords", 
      content: "terms of service, legal terms, conditions, web development agreement, service terms" 
    },
    // Open Graph Tags
    { property: "og:title", content: "Terms of Service - Augmented Webcraft" },
    { property: "og:description", content: "Terms of Service for Augmented Webcraft. Legal terms and conditions for using our web development services." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://augmentedwebcraft.com/terms" },
  ];
};

export default function TermsPage() {
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
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-8 lg:px-12 text-white before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-scroll-animation id="terms-title">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300 mb-6" data-scroll-animation id="terms-subtitle">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 text-white">
        <div className="w-full max-w-4xl mx-auto prose prose-invert prose-lg">
          
          <div data-scroll-animation id="terms-intro" className="mb-12">
            <p className="text-gray-300 text-lg leading-relaxed">
              These Terms of Service ("Terms") govern your use of Augmented Webcraft's website and services. 
              By accessing our website or engaging our services, you agree to be bound by these Terms.
            </p>
          </div>

          <div data-scroll-animation id="terms-section-1" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-6">
              By accessing and using our website or services, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div data-scroll-animation id="terms-section-2" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">2. Services Description</h2>
            <p className="text-gray-300 mb-4">Augmented Webcraft provides:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Custom web development services</li>
              <li>Technical consulting and development assistance</li>
              <li>Website maintenance and support</li>
              <li>Custom software solutions and integrations</li>
            </ul>
            <p className="text-gray-300 mb-6">
              Specific deliverables, timelines, and pricing will be outlined in individual project agreements.
            </p>
          </div>

          <div data-scroll-animation id="terms-section-3" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">3. Client Responsibilities</h2>
            <p className="text-gray-300 mb-4">As a client, you agree to:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Respond to requests for feedback in a timely manner</li>
              <li>Provide necessary content, materials, and access</li>
              <li>Make payments according to agreed terms</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </div>

          <div data-scroll-animation id="terms-section-4" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">4. Payment Terms</h2>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Payment terms will be specified in individual project agreements</li>
              <li>Late payments may incur additional fees</li>
              <li>All prices are exclusive of applicable taxes</li>
              <li>Refunds are subject to the terms of individual agreements</li>
            </ul>
          </div>

          <div data-scroll-animation id="terms-section-5" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">5. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Client Content</h3>
            <p className="text-gray-300 mb-4">
              You retain ownership of all content, materials, and intellectual property you provide to us.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-gray-200">Developed Work</h3>
            <p className="text-gray-300 mb-4">
              Upon full payment, you will own the custom code and designs created specifically for your project. 
              We retain rights to any pre-existing tools, frameworks, or methodologies used.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-gray-200">Portfolio Rights</h3>
            <p className="text-gray-300 mb-6">
              We reserve the right to display completed work in our portfolio and marketing materials, 
              unless otherwise agreed in writing.
            </p>
          </div>

          <div data-scroll-animation id="terms-section-6" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">6. Limitation of Liability</h2>
            <p className="text-gray-300 mb-6">
              To the maximum extent permitted by law, Augmented Webcraft shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
              whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
          </div>

          <div data-scroll-animation id="terms-section-7" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">7. Warranties and Disclaimers</h2>
            <p className="text-gray-300 mb-4">
              We warrant that our services will be performed in a professional manner consistent with industry standards. 
              However, we make no other warranties, express or implied, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>That our services will be uninterrupted or error-free</li>
              <li>That all errors will be corrected</li>
            </ul>
          </div>

          <div data-scroll-animation id="terms-section-8" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">8. Termination</h2>
            <p className="text-gray-300 mb-4">
              Either party may terminate a project agreement with written notice. In case of termination:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Payment is due for all work completed to date</li>
              <li>We will provide deliverables for paid work</li>
              <li>Confidentiality obligations remain in effect</li>
            </ul>
          </div>

          <div data-scroll-animation id="terms-section-9" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">9. Confidentiality</h2>
            <p className="text-gray-300 mb-6">
              We agree to maintain the confidentiality of all proprietary information shared by clients 
              and will not disclose such information to third parties without written consent.
            </p>
          </div>

          <div data-scroll-animation id="terms-section-10" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">10. Governing Law</h2>
            <p className="text-gray-300 mb-6">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
              in which Augmented Webcraft operates, without regard to conflict of law principles.
            </p>
          </div>

          <div data-scroll-animation id="terms-section-11" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">11. Changes to Terms</h2>
            <p className="text-gray-300 mb-6">
              We reserve the right to modify these Terms at any time. Updated terms will be posted on our website 
              with a revised "Last updated" date. Continued use of our services constitutes acceptance of modified terms.
            </p>
          </div>

          <div data-scroll-animation id="terms-contact" className="mb-12 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Contact Information</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p><strong>Email:</strong> legal@augmentedwebcraft.com</p>
              <p><strong>Website:</strong> https://augmentedwebcraft.com</p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
      
      {/* Floating Consultation Widget */}
      <FloatingConsultationWidget />
    </div>
  );
};