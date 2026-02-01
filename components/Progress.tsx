'use client';

import { useEffect, useState } from 'react';
import { OngoingProject } from '@/lib/types';
import { getOngoingProjects } from '@/lib/metadata.service';

export default function Progress() {
  const [projects, setProjects] = useState<OngoingProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const fetchedProjects = await getOngoingProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error loading ongoing projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (isLoading) {
    return (
      <section id="progress" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading progress...</div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="progress" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-neutral-900 font-playfair">
            Projects in Progress
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Currently active projects and their completion status.
          </p>
        </div>

        {/* Projects Timeline */}
        <div className="space-y-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-bold text-neutral-900 font-playfair mb-2">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 text-sm max-w-2xl">
                    {project.description}
                  </p>
                </div>

                {/* Progress Circle */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#dc2626"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - project.progress / 100)}`}
                        strokeLinecap="round"
                        style={{
                          transition: 'stroke-dashoffset 1s ease-in-out',
                        }}
                      />
                    </svg>
                    {/* Percentage Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-red-600">
                        {project.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-neutral-600">Progress</span>
                  <span className="text-sm font-semibold text-neutral-600">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                    Started
                  </p>
                  <p className="text-sm font-semibold text-neutral-900">
                    {new Date(project.startDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                    Expected Completion
                  </p>
                  <p className="text-sm font-semibold text-neutral-900">
                    {project.expectedCompletion}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                    Category
                  </p>
                  <p className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold capitalize">
                    {project.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}