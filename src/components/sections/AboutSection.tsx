import React from 'react';
import { motion } from 'framer-motion';
import { owner } from '../../data/owner';
import { technicalSkills } from '../../data/skills';
import { CVDownloadButton } from '../ui/CVDownloadButton';
import { SkillBadge } from '../ui/SkillBadge';

export const AboutSection: React.FC = () => {
  // Ambil 3 skill utama untuk highlight
  const topSkills = technicalSkills.slice(0, 3);

  return (
    <section id="tentang" className="py-20 bg-gray-50/50 dark:bg-gray-900/30 backdrop-blur-sm border-y border-gray-200/50 dark:border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Tentang Saya
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            {/* Biography */}
            <div className="md:col-span-7 lg:col-span-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Latar Belakang
              </h3>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                <p>
                  Saya adalah seorang pengembang perangkat lunak yang berfokus pada ekosistem web modern. 
                  Dengan pengalaman dalam membangun aplikasi yang responsif, terukur, dan berpusat pada 
                  pengguna, saya selalu antusias memecahkan masalah yang kompleks menjadi solusi teknis yang elegan.
                </p>
                <p>
                  Pendekatan saya dalam pengembangan selalu mengutamakan praktik terbaik, kebersihan kode, 
                  dan arsitektur yang berkelanjutan. Saya percaya bahwa pengalaman pengguna yang baik dimulai 
                  dari performa yang solid dan aksesibilitas yang inklusif.
                </p>
              </div>
              
              <div className="mt-8">
                <CVDownloadButton cvUrl={owner.cvUrl} fileName={`CV_${owner.fullName.replace(/\s+/g, '_')}.pdf`} />
              </div>
            </div>
            
            {/* Highlights */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
              {/* Terminal Mockup */}
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl dark:hover:shadow-neon-blue transition-shadow duration-300 border border-gray-700">
                <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-xs text-gray-400 font-mono">taufik@server:~</div>
                </div>
                <div className="p-4 font-mono text-sm sm:text-xs md:text-sm">
                  <div className="text-green-400">$&gt; cat profile.json</div>
                  <div className="text-gray-300 mt-2">
                    {'{'} <br/>
                    &nbsp;&nbsp;"name": "Taufik M. R.",<br/>
                    &nbsp;&nbsp;"role": "Backend Dev",<br/>
                    &nbsp;&nbsp;"location": "Bandung, ID",<br/>
                    &nbsp;&nbsp;"status": "Active"<br/>
                    {'}'}
                  </div>
                  <div className="text-green-400 mt-2 animate-pulse">_</div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md dark:hover:shadow-neon-blue transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Keahlian Utama
                </h3>
                <div className="space-y-4">
                  {topSkills.map((skill) => (
                    <SkillBadge key={skill.id} skill={skill} showProficiency={true} />
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <a href="#keahlian" className="text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm flex items-center justify-center">
                    Lihat Seluruh Keahlian &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
