import React, { useEffect, useState } from "react";
import { redirect } from "react-router";
// Type import temporarily removed until React Router generates types properly
import { getBlogPostBySlug, getAllBlogPosts, type BlogPost } from "~/lib/content";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft, FaArrowRight, FaShare } from "react-icons/fa";

// Loader function to get the blog post
export const loader = async ({ params }: { params: any }) => {
  const { slug } = params;
  
  if (!slug) {
    throw redirect('/blog');
  }

  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getAllBlogPosts()
  ]);

  if (!post) {
    throw redirect('/blog');
  }

  // Get related posts (same tags, excluding current post)
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return {
    post,
    relatedPosts
  };
};

// SEO Meta Tags Export
export const meta: any = ({ data }) => {
  if (!data?.post) {
    return [
      { title: "Post Not Found - Augmented Webcraft" },
      { name: "description", content: "The requested blog post could not be found." }
    ];
  }

  const { post } = data;
  
  return [
    { title: `${post.title} - Augmented Webcraft Blog` },
    { name: "description", content: post.excerpt },
    { name: "keywords", content: post.tags.join(", ") },
    { name: "author", content: post.author },
    
    // Open Graph Tags
    { property: "og:title", content: post.title },
    { property: "og:description", content: post.excerpt },
    { property: "og:url", content: `https://augmentedwebcraft.com/blog/${post.slug}` },
    { property: "og:type", content: "article" },
    { property: "og:image", content: post.image || "https://augmentedwebcraft.com/og-blog.jpg" },
    { property: "article:author", content: post.author },
    { property: "article:published_time", content: post.date },
    { property: "article:tag", content: post.tags.join(", ") },
    
    // Twitter Card Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: post.title },
    { name: "twitter:description", content: post.excerpt },
    { name: "twitter:image", content: post.image || "https://augmentedwebcraft.com/twitter-blog.jpg" },
  ];
};

export default function BlogPostPage({ loaderData }: any) {
  const { post, relatedPosts } = loaderData;
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  // Scroll animation logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          element.classList.add("animate-in");
          setVisibleElements(prev => new Set(prev).add(element.id));
        }
      });
    }, observerOptions);

    // Observe all elements with data-scroll-animation
    const animatedElements = document.querySelectorAll("[data-scroll-animation]");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "image": post.image || "https://augmentedwebcraft.com/og-blog.jpg",
    "publisher": {
      "@type": "Organization",
      "name": "Augmented Webcraft",
      "logo": {
        "@type": "ImageObject",
        "url": "https://augmentedwebcraft.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://augmentedwebcraft.com/blog/${post.slug}`
    },
    "keywords": post.tags.join(", ")
  };

  return (
    <div className="relative bg-[#050917] min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navbar currentPage="blog" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-8 px-4 sm:px-8 lg:px-12 text-white">
        <div className="w-full max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8" data-scroll-animation id="back-button">
            <a
              href="/blog"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
            >
              <FaArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Blog</span>
            </a>
          </div>

          {/* Article Header */}
          <article>
            <header className="mb-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6" data-scroll-animation id="post-tags">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-scroll-animation id="post-title">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8" data-scroll-animation id="post-meta">
                <div className="flex items-center space-x-6 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="w-4 h-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUser className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <button
                  onClick={sharePost}
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
                >
                  <FaShare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Share</span>
                </button>
              </div>

              {/* Featured Image */}
              {post.image && (
                <div className="aspect-video overflow-hidden rounded-2xl mb-8" data-scroll-animation id="post-image">
                  <img
                    src={post.image}
                    alt={`Featured image for ${post.title}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    width="800"
                    height="450"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              )}

              {/* Excerpt */}
              <div className="text-xl text-gray-300 leading-relaxed mb-12 p-6 bg-white/5 rounded-2xl border border-white/10" data-scroll-animation id="post-excerpt">
                {post.excerpt}
              </div>
            </header>

            {/* Article Content */}
            <div 
              className="prose prose-lg prose-invert max-w-none mb-12"
              data-scroll-animation 
              id="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-8 lg:px-12 bg-white/5">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8" data-scroll-animation id="related-title">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <article
                  key={relatedPost.slug}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border border-white/10 hover:border-blue-400/50"
                  data-scroll-animation
                  id={`related-post-${index}`}
                >
                  {relatedPost.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={`Thumbnail for ${relatedPost.title}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width="400"
                        height="225"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {relatedPost.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        {formatDate(relatedPost.date)}
                      </div>
                      <a
                        href={`/blog/${relatedPost.slug}`}
                        className="flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300 text-sm group-hover:translate-x-1"
                      >
                        <span>Read</span>
                        <FaArrowRight className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-8 lg:px-12">
        <div className="w-full max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-2xl p-8 border border-blue-500/30" data-scroll-animation id="cta-section">
            <h2 className="text-3xl font-bold text-white mb-4">
              Found this helpful?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how we can help bring your next project to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Your Project
              </a>
              <a
                href="/blog"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 border border-white/20"
              >
                Read More Posts
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}