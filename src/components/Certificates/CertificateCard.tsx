'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Certificate } from '@/types/certificate';
import { useState, useRef } from 'react';

interface CertificateCardProps {
  certificate: Certificate;
  onClick: (cert: Certificate) => void;
}

export default function CertificateCard({ certificate, onClick }: CertificateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt State
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 100, damping: 30 });

  // If image is a full URL, use it; otherwise, try to construct it or use placeholder
  const getInitialImage = () => {
    if (certificate.image_url?.startsWith('http')) return certificate.image_url;
    if (certificate.image_url?.startsWith('/')) return certificate.image_url; // Local path or relative
    return certificate.image_url || '';
  };

  const [imgSrc, setImgSrc] = useState(getInitialImage());

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Set for 3D Tilt
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);

    // Set for Spotlight
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="relative w-[320px] h-[220px] mx-5 rounded-2xl overflow-hidden cursor-pointer group border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl transition-all duration-300"
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
      {/* Spotlight Effect */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-20" 
           style={{ 
             background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(168,85,247,0.15), transparent 40%)` 
           }} 
      />

      {/* Glassmorphism Border Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative w-full h-full bg-gray-100/5 dark:bg-gray-800/10">
        <Image
          src={imgSrc}
          alt={certificate.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 z-10"
          onError={() => setImgSrc('https://placehold.co/600x400?text=Certificate')}
          sizes="(max-width: 768px) 320px, 350px"
        />
        
        {/* Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-20" />
      </div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-30">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
           <span className="px-2 py-1 rounded-md bg-purple-600/20 text-purple-400 text-[10px] font-black uppercase tracking-widest border border-purple-500/30 mb-2 inline-block">
             {certificate.issuer}
           </span>
           <h3 className="text-white font-black text-base leading-tight line-clamp-2">{certificate.name}</h3>
           <div className="flex items-center gap-2 text-blue-400 text-[10px] mt-3 font-black uppercase tracking-wider">
             Click to Verify <span className="text-base">→</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
