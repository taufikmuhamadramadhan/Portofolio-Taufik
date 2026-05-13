import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactForm } from './ContactForm';
import { sendContactEmail } from '../../services/emailService';

vi.mock('../../services/emailService', () => ({
  sendContactEmail: vi.fn(),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('menampilkan pesan error Zod ketika disubmit kosong', async () => {
    render(<ContactForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /kirim pesan/i }));

    await waitFor(() => {
      expect(screen.getByText('Nama wajib diisi')).toBeInTheDocument();
      expect(screen.getByText('Email wajib diisi')).toBeInTheDocument();
      expect(screen.getByText('Subjek wajib diisi')).toBeInTheDocument();
      expect(screen.getByText('Pesan wajib diisi')).toBeInTheDocument();
    });
    
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it('menampilkan pesan sukses setelah submit valid', async () => {
    (sendContactEmail as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
    
    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/nama lengkap/i), { target: { value: 'Budi Test' } });
    fireEvent.change(screen.getByLabelText(/alamat email/i), { target: { value: 'budi@test.com' } });
    fireEvent.change(screen.getByLabelText(/subjek/i), { target: { value: 'Tawaran Kerja' } });
    fireEvent.change(screen.getByLabelText(/pesan/i), { target: { value: 'Halo, saya ingin bekerja sama.' } });
    
    fireEvent.click(screen.getByRole('button', { name: /kirim pesan/i }));

    // Expect loading state temporarily (if possible to catch, or just wait for success)
    await waitFor(() => {
      expect(screen.getByText(/pesan anda telah berhasil dikirim/i)).toBeInTheDocument();
    });
    
    expect(sendContactEmail).toHaveBeenCalledWith({
      name: 'Budi Test',
      email: 'budi@test.com',
      subject: 'Tawaran Kerja',
      message: 'Halo, saya ingin bekerja sama.'
    });
  });

  it('menampilkan pesan error dari server ketika pengiriman gagal', async () => {
    (sendContactEmail as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Koneksi terputus.'));
    
    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/nama lengkap/i), { target: { value: 'Budi Test' } });
    fireEvent.change(screen.getByLabelText(/alamat email/i), { target: { value: 'budi@test.com' } });
    fireEvent.change(screen.getByLabelText(/subjek/i), { target: { value: 'Tawaran Kerja' } });
    fireEvent.change(screen.getByLabelText(/pesan/i), { target: { value: 'Halo.' } });
    
    fireEvent.click(screen.getByRole('button', { name: /kirim pesan/i }));

    await waitFor(() => {
      expect(screen.getByText(/koneksi terputus/i)).toBeInTheDocument();
    });
  });
});
