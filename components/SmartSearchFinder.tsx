import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon } from './Icons';

interface SmartSearchFinderProps {
  onSearch: (query: string) => void;
  userName: string | null;
}

const GREETING_TEMPLATES = [
    "living in today, {user}?",
    "{user}, did you disappear?",
    "Are you in, {user}?",
    "whatcha watching, {user}?",
    "{user}, what's vibe today?",
    "what's on tonight, {user}?",
    "{user}: today's watch?",
    "what's streaming, {user}?",
    "{user} | what's on?",
    "{user}, what caught you today?",
    "{user} ~ what's capturing?",
    "what's on your screen, {user}?",
    "{user} — what's playing?",
    "watching anything good, {user}?",
];

const PLACEHOLDERS = [
    // Core Indian Web Series
    "Mirzapur",
    "Panchayat",
    "The Family Man",
    "Scam 1992: The Harshad Mehta Story",
    "Sacred Games",
    "Asur",
    "Kota Factory",
    "Farzi",
    "Paatal Lok",
    "Aspirants",
    "Heeramandi",
    "Gullak",
    "Special Ops",
    "Aarya",
    "Delhi Crime",
    "The Night Manager",
    "Jamtara",
    "Made in Heaven",

    // Recent Blockbuster Movies
    "Jawan",
    "Pathaan",
    "Animal",
    "Salaar",
    "RRR",
    "K.G.F: Chapter 2",
    "Pushpa: The Rise",
    "Fighter",
    "Gadar 2",
    "12th Fail",
    "Jailer",
    "Leo",
    "Kantara",
    "Drishyam 2",
    "Bhool Bhulaiyaa 2",
    "Gangubai Kathiawadi",
    "Brahmastra",

    // All-Time Popular & Classic Movies
    "3 Idiots",
    "Dangal",
    "Sholay",
    "Hera Pheri",
    "Dilwale Dulhania Le Jayenge",
    "Lagaan",
    "Zindagi Na Milegi Dobara",
    "Andhadhun",
    "Kabir Singh",
    "Uri: The Surgical Strike",
    "Shershaah",
    "Queen",
    "Bajrangi Bhaijaan",
    "PK",
    "Sanju",
    "War",
    "Baahubali 2: The Conclusion",
    "Chennai Express",
    "Sultan",
    
    // Iconic TV Shows
    "Bigg Boss",
    "Kaun Banega Crorepati",
    "Shark Tank India",
    "Taarak Mehta Ka Ooltah Chashmah",
    "The Great Indian Kapil Show",
    "Anupamaa",
    "CID",
    "Crime Patrol",
    "Indian Idol",
    "Sarabhai vs Sarabhai",

    // Highly Popular International Shows
    "Money Heist",
    "Friends",
    "Game of Thrones",
    "Breaking Bad",
    "Stranger Things",
    "The Office (US)",
    "Squid Game",
    "Peaky Blinders",
    "Dark",
    "The Boys",
    "Sherlock",
    "Narcos",
    "Lucifer",
    "Wednesday",
    "The Witcher",
    "Black Mirror",
    "House of the Dragon",
    "The Last of Us",

    // Major Hollywood Movies
    "Avengers: Endgame",
    "Avatar",
    "Oppenheimer",
    "Joker",
    "Spider-Man: No Way Home",
    "Inception",
    "The Dark Knight",
    "Interstellar",
    "John Wick",
    "Harry Potter",
    "Fast & Furious",
    "Mission: Impossible"
];

const SmartSearchFinder: React.FC<SmartSearchFinderProps> = ({ onSearch, userName }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allTitles, setAllTitles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showNoMatches, setShowNoMatches] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [greeting, setGreeting] = useState('');

  // State for typewriter placeholder
  const [typedPlaceholder, setTypedPlaceholder] = useState('');
  const placeholderIndexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const capitalizedUserName = userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : null;

  useEffect(() => {
    fetch('suggestions.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAllTitles(data.titles || []);
      })
      .catch(fetchError => {
        console.error("Failed to load suggestions:", fetchError);
        setError("Could not load suggestions list.");
      });
  }, []);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
    
    // Set a random greeting on mount
    let finalGreeting;
    if (capitalizedUserName) {
        const template = GREETING_TEMPLATES[Math.floor(Math.random() * GREETING_TEMPLATES.length)];
        finalGreeting = template.replace('{user}', capitalizedUserName);
    } else {
        finalGreeting = 'What are you watching today?';
    }
    setGreeting(finalGreeting);
  }, [capitalizedUserName]);

  // Typewriter effect
  useEffect(() => {
    let isDeleting = false;
    let charIndex = 0;

    const type = () => {
      const currentPlaceholder = PLACEHOLDERS[placeholderIndexRef.current];
      let textToShow;
      let timeout = 120; // Typing speed

      if (isDeleting) {
        textToShow = currentPlaceholder.substring(0, charIndex - 1);
        charIndex--;
        timeout = 60; // Deleting speed
      } else {
        textToShow = currentPlaceholder.substring(0, charIndex + 1);
        charIndex++;
      }

      setTypedPlaceholder(textToShow);

      if (!isDeleting && textToShow === currentPlaceholder) {
        isDeleting = true;
        timeout = 1500; // Hold duration
      } else if (isDeleting && textToShow === '') {
        isDeleting = false;
        placeholderIndexRef.current = (placeholderIndexRef.current + 1) % PLACEHOLDERS.length;
        charIndex = 0;
        timeout = 500; // Pause before next word
      }

      timeoutRef.current = window.setTimeout(type, timeout);
    };
    
    timeoutRef.current = window.setTimeout(type, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowNoMatches(false);
      return;
    }

    const handler = setTimeout(() => {
      if (allTitles.length > 0) {
        const searchInput = query.toLowerCase();
        const filtered = allTitles.filter(title => 
          title.toLowerCase().includes(searchInput)
        );
        const top5 = filtered.slice(0, 5);
        setSuggestions(top5);
        setShowNoMatches(top5.length === 0);
      }
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [query, allTitles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  return (
    <div className="fixed inset-0 bg-[#141414] z-50 flex flex-col items-center justify-center p-4 animate-fade-in text-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {greeting}
        </h1>
        <p className="text-lg text-gray-400 mb-8">Type movie or web series name</p>
        
        <form onSubmit={handleSubmit} className="relative mb-4">
          {/* Animated Typewriter Placeholder */}
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

        <div className="relative h-64">
          {error && <div className="text-red-500" role="alert">{error}</div>}

          {suggestions.length > 0 && (
            <div className="absolute top-0 left-0 right-0 bg-[#1a1a1a]/80 backdrop-blur-md rounded-lg p-2 animate-fade-in border border-gray-700">
              {suggestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(item)}
                  className="w-full text-left px-6 py-3 text-lg text-gray-200 hover:bg-[#E50914]/30 hover:text-white rounded-md transition-all duration-200"
                >
                  {item}
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

export default SmartSearchFinder;