'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface EmbeddedPuzzleGameProps {
  isActive: boolean;
}

const EmbeddedPuzzleGame: React.FC<EmbeddedPuzzleGameProps> = ({ isActive }) => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  // Use ref to track timer to prevent rerenders
  const timerRef = useRef<NodeJS.Timeout>();

  // Initialize puzzle only once when becoming active
  useEffect(() => {
    if (isActive && !hasInitialized) {
      initializePuzzle();
      setStartTime(Date.now());
      setHasInitialized(true);
    }
  }, [isActive, hasInitialized]);

  // Optimized timer that only updates when necessary
  useEffect(() => {
    if (isActive && !isComplete && startTime > 0) {
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Only update timer every 5 seconds to reduce rerenders
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 5000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isComplete, startTime]);

  const initializePuzzle = () => {
    // Create a simple 3x3 sliding puzzle
    const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // 0 represents empty space
    const shuffled = shufflePuzzle([...initialTiles]);
    setTiles(shuffled);
    setMoves(0);
    setIsComplete(false);
    setElapsedTime(0);
  };

  const shufflePuzzle = (array: number[]): number[] => {
    const shuffled = [...array];
    // Perform valid moves to ensure solvability
    for (let i = 0; i < 50; i++) {
      const emptyIndex = shuffled.indexOf(0);
      const validMoves = getValidMoves(emptyIndex);
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      [shuffled[emptyIndex], shuffled[randomMove]] = [shuffled[randomMove], shuffled[emptyIndex]];
    }
    return shuffled;
  };

  const getValidMoves = (emptyIndex: number): number[] => {
    const moves = [];
    const row = Math.floor(emptyIndex / 3);
    const col = emptyIndex % 3;

    if (row > 0) moves.push(emptyIndex - 3); // Up
    if (row < 2) moves.push(emptyIndex + 3); // Down
    if (col > 0) moves.push(emptyIndex - 1); // Left
    if (col < 2) moves.push(emptyIndex + 1); // Right

    return moves;
  };

  const handleTileClick = (index: number) => {
    if (isComplete) return;

    const emptyIndex = tiles.indexOf(0);
    const validMoves = getValidMoves(emptyIndex);

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setMoves(moves + 1);

      // Check if puzzle is complete
      const isWin = newTiles.every((tile, idx) => tile === (idx + 1) % 9);
      if (isWin) {
        setIsComplete(true);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-dark-100 mb-6 text-center">
        Interactive Sliding Puzzle
      </h4>
      
      {/* Game Stats */}
      <div className="flex justify-between mb-4 text-sm">
        <div className="text-dark-300">
          Moves: <span className="text-primary-400 font-bold">{moves}</span>
        </div>
        <div className="text-dark-300">
          Time: <span className="text-primary-400 font-bold">{formatTime(elapsedTime)}</span>
        </div>
      </div>

      {/* Puzzle Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {tiles.map((tile, index) => (
          <motion.button
            key={index}
            className={`aspect-square rounded-lg font-bold text-lg transition-all duration-200 ${
              tile === 0
                ? 'bg-dark-700/30 border border-dark-600'
                : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-dark-200 hover:from-purple-400/30 hover:to-pink-400/30 border border-purple-400/30'
            }`}
            onClick={() => handleTileClick(index)}
            whileHover={tile !== 0 ? { scale: 1.05 } : {}}
            whileTap={tile !== 0 ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            {tile !== 0 && tile}
          </motion.button>
        ))}
      </div>

      {/* Win Message */}
      {isComplete && (
        <motion.div
          className="text-center p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-2xl mb-2">🎉</div>
          <div className="text-green-400 font-bold">Puzzle Solved!</div>
          <div className="text-dark-300 text-sm">
            {moves} moves in {formatTime(elapsedTime)}
          </div>
        </motion.div>
      )}

      {/* New Game Button */}
      <div className="text-center">
        <motion.button
          onClick={initializePuzzle}
          className="px-4 py-2 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 border border-primary-400/50 rounded-lg text-dark-200 hover:from-primary-400/40 hover:to-secondary-400/40 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          New Game
        </motion.button>
      </div>
    </div>
  );
};

export default React.memo(EmbeddedPuzzleGame);
