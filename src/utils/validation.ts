import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi").max(100, "Nama maksimal 100 karakter"),
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi")
    .max(254)
    .email("Format email tidak valid. Contoh: nama@domain.com"),
  subject: z.string().trim().min(1, "Subjek wajib diisi").max(150, "Subjek maksimal 150 karakter"),
  message: z.string().trim().min(1, "Pesan wajib diisi").max(2000, "Pesan maksimal 2000 karakter"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
