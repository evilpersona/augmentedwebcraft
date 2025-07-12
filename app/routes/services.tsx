import { redirect } from "react-router";
import type { Route } from "./../+types/services";

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

export const loader = async () => {
  // Redirect to home page with services hash
  return redirect("/#services");
};