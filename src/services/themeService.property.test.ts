/**
 * Property-Based Tests untuk themeService
 *
 * Menggunakan fast-check untuk memverifikasi properti universal
 * yang harus berlaku di seluruh ruang input.
 *
 * Feature: portfolio-website
 */

import { describe, it, beforeEach, afterEach, vi } from 'vitest';
import fc from 'fast-check';
import { resolveTheme, saveThemePreference } from './themeService';
import type { Theme } from '../types';

// ---------------------------------------------------------------------------
// Property 5: Persistensi preferensi tema (round-trip)
// Validates: Requirements 9.6
// ---------------------------------------------------------------------------

describe('Property 5: Persistensi preferensi tema (round-trip)', () => {
  beforeEach(() => {
    // Gunakan localStorage bawaan jsdom — bersihkan sebelum setiap test
    localStorage.clear();
    // Pastikan matchMedia tidak mengganggu resolusi (default ke 'light')
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  // Feature: portfolio-website, Property 5: Persistensi preferensi tema (round-trip)
  it('saveThemePreference kemudian resolveTheme selalu mengembalikan nilai yang sama', () => {
    // Validates: Requirements 9.6
    fc.assert(
      fc.property(
        fc.constantFrom<Theme>('light', 'dark'),
        (theme) => {
          localStorage.clear();
          saveThemePreference(theme);
          const resolved = resolveTheme();
          return resolved === theme;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 6: Resolusi tema selalu menghasilkan nilai yang valid
// Validates: Requirements 9.4, 9.5, 9.7, 9.8
// ---------------------------------------------------------------------------

describe('Property 6: Resolusi tema selalu menghasilkan nilai yang valid', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  /**
   * Helper: stub matchMedia untuk mensimulasikan preferensi sistem.
   */
  function stubMatchMedia(prefersDark: boolean) {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  }

  /**
   * Helper: stub localStorage yang melempar error (tidak tersedia).
   */
  function stubLocalStorageUnavailable() {
    const throwingStorage = {
      getItem: vi.fn(() => { throw new Error('localStorage not available'); }),
      setItem: vi.fn(() => { throw new Error('localStorage not available'); }),
      removeItem: vi.fn(() => { throw new Error('localStorage not available'); }),
      clear: vi.fn(() => { throw new Error('localStorage not available'); }),
      key: vi.fn(() => { throw new Error('localStorage not available'); }),
      length: 0,
    };
    vi.stubGlobal('localStorage', throwingStorage);
  }

  // Feature: portfolio-website, Property 6: Resolusi tema selalu menghasilkan nilai yang valid
  it('resolveTheme selalu mengembalikan "light" atau "dark" — localStorage tersedia, nilai tersimpan valid', () => {
    // Validates: Requirements 9.4, 9.5, 9.7, 9.8
    fc.assert(
      fc.property(
        fc.constantFrom<Theme>('light', 'dark'),
        fc.boolean(),
        (storedTheme, systemPrefersDark) => {
          localStorage.clear();
          localStorage.setItem('theme', storedTheme);
          stubMatchMedia(systemPrefersDark);

          const result = resolveTheme();
          return result === 'light' || result === 'dark';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-website, Property 6: Resolusi tema selalu menghasilkan nilai yang valid
  it('resolveTheme selalu mengembalikan "light" atau "dark" — localStorage tersedia, tidak ada nilai tersimpan', () => {
    // Validates: Requirements 9.4, 9.5, 9.7, 9.8
    fc.assert(
      fc.property(
        fc.boolean(),
        (systemPrefersDark) => {
          localStorage.clear();
          stubMatchMedia(systemPrefersDark);

          const result = resolveTheme();
          return result === 'light' || result === 'dark';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-website, Property 6: Resolusi tema selalu menghasilkan nilai yang valid
  it('resolveTheme selalu mengembalikan "light" atau "dark" — localStorage tersedia, nilai tersimpan tidak valid', () => {
    // Validates: Requirements 9.4, 9.5, 9.7, 9.8
    fc.assert(
      fc.property(
        // String acak yang bukan 'light' atau 'dark'
        fc.string().filter((s) => s !== 'light' && s !== 'dark'),
        fc.boolean(),
        (invalidValue, systemPrefersDark) => {
          localStorage.clear();
          localStorage.setItem('theme', invalidValue);
          stubMatchMedia(systemPrefersDark);

          const result = resolveTheme();
          return result === 'light' || result === 'dark';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-website, Property 6: Resolusi tema selalu menghasilkan nilai yang valid
  it('resolveTheme selalu mengembalikan "light" atau "dark" — localStorage tidak tersedia, sistem prefersDark', () => {
    // Validates: Requirements 9.4, 9.5, 9.7, 9.8
    fc.assert(
      fc.property(
        fc.boolean(),
        (systemPrefersDark) => {
          stubLocalStorageUnavailable();
          stubMatchMedia(systemPrefersDark);

          const result = resolveTheme();
          return result === 'light' || result === 'dark';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-website, Property 6: Resolusi tema selalu menghasilkan nilai yang valid
  it('resolveTheme selalu mengembalikan "light" atau "dark" — localStorage tidak tersedia, matchMedia tidak tersedia', () => {
    // Validates: Requirements 9.4, 9.5, 9.7, 9.8
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          stubLocalStorageUnavailable();
          // matchMedia melempar error (tidak tersedia)
          vi.stubGlobal('matchMedia', () => {
            throw new Error('matchMedia not available');
          });

          const result = resolveTheme();
          return result === 'light' || result === 'dark';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-website, Property 6: Resolusi tema selalu menghasilkan nilai yang valid
  it('resolveTheme tidak pernah mengembalikan null, undefined, atau nilai di luar enum — semua kombinasi kondisi', () => {
    // Validates: Requirements 9.4, 9.5, 9.7, 9.8
    fc.assert(
      fc.property(
        // localStorageState: 0 = tidak tersedia, 1 = kosong, 2 = valid, 3 = tidak valid
        fc.integer({ min: 0, max: 3 }),
        fc.boolean(),
        (localStorageState, systemPrefersDark) => {
          vi.unstubAllGlobals();

          if (localStorageState === 0) {
            stubLocalStorageUnavailable();
          } else {
            localStorage.clear();
            if (localStorageState === 2) {
              localStorage.setItem('theme', systemPrefersDark ? 'dark' : 'light');
            } else if (localStorageState === 3) {
              localStorage.setItem('theme', 'invalid-value');
            }
            // localStorageState === 1: kosong, tidak ada setItem
          }

          stubMatchMedia(systemPrefersDark);

          const result = resolveTheme();
          return (
            result !== null &&
            result !== undefined &&
            (result === 'light' || result === 'dark')
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});
