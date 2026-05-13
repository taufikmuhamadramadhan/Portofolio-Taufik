/**
 * ThemeToggle — Tombol untuk beralih antara tema terang dan gelap
 *
 * Menampilkan ikon matahari saat tema gelap aktif (klik → beralih ke terang),
 * dan ikon bulan saat tema terang aktif (klik → beralih ke gelap).
 * Label aria diperbarui sesuai aksi yang akan dilakukan.
 *
 * Requirements: 9.1, 9.2, 9.3
 */

import { BsSun, BsMoon } from 'react-icons/bs';
import type { Theme } from '../../types';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ThemeToggleProps {
  /** Tema yang sedang aktif */
  currentTheme: Theme;
  /** Fungsi yang dipanggil saat tombol diklik untuk beralih tema */
  onToggle: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * ThemeToggle merender tombol ikon untuk beralih tema.
 *
 * - Tema gelap aktif → tampilkan ikon matahari, aria-label "Aktifkan mode terang"
 * - Tema terang aktif → tampilkan ikon bulan, aria-label "Aktifkan mode gelap"
 *
 * @example
 * ```tsx
 * const { theme, toggleTheme } = useThemeContext();
 * <ThemeToggle currentTheme={theme} onToggle={toggleTheme} />
 * ```
 */
export function ThemeToggle({ currentTheme, onToggle }: ThemeToggleProps) {
  const isDark = currentTheme === 'dark';

  const ariaLabel = isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={[
        'inline-flex items-center justify-center',
        'w-10 h-10 rounded-full',
        'text-xl',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        isDark
          ? 'text-yellow-400 hover:bg-white/10 focus-visible:ring-yellow-400'
          : 'text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-900',
      ].join(' ')}
    >
      {isDark ? (
        <BsSun aria-hidden="true" />
      ) : (
        <BsMoon aria-hidden="true" />
      )}
    </button>
  );
}

export default ThemeToggle;
