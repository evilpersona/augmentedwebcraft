import React, { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import FloatingConsultationWidget from "~/components/FloatingConsultationWidget";

export const meta: any = () => {
  return [
    { title: "Privacy Policy - Augmented Webcraft" },
    { 
      name: "description", 
      content: "Privacy Policy for Augmented Webcraft. Learn how we collect, use, and protect your personal information." 
    },
    { 
      name: "keywords", 
      content: "privacy policy, data protection, personal information, cookies, GDPR, privacy rights" 
    },
    // Open Graph Tags
    { property: "og:title", content: "Privacy Policy - Augmented Webcraft" },
    { property: "og:description", content: "Privacy Policy for Augmented Webcraft. Learn how we collect, use, and protect your personal information." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://augmentedwebcraft.com/privacy" },
  ];
};

export default function PrivacyPage() {
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-scroll-animation id="privacy-title">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 mb-6" data-scroll-animation id="privacy-subtitle">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 text-white">
        <div className="w-full max-w-4xl mx-auto prose prose-invert prose-lg">
          
          <div data-scroll-animation id="privacy-intro" className="mb-12">
            <p className="text-gray-300 text-lg leading-relaxed">
              At Augmented Webcraft, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>
          </div>

          <div data-scroll-animation id="privacy-section-1" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Personal Information</h3>
            <p className="text-gray-300 mb-4">We may collect the following personal information:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Name and contact information (email address, phone number)</li>
              <li>Company information and job title</li>
              <li>Project details and requirements</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 text-gray-200">Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>IP address and browser information</li>
              <li>Device type and operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referral sources and search terms</li>
            </ul>
          </div>

          <div data-scroll-animation id="privacy-section-2" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">We use your information to:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Provide and improve our services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send project updates and important notifications</li>
              <li>Analyze website usage and optimize user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div data-scroll-animation id="privacy-section-3" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">3. Information Sharing</h2>
            <p className="text-gray-300 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements or court orders</li>
              <li>To protect our rights, property, or safety</li>
              <li>With trusted service providers who assist in our operations</li>
            </ul>
          </div>

          <div data-scroll-animation id="privacy-section-4" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">4. Data Security</h2>
            <p className="text-gray-300 mb-6">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div data-scroll-animation id="privacy-section-5" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">5. Cookies and Tracking</h2>
            <p className="text-gray-300 mb-4">Our website uses cookies and similar technologies to:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and performance</li>
              <li>Provide personalized content and advertisements</li>
              <li>Improve our services and user experience</li>
            </ul>
            <p className="text-gray-300 mb-6">
              You can control cookie settings through your browser preferences.
            </p>
          </div>

          <div data-scroll-animation id="privacy-section-6" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">6. Your Rights</h2>
            <p className="text-gray-300 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </div>

          <div data-scroll-animation id="privacy-section-7" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">7. Data Retention</h2>
            <p className="text-gray-300 mb-6">
              We retain your personal data only for as long as necessary to fulfill the purposes outlined in this privacy policy, 
              comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </div>

          <div data-scroll-animation id="privacy-section-8" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">8. Changes to This Policy</h2>
            <p className="text-gray-300 mb-6">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page 
              and updating the "Last updated" date.
            </p>
          </div>

          <div data-scroll-animation id="privacy-contact" className="mb-12 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p><strong>Email:</strong> privacy@augmentedwebcraft.com</p>
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