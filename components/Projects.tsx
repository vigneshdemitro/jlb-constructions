'use client';

import { useState } from 'react';

const projectsData = [
  {
    id: 1,
    title: 'Modern Office Complex',
    category: 'commercial',
    image: '/images/project-1.jpg',
    description: 'A state-of-the-art commercial building featuring sustainable design and energy-efficient systems.',
    date: '2024',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Residential Apartment Block',
    category: 'residential',
    image: '/images/project-2.jpg',
    description: 'Luxury residential complex with 200+ units, modern amenities, and community spaces.',
    date: '2024',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Home Renovation',
    category: 'renovation',
    image: '/images/project-3.jpg',
    description: 'Complete interior and exterior renovation of a heritage property, preserving character while adding modern features.',
    date: '2023',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Mall Extension',
    category: 'commercial',
    image: '/images/project-4.jpg',
    description: 'Large-scale shopping mall expansion project with retail spaces and entertainment venues.',
    date: '2023',
    status: 'completed',
  },
  {
    id: 5,
    title: 'Residential Villa Development',
    category: 'residential',
    image: '/images/project-5.jpg',
    description: 'Exclusive villa community featuring luxury homes with private amenities.',
    date: '2023',
    status: 'completed',
  },
  {
    id: 6,
    title: 'Commercial Warehouse',
    category: 'commercial',
    image: '/images/project-6.jpg',
    description: 'Industrial warehouse complex designed for logistics and storage operations.',
    date: '2022',
    status: 'completed',
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'commercial', 'residential', 'renovation'];

  const filteredProjects =
    activeCategory === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-neutral-900 font-playfair">
            Our Project Portfolio
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Discover our portfolio of successful construction projects completed across residential, commercial, and renovation sectors.
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-neutral-300 to-neutral-400">
                <div className="w-full h-full bg-neutral-400 flex items-center justify-center text-neutral-600">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all transform scale-90 group-hover:scale-100">
                    View Details
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <time className="text-sm text-neutral-500">{project.date}</time>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2 font-playfair line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold capitalize">
                    {project.status}
                  </span>
                  <a
                    href={`#project-${project.id}`}
                    className="text-red-600 font-semibold hover:text-red-700 flex items-center gap-2 transition-colors group/link"
                  >
                    Learn More{' '}
                    <span className="group-hover/link:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}