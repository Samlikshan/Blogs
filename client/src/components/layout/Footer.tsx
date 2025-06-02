import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-blue-600">BlogForge</Link>
            <p className="text-gray-600 text-sm mt-1">
              Create, manage, and share your ideas with the world.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm">
              About
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-gray-900 text-sm">
              Terms
            </Link>
          </div>
          
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} BlogForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;