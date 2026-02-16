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
    <section id="certificates" className="py-24 relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={entryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            Certifications
          </h2>
          <div className="w-20 h-1.5 bg-purple-600 mx-auto rounded-full mb-8" />
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            Continuous learning is my passion. Here are some of the professional certifications 
            I've earned to validate my skills and expertise.
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
