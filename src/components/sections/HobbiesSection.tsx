'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHobbiesScroll } from '../../hooks/useHobbiesScroll';
import EmbeddedPuzzleGame from '../EmbeddedPuzzleGame';
import CarVisualGrid from '../hobbies/CarVisualGrid';
import MusicVisualizer from '../hobbies/MusicVisualizer';
import MiniPuzzleGame from '../MiniPuzzleGame';

interface HobbiesSectionProps {
  content: {
    title: string;
    stories?: Array<{
      title: string;
      content: string;
      icon: string;
      funFact: string;
    }>;
    interactiveStory?: {
      introduction: string;
      chapters: Array<{
        id: string;
        title: string;
        narrative: string;
        choices: Array<{
          text: string;
          action: string;
          emoji: string;
        }>;
      }>;
    };
  };
}

const HobbiesSection: React.FC<HobbiesSectionProps> = ({ content }) => {
  const [showPuzzleGame, setShowPuzzleGame] = useState(false);
  const [playingSound, setPlayingSound] = useState<string | null>(null);

  // Use the custom hook for scroll logic
  const { currentChapter, storyProgress, sectionOpacity } = useHobbiesScroll(
    content.interactiveStory?.chapters.length || 0
  );

  if (!content.stories || !content.interactiveStory) return null;

  return (
    <>
    <div className="py-10 pt-20">
          <motion.h2 
            className="text-4xl lg:text-6xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              {content.title}
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-primary-300 max-w-5xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {content.interactiveStory.introduction}
          </motion.p>

          {/* Story Progress Indicator */}
          
        </div>
    <motion.div 
      className="relative overflow-hidden"
      animate={{ opacity: sectionOpacity }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Cube remains visible on the left - content positioned to the right */}
      <div className="ml-auto max-w-4xl pr-8 lg:pr-16">
        
        {/* Interactive Story Introduction */}
        

        {/* Interactive Story Chapters */}
        <div className="space-y-16">
          {content.interactiveStory.chapters.map((chapter, chapterIndex) => {
            const story = content.stories?.[chapterIndex];
            const isActive = chapterIndex <= currentChapter;
            const isCurrentChapter = chapterIndex === currentChapter;
            
            return (
              <motion.div
                key={chapter.id}
                className="relative"
                data-chapter={chapter.id}
                initial={{ opacity: 0, y: 100 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 50 }}
                transition={{ duration: 1, delay: chapterIndex * 0.2 }}
              >
                {/* Chapter Card */}
                <div className={`bg-dark-800/60 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 relative overflow-hidden ${
                  isCurrentChapter 
                    ? 'border-primary-400/50 shadow-2xl shadow-primary-400/20' 
                    : 'border-dark-700/50'
                }`}>
                  
                  {/* Animated Background Particles */}
                  {isCurrentChapter && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
                          animate={{
                            x: [0, Math.random() * 400, 0],
                            y: [0, Math.random() * 300, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                          }}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Story Content */}
                    <div className="space-y-6">
                      <div className="text-8xl text-center lg:text-left">
                        {story?.icon}
                      </div>
                      
                      <h3 className="text-4xl font-bold">
                        <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                          {chapter.title}
                        </span>
                      </h3>
                      
                      <p className="text-dark-300 leading-relaxed text-lg">
                        {chapter.narrative}
                      </p>
                      
                      <motion.div 
                        className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl p-4 border border-primary-400/30"
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-primary-300 font-medium">
                          💡 {story?.funFact}
                        </p>
                      </motion.div>
                    </div>

                    {/* Visual Elements */}
                    <div className="space-y-4">
                      {/* Cars Section Visual */}
                      {chapter.id === 'cars' && (
                        <CarVisualGrid isActive={isActive} />
                      )}
                      
                      {/* Music Section Visual */}
                      {chapter.id === 'music' && (
                        <MusicVisualizer isActive={isActive} />
                      )}
                      
                      {/* Puzzles Section - Embedded Game */}
                      {chapter.id === 'puzzles' && (
                        <EmbeddedPuzzleGame isActive={isActive} />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Story Completion */}
        {storyProgress > 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl p-8 border border-primary-400/30">
              <h3 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  The Story Continues...
                </span>
              </h3>
              <p className="text-dark-300 text-lg">
                These hobbies aren't just pastimes - they're the foundation of my development philosophy. 
                Precision, creativity, and systematic thinking drive every project I build.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modals and Interactive Elements */}
      <MiniPuzzleGame 
        isOpen={showPuzzleGame} 
        onClose={() => setShowPuzzleGame(false)} 
      />

      {/* Sound Effect Indicators */}
      {playingSound && (
        <motion.div
          className="fixed top-4 right-4 z-50 bg-dark-800/90 backdrop-blur-sm rounded-lg p-4 border border-dark-700"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-3 h-3 bg-primary-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-dark-200 font-medium">
              {playingSound === 'engine' && '🔊 Engine Sound'}
              {playingSound === 'electronic' && '🎵 Electronic Beats'}
              {playingSound === 'orchestral' && '🎻 Orchestral Symphony'}
              {playingSound === 'visualizer' && '📊 Audio Visualizer'}
            </span>
          </div>
          
          {playingSound === 'visualizer' && (
            <div className="flex items-center gap-1 mt-2">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-primary-400 to-secondary-400 rounded-full"
                  animate={{
                    height: [4, Math.random() * 20 + 10, 4]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
    </>
  );
};

export default HobbiesSection;
