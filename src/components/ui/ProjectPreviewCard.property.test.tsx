import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, afterEach } from 'vitest';
import fc from 'fast-check';
import { ProjectPreviewCard } from './ProjectPreviewCard';

// Arbitrary project for testing
const arbitraryProject = () =>
  fc.record({
    id: fc.string({ minLength: 1, maxLength: 36 }),
    title: fc.string({ minLength: 1, maxLength: 100 }),
    shortDescription: fc.string({ minLength: 0, maxLength: 300 }),
    longDescription: fc.string({ minLength: 0, maxLength: 1200 }),
    technologies: fc.array(fc.string({ minLength: 1, maxLength: 50 })),
    role: fc.string({ minLength: 1, maxLength: 100 }),
    contributions: fc.array(fc.string({ minLength: 1, maxLength: 200 }), { maxLength: 10 }),
    challenges: fc.string({ minLength: 0, maxLength: 500 }),
    previewImageUrl: fc.option(fc.webUrl(), { nil: null }),
    repositoryUrl: fc.option(fc.webUrl(), { nil: null }),
    demoUrl: fc.option(fc.webUrl(), { nil: null }),
    createdAt: fc
      .date({ min: new Date('2000-01-01'), max: new Date('2030-12-31') })
      .filter((d) => !isNaN(d.getTime()))
      .map((d) => d.toISOString()),
  });

describe('Property 14: Gambar informatif selalu memiliki alt text yang tidak kosong', () => {
  afterEach(() => {
    cleanup();
  });

  // Feature: portfolio-website, Property 14: Gambar informatif selalu memiliki alt text yang tidak kosong
  it('ProjectPreviewCard selalu merender gambar informatif dengan atribut alt yang tidak kosong', () => {
    // Validates: Requirements 8.3
    fc.assert(
      fc.property(arbitraryProject(), (project) => {
        render(<ProjectPreviewCard project={project} />);
        
        const images = screen.getAllByRole('img');
        
        // Ensure at least one image exists (the preview)
        if (images.length === 0) return false;
        
        // Check that every image has a non-empty alt text
        const allValid = images.every((img) => {
          const alt = img.getAttribute('alt');
          return alt !== null && alt.trim().length > 0;
        });
        
        cleanup();
        return allValid;
      }),
      { numRuns: 50 } // Reducing runs slightly for DOM rendering performance
    );
  });
});
