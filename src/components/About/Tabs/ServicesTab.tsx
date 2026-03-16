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
            className="group relative p-8 md:p-10 rounded-[2.5rem] bg-white/70 dark:bg-gray-900/40 backdrop-blur-2xl border border-gray-100 dark:border-white/5 transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)] flex flex-col h-full overflow-hidden cursor-pointer"
          >
            {/* Background Mesh Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full transition-opacity opacity-0 group-hover:opacity-100 z-0" />
            
            <div className="mb-8 relative z-10">
              <motion.div 
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-xl border border-gray-50 dark:border-white/5 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white"
                whileHover={{ y: -5, rotate: 5 }}
              >
                <Icon className="text-[28px]" />
              </motion.div>
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tighter relative z-10">
              {service.title}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-8 font-medium relative z-10">
              {service.description}
            </p>

            {/* Feature List with cleaner dots */}
            <ul className="space-y-3.5 mt-auto relative z-10">
              {service.features?.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-500 transition-colors group-hover:text-gray-900 dark:group-hover:text-gray-300">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform">
                    <LuCheck className="text-[10px]" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 relative z-10">
              Launch Project
              <LuArrowRight className="text-sm" />
            </div>
          </motion.div>
        );
      })}

      {/* Hero-like CTA Card - Premium Polish */}
      <motion.div
        variants={itemVariants}
        onClick={() => handleContact("General Inquiry via Portfolio")}
        className="group relative p-10 rounded-[2.5rem] bg-gradient-to-br from-white/40 to-white/10 dark:from-white/[0.03] dark:to-transparent backdrop-blur-xl border border-gray-200 dark:border-white/5 hover:border-blue-500/40 transition-all duration-700 flex flex-col items-center justify-center text-center min-h-[320px] cursor-pointer overflow-hidden shadow-sm"
      >
        {/* Animated Border */}
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <motion.div 
            className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(59,130,246,0.1)_120deg,transparent_240deg)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            className="w-20 h-20 rounded-full bg-blue-100/50 dark:bg-blue-900/20 backdrop-blur-3xl flex items-center justify-center mb-6 text-3xl shadow-inner"
            whileHover={{ scale: 1.15, rotate: 15 }}
          >
            ✨
          </motion.div>
          <h4 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-3 tracking-tighter">
            Have a Project?
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[260px] font-medium leading-relaxed mb-8">
            Let&apos;s engineer your vision into a <span className="text-blue-600 dark:text-blue-500 font-bold italic">high-performance</span> reality.
          </p>
          <motion.div 
            className="px-10 py-3.5 bg-gray-900 dark:bg-blue-600 text-white dark:text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Conversation
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
