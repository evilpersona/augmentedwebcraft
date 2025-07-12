import React from "react";
import { Link } from "react-router";
import type { Route } from "./../+types/404";
import { IconLogo } from "../components/Logo";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Page Not Found - Augmented Webcraft" },
    { 
      name: "description", 
      content: "The page you're looking for doesn't exist. Return to Augmented Webcraft's homepage to explore our web development services." 
    },
    { name: "robots", content: "noindex, nofollow" }
  ];
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#050917] flex items-center justify-center relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-center before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
      {/* Background Icon Logo */}
      <IconLogo className="opacity-5 absolute top-0 left-0 w-full h-full z-1" color="white" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-violet-400 rounded-full animate-pulse opacity-80 animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse opacity-40 animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse opacity-70 animation-delay-3000"></div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 text-transparent leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-r from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-lg font-semibold rounded-xl py-4 px-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer group relative overflow-hidden"
          >
            <span className="relative z-10">Go Home</span>
            <svg className="shrink-0 size-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </Link>
          
          <Link
            to="/services"
            className="inline-flex justify-center items-center gap-x-3 text-center bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 hover:border-white/50 text-white text-lg font-medium rounded-xl py-4 px-8 transition-all duration-300 cursor-pointer hover:scale-105 group relative overflow-hidden"
          >
            <span className="relative z-10">View Services</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-violet-600/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-slate-400 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/services" className="text-blue-300 hover:text-blue-200 transition-colors duration-300">
              Our Services
            </Link>
            <Link to="/contact" className="text-blue-300 hover:text-blue-200 transition-colors duration-300">
              Contact Us
            </Link>
            <a href="mailto:hello@augmentedwebcraft.com" className="text-blue-300 hover:text-blue-200 transition-colors duration-300">
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}