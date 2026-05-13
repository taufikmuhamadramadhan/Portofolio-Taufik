import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectCard } from './ProjectCard';
import type { Project } from '../../types';

const mockProject: Project = {
  id: 'p1',
  title: 'Test Project',
  shortDescription: 'Short desc',
  longDescription: 'Long desc',
  technologies: ['React', 'Jest'],
  role: 'Dev',
  contributions: ['Did X'],
  challenges: 'None',
  previewImageUrl: '/test.jpg',
  repositoryUrl: 'https://github.com/test',
  demoUrl: 'https://demo.com',
  createdAt: '2024-01-01'
};

describe('ProjectCard', () => {
  it('merender dengan semua detail yang benar', () => {
    const onClick = vi.fn();
    render(<ProjectCard project={mockProject} onClick={onClick} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Short desc')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Jest')).toBeInTheDocument();
    
    // Check links
    const repoLink = screen.getByLabelText(/repositori/i);
    expect(repoLink).toHaveAttribute('href', 'https://github.com/test');
    
    const demoLink = screen.getByLabelText(/demo/i);
    expect(demoLink).toHaveAttribute('href', 'https://demo.com');
  });

  it('memanggil onClick saat diklik', () => {
    const onClick = vi.fn();
    render(<ProjectCard project={mockProject} onClick={onClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith(mockProject);
  });
  
  it('dapat dipicu menggunakan keyboard', () => {
    const onClick = vi.fn();
    render(<ProjectCard project={mockProject} onClick={onClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });
    
    expect(onClick).toHaveBeenCalledWith(mockProject);
  });
});
