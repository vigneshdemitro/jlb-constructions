'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Progress', href: '#progress' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-white/80 backdrop-blur-md'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" aria-label="JLB Constructions Home">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
            <span className="text-white font-bold text-lg font-playfair"><img src="/favicon.ico" alt="JLB Constructions Logo" className="w-11 h-11" /></span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-neutral-900 font-playfair">JLB Constructions</h1>
            <p className="text-xs text-red-600 font-medium">Expert Building Solutions</p>
          </div>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-neutral-700 hover:text-red-600 font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden sm:inline-block px-7 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        >
          Get Quote
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            className={`w-6 h-6 text-neutral-900 transition-transform duration-300 ${
              isMenuOpen ? 'rotate-90' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 shadow-lg animate-in slide-in-from-top fade-in duration-200">
          <ul className="flex flex-col gap-2 px-4 py-6">
            {navItems.map((item, index) => (
              <li key={item.label} style={{ animationDelay: `${index * 50}ms` }}>
                <a
                  href={item.href}
                  className="block px-4 py-3 text-neutral-700 hover:text-red-600 hover:bg-neutral-50 font-medium transition-all duration-200 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="block px-4 py-3 bg-red-600 text-white rounded-lg text-center font-semibold hover:bg-red-700 transition-all duration-300 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Quote
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}