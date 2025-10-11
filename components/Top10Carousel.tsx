import React from 'react';
import Top10Card from './Top10Card';
import { Movie } from './data';

interface Top10CarouselProps {
  title: string;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const Top10Carousel: React.FC<Top10CarouselProps> = ({ title, movies, onSelectMovie }) => {
  return (
    <div className="mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="movie-carousel flex space-x-3 md:space-x-4 lg:space-x-6 overflow-x-auto pb-4 -mb-4">
        {movies.slice(0, 10).map((movie, index) => (
          <div key={movie.id} className="flex-shrink-0">
            <Top10Card
              movie={movie}
              rank={index + 1}
              onSelectMovie={onSelectMovie}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top10Carousel;