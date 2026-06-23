'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animation';
import { servicesData } from '@/constants/about';
import { IconType } from 'react-icons';
import { LuCode, LuPalette, LuServer, LuCloudLightning, LuZap, LuCheck, LuArrowRight } from 'react-icons/lu';

const iconMap: Record<string, IconType> = {
  web: LuCode,
  design: LuPalette,
  backend: LuServer,
  cloud: LuCloudLightning,
};

const CONTACT_EMAIL = "ariawl0209@gmail.com";

export default function ServicesTab() {
  const handleContact = (subject: string) => {
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {servicesData.map((service, index) => {
        const Icon = iconMap[service.iconKey] || LuZap;
        
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            onClick={() => handleContact(`Project Inquiry: ${service.title}`)}
            className="group relative p-8 md:p-10 bg-white dark:bg-[#1a1c23] border-2 border-black dark:border-white transition-all duration-150 flex flex-col h-full cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.2)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,0.3)] overflow-hidden"
          >
            <div className="mb-8 relative z-10">
              <motion.div 
                className="w-16 h-16 flex items-center justify-center bg-[#CCFF00] text-black border-2 border-black transition-transform duration-150 group-hover:-translate-y-1 group-hover:-translate-x-1 shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              >
                <Icon className="text-[28px]" />
              </motion.div>
            </div>
            
            <h3 className="text-2xl font-black text-black dark:text-white mb-4 uppercase tracking-tighter relative z-10">
              {service.title}
            </h3>
            
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-bold relative z-10">
              {service.description}
            </p>

            {/* Feature List */}
            <ul className="space-y-3.5 mt-auto relative z-10">
              {service.features?.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-wider text-black dark:text-white transition-colors">
                  <div className="flex-shrink-0 w-5 h-5 bg-[#2B5CE6] flex items-center justify-center text-white border-2 border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform">
                    <LuCheck className="text-[10px] font-black" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2B5CE6] dark:text-[#5b82ff] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-150 relative z-10">
              Launch Project
              <LuArrowRight className="text-sm font-black" />
            </div>
          </motion.div>
        );
      })}

      {/* Hero-like CTA Card - Brutalist */}
      <motion.div
        variants={itemVariants}
        onClick={() => handleContact("General Inquiry via Portfolio")}
        className="group relative p-10 bg-[#FF4D00] border-2 border-black dark:border-white transition-all duration-150 flex flex-col items-center justify-center text-center min-h-[320px] cursor-pointer overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.2)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,0.3)]"
      >
        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            className="w-20 h-20 bg-white border-4 border-black flex items-center justify-center mb-6 text-3xl shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            whileHover={{ scale: 1.15, rotate: 15 }}
          >
            ✨
          </motion.div>
          <h4 className="text-3xl font-black text-black mb-3 tracking-tighter uppercase">
            Have a Project?
          </h4>
          <p className="text-sm text-black max-w-[260px] font-bold leading-relaxed mb-8">
            Let&apos;s engineer your vision into a <span className="font-black italic">high-performance</span> reality.
          </p>
          <motion.div 
            className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] border-2 border-transparent transition-transform shadow-[4px_4px_0px_rgba(255,255,255,0.3)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Conversation
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
