import React, { useState, useEffect } from 'react';
import { SearchIcon, SettingsIcon, ShareIcon } from './Icons';

interface HeaderProps {
  onSearchClick: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick, onLogoClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 p-4 md:p-6 z-40 transition-colors duration-300 ease-in-out ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          onClick={onLogoClick}
          className="w-32 md:w-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-red-500 rounded-md"
          aria-label="Dishuflix homepage"
        >
          <svg viewBox="0 0 250 70" className="w-full h-auto" aria-hidden="true">
            <defs>
                <path id="arc-header" d="M 15 50 A 250 150 0 0 1 235 50"></path>
            </defs>
            <text 
              className="dishuflix-logo-text" 
              style={{ 
                fontSize: '50px', 
                textShadow: '0 0 10px rgba(229, 9, 20, 0.6), 0 0 20px rgba(229, 9, 20, 0.4)' 
              }}
            >
                <textPath href="#arc-header" startOffset="50%" text-anchor="middle">
                    Dishuflix
                </textPath>
            </text>
          </svg>
        </button>
        <div className="flex items-center space-x-4">
          <button
            onClick={onSearchClick}
            className="text-white hover:text-[#E50914] transition-colors duration-300 p-2 rounded-full hover:bg-gray-800/50"
            aria-label="Search"
          >
            <SearchIcon className="w-6 h-6" />
          </button>
          <button 
            className="text-white hover:text-[#E50914] transition-colors duration-300 p-2 rounded-full hover:bg-gray-800/50"
            aria-label="Settings"
          >
            <SettingsIcon className="w-6 h-6" />
          </button>
          <button 
            className="text-white hover:text-[#E50914] transition-colors duration-300 p-2 rounded-full hover:bg-gray-800/50"
            aria-label="Share"
          >
            <ShareIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;