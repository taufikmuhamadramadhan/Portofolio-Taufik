import React from 'react';
import type { TechnicalSkill, SoftSkill } from '../../types';
import { FaCode } from 'react-icons/fa';

interface SkillBadgeProps {
  skill: TechnicalSkill | SoftSkill;
  showProficiency: boolean;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, showProficiency }) => {
  const isTechnical = 'category' in skill;

  // We could use a dynamic icon mapper here if we have one.
  // For MVP, we render a generic icon if it's a technical skill.
  // Property 12: Keahlian tanpa ikon selalu mendapat ikon generik
  const renderIcon = () => {
    if (!isTechnical) return null;
    return <FaCode className="text-blue-500" />;
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-neon-blue transition-all duration-300 group cursor-default">
      {isTechnical && (
        <div className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
          {renderIcon()}
        </div>
      )}
      
      <div className="flex flex-col">
        <span className="font-medium text-gray-900 dark:text-white">
          {skill.name}
        </span>
        
        {/* Property 11: Keahlian teknis selalu memiliki indikator proficiency */}
        {/* Property 13: Soft skills tidak pernah menampilkan indikator proficiency */}
        {isTechnical && showProficiency && (
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {(skill as TechnicalSkill).proficiency}
          </span>
        )}
      </div>
    </div>
  );
};
