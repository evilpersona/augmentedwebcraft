import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";



import type { Route } from "./+types/root";
import "./app.css";
import Header from "./components/Header";
import HeroLogo from "./components/HeroLogo";
import TagManager from 'react-gtm-module';
import { useEffect } from "react";


export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Share+Tech&display=swap",
  },
  // Favicon and icons
  { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
  { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Default SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#050917" />
        <meta name="msapplication-TileColor" content="#050917" />
        <link rel="canonical" href="https://augmentedwebcraft.com" />
        
        <Meta />
        <Links />
      </head>
      <body>
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
      console.log('Google Tag Manager initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Tag Manager:', error);
    }
  }, []);
  
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
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
