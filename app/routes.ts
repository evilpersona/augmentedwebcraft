import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),   // Home page
  route("/services", "routes/services.tsx"),   // Services page
  route("/services/:slug", "routes/services.$slug.tsx"),   // Individual service pages
  // route("/blog", "routes/blog.tsx"),   // Blog listing page
  // route("/blog/:slug", "routes/blog.$slug.tsx"),   // Individual blog posts
  // route("/projects", "routes/projects.tsx"),   // Projects listing page
  // route("/projects/:slug", "routes/projects.$slug.tsx"),   // Individual project pages
  route("/contact", "routes/contact.tsx"),    // Contact page
  route("/privacy", "routes/privacy.tsx"),    // Privacy Policy page
  route("/terms", "routes/terms.tsx"),        // Terms of Service page
  route("/accessibility", "routes/accessibility.tsx"), // Accessibility Statement page
  route("/sitemap.xml", "routes/sitemap[.]xml.tsx"),   // Sitemap for SEO
  route("/robots.txt", "routes/robots[.]txt.tsx"),     // Robots.txt for crawlers
  route("*", "routes/404.tsx"),     // Catch-all 404 page
  
] satisfies RouteConfig;