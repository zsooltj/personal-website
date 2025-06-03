'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  challenges: string[];
  detailedDescription: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

interface ProjectViewerProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export interface ProjectViewerRef {
  handleClose: () => void;
}

const ProjectViewer = React.forwardRef<ProjectViewerRef, ProjectViewerProps>(({ project, isOpen, onClose }, ref) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [currentProject, setCurrentProject] = useState(project);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile for animation optimization
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle animated close
  const handleClose = () => {
    setIsClosing(true);
    // Wait for exit animation to complete before calling onClose
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 400); // Match the exit animation duration
  };
  
  // Handle project changes with animation
  React.useEffect(() => {
    if (project.id !== currentProject.id) {
      // Animate out current content
      setIsContentVisible(false);
      
      // After animation, update project and animate in
      setTimeout(() => {
        setCurrentProject(project);
        setCurrentImageIndex(0); // Reset image index for new project
        setIsContentVisible(true);
      }, 300);
    }
  }, [project.id, currentProject.id]);
  
  // Reset closing state when opening
  React.useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);
  
  // Expose handleClose method via ref
  React.useImperativeHandle(ref, () => ({
    handleClose
  }));

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentProject.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentProject.images.length) % currentProject.images.length);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const panelVariants = {
    hidden: { 
      x: '100%',
      opacity: 0,
      scale: isMobile ? 1 : 0.8
    },
    visible: { 
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: isMobile ? "tween" : "spring",
        damping: isMobile ? undefined : 25,
        stiffness: isMobile ? undefined : 200,
        duration: isMobile ? 0.3 : 0.6,
        ease: isMobile ? "easeOut" : undefined
      }
    },
    exit: { 
      x: '100%',
      opacity: 0,
      scale: isMobile ? 1 : 0.8,
      transition: {
        duration: isMobile ? 0.2 : 0.4,
        ease: "easeInOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: isMobile ? 0.1 : 0.3,
        duration: isMobile ? 0.3 : 0.5,
        staggerChildren: isMobile ? 0.05 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: isMobile ? 0.2 : 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {(isOpen || isClosing) && (
        <motion.div
          className="fixed right-0 top-[55px] h-[calc(100vh-55px)] w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] bg-gradient-to-br from-dark-900/98 via-dark-800/95 to-dark-900/98 backdrop-blur-2xl z-50 overflow-y-auto"
          variants={panelVariants}
          initial="hidden"
          animate={isClosing ? "exit" : "visible"}
          exit="exit"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-dark-900/95 to-dark-800/95 backdrop-blur-xl p-3 z-10">
            <div className="flex items-center justify-between">
              <motion.h2 
                className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {currentProject.title}
              </motion.h2>
              <motion.button
                onClick={handleClose}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-dark-800/80 to-dark-700/80 hover:from-primary-400/20 hover:to-secondary-400/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-dark-300 group-hover:text-primary-400 text-xl transition-colors duration-300">×</span>
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <motion.div 
            className="p-3 pb-6 space-y-4"
            variants={contentVariants}
            initial="hidden"
            animate={isContentVisible ? "visible" : "hidden"}
          >
            {/* Image Gallery */}
            <motion.div variants={itemVariants} className="space-y-3">
            
              
              <motion.div 
                className="relative"
                whileHover={{ height: isMobile ? 'auto' : 'calc(100% + 200px)' }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div 
                  className="relative h-40 sm:h-48 lg:h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-400/10 via-secondary-400/5 to-primary-400/10 cursor-pointer"
                  layoutId={`project-image-${currentProject.id}`}
                  whileHover={{ height: isMobile ? 'auto' : '400px' }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={currentProject.images[currentImageIndex]}
                        alt={`${currentProject.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                        initial={{ opacity: 0, scale: isMobile ? 1 : 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: isMobile ? 1 : 0.9 }}
                        whileHover={{ scale: isMobile ? 1 : 1.05 }}
                        transition={{ duration: isMobile ? 0.2 : 0.5 }}
                      />
                    </AnimatePresence>
                    
                  {/* Navigation Arrows - Only show if more than one image */}
                  {currentProject.images.length > 1 && (
                    <>
                      <motion.button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-dark-900/90 to-dark-800/90 backdrop-blur-xl flex items-center justify-center transition-all duration-300 group"
                        whileHover={isMobile ? {} : { scale: 1.1, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-dark-200 group-hover:text-primary-400 text-lg sm:text-xl transition-colors duration-300">←</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-dark-900/90 to-dark-800/90 backdrop-blur-xl flex items-center justify-center transition-all duration-300 group"
                        whileHover={isMobile ? {} : { scale: 1.1, x: 2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-dark-200 group-hover:text-primary-400 text-lg sm:text-xl transition-colors duration-300">→</span>
                      </motion.button>
                    </>
                  )}
                    
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl bg-gradient-to-r from-dark-900/90 to-dark-800/90 backdrop-blur-xl">
                    <span className="text-dark-200 text-sm font-medium">
                      {currentImageIndex + 1} / {currentProject.images.length}
                    </span>
                  </div>
                </motion.div>
                  
                {/* Thumbnail Navigation - Only show if more than one image */}
                {currentProject.images.length > 1 && (
                  <div className="flex gap-2 mt-4 justify-center">
                    {currentProject.images.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-12 h-9 rounded-xl overflow-hidden transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'ring-2 ring-primary-400 scale-110' 
                            : 'ring-1 ring-dark-600/50 hover:ring-primary-400/50'
                        }`}
                        whileHover={isMobile ? {} : { scale: index === currentImageIndex ? 1.1 : 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Detailed Description */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent flex items-center gap-2">
                <span className="text-primary-400">📋</span>
                Project Overview
              </h3>
              <div className="bg-gradient-to-br from-dark-800/40 via-dark-700/30 to-dark-800/40 backdrop-blur-xl rounded-2xl p-3">
                <p className="text-dark-300 leading-relaxed">
                  {currentProject.detailedDescription}
                </p>
              </div>
            </motion.div>

            {/* Main Challenges */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent flex items-center gap-2">
                <span className="text-primary-400">⚡</span>
                Key Challenges
              </h3>
              <div className="space-y-2">
                {currentProject.challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-r from-primary-400/10 via-transparent to-secondary-400/10 backdrop-blur-xl rounded-xl p-3 relative overflow-hidden"
                    initial={{ opacity: 0, x: isMobile ? -10 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: isMobile ? 0.3 + index * 0.05 : 0.6 + index * 0.1 }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-secondary-400 rounded-full" />
                    <p className="text-dark-300 ml-3 text-sm">{challenge}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technologies */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent flex items-center gap-2">
                <span className="text-primary-400">🛠️</span>
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-1.5 py-0.5 rounded text-xs font-medium text-dark-300 border border-dark-600/50"
                    initial={{ opacity: 0, scale: isMobile ? 0.95 : 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: isMobile ? 0.4 + index * 0.02 : 0.7 + index * 0.05 }}
                    whileHover={isMobile ? {} : { scale: 1.05, y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Action Button */}
            <motion.div variants={itemVariants} className="pt-3 pb-3">
              <motion.a
                href={currentProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium text-center hover:shadow-2xl transition-all duration-300 relative overflow-hidden group text-sm block"
                whileHover={isMobile ? {} : { scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10">🚀 Visit Live Site</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ProjectViewer.displayName = 'ProjectViewer';

export default ProjectViewer;
