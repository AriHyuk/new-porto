'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animation';
import { servicesData } from '@/constants/about';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  web: LucideIcons.Code2,
  design: LucideIcons.Palette,
  backend: LucideIcons.Server,
  cloud: LucideIcons.CloudLightning,
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
        const Icon = iconMap[service.iconKey] || LucideIcons.Zap;
        
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            onClick={() => handleContact(`Project Inquiry: ${service.title}`)}
            className="group relative p-8 md:p-10 rounded-[2.5rem] bg-white/50 dark:bg-gray-800/30 backdrop-blur-md border border-gray-100 dark:border-gray-700/50 transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl flex flex-col h-full overflow-hidden cursor-pointer"
          >
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full transition-opacity opacity-0 group-hover:opacity-100 z-0" />

            <div className="mb-8 relative z-10">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm border border-gray-50 dark:border-gray-800">
                <Icon size={28} strokeWidth={1.5} />
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tighter relative z-10">
              {service.title}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-8 font-medium relative z-10">
              {service.description}
            </p>

            {/* Feature List */}
            <ul className="space-y-3 mt-auto relative z-10">
              {service.features?.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3 text-xs font-bold text-gray-500 dark:text-gray-400 transition-colors group-hover:text-gray-900 dark:group-hover:text-gray-200">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <LucideIcons.Check size={10} strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500 relative z-10">
              Get Started
              <LucideIcons.ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
        );
      })}

      {/* Hero-like CTA Card */}
      <motion.div
        variants={itemVariants}
        onClick={() => handleContact("General Inquiry via Portfolio")}
        className="group relative p-10 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-700/50 hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-500 flex flex-col items-center justify-center text-center min-h-[320px] cursor-pointer"
      >
        <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-3xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
          ✨
        </div>
        <h4 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-3 tracking-tighter">
          Have a Project?
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[260px] font-medium leading-relaxed mb-8">
          Let&apos;s engineer your vision into a high-performance reality.
        </p>
        <div className="px-10 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 shadow-xl transition-all active:scale-95">
          Let&apos;s Talk
        </div>
      </motion.div>
    </motion.div>
  );
}
