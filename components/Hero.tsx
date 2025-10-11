import React, { useState, useEffect } from 'react';
import { PlayIcon, PlusIcon, CheckIcon } from './Icons';
import { Movie } from './data';

interface HeroProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onToggleMyList: (movie: Movie) => void;
  myListIds: number[];
}

const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};


const Hero: React.FC<HeroProps> = ({ movie, onPlay, onToggleMyList, myListIds }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [showTitleOverlay, setShowTitleOverlay] = useState(true);
  const isInMyList = myListIds.includes(movie.id);

  // Timer to start showing the video after a delay
  useEffect(() => {
    const videoTimer = setTimeout(() => {
      setShowVideo(true);
    }, 1800); 

    return () => clearTimeout(videoTimer);
  }, [movie]); // Re-trigger effect if the featured movie changes

  // Timer to hide the title overlay after the video is visible
  useEffect(() => {
    let overlayTimer: number;
    if (showVideo) {
      setShowTitleOverlay(true); // Ensure it's visible at the start of the video
      overlayTimer = window.setTimeout(() => {
        setShowTitleOverlay(false);
      }, 2000); // Hide after 2 seconds
    }
    return () => window.clearTimeout(overlayTimer);
  }, [showVideo]);


  const youtubeId = movie.trailerUrl ? getYouTubeId(movie.trailerUrl) : null;

  // Parameters to make the YouTube player as clean as possible
  const youtubeParams = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    controls: '0',
    showinfo: '0',
    rel: '0',
    iv_load_policy: '3',
    modestbranding: '1',
    vq: 'hd1080', // Request 1080p quality
    playlist: youtubeId || '', // playlist is required for loop
  }).toString();

  return (
    <div className="relative h-[56.25vw] min-h-[400px] max-h-[800px] w-full overflow-hidden">
      {/* Background Media Container */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Background Image */}
        <img
          src={movie.backdropPath || movie.posterPath}
          alt={movie.title}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${showVideo && movie.trailerUrl ? 'opacity-0' : 'opacity-100'}`}
        />
        {/* Video Preview */}
        {youtubeId ? (
           <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${showVideo ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
            <iframe
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto aspect-video"
              style={{ transform: 'translate(-50%, -55%)' }}
              src={`https://www.youtube.com/embed/${youtubeId}?${youtubeParams}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title={`${movie.title} trailer`}
            ></iframe>
            {/* New Overlay to hide YouTube title for the first few seconds */}
            <div className={`absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black via-black/80 to-transparent transition-opacity duration-500 ease-in-out ${showTitleOverlay ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>
        ) : movie.trailerUrl && (
          <video
            src={movie.trailerUrl}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${showVideo ? 'opacity-100' : 'opacity-0'}`}
          ></video>
        )}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-1/4 left-4 md:left-10 lg:left-12 max-w-lg animate-slide-up">
        <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider" 
            style={{ fontFamily: "'Bebas Neue', sans-serif", textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
        >
            {movie.title}
        </h1>
        <div className="flex items-center space-x-4 mt-4 text-sm text-gray-300">
          {movie.genres.map((genre, index) => (
            <React.Fragment key={genre}>
              <span>{genre}</span>
              {index < movie.genres.length - 1 && <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>}
            </React.Fragment>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 mt-6">
          <button 
            onClick={() => onPlay(movie)}
            className="flex items-center justify-center bg-white text-black font-bold rounded-md px-6 py-2.5 text-lg hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105"
          >
            <PlayIcon className="w-6 h-6 mr-2" />
            Play
          </button>
          <button 
            onClick={() => onToggleMyList(movie)}
            className="flex items-center justify-center bg-gray-500/70 text-white font-bold rounded-md px-6 py-2.5 text-lg hover:bg-gray-600/70 transition-colors duration-300 transform hover:scale-105"
          >
            {isInMyList ? <CheckIcon className="w-6 h-6 mr-2" /> : <PlusIcon className="w-6 h-6 mr-2" />}
            My List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
