/**
 * useActiveSection — Custom hook untuk mendeteksi section yang sedang terlihat
 *
 * Menggunakan IntersectionObserver untuk memantau visibilitas setiap section
 * saat pengguna menggulir halaman, dan mengembalikan ID section yang paling
 * terlihat saat ini.
 *
 * Requirements: 2.7
 */

import { useState, useEffect } from 'react';

/**
 * Custom hook yang mendeteksi section aktif berdasarkan posisi scroll.
 *
 * - Mengamati elemen DOM dengan ID yang sesuai dengan `sectionIds`
 * - Memperbarui `activeSection` saat section baru masuk ke viewport
 * - Default ke section pertama jika tidak ada yang sedang berpotongan
 *
 * @param sectionIds - Array ID section yang akan dipantau (urutan sesuai tampilan di halaman)
 * @returns ID section yang sedang aktif/terlihat
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    // Lacak rasio visibilitas setiap section
    const visibilityMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        // Perbarui peta visibilitas untuk setiap entry yang berubah
        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.intersectionRatio);
        });

        // Temukan section dengan rasio visibilitas tertinggi
        let maxRatio = 0;
        let mostVisible = '';

        sectionIds.forEach((id) => {
          const ratio = visibilityMap.get(id) ?? 0;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisible = id;
          }
        });

        // Perbarui section aktif jika ada yang terlihat,
        // jika tidak ada yang terlihat, pertahankan section aktif saat ini
        if (mostVisible) {
          setActiveSection(mostVisible);
        }
      },
      {
        // Threshold bertahap untuk mendeteksi perubahan visibilitas secara halus
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        // Sedikit kurangi area pengamatan dari atas untuk akurasi navigasi
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    // Amati semua elemen section yang ada di DOM
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
