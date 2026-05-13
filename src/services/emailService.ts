/**
 * Email Service — Layanan pengiriman email via EmailJS
 *
 * Menyediakan fungsi untuk mengirim pesan dari formulir kontak
 * menggunakan layanan EmailJS tanpa memerlukan backend server.
 *
 * Requirements: 7.4, 7.5, 7.6
 */

import emailjs from 'emailjs-com';
import type { ContactFormData } from '../types';

/**
 * ID layanan EmailJS. Ganti dengan Service ID dari dashboard EmailJS Anda.
 * @see https://dashboard.emailjs.com/admin
 */
const SERVICE_ID = 'YOUR_SERVICE_ID';

/**
 * ID template EmailJS. Ganti dengan Template ID dari dashboard EmailJS Anda.
 * @see https://dashboard.emailjs.com/admin/templates
 */
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

/**
 * Public Key (User ID) EmailJS. Ganti dengan Public Key dari akun EmailJS Anda.
 * @see https://dashboard.emailjs.com/admin/account
 */
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

/**
 * Mengirim pesan kontak menggunakan EmailJS.
 *
 * Memetakan data formulir ke parameter template EmailJS:
 * - `from_name`  → nama pengirim
 * - `from_email` → alamat email pengirim
 * - `subject`    → subjek pesan
 * - `message`    → isi pesan
 *
 * @param data - Data formulir kontak yang telah divalidasi
 * @throws {Error} Melempar error dengan pesan "Pengiriman gagal. Silakan coba kembali."
 *                 jika terjadi kesalahan jaringan atau server (Req 7.6)
 */
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  } catch {
    throw new Error('Pengiriman gagal. Silakan coba kembali.');
  }
}
