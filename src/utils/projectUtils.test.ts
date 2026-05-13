import { describe, it, expect } from 'vitest';
import { getProjectPreviews, resolveProjectImage, truncateDescription } from './projectUtils';
import type { Project } from '../types';

// Helper untuk membuat objek Project minimal
function makeProject(overrides: Partial<Project> & { id: string; createdAt: string }): Project {
  return {
    title: 'Test Project',
    shortDescription: 'Short desc',
    longDescription: 'Long desc',
    technologies: ['React'],
    role: 'Developer',
    contributions: [],
    challenges: 'None',
    previewImageUrl: null,
    repositoryUrl: null,
    demoUrl: null,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// getProjectPreviews
// ---------------------------------------------------------------------------

describe('getProjectPreviews', () => {
  it('mengembalikan array kosong jika input kosong', () => {
    expect(getProjectPreviews([])).toEqual([]);
  });

  it('mengembalikan semua proyek jika jumlahnya ≤ 6', () => {
    const projects = [
      makeProject({ id: '1', createdAt: '2024-01-01' }),
      makeProject({ id: '2', createdAt: '2024-02-01' }),
    ];
    expect(getProjectPreviews(projects)).toHaveLength(2);
  });

  it('mengembalikan tepat 6 proyek jika jumlahnya > 6', () => {
    const projects = Array.from({ length: 10 }, (_, i) =>
      makeProject({ id: String(i), createdAt: `2024-0${(i % 9) + 1}-01` })
    );
    expect(getProjectPreviews(projects)).toHaveLength(6);
  });

  it('mengurutkan proyek dari yang terbaru ke yang terlama', () => {
    const projects = [
      makeProject({ id: 'old', createdAt: '2022-01-01' }),
      makeProject({ id: 'new', createdAt: '2024-06-01' }),
      makeProject({ id: 'mid', createdAt: '2023-03-15' }),
    ];
    const result = getProjectPreviews(projects);
    expect(result[0].id).toBe('new');
    expect(result[1].id).toBe('mid');
    expect(result[2].id).toBe('old');
  });

  it('tidak memutasi array asli', () => {
    const projects = [
      makeProject({ id: 'a', createdAt: '2022-01-01' }),
      makeProject({ id: 'b', createdAt: '2024-01-01' }),
    ];
    const originalOrder = projects.map((p) => p.id);
    getProjectPreviews(projects);
    expect(projects.map((p) => p.id)).toEqual(originalOrder);
  });
});

// ---------------------------------------------------------------------------
// resolveProjectImage
// ---------------------------------------------------------------------------

describe('resolveProjectImage', () => {
  it('mengembalikan URL placeholder (non-kosong) jika previewImageUrl null', () => {
    const project = makeProject({ id: '1', createdAt: '2024-01-01', previewImageUrl: null });
    const result = resolveProjectImage(project);
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  });

  it('mengembalikan URL asli jika previewImageUrl tersedia', () => {
    const url = 'https://example.com/image.png';
    const project = makeProject({ id: '1', createdAt: '2024-01-01', previewImageUrl: url });
    expect(resolveProjectImage(project)).toBe(url);
  });
});

// ---------------------------------------------------------------------------
// truncateDescription
// ---------------------------------------------------------------------------

describe('truncateDescription', () => {
  it('mengembalikan teks asli jika panjangnya ≤ maxLength', () => {
    expect(truncateDescription('Hello', 10)).toBe('Hello');
    expect(truncateDescription('Hello', 5)).toBe('Hello');
  });

  it('memotong teks dan menambahkan "..." jika melebihi maxLength', () => {
    const result = truncateDescription('Hello World', 8);
    expect(result).toBe('Hello...');
    expect(result.length).toBe(8);
  });

  it('output tidak pernah melebihi maxLength', () => {
    const longText = 'A'.repeat(200);
    const result = truncateDescription(longText, 150);
    expect(result.length).toBeLessThanOrEqual(150);
  });

  it('menangani string kosong', () => {
    expect(truncateDescription('', 10)).toBe('');
  });
});
