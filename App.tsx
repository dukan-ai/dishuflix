import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import PlayerControls from './components/PlayerControls';
import SplashScreen from './components/SplashScreen';
import BrowseView from './components/BrowseView';
import OnboardingModal from './components/OnboardingModal';
import SearchOverlay from './components/SearchOverlay';
import PaymentGateway from './components/PaymentGateway';
import MovieDetailsModal from './components/MovieDetailsModal';
import { mockData, Movie } from './components/data';

const BASE_URL = "https://player4u.xyz/embed?key=";

type OnboardingStep = 'invite' | 'name' | 'payment' | 'complete';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('complete');
  const [userName, setUserName] = useState<string | null>(null);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  // Dynamic data states
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [myListIds, setMyListIds] = useState<number[]>([]);
  const [continueWatching, setContinueWatching] = useState<Record<number, { progress: number }>>({});
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // Flatten all movies from mockData for easy lookup
    const all = mockData.flatMap(category => category.movies);
    const uniqueMovies = Array.from(new Map(all.map(m => [m.id, m])).values());
    setAllMovies(uniqueMovies);

    // Select a random featured movie from 'Trending Now'
    const trendingNowCategory = mockData.find(c => c.title === 'Trending Now');
    if (trendingNowCategory && trendingNowCategory.movies.length > 0) {
        const randomIndex = Math.floor(Math.random() * trendingNowCategory.movies.length);
        setFeaturedMovie(trendingNowCategory.movies[randomIndex]);
    } else if (uniqueMovies.length > 0) {
        // Fallback if 'Trending Now' isn't available
        setFeaturedMovie(uniqueMovies[0]);
    }

    // Load dynamic data from localStorage
    try {
      const storedMyList = JSON.parse(localStorage.getItem('dishuflix_myList') || '[]') as number[];
      setMyListIds(storedMyList);
      
      const storedContinueWatching = JSON.parse(localStorage.getItem('dishuflix_continueWatching') || '{}') as Record<number, { progress: number }>;
      setContinueWatching(storedContinueWatching);

      const storedRecent = JSON.parse(localStorage.getItem('dishuflix_recentSearches') || '[]') as string[];
      setRecentSearches(storedRecent);
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
    }

    // Check for existing user and payment status
    const storedName = localStorage.getItem('dishuflix_username');
    const paymentSuccess = localStorage.getItem('dishuflix_paymentStatus') === 'success';

    if (storedName) {
      setUserName(storedName);
      if (paymentSuccess) {
        setOnboardingStep('complete');
      } else {
        setOnboardingStep('payment');
      }
    } else {
      setOnboardingStep('invite');
    }


    // Splash screen timer
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      const lowerCaseQuery = query.toLowerCase();
      setVideoKey(query);
      setCurrentEpisode(1);
      // Update recent searches, avoiding duplicates and keeping it fresh
      setRecentSearches(prev => {
        const newSearches = [
          query, 
          ...prev.filter(s => s.toLowerCase() !== lowerCaseQuery)
        ].slice(0, 6); // show 6 recent searches
        localStorage.setItem('dishuflix_recentSearches', JSON.stringify(newSearches));
        return newSearches;
      });
    }
  }, []);
  
  const handleEpisodeChange = useCallback((episode: number) => {
    setCurrentEpisode(episode);
    console.log(`Switched to episode ${episode}`);
  }, []);

  const handleNameSuccess = (name: string) => {
    const firstName = name.trim().split(' ')[0];
    localStorage.setItem('dishuflix_username', firstName);
    setUserName(firstName);
    setOnboardingStep('payment');
  };

  const handlePaymentSuccess = () => {
    localStorage.setItem('dishuflix_paymentStatus', 'success');
    setOnboardingStep('complete');
  };

  const handleToggleMyList = useCallback((movie: Movie) => {
    const newMyListIds = myListIds.includes(movie.id)
      ? myListIds.filter(id => id !== movie.id)
      : [...myListIds, movie.id];
    setMyListIds(newMyListIds);
    localStorage.setItem('dishuflix_myList', JSON.stringify(newMyListIds));
  }, [myListIds]);

  const handlePlayMovie = useCallback((movie: Movie) => {
    handleSearch(movie.title);
    setSelectedMovie(null); // Close modal when playing
    
    // Simulate progress and add to continue watching
    const newProgress = Math.floor(Math.random() * 81) + 10; // Random progress between 10% and 90%
    const newContinueWatching = {
      ...continueWatching,
      [movie.id]: { progress: newProgress }
    };
    setContinueWatching(newContinueWatching);
    localStorage.setItem('dishuflix_continueWatching', JSON.stringify(newContinueWatching));
  }, [handleSearch, continueWatching]);
  
  const handleSelectMovie = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  const handleLogoClick = useCallback(() => {
    setVideoKey(null);
  }, []);


  if (showSplash) {
    return <SplashScreen />;
  }

  if (onboardingStep !== 'complete') {
    if (onboardingStep === 'invite' || onboardingStep === 'name') {
      return (
        <OnboardingModal 
          step={onboardingStep}
          onInviteSuccess={() => setOnboardingStep('name')}
          onNameSuccess={handleNameSuccess}
        />
      );
    }
    if (onboardingStep === 'payment') {
      return (
        <PaymentGateway
          userName={userName}
          onPaymentSuccess={handlePaymentSuccess}
        />
      );
    }
    // Fallback for any unexpected state
    return null;
  }

  // Hydrate movie objects from IDs for rendering
  const myListMovies = allMovies.filter(m => myListIds.includes(m.id));
  const continueWatchingMovies = allMovies
    .filter(m => continueWatching[m.id])
    .map(m => ({ ...m, progress: continueWatching[m.id].progress }))
    .sort((a, b) => (a.progress ?? 0) < (b.progress ?? 0) ? 1 : -1);

  return (
    <div className="bg-black min-h-screen text-[#E5E5E5] font-sans antialiased">
      <Header onSearchClick={() => setShowSearchOverlay(true)} onLogoClick={handleLogoClick} />
      
      {videoKey ? (
        <div className="pt-24">
          <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 bg-[#141414] animate-fade-in">
            <VideoPlayer url={`${BASE_URL}${encodeURIComponent(videoKey)}`} title={videoKey} />
            <PlayerControls 
              currentEpisode={currentEpisode} 
              onEpisodeChange={handleEpisodeChange}
            />
          </main>
        </div>
      ) : (
        featuredMovie && (
          <BrowseView
            userName={userName}
            onPlayMovie={handlePlayMovie}
            onSelectMovie={handleSelectMovie}
            onToggleMyList={handleToggleMyList}
            myListIds={myListIds}
            myListMovies={myListMovies}
            continueWatchingMovies={continueWatchingMovies}
            featuredMovie={featuredMovie}
          />
        )
      )}

      {showSearchOverlay && (
        <SearchOverlay
          userName={userName}
          recentSearches={recentSearches}
          allMovies={allMovies}
          onSearch={(query) => {
            handleSearch(query);
            setShowSearchOverlay(false);
          }}
          onClose={() => setShowSearchOverlay(false)}
        />
      )}

      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          allMovies={allMovies}
          myListIds={myListIds}
          onClose={handleCloseModal}
          onPlayMovie={handlePlayMovie}
          onToggleMyList={handleToggleMyList}
          onSelectMovie={handleSelectMovie}
        />
      )}
    </div>
  );
};

export default App;