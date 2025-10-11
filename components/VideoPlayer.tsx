
import React from 'react';

interface VideoPlayerProps {
  url: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  return (
    <div className="mb-6">
      <div className="relative w-full overflow-hidden rounded-lg shadow-2xl shadow-red-600/20 border-2 border-transparent focus-within:border-red-600" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={url}
          title="Dishuflix Video Player"
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
       <div className="mt-4 px-2">
        <h2 className="text-xl md:text-2xl font-bold text-white truncate">{title}</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
            <span>1080p HDRip</span>
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
            <span>HEVC</span>
             <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
            <span>~1.2GB</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
