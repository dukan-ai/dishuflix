
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        <div style={{ width: 'clamp(300px, 80vw, 600px)' }}>
          <svg viewBox="0 0 500 120" className="w-full h-auto" aria-label="Dishuflix">
            <defs>
              <path id="arc-splash" d="M 30 100 A 450 150 0 0 1 470 100"></path>
            </defs>
            <text className="dishuflix-logo-text logo-pulse" style={{ fontSize: '90px' }}>
              <textPath href="#arc-splash" startOffset="50%" text-anchor="middle">
                Dishuflix
              </textPath>
            </text>
          </svg>
        </div>
        <div className="mt-8 relative w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-red-600 animate-progress"></div>
        </div>
    </div>
  );
};

export default SplashScreen;