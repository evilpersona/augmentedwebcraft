import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),   // Splash at "/"
  route("/sitemap.xml", "routes/sitemap[.]xml.tsx"),   // Sitemap for SEO
  route("/robots.txt", "routes/robots[.]txt.tsx"),     // Robots.txt for crawlers
  
] satisfies RouteConfig;