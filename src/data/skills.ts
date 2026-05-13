/**
 * Data statis keahlian teknis dan soft skills pemilik portfolio.
 * Sesuai interface TechnicalSkill dan SoftSkill dari src/types/index.ts
 * Requirements: 6.1–6.4
 */

import type { TechnicalSkill, SoftSkill } from '../types';

/**
 * Daftar keahlian teknis.
 * Dikelompokkan berdasarkan category: 'Bahasa Pemrograman' | 'Framework' | 'Alat'
 * iconName merujuk nama komponen dari react-icons (misal: SiTypescript dari simple-icons)
 * iconName: null → komponen SkillBadge menampilkan ikon generik (Req 6.3)
 */
export const technicalSkills: TechnicalSkill[] = [
  // Bahasa Pemrograman
  { id: 'skill-java', name: 'Java', category: 'Bahasa Pemrograman', proficiency: 'Mahir', iconName: 'SiJava' },
  { id: 'skill-php', name: 'PHP', category: 'Bahasa Pemrograman', proficiency: 'Mahir', iconName: 'SiPhp' },
  { id: 'skill-js', name: 'JavaScript', category: 'Bahasa Pemrograman', proficiency: 'Mahir', iconName: 'SiJavascript' },
  { id: 'skill-dart', name: 'Dart', category: 'Bahasa Pemrograman', proficiency: 'Menengah', iconName: 'SiDart' },
  { id: 'skill-sql', name: 'SQL', category: 'Bahasa Pemrograman', proficiency: 'Mahir', iconName: null },

  // Framework
  { id: 'skill-springboot', name: 'Spring Boot', category: 'Framework', proficiency: 'Mahir', iconName: 'SiSpringboot' },
  { id: 'skill-laravel', name: 'Laravel', category: 'Framework', proficiency: 'Mahir', iconName: 'SiLaravel' },
  { id: 'skill-phalcon', name: 'Phalcon', category: 'Framework', proficiency: 'Menengah', iconName: null },
  { id: 'skill-react', name: 'ReactJS', category: 'Framework', proficiency: 'Menengah', iconName: 'SiReact' },
  { id: 'skill-vue', name: 'VueJS', category: 'Framework', proficiency: 'Menengah', iconName: 'SiVuedotjs' },
  { id: 'skill-express', name: 'ExpressJS', category: 'Framework', proficiency: 'Menengah', iconName: 'SiExpress' },
  { id: 'skill-flutter', name: 'Flutter', category: 'Framework', proficiency: 'Menengah', iconName: 'SiFlutter' },

  // Alat
  { id: 'skill-postgres', name: 'PostgreSQL', category: 'Alat', proficiency: 'Mahir', iconName: 'SiPostgresql' },
  { id: 'skill-mysql', name: 'MySQL', category: 'Alat', proficiency: 'Mahir', iconName: 'SiMysql' },
  { id: 'skill-git', name: 'Git', category: 'Alat', proficiency: 'Mahir', iconName: 'SiGit' },
  { id: 'skill-redis', name: 'Redis', category: 'Alat', proficiency: 'Menengah', iconName: 'SiRedis' },
  { id: 'skill-postman', name: 'Postman', category: 'Alat', proficiency: 'Mahir', iconName: 'SiPostman' },
  { id: 'skill-jwt', name: 'JWT', category: 'Alat', proficiency: 'Mahir', iconName: 'SiJsonwebtokens' },
  { id: 'skill-firebase', name: 'Firebase', category: 'Alat', proficiency: 'Menengah', iconName: 'SiFirebase' },
  { id: 'skill-linux', name: 'Linux Server Admin', category: 'Alat', proficiency: 'Menengah', iconName: 'SiLinux' },
];

/**
 * Daftar soft skills.
 * Ditampilkan tanpa indikator tingkat kemahiran (Req 6.4).
 */
export const softSkills: SoftSkill[] = [
  { id: 'soft-1', name: 'Agile/Scrum Methodology' },
  { id: 'soft-2', name: 'Komunikasi Efektif' },
  { id: 'soft-3', name: 'Kerja Tim' },
  { id: 'soft-4', name: 'Pemecahan Masalah' },
  { id: 'soft-5', name: 'AI Prompt Engineering' },
];
