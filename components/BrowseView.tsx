import React from 'react';
import Hero from './Hero';
import MovieCarousel from './MovieCarousel';
import Top10Carousel from './Top10Carousel';
import { mockData, Movie, Category } from './data';

interface BrowseViewProps {
    userName: string | null;
    onPlayMovie: (movie: Movie) => void;
    onSelectMovie: (movie: Movie) => void;
    onToggleMyList: (movie: Movie) => void;
    myListIds: number[];
    myListMovies: Movie[];
    continueWatchingMovies: Movie[];
    featuredMovie: Movie;
}

const BrowseView: React.FC<BrowseViewProps> = ({ 
    userName, 
    onPlayMovie,
    onSelectMovie,
    onToggleMyList,
    myListIds,
    myListMovies,
    continueWatchingMovies,
    featuredMovie
}) => {
    const getPersonalizedTitle = (title: string): string => {
        const capitalizedUserName = userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : null;
        if (capitalizedUserName) {
            if (title === 'Continue Watching') {
                return `${title} for ${capitalizedUserName}`;
            }
            if (title === 'Top Picks for You') {
                return `Top Picks for ${capitalizedUserName}`;
            }
            if (title === 'Top 10 Movies in Dishuflix Today') {
                return `Top 10 Movies for ${capitalizedUserName} Today`;
            }
            if (title === 'Top 10 Series in Dishuflix Today') {
                return `Top 10 Series for ${capitalizedUserName} Today`;
            }
        }
        return title;
    };
    
    // Create dynamic categories, preserving original order
    const categories: Category[] = mockData.map(category => {
        if (category.title === 'Continue Watching') {
            return { ...category, movies: continueWatchingMovies };
        }
        if (category.title === 'My List') {
            return { ...category, movies: myListMovies };
        }
        return category;
    }).filter(category => category.movies.length > 0); // Hide empty categories


    return (
        <main className="overflow-x-hidden animate-fade-in">
            <Hero 
                movie={featuredMovie} 
                onPlay={onPlayMovie} 
                onToggleMyList={onToggleMyList}
                myListIds={myListIds}
            />
            <div className="pl-4 md:pl-10 lg:pl-12 relative z-10 -mt-8 md:-mt-24 pb-16">
                {categories.map((category) => {
                    if (category.title.includes('Top 10')) {
                        return (
                            <Top10Carousel 
                                key={category.title}
                                title={getPersonalizedTitle(category.title)}
                                movies={category.movies}
                                onSelectMovie={onSelectMovie}
                            />
                        );
                    }
                    return (
                        <MovieCarousel 
                            key={category.title}
                            title={getPersonalizedTitle(category.title)}
                            movies={category.movies}
                            onSelectMovie={onSelectMovie}
                            onToggleMyList={onToggleMyList}
                            myListIds={myListIds}
                        />
                    );
                })}
            </div>
        </main>
    );
};

export default BrowseView;