import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),   // Home page
  route("/services", "routes/services.tsx"),   // Services page
  route("/contact", "routes/contact.tsx"),    // Contact page
  route("/sitemap.xml", "routes/sitemap[.]xml.tsx"),   // Sitemap for SEO
  route("/robots.txt", "routes/robots[.]txt.tsx"),     // Robots.txt for crawlers
  route("*", "routes/404.tsx"),     // Catch-all 404 page
  
] satisfies RouteConfig;