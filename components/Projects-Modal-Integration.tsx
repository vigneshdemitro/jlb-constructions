'use client';

import { useState, useEffect } from 'react';
import ProjectDetailsModal from './ProjectDetailsModal';
import { Project } from '@/lib/types';
import { fetchSiteMetadata } from '@/lib/metadata.service';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch metadata on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const metadata = await fetchSiteMetadata();
        setProjects(metadata.projects);
        setError(null);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.category === activeCategory)
      );
    }
  }, [activeCategory, projects]);

  // Handle project click
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
    // Clear selected project after animation
    setTimeout(() => setSelectedProject(null), 300);
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-neutral-200 rounded-lg animate-pulse">
              <span className="text-neutral-600">Loading projects...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const categories = [
    'all',
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  return (
    <>
      <section id="projects" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-neutral-900 font-playfair">
              Our Project Portfolio
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Click on any project to see the full gallery and detailed information.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize transform hover:scale-105 ${
                  activeCategory === category
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-12 p-4 bg-red-50 border border-red-200 rounded-lg text-center text-red-700">
              {error}
            </div>
          )}

          {/* Empty State */}
          {filteredProjects.length === 0 && !error && (
            <div className="text-center py-16">
              <p className="text-neutral-600 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => {
              // Get featured image or first image
              const featuredImageIndex = project.featuredImageId || 0;
              const featuredImage = project.images[featuredImageIndex];

              return (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  className="group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleProjectClick(project);
                    }
                  }}
                  aria-label={`View details for ${project.title}`}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-neutral-300 to-neutral-400">
                    {featuredImage?.url ? (
                      <img
                        src={featuredImage.url}
                        alt={`${project.title} - ${featuredImage.caption || 'Project image'}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600 bg-neutral-300">
                        <span className="text-sm">No image available</span>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="text-white font-semibold text-center">
                        <p className="text-lg">View Details</p>
                        <p className="text-xs mt-1">{project.images.length} images</p>
                      </div>
                    </div>

                    {/* Image Count Badge */}
                    {project.images.length > 1 && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 text-white text-xs rounded-full">
                        {project.images.length} images
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                        {project.category}
                      </span>
                      <time className="text-sm text-neutral-500">{project.year}</time>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 mb-2 font-playfair line-clamp-2 group-hover:text-red-600 transition">
                      {project.title}
                    </h3>

                    {project.location && (
                      <p className="text-sm text-neutral-500 mb-2">
                        📍 {project.location}
                      </p>
                    )}

                    <p className="text-neutral-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                      <div className="mb-4 pb-4 border-t border-neutral-200">
                        <div className="flex flex-wrap gap-1">
                          {project.features.slice(0, 2).map((feature, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                          {project.features.length > 2 && (
                            <span className="text-xs text-neutral-600">
                              +{project.features.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold capitalize">
                        {project.status}
                      </span>
                      <span className="text-red-600 font-semibold group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
}
