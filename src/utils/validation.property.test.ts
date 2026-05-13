import { describe, it } from 'vitest';
import fc from 'fast-check';
import { contactSchema } from './validation';

// ---------------------------------------------------------------------------
// Property 3: Validasi formulir menolak input kosong atau hanya whitespace
// Validates: Requirements 7.1, 7.2
// ---------------------------------------------------------------------------
describe('Property 3: Validasi formulir menolak input kosong atau hanya whitespace', () => {
  // Feature: portfolio-website, Property 3: Validasi formulir menolak input kosong atau hanya whitespace
  it('semua kombinasi di mana setidaknya satu kolom wajib kosong atau whitespace akan ditolak', () => {
    const whitespaceStr = fc.array(fc.constantFrom(' ', '\t', '\n', '\r'), { minLength: 1 }).map(arr => arr.join(''));
    const validName = fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0);
    
    // Generate valid email that Zod's regex will definitely accept
    const validEmail = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).map(s => s.replace(/[^a-zA-Z0-9]/g, 'a') || 'a'),
      fc.string({ minLength: 1, maxLength: 20 }).map(s => s.replace(/[^a-zA-Z0-9]/g, 'a') || 'a'),
      fc.constantFrom('com', 'org', 'net')
    ).map(([u, d, tld]) => `${u}@${d}.${tld}`);

    const validSubject = fc.string({ minLength: 1, maxLength: 150 }).filter(s => s.trim().length > 0);
    const validMessage = fc.string({ minLength: 1, maxLength: 2000 }).filter(s => s.trim().length > 0);

    fc.assert(
      fc.property(
        validName, validEmail, validSubject, validMessage,
        whitespaceStr, whitespaceStr, whitespaceStr, whitespaceStr,
        fc.integer({ min: 1, max: 15 }), // 1 to 15 (at least one field masked with whitespace)
        (name, email, subj, msg, ws1, ws2, ws3, ws4, mask) => {
          const data = {
            name: mask & 1 ? ws1 : name,
            email: mask & 2 ? ws2 : email,
            subject: mask & 4 ? ws3 : subj,
            message: mask & 8 ? ws4 : msg,
          };

          const result = contactSchema.safeParse(data);
          if (result.success) return false;
          
          let validErrors = true;
          if (mask & 1) validErrors = validErrors && result.error.issues.some(i => i.path.includes('name'));
          if (mask & 2) validErrors = validErrors && result.error.issues.some(i => i.path.includes('email'));
          if (mask & 4) validErrors = validErrors && result.error.issues.some(i => i.path.includes('subject'));
          if (mask & 8) validErrors = validErrors && result.error.issues.some(i => i.path.includes('message'));
          
          return validErrors;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 4: Validasi email konsisten terhadap format valid dan tidak valid
// Validates: Requirements 7.3
// ---------------------------------------------------------------------------
describe('Property 4: Validasi email konsisten terhadap format valid dan tidak valid', () => {
  // Feature: portfolio-website, Property 4: Validasi email konsisten terhadap format valid dan tidak valid
  it('menerima email yang valid dan menolak email yang tidak valid dengan pesan error spesifik', () => {
    const validEmail = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).map(s => s.replace(/[^a-zA-Z0-9]/g, 'a') || 'a'),
      fc.string({ minLength: 1, maxLength: 20 }).map(s => s.replace(/[^a-zA-Z0-9]/g, 'a') || 'a'),
      fc.constantFrom('com', 'org', 'net')
    ).map(([u, d, tld]) => `${u}@${d}.${tld}`);

    // Valid emails should pass email format validation (assuming other fields valid)
    fc.assert(
      fc.property(
        validEmail,
        (email) => {
          const validData = {
            name: "Valid Name",
            email: email,
            subject: "Valid Subject",
            message: "Valid message content"
          };
          const result = contactSchema.safeParse(validData);
          return result.success;
        }
      ),
      { numRuns: 100 }
    );
    
    // Invalid emails must have specific error message
    fc.assert(
      fc.property(
        fc.string().filter(s => (!s.includes('@') || s.includes(' ')) && s.trim().length > 0),
        (invalidEmail) => {
          const invalidData = {
            name: "Valid Name",
            email: invalidEmail,
            subject: "Valid Subject",
            message: "Valid message content"
          };
          const result = contactSchema.safeParse(invalidData);
          
          if (result.success) return false;
          
          const emailIssue = result.error.issues.find(i => i.path.includes('email'));
          return emailIssue !== undefined && emailIssue.message === "Format email tidak valid. Contoh: nama@domain.com";
        }
      ),
      { numRuns: 100 }
    );
  });
});
