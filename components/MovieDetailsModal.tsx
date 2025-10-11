import React, { useState, useEffect, useRef } from 'react';
import { Movie } from './data';
import { CloseIcon, PlayIcon, PlusIcon, CheckIcon, DownloadIcon, StarIcon } from './Icons';

interface MovieDetailsModalProps {
  movie: Movie;
  allMovies: Movie[];
  myListIds: number[];
  onClose: () => void;
  onPlayMovie: (movie: Movie) => void;
  onToggleMyList: (movie: Movie) => void;
  onSelectMovie: (movie: Movie) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const totalStars = 5;
    const filledStars = Math.round((rating / 10) * totalStars);
    return (
        <div className="flex items-center" aria-label={`Rating: ${rating} out of 10`}>
            {Array.from({ length: totalStars }, (_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400" filled={i < filledStars} />
            ))}
        </div>
    );
};


const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, allMovies, myListIds, onClose, onPlayMovie, onToggleMyList, onSelectMovie }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const isInMyList = myListIds.includes(movie.id);

  const scrollRef = useRef<HTMLDivElement>(null);

  const similarMovies = allMovies
    .filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
    .slice(0, 12);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Reset states when movie changes
    setIsExpanded(false);
    modalRef.current?.querySelector('.overflow-y-auto')?.scrollTo(0, 0);


    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, movie]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#181818] rounded-xl overflow-hidden animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-title"
      >
        <div className="overflow-y-auto max-h-[90vh] modal-content-scroll">
          {/* Header with Background Image */}
          <div className="relative h-64 md:h-96">
            <img src={movie.posterPath} alt={movie.title} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/50 to-transparent"></div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-white hover:text-black transition-colors"
              aria-label="Close"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          
          {/* Main Content */}
          <div className="p-6 md:p-10 -mt-24 relative z-10">
            <h1 id="movie-title" className="text-3xl md:text-5xl font-bold text-white mb-4">{movie.title}</h1>
            
            {/* Play and Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <button 
                    onClick={() => onPlayMovie(movie)}
                    className="flex items-center justify-center bg-white text-black font-bold rounded-md px-6 py-2.5 text-lg hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105"
                >
                    <PlayIcon className="w-6 h-6 mr-2" />
                    Play
                </button>
                <button 
                    onClick={() => onToggleMyList(movie)}
                    className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-200 transform transition-transform hover:scale-110 hover:border-white"
                    aria-label={isInMyList ? "Remove from My List" : "Add to My List"}
                 >
                    {isInMyList ? <CheckIcon className="w-6 h-6"/> : <PlusIcon className="w-6 h-6"/>}
                </button>
                 <button 
                    className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-200 transform transition-transform hover:scale-110 hover:border-white"
                    aria-label="Download"
                 >
                    <DownloadIcon className="w-6 h-6"/>
                </button>
            </div>

            {/* Movie Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-4 mb-4 text-gray-300">
                  <span className="text-green-400 font-semibold">{movie.rating * 10}% Match</span>
                  <span>{movie.year}</span>
                  <StarRating rating={movie.rating} />
                </div>
                <p className={`text-gray-300 transition-all duration-300 ${isExpanded ? 'line-clamp-none' : 'line-clamp-3'}`}>
                  {movie.description}
                </p>
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-400 hover:text-white mt-1">
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              </div>
              <div className="text-sm">
                <p><span className="text-gray-500">Cast:</span> {movie.cast.join(', ')}</p>
                <p className="mt-2"><span className="text-gray-500">Genres:</span> {movie.genres.join(', ')}</p>
              </div>
            </div>
            
            {/* More Like This Section */}
            {similarMovies.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-white mb-4">More Like This</h2>
                <div className="relative">
                    <div
                        ref={scrollRef}
                        className="movie-carousel flex space-x-3 md:space-x-4 overflow-x-auto pb-4 -mb-4 scroll-smooth"
                    >
                        {similarMovies.map(similarMovie => (
                            <div key={similarMovie.id} className="flex-shrink-0 w-36 sm:w-40 md:w-44">
                                <div 
                                    className="group/card bg-[#2a2a2a] rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 h-full flex flex-col"
                                    onClick={() => onSelectMovie(similarMovie)}
                                    >
                                    <img src={similarMovie.posterPath} alt={similarMovie.title} className="w-full h-auto aspect-[2/3] object-cover" />
                                    <div className="p-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm text-green-400 font-semibold">{similarMovie.rating * 10}% Match</span>
                                            <button 
                                                className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-200 opacity-0 group-hover/card:opacity-100 transition-opacity"
                                                aria-label="Add to My List"
                                                onClick={(e) => { e.stopPropagation(); onToggleMyList(similarMovie); }}
                                            >
                                            {myListIds.includes(similarMovie.id) ? <CheckIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <p className="text-white font-semibold truncate">{similarMovie.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;