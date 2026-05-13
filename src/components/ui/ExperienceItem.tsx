import React from 'react';
import type { WorkExperience } from '../../types';
import { formatEndDate } from '../../utils/experienceUtils';

interface ExperienceItemProps {
  experience: WorkExperience;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  return (
    <div className="relative pl-8 sm:pl-32 py-6 group">
      {/* Timeline marker */}
      <div className="absolute left-0 sm:left-[7.5rem] top-8 w-4 h-4 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 z-10 group-hover:scale-125 transition-transform" />
      {/* Timeline line */}
      <div className="absolute left-[0.45rem] sm:left-[7.95rem] top-12 bottom-[-1.5rem] w-0.5 bg-gray-200 dark:bg-gray-700 last:bottom-0" />
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-start">
        {/* Date column (desktop) */}
        <div className="hidden sm:block w-24 flex-shrink-0 text-right pt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          <div>{formatEndDate(experience.endDate)}</div>
          <div className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            {experience.startDate}
          </div>
        </div>

        {/* Content column */}
        <div className="flex-grow">
          {/* Date (mobile) */}
          <div className="sm:hidden text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
            {experience.startDate} — {formatEndDate(experience.endDate)}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {experience.position}
          </h3>
          <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-3">
            {experience.company}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {experience.description}
          </p>
        </div>
      </div>
    </div>
  );
};
