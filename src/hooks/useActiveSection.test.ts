/**
 * Unit tests untuk useActiveSection hook
 *
 * Memverifikasi perilaku hook dalam mendeteksi section aktif menggunakan
 * IntersectionObserver, termasuk default ke section pertama dan pembaruan
 * saat section baru masuk ke viewport.
 *
 * Requirements: 2.7
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useActiveSection } from './useActiveSection';

// ---------------------------------------------------------------------------
// Mock IntersectionObserver
// ---------------------------------------------------------------------------

type IntersectionObserverCallback = (entries: IntersectionObserverEntry[]) => void;

let observerCallback: IntersectionObserverCallback | null = null;
const observedElements: Element[] = [];
let disconnectMock: ReturnType<typeof vi.fn>;
let observeMock: ReturnType<typeof vi.fn>;

function setupIntersectionObserverMock() {
  disconnectMock = vi.fn();
  observeMock = vi.fn((element: Element) => {
    observedElements.push(element);
  });

  class MockIntersectionObserver {
    constructor(callback: IntersectionObserverCallback) {
      observerCallback = callback;
    }
    observe = observeMock;
    unobserve = vi.fn();
    disconnect = disconnectMock;
  }

  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
}

// Helper untuk mensimulasikan section yang masuk ke viewport
function triggerIntersection(elementId: string, ratio: number) {
  const element = document.getElementById(elementId);
  if (!element || !observerCallback) return;

  observerCallback([
    {
      target: element,
      intersectionRatio: ratio,
      isIntersecting: ratio > 0,
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRect: element.getBoundingClientRect(),
      rootBounds: null,
      time: Date.now(),
    } as IntersectionObserverEntry,
  ]);
}

// ---------------------------------------------------------------------------
// Setup dan teardown
// ---------------------------------------------------------------------------

const SECTION_IDS = ['beranda', 'tentang', 'proyek', 'pengalaman', 'keahlian', 'kontak'];

beforeEach(() => {
  // Reset state
  observerCallback = null;
  observedElements.length = 0;

  // Pasang mock IntersectionObserver
  setupIntersectionObserverMock();

  // Buat elemen DOM untuk setiap section
  SECTION_IDS.forEach((id) => {
    const el = document.createElement('section');
    el.id = id;
    document.body.appendChild(el);
  });
});

afterEach(() => {
  // Hapus elemen DOM
  SECTION_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) document.body.removeChild(el);
  });

  vi.unstubAllGlobals();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useActiveSection', () => {
  // -------------------------------------------------------------------------
  // Nilai default
  // -------------------------------------------------------------------------

  it('mengembalikan section pertama sebagai default', () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));

    expect(result.current).toBe('beranda');
  });

  it('mengembalikan string kosong jika sectionIds kosong', () => {
    const { result } = renderHook(() => useActiveSection([]));

    expect(result.current).toBe('');
  });

  it('mengembalikan section pertama dari array yang diberikan', () => {
    const { result } = renderHook(() => useActiveSection(['tentang', 'proyek']));

    expect(result.current).toBe('tentang');
  });

  // -------------------------------------------------------------------------
  // IntersectionObserver setup
  // -------------------------------------------------------------------------

  it('membuat IntersectionObserver saat mount', () => {
    renderHook(() => useActiveSection(SECTION_IDS));

    // observerCallback akan di-set saat IntersectionObserver dibuat
    expect(observerCallback).not.toBeNull();
  });

  it('mengamati semua elemen section yang ada di DOM', () => {
    renderHook(() => useActiveSection(SECTION_IDS));

    expect(observeMock).toHaveBeenCalledTimes(SECTION_IDS.length);
  });

  it('memanggil disconnect saat unmount', () => {
    const { unmount } = renderHook(() => useActiveSection(SECTION_IDS));

    unmount();

    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  // -------------------------------------------------------------------------
  // Pembaruan section aktif
  // -------------------------------------------------------------------------

  it('memperbarui activeSection saat section masuk ke viewport', () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));

    act(() => {
      triggerIntersection('tentang', 0.8);
    });

    expect(result.current).toBe('tentang');
  });

  it('memperbarui ke section dengan rasio visibilitas tertinggi', () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));

    act(() => {
      // Simulasikan dua section terlihat sekaligus, 'proyek' lebih terlihat
      triggerIntersection('tentang', 0.3);
    });
    act(() => {
      triggerIntersection('proyek', 0.7);
    });

    expect(result.current).toBe('proyek');
  });

  it('mempertahankan section aktif saat tidak ada section yang terlihat', () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));

    // Aktifkan 'tentang' terlebih dahulu
    act(() => {
      triggerIntersection('tentang', 0.5);
    });

    expect(result.current).toBe('tentang');

    // Semua section keluar dari viewport (ratio 0)
    act(() => {
      triggerIntersection('tentang', 0);
    });

    // Harus tetap 'tentang', bukan kembali ke default
    expect(result.current).toBe('tentang');
  });

  it('dapat beralih antar section saat pengguna menggulir', () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));

    act(() => {
      triggerIntersection('beranda', 0.9);
    });
    expect(result.current).toBe('beranda');

    // Saat menggulir ke bawah: beranda keluar, tentang masuk
    act(() => {
      triggerIntersection('beranda', 0);
      triggerIntersection('tentang', 0.8);
    });
    expect(result.current).toBe('tentang');

    // Saat menggulir lebih jauh: tentang keluar, proyek masuk
    act(() => {
      triggerIntersection('tentang', 0);
      triggerIntersection('proyek', 0.9);
    });
    expect(result.current).toBe('proyek');
  });

  // -------------------------------------------------------------------------
  // Kasus tepi
  // -------------------------------------------------------------------------

  it('tidak mengamati elemen yang tidak ada di DOM', () => {
    // Hanya 'beranda' yang ada di DOM untuk test ini
    const extraIds = ['beranda', 'tidak-ada-di-dom'];

    renderHook(() => useActiveSection(extraIds));

    // Hanya 1 elemen yang diamati (yang ada di DOM)
    expect(observeMock).toHaveBeenCalledTimes(1);
  });

  it('mengembalikan tipe string', () => {
    const { result } = renderHook(() => useActiveSection(SECTION_IDS));

    expect(typeof result.current).toBe('string');
  });
});
