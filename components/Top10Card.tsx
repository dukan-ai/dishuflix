import React from 'react';
import { Movie } from './data';

interface Top10CardProps {
  movie: Movie;
  rank: number;
  onSelectMovie: (movie: Movie) => void;
}

const Top10Card: React.FC<Top10CardProps> = ({ movie, rank, onSelectMovie }) => {
  return (
    <div 
      className="top-10-card-container relative flex items-center transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
      onClick={() => onSelectMovie(movie)}
    >
      <span className="top-10-number">
        {rank}
      </span>
      <div className="relative aspect-[2/3] w-36 sm:w-40 md:w-48 rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 ease-in-out group-hover:shadow-2xl group-hover:shadow-black/50 z-10">
        {movie.isNew && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-20 shadow-md">
            Recently Added
          </div>
        )}
        <img
          src={movie.posterPath}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Top10Card;