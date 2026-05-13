/**
 * Theme Service — Layanan manajemen tema gelap/terang
 *
 * Menyediakan fungsi untuk membaca, menyimpan, dan menerapkan preferensi tema.
 * Mendukung persistensi via localStorage dengan fallback ke preferensi sistem
 * dan fallback akhir ke mode terang.
 *
 * Requirements: 9.4, 9.5, 9.6, 9.7, 9.8
 */

import type { Theme } from '../types';

const THEME_STORAGE_KEY = 'theme';

/**
 * Membaca preferensi tema dari sistem operasi pengguna.
 * Fallback ke 'light' jika API matchMedia tidak tersedia.
 *
 * @returns 'dark' jika sistem menggunakan mode gelap, 'light' sebaliknya
 */
function getSystemTheme(): Theme {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    // matchMedia tidak tersedia (misalnya di lingkungan SSR atau browser lama)
    return 'light';
  }
}

/**
 * Menentukan tema yang harus digunakan dengan urutan prioritas:
 * 1. Preferensi tersimpan di localStorage
 * 2. Preferensi sistem operasi
 * 3. Fallback ke 'light'
 *
 * Selalu mengembalikan nilai tema yang valid ('light' atau 'dark'),
 * tidak pernah null, undefined, atau nilai lain di luar enum.
 *
 * @returns Tema yang aktif
 */
export function resolveTheme(): Theme {
  // Coba baca dari localStorage terlebih dahulu
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // localStorage tidak tersedia — lanjut ke fallback berikutnya
  }

  // Fallback ke preferensi sistem
  return getSystemTheme();
}

/**
 * Menyimpan preferensi tema ke localStorage.
 * Gagal secara diam-diam jika localStorage tidak tersedia
 * (misalnya mode private/incognito atau browser yang membatasi storage).
 *
 * @param theme - Nilai tema yang akan disimpan ('light' atau 'dark')
 */
export function saveThemePreference(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage tidak tersedia — abaikan, tema tetap berfungsi di sesi ini
  }
}

/**
 * Menerapkan tema ke dokumen dengan menambah atau menghapus class 'dark'
 * pada elemen <html>. Tailwind CSS menggunakan class ini untuk dark mode.
 *
 * @param theme - Tema yang akan diterapkan ('light' atau 'dark')
 */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
