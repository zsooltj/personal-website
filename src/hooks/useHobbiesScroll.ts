'use client';

import { useState, useEffect } from 'react';

interface UseHobbiesScrollReturn {
  currentChapter: number;
  storyProgress: number;
  sectionOpacity: number;
  puzzleTilesActive: boolean;
}

export const useHobbiesScroll = (chaptersLength: number): UseHobbiesScrollReturn => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [sectionOpacity, setSectionOpacity] = useState(0.6);
  const [puzzleTilesActive, setPuzzleTilesActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hobbiesSection = document.getElementById('hobbies');
      if (hobbiesSection) {
        const rect = hobbiesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // Calculate scroll progress through the section (0 to 1)
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight)));
        setStoryProgress(progress);
        
        // Calculate section opacity based on how much it has entered the viewport
        // Section becomes fully opaque when it's 200px away from the top
        const activationDistance = -200; // Distance from top when section becomes fully opaque
        const sectionActivationProgress = Math.max(0, Math.min(1, (windowHeight - rect.top - activationDistance) / (windowHeight - activationDistance)));
        const newSectionOpacity = 0.6 + (sectionActivationProgress * 0.4); // From 0.6 to 1.0
        setSectionOpacity(newSectionOpacity);
        
        // Update current chapter based on scroll progress - activate when chapter reaches top + 400px (middle of screen)
        const chapterActivationOffset = 400; // Activate when chapter is 400px from top
        
        // Calculate which chapter should be active based on individual chapter positions
        let newCurrentChapter = 0;
        const chapterIds = ['cars', 'music', 'puzzles']; // Define the chapter IDs
        chapterIds.forEach((chapterId, index) => {
          const chapterElement = document.querySelector(`[data-chapter="${chapterId}"]`);
          if (chapterElement) {
            const chapterRect = chapterElement.getBoundingClientRect();
            // Chapter becomes active when it reaches top + 400px
            if (chapterRect.top <= chapterActivationOffset) {
              newCurrentChapter = index;
            }
          }
        });
        
        // Check if we're in the hobbies section
        const isInHobbiesSection = rect.bottom > 0 && rect.top < windowHeight;
        
        // Puzzle tiles should only show when we're in hobbies section AND specifically in puzzles chapter
        // More strict detection to ensure tiles disappear when leaving in any direction
        // Also fade out when "Story Continues" section appears (storyProgress > 0.8)
        const isPuzzlesChapter = isInHobbiesSection && newCurrentChapter === 2 && progress <= 0.8;
        
        // Always trigger event when puzzle state changes, regardless of previous state
        // This ensures bidirectional scrolling works properly
        if (isPuzzlesChapter !== puzzleTilesActive) {
          setPuzzleTilesActive(isPuzzlesChapter);
          const event = new CustomEvent('puzzleTilesToggle', { 
            detail: { showTiles: isPuzzlesChapter } 
          });
          window.dispatchEvent(event);
        }
        
        setCurrentChapter(newCurrentChapter);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chaptersLength, puzzleTilesActive]);

  return {
    currentChapter,
    storyProgress,
    sectionOpacity,
    puzzleTilesActive
  };
};
