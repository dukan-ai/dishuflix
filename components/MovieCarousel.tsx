import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from './data';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onToggleMyList: (movie: Movie) => void;
  myListIds: number[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies, onSelectMovie, onToggleMyList, myListIds }) => {
  return (
    <div className="mb-8 md:mb-12 movie-carousel-container">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="movie-carousel flex space-x-3 md:space-x-4 overflow-x-auto pb-4 -mb-4">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-36 sm:w-40 md:w-48 lg:w-56">
            <MovieCard 
                movie={movie} 
                onSelectMovie={onSelectMovie}
                onToggleMyList={onToggleMyList}
                myListIds={myListIds} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;