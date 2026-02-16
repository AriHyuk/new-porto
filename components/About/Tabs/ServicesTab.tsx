import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { servicesData } from '@/constants/about';
import { containerVariants, itemVariants } from '@/utils/animation';

function TiltCard({ service, index }: { service: any, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative p-8 rounded-[2rem] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-blue-500/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full min-h-[340px] overflow-hidden"
    >
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
      
      <div style={{ transform: "translateZ(60px)" }} className="relative z-10 flex flex-col flex-grow">
        <div className="mb-6 w-14 h-14 rounded-2xl bg-blue-50 dark:bg-gray-900/50 flex items-center justify-center text-2xl shadow-inner border border-blue-100/50 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          {service.icon}
        </div>
        
        <h3 className="text-xl font-black mb-3 tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {service.title}
        </h3>
        
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm font-medium line-clamp-4">
          {service.description}
        </p>
      </div>

      <div style={{ transform: "translateZ(40px)" }} className="mt-auto pt-8 flex items-center justify-between relative z-10 border-t border-gray-50 dark:border-gray-800/50">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600/50 dark:text-blue-400/30">Service</span>
          <span className="text-sm font-black text-gray-300 dark:text-gray-700">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-900/50 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 transform group-hover:translate-x-2 transition-all duration-500 shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-blue-500" />
    </motion.div>
  );
}

export default function ServicesTab() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {servicesData.map((service, index) => (
        <TiltCard key={index} service={service} index={index} />
      ))}

      {/* Placeholder with premium design */}
      <motion.div
        variants={itemVariants}
        className="relative p-8 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center group hover:border-blue-500/30 transition-all duration-500 bg-gray-50/30 dark:bg-gray-900/10 h-full min-h-[340px]"
      >
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-gray-300 dark:text-gray-700 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-gray-100 dark:border-gray-700">
          <span className="text-3xl font-light">+</span>
        </div>
        <h4 className="text-lg font-bold text-gray-400 dark:text-gray-600 mb-2">More Innovation</h4>
        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 max-w-[180px] uppercase tracking-widest">Always expanding our horizons</p>
      </motion.div>
    </motion.div>
  );
}
