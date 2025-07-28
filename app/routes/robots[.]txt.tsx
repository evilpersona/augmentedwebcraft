// Type import temporarily removed until React Router generates types properly

export const loader = async ({ request }: { request: Request }) => {
  const host = new URL(request.url).origin;
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${host}/sitemap.xml

# Block access to admin, API, and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /_/
Disallow: /build/

# Allow access to public assets
Allow: /assets/
Allow: /images/
Allow: /favicon.ico
Allow: /site.webmanifest

# Major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

User-agent: facebookexternalhit/1.1
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Block problematic bots
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# Additional sitemap references
Sitemap: ${host}/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
};