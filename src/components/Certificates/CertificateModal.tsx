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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-[#0F1117] border-4 border-black dark:border-white shadow-[16px_16px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_rgba(255,255,255,1)] max-w-3xl w-full max-h-[90vh] flex flex-col relative"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 md:p-6 border-b-4 border-black dark:border-white bg-[#CCFF00] dark:bg-[#2B5CE6]">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-black dark:text-white uppercase tracking-tight">
                  {certificate.name}
                </h3>
                <p className="text-black dark:text-white text-xs font-black uppercase mt-1">
                  Issued by <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 ml-1 inline-block">{certificate.issuer}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 border-2 border-black dark:border-white bg-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,1)]"
              >
                <FaTimes className="text-current" />
              </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F5F0E8] dark:bg-black flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] border-4 border-black dark:border-white bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.2)]">
                <Image
                  src={certificate.image_url}
                  alt={certificate.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* Footer */}
            {certificate.certificate_url && (
              <div className="p-4 md:p-6 border-t-4 border-black dark:border-white bg-white dark:bg-[#0F1117] flex justify-end">
                <a
                  href={certificate.certificate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#FF4D00] text-black font-black uppercase tracking-widest border-2 border-black hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_rgba(255,255,255,1)] transition-all"
                >
                  <span>Verify Credential</span>
                  <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
