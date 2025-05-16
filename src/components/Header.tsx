import React, { useState, useEffect } from 'react';
import { Code, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`sticky top-0 z-50 w-full py-4 px-4 md:px-6 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
          <Code size={28} className="animate-pulse" />
          <span className="text-xl font-bold">EncodePro</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-slide-down">
          <nav className="flex flex-col space-y-4 px-4">
            <NavLinks onClick={() => setIsMenuOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinksProps {
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ onClick }) => {
  const links = [
    { name: "Text Tools", href: "#text" },
    { name: "Conversions", href: "#binary" },
    { name: "Formatters", href: "#formatter" },
    { name: "Generators", href: "#generator" },
  ];

  return (
    <>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          onClick={onClick}
          className="font-medium text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400 transition-colors"
        >
          {link.name}
        </a>
      ))}
    </>
  );
};

export default Header;