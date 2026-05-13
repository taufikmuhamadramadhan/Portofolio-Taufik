import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import type { NavSection } from '../../types';

interface NavbarProps {
  sections: NavSection[];
  activeSection: string;
  /**
   * Optional slot for rendering a ThemeToggle (or any other element) in the navbar.
   * Accepting it as a ReactNode avoids a circular import with ThemeToggle.tsx
   * while both components are created in parallel.
   */
  themeToggleSlot?: React.ReactNode;
}

/**
 * Sticky navigation bar with desktop links and a hamburger mobile menu.
 *
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7
 */
export default function Navbar({ sections, activeSection, themeToggleSlot }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Scroll smoothly to the target section and close the mobile menu.
   * Requirements: 2.2, 2.5
   */
  const handleNavClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm"
      role="navigation"
      aria-label="Navigasi utama"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Desktop navigation links — hidden on mobile (< 768px) */}
          {/* Requirement 2.1 */}
          <div className="hidden md:flex items-center space-x-1">
            {sections.map((section) => (
              <DesktopNavLink
                key={section.id}
                section={section}
                isActive={activeSection === section.id}
                onClick={handleNavClick}
              />
            ))}
          </div>

          {/* Right side: optional theme toggle + hamburger button */}
          <div className="flex items-center space-x-2 ml-auto">
            {themeToggleSlot}

            {/* Hamburger button — visible only on mobile (< 768px) */}
            {/* Requirement 2.3 */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
              aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? (
                <HiX className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — vertical links, shown only when open */}
      {/* Requirements: 2.3, 2.4, 2.6 */}
      <MobileMenu
        id="mobile-menu"
        sections={sections}
        activeSection={activeSection}
        isOpen={isMobileMenuOpen}
        onNavClick={handleNavClick}
      />
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface DesktopNavLinkProps {
  section: NavSection;
  isActive: boolean;
  onClick: (id: string) => void;
}

/** Single desktop navigation link with active state styling. Requirement 2.7 */
function DesktopNavLink({ section, isActive, onClick }: DesktopNavLinkProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(section.id)}
      aria-current={isActive ? 'page' : undefined}
      className={[
        'px-3 py-2 rounded-md text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        isActive
          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
      ].join(' ')}
    >
      {section.label}
    </button>
  );
}

interface MobileMenuProps {
  id: string;
  sections: NavSection[];
  activeSection: string;
  isOpen: boolean;
  onNavClick: (id: string) => void;
}

/**
 * Vertical mobile navigation menu shown when the hamburger is toggled.
 * Requirements: 2.3, 2.4, 2.6
 */
function MobileMenu({ id, sections, activeSection, isOpen, onNavClick }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      id={id}
      className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
      role="menu"
      aria-label="Menu navigasi mobile"
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              type="button"
              role="menuitem"
              onClick={() => onNavClick(section.id)}
              aria-current={isActive ? 'page' : undefined}
              className={[
                'w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                isActive
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
              ].join(' ')}
            >
              {section.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
