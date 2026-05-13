import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import App from './App';

// Mock IntersectionObserver
const observeMock = vi.fn();
const unobserveMock = vi.fn();
const disconnectMock = vi.fn();

class MockIntersectionObserver {
  observe = observeMock;
  unobserve = unobserveMock;
  disconnect = disconnectMock;
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// Mock matchMedia
vi.stubGlobal('matchMedia', vi.fn(() => ({
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
})));

// Mock scrollTo (used in scrollIntoView)
Element.prototype.scrollIntoView = vi.fn();

describe('App Integration', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('merender semua section utama tanpa error', () => {
    render(<App />);
    
    // Check if main sections are rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    
    // Using test IDs or text content to verify sections
    expect(screen.getAllByText(/Halo, saya/i).length).toBeGreaterThan(0); // Hero
    expect(screen.getAllByText(/Latar Belakang/i).length).toBeGreaterThan(0); // About
    expect(screen.getAllByText(/Karya & Proyek/i).length).toBeGreaterThan(0); // Projects
    expect(screen.getAllByText(/Pengalaman Profesional/i).length).toBeGreaterThan(0); // Experience
    expect(screen.getAllByText(/Keahlian Lunak/i).length).toBeGreaterThan(0); // Skills
    expect(screen.getAllByText(/Hubungi Saya/i).length).toBeGreaterThan(0); // Contact
  });

  it('menginisialisasi IntersectionObserver untuk scroll spy', () => {
    render(<App />);
    expect(observeMock).toHaveBeenCalled();
  });
});
