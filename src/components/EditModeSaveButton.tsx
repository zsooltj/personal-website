'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EditModeSaveButton: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Check if edit mode is active by looking for the CSS class
    const checkEditMode = () => {
      setIsEditMode(document.body.classList.contains('edit-mode'));
    };

    checkEditMode();
    
    // Listen for edit mode changes
    const observer = new MutationObserver(checkEditMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const saveChanges = () => {
    // Simple save functionality - could be expanded
    setHasUnsavedChanges(false);
    console.log('Changes saved!');
  };

  if (!isEditMode) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-4 right-4 z-50"
      >
        <motion.button
          onClick={saveChanges}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            hasUnsavedChanges 
              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
              : 'bg-dark-700 text-dark-300 cursor-not-allowed'
          }`}
          disabled={!hasUnsavedChanges}
          whileHover={hasUnsavedChanges ? { scale: 1.05 } : {}}
          whileTap={hasUnsavedChanges ? { scale: 0.95 } : {}}
        >
          <div className="flex items-center gap-2">
            <span>💾</span>
            <span>{hasUnsavedChanges ? 'Save Changes' : 'No Changes'}</span>
          </div>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditModeSaveButton;
