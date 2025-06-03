'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  content: {
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
  };
}

const AboutSection: React.FC<AboutSectionProps> = ({ content }) => (
  <div className="space-y-8">
    <div className="space-y-4">
      <h2 className="text-4xl lg:text-6xl font-bold">
        <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          {content.title}
        </span>
      </h2>
      <p className="text-xl text-primary-300">{content.subtitle}</p>
      <p className="text-lg text-dark-300 leading-relaxed">{content.description}</p>
    </div>

    {/* Skills Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {content.skills?.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="bg-dark-800/30 backdrop-blur-sm rounded-lg p-4 border border-dark-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{skill.icon}</span>
            <h3 className="text-lg font-semibold text-dark-100">{skill.name}</h3>
          </div>
          <div className="w-full bg-dark-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              viewport={{ once: true }}
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-dark-400">{skill.level}%</span>
            {skill.level > 100 && (
              <span className="text-xs text-dark-500">(just kidding)</span>
            )}
          </div>
        </motion.div>
      ))}
    </div>

    {/* Experience */}
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-dark-100">Experience</h3>
      {content.experience?.map((exp, index) => (
        <motion.div
          key={index}
          className="bg-dark-800/20 rounded-lg p-4 border-l-4 border-primary-400"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-semibold text-dark-100">{exp.role}</h4>
            <span className="text-sm text-primary-400">{exp.period}</span>
          </div>
          <p className="text-primary-300 font-medium mb-1">{exp.company}</p>
          <p className="text-dark-300">{exp.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default AboutSection;
