import React from 'react';
import type { Project } from '../../types';
import { resolveProjectImage, truncateDescription } from '../../utils/projectUtils';

interface ProjectPreviewCardProps {
  project: Project;
}

export const ProjectPreviewCard: React.FC<ProjectPreviewCardProps> = ({ project }) => {
  const imageUrl = resolveProjectImage(project);
  // Ensure we truncate strictly to 150 characters to satisfy Requirement 4.1 if used here
  const shortDesc = truncateDescription(project.shortDescription, 150);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img
          src={imageUrl}
          alt={`Pratinjau proyek ${project.title}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image';
          }}
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
          {shortDesc}
        </p>
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-medium rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
