import React, { useEffect, useState } from "react";
// Type import temporarily removed until React Router generates types properly
import { getAllBlogPosts, getAllBlogTags, type BlogPost } from "~/lib/content";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { FaCalendarAlt, FaUser, FaTag, FaArrowRight } from "react-icons/fa";

// Loader function to get blog posts
export const loader: any = async () => {
  const [posts, tags] = await Promise.all([
    getAllBlogPosts(),
    getAllBlogTags()
  ]);
  
  return {
    posts,
    tags
  };
};

// SEO Meta Tags Export
export const meta: any = () => {
  return [
    { title: "Blog - Augmented Webcraft | Web Development Insights & Tutorials" },
    { 
      name: "description", 
      content: "Stay updated with the latest web development trends, React tutorials, performance tips, and industry insights from the Augmented Webcraft team." 
    },
    { 
      name: "keywords", 
      content: "web development blog, React tutorials, Next.js guides, JavaScript tips, performance optimization, UI/UX design, technical articles" 
    },
    // Open Graph Tags
    { property: "og:title", content: "Blog - Augmented Webcraft" },
    { property: "og:description", content: "Web development insights, tutorials, and industry updates from expert developers." },
    { property: "og:url", content: "https://augmentedwebcraft.com/blog" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://augmentedwebcraft.com/og-blog.jpg" },
    // Twitter Card Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Blog - Augmented Webcraft" },
    { name: "twitter:description", content: "Web development insights, tutorials, and industry updates." },
  ];
};

export default function BlogPage({ loaderData }: any) {
  const { posts, tags } = loaderData;
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  // Filter posts based on selected tag and search query
  useEffect(() => {
    let filtered = posts;

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedTag, searchQuery]);

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

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="relative bg-[#050917] min-h-screen">
      <Navbar currentPage="blog" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-8 lg:px-12 text-white before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-scroll-animation id="blog-title">
              Our Blog
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed" data-scroll-animation id="blog-subtitle">
              Insights, tutorials, and updates from the world of modern web development
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 sm:px-8 lg:px-12">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 mb-8" data-scroll-animation id="blog-filters">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Tag Filter */}
            <div className="lg:w-64">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Tags</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag} className="bg-gray-800">
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-gray-400 mb-8">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            {selectedTag && ` tagged with "${selectedTag}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && !selectedTag && !searchQuery && (
        <section className="py-8 px-4 sm:px-8 lg:px-12">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8" data-scroll-animation id="featured-title">
              Featured Posts
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <article
                  key={post.slug}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border border-white/10 hover:border-blue-400/50"
                  data-scroll-animation
                  id={`featured-post-${index}`}
                >
                  {post.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={`Featured image for ${post.title}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width="600"
                        height="338"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <FaCalendarAlt className="w-4 h-4" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaUser className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <a
                        href={`/blog/${post.slug}`}
                        className="flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300 group-hover:translate-x-2"
                      >
                        <span>Read More</span>
                        <FaArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="py-8 px-4 sm:px-8 lg:px-12">
        <div className="w-full max-w-7xl mx-auto">
          {!selectedTag && !searchQuery && featuredPosts.length > 0 && (
            <h2 className="text-3xl font-bold text-white mb-8" data-scroll-animation id="all-posts-title">
              All Posts
            </h2>
          )}
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedTag || searchQuery ? filteredPosts : regularPosts).map((post, index) => (
                <article
                  key={post.slug}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border border-white/10 hover:border-blue-400/50"
                  data-scroll-animation
                  id={`post-${index}`}
                >
                  {post.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={`Featured image for ${post.title}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width="600"
                        height="338"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        {formatDate(post.date)}
                      </div>
                      <a
                        href={`/blog/${post.slug}`}
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
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
              <p className="text-gray-400">
                {selectedTag || searchQuery 
                  ? "Try adjusting your filters or search terms."
                  : "Check back soon for new content!"
                }
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}