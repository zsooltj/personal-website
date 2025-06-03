'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MiniPuzzleGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const MiniPuzzleGame: React.FC<MiniPuzzleGameProps> = ({ isOpen, onClose }) => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Initialize puzzle
  useEffect(() => {
    if (isOpen) {
      initializePuzzle();
      setStartTime(Date.now());
    }
  }, [isOpen]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && !isComplete && startTime > 0) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isComplete, startTime]);

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
    for (let i = 0; i < 100; i++) {
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-dark-800 rounded-2xl p-6 max-w-md w-full border border-dark-700"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-dark-100">Sliding Puzzle</h3>
            <button
              onClick={onClose}
              className="text-dark-400 hover:text-dark-200 text-2xl"
            >
              ×
            </button>
          </div>

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
          <div className="grid grid-cols-3 gap-2 mb-6 aspect-square">
            {tiles.map((tile, index) => (
              <motion.button
                key={index}
                className={`aspect-square rounded-lg font-bold text-lg transition-all duration-200 ${
                  tile === 0
                    ? 'bg-transparent'
                    : 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white hover:from-primary-400 hover:to-secondary-400 shadow-lg'
                }`}
                onClick={() => handleTileClick(index)}
                whileHover={tile !== 0 ? { scale: 1.05 } : {}}
                whileTap={tile !== 0 ? { scale: 0.95 } : {}}
                layout
              >
                {tile !== 0 && tile}
              </motion.button>
            ))}
          </div>

          {/* Win Message */}
          {isComplete && (
            <motion.div
              className="text-center mb-4 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30"
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

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={initializePuzzle}
              className="flex-1 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-dark-200 rounded-lg transition-colors"
            >
              New Game
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-400 hover:to-secondary-400 transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MiniPuzzleGame;
