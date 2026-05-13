/**
 * Unit tests untuk useTheme hook
 *
 * Memverifikasi perilaku hook dalam membaca tema awal, toggle tema,
 * persistensi ke localStorage, dan penerapan class ke DOM.
 *
 * Requirements: 9.1, 9.2, 9.3, 9.6
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTheme } from './useTheme';
import * as themeService from '../services/themeService';

describe('useTheme', () => {
  beforeEach(() => {
    // Reset DOM class sebelum setiap test
    document.documentElement.classList.remove('dark');
    // Bersihkan localStorage
    localStorage.clear();
    // Restore semua spy/mock
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // Inisialisasi tema awal
  // -------------------------------------------------------------------------

  it('membaca tema awal dari resolveTheme() saat mount', () => {
    vi.spyOn(themeService, 'resolveTheme').mockReturnValue('dark');

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('dark');
  });

  it('mengembalikan tema light sebagai default jika localStorage kosong', () => {
    // localStorage kosong → resolveTheme() akan fallback ke sistem atau 'light'
    // Paksa sistem ke 'light' dengan mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('light');
  });

  it('mengembalikan tema dark jika localStorage menyimpan dark', () => {
    localStorage.setItem('theme', 'dark');

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('dark');
  });

  it('menerapkan tema ke DOM saat mount', () => {
    vi.spyOn(themeService, 'resolveTheme').mockReturnValue('dark');
    const applyThemeSpy = vi.spyOn(themeService, 'applyTheme');

    renderHook(() => useTheme());

    expect(applyThemeSpy).toHaveBeenCalledWith('dark');
  });

  // -------------------------------------------------------------------------
  // toggleTheme — beralih dari light ke dark
  // -------------------------------------------------------------------------

  it('toggleTheme mengubah tema dari light ke dark', () => {
    vi.spyOn(themeService, 'resolveTheme').mockReturnValue('light');

    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
  });

  it('toggleTheme mengubah tema dari dark ke light', () => {
    vi.spyOn(themeService, 'resolveTheme').mockReturnValue('dark');

    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
  });

  // -------------------------------------------------------------------------
  // toggleTheme — persistensi dan penerapan DOM
  // -------------------------------------------------------------------------

  it('toggleTheme memanggil saveThemePreference dengan tema baru', () => {
    vi.spyOn(themeService, 'resolveTheme').mockReturnValue('light');
    const saveSpy = vi.spyOn(themeService, 'saveThemePreference');

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(saveSpy).toHaveBeenCalledWith('dark');
  });

  it('toggleTheme memanggil applyTheme dengan tema baru', () => {
    vi.spyOn(themeService, 'resolveTheme').mockReturnValue('light');
    const applyThemeSpy = vi.spyOn(themeService, 'applyTheme');

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    // Dipanggil dua kali: sekali saat mount (useEffect), sekali saat toggle
    expect(applyThemeSpy).toHaveBeenLastCalledWith('dark');
  });

  it('toggleTheme menambahkan class dark pada <html> saat beralih ke dark', () => {
    vi.spyOn(themeService, 'resolveTheme').mockReturnValue('light');

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggleTheme menghapus class dark pada <html> saat beralih ke light', () => {
    vi.spyOn(themeService, 'resolveTheme').mockReturnValue('dark');
    document.documentElement.classList.add('dark');

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  // -------------------------------------------------------------------------
  // Toggle berulang
  // -------------------------------------------------------------------------

  it('dua kali toggle mengembalikan ke tema semula', () => {
    vi.spyOn(themeService, 'resolveTheme').mockReturnValue('light');

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });
    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');
  });

  // -------------------------------------------------------------------------
  // Return value
  // -------------------------------------------------------------------------

  it('mengembalikan objek dengan properti theme dan toggleTheme', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('toggleTheme');
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('theme selalu bernilai light atau dark', () => {
    const { result } = renderHook(() => useTheme());

    expect(['light', 'dark']).toContain(result.current.theme);

    act(() => {
      result.current.toggleTheme();
    });

    expect(['light', 'dark']).toContain(result.current.theme);
  });
});
