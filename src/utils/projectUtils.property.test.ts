import { describe, it } from 'vitest';
import fc from 'fast-check';
import { getProjectPreviews, resolveProjectImage, truncateDescription } from './projectUtils';
import { owner } from '../data/owner';
import type { Project } from '../types';

// ---------------------------------------------------------------------------
// Arbitrary: Project object
// ---------------------------------------------------------------------------

/**
 * Generates an arbitrary Project object with all required fields.
 * `previewImageUrl` defaults to null unless overridden.
 */
const arbitraryProject = (overrides?: { [K in keyof Project]?: fc.Arbitrary<Project[K]> }) =>
  fc.record({
    id: fc.string({ minLength: 1, maxLength: 36 }),
    title: fc.string({ minLength: 1, maxLength: 100 }),
    shortDescription: fc.string({ minLength: 0, maxLength: 300 }),
    longDescription: fc.string({ minLength: 0, maxLength: 1200 }),
    technologies: fc.array(fc.string({ minLength: 1, maxLength: 50 })),
    role: fc.string({ minLength: 1, maxLength: 100 }),
    contributions: fc.array(fc.string({ minLength: 1, maxLength: 200 }), { maxLength: 10 }),
    challenges: fc.string({ minLength: 0, maxLength: 500 }),
    previewImageUrl: fc.constant(null) as fc.Arbitrary<string | null>,
    repositoryUrl: fc.option(fc.webUrl(), { nil: null }),
    demoUrl: fc.option(fc.webUrl(), { nil: null }),
    createdAt: fc
      .date({ min: new Date('2000-01-01'), max: new Date('2030-12-31') })
      .filter((d) => !isNaN(d.getTime()))
      .map((d) => d.toISOString()),
    ...overrides,
  });

// ---------------------------------------------------------------------------
// Property 1: Tagline tidak melebihi batas karakter
// Validates: Requirements 1.3
// ---------------------------------------------------------------------------

describe('Property 1: Tagline tidak melebihi batas karakter', () => {
  // Feature: portfolio-website, Property 1: Tagline tidak melebihi batas karakter
  it('tagline data owner aktual tidak melebihi 160 karakter', () => {
    // Validates: Requirements 1.3
    expect(owner.tagline.length).toBeLessThanOrEqual(160);
  });

  // Feature: portfolio-website, Property 1: Tagline tidak melebihi batas karakter
  it('truncateDescription(tagline, 160) selalu menghasilkan output ≤ 160 karakter untuk sembarang string', () => {
    // Validates: Requirements 1.3
    fc.assert(
      fc.property(fc.string(), (tagline) => {
        const result = truncateDescription(tagline, 160);
        return result.length <= 160;
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 2: Preview proyek tidak melebihi 6 item
// Validates: Requirements 1.5
// ---------------------------------------------------------------------------

describe('Property 2: Preview proyek tidak melebihi 6 item', () => {
  // Feature: portfolio-website, Property 2: Preview proyek tidak melebihi 6 item
  it('getProjectPreviews selalu mengembalikan maksimal 6 item untuk sembarang daftar proyek', () => {
    // Validates: Requirements 1.5
    fc.assert(
      fc.property(fc.array(arbitraryProject()), (projects) => {
        const previews = getProjectPreviews(projects);
        return previews.length <= 6;
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 7: Deskripsi singkat proyek tidak melebihi batas karakter
// Validates: Requirements 4.1
// ---------------------------------------------------------------------------

describe('Property 7: Deskripsi singkat proyek tidak melebihi batas karakter', () => {
  // Feature: portfolio-website, Property 7: Deskripsi singkat proyek tidak melebihi batas karakter
  it('truncateDescription(text, 150) selalu menghasilkan output ≤ 150 karakter untuk sembarang string', () => {
    // Validates: Requirements 4.1
    fc.assert(
      fc.property(fc.string(), (text) => {
        const result = truncateDescription(text, 150);
        return result.length <= 150;
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 10: Proyek tanpa gambar selalu mendapat URL placeholder yang valid
// Validates: Requirements 4.2
// ---------------------------------------------------------------------------

describe('Property 10: Proyek tanpa gambar selalu mendapat URL placeholder yang valid', () => {
  // Feature: portfolio-website, Property 10: Proyek tanpa gambar selalu mendapat URL placeholder yang valid
  it('resolveProjectImage mengembalikan string non-kosong untuk proyek dengan previewImageUrl null', () => {
    // Validates: Requirements 4.2
    fc.assert(
      fc.property(
        arbitraryProject({ previewImageUrl: fc.constant(null) }),
        (project) => {
          const result = resolveProjectImage(project);
          return typeof result === 'string' && result.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});
