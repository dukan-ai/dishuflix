import React from 'react';
import { PlayIcon, PlusIcon, CheckIcon, ChevronDownIcon } from './Icons';
import { Movie } from './data';

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
  onToggleMyList: (movie: Movie) => void;
  myListIds: number[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelectMovie, onToggleMyList, myListIds }) => {
  const isInMyList = myListIds.includes(movie.id);

  return (
    <div 
      className="group relative aspect-[2/3] w-full bg-zinc-800 rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-black/50"
      onClick={() => onSelectMovie(movie)}
    >
      <img
        src={movie.posterPath}
        alt={movie.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      
      {/* Progress Bar for Continue Watching */}
      {movie.progress && movie.progress > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-500/50">
          <div 
            className="h-full bg-red-600" 
            style={{ width: `${movie.progress}%` }}
            aria-label={`Progress: ${movie.progress}%`}
          ></div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
        <h3 className="text-white font-bold text-lg truncate">{movie.title}</h3>
        <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
          <span className="text-green-400 font-semibold">{movie.rating * 10}% Match</span>
          <span>{movie.genres[0]}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
                <button 
                    aria-label="Play"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black transform transition-transform hover:scale-110"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelectMovie(movie);
                    }}
                >
                    <PlayIcon className="w-5 h-5 ml-0.5"/>
                </button>
                 <button 
                    aria-label={isInMyList ? "Remove from My List" : "Add to My List"} 
                    className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-200 transform transition-transform hover:scale-110 hover:border-white"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleMyList(movie);
                    }}
                 >
                    {isInMyList ? <CheckIcon className="w-5 h-5"/> : <PlusIcon className="w-5 h-5"/>}
                </button>
            </div>
            <button 
                aria-label="More info" 
                className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-200 transform transition-transform hover:scale-110 hover:border-white"
                onClick={(e) => {
                    e.stopPropagation();
                    onSelectMovie(movie);
                }}
            >
                <ChevronDownIcon className="w-5 h-5"/>
            </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;