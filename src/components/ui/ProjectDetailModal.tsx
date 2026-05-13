import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../../types';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { resolveProjectImage } from '../../utils/projectUtils';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const imageUrl = resolveProjectImage(project);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header / Image */}
            <div className="relative h-64 sm:h-80 w-full flex-shrink-0 bg-gray-200 dark:bg-gray-700">
              <img
                src={imageUrl}
                alt={`Pratinjau proyek ${project.title}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/1200x600?text=No+Image';
                }}
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Tutup modal"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Content Scrollable Area */}
            <div className="overflow-y-auto p-6 sm:p-8 flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <h2 id="modal-title" className="text-3xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h2>
                
                <div className="flex flex-wrap gap-3 flex-shrink-0">
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <FaGithub /> Repo
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <FaExternalLinkAlt /> Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Deskripsi Proyek</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Peran & Kontribusi</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{project.role}</p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                      {project.contributions.map((contribution, idx) => (
                        <li key={idx}>{contribution}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Teknologi</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {project.challenges && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tantangan</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed border-l-4 border-blue-500 pl-4 py-1 italic bg-blue-50 dark:bg-gray-700/30 rounded-r-lg">
                          {project.challenges}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
