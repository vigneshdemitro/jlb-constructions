'use client';

import { useEffect, useState } from 'react';
import { Service } from '@/lib/types';
import { getServices } from '@/lib/metadata.service';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetchedServices = await getServices();
        console.log('Fetched services:', fetchedServices);
        setServices(fetchedServices || []);
      } catch (error) {
        console.error('Error loading services:', error);
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  if (isLoading) {
    return (
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading services...</div>
        </div>
      </section>
    );
  }

  if (!services || services.length === 0) {
    return (
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-neutral-600">No services found in metadata</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-neutral-900 font-playfair">
            Our Services
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive construction and renovation services tailored to meet your specific needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, idx) => (
            <div
              key={service.id}
              className="group p-6 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-red-600 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-neutral-900 mb-3 font-playfair group-hover:text-red-600 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-sm text-neutral-600 flex items-start gap-2">
                      <span className="text-red-600 mt-1">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {/* Hover CTA */}
              <div className="mt-4 pt-4 border-t border-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-red-600 font-semibold text-sm">Learn More →</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all transform hover:scale-105"
          >
            Get a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}