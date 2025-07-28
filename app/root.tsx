import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";



// Type import temporarily removed until React Router generates types properly
import "./app.css";
import Header from "./components/Header";
import HeroLogo from "./components/HeroLogo";
import SkipNavigation from "./components/SkipNavigation";
import PerformanceMonitor from "./components/PerformanceMonitor";
import AccessibilityFeatures from "./components/AccessibilityFeatures";
import TagManager from 'react-gtm-module';
import { useEffect } from "react";


export const links = () => [
  // Preconnect to external domains for performance
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "preconnect", href: "https://www.googletagmanager.com" },
  
  // Font loading with font-display: swap for better performance
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Share+Tech:wght@400&display=swap",
  },
  
  // Favicon and icons - properly sized and optimized
  { rel: "icon", href: "/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
  { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.svg", sizes: "180x180" },
  { rel: "manifest", href: "/site.webmanifest" },
  // Fallback favicon for older browsers
  { rel: "shortcut icon", href: "/favicon.ico" },
  
  // DNS prefetch for external resources
  { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
  { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Enhanced SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="theme-color" content="#050917" />
        <meta name="msapplication-TileColor" content="#050917" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="canonical" href="https://augmentedwebcraft.com" />
        
        {/* Performance and prefetch hints */}
        <link rel="preload" href="/fonts/share-tech.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Sitemap reference for search engines */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        <Meta />
        <Links />
      </head>
      <body>
        <SkipNavigation />
        <PerformanceMonitor />
        <AccessibilityFeatures />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    // Initialize Google Tag Manager
    const tagManagerArgs = {
      gtmId: 'GTM-559BP478', // Your GTM Container ID
      dataLayer: {
        // Initial dataLayer values
        platform: 'web',
        environment: import.meta.env.MODE || 'production',
        site_name: 'Augmented Webcraft'
      }
    };
    
    try {
      TagManager.initialize(tagManagerArgs);
      // Only log in development
      if (import.meta.env.DEV) {
        console.log('Google Tag Manager initialized successfully');
      }
    } catch (error) {
      // Only log errors in development
      if (import.meta.env.DEV) {
        console.error('Failed to initialize Google Tag Manager:', error);
      }
    }
  }, []);
  
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
