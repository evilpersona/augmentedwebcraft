// Type import temporarily removed until React Router generates types properly
import { getAllBlogPosts, getAllProjects } from "~/lib/content";
import servicesData from "~/data/services.json";

export const loader = async ({ request }: { request: Request }) => {
  const host = new URL(request.url).origin;
  const currentDate = new Date().toISOString();
  
  const [blogPosts, projects] = await Promise.all([
    getAllBlogPosts(),
    getAllProjects()
  ]);

  const services = Object.values(servicesData);
  
  // Generate all URLs
  const urls = [
    // Main pages
    `  <url>
    <loc>${host}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
    `  <url>
    <loc>${host}/services</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`,
    // Blog and projects pages removed from sitemap
    // `  <url>
    // <loc>${host}/blog</loc>
    // <lastmod>${currentDate}</lastmod>
    // <changefreq>daily</changefreq>
    // <priority>0.8</priority>
    // </url>`,
    // `  <url>
    // <loc>${host}/projects</loc>
    // <lastmod>${currentDate}</lastmod>
    // <changefreq>weekly</changefreq>
    // <priority>0.8</priority>
    // </url>`,
    `  <url>
    <loc>${host}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
    // Service pages
    ...services.map(service => `  <url>
    <loc>${host}/services/${service.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
    // Blog posts and projects removed from sitemap
    // ...blogPosts.map(post => `  <url>
    // <loc>${host}/blog/${post.slug}</loc>
    // <lastmod>${post.date}</lastmod>
    // <changefreq>monthly</changefreq>
    // <priority>0.6</priority>
    // </url>`),
    // ...projects.map(project => `  <url>
    // <loc>${host}/projects/${project.slug}</loc>
    // <lastmod>${project.date}</lastmod>
    // <changefreq>monthly</changefreq>
    // <priority>0.6</priority>
    // </url>`),
    // Legal pages
    `  <url>
    <loc>${host}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>`,
    `  <url>
    <loc>${host}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>`,
    `  <url>
    <loc>${host}/accessibility</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>`
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour for more frequent updates
    },
  });
};