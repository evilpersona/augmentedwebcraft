import React, { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import FloatingConsultationWidget from "~/components/FloatingConsultationWidget";

export const meta: any = () => {
  return [
    { title: "Accessibility Statement - Augmented Webcraft" },
    { 
      name: "description", 
      content: "Accessibility Statement for Augmented Webcraft. Learn about our commitment to web accessibility and inclusive design." 
    },
    { 
      name: "keywords", 
      content: "accessibility, WCAG, ADA compliance, inclusive design, web accessibility, disability access" 
    },
    // Open Graph Tags
    { property: "og:title", content: "Accessibility Statement - Augmented Webcraft" },
    { property: "og:description", content: "Accessibility Statement for Augmented Webcraft. Learn about our commitment to web accessibility and inclusive design." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://augmentedwebcraft.com/accessibility" },
  ];
};

export default function AccessibilityPage() {
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-scroll-animation id="accessibility-title">
              Accessibility Statement
            </h1>
            <p className="text-xl text-gray-300 mb-6" data-scroll-animation id="accessibility-subtitle">
              Our commitment to inclusive web design and accessibility
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 text-white">
        <div className="w-full max-w-4xl mx-auto prose prose-invert prose-lg">
          
          <div data-scroll-animation id="accessibility-intro" className="mb-12">
            <p className="text-gray-300 text-lg leading-relaxed">
              Augmented Webcraft is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>
          </div>

          <div data-scroll-animation id="accessibility-section-1" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Our Commitment</h2>
            <p className="text-gray-300 mb-6">
              We believe that the web should be accessible to everyone, regardless of ability or technology. 
              We strive to make our website and the websites we create for our clients inclusive and accessible to all users.
            </p>
          </div>

          <div data-scroll-animation id="accessibility-section-2" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Accessibility Standards</h2>
            <p className="text-gray-300 mb-4">
              We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
              These guidelines explain how to make web content more accessible for people with disabilities, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Visual impairments (blindness, low vision, color blindness)</li>
              <li>Hearing impairments (deafness, hard of hearing)</li>
              <li>Motor impairments (difficulty using a mouse, slow response time)</li>
              <li>Cognitive impairments (dyslexia, learning disabilities, attention disorders)</li>
            </ul>
          </div>

          <div data-scroll-animation id="accessibility-section-3" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Accessibility Features</h2>
            <p className="text-gray-300 mb-4">Our website includes the following accessibility features:</p>
            
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Keyboard Navigation</h3>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>All interactive elements are keyboard accessible</li>
              <li>Logical tab order throughout the site</li>
              <li>Visible focus indicators for keyboard users</li>
              <li>Skip links to main content areas</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 text-gray-200">Visual Design</h3>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>High contrast colors for better readability</li>
              <li>Scalable text that can be enlarged up to 200%</li>
              <li>Clear visual hierarchy and consistent layout</li>
              <li>Alternative text for all informative images</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 text-gray-200">Content Structure</h3>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Semantic HTML markup for screen readers</li>
              <li>Proper heading structure (H1, H2, H3, etc.)</li>
              <li>Descriptive link text and button labels</li>
              <li>Form labels and error messaging</li>
            </ul>
          </div>

          <div data-scroll-animation id="accessibility-section-4" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Assistive Technology Compatibility</h2>
            <p className="text-gray-300 mb-4">Our website is designed to be compatible with:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
              <li>Voice recognition software</li>
              <li>Alternative keyboards and pointing devices</li>
              <li>Browser zoom and magnification tools</li>
            </ul>
          </div>

          <div data-scroll-animation id="accessibility-section-5" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Our Services</h2>
            <p className="text-gray-300 mb-4">
              We offer accessibility consulting and implementation services for our clients, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Accessibility audits and testing</li>
              <li>WCAG compliance implementation</li>
              <li>Screen reader optimization</li>
              <li>Keyboard navigation improvements</li>
              <li>Color contrast and visual design enhancements</li>
              <li>Accessible form design and validation</li>
              <li>Training and documentation</li>
            </ul>
          </div>

          <div data-scroll-animation id="accessibility-section-6" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Ongoing Efforts</h2>
            <p className="text-gray-300 mb-4">
              Accessibility is an ongoing effort. We regularly:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Test our website with assistive technologies</li>
              <li>Review and update content for accessibility</li>
              <li>Train our team on accessibility best practices</li>
              <li>Stay current with accessibility guidelines and standards</li>
              <li>Incorporate user feedback to improve accessibility</li>
            </ul>
          </div>

          <div data-scroll-animation id="accessibility-section-7" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Known Issues</h2>
            <p className="text-gray-300 mb-6">
              We are continuously working to improve accessibility. Some third-party integrations 
              (such as embedded calendars or maps) may have accessibility limitations that we cannot directly control. 
              We are working with these providers to address these issues.
            </p>
          </div>

          <div data-scroll-animation id="accessibility-section-8" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Browser and Device Support</h2>
            <p className="text-gray-300 mb-4">Our website is designed to work with:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Modern web browsers (Chrome, Firefox, Safari, Edge)</li>
              <li>Mobile devices and tablets</li>
              <li>Various screen sizes and orientations</li>
              <li>Different input methods (mouse, keyboard, touch)</li>
            </ul>
          </div>

          <div data-scroll-animation id="accessibility-feedback" className="mb-12 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Feedback and Support</h2>
            <p className="text-gray-300 mb-4">
              We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers 
              or have suggestions for improvement, please let us know:
            </p>
            <div className="space-y-2 text-gray-300 mb-6">
              <p><strong>Email:</strong> accessibility@augmentedwebcraft.com</p>
              <p><strong>Phone:</strong> Available upon request</p>
              <p><strong>Website:</strong> https://augmentedwebcraft.com/contact</p>
            </div>
            <p className="text-gray-300">
              We aim to respond to accessibility feedback within 2 business days and will work with you 
              to provide the information or functionality you seek through an alternative communication method.
            </p>
          </div>

          <div data-scroll-animation id="accessibility-resources" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Accessibility Resources</h2>
            <p className="text-gray-300 mb-4">Learn more about web accessibility:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Web Content Accessibility Guidelines (WCAG)</li>
              <li>Web Accessibility Initiative (WAI)</li>
              <li>Americans with Disabilities Act (ADA)</li>
              <li>Section 508 Compliance</li>
            </ul>
          </div>

        </div>
      </section>

      <Footer />
      
      {/* Floating Consultation Widget */}
      <FloatingConsultationWidget />
    </div>
  );
};