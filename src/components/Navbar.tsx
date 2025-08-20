import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import FloatingLogo from './FloatingLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/services' },
    { name: 'Curriculum', path: '/curriculum' },
    { name: 'Accelerator Program', path: '/accelerator' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark-light/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="group">
              <FloatingLogo size="small" showText={true} showTypewriter={false} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group"
              >
                <span className={`text-gray-300 group-hover:text-white transition-colors duration-200 ${
                  location.pathname === link.path ? 'text-white' : ''
                }`}>
                  {link.name}
                </span>
                <div
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-200 origin-left ${
                    location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-indigo-300 transition-colors duration-300"
            >
              <div className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-200 ${
            isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#020817]">
            {navLinks.map((link, index) => (
              <div
                key={link.path}
                className={`transition-all duration-200 delay-[${index * 50}ms] ${
                  isOpen ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
                }`}
              >
                <Link
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium relative group ${
                    location.pathname === link.path
                      ? 'text-white bg-gray-900'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-200 ${
                      location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
