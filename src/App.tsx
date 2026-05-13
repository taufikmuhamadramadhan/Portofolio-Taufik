import React, { useMemo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ContactSection } from './components/sections/ContactSection';
import { useActiveSection } from './hooks/useActiveSection';
import { useThemeContext } from './context/ThemeContext';
import type { NavSection } from './types';

import { FaJava } from 'react-icons/fa';
import { SiSpringboot, SiPostgresql, SiPhp } from 'react-icons/si';
import { motion } from 'framer-motion';

// Wrapper for the navbar to consume theme context
const NavbarWithTheme: React.FC<{ sections: NavSection[] }> = ({ sections }) => {
  const activeSection = useActiveSection(sections.map(s => s.id));
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Navbar
      sections={sections}
      activeSection={activeSection}
      themeToggleSlot={<ThemeToggle currentTheme={theme} onToggle={toggleTheme} />}
    />
  );
};

const BackgroundEffects = () => {
  const floatingAnimation = (delay: number) => ({
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut" as const
    }
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-grid-pattern">
      {/* Animated Glowing Blobs */}
      <div className="absolute top-[10%] -left-10 w-[30rem] h-[30rem] bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-10 animate-blob"></div>
      <div className="absolute top-[20%] -right-10 w-[30rem] h-[30rem] bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[30rem] h-[30rem] bg-indigo-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>

      {/* Floating Background Icons */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 flex items-center justify-center">
        <motion.div animate={floatingAnimation(0)} className="absolute top-1/4 left-1/4 text-blue-600 dark:text-blue-400">
          <FaJava size={120} />
        </motion.div>
        <motion.div animate={floatingAnimation(1)} className="absolute bottom-1/4 right-1/4 text-green-600 dark:text-green-400">
          <SiSpringboot size={100} />
        </motion.div>
        <motion.div animate={floatingAnimation(2)} className="absolute top-1/3 right-1/3 text-indigo-600 dark:text-indigo-400">
          <SiPostgresql size={80} />
        </motion.div>
        <motion.div animate={floatingAnimation(0.5)} className="absolute bottom-1/3 left-1/3 text-indigo-500">
          <SiPhp size={90} />
        </motion.div>
      </div>

      {/* Decorative watermarks */}
      <div className="absolute right-[5%] top-[40%] opacity-[0.03] dark:opacity-10 pointer-events-none select-none font-mono text-[20rem] font-bold text-blue-500 leading-none">
        {'}'}
      </div>
      <div className="absolute left-[5%] top-[60%] opacity-[0.03] dark:opacity-10 pointer-events-none select-none font-mono text-[20rem] font-bold text-blue-500 leading-none">
        {'<'}
      </div>
    </div>
  );
};

function App() {
  const sections: NavSection[] = useMemo(() => [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'proyek', label: 'Proyek' },
    { id: 'pengalaman', label: 'Pengalaman' },
    { id: 'keahlian', label: 'Keahlian' },
    { id: 'kontak', label: 'Kontak' },
  ], []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 relative">
        <BackgroundEffects />
        
        <div className="relative z-10">
          <NavbarWithTheme sections={sections} />
          
          <main>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
            <SkillsSection />
            <ContactSection />
          </main>
          
          <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md py-8 border-t border-gray-200 dark:border-gray-800 text-center relative z-10">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Portfolio Website. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
