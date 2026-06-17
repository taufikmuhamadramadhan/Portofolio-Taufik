/**
 * Data statis pemilik portfolio.
 * Sesuai interface Owner dari src/types/index.ts
 * Requirements: 1.1–1.5, 3.1–3.3
 */

import type { Owner } from '../types';

export const owner: Owner = {
  fullName: 'Taufik Muhamad Ramadhan',
  tagline: 'Backend Developer yang berorientasi pada detail dengan pengalaman dalam membangun microservices yang skalabel dan memelihara aplikasi perbankan tingkat enterprise.',
  profileImageUrl: '/images/foto profil.jpg', // Path ke foto profil baru
  email: 'taufikm211@gmail.com',
  cvUrl: '/files/CV_Taufik_Muhamad_Ramadhan.pdf',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/taufikmuhamadr/',
    github: 'https://github.com/taufikmuhamadramadhan',
  },
};
