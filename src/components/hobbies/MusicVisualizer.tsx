'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface MusicVisualizerProps {
  isActive: boolean;
}

const MusicVisualizer: React.FC<MusicVisualizerProps> = ({ isActive }) => {
  // Pre-generate random heights to prevent rerenders
  const electronicHeights = useMemo(() => 
    Array.from({ length: 12 }, () => Math.random() * 16 + 8), []
  );
  
  const orchestralHeights = useMemo(() => 
    Array.from({ length: 8 }, () => Math.random() * 20 + 10), []
  );

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-dark-100 mb-6 text-center">
        Audio Landscapes
      </h4>
      
      <div className="space-y-3">
        {/* Electronic Music Visualizer */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-400/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🎛️</span>
            <span className="text-dark-200 font-medium">Electronic</span>
          </div>
          <div className="flex items-end gap-1 h-6">
            {electronicHeights.map((height, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full"
                animate={isActive ? {
                  height: [4, height, 4]
                } : { height: 4 }}
                transition={{
                  duration: 1.5,
                  repeat: isActive ? Infinity : 0,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Orchestral Music Visualizer */}
        <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-lg p-4 border border-amber-400/30">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🎼</span>
            <span className="text-dark-200 font-medium">Orchestral</span>
          </div>
          <div className="flex items-end gap-1 h-8">
            {orchestralHeights.map((height, i) => (
              <motion.div
                key={i}
                className="w-2 bg-gradient-to-t from-amber-400 to-red-400 rounded-full"
                animate={isActive ? {
                  height: [6, height, 6]
                } : { height: 6 }}
                transition={{
                  duration: 2,
                  repeat: isActive ? Infinity : 0,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MusicVisualizer);
