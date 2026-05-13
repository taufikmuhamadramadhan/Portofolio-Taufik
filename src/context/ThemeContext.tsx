/**
 * ThemeContext — Context React untuk manajemen tema gelap/terang
 *
 * Menyediakan ThemeProvider yang membungkus useTheme hook dan
 * useThemeContext sebagai convenience hook untuk konsumsi di komponen.
 *
 * Requirements: 9.1, 9.2, 9.3
 */

import { createContext, useContext, type ReactNode } from 'react';
import { useTheme, type UseThemeReturn } from '../hooks/useTheme';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

/**
 * ThemeContext menyimpan nilai tema aktif dan fungsi toggle.
 * Nilai default undefined — komponen harus dibungkus ThemeProvider.
 */
const ThemeContext = createContext<UseThemeReturn | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider membungkus aplikasi dan menyediakan state tema
 * ke seluruh pohon komponen melalui React Context.
 *
 * Gunakan di root aplikasi (App.tsx atau main.tsx):
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeValue = useTheme();

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Consumer Hook
// ---------------------------------------------------------------------------

/**
 * useThemeContext — Convenience hook untuk mengakses ThemeContext.
 *
 * Melempar error yang deskriptif jika digunakan di luar ThemeProvider,
 * sehingga kesalahan penggunaan terdeteksi lebih awal saat development.
 *
 * @returns Objek berisi `theme` (tema aktif) dan `toggleTheme` (fungsi toggle)
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, toggleTheme } = useThemeContext();
 *   return (
 *     <button onClick={toggleTheme}>
 *       {theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useThemeContext(): UseThemeReturn {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext harus digunakan di dalam ThemeProvider');
  }
  return context;
}
