'use client';

import { useEffect, useState } from 'react';
import { getCompanyInfo } from '@/lib/metadata.service';

export default function Footer() {
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const loadCompanyInfo = async () => {
      try {
        const info = await getCompanyInfo();
        setCompanyInfo(info);
      } catch (error) {
        console.error('Error loading company info:', error);
      }
    };

    loadCompanyInfo();
  }, []);

  return (
    <footer className="bg-neutral-900 text-neutral-300 py-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          {companyInfo && (
            <div>
              <h3 className="text-white font-bold text-lg mb-4 font-playfair">
                {companyInfo.name}
              </h3>
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                {companyInfo.description}
              </p>
              <div className="flex gap-4">
                {companyInfo.social?.facebook && (
                  <a
                    href={companyInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-red-600 transition"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.991 22 12z" />
                    </svg>
                  </a>
                )}
                {companyInfo.social?.instagram && (
                  <a
                    href={companyInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-red-600 transition"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                )}
                {companyInfo.social?.linkedin && (
                  <a
                    href={companyInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-red-600 transition"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.045-8.733 0-9.652h3.554v1.366c.43-.665 1.199-1.61 2.920-1.61 2.135 0 3.733 1.398 3.733 4.403v5.493zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.71 0-.955.771-1.71 1.956-1.71 1.185 0 1.915.755 1.94 1.71 0 .952-.755 1.71-1.981 1.71zm1.581 11.597H3.635V9.236h3.283v11.216zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#hero" className="text-neutral-400 hover:text-red-600 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="text-neutral-400 hover:text-red-600 transition">
                  Projects
                </a>
              </li>
              <li>
                <a href="#services" className="text-neutral-400 hover:text-red-600 transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#progress" className="text-neutral-400 hover:text-red-600 transition">
                  Progress
                </a>
              </li>
              <li>
                <a href="#contact" className="text-neutral-400 hover:text-red-600 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-neutral-400 hover:text-red-600 transition">
                  Residential Construction
                </a>
              </li>
              <li>
                <a href="#services" className="text-neutral-400 hover:text-red-600 transition">
                  Commercial Construction
                </a>
              </li>
              <li>
                <a href="#services" className="text-neutral-400 hover:text-red-600 transition">
                  Renovation & Remodeling
                </a>
              </li>
              <li>
                <a href="#services" className="text-neutral-400 hover:text-red-600 transition">
                  Sustainable Building
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          {companyInfo && (
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="text-neutral-400 hover:text-red-600 transition"
                  >
                    {companyInfo.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="text-neutral-400 hover:text-red-600 transition"
                  >
                    {companyInfo.email}
                  </a>
                </li>
                <li className="text-neutral-400 text-sm">
                  {companyInfo.address}<br />
                  {companyInfo.city}, {companyInfo.state} {companyInfo.zipCode}
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 py-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-neutral-400 text-sm">
              &copy; {currentYear} {companyInfo?.name || 'Your Company'}. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-red-600 text-sm transition">
                Privacy Policy
              </a>
              <a href="#" className="text-neutral-400 hover:text-red-600 text-sm transition">
                Terms of Service
              </a>
              <a href="#contact" className="text-neutral-400 hover:text-red-600 text-sm transition">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}