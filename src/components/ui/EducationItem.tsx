import React from 'react';
import type { Education } from '../../types';
import { formatGraduationYear } from '../../utils/experienceUtils';
import { FaGraduationCap } from 'react-icons/fa';

interface EducationItemProps {
  education: Education;
}

export const EducationItem: React.FC<EducationItemProps> = ({ education }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex-shrink-0">
          <FaGraduationCap size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {education.major}
          </h3>
          <h4 className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            {education.institution}
          </h4>
          <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
            Lulus: {formatGraduationYear(education.graduationYear)}
          </span>
        </div>
      </div>
    </div>
  );
};
