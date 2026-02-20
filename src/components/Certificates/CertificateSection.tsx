'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Certificate } from '@/types/certificate';
import { entryVariants } from '@/utils/animation';

const CertificateSlider = dynamic(() => import('./CertificateSlider'), {
  loading: () => <div className="w-full h-40 bg-shimmer rounded-xl" />,
  ssr: false
});

const CertificateModal = dynamic(() => import('./CertificateModal'), {
  ssr: false
});

interface CertificateSectionProps {
  certificates: Certificate[];
}

export default function CertificateSection({ certificates }: CertificateSectionProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Split certificates into two rows for variety
  const midPoint = Math.ceil(certificates.length / 2);
  const row1 = certificates.slice(0, midPoint);
  const row2 = certificates.slice(midPoint);

  return (
    <section id="certificates" className="py-32 relative overflow-hidden bg-white dark:bg-[#050608]">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-24"
          variants={entryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Proven Skills</span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent tracking-tighter">
            My Certifications
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-10 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
          <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed">
            Investasi terbaik adalah pada diri sendiri. Berikut adalah validasi hasil belajar 
            saya dari berbagai institusi teknologi ternama.
          </p>
        </motion.div>

        <div className="space-y-8">
          <CertificateSlider 
            certificates={row1.length > 0 ? row1 : certificates} // Fallback to all if split empty
            direction="left" 
            speed={40} 
            onCardClick={setSelectedCert} 
          />
          
          {row2.length > 0 && (
            <CertificateSlider 
              certificates={row2} 
              direction="right" 
              speed={50} 
              onCardClick={setSelectedCert} 
            />
          )}
        </div>
      </div>

      <CertificateModal 
        certificate={selectedCert} 
        onClose={() => setSelectedCert(null)} 
      />
    </section>
  );
}
