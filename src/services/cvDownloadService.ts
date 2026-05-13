/**
 * Layanan unduhan CV
 *
 * Menangani pengambilan dan pengunduhan berkas CV dari URL yang diberikan.
 * Menggunakan Blob URL untuk memicu unduhan di browser tanpa membuka tab baru.
 */

// ---------------------------------------------------------------------------
// Custom Error Classes
// ---------------------------------------------------------------------------

/**
 * Error yang dilempar saat berkas CV tidak ditemukan (HTTP 404).
 * Sesuai Requirement 3.4.
 */
export class CVNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CVNotFoundError';
  }
}

/**
 * Error yang dilempar saat terjadi kesalahan jaringan atau server lainnya.
 * Sesuai Requirement 3.5, 3.6.
 */
export class CVDownloadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CVDownloadError';
  }
}

// ---------------------------------------------------------------------------
// Service Function
// ---------------------------------------------------------------------------

/**
 * Mengunduh berkas CV dari URL yang diberikan.
 *
 * Alur:
 * 1. Fetch berkas dari `cvUrl`
 * 2. Jika HTTP 404 → lempar `CVNotFoundError`
 * 3. Jika HTTP error lain → lempar `CVDownloadError`
 * 4. Buat Blob URL dari respons
 * 5. Buat elemen anchor sementara dan klik untuk memicu unduhan
 * 6. Cabut Blob URL untuk membebaskan memori
 *
 * @param cvUrl - URL berkas CV yang akan diunduh
 * @param fileName - Nama berkas yang akan digunakan saat disimpan
 * @throws {CVNotFoundError} Jika berkas tidak ditemukan (HTTP 404)
 * @throws {CVDownloadError} Jika terjadi kesalahan jaringan atau server
 *
 * Sesuai Requirements 3.3, 3.4, 3.5, 3.6
 */
export async function downloadCV(cvUrl: string, fileName: string): Promise<void> {
  try {
    const response = await fetch(cvUrl);

    if (response.status === 404) {
      throw new CVNotFoundError('Berkas CV tidak tersedia saat ini.');
    }

    if (!response.ok) {
      throw new CVDownloadError('Terjadi kesalahan. Silakan coba kembali.');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  } catch (error) {
    // Re-throw error yang sudah diketahui agar ditangani oleh komponen
    if (error instanceof CVNotFoundError || error instanceof CVDownloadError) {
      throw error;
    }
    // Tangani error jaringan atau error tak terduga lainnya
    throw new CVDownloadError('Terjadi kesalahan. Silakan coba kembali.');
  }
}
