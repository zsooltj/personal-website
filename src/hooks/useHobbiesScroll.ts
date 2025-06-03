'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

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
  
  // Use refs to track previous values and avoid unnecessary state updates
  const prevValuesRef = useRef({
    currentChapter: 0,
    storyProgress: 0,
    sectionOpacity: 0.6,
    puzzleTilesActive: false
  });

  const handleScroll = useCallback(() => {
    const hobbiesSection = document.getElementById('hobbies');
    if (!hobbiesSection) return;

    const rect = hobbiesSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;
    
    // Calculate scroll progress through the section (0 to 1)
    const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight)));
    
    // Calculate section opacity based on how much it has entered the viewport
    const activationDistance = -200;
    const sectionActivationProgress = Math.max(0, Math.min(1, (windowHeight - rect.top - activationDistance) / (windowHeight - activationDistance)));
    const newSectionOpacity = 0.6 + (sectionActivationProgress * 0.4);
    
    // Update current chapter based on scroll progress
    const chapterActivationOffset = 400;
    let newCurrentChapter = 0;
    const chapterIds = ['cars', 'music', 'puzzles'];
    
    chapterIds.forEach((chapterId, index) => {
      const chapterElement = document.querySelector(`[data-chapter="${chapterId}"]`);
      if (chapterElement) {
        const chapterRect = chapterElement.getBoundingClientRect();
        if (chapterRect.top <= chapterActivationOffset) {
          newCurrentChapter = index;
        }
      }
    });
    
    // Check if we're in the hobbies section
    const isInHobbiesSection = rect.bottom > 0 && rect.top < windowHeight;
    const isPuzzlesChapter = isInHobbiesSection && newCurrentChapter === 2 && progress <= 0.8;
    
    // Only update state if values have actually changed (with small tolerance for floating point)
    const prevValues = prevValuesRef.current;
    const progressChanged = Math.abs(progress - prevValues.storyProgress) > 0.01;
    const opacityChanged = Math.abs(newSectionOpacity - prevValues.sectionOpacity) > 0.01;
    const chapterChanged = newCurrentChapter !== prevValues.currentChapter;
    const puzzleStateChanged = isPuzzlesChapter !== prevValues.puzzleTilesActive;
    
    if (progressChanged) {
      setStoryProgress(progress);
      prevValuesRef.current.storyProgress = progress;
    }
    
    if (opacityChanged) {
      setSectionOpacity(newSectionOpacity);
      prevValuesRef.current.sectionOpacity = newSectionOpacity;
    }
    
    if (chapterChanged) {
      setCurrentChapter(newCurrentChapter);
      prevValuesRef.current.currentChapter = newCurrentChapter;
    }
    
    if (puzzleStateChanged) {
      setPuzzleTilesActive(isPuzzlesChapter);
      prevValuesRef.current.puzzleTilesActive = isPuzzlesChapter;
      
      const event = new CustomEvent('puzzleTilesToggle', { 
        detail: { showTiles: isPuzzlesChapter } 
      });
      window.dispatchEvent(event);
    }
  }, [chaptersLength]);

  // Throttled scroll handler to reduce frequency
  const throttledScrollHandler = useCallback(() => {
    let ticking = false;
    
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
  }, [handleScroll])();

  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [throttledScrollHandler]);

  return {
    currentChapter,
    storyProgress,
    sectionOpacity,
    puzzleTilesActive
  };
};
