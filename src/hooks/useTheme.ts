/**
 * useTheme — Custom hook untuk manajemen tema gelap/terang
 *
 * Membaca tema awal dari themeService.resolveTheme() saat mount,
 * dan menyediakan fungsi toggleTheme untuk beralih antar tema.
 *
 * Requirements: 9.1, 9.2, 9.3, 9.6
 */

import { useState, useEffect } from 'react';
import type { Theme } from '../types';
import { resolveTheme, saveThemePreference, applyTheme } from '../services/themeService';

export interface UseThemeReturn {
  /** Tema yang sedang aktif */
  theme: Theme;
  /** Fungsi untuk beralih antara tema terang dan gelap */
  toggleTheme: () => void;
}

/**
 * Custom hook yang mengelola state tema aplikasi.
 *
 * - Membaca tema awal dari localStorage / preferensi sistem saat mount
 * - Menerapkan tema ke DOM saat mount dan setiap kali tema berubah
 * - Menyimpan preferensi ke localStorage saat toggle
 *
 * @returns Objek berisi tema aktif dan fungsi toggle
 */
export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<Theme>(() => resolveTheme());

  // Terapkan tema ke DOM saat mount dan setiap kali tema berubah
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      saveThemePreference(next);
      return next;
    });
  };

  return { theme, toggleTheme };
}
