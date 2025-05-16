import React from 'react';
import { Code, Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 mt-12 bg-gray-100 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
              <Code size={24} />
              <span className="text-lg font-bold">EncodePro</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-xs">
              Free online tools for text encoding/decoding, format conversion, and more.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold uppercase text-gray-700 dark:text-gray-200">Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <FooterLink href="#text" label="Text Encoders" />
              <FooterLink href="#binary" label="Binary Converters" />
              <FooterLink href="#hash" label="Hash Generators" />
              <FooterLink href="#image" label="Image Tools" />
              <FooterLink href="#utility" label="String Utilities" />
              <FooterLink href="#formatter" label="Formatters" />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold uppercase text-gray-700 dark:text-gray-200">About</h3>
            <FooterLink href="#" label="Privacy Policy" />
            <FooterLink href="#" label="Terms of Service" />
            <FooterLink href="#" label="Contact" />
            
           
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} EncodePro. Made with <Heart size={16} className="text-red-500" /> for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => (
  <a 
    href={href}
    className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 text-sm transition-colors"
  >
    {label}
  </a>
);

export default Footer;