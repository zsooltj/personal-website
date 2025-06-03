'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CarVisualGridProps {
  isActive: boolean;
}

const CarVisualGrid: React.FC<CarVisualGridProps> = ({ isActive }) => {
  const carIcons = ['🚗', '🏁', '⚡', '🔧', '💨', '🎯'];

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-dark-100 mb-6 text-center">
        Automotive Excellence
      </h4>
      
      <div className="grid grid-cols-3 gap-4">
        {carIcons.map((icon, index) => (
          <motion.div
            key={index}
            className="aspect-square bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center text-3xl border border-primary-400/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            {icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CarVisualGrid;
