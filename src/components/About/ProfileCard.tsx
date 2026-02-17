'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { socialLinks, contactInfo } from '@/constants/about';
import { cardVariants, buttonVariants } from '@/utils/animation';
import { FaDownload } from 'react-icons/fa';

export default function ProfileCard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const imgX = useTransform(mouseX, [-200, 200], [15, -15]);
  const imgY = useTransform(mouseY, [-200, 200], [15, -15]);

  return (
    <motion.div
      className="w-full lg:w-1/3 relative"
      variants={cardVariants}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glassmorphism Card */}
      <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-2xl p-8 rounded-[2rem] shadow-xl border border-white/20 dark:border-gray-700/30 h-full relative overflow-hidden z-10">
        
        {/* Profile Image - Clean & Simple */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          <motion.div
            className="w-full h-full rounded-full overflow-hidden border-[3px] border-white dark:border-gray-700 shadow-lg relative z-10 bg-gray-100 dark:bg-gray-900"
            style={{ x: imgX, y: imgY }}
          >
            <Image
              src="/images/profile/avatar.jpeg"
              alt="Ari Awaludin"
              fill
              className="object-cover"
              sizes="160px"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://ui-avatars.com/api/?name=Ari+Awaludin&background=3b82f6&color=fff';
              }}
            />
          </motion.div>
        </div>

        <div className="text-center relative z-10">
          <h2 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-1 tracking-tighter">
            Ari Awaludin
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-8 h-[2px] bg-blue-600/30 rounded-full" />
            <p className="text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-[0.3em]">
              Software Engineer
            </p>
            <span className="w-8 h-[2px] bg-blue-600/30 rounded-full" />
          </div>

          {/* Social Links */}
          <div className="flex justify-center flex-wrap gap-3 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-2xl bg-white/50 dark:bg-gray-700/30 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all ${link.color} shadow-sm border border-white dark:border-gray-600/30 backdrop-blur-md`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                title={link.label}
              >
                <link.icon className="text-xl" />
              </motion.a>
            ))}
          </div>

          {/* Contact Details */}
          <div className="space-y-4 text-left bg-gray-100/50 dark:bg-gray-900/40 p-5 rounded-3xl border border-white/10 dark:border-gray-700/50 backdrop-blur-md">
            {contactInfo.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                className="flex items-center gap-3 w-full group/item cursor-pointer overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300 shadow-sm">
                  <item.icon className="text-base" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[9px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-[0.2em] leading-tight mb-0.5">{item.label}</span>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors truncate">
                    {item.value}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <motion.button
            className="w-full mt-8 py-5 px-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white font-black rounded-[1.5rem] shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all relative overflow-hidden group/btn"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('files/cv_ari_awaludin.pdf', '_blank')}
          >
            <span className="relative z-10 flex items-center justify-center gap-3 tracking-tight">
              Review Full Resume <FaDownload className="text-lg animate-bounce" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
            
            {/* Inner Light Effect */}
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover/btn:left-full transition-all duration-1000" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
