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
    <section id="certificates" className="py-20 md:py-32 relative overflow-hidden bg-white dark:bg-[#1a1c23] border-b-4 border-black dark:border-white transition-colors duration-150">

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-24"
          variants={entryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-block bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.5em] text-[10px] md:text-[12px] mb-6 px-4 py-2 border-2 border-transparent shadow-[4px_4px_0px_rgba(255,255,255,0.5)] dark:shadow-[4px_4px_0px_rgba(0,0,0,1)]">Proven Skills</span>
          <h2 className="text-5xl md:text-8xl font-black mb-8 text-black dark:text-white tracking-tighter leading-[0.9] uppercase drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)] dark:drop-shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">
            My <br className="md:hidden" /> <span className="text-[#2B5CE6]">Certifications</span>
          </h2>
          <div className="max-w-2xl mx-auto text-black dark:text-white text-base md:text-lg font-bold leading-relaxed p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-[#FF4D00]">
            Investasi terbaik adalah pada diri sendiri. Berikut adalah validasi hasil belajar 
            saya dari berbagai institusi teknologi ternama.
          </div>
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
