import React from 'react';
import type { Project } from '../../types';
import { resolveProjectImage, truncateDescription } from '../../utils/projectUtils';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const imageUrl = resolveProjectImage(project);
  const shortDesc = truncateDescription(project.shortDescription, 150);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg dark:hover:shadow-neon-blue transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full cursor-pointer group"
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
    >
      <div className="relative h-56 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img
          src={imageUrl}
          alt={`Tangkapan layar proyek ${project.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {project.repositoryUrl && (
              <a 
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors p-1"
                aria-label={`Repositori kode sumber ${project.title}`}
              >
                <FaGithub size={20} />
              </a>
            )}
            {project.demoUrl && (
              <a 
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors p-1"
                aria-label={`Demo langsung ${project.title}`}
              >
                <FaExternalLinkAlt size={18} />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
          {shortDesc}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
