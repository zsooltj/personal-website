'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditMode } from '../contexts/EditModeContext';

const EditModeSaveButton: React.FC = () => {
  const { isEditMode, hasUnsavedChanges, saveChanges } = useEditMode();

  if (!isEditMode) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={saveChanges}
        className={`edit-mode-save-btn ${hasUnsavedChanges ? 'has-changes' : ''}`}
        disabled={!hasUnsavedChanges}
      >
        <div className="flex items-center gap-2">
          <span>💾</span>
          <span>{hasUnsavedChanges ? 'Save Changes' : 'No Changes'}</span>
        </div>
      </motion.button>
    </AnimatePresence>
  );
};

export default EditModeSaveButton;
