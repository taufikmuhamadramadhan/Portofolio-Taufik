/**
 * Data statis daftar proyek portfolio.
 * Sesuai interface Project dari src/types/index.ts
 * Requirements: 4.1–4.6, 1.5
 */

import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Jam’iyyah Management Application',
    shortDescription: 'Platform web full-stack untuk mengelola dan memusatkan data lebih dari 600 anggota lintas 33 kelompok.',
    longDescription:
      'Jam’iyyah Management Application adalah platform web yang dibangun untuk mendigitalisasi proses administrasi yang kompleks bagi pimpinan jamaah. Proyek ini memusatkan data anggota dan mengotomatisasi penagihan iuran beserta laporan keuangannya. Terdapat integrasi inovatif menggunakan Node.js untuk layanan informasi WhatsApp dinamis, memungkinkan anggota mengecek status iuran dan menerima pengumuman secara otomatis.',
    technologies: ['React', 'Laravel', 'Node.js', 'PostgreSQL'],
    role: 'Full-Stack Developer',
    contributions: [
      'Merancang arsitektur full-stack untuk mengelola lebih dari 600 anggota.',
      'Mengembangkan fitur untuk menyederhanakan manajemen keuangan dan otomatisasi penagihan iuran.',
      'Mengintegrasikan layanan informasi WhatsApp dinamis menggunakan Node.js.',
      'Menyediakan laporan keuangan ringkas untuk setiap pimpinan kelompok.'
    ],
    challenges:
      'Tantangan utamanya adalah mendigitalisasi alur administrasi konvensional yang kompleks menjadi sistem yang intuitif serta mengimplementasikan notifikasi WhatsApp yang stabil untuk ratusan anggota.',
    previewImageUrl: null,
    repositoryUrl: null,
    demoUrl: 'https://sim.persisbanjaran.org/public',
    createdAt: '2025-01-01',
  },
  {
    id: 'project-2',
    title: 'SIMPEMAS Mobile App',
    shortDescription: 'Aplikasi mobile untuk mengurangi waktu proses proposal pengabdian masyarakat dari 2 minggu menjadi 3-5 hari.',
    longDescription:
      'SIMPEMAS adalah aplikasi mobile yang didanai oleh hibah nasional (PKM 2024) dan berhasil menjadi Finalis PIMNAS 2024. Aplikasi ini memberdayakan pengurus desa untuk mengelola dan mendistribusikan kegiatan dengan efektif, memastikan 90-95% kebutuhan masyarakat dapat diakses dengan mudah. Fitur utamanya mencakup penjadwalan pemangku kepentingan dan umpan balik masyarakat.',
    technologies: ['Flutter', 'Firebase'],
    role: 'Mobile Developer',
    contributions: [
      'Mengembangkan aplikasi mobile menggunakan Flutter dan Firebase.',
      'Memangkas waktu proses pengajuan proposal dari 2 minggu menjadi 3-5 hari.',
      'Mengimplementasikan fitur penjadwalan pemangku kepentingan.',
      'Membangun sistem umpan balik masyarakat (community feedback).'
    ],
    challenges:
      'Memastikan aplikasi mudah digunakan oleh pengurus desa dengan latar belakang teknis yang beragam, serta memenangkan persaingan pendanaan dari 401 institusi vokasi.',
    previewImageUrl: null,
    repositoryUrl: 'https://github.com/hasbyraihan/Proyek4_Aplikasi',
    demoUrl: null,
    createdAt: '2024-01-01',
  },
  {
    id: 'project-3',
    title: 'Power Plant Monitoring Application',
    shortDescription: 'Antarmuka pengguna untuk sistem pemantauan pembangkit listrik nasional (Proyek ICON+ PLN).',
    longDescription:
      'Power Plant Monitoring Application adalah proyek kritikal dari ICON+ (PLN) untuk memantau data operasional secara real-time. Sebagai Frontend Developer, tugas saya adalah menerjemahkan desain UI/UX yang kompleks menjadi komponen web yang responsif dan interaktif menggunakan Vue.js. Dasbor dinamis ini mengintegrasikan lebih dari 20 endpoint REST API untuk visualisasi data operasional.',
    technologies: ['Vue.js', 'REST API'],
    role: 'Frontend Developer',
    contributions: [
      'Membangun antarmuka pengguna untuk sistem pemantauan pembangkit listrik nasional.',
      'Menerjemahkan desain UI/UX kompleks menjadi komponen web yang responsif.',
      'Mengintegrasikan lebih dari 20 endpoint REST API unik dari tim backend.',
      'Memvisualisasikan data operasional secara real-time pada dasbor dinamis.'
    ],
    challenges:
      'Menyajikan volume data real-time yang besar ke dalam visualisasi dasbor tanpa mengorbankan performa aplikasi browser.',
    previewImageUrl: null,
    repositoryUrl: null,
    demoUrl: null,
    createdAt: '2023-10-01',
  },
  {
    id: 'project-4',
    title: 'Student Leave Permission System',
    shortDescription: 'Aplikasi web untuk mengotomatisasi alur permohonan izin mahasiswa (Juara 3 JTK Expo).',
    longDescription:
      'Student Leave Permission System adalah aplikasi web yang dirancang untuk mengotomatisasi alur kerja permohonan izin bagi sekitar 240 mahasiswa dan 42 dosen. Backend dibangun menggunakan Express.js yang menangani CRUD, logika pemrosesan permohonan, dan dasbor rekapitulasi untuk admin. Terdapat juga sistem notifikasi email otomatis untuk menginformasikan status permohonan kepada mahasiswa, orang tua, dan dosen.',
    technologies: ['React', 'Express.js', 'Node.js'],
    role: 'Backend Developer',
    contributions: [
      'Membangun backend API menggunakan Express.js untuk menangani semua fungsi inti.',
      'Mengembangkan dasbor rekapitulasi untuk admin.',
      'Merekayasa sistem notifikasi email otomatis untuk menginformasikan status permohonan.',
      'Berkolaborasi dalam pengembangan antarmuka web (React).'
    ],
    challenges:
      'Mengelola logika alur kerja multi-aktor (mahasiswa, dosen, orang tua, admin) dan memastikan notifikasi email terkirim secara tepat waktu sesuai perubahan status.',
    previewImageUrl: null,
    repositoryUrl: 'https://github.com/mahesyasn18/SLP-BackEnd',
    demoUrl: null,
    createdAt: '2023-09-01',
  },
];
