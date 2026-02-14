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
  const baseUrl = 'https://admin-panel.oktovet.store/api/certificates';
  const imagePath = certificate.image.startsWith('/') ? certificate.image : `/${certificate.image}`;
  const [imgSrc, setImgSrc] = useState(`${baseUrl}${imagePath}`);

  return (
    <motion.div
      className="relative w-72 h-48 mx-4 rounded-xl overflow-hidden shadow-lg cursor-pointer group border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick(certificate)}
    >
      <Image
        src={imgSrc}
        alt={certificate.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        onError={() => setImgSrc('https://via.placeholder.com/600x400?text=Certificate')}
        unoptimized
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-sm truncate">{certificate.name}</h3>
        <p className="text-gray-300 text-xs truncate">{certificate.issuer}</p>
        <span className="text-blue-400 text-xs mt-1 font-medium">Click to view</span>
      </div>
    </motion.div>
  );
}
