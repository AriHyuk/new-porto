'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { socialLinks, contactInfo } from '@/constants/about';
import { FaDownload } from 'react-icons/fa';
import { useRef } from 'react';

export default function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const imgX = useTransform(x, [-100, 100], [10, -10]);
  const imgY = useTransform(y, [-100, 100], [10, -10]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="relative group h-full"
    >
      {/* Brutalist Card */}
      <div className="bg-[#CCFF00] dark:bg-[#1a1c23] p-6 md:p-8 border-2 border-black dark:border-white h-full relative overflow-hidden z-10 shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.2)]">
        
        {/* Profile Image with Parallax */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto mb-6 md:mb-8">
          <motion.div
            className="w-full h-full border-4 border-black dark:border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.5)] relative z-10 bg-white dark:bg-black overflow-hidden"
            style={{ x: imgX, y: imgY }}
          >
            <Image
              src="/images/profile/avatar.jpeg"
              alt="Ari Awaludin"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale hover:grayscale-0"
              sizes="(max-width: 768px) 128px, 144px"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://ui-avatars.com/api/?name=Ari+Awaludin&background=000&color=fff';
              }}
            />
          </motion.div>
        </div>

        <div className="text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-2 md:mb-3 tracking-tighter leading-[0.9] uppercase">
            Ari Awaludin
          </h2>
          
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
            <span className="w-2 h-2 bg-black dark:bg-white animate-pulse border border-black dark:border-white" />
            <p className="text-black dark:text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em]">
              Software Engineer
            </p>
            <span className="w-2 h-2 bg-black dark:bg-white animate-pulse border border-black dark:border-white" />
          </div>

          {/* Social Links - Brutalist Style */}
          <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-11 md:h-11 bg-white dark:bg-black flex items-center justify-center text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors border-2 border-black dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_rgba(255,255,255,0.5)] hover:-translate-y-1 hover:-translate-x-1"
                whileTap={{ scale: 0.95 }}
                title={link.label}
              >
                <link.icon className="text-base md:text-lg" />
              </motion.a>
            ))}
          </div>

          {/* Contact Details - Brutalist */}
          <div className="space-y-2 md:space-y-3 text-left bg-white dark:bg-black p-4 md:p-5 border-2 border-black dark:border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">
            {contactInfo.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                className="flex items-center gap-3 w-full group/item cursor-pointer overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-8 h-8 md:w-9 md:h-9 bg-[#2B5CE6] flex-shrink-0 flex items-center justify-center text-white border-2 border-black dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)] group-hover/item:translate-x-1 transition-transform">
                  <item.icon className="text-xs md:text-sm" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[8px] md:text-[9px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-[0.3em] leading-tight mb-0.5">{item.label}</span>
                  <span className="text-xs md:text-sm font-black text-black dark:text-white group-hover/item:text-[#2B5CE6] dark:group-hover/item:text-[#5b82ff] transition-colors truncate tracking-tight uppercase">
                    {item.value}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Key Certifications - Brutalist */}
          <div className="mt-5 md:mt-6 space-y-3 md:space-y-4">
             <div className="flex items-center gap-4">
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-black dark:text-white bg-white dark:bg-black px-2 py-1 border-2 border-black dark:border-white">Credentials</span>
                <div className="h-0.5 flex-1 bg-black dark:bg-white" />
             </div>
             <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div className="bg-white dark:bg-black p-3 border-2 border-black dark:border-white text-left shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]">
                  <p className="text-[7px] md:text-[8px] font-black uppercase text-black dark:text-white mb-1 tracking-widest">BNSP</p>
                  <p className="text-[9px] md:text-[10px] font-black text-[#2B5CE6] dark:text-[#5b82ff] leading-tight uppercase">Certified <br />Programmer</p>
                </div>
                <div className="bg-white dark:bg-black p-3 border-2 border-black dark:border-white text-left shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]">
                  <p className="text-[7px] md:text-[8px] font-black uppercase text-black dark:text-white mb-1 tracking-widest">TOEFL</p>
                  <p className="text-[9px] md:text-[10px] font-black text-[#FF4D00] leading-tight uppercase">ITP <br />Certified</p>
                </div>
             </div>
          </div>

          {/* Download Button - Brutalist */}
          <motion.button
            className="w-full mt-6 md:mt-8 py-4 md:py-5 px-6 bg-[#FF4D00] text-black font-black uppercase border-2 border-black dark:border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.5)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,0.5)] hover:-translate-y-1 hover:-translate-x-1 transition-all group/btn"
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('files/cv_ari_awaludin.pdf', '_blank')}
          >
            <div className="flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm tracking-widest">
              Access CV <FaDownload className="group-hover/btn:translate-y-1 transition-transform" />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
