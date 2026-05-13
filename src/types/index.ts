/**
 * Tipe dan interface TypeScript untuk Portfolio Website
 *
 * File ini mendefinisikan semua tipe data yang digunakan di seluruh aplikasi,
 * mulai dari data konten (proyek, pengalaman, keahlian) hingga state UI (tema, navigasi).
 */

// ---------------------------------------------------------------------------
// Type Aliases
// ---------------------------------------------------------------------------

/** Nilai tema yang valid untuk tampilan website */
export type Theme = 'light' | 'dark';

/**
 * Tingkat kemahiran untuk keahlian teknis.
 * Tiga level tetap sesuai Requirement 6.2.
 */
export type ProficiencyLevel = 'Pemula' | 'Menengah' | 'Mahir';

/**
 * Kategori pengelompokan keahlian teknis.
 * Sesuai Requirement 6.1.
 */
export type SkillCategory = 'Bahasa Pemrograman' | 'Framework' | 'Alat';

// ---------------------------------------------------------------------------
// Interfaces — Data Konten
// ---------------------------------------------------------------------------

/**
 * Informasi pemilik portfolio.
 * Digunakan di HeroSection dan AboutSection.
 * Sesuai Requirement 1.1–1.4.
 */
export interface Owner {
  /** Nama lengkap pemilik */
  fullName: string;
  /** Kalimat ringkas profesi/spesialisasi. Maks 160 karakter (Req 1.3) */
  tagline: string;
  /** Path atau URL ke gambar profil */
  profileImageUrl: string;
  /** Alamat email kontak */
  email: string;
  /** Path atau URL ke berkas PDF CV */
  cvUrl: string;
  /** Tautan ke profil media sosial profesional */
  socialLinks: {
    /** URL profil LinkedIn */
    linkedin: string;
    /** URL profil GitHub */
    github: string;
  };
}

/**
 * Data proyek yang dikerjakan pemilik.
 * Digunakan di HeroSection (preview) dan ProjectsSection (daftar lengkap).
 * Sesuai Requirement 4.1–4.6.
 */
export interface Project {
  /** Identifier unik proyek */
  id: string;
  /** Judul proyek */
  title: string;
  /** Deskripsi singkat untuk kartu proyek. Maks 150 karakter (Req 4.1) */
  shortDescription: string;
  /** Deskripsi lengkap untuk modal detail. Maks 1000 karakter (Req 4.6) */
  longDescription: string;
  /** Daftar nama teknologi yang digunakan */
  technologies: string[];
  /** Peran pemilik dalam proyek */
  role: string;
  /** Daftar kontribusi pemilik. Maks 10 item (Req 4.1) */
  contributions: string[];
  /** Tantangan yang dihadapi selama pengerjaan proyek */
  challenges: string;
  /** URL gambar pratinjau. null → tampilkan placeholder (Req 4.2) */
  previewImageUrl: string | null;
  /** URL repositori kode sumber. null → tidak ditampilkan (Req 4.3) */
  repositoryUrl: string | null;
  /** URL demo langsung. null → tidak ditampilkan (Req 4.4) */
  demoUrl: string | null;
  /** Tanggal pembuatan dalam format ISO date string, digunakan untuk pengurutan */
  createdAt: string;
}

/**
 * Entri pengalaman kerja pemilik.
 * Digunakan di ExperienceSection.
 * Sesuai Requirement 5.1–5.3.
 */
export interface WorkExperience {
  /** Identifier unik entri pengalaman */
  id: string;
  /** Nama perusahaan atau institusi */
  company: string;
  /** Jabatan atau posisi */
  position: string;
  /** Tanggal mulai dalam format "YYYY-MM" */
  startDate: string;
  /** Tanggal selesai dalam format "YYYY-MM". null → tampilkan "Sekarang" (Req 5.3) */
  endDate: string | null;
  /** Deskripsi tanggung jawab. Maks 500 karakter (Req 5.2) */
  description: string;
}

/**
 * Entri riwayat pendidikan pemilik.
 * Digunakan di ExperienceSection.
 * Sesuai Requirement 5.4–5.5.
 */
export interface Education {
  /** Identifier unik entri pendidikan */
  id: string;
  /** Nama institusi pendidikan */
  institution: string;
  /** Jurusan atau program studi */
  major: string;
  /** Tahun kelulusan. null → tampilkan "Sedang Berlangsung" (Req 5.5) */
  graduationYear: string | null;
}

/**
 * Keahlian teknis pemilik.
 * Digunakan di SkillsSection.
 * Sesuai Requirement 6.1–6.3.
 */
export interface TechnicalSkill {
  /** Identifier unik keahlian */
  id: string;
  /** Nama keahlian atau teknologi */
  name: string;
  /** Kategori pengelompokan keahlian */
  category: SkillCategory;
  /** Tingkat kemahiran */
  proficiency: ProficiencyLevel;
  /** Nama komponen ikon dari react-icons. null → tampilkan ikon generik (Req 6.3) */
  iconName: string | null;
}

/**
 * Keahlian lunak (soft skill) pemilik.
 * Ditampilkan tanpa indikator tingkat kemahiran.
 * Sesuai Requirement 6.4.
 */
export interface SoftSkill {
  /** Identifier unik keahlian lunak */
  id: string;
  /** Nama keahlian lunak */
  name: string;
}

// ---------------------------------------------------------------------------
// Interfaces — Formulir & Validasi
// ---------------------------------------------------------------------------

/**
 * Data yang dikumpulkan dari formulir kontak.
 * Divalidasi menggunakan skema Zod sebelum dikirim via EmailJS.
 * Sesuai Requirement 7.1–7.6.
 */
export interface ContactFormData {
  /** Nama pengirim. Maks 100 karakter, wajib diisi */
  name: string;
  /** Alamat email pengirim. Maks 254 karakter, wajib diisi, format email valid */
  email: string;
  /** Subjek pesan. Maks 150 karakter, wajib diisi */
  subject: string;
  /** Isi pesan. Maks 2000 karakter, wajib diisi */
  message: string;
}

// ---------------------------------------------------------------------------
// Interfaces — State UI
// ---------------------------------------------------------------------------

/**
 * State preferensi tema tampilan.
 * Dikelola oleh ThemeContext dan disimpan di localStorage.
 * Sesuai Requirement 9.1–9.8.
 */
export interface ThemeState {
  /** Tema yang sedang aktif */
  current: Theme;
  /**
   * Sumber dari mana tema ditentukan:
   * - 'localStorage': dari preferensi yang tersimpan
   * - 'system': dari preferensi sistem operasi
   * - 'fallback': default mode terang saat semua sumber gagal
   */
  source: 'localStorage' | 'system' | 'fallback';
}

/**
 * Definisi satu item navigasi.
 * Digunakan oleh komponen Navbar.
 * Sesuai Requirement 2.1.
 */
export interface NavSection {
  /** Identifier unik bagian, digunakan sebagai anchor scroll. Contoh: "beranda" */
  id: string;
  /** Label yang ditampilkan pada tautan navigasi. Contoh: "Beranda" */
  label: string;
}
