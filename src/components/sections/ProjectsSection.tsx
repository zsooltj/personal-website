'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProjectsSectionProps {
  content: {
    title: string;
    subtitle?: string;
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
  };
  onOpenProjectViewer?: (project: any) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ content, onOpenProjectViewer }) => (
  <div className="space-y-8">
    <div className="space-y-4">
      <h2 className="text-4xl lg:text-6xl font-bold">
        <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          {content.title}
        </span>
      </h2>
      <p className="text-xl text-primary-300">{content.subtitle}</p>
    </div>

    {/* Projects Grid - Two Column Layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {content.featured?.map((project, index) => (
        <motion.div
          key={project.id}
          className="bg-dark-800/30 backdrop-blur-sm rounded-lg overflow-hidden border border-dark-700 hover:border-primary-400/50 transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          {/* Image Container for Screenshots */}
          <div className="relative h-40 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 overflow-hidden">
            <motion.img 
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              layoutId={`project-image-${project.id}`}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent"></div>
            
            {/* Image Count Badge */}
            <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-dark-900/80 backdrop-blur-sm border border-dark-600">
              <span className="text-dark-200 text-xs font-medium">
                📸 {project.images.length}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-dark-100 mb-2 leading-tight">{project.title}</h3>
            <p className="text-dark-300 text-sm mb-4 leading-relaxed">{project.description}</p>
            
            {/* Technology Badges */}
            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-1.5 py-0.5 rounded text-xs font-medium bg-dark-700/50 text-dark-300 border border-dark-600/50"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Compact Action Button */}
            <div className="flex">
              <motion.button 
                onClick={() => onOpenProjectViewer?.(project)}
                className="w-full px-6 py-3 rounded-xl text-base font-medium hover:bg-white/10 transition-all duration-300 group border border-primary-400/30"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent group-hover:from-primary-300 group-hover:to-secondary-300">
                  ✨ View Details
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Blank Project Box - Static Gag Content */}
      <motion.div
        className="bg-dark-800/30 backdrop-blur-sm rounded-lg overflow-hidden border border-dark-700 hover:border-yellow-400/50 transition-all duration-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: (content.featured?.length || 0) * 0.1 }}
        viewport={{ once: true }}
      >
        {/* Empty Image Container */}
        <div className="relative h-40 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 overflow-hidden flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">🚧</div>
            <div className="text-dark-400 text-sm font-medium">Under Construction</div>
          </div>
          
          {/* Coming Soon Badge */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-dark-900/80 backdrop-blur-sm border border-dark-600">
            <span className="text-dark-200 text-xs font-medium">
              🔮 Soon™
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-dark-100 mb-2 leading-tight">My Next Masterpiece</h3>
          <p className="text-dark-300 text-sm mb-4 leading-relaxed">
            Currently brewing something amazing... It involves AI, probably some React, 
            and definitely way too much coffee ☕
          </p>
          
          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-dark-700/50 text-dark-300 border border-dark-600/50">
              ???
            </span>
            <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-dark-700/50 text-dark-300 border border-dark-600/50">
              Magic
            </span>
            <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-dark-700/50 text-dark-300 border border-dark-600/50">
              Coffee
            </span>
          </div>
          
          {/* Disabled Button */}
          <div className="flex">
            <motion.div 
              className="w-full px-6 py-3 rounded-xl text-base font-medium bg-dark-700/30 border border-dark-600/50 text-center cursor-not-allowed"
              whileHover={{ scale: 1.01 }}
            >
              <span className="text-dark-500">
                🔒 Coming Soon...
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default ProjectsSection;
