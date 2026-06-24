'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Certificate } from '@/types/certificate';
import { useState } from 'react';

interface CertificateCardProps {
  certificate: Certificate;
  onClick: (cert: Certificate) => void;
}

export default function CertificateCard({ certificate, onClick }: CertificateCardProps) {
  // If image is a full URL, use it; otherwise, try to construct it or use placeholder
  const getInitialImage = () => {
    if (certificate.image_url?.startsWith('http')) return certificate.image_url;
    if (certificate.image_url?.startsWith('/')) return certificate.image_url; // Local path or relative
    return certificate.image_url || '';
  };

  const [imgSrc, setImgSrc] = useState(getInitialImage());

  return (
    <motion.div
      className="relative w-[320px] h-[220px] mx-5 cursor-pointer group border-4 border-black dark:border-white bg-white dark:bg-black shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,1)] transition-all duration-300 hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_rgba(0,0,0,1)] dark:hover:shadow-[16px_16px_0px_rgba(255,255,255,1)]"
      onClick={() => onClick(certificate)}
      role="button"
      tabIndex={0}
      aria-label={`View ${certificate.name} certificate`}
      aria-haspopup="dialog"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(certificate);
        }
      }}
    >
      <div className="relative w-full h-full bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <Image
          src={imgSrc}
          alt={certificate.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgSrc('https://placehold.co/600x400?text=Certificate')}
          sizes="(max-width: 768px) 320px, 350px"
        />
        
        {/* Harsh Overlay instead of soft gradient */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 z-10" />
      </div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-[#CCFF00] p-3 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
           <span className="px-2 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest border-2 border-black mb-2 inline-block">
             {certificate.issuer}
           </span>
           <h3 className="text-black font-black text-sm uppercase leading-tight line-clamp-2">{certificate.name}</h3>
           <div className="flex items-center gap-2 text-black text-[10px] mt-2 font-black uppercase tracking-wider">
             Click to Verify <span className="text-base">→</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
