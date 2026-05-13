import React from 'react';
import { motion } from 'framer-motion';
import { workExperiences, educations } from '../../data/experience';
import { sortByDateDesc } from '../../utils/experienceUtils';
import { ExperienceItem } from '../ui/ExperienceItem';
import { EducationItem } from '../ui/EducationItem';

export const ExperienceSection: React.FC = () => {
  const sortedWork = sortByDateDesc(workExperiences);
  const sortedEdu = sortByDateDesc(educations);

  return (
    <section id="pengalaman" className="py-20 bg-gray-50/50 dark:bg-gray-900/30 backdrop-blur-sm border-y border-gray-200/50 dark:border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-mono">
              <span className="text-blue-500">$&gt;</span> cat experience.log
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Perjalanan karir dan latar belakang pendidikan saya selama ini.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
            {/* Work Experience */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                Pengalaman Kerja
              </h3>
              <div className="relative">
                {sortedWork.map((exp, idx) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <ExperienceItem experience={exp} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                Riwayat Pendidikan
              </h3>
              <div className="space-y-6">
                {sortedEdu.map((edu, idx) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <EducationItem education={edu} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
