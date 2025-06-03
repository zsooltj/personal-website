'use client';

import React, { useState, useRef } from 'react';
import Hero from '@/components/Hero';
import DynamicSection from '@/components/DynamicSection';
import ThreeJSCube from '@/components/ThreeJSCube';
import AnimatedBackground from '@/components/AnimatedBackground';
import TopNavigation from '@/components/TopNavigation';
import ProjectViewer, { ProjectViewerRef } from '@/components/ProjectViewer';
import AIAssistant from '@/components/AIAssistant';

export default function Home() {
  const [showCube, setShowCube] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(false);
  const projectViewerRef = useRef<ProjectViewerRef>(null);
  
  // Check if device is mobile (max-width: 550px)
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 550);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Project viewer state
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isProjectViewerOpen, setIsProjectViewerOpen] = useState(false);
  
  const openProjectViewer = (project: any) => {
    setSelectedProject(project);
    setIsProjectViewerOpen(true);
  };
  
  const closeProjectViewer = () => {
    setIsProjectViewerOpen(false);
    setSelectedProject(null);
  };
  
  // Scroll detection to close project viewer when leaving projects section
  React.useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      setShowCube(true)
      // Find the section that's most visible in the viewport
      let currentSectionId = 'hero';
      let maxVisibility = 0;
      
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;
          const elementBottom = rect.bottom;
          const elementHeight = rect.height;
          
          // Calculate how much of the element is visible
          const visibleTop = Math.max(0, Math.min(elementBottom, windowHeight) - Math.max(elementTop, 0));
          const visibilityRatio = visibleTop / elementHeight;
          
          // Also consider if the element is near the center of the viewport
          const centerDistance = Math.abs((elementTop + elementBottom) / 2 - windowHeight / 2);
          const centerWeight = Math.max(0, 1 - centerDistance / windowHeight);
          
          const totalScore = visibilityRatio * 0.7 + centerWeight * 0.3;
          
          if (totalScore > maxVisibility) {
            maxVisibility = totalScore;
            currentSectionId = section.id;
          }
        }
      });
      
      setCurrentSection(currentSectionId);
      
      // Close project viewer if we're not in the projects section and it's open
      if (currentSectionId !== 'projects' && isProjectViewerOpen) {
        // Trigger animated close
        if (projectViewerRef.current) {
          projectViewerRef.current.handleClose();
        }
      }
    };

    // Initial call
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProjectViewerOpen]);
  
  const sections = [
    { id: 'hero', name: 'Welcome' },
    { id: 'about', name: 'About' },
    { id: 'projects', name: 'Projects' },
    { id: 'skills', name: 'Skills' },
    { id: 'hobbies', name: 'Hobbies' },
    { id: 'contact', name: 'Contact' }
  ];

  return (
    <div className="relative min-h-screen bg-dark-900 text-dark-50 overflow-x-hidden">
      <AnimatedBackground />
      {!isMobile && <ThreeJSCube sections={sections} showCube={showCube} />}
      <TopNavigation />
      
      <main className="relative z-10">
        <Hero onCubeStart={() => setShowCube(true)} />
        
        {/* Dynamic sections that position based on cube location */}
        <div className="space-y-16">
          <DynamicSection id="about" cubePosition="left" isProjectViewerOpen={isProjectViewerOpen} />
          <DynamicSection 
            id="projects" 
            cubePosition="right" 
            isProjectViewerOpen={isProjectViewerOpen}
            onOpenProjectViewer={openProjectViewer}
          />
          <DynamicSection id="skills" cubePosition="left" isProjectViewerOpen={isProjectViewerOpen} />
          <DynamicSection id="hobbies" cubePosition="left" isProjectViewerOpen={isProjectViewerOpen} />
          <DynamicSection id="contact" cubePosition="right" isProjectViewerOpen={isProjectViewerOpen} />
        </div>
      </main>
      
      {/* Project Viewer Modal */}
      {selectedProject && (
        <ProjectViewer
          ref={projectViewerRef}
          project={selectedProject}
          isOpen={isProjectViewerOpen}
          onClose={closeProjectViewer}
        />
      )}
      
      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}
