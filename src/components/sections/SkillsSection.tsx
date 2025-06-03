'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SkillsSectionProps {
  content: {
    title: string;
    subtitle?: string;
    categories?: Array<{
      name: string;
      icon: string;
      skills: Array<{
        name: string;
        level: number;
      }>;
    }>;
  };
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ content }) => (
  <div className="space-y-8">
    <div className="space-y-3">
      <h2 className="text-4xl lg:text-6xl font-bold">
        <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          {content.title}
        </span>
      </h2>
      <p className="text-xl text-primary-300">{content.subtitle}</p>
    </div>

    {/* Skills Categories */}
    <div className="space-y-8">
      {content.categories?.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-lg flex items-center justify-center border border-primary-400/30">
              <span className="text-2xl">{category.icon}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-dark-100">{category.name}</h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full mt-1"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skill.name}
                className="bg-dark-800/20 backdrop-blur-sm rounded-lg p-4 border border-dark-700/50 hover:border-primary-400/30 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-base font-semibold text-dark-100">{skill.name}</h4>
                    <span className="text-lg font-bold text-primary-400">{skill.level}%</span>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2 rounded-full relative overflow-hidden"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      skill.level >= 90 ? 'bg-green-400' :
                      skill.level >= 80 ? 'bg-yellow-400' :
                      skill.level >= 70 ? 'bg-orange-400' : 'bg-red-400'
                    }`}></div>
                    <span className="text-xs text-dark-400">
                      {skill.level >= 90 ? 'Expert' :
                       skill.level >= 80 ? 'Advanced' :
                       skill.level >= 70 ? 'Intermediate' : 'Beginner'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default SkillsSection;
