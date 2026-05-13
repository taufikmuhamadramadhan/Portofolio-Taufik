import type { Project } from '../types';

/**
 * Mengembalikan maksimal 6 proyek terbaru berdasarkan `createdAt`.
 *
 * Proyek diurutkan dari yang paling baru ke yang paling lama,
 * kemudian dipotong menjadi maksimal 6 item.
 *
 * @param projects - Daftar semua proyek
 * @returns Maks 6 proyek terbaru
 *
 * Sesuai Requirement 1.5
 */
export function getProjectPreviews(projects: Project[]): Project[] {
  return [...projects]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    })
    .slice(0, 6);
}

/**
 * URL gambar placeholder yang digunakan saat proyek tidak memiliki gambar pratinjau.
 * Menggunakan layanan placeholder publik yang andal.
 */
const PLACEHOLDER_IMAGE_URL = 'https://placehold.co/600x400?text=No+Image';

/**
 * Mengembalikan URL gambar pratinjau proyek.
 * Jika `previewImageUrl` bernilai `null`, mengembalikan URL placeholder yang valid.
 *
 * @param project - Objek proyek
 * @returns URL gambar (asli atau placeholder)
 *
 * Sesuai Requirement 4.2
 */
export function resolveProjectImage(project: Project): string {
  if (project.previewImageUrl === null) {
    return PLACEHOLDER_IMAGE_URL;
  }
  return project.previewImageUrl;
}

/**
 * Memotong teks deskripsi agar tidak melebihi `maxLength` karakter.
 * Jika teks lebih panjang dari batas, teks dipotong dan diakhiri dengan "...".
 *
 * @param text - Teks deskripsi yang akan dipotong
 * @param maxLength - Panjang maksimum karakter yang diizinkan
 * @returns Teks yang sudah dipotong (atau teks asli jika sudah dalam batas)
 *
 * Sesuai Requirement 4.1
 */
export function truncateDescription(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 3) + '...';
}
