import React, { useEffect, useState } from "react";
import { redirect } from "react-router";
import { getProjectBySlug, getAllProjects, type Project } from "~/lib/content";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { FaCalendarAlt, FaExternalLinkAlt, FaGithub, FaArrowLeft, FaArrowRight, FaShare } from "react-icons/fa";

// Loader function to get the project
export const loader: any = async ({ params }) => {
  const { slug } = params;
  
  if (!slug) {
    throw redirect('/projects');
  }

  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getAllProjects()
  ]);

  if (!project) {
    throw redirect('/projects');
  }

  // Get related projects (same category or technologies, excluding current project)
  const relatedProjects = allProjects
    .filter(p => 
      p.slug !== slug && (
        p.category === project.category ||
        p.technologies.some(tech => project.technologies.includes(tech))
      )
    )
    .slice(0, 3);

  return {
    project,
    relatedProjects
  };
};

// SEO Meta Tags Export
export const meta: any = ({ data }) => {
  if (!data?.project) {
    return [
      { title: "Project Not Found - Augmented Webcraft" },
      { name: "description", content: "The requested project could not be found." }
    ];
  }

  const { project } = data;
  
  return [
    { title: `${project.title} - Augmented Webcraft Projects` },
    { name: "description", content: `${project.title} - A ${project.category} project for ${project.client}. Built with ${project.technologies.slice(0, 3).join(', ')}.` },
    { name: "keywords", content: project.technologies.join(", ") },
    
    // Open Graph Tags
    { property: "og:title", content: `${project.title} - ${project.client}` },
    { property: "og:description", content: `A ${project.category} project built with ${project.technologies.slice(0, 3).join(', ')}.` },
    { property: "og:url", content: `https://augmentedwebcraft.com/projects/${project.slug}` },
    { property: "og:type", content: "article" },
    { property: "og:image", content: project.image || "https://augmentedwebcraft.com/og-projects.jpg" },
    
    // Twitter Card Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${project.title} - ${project.client}` },
    { name: "twitter:description", content: `A ${project.category} project built with ${project.technologies.slice(0, 3).join(', ')}.` },
    { name: "twitter:image", content: project.image || "https://augmentedwebcraft.com/twitter-projects.jpg" },
  ];
};

export default function ProjectPage({ loaderData }: any) {
  const { project, relatedProjects } = loaderData;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Simple effect to mark results headings
  useEffect(() => {
    const markResultsHeadings = () => {
      const headings = document.querySelectorAll('h2, h3');
      headings.forEach(heading => {
        const text = heading.textContent?.toLowerCase() || '';
        if (text.includes('result') || text.includes('impact') || text.includes('outcome') || text.includes('achievement')) {
          heading.setAttribute('data-results', 'true');
        }
      });
    };
    
    const timer = setTimeout(markResultsHeadings, 100);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'planned':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '🚧';
      case 'planned':
        return '📋';
      default:
        return '📊';
    }
  };

  const shareProject = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: `Check out this ${project.category} project by Augmented Webcraft`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };


  // Auto-rotate gallery images if available
  useEffect(() => {
    if (project.gallery && project.gallery.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.gallery!.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [project.gallery]);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": `A ${project.category} project for ${project.client}`,
    "creator": {
      "@type": "Organization",
      "name": "Augmented Webcraft"
    },
    "dateCreated": project.date,
    "image": project.image || "https://augmentedwebcraft.com/og-projects.jpg",
    "url": `https://augmentedwebcraft.com/projects/${project.slug}`,
    "keywords": project.technologies.join(", "),
    "about": {
      "@type": "Thing",
      "name": project.category
    }
  };

  return (
    <div className="relative bg-[#050917] min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Navbar currentPage="projects" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-8 px-4 sm:px-8 lg:px-12 text-white">
        <div className="w-full max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <a
              href="/projects"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
            >
              <FaArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Projects</span>
            </a>
          </div>

          {/* Project Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-4 py-2 bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full font-medium">
                {project.category}
              </span>
              <span className={`px-4 py-2 border rounded-full font-medium ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)} {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {project.title}
            </h1>

            <p className="text-xl text-gray-300 mb-6">
              Client: <span className="text-blue-300 font-semibold">{project.client}</span>
            </p>

            {/* Meta Information and Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="w-4 h-4" />
                  <span>{formatDate(project.date)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-semibold"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    <span>View Live</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-semibold"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                )}
                <button
                  onClick={shareProject}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors duration-300 border border-white/20"
                >
                  <FaShare className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Project Image/Gallery */}
          {project.image && (
            <div className="mb-12">
              {project.gallery && project.gallery.length > 1 ? (
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  <img
                    src={project.gallery[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {project.gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="aspect-video overflow-hidden rounded-2xl">
                  <img
                    src={project.image}
                    alt={`Main project image for ${project.title}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    width="1200"
                    height="675"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              )}
            </div>
          )}

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg font-medium hover:bg-blue-500/30 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Info Banner - Full Width */}
      <section className="py-8 px-4 sm:px-8 lg:px-12 bg-gradient-to-r from-blue-600/10 via-violet-600/10 to-emerald-600/10 border-y border-white/10">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Project Details Cards */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-300 text-xl">👤</span>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">Client</label>
                  <p className="text-white font-bold text-lg">{project.client}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-violet-400/30 hover:border-violet-400/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-violet-300 text-xl">📁</span>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">Category</label>
                  <p className="text-white font-bold text-lg">{project.category}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-emerald-300 text-xl">📅</span>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">Date</label>
                  <p className="text-white font-bold text-lg">{formatDate(project.date)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-yellow-300 text-xl">{getStatusIcon(project.status)}</span>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-medium">Status</label>
                  <p className="text-white font-bold text-lg">{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap gap-4 justify-center">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-blue-500/25 hover:scale-105"
              >
                <FaExternalLinkAlt className="w-5 h-5" />
                <span>🚀 View Live Site</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-gray-500/25 hover:scale-105"
              >
                <FaGithub className="w-5 h-5" />
                <span>⚡ View Source Code</span>
              </a>
            )}
            <button
              onClick={shareProject}
              className="flex items-center space-x-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
            >
              <FaShare className="w-5 h-5" />
              <span>📤 Share Project</span>
            </button>
          </div>
        </div>
      </section>

      {/* Project Content - Full Width */}
      <section className="py-12 px-4 sm:px-8 lg:px-12">
        <div className="w-full max-w-6xl mx-auto">
          <div 
            className="prose prose-xl prose-invert max-w-none project-content"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 px-4 sm:px-8 lg:px-12 bg-white/5">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <article
                  key={relatedProject.slug}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border border-white/10 hover:border-blue-400/50"
                >
                  {relatedProject.image && (
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                        {relatedProject.liveUrl && (
                          <a
                            href={relatedProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-colors duration-300"
                          >
                            <FaExternalLinkAlt className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded text-xs font-medium">
                        {relatedProject.category}
                      </span>
                      <span className={`px-2 py-1 border rounded text-xs font-medium ${getStatusColor(relatedProject.status)}`}>
                        {getStatusIcon(relatedProject.status)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                      {relatedProject.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-3">Client: {relatedProject.client}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {relatedProject.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {relatedProject.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded text-xs">
                          +{relatedProject.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        {formatDate(relatedProject.date)}
                      </div>
                      <a
                        href={`/projects/${relatedProject.slug}`}
                        className="flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300 text-sm group-hover:translate-x-1"
                      >
                        <span>Details</span>
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
          <div className="bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              Inspired by this project?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how we can create something amazing for your business too.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Your Project
              </a>
              <a
                href="/projects"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 border border-white/20"
              >
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}