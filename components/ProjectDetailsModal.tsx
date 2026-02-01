'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/lib/types';

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailsModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailsModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [project]);

  if (!isOpen || !project) return null;

  const featuredImage = project.images[selectedImageIndex];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="flex h-full items-center justify-center p-4 sm:p-6">
          {/* Modal Content */}
          <div
            className="relative w-full max-w-5xl h-full max-h-screen bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white sticky top-0 z-10">
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                  {project.category}
                </p>
                <h2 className="text-3xl font-bold text-neutral-900 font-playfair">
                  {project.title}
                </h2>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="ml-4 flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
                aria-label="Close details"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Main Image Gallery */}
                <div className="mb-8">
                  {/* Featured Image */}
                  {featuredImage?.url && (
                    <div className="mb-6 rounded-xl overflow-hidden bg-neutral-200">
                      <img
                        src={featuredImage.url}
                        alt={featuredImage.caption || project.title}
                        className="w-full h-96 object-cover"
                      />
                    </div>
                  )}

                  {/* Image Caption */}
                  {featuredImage?.caption && (
                    <p className="text-center text-sm text-neutral-600 mb-4 italic">
                      {featuredImage.caption}
                    </p>
                  )}

                  {/* Thumbnail Navigation */}
                  {project.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {project.images.map((image, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`flex-shrink-0 rounded-lg overflow-hidden transition-all h-20 w-24 ${
                            selectedImageIndex === idx
                              ? 'ring-2 ring-red-600 opacity-100'
                              : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={image.url}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Image Counter */}
                  <p className="text-xs text-neutral-500 mt-4">
                    Showing image {selectedImageIndex + 1} of {project.images.length}
                  </p>
                </div>

                {/* Project Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">Description</h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">{project.description}</p>

                  {project.longDescription && (
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      {project.longDescription}
                    </p>
                  )}
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                      Year
                    </p>
                    <p className="text-lg font-bold text-neutral-900">{project.year}</p>
                  </div>

                  {project.location && (
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                        Location
                      </p>
                      <p className="text-sm font-semibold text-neutral-900">{project.location}</p>
                    </div>
                  )}

                  {project.budget && (
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                        Budget
                      </p>
                      <p className="text-sm font-semibold text-neutral-900">{project.budget}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                      Status
                    </p>
                    <p className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full capitalize">
                      {project.status}
                    </p>
                  </div>
                </div>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 text-red-600 text-xl mt-0.5">✓</div>
                          <p className="text-neutral-600 font-medium">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">
                      Technologies & Materials
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Client & Team */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                  {project.client && (
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">Client</h3>
                      <p className="text-neutral-600">{project.client}</p>
                    </div>
                  )}

                  {project.team && project.team.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">Team Members</h3>
                      <ul className="space-y-1">
                        {project.team.map((member, idx) => (
                          <li key={idx} className="text-neutral-600 text-sm">
                            • {member}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* All Images Gallery */}
                {project.images.length > 1 && (
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">
                      Full Gallery ({project.images.length} images)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.images.map((image, idx) => (
                        <div key={idx} className="rounded-lg overflow-hidden">
                          <img
                            src={image.url}
                            alt={image.caption || `Image ${idx + 1}`}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                          {image.caption && (
                            <p className="p-3 bg-neutral-50 text-sm text-neutral-600">
                              {image.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="border-t border-neutral-200 bg-gradient-to-r from-white to-neutral-50 p-6 sticky bottom-0">
              <div className="flex gap-3 flex-col sm:flex-row">
                <a
                  href="/#contact"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition text-center"
                >
                  Request Similar Project
                </a>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-neutral-300 text-neutral-900 font-semibold rounded-lg hover:bg-neutral-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
