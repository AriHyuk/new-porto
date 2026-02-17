'use client';

import { motion } from 'framer-motion';
import { Certificate } from '@/types/certificate';
import CertificateCard from './CertificateCard';

interface CertificateSliderProps {
  certificates: Certificate[];
  direction?: 'left' | 'right';
  speed?: number;
  onCardClick: (cert: Certificate) => void;
}

export default function CertificateSlider({ 
  certificates, 
  direction = 'left', 
  speed = 20,
  onCardClick 
}: CertificateSliderProps) {
  // Seamless loop by duplicating content
  const duplicatedCertificates = [...certificates, ...certificates, ...certificates];

  return (
    <div className="overflow-hidden flex w-full my-8">
      <motion.div
        className="flex"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {duplicatedCertificates.map((cert, index) => (
          <CertificateCard 
            key={`${cert.id}-${index}`} 
            certificate={cert} 
            onClick={onCardClick}
          />
        ))}
      </motion.div>
    </div>
  );
}
