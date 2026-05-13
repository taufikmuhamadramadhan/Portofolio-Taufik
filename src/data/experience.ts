/**
 * Data statis pengalaman kerja dan riwayat pendidikan pemilik portfolio.
 * Sesuai interface WorkExperience dan Education dari src/types/index.ts
 * Requirements: 5.1–5.5
 */

import type { WorkExperience, Education } from '../types';

/**
 * Daftar pengalaman kerja.
 * Diurutkan kronologis terbalik (terbaru di atas) oleh sortByDateDesc() saat render.
 * endDate: null berarti posisi masih aktif → ditampilkan sebagai "Sekarang" (Req 5.3)
 */
export const workExperiences: WorkExperience[] = [
  {
    id: 'work-1',
    company: 'PT Reka Cipta Solusi',
    position: 'Java Developer',
    startDate: '2025-08',
    endDate: null,
    description:
      'Mengembangkan dan memelihara arsitektur microservices untuk aplikasi mobile banking menggunakan Java dan Spring Boot, memastikan transaksi finansial yang aman dan lancar. Melakukan pemantauan sisi server secara berkelanjutan dan menyediakan dukungan teknis di lingkungan produksi. Mengelola dan mengoptimalkan operasi database PostgreSQL untuk mendukung layanan perbankan dengan ketersediaan tinggi.',
  },
  {
    id: 'work-2',
    company: 'PT Kerjaku Inti Sejahtera',
    position: 'Backend Developer Intern',
    startDate: '2024-06',
    endDate: '2024-10',
    description:
      'Merancang dan mengembangkan 90 RESTful API (65 untuk web, 25 untuk mobile) untuk sistem Point of Sale (POS) komprehensif. Meningkatkan performa sistem dengan merancang arsitektur skalabel menggunakan caching Redis, mengurangi waktu respons API rata-rata sebesar 30%. Mengimplementasikan lapisan keamanan yang kuat menggunakan JWT dan token OTP, serta membangun sistem logging komprehensif.',
  },
  {
    id: 'work-3',
    company: 'PT Inti Optima Teknologi',
    position: 'Programmer',
    startDate: '2022-05',
    endDate: '2022-07',
    description:
      'Memelihara dan meningkatkan sistem manajemen kepegawaian kritikal yang melayani lebih dari 5.000 personel secara nasional untuk Badan Narkotika Nasional (BNN). Mengembangkan dan mengintegrasikan 3 fitur kunci baru untuk transfer pegawai, menyelaraskannya dengan arsitektur sistem yang ada. Berkolaborasi dalam tim untuk mengidentifikasi dan menyelesaikan lebih dari 50 bug.',
  },
  {
    id: 'work-4',
    company: 'Jagad Creative Nusantara',
    position: 'Frontend Developer Intern',
    startDate: '2020-10',
    endDate: '2020-12',
    description:
      'Mengembangkan website profil perusahaan yang sepenuhnya responsif dari awal untuk instansi pemerintah (BKKBN). Mengimplementasikan fitur Progressive Web App (PWA) yang mencapai skor performa Lighthouse 90+, memungkinkan akses offline dan waktu muat yang lebih cepat. Mengelola timeline proyek secara efektif untuk menyelesaikan produk akhir seminggu sebelum tenggat waktu.',
  },
];

/**
 * Daftar riwayat pendidikan.
 * Diurutkan kronologis terbalik (terbaru di atas) oleh sortByDateDesc() saat render.
 * graduationYear: null berarti masih berlangsung → ditampilkan sebagai "Sedang Berlangsung" (Req 5.5)
 */
export const educations: Education[] = [
  {
    id: 'edu-1',
    institution: 'Politeknik Negeri Bandung',
    major: 'D3 Teknik Informatika (GPA: 3.52)',
    graduationYear: '2025',
  },
];
