import React from 'react';
import { motion } from 'framer-motion';
import { owner } from '../../data/owner';
import { projects } from '../../data/projects';
import { getProjectPreviews } from '../../utils/projectUtils';
import { ProjectPreviewCard } from '../ui/ProjectPreviewCard';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

import { TypeAnimation } from 'react-type-animation';

export const HeroSection: React.FC = () => {
  const recentProjects = getProjectPreviews(projects);

  return (
    <section id="beranda" className="min-h-screen pt-24 pb-16 flex flex-col justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Identity Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-8 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl dark:shadow-neon-blue transition-shadow duration-300">
              <img
                src={owner.profileImageUrl}
                alt={`Foto profil ${owner.fullName}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/400x400?text=Profile';
                }}
              />
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
              Halo, saya <span className="text-blue-600 dark:text-blue-400">{owner.fullName}</span>
            </h1>

            <div className="h-[100px] mb-16">
              <TypeAnimation
                sequence={[
                  owner.tagline,
                  1000,
                ]}
                wrapper="p"
                speed={60}
                repeat={0}
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed font-mono"
              />
            </div>

            <div className="flex gap-4">
              <a
                href={owner.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                aria-label="Profil LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href={owner.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                aria-label="Profil GitHub"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </motion.div>

          {/* Project Previews Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Proyek Terbaru</h2>
              <a href="#proyek" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Lihat Semua &rarr;
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recentProjects.slice(0, 4).map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                >
                  <ProjectPreviewCard project={project} />
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
