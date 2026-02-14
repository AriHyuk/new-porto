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

  const isLarge = index === 0;
  const isTall = index === 2;

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
      className={`group relative p-8 rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isLarge 
          ? 'md:col-span-2 md:row-span-1 bg-blue-600 text-white border-blue-500 shadow-2xl shadow-blue-500/20' 
          : isTall
            ? 'md:row-span-2 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5'
            : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5'
      }`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
          isLarge ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
        }`}>
          {service.icon}
        </div>
        
        <h3 className={`text-2xl font-black mb-3 tracking-tight ${
          isLarge ? 'text-white' : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
        }`}>
          {service.title}
        </h3>
        
        <p className={`text-sm leading-relaxed max-w-[280px] ${
          isLarge ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {service.description}
        </p>
      </div>

      <div style={{ transform: "translateZ(30px)" }} className="mt-12 flex items-center justify-between relative z-10">
        <span className={`text-xs font-black uppercase tracking-[0.2em] ${
          isLarge ? 'text-blue-200' : 'text-gray-400'
        }`}>
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transform group-hover:translate-x-1 transition-transform ${
          isLarge ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-gray-700 text-blue-600'
        }`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${
        isLarge ? 'bg-white' : 'bg-blue-500'
      }`} />
    </motion.div>
  );
}

export default function ServicesTab() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {servicesData.map((service, index) => (
        <TiltCard key={index} service={service} index={index} />
      ))}

      {/* Placeholder for future expansion or extra creative element if services < 6 */}
      {servicesData.length < 6 && (
        <motion.div
          variants={itemVariants}
          className="md:col-span-1 p-8 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center group hover:border-blue-500/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 mb-4 group-hover:scale-110 transition-transform">
            <span className="text-xl">+</span>
          </div>
          <p className="text-sm font-bold text-gray-400 dark:text-gray-600">More services coming soon</p>
        </motion.div>
      )}
    </motion.div>
  );
}
