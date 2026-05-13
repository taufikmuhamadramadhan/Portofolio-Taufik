import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from './Navbar';
import type { NavSection } from '../../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SECTIONS: NavSection[] = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'proyek', label: 'Proyek' },
  { id: 'pengalaman', label: 'Pengalaman' },
  { id: 'keahlian', label: 'Keahlian' },
  { id: 'kontak', label: 'Kontak' },
];

function renderNavbar(activeSection = 'beranda', themeToggleSlot?: React.ReactNode) {
  return render(
    <Navbar sections={SECTIONS} activeSection={activeSection} themeToggleSlot={themeToggleSlot} />
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Navbar', () => {
  describe('Render tautan navigasi (Requirement 2.1)', () => {
    it('menampilkan semua label section di desktop', () => {
      renderNavbar();
      // Each label appears at least once (desktop + potentially mobile)
      for (const section of SECTIONS) {
        expect(screen.getAllByText(section.label).length).toBeGreaterThanOrEqual(1);
      }
    });

    it('merender elemen <nav> dengan role navigation', () => {
      renderNavbar();
      expect(screen.getByRole('navigation', { name: 'Navigasi utama' })).toBeInTheDocument();
    });
  });

  describe('Active state (Requirement 2.7)', () => {
    it('menandai tautan aktif dengan aria-current="page"', () => {
      renderNavbar('proyek');
      // The desktop button for "Proyek" should have aria-current="page"
      const activeButtons = screen.getAllByRole('button', { name: 'Proyek' });
      // At least one button (desktop) should have aria-current
      const hasActiveCurrent = activeButtons.some(
        (btn) => btn.getAttribute('aria-current') === 'page'
      );
      expect(hasActiveCurrent).toBe(true);
    });

    it('tautan tidak aktif tidak memiliki aria-current', () => {
      renderNavbar('beranda');
      const tentangButtons = screen.getAllByRole('button', { name: 'Tentang' });
      tentangButtons.forEach((btn) => {
        expect(btn).not.toHaveAttribute('aria-current');
      });
    });
  });

  describe('Hamburger menu (Requirement 2.3, 2.4)', () => {
    it('menampilkan tombol hamburger', () => {
      renderNavbar();
      expect(screen.getByRole('button', { name: 'Buka menu' })).toBeInTheDocument();
    });

    it('membuka mobile menu saat hamburger diklik', () => {
      renderNavbar();
      const hamburger = screen.getByRole('button', { name: 'Buka menu' });
      fireEvent.click(hamburger);
      expect(screen.getByRole('menu', { name: 'Menu navigasi mobile' })).toBeInTheDocument();
    });

    it('menutup mobile menu saat hamburger diklik lagi', () => {
      renderNavbar();
      const hamburger = screen.getByRole('button', { name: 'Buka menu' });
      fireEvent.click(hamburger);
      // Menu is open — button label changes
      expect(screen.getByRole('button', { name: 'Tutup menu' })).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'Tutup menu' }));
      expect(screen.queryByRole('menu', { name: 'Menu navigasi mobile' })).not.toBeInTheDocument();
    });

    it('mobile menu menampilkan semua tautan secara vertikal', () => {
      renderNavbar();
      fireEvent.click(screen.getByRole('button', { name: 'Buka menu' }));
      const menu = screen.getByRole('menu', { name: 'Menu navigasi mobile' });
      for (const section of SECTIONS) {
        expect(menu).toHaveTextContent(section.label);
      }
    });
  });

  describe('Smooth scroll dan tutup menu (Requirement 2.2, 2.5)', () => {
    beforeEach(() => {
      // Mock scrollIntoView for jsdom
      window.HTMLElement.prototype.scrollIntoView = vi.fn();
    });

    it('memanggil scrollIntoView saat tautan desktop diklik', () => {
      // Create a mock DOM element for the section
      const el = document.createElement('div');
      el.id = 'tentang';
      document.body.appendChild(el);

      renderNavbar();
      fireEvent.click(screen.getAllByRole('button', { name: 'Tentang' })[0]);

      expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
      document.body.removeChild(el);
    });

    it('menutup mobile menu setelah tautan diklik', () => {
      renderNavbar();
      // Open mobile menu
      fireEvent.click(screen.getByRole('button', { name: 'Buka menu' }));
      expect(screen.getByRole('menu', { name: 'Menu navigasi mobile' })).toBeInTheDocument();

      // Click a link inside the mobile menu
      const menuItems = screen.getAllByRole('menuitem');
      fireEvent.click(menuItems[0]);

      // Mobile menu should be closed
      expect(screen.queryByRole('menu', { name: 'Menu navigasi mobile' })).not.toBeInTheDocument();
    });
  });

  describe('ThemeToggle slot (Requirement 2.6)', () => {
    it('merender themeToggleSlot jika diberikan', () => {
      renderNavbar('beranda', <button data-testid="theme-toggle">Toggle</button>);
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });

    it('tidak merender slot jika tidak diberikan', () => {
      renderNavbar();
      expect(screen.queryByTestId('theme-toggle')).not.toBeInTheDocument();
    });
  });
});
