/**
 * Utilitas untuk memformat dan mengurutkan data pengalaman kerja dan pendidikan.
 *
 * Sesuai Requirements 5.1–5.5.
 */

import type { WorkExperience, Education } from '../types';

// ---------------------------------------------------------------------------
// Konstanta sentinel untuk entri yang masih berlangsung
// ---------------------------------------------------------------------------

/**
 * Nilai tanggal sentinel yang digunakan saat mengurutkan entri dengan
 * `endDate: null` (masih berlangsung). Nilai ini lebih besar dari tanggal
 * "YYYY-MM" mana pun sehingga entri tersebut selalu muncul paling atas.
 */
const ONGOING_SENTINEL = '9999-99';

// ---------------------------------------------------------------------------
// Fungsi pembantu internal
// ---------------------------------------------------------------------------

/**
 * Mengembalikan kunci pengurutan untuk entri `WorkExperience`.
 * Entri yang masih berlangsung (`endDate: null`) mendapat nilai sentinel
 * tertinggi sehingga muncul paling atas saat diurutkan secara terbalik.
 */
function getSortKeyWork(item: WorkExperience): string {
  return item.endDate ?? ONGOING_SENTINEL;
}

/**
 * Mengembalikan kunci pengurutan untuk entri `Education`.
 * Entri yang masih berlangsung (`graduationYear: null`) mendapat nilai
 * sentinel tertinggi sehingga muncul paling atas saat diurutkan secara terbalik.
 */
function getSortKeyEducation(item: Education): string {
  return item.graduationYear ?? ONGOING_SENTINEL;
}

// ---------------------------------------------------------------------------
// Fungsi publik
// ---------------------------------------------------------------------------

/**
 * Mengurutkan daftar pengalaman kerja atau pendidikan secara kronologis
 * terbalik (terbaru di atas).
 *
 * Aturan pengurutan:
 * - Untuk `WorkExperience`: menggunakan `endDate` sebagai kunci utama.
 *   Jika `endDate` sama, `startDate` digunakan sebagai kunci sekunder.
 * - Untuk `Education`: menggunakan `graduationYear` sebagai kunci.
 * - Entri dengan `endDate: null` atau `graduationYear: null` (masih
 *   berlangsung) diperlakukan sebagai tanggal paling baru dan selalu
 *   muncul di atas.
 *
 * Fungsi ini tidak mengubah array asli (immutable sort).
 *
 * @param items - Array `WorkExperience` atau `Education` yang akan diurutkan.
 * @returns Salinan array yang telah diurutkan secara kronologis terbalik.
 *
 * @example
 * const sorted = sortByDateDesc(workExperiences);
 * // sorted[0] adalah pengalaman paling baru
 */
export function sortByDateDesc(items: WorkExperience[]): WorkExperience[];
export function sortByDateDesc(items: Education[]): Education[];
export function sortByDateDesc(
  items: WorkExperience[] | Education[]
): WorkExperience[] | Education[] {
  if (items.length === 0) return [];

  // Deteksi tipe array berdasarkan properti pertama
  const firstItem = items[0];

  if ('endDate' in firstItem) {
    // Array WorkExperience
    return [...(items as WorkExperience[])].sort((a, b) => {
      const keyA = getSortKeyWork(a);
      const keyB = getSortKeyWork(b);

      if (keyB !== keyA) {
        // Urutkan berdasarkan endDate secara terbalik (terbaru di atas)
        return keyB.localeCompare(keyA);
      }

      // Jika endDate sama, gunakan startDate sebagai kunci sekunder
      return b.startDate.localeCompare(a.startDate);
    });
  } else {
    // Array Education
    return [...(items as Education[])].sort((a, b) => {
      const keyA = getSortKeyEducation(a);
      const keyB = getSortKeyEducation(b);
      return keyB.localeCompare(keyA);
    });
  }
}

/**
 * Memformat tanggal selesai pengalaman kerja untuk ditampilkan.
 *
 * Jika `endDate` bernilai `null` (entri masih berlangsung), mengembalikan
 * string "Sekarang" sesuai Requirement 5.3.
 *
 * @param endDate - Tanggal selesai dalam format "YYYY-MM", atau `null`.
 * @returns String tanggal yang diformat, atau "Sekarang" jika `null`.
 *
 * @example
 * formatEndDate("2023-06")  // → "2023-06"
 * formatEndDate(null)        // → "Sekarang"
 */
export function formatEndDate(endDate: string | null): string {
  if (endDate === null) {
    return 'Sekarang';
  }
  return endDate;
}

/**
 * Memformat tahun kelulusan pendidikan untuk ditampilkan.
 *
 * Jika `year` bernilai `null` (pendidikan masih berlangsung), mengembalikan
 * string "Sedang Berlangsung" sesuai Requirement 5.5.
 *
 * @param year - Tahun kelulusan sebagai string, atau `null`.
 * @returns String tahun kelulusan, atau "Sedang Berlangsung" jika `null`.
 *
 * @example
 * formatGraduationYear("2022")  // → "2022"
 * formatGraduationYear(null)     // → "Sedang Berlangsung"
 */
export function formatGraduationYear(year: string | null): string {
  if (year === null) {
    return 'Sedang Berlangsung';
  }
  return year;
}
