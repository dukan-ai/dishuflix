
import React from 'react';

interface PlayerControlsProps {
  currentEpisode: number;
  onEpisodeChange: (episode: number) => void;
}

const EPISODES = [1, 2, 3, 4, 5, 6, 7, 8];
const QUALITIES = ['1080p HEVC', '1080p HDRip', '720p HDRip', '480p'];

const PlayerControls: React.FC<PlayerControlsProps> = ({ currentEpisode, onEpisodeChange }) => {
  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3 text-white">Episodes</h3>
        <div className="flex flex-wrap gap-2">
          {EPISODES.map((ep) => (
            <button
              key={ep}
              onClick={() => onEpisodeChange(ep)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ease-in-out transform hover:scale-110 ${
                currentEpisode === ep
                  ? 'bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.6)]'
                  : 'bg-[#404040] text-gray-200 hover:bg-red-800'
              }`}
            >
              {ep}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Quality / Server</h3>
        <div className="flex flex-wrap gap-3">
          {QUALITIES.map((quality) => (
            <button
              key={quality}
              className="px-4 py-2 rounded-md bg-[#404040] text-gray-200 font-medium transition-all duration-300 ease-in-out border-2 border-transparent hover:border-red-600 hover:text-white hover:shadow-[0_0_15px_rgba(229,9,20,0.4)]"
            >
              {quality}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
