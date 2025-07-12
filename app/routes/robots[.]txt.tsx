import type { Route } from "./../+types/robots[.]txt";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const host = new URL(request.url).origin;
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${host}/sitemap.xml

# Block access to admin areas (if any in the future)
Disallow: /admin/
Disallow: /private/

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Crawl delay to be respectful
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
};