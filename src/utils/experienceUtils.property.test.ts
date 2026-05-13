/**
 * Property-Based Tests untuk experienceUtils
 *
 * Menggunakan fast-check untuk memverifikasi properti universal
 * yang harus berlaku di seluruh ruang input.
 *
 * Feature: portfolio-website
 */

import { describe, it } from 'vitest';
import fc from 'fast-check';
import { sortByDateDesc, formatEndDate, formatGraduationYear } from './experienceUtils';
import type { WorkExperience, Education } from '../types';

// ---------------------------------------------------------------------------
// Arbitrary generators
// ---------------------------------------------------------------------------

/**
 * Generator untuk string tanggal format "YYYY-MM" yang valid.
 * Menghasilkan tahun 1900–2099 dan bulan 01–12.
 */
const arbYearMonth = fc.tuple(
  fc.integer({ min: 1900, max: 2099 }),
  fc.integer({ min: 1, max: 12 })
).map(([year, month]) => `${year}-${String(month).padStart(2, '0')}`);

/**
 * Generator untuk objek WorkExperience lengkap.
 * endDate bisa berupa string "YYYY-MM" atau null (masih berlangsung).
 */
const arbWorkExperience: fc.Arbitrary<WorkExperience> = fc.record({
  id: fc.string({ minLength: 1, maxLength: 20 }),
  company: fc.string({ minLength: 1, maxLength: 100 }),
  position: fc.string({ minLength: 1, maxLength: 100 }),
  startDate: arbYearMonth,
  endDate: fc.option(arbYearMonth, { nil: null }),
  description: fc.string({ minLength: 0, maxLength: 500 }),
});

/**
 * Generator untuk objek Education lengkap.
 * graduationYear bisa berupa string tahun atau null (masih berlangsung).
 */
const arbEducation: fc.Arbitrary<Education> = fc.record({
  id: fc.string({ minLength: 1, maxLength: 20 }),
  institution: fc.string({ minLength: 1, maxLength: 100 }),
  major: fc.string({ minLength: 1, maxLength: 100 }),
  graduationYear: fc.option(
    fc.integer({ min: 1900, max: 2099 }).map(String),
    { nil: null }
  ),
});

/**
 * Generator untuk WorkExperience yang masih berlangsung (endDate: null).
 */
const arbOngoingWorkExperience: fc.Arbitrary<WorkExperience> = fc.record({
  id: fc.string({ minLength: 1, maxLength: 20 }),
  company: fc.string({ minLength: 1, maxLength: 100 }),
  position: fc.string({ minLength: 1, maxLength: 100 }),
  startDate: arbYearMonth,
  endDate: fc.constant(null),
  description: fc.string({ minLength: 0, maxLength: 500 }),
});

/**
 * Generator untuk Education yang masih berlangsung (graduationYear: null).
 */
const arbOngoingEducation: fc.Arbitrary<Education> = fc.record({
  id: fc.string({ minLength: 1, maxLength: 20 }),
  institution: fc.string({ minLength: 1, maxLength: 100 }),
  major: fc.string({ minLength: 1, maxLength: 100 }),
  graduationYear: fc.constant(null),
});

// ---------------------------------------------------------------------------
// Helper: mengekstrak kunci pengurutan dari item hasil sort
// ---------------------------------------------------------------------------

/**
 * Mengembalikan nilai yang digunakan untuk membandingkan urutan.
 * null diperlakukan sebagai '9999-99' (paling baru).
 */
function getSortableKey(item: WorkExperience | Education): string {
  if ('endDate' in item) {
    return (item as WorkExperience).endDate ?? '9999-99';
  }
  return (item as Education).graduationYear ?? '9999-99';
}

// ---------------------------------------------------------------------------
// Property 8: Pengurutan kronologis terbalik berlaku untuk semua daftar bertanggal
// ---------------------------------------------------------------------------

describe('Property 8: Pengurutan kronologis terbalik berlaku untuk semua daftar bertanggal', () => {
  // Feature: portfolio-website, Property 8: Pengurutan kronologis terbalik berlaku untuk semua daftar bertanggal

  it('sortByDateDesc(WorkExperience[]) — setiap pasangan berurutan memiliki tanggal yang tidak naik', () => {
    // Feature: portfolio-website, Property 8: Pengurutan kronologis terbalik berlaku untuk semua daftar bertanggal
    // Validates: Requirements 5.1, 5.4
    fc.assert(
      fc.property(
        fc.array(arbWorkExperience, { minLength: 0, maxLength: 20 }),
        (items) => {
          const sorted = sortByDateDesc(items);

          // Panjang array tidak berubah
          if (sorted.length !== items.length) return false;

          // Setiap pasangan berurutan: key[i] >= key[i+1]
          for (let i = 0; i < sorted.length - 1; i++) {
            const keyA = getSortableKey(sorted[i]);
            const keyB = getSortableKey(sorted[i + 1]);
            if (keyA.localeCompare(keyB) < 0) {
              // keyA < keyB berarti urutan naik — melanggar properti
              return false;
            }
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('sortByDateDesc(Education[]) — setiap pasangan berurutan memiliki tahun yang tidak naik', () => {
    // Feature: portfolio-website, Property 8: Pengurutan kronologis terbalik berlaku untuk semua daftar bertanggal
    // Validates: Requirements 5.1, 5.4
    fc.assert(
      fc.property(
        fc.array(arbEducation, { minLength: 0, maxLength: 20 }),
        (items) => {
          const sorted = sortByDateDesc(items);

          // Panjang array tidak berubah
          if (sorted.length !== items.length) return false;

          // Setiap pasangan berurutan: key[i] >= key[i+1]
          for (let i = 0; i < sorted.length - 1; i++) {
            const keyA = getSortableKey(sorted[i]);
            const keyB = getSortableKey(sorted[i + 1]);
            if (keyA.localeCompare(keyB) < 0) {
              return false;
            }
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('sortByDateDesc(WorkExperience[]) — entri null endDate selalu muncul sebelum entri non-null', () => {
    // Feature: portfolio-website, Property 8: Pengurutan kronologis terbalik berlaku untuk semua daftar bertanggal
    // Validates: Requirements 5.1, 5.4
    fc.assert(
      fc.property(
        fc.array(arbWorkExperience, { minLength: 1, maxLength: 20 }),
        (items) => {
          const sorted = sortByDateDesc(items);

          // Cari indeks terakhir dari entri null endDate
          const lastNullIndex = sorted.reduce(
            (acc, item, idx) => ((item as WorkExperience).endDate === null ? idx : acc),
            -1
          );

          // Cari indeks pertama dari entri non-null endDate
          const firstNonNullIndex = sorted.findIndex(
            (item) => (item as WorkExperience).endDate !== null
          );

          // Jika ada keduanya, semua null harus muncul sebelum non-null
          if (lastNullIndex !== -1 && firstNonNullIndex !== -1) {
            return lastNullIndex < firstNonNullIndex;
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('sortByDateDesc(Education[]) — entri null graduationYear selalu muncul sebelum entri non-null', () => {
    // Feature: portfolio-website, Property 8: Pengurutan kronologis terbalik berlaku untuk semua daftar bertanggal
    // Validates: Requirements 5.1, 5.4
    fc.assert(
      fc.property(
        fc.array(arbEducation, { minLength: 1, maxLength: 20 }),
        (items) => {
          const sorted = sortByDateDesc(items);

          const lastNullIndex = sorted.reduce(
            (acc, item, idx) => ((item as Education).graduationYear === null ? idx : acc),
            -1
          );

          const firstNonNullIndex = sorted.findIndex(
            (item) => (item as Education).graduationYear !== null
          );

          if (lastNullIndex !== -1 && firstNonNullIndex !== -1) {
            return lastNullIndex < firstNonNullIndex;
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('sortByDateDesc tidak memutasi array asli (WorkExperience)', () => {
    // Feature: portfolio-website, Property 8: Pengurutan kronologis terbalik berlaku untuk semua daftar bertanggal
    // Validates: Requirements 5.1, 5.4
    fc.assert(
      fc.property(
        fc.array(arbWorkExperience, { minLength: 0, maxLength: 20 }),
        (items) => {
          const originalIds = items.map((item) => item.id);
          sortByDateDesc(items);
          const afterIds = items.map((item) => item.id);
          return JSON.stringify(originalIds) === JSON.stringify(afterIds);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('sortByDateDesc tidak memutasi array asli (Education)', () => {
    // Feature: portfolio-website, Property 8: Pengurutan kronologis terbalik berlaku untuk semua daftar bertanggal
    // Validates: Requirements 5.1, 5.4
    fc.assert(
      fc.property(
        fc.array(arbEducation, { minLength: 0, maxLength: 20 }),
        (items) => {
          const originalIds = items.map((item) => item.id);
          sortByDateDesc(items);
          const afterIds = items.map((item) => item.id);
          return JSON.stringify(originalIds) === JSON.stringify(afterIds);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 9: Entri yang masih berlangsung menampilkan label yang sesuai
// ---------------------------------------------------------------------------

describe('Property 9: Entri yang masih berlangsung menampilkan label yang sesuai', () => {
  // Feature: portfolio-website, Property 9: Entri yang masih berlangsung menampilkan label yang sesuai

  it('formatEndDate(null) selalu mengembalikan "Sekarang" untuk WorkExperience yang masih berlangsung', () => {
    // Feature: portfolio-website, Property 9: Entri yang masih berlangsung menampilkan label yang sesuai
    // Validates: Requirements 5.3, 5.5
    fc.assert(
      fc.property(
        arbOngoingWorkExperience,
        (item) => {
          const result = formatEndDate(item.endDate);
          return result === 'Sekarang';
        }
      ),
      { numRuns: 100 }
    );
  });

  it('formatEndDate(null) — nilai null langsung selalu menghasilkan "Sekarang"', () => {
    // Feature: portfolio-website, Property 9: Entri yang masih berlangsung menampilkan label yang sesuai
    // Validates: Requirements 5.3, 5.5
    fc.assert(
      fc.property(
        fc.constant(null as null),
        (endDate) => {
          return formatEndDate(endDate) === 'Sekarang';
        }
      ),
      { numRuns: 100 }
    );
  });

  it('formatEndDate tidak pernah mengembalikan string kosong atau null', () => {
    // Feature: portfolio-website, Property 9: Entri yang masih berlangsung menampilkan label yang sesuai
    // Validates: Requirements 5.3, 5.5
    fc.assert(
      fc.property(
        fc.option(arbYearMonth, { nil: null }),
        (endDate) => {
          const result = formatEndDate(endDate);
          return result !== null && result !== undefined && result.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('formatGraduationYear(null) selalu mengembalikan "Sedang Berlangsung" untuk Education yang masih berlangsung', () => {
    // Feature: portfolio-website, Property 9: Entri yang masih berlangsung menampilkan label yang sesuai
    // Validates: Requirements 5.3, 5.5
    fc.assert(
      fc.property(
        arbOngoingEducation,
        (item) => {
          const result = formatGraduationYear(item.graduationYear);
          return result === 'Sedang Berlangsung';
        }
      ),
      { numRuns: 100 }
    );
  });

  it('formatGraduationYear(null) — nilai null langsung selalu menghasilkan "Sedang Berlangsung"', () => {
    // Feature: portfolio-website, Property 9: Entri yang masih berlangsung menampilkan label yang sesuai
    // Validates: Requirements 5.3, 5.5
    fc.assert(
      fc.property(
        fc.constant(null as null),
        (graduationYear) => {
          return formatGraduationYear(graduationYear) === 'Sedang Berlangsung';
        }
      ),
      { numRuns: 100 }
    );
  });

  it('formatGraduationYear tidak pernah mengembalikan string kosong atau null', () => {
    // Feature: portfolio-website, Property 9: Entri yang masih berlangsung menampilkan label yang sesuai
    // Validates: Requirements 5.3, 5.5
    fc.assert(
      fc.property(
        fc.option(fc.integer({ min: 1900, max: 2099 }).map(String), { nil: null }),
        (graduationYear) => {
          const result = formatGraduationYear(graduationYear);
          return result !== null && result !== undefined && result.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});
