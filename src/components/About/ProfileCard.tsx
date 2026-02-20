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
      className="w-full lg:w-1/3 relative group"
    >
      {/* Spotlight effect for the whole card */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-20 rounded-[2.5rem]" 
           style={{ 
             background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.1), transparent 40%)` 
           }} 
      />

      {/* Cyber Glass Card */}
      <div className="bg-white/80 dark:bg-[#0A0C10] backdrop-blur-3xl p-6 md:p-8 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-white/5 group-hover:border-blue-500/30 transition-all duration-500 h-full relative overflow-hidden z-10">
        
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.05),_transparent_50%)]" />

        {/* Profile Image with Parallax */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto mb-6 md:mb-8">
          <motion.div
            className="w-full h-full rounded-[1.5rem] overflow-hidden border-2 border-white dark:border-white/10 shadow-2xl relative z-10 bg-gray-100 dark:bg-gray-900"
            style={{ x: imgX, y: imgY }}
          >
            <Image
              src="/images/profile/avatar.jpeg"
              alt="Ari Awaludin"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 128px, 144px"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://ui-avatars.com/api/?name=Ari+Awaludin&background=3b82f6&color=fff';
              }}
            />
          </motion.div>
          {/* Decorative Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border border-dashed border-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>

        <div className="text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-300 dark:to-gray-600 bg-clip-text text-transparent mb-2 md:mb-3 tracking-tighter leading-[0.9]">
            Ari Awaludin
          </h2>
          
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <p className="text-blue-600 dark:text-blue-500 font-black text-[8px] md:text-[9px] uppercase tracking-[0.4em]">
              Software Engineer
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          </div>

          {/* Social Links - Cyber Style */}
          <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gray-100/50 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-white dark:hover:bg-blue-600/30 transition-all border border-gray-200 dark:border-white/5 hover:border-blue-400/30 backdrop-blur-xl shadow-lg"
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={link.label}
              >
                <link.icon className="text-base md:text-lg" />
              </motion.a>
            ))}
          </div>

          {/* Contact Details - Standardized DNS */}
          <div className="space-y-2 md:space-y-3 text-left bg-gray-50/50 dark:bg-black/20 p-4 md:p-5 rounded-[1.5rem] border border-gray-200 dark:border-white/5 backdrop-blur-md">
            {contactInfo.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                className="flex items-center gap-3 w-full group/item cursor-pointer overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-500 shadow-xl border border-blue-500/10 dark:border-white/5">
                  <item.icon className="text-xs md:text-sm" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[7px] md:text-[8px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-[0.3em] leading-tight mb-0.5">{item.label}</span>
                  <span className="text-[11px] md:text-xs font-black text-gray-700 dark:text-gray-300 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors truncate tracking-tight">
                    {item.value}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Key Certifications - Premium Layout */}
          <div className="mt-5 md:mt-6 space-y-3 md:space-y-4">
             <div className="flex items-center gap-4 px-2">
                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-gray-500">Credentials</span>
                <div className="h-[1px] flex-1 bg-gray-100 dark:bg-white/5" />
             </div>
             <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div className="bg-blue-500/5 p-3 rounded-xl border border-blue-500/10 dark:border-white/5 text-left group/cred hover:bg-blue-600/10 transition-colors">
                  <p className="text-[6px] md:text-[7px] font-black uppercase text-blue-600 dark:text-blue-500 mb-1 tracking-widest">BNSP</p>
                  <p className="text-[8px] md:text-[9px] font-black text-gray-800 dark:text-white leading-tight">Certified <br />Programmer</p>
                </div>
                <div className="bg-purple-500/5 p-3 rounded-xl border border-purple-500/10 dark:border-white/5 text-left group/cred hover:bg-purple-600/10 transition-colors">
                  <p className="text-[6px] md:text-[7px] font-black uppercase text-purple-600 dark:text-purple-500 mb-1 tracking-widest">TOEFL</p>
                  <p className="text-[8px] md:text-[9px] font-black text-gray-800 dark:text-white leading-tight">ITP <br />Certified</p>
                </div>
             </div>
          </div>

          {/* Download Button - Elitist Style */}
          <motion.button
            className="w-full mt-6 md:mt-8 py-4 md:py-5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all relative overflow-hidden group/btn"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('files/cv_ari_awaludin.pdf', '_blank')}
          >
            <div className="relative z-10 flex items-center justify-center gap-2 md:gap-3 text-[8px] md:text-[9px] uppercase tracking-[0.3em]">
              Access Dossier <FaDownload className="text-[10px] md:text-xs group-hover:translate-y-1 transition-transform" />
            </div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
