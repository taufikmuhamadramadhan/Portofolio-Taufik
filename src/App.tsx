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
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
        <NavbarWithTheme sections={sections} />
        
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <SkillsSection />
          <ContactSection />
        </main>
        
        <footer className="bg-white dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Portfolio Website. All rights reserved.
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
