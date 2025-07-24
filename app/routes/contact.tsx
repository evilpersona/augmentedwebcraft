import React, { useState, useEffect } from "react";
import type { Route } from "./../+types/contact";
import { sendContactEmails } from "~/lib/sendgrid.server";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import ContactForm from "~/components/ContactForm";
import CalendlyModal from "~/components/CalendlyModal";
import FloatingConsultationWidget from "~/components/FloatingConsultationWidget";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Contact Us - Augmented Webcraft | Get Your Project Started" },
    { 
      name: "description", 
      content: "Ready to bring your digital project to life? Contact Augmented Webcraft for expert web development consultation and custom solutions." 
    },
    { 
      name: "keywords", 
      content: "contact web development, project consultation, custom web solutions, React development quote, technical consulting" 
    },
    // Open Graph Tags
    { property: "og:title", content: "Contact Us - Augmented Webcraft" },
    { property: "og:description", content: "Ready to bring your digital project to life? Contact us for expert web development consultation." },
    { property: "og:url", content: "https://augmentedwebcraft.com/contact" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://augmentedwebcraft.com/og-contact.jpg" },
    // Twitter Card Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Contact Us - Augmented Webcraft" },
    { name: "twitter:description", content: "Ready to bring your digital project to life? Contact us for expert consultation." },
  ];
};

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.name || !data.email || !data.service || !data.projectDetails) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    await sendContactEmails(data as any);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}

export default function ContactPage() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  const openCalendly = () => setIsCalendlyOpen(true);
  const closeCalendly = () => setIsCalendlyOpen(false);

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
      <Navbar currentPage="contact" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-8 lg:px-12 text-white before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-scroll-animation id="contact-title">
              Get In Touch
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed" data-scroll-animation id="contact-subtitle">
              Ready to bring your digital project to life? Let's discuss how we can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 text-white">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div data-scroll-animation id="contact-info">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">Let's Start a Conversation</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Quick Response</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We typically respond to all inquiries within 24 hours. For urgent matters, feel free to mention it in your message.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Free Consultation</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Every project starts with a free consultation call where we discuss your needs, timeline, and how we can best help you succeed.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Custom Solutions</h3>
                  <p className="text-gray-300 leading-relaxed">
                    No two projects are the same. We tailor our approach to fit your specific requirements and budget.
                  </p>
                </div>
              </div>

              {/* Contact Methods */}
              <div className="mt-12 space-y-4">
                <h3 className="text-xl font-semibold mb-6">Other Ways to Reach Us</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-300">hello@augmentedwebcraft.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Response Time</p>
                    <p className="text-gray-300">Within 24 hours</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Free Consultation</p>
                      <p className="text-gray-300 text-sm">30-minute strategy session</p>
                    </div>
                  </div>
                  <button 
                    onClick={openCalendly}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/25 cursor-pointer group relative overflow-hidden border-2 border-blue-500/30 hover:border-blue-400/50"
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Schedule Now
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-violet-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div data-scroll-animation id="contact-form">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-white/5">
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12" data-scroll-animation id="faq-title">Frequently Asked Questions</h2>
          <div className="space-y-6" data-scroll-animation id="faq-list">
            {[
              {
                question: "How quickly can you start my project?",
                answer: "Most projects can begin within 1-2 weeks of finalizing the scope and contract. For urgent projects, we may be able to start sooner."
              },
              {
                question: "Do you work with clients worldwide?",
                answer: "Yes! We work with clients globally and are experienced in remote collaboration across different time zones."
              },
              {
                question: "What's included in your web development service?",
                answer: "Our web development includes design, development, testing, deployment, and basic training. We also provide ongoing support options."
              },
              {
                question: "Can you help with existing projects?",
                answer: "Absolutely! We can help improve, maintain, or add features to existing websites and applications."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendly Modal */}
      <CalendlyModal 
        isOpen={isCalendlyOpen} 
        onClose={closeCalendly}
      />

      <Footer onServiceClick={() => {}} />
      
      {/* Floating Consultation Widget */}
      <FloatingConsultationWidget />
    </div>
  );
};