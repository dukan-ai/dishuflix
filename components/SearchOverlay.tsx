import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon } from './Icons';
import { Movie } from './data';

interface SearchOverlayProps {
  userName: string | null;
  recentSearches: string[];
  allMovies: Movie[];
  onSearch: (query: string) => void;
  onClose: () => void;
}

const PLACEHOLDERS = [
    "Mirzapur", "Panchayat", "The Family Man", "Scam 1992", "Sacred Games", "Asur", "Kota Factory", "Farzi", "Paatal Lok",
    "Jawan", "Pathaan", "Animal", "Salaar", "RRR", "K.G.F: Chapter 2", "Fighter", "12th Fail",
    "3 Idiots", "Dangal", "Sholay", "Hera Pheri", "Zindagi Na Milegi Dobara",
    "Money Heist", "Friends", "Game of Thrones", "Breaking Bad", "Stranger Things",
    "The Office (US)", "Squid Game", "Peaky Blinders", "Dark", "The Boys",
    "Avengers: Endgame", "Oppenheimer", "Joker", "Inception", "The Dark Knight",
];


const SearchOverlay: React.FC<SearchOverlayProps> = ({ userName, recentSearches, allMovies, onSearch, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [showNoMatches, setShowNoMatches] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [typedPlaceholder, setTypedPlaceholder] = useState('');
  const placeholderIndexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const capitalizedUserName = userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : 'there';

  useEffect(() => {
    inputRef.current?.focus();
    
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    let isDeleting = false;
    let charIndex = 0;

    const type = () => {
      const currentPlaceholder = PLACEHOLDERS[placeholderIndexRef.current];
      let textToShow;
      let timeout = 120;

      if (isDeleting) {
        textToShow = currentPlaceholder.substring(0, charIndex - 1);
        charIndex--;
        timeout = 60;
      } else {
        textToShow = currentPlaceholder.substring(0, charIndex + 1);
        charIndex++;
      }

      setTypedPlaceholder(textToShow);

      if (!isDeleting && textToShow === currentPlaceholder) {
        isDeleting = true;
        timeout = 1500;
      } else if (isDeleting && textToShow === '') {
        isDeleting = false;
        placeholderIndexRef.current = (placeholderIndexRef.current + 1) % PLACEHOLDERS.length;
        charIndex = 0;
        timeout = 500;
      }

      timeoutRef.current = window.setTimeout(type, timeout);
    };
    
    timeoutRef.current = window.setTimeout(type, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowNoMatches(false);
      return;
    }

    const handler = setTimeout(() => {
      if (allMovies.length > 0) {
        const searchInput = query.toLowerCase();
        const filtered = allMovies.filter(movie => 
          movie.title.toLowerCase().includes(searchInput)
        );
        const top5 = filtered.slice(0, 5);
        setSuggestions(top5);
        setShowNoMatches(top5.length === 0);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, allMovies]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleSuggestionClick = (suggestionTitle: string) => {
    setQuery(suggestionTitle);
    onSearch(suggestionTitle);
  };

  return (
    <div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 animate-fade-in"
        onClick={onClose}
    >
        <div className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-lg"></div>
      
      <div 
        className="relative w-full max-w-3xl animate-slide-up text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Hey, {capitalizedUserName}! Ready for something new?
        </h1>
        <p className="text-gray-400 mb-8">Find your next favorite movie or show.</p>
        
        <form onSubmit={handleSubmit} className="relative mb-4">
          {!query && (
            <div
              aria-hidden="true"
              className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xl md:text-2xl"
            >
              <span className="typewriter-text">
                {typedPlaceholder}
              </span>
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full bg-[#1a1a1a] border-2 border-[#404040] text-white text-xl md:text-2xl py-4 pl-6 pr-16 rounded-full focus:outline-none focus:border-[#E50914] focus:shadow-[0_0_20px_rgba(229,9,20,0.6)] transition-all duration-300 ${!query ? 'caret-transparent' : ''}`}
          />
          <button 
            type="submit" 
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-[#E50914] transition-colors"
            aria-label="Submit search"
          >
            <SearchIcon className="w-7 h-7" />
          </button>
        </form>

        {recentSearches.length > 0 && !query && (
            <div className="mb-4 animate-fade-in flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
            <span className="text-gray-400 text-sm font-medium">Recent:</span>
            {recentSearches.map((term) => (
                <button
                key={term}
                onClick={() => onSearch(term)}
                className="bg-white/10 text-gray-200 text-sm rounded-full px-4 py-1.5 hover:bg-white/20 transition-colors"
                >
                {term}
                </button>
            ))}
            </div>
        )}

        <div className="relative h-80">
          {suggestions.length > 0 && (
            <div className="absolute top-0 left-0 right-0 bg-[#1a1a1a]/80 backdrop-blur-md rounded-lg p-2 animate-fade-in border border-gray-700 max-h-80 overflow-y-auto">
              {suggestions.map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => handleSuggestionClick(movie.title)}
                  className="w-full text-left p-3 flex items-center space-x-4 text-gray-200 hover:bg-[#E50914]/30 hover:text-white rounded-md transition-all duration-200"
                >
                  <img src={movie.posterPath} alt={movie.title} className="w-12 h-18 object-cover rounded-md flex-shrink-0" loading="lazy" />
                  <div>
                    <p className="text-lg font-semibold text-white truncate">{movie.title}</p>
                    <p className="text-sm text-gray-400">{movie.genres.join(', ')}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {showNoMatches && (
             <div className="text-gray-400 pt-4">No matches found — try full search.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;