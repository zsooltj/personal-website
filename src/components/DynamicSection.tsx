'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioContent } from '../data/content';
import { useContactForm } from '../hooks/useContactForm';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import HobbiesSection from './sections/HobbiesSection';
import ContactSection from './sections/ContactSection';

interface DynamicSectionProps {
  id: string;
  cubePosition?: 'left' | 'right' | 'center';
  isProjectViewerOpen?: boolean;
  onOpenProjectViewer?: (project: any) => void;
}

type ContentType = {
  title: string;
  subtitle?: string;
  description?: string;
  skills?: Array<{
    name: string;
    level: number;
    icon: string;
  }>;
  experience?: Array<{
    company: string;
    role: string;
    period: string;
    description: string;
  }>;
  featured?: Array<{
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
  }>;
  categories?: Array<{
    name: string;
    icon: string;
    skills: Array<{
      name: string;
      level: number;
    }>;
  }>;
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
  rubikFacts?: string[];
  email?: string;
  phone?: string;
  location?: string;
  social?: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
  availability?: string;
  responseTime?: string;
};

const DynamicSection: React.FC<DynamicSectionProps> = ({ 
  id, 
  cubePosition = 'center', 
  isProjectViewerOpen = false,
  onOpenProjectViewer
}) => {
  const content = portfolioContent[id as keyof typeof portfolioContent] as ContentType;
  
  // Always call the hook but only use it for contact section
  const contactForm = useContactForm();
  
  if (!content) return null;

  // Determine content positioning based on cube position
  const getContentAlignment = () => {
    switch (cubePosition) {
      case 'left':
        return 'justify-end'; // Content on right when cube is left
      case 'right':
        return 'justify-start'; // Content on left when cube is right
      case 'center':
      default:
        return 'justify-center'; // Content centered when cube is center
    }
  };

  const getContentWidth = () => {
    return cubePosition === 'center' ? 'max-w-4xl' : 'max-w-2xl lg:max-w-3xl';
  };

  const renderContent = () => {
    switch (id) {
      case 'about':
        return <AboutSection content={content} />;
      case 'projects':
        return <ProjectsSection content={content} onOpenProjectViewer={onOpenProjectViewer} />;
      case 'skills':
        return <SkillsSection content={content} />;
      case 'hobbies':
        return <HobbiesSection content={content} />;
      case 'contact':
        return <ContactSection content={content} contactForm={contactForm} />;
      default:
        return null;
    }
  };

  // Special layout for hobbies section
  if (id === 'hobbies') {
    return (
      <motion.section 
        id={id} 
        className="relative z-20 overflow-hidden"
        animate={{
          x: isProjectViewerOpen ? (typeof window !== 'undefined' && window.innerWidth < 768 ? '-5rem' : '-10rem') : '0rem'
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {renderContent()}
      </motion.section>
    );
  }

  return (
    <motion.section 
      id={id} 
      className={`min-h-screen flex items-center ${getContentAlignment()} px-8 lg:px-16 relative z-20 overflow-hidden`}
      animate={{
        x: isProjectViewerOpen ? (typeof window !== 'undefined' && window.innerWidth < 768 ? '-5rem' : '-10rem') : '0rem'
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div 
        className={`${getContentWidth()} w-full`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        animate={{
          scale: isProjectViewerOpen ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 0.95 : 0.9) : 1,
          opacity: isProjectViewerOpen ? 0.7 : 1
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {renderContent()}
      </motion.div>
    </motion.section>
  );
};

export default DynamicSection;
