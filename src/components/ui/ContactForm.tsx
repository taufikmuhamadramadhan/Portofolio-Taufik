import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '../../utils/validation';
import { sendContactEmail } from '../../services/emailService';
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface ContactFormProps {
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: string) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmitSuccess, onSubmitError }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage(null);

    try {
      await sendContactEmail(data);
      setSubmitStatus('success');
      reset(); // Mengosongkan form
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      setSubmitStatus('error');
      const msg = error instanceof Error ? error.message : 'Pengiriman gagal. Silakan coba kembali.';
      setErrorMessage(msg);
      if (onSubmitError) onSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="Contoh: John Doe"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <FaExclamationCircle /> {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Alamat Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="Contoh: john@domain.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <FaExclamationCircle /> {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subjek <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            type="text"
            {...register('subject')}
            className={`w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700'
            }`}
            placeholder="Contoh: Tawaran Kerja Sama"
            disabled={isSubmitting}
          />
          {errors.subject && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              <FaExclamationCircle /> {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pesan <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={5}
            className={`w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
              errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700'
            }`}
            placeholder="Tulis pesan Anda di sini..."
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              <FaExclamationCircle /> {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Status Alerts */}
        {submitStatus === 'success' && (
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-start gap-3">
            <FaCheckCircle className="mt-0.5 flex-shrink-0 text-lg" />
            <p>Pesan Anda telah berhasil dikirim! Saya akan segera menghubungi Anda.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 flex items-start gap-3">
            <FaExclamationCircle className="mt-0.5 flex-shrink-0 text-lg" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg dark:hover:shadow-neon-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Mengirim...</span>
            </>
          ) : (
            <>
              <FaPaperPlane />
              <span>Kirim Pesan</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
