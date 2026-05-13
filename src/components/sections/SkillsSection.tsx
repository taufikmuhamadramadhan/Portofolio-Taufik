import React from 'react';
import { motion } from 'framer-motion';
import { technicalSkills, softSkills } from '../../data/skills';
import { SkillBadge } from '../ui/SkillBadge';
import type { SkillCategory, TechnicalSkill } from '../../types';

export const SkillsSection: React.FC = () => {
  // Kelompokkan keahlian teknis berdasarkan kategori
  const groupedTechnical = technicalSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, TechnicalSkill[]>);

  // Kategori yang ada (untuk menjaga urutan: Bahasa Pemrograman, Framework, Alat)
  const categories: SkillCategory[] = ['Bahasa Pemrograman', 'Framework', 'Alat'];

  return (
    <section id="keahlian" className="py-20 bg-white dark:bg-gray-900 bg-grid-pattern relative overflow-hidden">
      {/* Decorative watermark */}
      <div className="absolute right-0 top-1/4 opacity-5 dark:opacity-10 pointer-events-none select-none font-mono text-[20rem] font-bold text-blue-500 leading-none">
        {'}'}
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-mono">
              <span className="text-blue-500">$&gt;</span> npm run build-skills
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Alat, bahasa, dan teknologi yang saya gunakan setiap hari.
            </p>
          </div>
          
          <div className="space-y-12">
            {categories.map((category) => {
              const skills = groupedTechnical[category];
              if (!skills || skills.length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-4">
                    <span>{category}</span>
                    <span className="h-px bg-gray-200 dark:bg-gray-700 flex-grow" />
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {skills.map((skill) => (
                      <SkillBadge key={skill.id} skill={skill} showProficiency={true} />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Soft Skills */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-4">
                <span>Keahlian Lunak (Soft Skills)</span>
                <span className="h-px bg-gray-200 dark:bg-gray-700 flex-grow" />
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {softSkills.map((skill) => (
                  <SkillBadge key={skill.id} skill={skill} showProficiency={false} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
