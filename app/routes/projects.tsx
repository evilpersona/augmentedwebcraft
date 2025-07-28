import React, { useEffect, useState } from "react";
import { getAllProjects, getAllProjectCategories, getAllProjectTechnologies, type Project } from "~/lib/content";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { FaCalendarAlt, FaUser, FaExternalLinkAlt, FaGithub, FaArrowRight, FaPlay } from "react-icons/fa";

// Loader function to get projects
export const loader: any = async () => {
  const [projects, categories, technologies] = await Promise.all([
    getAllProjects(),
    getAllProjectCategories(),
    getAllProjectTechnologies()
  ]);
  
  return {
    projects,
    categories,
    technologies
  };
};

// SEO Meta Tags Export
export const meta: any = () => {
  return [
    { title: "Projects - Augmented Webcraft | Our Portfolio & Case Studies" },
    { 
      name: "description", 
      content: "Explore our portfolio of successful web development projects. From e-commerce platforms to SaaS dashboards, see how we help businesses achieve their digital goals." 
    },
    { 
      name: "keywords", 
      content: "web development portfolio, project showcase, case studies, React projects, Next.js applications, e-commerce development, SaaS platforms" 
    },
    // Open Graph Tags
    { property: "og:title", content: "Projects - Augmented Webcraft" },
    { property: "og:description", content: "Explore our portfolio of successful web development projects and case studies." },
    { property: "og:url", content: "https://augmentedwebcraft.com/projects" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://augmentedwebcraft.com/og-projects.jpg" },
    // Twitter Card Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Projects - Augmented Webcraft" },
    { name: "twitter:description", content: "Portfolio of successful web development projects and case studies." },
  ];
};

export default function ProjectsPage({ loaderData }: any) {
  const { projects, categories, technologies } = loaderData;
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  // Filter projects based on selected filters
  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by technology
    if (selectedTechnology) {
      filtered = filtered.filter(project => 
        project.technologies.some(tech => tech === selectedTechnology)
      );
    }

    // Filter by status
    if (selectedStatus) {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, selectedTechnology, selectedStatus]);

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

  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  return (
    <div className="relative bg-[#050917] min-h-screen">
      <Navbar currentPage="projects" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-8 lg:px-12 text-white before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" data-scroll-animation id="projects-title">
              Our Projects
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed" data-scroll-animation id="projects-subtitle">
              Discover how we've helped businesses transform their digital presence with innovative web solutions
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 sm:px-8 lg:px-12">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-scroll-animation id="project-filters">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-gray-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Technology Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Technology</label>
              <select
                value={selectedTechnology}
                onChange={(e) => setSelectedTechnology(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Technologies</option>
                {technologies.map((tech) => (
                  <option key={tech} value={tech} className="bg-gray-800">
                    {tech}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                <option value="completed" className="bg-gray-800">Completed</option>
                <option value="in-progress" className="bg-gray-800">In Progress</option>
                <option value="planned" className="bg-gray-800">Planned</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-gray-400 mb-8">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            {selectedCategory && ` in ${selectedCategory}`}
            {selectedTechnology && ` using ${selectedTechnology}`}
            {selectedStatus && ` with status: ${selectedStatus}`}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && !selectedCategory && !selectedTechnology && !selectedStatus && (
        <section className="py-8 px-4 sm:px-8 lg:px-12">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8" data-scroll-animation id="featured-title">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredProjects.slice(0, 2).map((project, index) => (
                <article
                  key={project.slug}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border border-white/10 hover:border-blue-400/50"
                  data-scroll-animation
                  id={`featured-project-${index}`}
                >
                  {project.image && (
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={`Project screenshot for ${project.title}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width="600"
                        height="338"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-colors duration-300"
                            title="View Live Project"
                          >
                            <FaExternalLinkAlt className="w-4 h-4" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors duration-300"
                            title="View Source Code"
                          >
                            <FaGithub className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                      <span className={`px-3 py-1 border rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status)} {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">Client: {project.client}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded text-xs">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        {formatDate(project.date)}
                      </div>
                      <a
                        href={`/projects/${project.slug}`}
                        className="flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300 group-hover:translate-x-2"
                      >
                        <span>View Details</span>
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

      {/* All Projects Grid */}
      <section className="py-8 px-4 sm:px-8 lg:px-12">
        <div className="w-full max-w-7xl mx-auto">
          {!selectedCategory && !selectedTechnology && !selectedStatus && featuredProjects.length > 0 && (
            <h2 className="text-3xl font-bold text-white mb-8" data-scroll-animation id="all-projects-title">
              All Projects
            </h2>
          )}
          
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory || selectedTechnology || selectedStatus ? filteredProjects : regularProjects).map((project, index) => (
                <article
                  key={project.slug}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border border-white/10 hover:border-blue-400/50"
                  data-scroll-animation
                  id={`project-${index}`}
                >
                  {project.image && (
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={`Project screenshot for ${project.title}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width="600"
                        height="338"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-colors duration-300"
                            title="View Live"
                          >
                            <FaExternalLinkAlt className="w-3 h-3" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors duration-300"
                            title="Source Code"
                          >
                            <FaGithub className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded text-xs font-medium">
                        {project.category}
                      </span>
                      <span className={`px-2 py-1 border rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-3">Client: {project.client}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        {formatDate(project.date)}
                      </div>
                      <a
                        href={`/projects/${project.slug}`}
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
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-gray-400">
                Try adjusting your filters to see more projects.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-8 lg:px-12">
        <div className="w-full max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-2xl p-8 border border-blue-500/30" data-scroll-animation id="cta-section">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how we can help bring your vision to life with cutting-edge web technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Your Project
              </a>
              <a
                href="/services"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 border border-white/20"
              >
                View Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}