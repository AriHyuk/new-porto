'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Certificate } from '@/types/certificate';
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col relative"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {certificate.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Issued by <span className="text-blue-600 font-medium">{certificate.issuer}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <FaTimes className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
                <Image
                  src={`https://admin-panel.oktovet.store/api/certificates/${certificate.image}`}
                  alt={certificate.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-end">
              <a
                href={certificate.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
              >
                <span>Verify Credential</span>
                <FaExternalLinkAlt className="text-sm" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
