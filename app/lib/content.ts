// JSON-based content management system
import projectsData from '~/data/projects.json';
import blogData from '~/data/blog.json';

// Content section types
export interface ContentSection {
  type: 'heading' | 'paragraph' | 'list' | 'code' | 'results' | 'testimonial';
  level?: number; // for headings
  content?: string;
  items?: string[]; // for lists and results
  language?: string; // for code blocks
  author?: string; // for testimonials
  title?: string; // for results sections
}

// Types for blog posts
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  featured: boolean;
  tags: string[];
  image?: string;
  sections: ContentSection[];
  content: string; // Rendered HTML from sections
}

// Types for projects
export interface Project {
  slug: string;
  title: string;
  date: string;
  client: string;
  category: string;
  technologies: string[];
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  image?: string;
  gallery?: string[];
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  sections: ContentSection[];
  content: string; // Rendered HTML from sections
}

// Helper function to render content sections to HTML
function renderContentSections(sections: ContentSection[]): string {
  return sections.map(section => {
    switch (section.type) {
      case 'heading':
        return `<h${section.level || 2}>${section.content}</h${section.level || 2}>`;
      
      case 'paragraph':
        return `<p>${section.content}</p>`;
      
      case 'list':
        const listItems = section.items?.map(item => `<li>${item}</li>`).join('') || '';
        return `<ul>${listItems}</ul>`;
      
      case 'code':
        return `<pre><code class="language-${section.language || 'javascript'}">${section.content}</code></pre>`;
      
      case 'results':
        const resultItems = section.items?.map((item, index) => {
          // Extract number and description from items like "40% increase in conversion rate"
          const match = item.match(/^(\d+(?:\.\d+)?[%+]?)\s*(.*)/);
          if (match) {
            const number = match[1];
            const description = match[2];
            return `
              <li>
                <div class="results-number">${number}</div>
                <div class="results-description">${description}</div>
              </li>
            `;
          } else {
            return `
              <li>
                <div class="results-description">${item}</div>
              </li>
            `;
          }
        }).join('') || '';
        return `<div class="results-section"><h2 data-results="true">${section.title || 'Results'}</h2><ul class="results-grid">${resultItems}</ul></div>`;
      
      case 'testimonial':
        return `<blockquote><p>${section.content}</p><cite>— ${section.author}</cite></blockquote>`;
      
      default:
        return '';
    }
  }).join('\n');
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = blogData.map(post => ({
      ...post,
      content: renderContentSections(post.sections)
    }));

    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error loading blog posts:', error);
    }
    return [];
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = blogData.find(post => post.slug === slug);
    if (!post) return null;

    return {
      ...post,
      content: renderContentSections(post.sections)
    };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`Error loading blog post ${slug}:`, error);
    }
    return null;
  }
}

// Get featured blog posts
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.featured);
}

// Get blog posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = projectsData.map(project => ({
      ...project,
      content: renderContentSections(project.sections)
    }));

    // Sort projects by date (newest first)
    return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error loading projects:', error);
    }
    return [];
  }
}

// Get a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const project = projectsData.find(project => project.slug === slug);
    if (!project) return null;

    return {
      ...project,
      content: renderContentSections(project.sections)
    };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`Error loading project ${slug}:`, error);
    }
    return null;
  }
}

// Get featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter((project) => project.featured);
}

// Get projects by category
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter((project) => project.category.toLowerCase() === category.toLowerCase());
}

// Get projects by technology
export async function getProjectsByTechnology(technology: string): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter((project) => 
    project.technologies.some(tech => tech.toLowerCase() === technology.toLowerCase())
  );
}

// Get all unique tags from blog posts
export async function getAllBlogTags(): Promise<string[]> {
  const allPosts = await getAllBlogPosts();
  const tagSet = new Set<string>();
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

// Get all unique categories from projects
export async function getAllProjectCategories(): Promise<string[]> {
  const allProjects = await getAllProjects();
  const categorySet = new Set<string>();
  allProjects.forEach((project) => {
    categorySet.add(project.category);
  });
  return Array.from(categorySet).sort();
}

// Get all unique technologies from projects
export async function getAllProjectTechnologies(): Promise<string[]> {
  const allProjects = await getAllProjects();
  const techSet = new Set<string>();
  allProjects.forEach((project) => {
    project.technologies.forEach((tech) => techSet.add(tech));
  });
  return Array.from(techSet).sort();
}