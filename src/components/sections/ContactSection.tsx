import React from 'react';
import { motion } from 'framer-motion';
import { owner } from '../../data/owner';
import { ContactForm } from '../ui/ContactForm';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export const ContactSection: React.FC = () => {
  return (
    <section id="kontak" className="py-20 bg-gray-50/50 dark:bg-gray-900/30 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-mono">
              <span className="text-blue-500">$&gt;</span> ./send_message.sh
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Punya proyek, peluang kerja sama, atau sekadar ingin menyapa? Silakan isi formulir di bawah ini.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Info */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Mari Terhubung
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Saya selalu terbuka untuk mendiskusikan pekerjaan pengembangan web atau peluang kolaborasi lainnya.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                  <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full text-blue-600 dark:text-blue-400 shadow-sm">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                    <a href={`mailto:${owner.email}`} className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {owner.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                  <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full text-blue-600 dark:text-blue-400 shadow-sm">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Lokasi</h4>
                    <p className="text-lg font-medium">Remote / Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
