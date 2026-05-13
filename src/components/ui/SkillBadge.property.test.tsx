import { render, cleanup } from '@testing-library/react';
import { describe, it, afterEach } from 'vitest';
import fc from 'fast-check';
import { SkillBadge } from './SkillBadge';
import type { TechnicalSkill, SoftSkill, ProficiencyLevel, SkillCategory } from '../../types';

describe('SkillBadge Property Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // Feature: portfolio-website, Property 11: Keahlian teknis selalu memiliki indikator proficiency yang valid
  it('TechnicalSkill selalu merender indikator proficiency yang valid jika showProficiency=true', () => {
    // Validates: Requirements 6.2
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          name: fc.string({ minLength: 1 }),
          category: fc.constantFrom<SkillCategory>('Bahasa Pemrograman', 'Framework', 'Alat'),
          proficiency: fc.constantFrom<ProficiencyLevel>('Pemula', 'Menengah', 'Mahir'),
          iconName: fc.option(fc.string(), { nil: null })
        }),
        (skill: TechnicalSkill) => {
          const { container } = render(<SkillBadge skill={skill} showProficiency={true} />);
          
          // Proficiency should be rendered text
          const hasProficiency = container.textContent?.includes(skill.proficiency);
          
          cleanup();
          return hasProficiency === true;
        }
      ),
      { numRuns: 50 }
    );
  });

  // Feature: portfolio-website, Property 12: Keahlian tanpa ikon selalu mendapat ikon generik
  it('TechnicalSkill tanpa ikon merender ikon generik (svg present)', () => {
    // Validates: Requirements 6.3
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          name: fc.string({ minLength: 1 }),
          category: fc.constantFrom<SkillCategory>('Bahasa Pemrograman', 'Framework', 'Alat'),
          proficiency: fc.constantFrom<ProficiencyLevel>('Pemula', 'Menengah', 'Mahir'),
          iconName: fc.constant(null)
        }),
        (skill: TechnicalSkill) => {
          const { container } = render(<SkillBadge skill={skill} showProficiency={true} />);
          
          // Should render an SVG (the generic FaCode icon)
          const hasSvg = container.querySelector('svg') !== null;
          
          cleanup();
          return hasSvg === true;
        }
      ),
      { numRuns: 50 }
    );
  });

  // Feature: portfolio-website, Property 13: Soft skills tidak pernah menampilkan indikator proficiency
  it('SoftSkill tidak pernah merender indikator proficiency (Pemula, Menengah, Mahir)', () => {
    // Validates: Requirements 6.4
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          name: fc.string({ minLength: 1 })
        }),
        (skill: SoftSkill) => {
          const { container } = render(<SkillBadge skill={skill} showProficiency={true} />); // Even if true, should not render
          
          const text = container.textContent || '';
          const hasProficiency = text.includes('Pemula') || text.includes('Menengah') || text.includes('Mahir');
          
          cleanup();
          return !hasProficiency;
        }
      ),
      { numRuns: 50 }
    );
  });
});
